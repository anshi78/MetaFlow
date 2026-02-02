"use client";

import React, { useState } from "react";
import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs";
import "prismjs/components/prism-json";
import "prismjs/themes/prism-tomorrow.css"; // Dark theme
import { Check, Copy, FileCode } from "lucide-react";

export function CodeBlock({ code, filename = "agent-config.json" }: { code: string, filename?: string }) {
  const [copied, setCopied] = useState(false);

  const onCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-xl border border-zinc-200 bg-zinc-50 overflow-hidden shadow-sm">
      {/* Tab Header */}
      <div className="flex items-center justify-between bg-zinc-100/80 px-4 py-2 border-b border-zinc-200">
        <div className="flex items-center gap-2 text-zinc-600">
          <FileCode size={16} className="text-blue-500" />
          <span className="text-xs font-medium">{filename}</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider">json</span>
          <button onClick={onCopy} className="text-zinc-500 hover:text-zinc-800 transition-colors">
            {copied ? <Check size={14} className="text-green-600" /> : <Copy size={14} />}
          </button>
        </div>
      </div>

      {/* Code Area with Vertical Scrolling */}
      <div className="p-4 bg-white overflow-x-auto overflow-y-auto max-h-[400px] custom-scrollbar">
        <style>{`
          .code-editor textarea { outline: none !important; }
          .code-editor pre { white-space: pre !important; }
          
          /* Optional: Custom Scrollbar for the "Perfect" look */
          .custom-scrollbar::-webkit-scrollbar {
            width: 8px;
            height: 8px;
          }
          .custom-scrollbar::-webkit-scrollbar-track {
            background: #f1f1f1;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb {
            background: #d4d4d8;
            border-radius: 10px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background: #a1a1aa;
          }
        `}</style>
        <Editor
          value={code}
          onValueChange={() => {}} // Read-only
          highlight={(code) => highlight(code, languages.json, "json")}
          padding={10}
          className="code-editor font-mono text-sm"
          style={{
            fontFamily: '"Fira code", "Fira Mono", monospace',
            fontSize: 13,
            minHeight: '100%', // Ensures the editor fills the scrollable area
          }}
        />
      </div>
    </div>
  );
}