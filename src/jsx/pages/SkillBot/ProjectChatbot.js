import React, { useEffect, useRef, useState } from "react";
import PageTitle from "../../layouts/PageTitle";
import "./ProjectChatbot.css";

const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

const INITIAL_MESSAGES = [
  {
    role: "assistant",
    content:
      "Hi, I am from Talent Lens AI Project Chatbot. How can I help you?\nAre you comfortable with English or Urdu? Please select your preferred language.",
  },
];

const ProjectChatbot = () => {
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const chatEndRef = useRef(null);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, loading]);

  const sendMessage = async (e) => {
    e.preventDefault();
    const text = input.trim();
    if (!text || loading) {
      return;
    }

    if (text.toLowerCase() === "exit") {
      setInput("");
      setError("");
      setMessages([
        {
          role: "assistant",
          content: "Chat closed. You have exited the chatbot. Type any message to start again.",
        },
      ]);
      return;
    }

    const userMessage = { role: "user", content: text };
    const historyForApi = messages.filter((m) => m.role === "user" || m.role === "assistant");

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setError("");
    setLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/api/project_chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_input: text,
          history: historyForApi,
        }),
      });

      const payload = await response.json();

      if (!response.ok) {
        throw new Error(payload.detail || payload.error || "Failed to fetch chat response.");
      }

      if (!payload.success) {
        throw new Error(payload.error || "Chat API returned an error.");
      }

      const apiMessages = payload?.data?.messages;
      if (Array.isArray(apiMessages) && apiMessages.length > 0) {
        const uiMessages = apiMessages.filter(
          (m) => m && (m.role === "assistant" || m.role === "user") && m.content
        );
        setMessages(uiMessages);
      }
    } catch (err) {
      setError(err.message || "Unable to connect to chat service.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <PageTitle activeMenu="AI Project Chatbot" motherMenu="Career Insights" />
      <div className="project-chatbot-page">
        <div className="project-chatbot-page-heading mb-4">
          <h1 className="mb-0">AI Interviewer</h1>
        </div>
        <div className="project-chatbot-shell">
          <div className="project-chatbot-header">
            <h2>AI Project Chatbot</h2>
            <p>Get project ideas by field and difficulty, with structured details and required tools.</p>
          </div>

          {error && <div className="project-chatbot-error">{error}</div>}

          <div className="project-chatbot-messages">
            {messages.map((msg, index) => (
              <div
                key={`${msg.role}-${index}`}
                className={`project-chatbot-bubble ${msg.role === "user" ? "user" : "assistant"}`}
              >
                {msg.content}
              </div>
            ))}
            {loading && <div className="project-chatbot-bubble assistant loading">Thinking...</div>}
            <div ref={chatEndRef} />
          </div>

          <form className="project-chatbot-input-row" onSubmit={sendMessage}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type Message...."
              disabled={loading}
            />
            <button type="submit" disabled={loading || !input.trim()}>
              {loading ? "Sending..." : "Send"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ProjectChatbot;
