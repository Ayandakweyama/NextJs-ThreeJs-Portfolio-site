"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { MessageCircle, X } from "lucide-react";

const ChatPanel = dynamic(() => import("./ChatPanel"), {
  loading: () => (
    <p role="status" className="fixed bottom-20 right-4 z-50 rounded-lg border border-white/15 bg-black/90 px-4 py-2 text-sm text-white">
      Opening Kwanda…
    </p>
  ),
});

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasOpened, setHasOpened] = useState(false);
  const Icon = isOpen ? X : MessageCircle;

  return (
    <>
      <button
        type="button"
        onClick={() => {
          setIsOpen(!isOpen);
          setHasOpened(true);
        }}
        className="fixed bottom-4 right-4 z-50 flex size-11 items-center justify-center gap-2 rounded-full border border-white/25 bg-black/90 font-medium text-white shadow-lg transition-colors hover:border-[#dbc2ac] sm:w-auto sm:px-3 sm:text-sm"
        aria-label={isOpen ? "Close chat" : "Ask Kwanda about my projects"}
        aria-expanded={isOpen}
      >
        <Icon size={20} aria-hidden="true" />
        <span className="hidden sm:inline">{isOpen ? "Close chat" : "Ask about my projects"}</span>
      </button>
      {hasOpened && <ChatPanel isOpen={isOpen} />}
    </>
  );
}
