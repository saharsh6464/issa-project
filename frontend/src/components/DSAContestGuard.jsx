import React, { useState, useEffect } from "react";
import sha256 from "crypto-js/sha256";
import { unlock, tabSwitch, copyPaste, isLock } from "../store/api/api";

const DSAContestGuard = () => {
  const [locked, setLocked] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");

  // Check lock status on mount
  useEffect(() => {
    const checkLockStatus = async () => {
      try {
        const res = await isLock();
        if (res.data.locked) setLocked(true);
      } catch (err) {
        console.error("Error checking lock status", err);
      }
    };
    checkLockStatus();
  }, []);

  useEffect(() => {
    // Trigger lock
    const lockScreen = () => setLocked(true);

    // Detect copy/paste via keyboard
    const handleKeyDown = (e) => {
      const key = e.key.toLowerCase();

      if (
        (e.ctrlKey || e.metaKey) &&
        ["c", "v", "x", "s", "p", "a"].includes(key)
      ) {
        e.preventDefault();
        lockScreen();
        copyPaste(); // call API
      }

      // Ctrl+Shift+I or F12 (DevTools)
      if ((e.ctrlKey && e.shiftKey && key === "i") || e.key === "F12") {
        e.preventDefault();
        lockScreen();
      }
    };

    // Tab switch or window blur
    const handleBlur = () => {
      lockScreen();
      tabSwitch();
    };

    // Refresh / close
    const handleBeforeUnload = (e) => {
      lockScreen();
      tabSwitch();
      e.preventDefault();
      e.returnValue = "";
    };

    // Block right-click (browser context menu)
    const handleContextMenu = (e) => e.preventDefault();

    // Attach listeners
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("contextmenu", handleContextMenu);
    window.addEventListener("blur", handleBlur);
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("contextmenu", handleContextMenu);
      window.removeEventListener("blur", handleBlur);
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  // Unlock handler
  const handleUnlock = async () => {
    const hashedPassword = sha256(passwordInput).toString();
    console.log(hashedPassword);
    try {
      const res = await unlock(hashedPassword);
      console.log(res);
      if (res.data) {
        setLocked(false);
        setPasswordInput("");
      } else {
        alert("Incorrect password!");
      }
    } catch (err) {
      alert("Error unlocking!");
    }
  };

  if (!locked) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0,0,0,0.95)",
        color: "#fff",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999,
        pointerEvents: "all",
      }}
    >
      <h2>Screen Locked</h2>
      <p>You cannot continue until unlocked by password</p>
      <input
        type="password"
        placeholder="Enter password"
        value={passwordInput}
        onChange={(e) => setPasswordInput(e.target.value)}
        style={{ padding: "10px", fontSize: "16px" }}
      />
      <button
        onClick={handleUnlock}
        style={{ padding: "10px 20px", marginTop: "10px" }}
      >
        Unlock
      </button>
    </div>
  );
};

export default DSAContestGuard;
