package com.shreyas.DSA.CONTEST.Service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.shreyas.DSA.CONTEST.DTO.SubmitResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
public class QuestionsValid {
    @Autowired
    PistonService pistonService;
//    public SubmitResponse question1(String code, String lang) {
//        System.out.println("test1");
//        List<Map<String, String>> testCases = List.of(
//                Map.of("input", "4 4 1 2 3 4 3 5 6 7 1 3 1 6", "expected", "2 4 6 8\n10 12 14\n6\n12")
//        );
//
//        return pistonService.runAllTests(code, lang, testCases);
//    }

    public SubmitResponse question1(String code, String lang) throws JsonProcessingException {
        System.out.println("test1");

        List<Map<String, String>> testCases = List.of(
                Map.of("input", "1 6 -1 0 1 2 -1 -4", "expected", "-1 -1 2\n-1 0 1"),
                Map.of("input", "1 5 0 0 0 0 0", "expected", "0 0 0"),
                Map.of("input", "1 4 1 2 -2 -1", "expected", ""),
                Map.of("input", "1 7 -1 0 1 2 -1 -4 3", "expected", "-4 1 3\n-1 -1 2\n-1 0 1"),
                Map.of("input", "1 3 -2 1 1", "expected", "-2 1 1"),
                Map.of("input", "1 6 -2 0 2 2 -1 1", "expected", "-2 0 2\n-1 0 1"),
                Map.of("input", "1 5 -5 2 3 0 0", "expected", "-5 2 3"),
                Map.of("input", "1 8 1 -1 0 -1 2 -2 3 -3", "expected", "-3 0 3\n-3 1 2\n-2 -1 3\n-2 0 2\n-1 -1 2\n-1 0 1"),
                Map.of("input", "1 4 -1 0 1 0", "expected", "-1 0 1"),
                Map.of("input", "1 6 3 -1 -7 4 2 1", "expected", "-7 3 4")
        );

        String input =
        "10\n" +
                "1 6 -1 0 1 2 -1 -4\n" +
                "1 5 0 0 0 0 0\n" +
                "1 4 1 2 -2 -1\n" +
                "1 7 -1 0 1 2 -1 -4 3\n" +
                "1 3 -2 1 1\n" +
                "1 6 -2 0 2 2 -1 1\n" +
                "1 5 -5 2 3 0 0\n" +
                "1 8 1 -1 0 -1 2 -2 3 -3\n" +
                "1 4 -1 0 1 0\n" +
                "1 6 3 -1 -7 4 2 1\n";

        return pistonService.runAllTests(code, lang,input,testCases);
    }


    public SubmitResponse question2(String code, String lang) throws JsonProcessingException {
        System.out.println("test1");

        List<Map<String, String>> testCases = List.of(
                Map.of("input", "1 9 1 8 6 2 5 4 8 3 7", "expected", "49"),
                Map.of("input", "1 6 1 2 4 3 5 6", "expected", "12"),
                Map.of("input", "1 5 1 8 6 2 5", "expected", "15"),
                Map.of("input", "1 4 1 1 1 1", "expected", "3"),
                Map.of("input", "1 7 1 2 3 4 5 6 7", "expected", "12"),
                Map.of("input", "1 8 1 2 3 4 5 6 7 8", "expected", "16"),
                Map.of("input", "1 10 1 2 3 4 5 6 7 8 9 10", "expected", "25"),
                Map.of("input", "1 5 5 4 3 2 1", "expected", "6"),
                Map.of("input", "1 6 1 2 3 4 5 6", "expected", "9"),
                Map.of("input", "1 3 1 2 3", "expected", "2")
        );

        return pistonService.runAllTests(code, lang,"", testCases);
    }
    public SubmitResponse question3(String code, String lang) throws JsonProcessingException {
        System.out.println("test1");

        List<Map<String, String>> testCases = List.of(
                Map.of("input", "1 6 abcabc", "expected", "3"),
                Map.of("input", "1 5 bbbbb", "expected", "1"),
                Map.of("input", "1 6 pwwkew", "expected", "3"),
                Map.of("input", "1 7 abcdefg", "expected", "7"),
                Map.of("input", "1 8 abcaabcd", "expected", "4"),
                Map.of("input", "1 4 aabb", "expected", "2"),
                Map.of("input", "1 3 aaa", "expected", "1"),
                Map.of("input", "1 5 abcde", "expected", "5"),
                Map.of("input", "1 6 abccba", "expected", "3"),
                Map.of("input", "1 8 abcabcab", "expected", "3")
        );

        return pistonService.runAllTests(code, lang,"", testCases);
    }
    public SubmitResponse question4(String code, String lang) throws JsonProcessingException {
        System.out.println("test1");

        List<Map<String, String>> testCases = List.of(
                Map.of("input", "1 5 1 2 3 4 5", "expected", "120 60 40 30 24"),
                Map.of("input", "1 4 2 3 4 5", "expected", "60 40 30 24"),
                Map.of("input", "1 3 1 2 3", "expected", "6 3 2"),
                Map.of("input", "1 6 1 2 3 4 5 6", "expected", "720 360 240 180 144 120"),
                Map.of("input", "1 7 1 2 3 4 5 6 7", "expected", "5040 2520 1680 1260 1008 840 720"),
                Map.of("input", "1 3 0 2 3", "expected", "6 0 0"),
                Map.of("input", "1 4 1 0 3 4", "expected", "0 12 0 0"),
                Map.of("input", "1 5 2 2 2 2 2", "expected", "16 16 16 16 16"),
                Map.of("input", "1 6 1 1 1 1 1 1", "expected", "1 1 1 1 1 1"),
                Map.of("input", "1 2 1 2", "expected", "2 1")
        );

        System.out.println(testCases);

        return pistonService.runAllTests(code, lang,"", testCases);
    }
    public SubmitResponse question1Run(String code, String lang) throws JsonProcessingException {
        System.out.println("test1");

        List<Map<String, String>> testCases = List.of(
                Map.of("input", "1 6 -1 0 1 2 -1 -4", "expected", "-1 -1 2\n-1 0 1"),
                Map.of("input", "1 5 0 0 0 0 0", "expected", "0 0 0"),
                Map.of("input", "1 4 1 2 -2 -1", "expected", ""),
                Map.of("input", "1 7 -1 0 1 2 -1 -4 3", "expected", "-4 1 3\n-1 -1 2\n-1 0 1"),
                Map.of("input", "1 3 -2 1 1", "expected", "-2 1 1"),
                Map.of("input", "1 6 -2 0 2 2 -1 1", "expected", "-2 0 2\n-1 0 1"),
                Map.of("input", "1 5 -5 2 3 0 0", "expected", "-5 2 3"),
                Map.of("input", "1 8 1 -1 0 -1 2 -2 3 -3", "expected", "-3 0 3\n-3 1 2\n-2 -1 3\n-2 0 2\n-1 -1 2\n-1 0 1"),
                Map.of("input", "1 4 -1 0 1 0", "expected", "-1 0 1"),
                Map.of("input", "1 6 3 -1 -7 4 2 1", "expected", "-7 3 4")
        );

        return pistonService.runAllTests(code, lang,"", testCases);
    }


    public SubmitResponse question2Run(String code, String lang) throws JsonProcessingException {
        System.out.println("test1");

        List<Map<String, String>> testCases = List.of(
                Map.of("input", "1 9 1 8 6 2 5 4 8 3 7", "expected", "49"),
                Map.of("input", "1 6 1 2 4 3 5 6", "expected", "12"),
                Map.of("input", "1 5 1 8 6 2 5", "expected", "12"),
                Map.of("input", "1 4 1 1 1 1", "expected", "3"),
                Map.of("input", "1 7 1 2 3 4 5 6 7", "expected", "12"),
                Map.of("input", "1 8 1 2 3 4 5 6 7 8", "expected", "15"),
                Map.of("input", "1 10 1 2 3 4 5 6 7 8 9 10", "expected", "24"),
                Map.of("input", "1 5 5 4 3 2 1", "expected", "6"),
                Map.of("input", "1 6 1 2 3 4 5 6", "expected", "12"),
                Map.of("input", "1 3 1 2 3", "expected", "2")
        );

        return pistonService.runAllTests(code, lang, "",testCases);
    }
    public SubmitResponse question3Run(String code, String lang) throws JsonProcessingException {
        System.out.println("test1");

        List<Map<String, String>> testCases = List.of(
                Map.of("input", "1 6 abcabc", "expected", "3"),
                Map.of("input", "1 5 bbbbb", "expected", "1"),
                Map.of("input", "1 6 pwwkew", "expected", "3"),
                Map.of("input", "1 7 abcdefg", "expected", "7"),
                Map.of("input", "1 8 abcaabcd", "expected", "4"),
                Map.of("input", "1 4 aabb", "expected", "2"),
                Map.of("input", "1 3 aaa", "expected", "1"),
                Map.of("input", "1 5 abcde", "expected", "5"),
                Map.of("input", "1 6 abccba", "expected", "3"),
                Map.of("input", "1 8 abcabcab", "expected", "3")
        );

        return pistonService.runAllTests(code, lang,"", testCases);
    }
    public SubmitResponse question4Run(String code, String lang) throws JsonProcessingException {
        System.out.println("test1");

        List<Map<String, String>> testCases = List.of(
                Map.of("input", "1 5 1 2 3 4 5", "expected", "120 60 40 30 24"),
                Map.of("input", "1 4 2 3 4 5", "expected", "60 40 30 24"),
                Map.of("input", "1 3 1 2 3", "expected", "6 3 2"),
                Map.of("input", "1 6 1 2 3 4 5 6", "expected", "720 360 240 180 144 120"),
                Map.of("input", "1 7 1 2 3 4 5 6 7", "expected", "5040 2520 1680 1260 1008 840 720"),
                Map.of("input", "1 3 0 2 3", "expected", "6 0 0"),
                Map.of("input", "1 4 1 0 3 4", "expected", "0 0 0 0"),
                Map.of("input", "1 5 2 2 2 2 2", "expected", "32 32 32 32 32"),
                Map.of("input", "1 6 1 1 1 1 1 1", "expected", "1 1 1 1 1 1"),
                Map.of("input", "1 2 1 2", "expected", "2 1")
        );

        return pistonService.runAllTests(code, lang, "",testCases);
    }
}
