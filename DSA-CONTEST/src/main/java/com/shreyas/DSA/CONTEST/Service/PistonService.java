package com.shreyas.DSA.CONTEST.Service;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.shreyas.DSA.CONTEST.DTO.SubmitResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.*;

import java.util.*;
import java.util.concurrent.Callable;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.Future;
import java.util.concurrent.atomic.AtomicInteger;

/**
 * Service for executing code in a Piston environment via a REST API.
 * This service uses a round-robin approach to distribute requests among
 * multiple Piston instances.
 */
@Service
public class PistonService {

    @Autowired
    private SubmissionQueueService queueService;


    // RestTemplate for making HTTP requests
    private final RestTemplate restTemplate = new RestTemplate();
    // ObjectMapper for parsing JSON responses
    private final ObjectMapper objectMapper = new ObjectMapper();

    // List of Piston API endpoints for round-robin load balancing
    List<String> pistonUrls = Arrays.asList(
            "http://localhost:2001/api/v2/execute",
            "http://localhost:2003/api/v2/execute",
            "http://localhost:2004/api/v2/execute",
            "http://localhost:2005/api/v2/execute",
            "http://localhost:2006/api/v2/execute"
    );


    public Future<SubmitResponse> submitCode(String code, String lang, String input, List<Map<String, String>> testCases) {
        return queueService.submit(() -> {
            try {
                return runAllTests(code, lang, input, testCases);
            } catch (JsonProcessingException e) {
                SubmitResponse error = new SubmitResponse("Error: " + e.getMessage());
                error.setSuccess(false);
                error.setError(e.getMessage());
                return error;
            }
        });
    }



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
        int linePtr = 0; // pointer for actual output lines
        int testcases = 1;

        for (int t = 0; t < testCases.size(); t++) {
            Map<String, String> map = testCases.get(t);
            String expected = map.get("expected").trim();
            String[] expectedLines = expected.isEmpty() ? new String[0] : expected.split("\\R");

            // Check if enough lines remain for this test case
            if (linePtr + expectedLines.length > actualArr.length) {
                SubmitResponse obj = new SubmitResponse();
                obj.setSuccess(false);
                obj.setOutput("❌ Testcase No." + (t + 1) +
                        " failed for input: " + map.get("input") +
                        "\nExpected: " + expected +
                        "\nGot: " + String.join("\n", Arrays.copyOfRange(actualArr, linePtr, actualArr.length)));
                return obj;
            }
            // Compare expected vs actual line by line
            for (int i = 0; i < expectedLines.length; i++) {
                if (!expectedLines[i].trim().equals(actualArr[linePtr + i].trim())) {
                    SubmitResponse obj = new SubmitResponse();
                    obj.setSuccess(false);
                    obj.setOutput("❌ Testcase No." + (t + 1) +
                            " failed for input: " + map.get("input") +
                            "\nExpected: " + expectedLines[i].trim() +
                            "\nGot: " + actualArr[linePtr + i].trim());
                    return obj;
                }
                testcases++;
            }

            // Move pointer forward for next test case
            linePtr += expectedLines.length;
        }

        return new SubmitResponse("All test Cases Passed Total testcases"+testcases); // all passed
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
        requestBody.put("stdin",input);

        // Set headers and create the HTTP entity
        System.out.println("==== RAW Request BODY ====");

        System.out.println(
                objectMapper.writerWithDefaultPrettyPrinter().writeValueAsString(requestBody)
        );

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<Map<String, Object>> request = new HttpEntity<>(requestBody, headers);

        ResponseEntity<String> response = restTemplate.postForEntity(pistonUrl, request, String.class);
        System.out.println("==== RAW RESPONSE ====");
        System.out.println(response.getBody());
        JsonNode root = objectMapper.readTree(response.getBody());
        JsonNode runNode = root.path("run");
        String stdout = runNode.path("stdout").asText(); // Capture stdout as text
        String stderr = runNode.path("stderr").asText(); // Capture stderr as text
        return handleResponse(stdout,testCases);
    }


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
//package com.shreyas.DSA.CONTEST.Service;
//
//import com.fasterxml.jackson.core.JsonProcessingException;
//import com.fasterxml.jackson.databind.JsonNode;
//import com.fasterxml.jackson.databind.ObjectMapper;
//import com.shreyas.DSA.CONTEST.DTO.SubmitResponse;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Service;
//import org.springframework.web.client.RestTemplate;
//import org.springframework.http.*;
//
//import java.util.*;
//import java.util.concurrent.atomic.AtomicInteger;
//
///**
// * Service for executing code in a Piston environment via a REST API.
// * This service uses a round-robin approach to distribute requests among
// * multiple Piston instances.
// */
//@Service
//public class PistonService {
//
//    @Autowired
//    private SubmissionQueueService queueService; // new queue service
//
//    // RestTemplate for making HTTP requests
//    private final RestTemplate restTemplate = new RestTemplate();
//    private final ObjectMapper objectMapper = new ObjectMapper();
//
//    List<String> pistonUrls = Arrays.asList(
//            "http://localhost:2000/api/v2/execute",
//            "http://localhost:2001/api/v2/execute",
//            "http://localhost:2002/api/v2/execute",
//            "http://localhost:2003/api/v2/execute",
//            "http://localhost:2004/api/v2/execute",
//            "http://localhost:2005/api/v2/execute",
//            "http://localhost:2006/api/v2/execute"
//    );
//
//    // Atomic counter for round-robin
//    private final AtomicInteger counter = new AtomicInteger(0);
//
//    private String getNextPistonUrl() {
//        int index = counter.getAndIncrement() % pistonUrls.size();
//        return pistonUrls.get(index);
//    }
//
//    private final Map<String, String> languageVersions = Map.of(
//            "python", "3.10.0",
//            "java", "15.0.2",
//            "c", "10.2.0",
//            "cpp", "10.2.0"
//    );
//
//    /**
//     * Asynchronous submission using queue.
//     */
//
//
//    public SubmitResponse handleResponse(String stdout, List<Map<String, String>> testCases) {
//        String[] actualArr = stdout.trim().split("\\R");
//        int linePtr = 0;
//        int testcases = 1;
//
//        for (int t = 0; t < testCases.size(); t++) {
//            Map<String, String> map = testCases.get(t);
//            String expected = map.get("expected").trim();
//            String[] expectedLines = expected.isEmpty() ? new String[0] : expected.split("\\R");
//
//            if (linePtr + expectedLines.length > actualArr.length) {
//                SubmitResponse obj = new SubmitResponse();
//                obj.setSuccess(false);
//                obj.setOutput("❌ Testcase No." + (t + 1) +
//                        " failed for input: " + map.get("input") +
//                        "\nExpected: " + expected +
//                        "\nGot: " + String.join("\n", Arrays.copyOfRange(actualArr, linePtr, actualArr.length)));
//                return obj;
//            }
//
//            for (int i = 0; i < expectedLines.length; i++) {
//                if (!expectedLines[i].trim().equals(actualArr[linePtr + i].trim())) {
//                    SubmitResponse obj = new SubmitResponse();
//                    obj.setSuccess(false);
//                    obj.setOutput("❌ Testcase No." + (t + 1) +
//                            " failed for input: " + map.get("input") +
//                            "\nExpected: " + expectedLines[i].trim() +
//                            "\nGot: " + actualArr[linePtr + i].trim());
//                    return obj;
//                }
//                testcases++;
//            }
//
//            linePtr += expectedLines.length;
//        }
//
//        return new SubmitResponse("All test Cases Passed Total testcases" + testcases);
//    }
//
//    public SubmitResponse runAllTests(String code, String lang, String input, List<Map<String, String>> testCases) throws JsonProcessingException {
//        String version = languageVersions.getOrDefault(lang.toLowerCase(), "latest");
//        String pistonUrl = getNextPistonUrl();
//
//        Map<String, Object> requestBody = new HashMap<>();
//        requestBody.put("language", lang);
//        requestBody.put("version", version);
//        requestBody.put("files", List.of(
//                Map.of(
//                        "name", "Main." + getExtension(lang),
//                        "content", code
//                )
//        ));
//        requestBody.put("stdin", input);
//
//        HttpHeaders headers = new HttpHeaders();
//        headers.setContentType(MediaType.APPLICATION_JSON);
//        HttpEntity<Map<String, Object>> request = new HttpEntity<>(requestBody, headers);
//
//        ResponseEntity<String> response = restTemplate.postForEntity(pistonUrl, request, String.class);
//        JsonNode root = objectMapper.readTree(response.getBody());
//        JsonNode runNode = root.path("run");
//        String stdout = runNode.path("stdout").asText();
//        String stderr = runNode.path("stderr").asText();
//        return handleResponse(stdout, testCases);
//    }
//
//    private String getExtension(String lang) {
//        return switch (lang.toLowerCase()) {
//            case "python" -> "py";
//            case "java" -> "java";
//            case "c" -> "c";
//            case "cpp" -> "cpp";
//            default -> "txt";
//        };
//    }
//}
