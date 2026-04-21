import React, { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import PageTitle from "../../layouts/PageTitle";
import "./ProjectChatbot.css";

const InterviewAI = () => {
   const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

   const INITIAL_MESSAGES = [
      {
         role: "assistant",
         content: "Hello, I am an AI Interviewer from TalentLens AI. What's your good name?",
      },
   ];

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
      const historyForApi = messages.filter((message) => message.role === "user" || message.role === "assistant");

      setMessages((previousMessages) => [...previousMessages, userMessage]);
      setInput("");
      setError("");
      setLoading(true);

      try {
         const response = await fetch(`${API_BASE_URL}/api/interview`, {
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
               (message) => message && (message.role === "assistant" || message.role === "user") && message.content
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
         <PageTitle activeMenu="AI Interviewer" motherMenu="Career Insights" />
         <div className="project-chatbot-page">
            <div className="project-chatbot-page-heading mb-4">
               <h1 className="mb-0">AI Interviewer</h1>
            </div>

            <div className="project-chatbot-shell">
               <div className="project-chatbot-header">
                  <h2>AI Interview Chatbot</h2>
                  <p>Practice structured interviews by field with concise, professional responses.</p>
               </div>

               {error && <div className="project-chatbot-error">{error}</div>}

               <div className="project-chatbot-messages">
                  {messages.map((message, index) => (
                     <div
                        key={`${message.role}-${index}`}
                        className={`project-chatbot-bubble ${message.role === "user" ? "user" : "assistant"}`}
                     >
                        <ReactMarkdown>{message.content}</ReactMarkdown>
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

export default InterviewAI;
