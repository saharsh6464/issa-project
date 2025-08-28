import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaArrowLeft, FaPlay, FaUpload } from "react-icons/fa";
import Editor from "@monaco-editor/react";
import { mockProblems } from "./mockData"; // adjust path if needed
import { submitCode, runCode } from "../store/api/api";
import { toast, Toaster } from "react-hot-toast";

const DEFAULT_CODE = {};

export default function CodingInterface() {
  const { problemId } = useParams();
  const navigate = useNavigate();

  const [problem, setProblem] = useState(null);
  const [language, setLanguage] = useState("javascript");
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");
  const [isSuccess, setIsSuccess] = useState(null);
  const [leftPanelWidth, setLeftPanelWidth] = useState(40);
  const isResizing = useRef(false);
  const containerRef = useRef(null);
  const editorRef = useRef(null);
  const [isRunning, setIsRunning] = useState(false);
const [isSubmitting, setisSubmitting] = useState(false);


  // Load problem
  useEffect(() => {
    const currentProblem = mockProblems.find(
      (p) => p.id === parseInt(problemId, 10)
    );
    if (!currentProblem) {
      setProblem({ title: "Problem Not Found" });
      return;
    }
    setProblem(currentProblem);
  }, [problemId]);

  // Reset editor content when language changes
  useEffect(() => {
    setCode(DEFAULT_CODE[language]);
    setOutput("");
    setIsSuccess(null);
  }, [language]);

  // Resizer
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isResizing.current || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const percentage = Math.min(80, Math.max(20, (x / rect.width) * 100));
      setLeftPanelWidth(percentage);
    };

    const handleMouseUp = () => {
      isResizing.current = false;
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  const handleMouseDown = () => {
    isResizing.current = true;
    document.body.style.cursor = "col-resize";
    document.body.style.userSelect = "none";
  };

  const handleEditorDidMount = (editor) => {
    editorRef.current = editor;
  };


  // Submit Code (50 calls + timings)
const handleSubmit = async () => {
  const payload = {
    problemId: problem?.id,
    language,
    code,
  };
  try {  
    setisSubmitting(true);
      const res = await submitCode(payload.problemId, payload.code, payload.language);  
       setIsSuccess(true);
       setOutput(res.data.output);
       setisSubmitting(false);
//         console.log(res.data.output)
  } catch (err) {
    setIsSuccess(false);
    setOutput(String(err));
    setisSubmitting(false);
    toast.error("Error during submission benchmarking");
  }
}; 

const handleRun = async () => {
  const payload = {
    problemId: problem?.id,
    language,
    code,
  };
  try {  
    setIsRunning(true);
      
      const res = await submitCode(payload.problemId, payload.code, payload.language);  
       setIsSuccess(true);
       setOutput(res.data.output);
        setIsRunning(false);
//         console.log(res.data.output)
  } catch (err) {
    setIsSuccess(false);
    setOutput(String(err));
     setIsRunning(false);
    toast.error("Error during submission benchmarking");
  }
}; 


//   // Submit Code (50 calls + timings)
// const handleSubmit = async () => {
//   const payload = {
//     problemId: problem?.id,
//     language,
//     code,
//   };
  

//   try {
//     const times = [];

//     const promises = Array.from({ length: 20}, async (_, i) => {
//       const start = performance.now();
//       const res = await submitCode(payload.problemId, payload.code, payload.language);
//       const end = performance.now();

//       const elapsed = (end - start).toFixed(2);
//       times.push({ request: i + 1, time: elapsed, success: res.data?.success });
//         setIsSuccess(true);
//         setOutput(res.data.output);
//         console.log(res.data.output)
//       return res;
//     });

//     // wait until all requests complete
//     await Promise.all(promises);

//     // log after all calls finish
//     console.log("=== Benchmark Results (50 requests) ===");
//     times.forEach(t => {
//       console.log(`Request ${t.request}: ${t.time} ms (success: ${t.success})`);
//     });

//     const avg = times.reduce((sum, t) => sum + parseFloat(t.time), 0) / times.length;
//     console.log(`Average: ${avg.toFixed(2)} ms`);
//     console.log(`Fastest: ${Math.min(...times.map(t => parseFloat(t.time))).toFixed(2)} ms`);
//     console.log(`Slowest: ${Math.max(...times.map(t => parseFloat(t.time))).toFixed(2)} ms`);

//     toast.success("50 submissions completed! Check console for timings.");
   
//   } catch (err) {
//     setIsSuccess(false);
//     setOutput(String(err));
//     toast.error("Error during submission benchmarking");
//   }
// }; 

  if (!problem) {
    return <div className="text-white p-6 text-center">Loading problem...</div>;
  }

  if (problem.title === "Problem Not Found") {
    return (
      <div className="text-red-400 p-6 text-center">
        Error: Problem not found.
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-slate-900 text-white">
      <Toaster position="top-right" />

      {/* Header */}
      <header className="flex-shrink-0 p-3 border-b border-slate-700 flex items-center gap-3">
        <button
          onClick={() => navigate("/questions")}
          className="inline-flex items-center gap-2 text-sm text-indigo-400 hover:text-indigo-300"
        >
          <FaArrowLeft /> Back to Problem List
        </button>

        <div className="flex-1 text-center font-bold text-lg">
          {problem.title}
        </div>

        {/* Language select */}
        <select
          className="text-sm bg-slate-800 border border-slate-700 rounded-lg px-3 py-1.5"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
        >
          <option value="javascript">JavaScript</option>
          <option value="python">Python</option>
          <option value="cpp">C++</option>
          <option value="java">Java</option>
        </select>

        {/* Run */}
      <button
  onClick={handleRun}
  disabled={isRunning}
  className={`ml-2 inline-flex items-center gap-2 font-semibold px-4 py-1.5 rounded-lg border border-slate-600
    ${isRunning ? "bg-slate-600 cursor-not-allowed" : "bg-slate-800 hover:bg-slate-700 text-white"}
  `}
>
  {isRunning ? (
    <>
      <svg
        className="animate-spin h-4 w-4 text-white"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 100 16v-4l-3 3 3 3v-4a8 8 0 01-8-8z"
        ></path>
      </svg>
      Running...
    </>
  ) : (
    <>
      <FaPlay /> Run
    </>
  )}
</button>


        {/* Submit */}
        <button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className={`ml-2 inline-flex items-center gap-2 font-semibold px-4 py-1.5 rounded-lg
    ${
      isSubmitting
        ? "bg-indigo-400 cursor-not-allowed"
        : "bg-indigo-600 hover:bg-indigo-700 text-white"
    }
  `}
        >
          {isSubmitting ? (
            <>
              <svg
                className="animate-spin h-4 w-4 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 100 16v-4l-3 3 3 3v-4a8 8 0 01-8-8z"
                ></path>
              </svg>
              Submitting...
            </>
          ) : (
            <>
              <FaUpload /> Submit
            </>
          )}
        </button>
      </header>

      {/* Main */}
      <div className="flex-grow flex overflow-hidden" ref={containerRef}>
        {/* Left Panel */}
        <div
          className="overflow-y-auto p-6 bg-slate-900 border-r border-slate-800"
          style={{ width: `${leftPanelWidth}%` }}
        >
          <h1 className="text-2xl font-bold mb-4">{problem.title}</h1>

          <div className="space-y-4 text-slate-300">
            <p>{problem.description}</p>
            {/* Meta */}
            <div className="flex flex-wrap gap-3 text-sm">
              <span className="px-3 py-1 bg-slate-800 rounded-full text-indigo-400 font-medium capitalize">
                {problem.difficulty}
              </span>
              <span className="px-3 py-1 bg-slate-800 rounded-full text-green-400">
                Time: {problem.timeComplexity}
              </span>
              <span className="px-3 py-1 bg-slate-800 rounded-full text-yellow-400">
                Space: {problem.spaceComplexity}
              </span>
            </div>

            {/* Input Format */}
            <div>
              <h3 className="text-white font-semibold mb-1">Input Format</h3>
              <pre className="bg-slate-800 p-3 rounded-lg text-sm whitespace-pre-wrap">
                {problem?.Testcase_detail?.inputFormat}
              </pre>
            </div>

            {/* Output Format */}
            <div>
              <h3 className="text-white font-semibold mb-1">Output Format</h3>
              <pre className="bg-slate-800 p-3 rounded-lg text-sm whitespace-pre-wrap">
                {problem?.Testcase_detail?.outputFormat}
              </pre>
            </div>

            {/* Sample Test Case */}
            <div>
              <h3 className="text-white font-semibold mb-1">
                Sample Test Case
              </h3>
              <div className="bg-slate-800 p-4 rounded-lg text-sm whitespace-pre-wrap">
                {problem?.Testcase_detail?.isSample ||
                  "No sample test case available."}
              </div>
            </div>

            {/* Input File Example */}
            {problem?.inputFileExample && (
              <div>
                <h3 className="text-white font-semibold mb-1">
                  Input File Example (structured)
                </h3>
                <pre className="bg-slate-800 p-4 rounded-lg text-sm whitespace-pre-wrap">
                  {problem.inputFileExample}
                </pre>
              </div>
            )}
          </div>
        </div>

        {/* Resizer */}
        <div
          onMouseDown={handleMouseDown}
          className="w-1.5 cursor-col-resize bg-slate-700 hover:bg-slate-600"
          title="Drag to resize"
        />

        {/* Right Panel */}
        <div
          className="flex flex-col"
          style={{ width: `${100 - leftPanelWidth}%` }}
        >
          <div className="flex-grow bg-[#1e1e1e]">
            <Editor
              height="100%"
              theme="vs-dark"
              language={
                language === "python"
                  ? "python"
                  : language === "java"
                  ? "java"
                  : language === "cpp"
                  ? "cpp"
                  : "javascript"
              }
              value={code}
              onChange={(value) => setCode(value ?? "")}
              onMount={handleEditorDidMount}
              options={{
                fontSize: 14,
                minimap: { enabled: false },
                scrollBeyondLastLine: false,
                automaticLayout: true,
              }}
            />
          </div>

          {/* Output */}
          <div className="border-t border-slate-800 bg-slate-900 p-3">
            <div className="text-xs uppercase tracking-wide text-slate-400 mb-2">
              Output
            </div>
            <pre
              className={`p-3 rounded-lg text-sm whitespace-pre-wrap min-h-[120px] ${
                isSuccess === true
                  ? "bg-green-900 text-green-200"
                  : isSuccess === false
                  ? "bg-red-900 text-red-200"
                  : "bg-slate-800 text-slate-200"
              }`}
            >
              {output || "—"}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
