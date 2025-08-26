// export const mockProblems = [
//   {
//     id: 1,
//     title: "3Sum",
//     description:
//       "Given an integer array nums, return all unique triplets [nums[i], nums[j], nums[k]] such that i != j, i != k, j != k, and nums[i] + nums[j] + nums[k] == 0. The solution set must not contain duplicate triplets.",
//     difficulty: "medium",
//     timeComplexity: "O(n^2)",
//     spaceComplexity: "O(1) or O(n)",
//     Testcase_detail: {
//       inputFormat:
//         "First number = number of test cases (always 1 here)\nSecond number = number of elements in the array\nRemaining numbers = array elements",
//       outputFormat:
//         "Each line = one triplet that sums to 0\nNumbers space-separated, no brackets\nTriplets sorted ascendingly and no duplicates",
//       isSample: `Input:\n1 6 -1 0 1 2 -1 -4\nOutput:\n-1 -1 2\n-1 0 1`,
//     },
//     inputFileExample: `# Test input file format:
// # First number -> number of testcases (always 1 here)
// # Then for each testcase:
// #   Second number -> number of elements
// #   Remaining numbers -> array elements
// #   Expected output -> triplets line by line

// 1 6 -1 0 1 2 -1 -4
// -1 -1 2
// -1 0 1`,
//   },
//   {
//     id: 2,
//     title: "Container With Most Water",
//     description:
//       "You are given an integer array height of length n. Find two lines that form a container such that it holds the most water. Return the maximum area.",
//     difficulty: "medium",
//     timeComplexity: "O(n)",
//     spaceComplexity: "O(1)",
//     Testcase_detail: {
//       inputFormat:
//         "First number = number of test cases (always 1 here)\nSecond number = number of elements in the array\nRemaining numbers = array elements",
//       outputFormat: "A single integer representing the maximum area.",
//       isSample: `Input:\n1 9 1 8 6 2 5 4 8 3 7\nOutput:\n49`,
//     },
//     inputFileExample: `# Test input file format:
// # Line 1 -> number of testcases
// # Then for each testcase:
// #   Second number -> size of array
// #   Remaining numbers -> array elements
// #   Line after -> expected output

// 1 9 1 8 6 2 5 4 8 3 7
// 49`,
//   },
//   {
//     id: 3,
//     title: "Longest Substring Without Repeating Characters",
//     description:
//       "Given a string s, find the length of the longest substring without repeating characters.",
//     difficulty: "medium",
//     timeComplexity: "O(n)",
//     spaceComplexity: "O(min(n, m))",
//     Testcase_detail: {
//       inputFormat:
//         "First number = number of test cases (always 1 here)\nSecond number = length of the string\nRemaining = string characters",
//       outputFormat:
//         "A single integer representing the length of the longest substring without repeating characters",
//       isSample: `Input:\n1 6 abcabc\nOutput:\n3`,
//     },
//     inputFileExample: `# Test input file format:
// # Line 1 -> number of testcases
// # Then for each testcase:
// #   Second number -> string length
// #   Remaining -> string
// #   Line after -> expected output

// 1 6 abcabc
// 3`,
//   },
//   {
//     id: 4,
//     title: "Product of Array Except Self",
//     description:
//       "Given an integer array nums, return an array answer such that answer[i] is the product of all elements of nums except nums[i]. Solve in O(n) without using division.",
//     difficulty: "medium",
//     timeComplexity: "O(n)",
//     spaceComplexity: "O(1)",
//     Testcase_detail: {
//       inputFormat:
//         "First number = number of test cases (always 1 here)\nSecond number = number of elements in the array\nRemaining numbers = array elements",
//       outputFormat:
//         "A single line of integers, each value is product of all array elements except the current index",
//       isSample: `Input:\n1 5 1 2 3 4 5\nOutput:\n120 60 40 30 24`,
//     },
//     inputFileExample: `# Test input file format:
// # Line 1 -> number of testcases
// # Then for each testcase:
// #   Second number -> array length
// #   Remaining -> array elements
// #   Line after -> expected output

// 1 5 1 2 3 4 5
// 120 60 40 30 24`,
//   },
// ];
export const mockProblems = [
  {
    id: 1,
    title: "3Sum",
    description:
      "Given an integer array nums, return all unique triplets [nums[i], nums[j], nums[k]] such that i != j != k and nums[i] + nums[j] + nums[k] == 0. The solution set must not contain duplicate triplets.",
    difficulty: "medium",
    timeComplexity: "O(n^2)",
    spaceComplexity: "O(1) or O(n)",
    Testcase_detail: {
      inputFormat:
        "t = number of test cases (always 1 here)\nn = number of elements in the array\narr = array elements",
      outputFormat:
        "Each line = one triplet that sums to 0\nNumbers space-separated, no brackets\nTriplets sorted ascendingly and no duplicates",
      isSample: `Input:\nt=1\nn=6\narr=-1 0 1 2 -1 -4\nOutput:\n-1 -1 2\n-1 0 1`,
    },
    inputFileExample: `# Test input
t=1
n=6
arr=-1 0 1 2 -1 -4
# Expected output
-1 -1 2
-1 0 1`,
  },
  {
    id: 2,
    title: "Container With Most Water",
    description:
      "Given an integer array height of length n, find two lines that form a container holding the most water. Return the maximum area.",
    difficulty: "medium",
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    Testcase_detail: {
      inputFormat:
        "t = number of test cases (always 1 here)\nn = number of elements in the array\narr = array elements",
      outputFormat: "A single integer representing the maximum area.",
      isSample: `Input:\nt=1\nn=9\narr=1 8 6 2 5 4 8 3 7\nOutput:\n49`,
    },
    inputFileExample: `# Test input
t=1
n=9
arr=1 8 6 2 5 4 8 3 7
# Expected output
49`,
  },
  {
    id: 3,
    title: "Longest Substring Without Repeating Characters",
    description:
      "Given a string s, find the length of the longest substring without repeating characters.",
    difficulty: "medium",
    timeComplexity: "O(n)",
    spaceComplexity: "O(min(n, m))",
    Testcase_detail: {
      inputFormat:
        "t = number of test cases (always 1 here)\nn = length of the string\ns = string characters",
      outputFormat:
        "A single integer representing the length of the longest substring without repeating characters",
      isSample: `Input:\nt=1\nn=6\ns=abcabc\nOutput:\n3`,
    },
    inputFileExample: `# Test input
t=1
n=6
s=abcabc
# Expected output
3`,
  },
  {
    id: 4,
    title: "Product of Array Except Self",
    description:
      "Given an integer array nums, return an array where answer[i] is the product of all elements except nums[i]. Solve in O(n) without using division.",
    difficulty: "medium",
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    Testcase_detail: {
      inputFormat:
        "t = number of test cases (always 1 here)\nn = number of elements in the array\narr = array elements",
      outputFormat:
        "A single line of integers, each value is product of all array elements except the current index",
      isSample: `Input:\nt=1\nn=5\narr=1 2 3 4 5\nOutput:\n120 60 40 30 24`,
    },
    inputFileExample: `# Test input
t=1
n=5
arr=1 2 3 4 5
# Expected output
120 60 40 30 24`,
  },
];