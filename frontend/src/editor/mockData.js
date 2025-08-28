
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
  "id": 2,
  "title": "Sum of Two Numbers",
  "description": "Given two integers a and b, return their sum.",
  "difficulty": "easy",
  "timeComplexity": "O(1)",
  "spaceComplexity": "O(1)",
  "Testcase_detail": {
    "inputFormat": "t = number of test cases (always 1 here)\na, b = two integers",
    "outputFormat": "Single integer = sum of a and b",
    "isSample": "Input:\nt=1\na=3 b=5\nOutput:\n8"
  },
  "inputFileExample": "# Test input\nt=1\na=3 b=5\n# Expected output\n8"
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