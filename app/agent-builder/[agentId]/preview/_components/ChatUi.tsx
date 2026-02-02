"use client";

import React, { useState, useRef, useEffect } from "react"; // Added useRef and useEffect
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Loader2Icon, RefreshCcw, Send } from "lucide-react";
import { Agent } from "@/types/AgentType";
import Markdown from 'react-markdown'
type Props = {
  GenerateAgentToolConfig: () => void;
  loading: boolean;
  agentDetail?: Agent;
  conversationId?: string | null;
};

type UiMessage = {
  role: "user" | "agent";
  content: string;
};

type ApiMessage = {
  role: "user" | "model";
  content: string;
};

function ChatUi({
  GenerateAgentToolConfig,
  loading,
  agentDetail,
  conversationId,
}: Props) {
  const [userInput, setUserInput] = useState("");
  const [messages, setMessages] = useState<UiMessage[]>([]);
  const [loadingMsg, setLoadingMsg] = useState(false);

  // 1. Create a reference for the bottom of the chat
  const scrollRef = useRef<HTMLDivElement>(null);

  // 2. Automatically scroll to the bottom when messages change
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const OnSendMsg = async () => {
    if (!userInput.trim() || !agentDetail?.agentToolConfig) return;

    setLoadingMsg(true);

    const newUserMsg: UiMessage = {
      role: "user",
      content: userInput,
    };

    setMessages((prev) => [...prev, newUserMsg]);
    setUserInput("");

    const apiMessages: ApiMessage[] = [...messages, newUserMsg].map((m) => ({
      role: m.role === "user" ? "user" : "model",
      content: m.content,
    }));

    try {
      const res = await fetch("/api/agent-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: apiMessages,
          conversationId,
          agentToolConfig: agentDetail.agentToolConfig,
        }),
      });

      if (!res.ok || !res.body) {
        const errText = await res.text();
        console.error("API Error:", res.status, errText);
        setLoadingMsg(false);
        return;
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let cumulativeText = "";

      // Add placeholder for streaming response
      setMessages((prev) => [...prev, { role: "agent", content: "" }]);

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        const decodedChunk = decoder.decode(value);
        cumulativeText += decodedChunk;

        setMessages((prev) => {
          const updated = [...prev];
          const lastMsgIndex = updated.length - 1;
          if (updated[lastMsgIndex].role === "agent") {
            updated[lastMsgIndex] = { ...updated[lastMsgIndex], content: cumulativeText };
          }
          return updated;
        });
      }
    } catch (err) {
      console.error("OnSendMsg Error:", err);
    } finally {
      setLoadingMsg(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header */}
      <div className="flex justify-between items-center border-b p-4 shadow-sm">
        <div>
          <h2 className="font-bold text-sm">
            {agentDetail?.name || "AI Agent"}
          </h2>
          <div className="flex items-center gap-1.5">
            <div
              className={`h-2 w-2 rounded-full ${
                agentDetail?.agentToolConfig ? "bg-green-500" : "bg-amber-500"
              }`}
            />
            <span className="text-[10px] uppercase tracking-wider font-semibold text-gray-500">
              {agentDetail?.agentToolConfig ? "Online" : "Offline"}
            </span>
          </div>
        </div>

        <Button
          onClick={GenerateAgentToolConfig}
          disabled={loading}
          size="sm"
          variant="outline"
          className="h-8"
        >
          <RefreshCcw
            className={`mr-2 h-3.5 w-3.5 ${loading ? "animate-spin" : ""}`}
          />
          Reboot
        </Button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/50">
        {messages.map((m, idx) => (
          <div
            key={idx}
            className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`p-3 rounded-2xl max-w-[85%] text-sm shadow-sm ${
                m.role === "user"
                  ? "bg-zinc-800 text-white rounded-tr-none"
                  : "bg-gray-300 text-black rounded-tl-none"
              }`}
            >
              {m.content}
            </div>
     
          </div>
        ))}

        {/* 3. The invisible div that acts as the scroll anchor */}
        <div ref={scrollRef} />

        {loadingMsg && (
          <div className="flex items-center gap-2 text-xs text-zinc-500 italic p-2">
            <div className="animate-pulse">●</div> Agent is thinking...
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="border-t p-4 bg-white">
        <div className="relative">
          <Textarea
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="Type your message..."
            className="resize-none pr-12 min-h-[80px] rounded-xl"
            rows={3}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                OnSendMsg();
              }
            }}
          />

          <Button
            onClick={OnSendMsg}
            size="icon"
            className="absolute bottom-2 right-2 h-8 w-8 rounded-lg"
            disabled={!agentDetail?.agentToolConfig || loadingMsg}
          >
            {loadingMsg ? (
              <Loader2Icon className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ChatUi;