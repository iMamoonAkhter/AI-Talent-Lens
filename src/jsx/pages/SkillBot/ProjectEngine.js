import React, { useState, useEffect, useRef } from "react";
import { toast } from "react-toastify";
import PageTitle from "../../layouts/PageTitle";
import "./ProjectEngine.css";

const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";
const PROCESSING_TOAST = "Processing your request...";
const SUCCESS_TOAST = "Operation completed successfully";
const ERROR_TOAST = "Something went wrong. Please try again.";
const CHATBOT_WELCOME =
   "Hi, I am from Talent Lens AI Project Chatbot. How can I help you?\nAre you comfortable with English or Urdu? Please select your preferred language.";

const ProjectEngine = () => {
   const [formData, setFormData] = useState({
      name: "",
      field: "",
      level: "Easy",
   });
   
   const [options, setOptions] = useState({ fields: [] });
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState(null);
   const [result, setResult] = useState(null);

   // Chatbot States
   const [isChatOpen, setIsChatOpen] = useState(false);
   const [chatInput, setChatInput] = useState("");
   const [isChatLoading, setIsChatLoading] = useState(false);
   const [chatHistory, setChatHistory] = useState([
      { role: 'assistant', content: CHATBOT_WELCOME }
   ]);
   const chatBodyRef = useRef(null);

   useEffect(() => {
      const fallbackFields = ["CS", "AI", "Data Science", "Cyber Security", "SE", "Business Analytics"];
      
      const fetchOptions = async () => {
         try {
            const response = await fetch(`${API_BASE_URL}/api/options`);
            if (response.ok) {
               const data = await response.json();
               setOptions({ fields: data.fields || fallbackFields });
            } else {
               setOptions({ fields: fallbackFields });
            }
         } catch (err) {
            setOptions({ fields: fallbackFields });
         }
      };
      fetchOptions();
   }, []);

   // Auto-scroll to bottom of chat when new message is added
   useEffect(() => {
      if (chatBodyRef.current) {
         chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
      }
   }, [chatHistory, isChatOpen]);

   const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
      setError(null);
   };

   const handleLevelSelect = (level) => {
      setFormData((prev) => ({ ...prev, level }));
   };

   const handleSubmit = async (e) => {
      e.preventDefault();
      if (!formData.name || !formData.field) {
         setError("Please complete all required fields.");
         toast.error(ERROR_TOAST);
         return;
      }

      const toastId = toast.loading(PROCESSING_TOAST);

      setLoading(true);
      setError(null);

      try {
         const response = await fetch(`${API_BASE_URL}/api/projects`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
         });

         if (!response.ok) {
            const errData = await response.json();
            throw new Error(errData.error || "Failed to generate projects.");
         }

         const data = await response.json();
         setResult(data.data || data); // Extract 'data' from the backend response wrapper
         toast.update(toastId, {
            render: SUCCESS_TOAST,
            type: "success",
            isLoading: false,
            autoClose: 3000,
         });
      } catch (err) {
         console.error("Error fetching projects:", err);
         setError(err.message || "Backend connection failed. Please ensure the /api/projects endpoint is running.");
         toast.update(toastId, {
            render: ERROR_TOAST,
            type: "error",
            isLoading: false,
            autoClose: 3000,
         });
      } finally {
         setLoading(false);
      }
   };

   const handleReset = () => {
      setFormData({ name: "", field: "", level: "Easy" });
      setResult(null);
      setError(null);
   };

   const handleSendMessage = async (e) => {
      e.preventDefault();
      if (!chatInput.trim()) return;

      if (chatInput.trim().toLowerCase() === "exit") {
         setChatInput("");
         setIsChatOpen(false);
         setChatHistory([{ role: "assistant", content: CHATBOT_WELCOME }]);
         return;
      }

      const userMessage = { role: 'user', content: chatInput };
      const historyForApi = chatHistory.filter(
         (msg) => msg.role === "assistant" || msg.role === "user"
      );
      const currentHistory = [...chatHistory, userMessage];
      
      setChatHistory(currentHistory);
      setChatInput("");
      setIsChatLoading(true);

      try {
         const response = await fetch(`${API_BASE_URL}/api/project_chat`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ user_input: userMessage.content, history: historyForApi }),
         });

         const data = await response.json();
         if (data.success && data.data?.messages) {
            const uiMessages = data.data.messages.filter(
               (msg) => msg.role === "assistant" || msg.role === "user"
            );
            setChatHistory(uiMessages);
         }
      } catch (err) {
         console.error("Chat error:", err);
      } finally {
         setIsChatLoading(false);
      }
   };

   return (
      <>
         <PageTitle activeMenu="Project Engine" motherMenu="Innovation Hub" />
         
         <div className="project-engine-container">
            {!result ? (
               <div className="pe-card animate-fade-in">
                  <div className="pe-header">
                     <h2>Project Engine</h2>
                     <p>Generate personalized projects and skill maps based on your domain and complexity level.</p>
                  </div>
                  
                  <form onSubmit={handleSubmit} className="pe-form">
                     <div className="pe-form-group">
                        <label>Your Name</label>
                        <input 
                           type="text" 
                           name="name" 
                           className="pe-input" 
                           placeholder="e.g., John Doe" 
                           value={formData.name} 
                           onChange={handleInputChange} 
                        />
                     </div>
                     
                     <div className="pe-form-group">
                        <label>Domain / Field</label>
                        <select 
                           name="field" 
                           className="pe-input" 
                           value={formData.field} 
                           onChange={handleInputChange}
                        >
                           <option value="" disabled>Select a field</option>
                           {options.fields.map(f => (
                              <option key={f} value={f}>{f}</option>
                           ))}
                        </select>
                     </div>
                     
                     <div className="pe-form-group">
                        <label>Complexity Level</label>
                        <div className="pe-level-selector">
                           {["Easy", "Medium", "Hard"].map(level => (
                              <button 
                                 type="button"
                                 key={level}
                                 className={`pe-level-btn ${formData.level === level ? "active" : ""}`}
                                 onClick={() => handleLevelSelect(level)}
                              >
                                 {level}
                              </button>
                           ))}
                        </div>
                     </div>

                     {error && <div className="pe-error">{error}</div>}

                     <button type="submit" className="pe-submit-btn" disabled={loading}>
                        {loading ? (
                           <span className="pe-loading-text">Generating...</span>
                        ) : (
                           "Discover Projects"
                        )}
                     </button>
                  </form>
               </div>
            ) : (
               <div className="pe-results animate-slide-up">
                  <div className="pe-results-header">
                     <div className="pe-results-title">
                        <h2>{formData.name}'s Project Portfolio</h2>
                        <span className="pe-badge">{result.field} • {result.level}</span>
                     </div>
                     <button onClick={handleReset} className="pe-reset-btn">New Search</button>
                  </div>
                  
                  <div className="pe-skills-section">
                     <div className="pe-skill-card basic">
                        <h3>🌱 Core Skills</h3>
                        <div className="pe-tags">
                           {result.skills?.basics?.map((skill, i) => (
                              <span key={i} className="pe-tag">{skill}</span>
                           ))}
                        </div>
                     </div>
                     <div className="pe-skill-card advanced">
                        <h3>🚀 Advanced Skills</h3>
                        <div className="pe-tags">
                           {result.skills?.advanced?.map((skill, i) => (
                              <span key={i} className="pe-tag">{skill}</span>
                           ))}
                        </div>
                     </div>
                  </div>

                  <h3 className="pe-section-title">Recommended Projects</h3>
                  <div className="pe-projects-grid">
                     {result.projects?.map((proj, idx) => (
                        <div key={idx} className="pe-project-card">
                           <div className="pe-project-header">
                              <h4>{proj.name}</h4>
                              <span className={`pe-level-indicator ${result.level.toLowerCase()}`}>
                                 {result.level}
                              </span>
                           </div>
                           <p className="pe-project-desc">{proj.description}</p>
                           <div className="pe-project-tech">
                              <strong>Tech Stack:</strong>
                              <div className="pe-tech-tags">
                                 {proj.tech_stack?.split(",").map((tech, i) => (
                                    <span key={i} className="pe-tech-tag">{tech.trim()}</span>
                                 ))}
                              </div>
                           </div>
                        </div>
                     ))}
                  </div>
               </div>
            )}
         </div>

         {/* Floating Chat Button */}
         <button className="pe-chat-toggle" onClick={() => setIsChatOpen(!isChatOpen)}>
            💬 {isChatOpen ? "Close AI Chatbot" : "Chat to AI"}
         </button>

         {/* AI Chatbot Window */}
         {isChatOpen && (
            <div className="pe-chat-window animate-slide-up">
               <div className="pe-chat-header">
                  <span>🤖 AI Project Chatbot</span>
                  <button className="pe-chat-close" onClick={() => setIsChatOpen(false)}>&times;</button>
               </div>
               
               <div className="pe-chat-body" ref={chatBodyRef}>
                  {chatHistory.filter(msg => msg.role !== 'system').map((msg, idx) => (
                     <div key={idx} className={`pe-chat-msg ${msg.role}`}>
                        {msg.content}
                     </div>
                  ))}
                  {isChatLoading && <div className="pe-chat-typing">Architect is typing...</div>}
               </div>

               <form className="pe-chat-footer" onSubmit={handleSendMessage}>
                  <input 
                     type="text" 
                     placeholder="Type Message...." 
                     value={chatInput}
                     onChange={(e) => setChatInput(e.target.value)}
                     disabled={isChatLoading}
                     autoComplete="off"
                  />
                  <button type="submit" disabled={isChatLoading || !chatInput.trim()}>
                     Send
                  </button>
               </form>
            </div>
         )}
      </>
   );
};

export default ProjectEngine;
