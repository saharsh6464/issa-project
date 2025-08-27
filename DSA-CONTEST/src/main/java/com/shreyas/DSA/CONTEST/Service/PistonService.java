package com.shreyas.DSA.CONTEST.Service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.shreyas.DSA.CONTEST.DTO.SubmitResponse;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.*;

import java.util.*;
import java.util.concurrent.atomic.AtomicInteger;

/**
 * Service for executing code in a Piston environment via a REST API.
 * This service uses a round-robin approach to distribute requests among
 * multiple Piston instances.
 */
@Service
public class PistonService {
    // RestTemplate for making HTTP requests
    private final RestTemplate restTemplate = new RestTemplate();
    // ObjectMapper for parsing JSON responses
    private final ObjectMapper objectMapper = new ObjectMapper();

    // List of Piston API endpoints for round-robin load balancing
    List<String> pistonUrls = Arrays.asList(
            "http://localhost:2000/api/v2/execute",
            "http://localhost:2001/api/v2/execute",
            "http://localhost:2002/api/v2/execute"
    );


    // Atomic counter for thread-safe round-robin
    private final AtomicInteger counter = new AtomicInteger(0);

    /**
     * Retrieves the next Piston URL in a round-robin fashion.
     *
     * @return The URL of the next Piston instance.
     */
    private String getNextPistonUrl() {
        int index = counter.getAndIncrement() % pistonUrls.size();
        return pistonUrls.get(index);
    }

    // Hardcoded versions for various languages to ensure consistent runtime
    private final Map<String, String> languageVersions = Map.of(
            "python", "3.10.0",
            "java", "15.0.2",
            "c", "10.2.0",
            "cpp", "10.2.0"
    );

    public SubmitResponse handleResponse(String stdout, List<Map<String, String>> testCases) {
        String[] actualArr = stdout.trim().split("\\R");
        int index = 0;

        for (int t = 0; t < testCases.size(); t++) {
            Map<String, String> map = testCases.get(t);
            String expected = map.get("expected").trim();
            String[] expectedLines = expected.isEmpty() ? new String[0] : expected.split("\\R");

            for (String expLine : expectedLines) {
                if (index >= actualArr.length || !expLine.trim().equals(actualArr[index].trim())) {
                    SubmitResponse obj = new SubmitResponse();
                    obj.setSuccess(false);
                    obj.setOutput("❌ Testcase No." + (t + 1) + " failed for input: " + map.get("input"));
                    return obj;
                }
                index++;
            }
        }

        return new SubmitResponse("✅ Successfully passed all testcases!");
    }




    //optimised function for api calls;
    public SubmitResponse runAllTests(String code, String lang,String input,List<Map<String, String>> testCases) throws JsonProcessingException {
        String version = languageVersions.getOrDefault(lang.toLowerCase(), "latest");
        String pistonUrl = getNextPistonUrl();
        System.out.println(pistonUrl);

        Map<String, Object> requestBody = new HashMap<>();
        requestBody.put("language", lang);
        requestBody.put("version", version);
        requestBody.put("files", List.of(
                Map.of(
                        "name", "Main." + getExtension(lang),
                        "content", code
                )
        ));
        requestBody.put("stdin", input);

        // Set headers and create the HTTP entity
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<Map<String, Object>> request = new HttpEntity<>(requestBody, headers);

        ResponseEntity<String> response = restTemplate.postForEntity(pistonUrl, request, String.class);
        JsonNode root = objectMapper.readTree(response.getBody());
        JsonNode runNode = root.path("run");
        String stdout = runNode.path("stdout").asText(); // Capture stdout as text
        String stderr = runNode.path("stderr").asText(); // Capture stderr as text
        return handleResponse(stdout,testCases);
    }



//    public SubmitResponse runAllTests(String code, String lang, List<Map<String, String>> testCases) {
//        int passed = 0;
//        List<String> details = new ArrayList<>();
//        String version = languageVersions.getOrDefault(lang.toLowerCase(), "latest");
//        String pistonUrl = getNextPistonUrl();
//        System.out.println(pistonUrl);
//
//        for (int i = 0; i < testCases.size(); i++) {
//            String input = testCases.get(i).get("input");
//            String expected = testCases.get(i).get("expected");
//
//            if (input == null) input = "";
//            if (expected == null) expected = "";
//
//            input = input.trim();
//            expected = expected.trim();
//
//            try {
//                // Prepare the request body for the Piston API
//                Map<String, Object> requestBody = new HashMap<>();
//                requestBody.put("language", lang);
//                requestBody.put("version", version);
//                requestBody.put("files", List.of(
//                        Map.of(
//                                "name", "Main." + getExtension(lang),
//                                "content", code
//                        )
//                ));
//                requestBody.put("stdin", input);
//
//                // Set headers and create the HTTP entity
//                HttpHeaders headers = new HttpHeaders();
//                headers.setContentType(MediaType.APPLICATION_JSON);
//                HttpEntity<Map<String, Object>> request = new HttpEntity<>(requestBody, headers);
//
//                // Send the request and get the response
//                ResponseEntity<String> response = restTemplate.postForEntity(pistonUrl, request, String.class);
//                JsonNode root = objectMapper.readTree(response.getBody());
//                JsonNode runNode = root.path("run");
//                String stdout = runNode.path("stdout").asText(); // Capture stdout as text
//                String stderr = runNode.path("stderr").asText(); // Capture stderr as text
//
//                // If a runtime error occurred, record it and move to the next test
//                if (!stderr.isEmpty()) {
//                    details.add("Test " + (i + 1) + ": RUNTIME ERROR -> " + stderr.trim());
//                    continue;
//                }
//
//                // Normalize stdout and expected output for comparison
//                // This converts all whitespace to a single colon, then removes any trailing colon
//                stdout = stdout.replaceAll("\\s+", ":").replaceAll(":$", "");
//                expected = expected.replaceAll("\\s+", ":").replaceAll(":$", "");
//
//                // Compare the normalized outputs
//                if (stdout.equals(expected)) {
//                    passed++;
//                    details.add("Test " + (i + 1) + ": PASS");
//                } else {
//                    details.add("Test " + (i + 1) + ": FAIL (Expected=" + expected + ", Got=" + stdout + ")");
//                }
//
//            } catch (Exception e) {
//                // Handle any system-level errors with the API call itself
//                details.add("Test " + (i + 1) + ": SYSTEM ERROR -> " + e.getMessage());
//            }
//        }
//
//        boolean success = passed == testCases.size();
//        String summary = "Passed " + passed + " / " + testCases.size() + " tests\n" +
//                String.join("\n", details);
//
//        return new SubmitResponse(success, summary, "");
//    }

    /**
     * Helper to determine the file extension based on the language.
     *
     * @param lang The language string.
     * @return The corresponding file extension.
     */
    private String getExtension(String lang) {
        return switch (lang.toLowerCase()) {
            case "python" -> "py";
            case "java" -> "java";
            case "c" -> "c";
            case "cpp" -> "cpp";
            default -> "txt";
        };
    }
}
