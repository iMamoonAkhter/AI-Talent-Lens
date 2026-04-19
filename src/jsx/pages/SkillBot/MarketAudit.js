import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import PageTitle from "../../layouts/PageTitle";
import './MarketAudit.css';

const API_BASE_URL = (process.env.REACT_APP_API_URL || '').replace(/\/$/, '');
const FALLBACK_FASTAPI_URL = 'http://localhost:8000';
const FALLBACK_FLASK_URL = 'http://localhost:5000';
const IS_LOCAL_DEV = typeof window !== 'undefined' && /^(localhost|127\.0\.0\.1)$/.test(window.location.hostname);
const PROCESSING_TOAST = 'Processing your request...';
const SUCCESS_TOAST = 'Operation completed successfully';
const ERROR_TOAST = 'Something went wrong. Please try again.';

// Loading Spinner Component
const LoadingSpinner = () => (
   <div className="spinner-overlay">
      <div className="spinner">
         <div></div>
         <div></div>
         <div></div>
         <div></div>
      </div>
      <p>Analyzing resume...</p>
   </div>
);

const MarketAudit = () => {
   const [selectedFile, setSelectedFile] = useState(null);
   const [selectedField, setSelectedField] = useState('');
   const [fieldOptions, setFieldOptions] = useState([]);
   const [fieldLoadError, setFieldLoadError] = useState(null);
   const [result, setResult] = useState(null);
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState(null);

   useEffect(() => {
      const fetchFields = async () => {
         const endpoints = [];

         if (API_BASE_URL) {
            const apiBaseHasApiPrefix = API_BASE_URL.endsWith('/api');
            endpoints.push(
               apiBaseHasApiPrefix
                  ? `${API_BASE_URL}/resume-fields`
                  : `${API_BASE_URL}/api/resume-fields`,
               `${API_BASE_URL}/resume-fields`
            );
         }

         if (IS_LOCAL_DEV) {
            endpoints.push(
               `${FALLBACK_FLASK_URL}/api/resume-fields`,
               `${FALLBACK_FASTAPI_URL}/resume-fields`
            );
         }

         for (const endpoint of endpoints) {
            try {
               const response = await fetch(endpoint);
               const data = await response.json();
               if (response.ok && Array.isArray(data.fields) && data.fields.length > 0) {
                  setFieldOptions(data.fields);
                  setFieldLoadError(null);
                  return;
               }
            } catch (_err) {
               // Try next endpoint.
            }
         }

         setFieldLoadError('Unable to load resume fields from backend.');
      };

      fetchFields();
   }, []);

   const handleSubmit = async (e) => {
      e.preventDefault();
      setError(null);

      if (fieldLoadError && fieldOptions.length === 0) {
         setError(fieldLoadError);
         toast.error(ERROR_TOAST);
         return;
      }

      if (!selectedFile) {
         setError('Please upload a PDF resume file');
         toast.error(ERROR_TOAST);
         return;
      }

      if (!selectedFile.name.toLowerCase().endsWith('.pdf')) {
         setError('Only PDF files are supported');
         toast.error(ERROR_TOAST);
         return;
      }

      if (!selectedField) {
         setError('Please select a field for resume analysis');
         toast.error(ERROR_TOAST);
         return;
      }

      const toastId = toast.loading(PROCESSING_TOAST);

      setLoading(true);

      try {
         const formData = new FormData();
         formData.append('file', selectedFile);
         formData.append('field', selectedField);

         const endpoints = [];

         if (API_BASE_URL) {
            const apiBaseHasApiPrefix = API_BASE_URL.endsWith('/api');
            endpoints.push(
               apiBaseHasApiPrefix
                  ? `${API_BASE_URL}/analyze-resume`
                  : `${API_BASE_URL}/api/analyze-resume`,
               `${API_BASE_URL}/analyze-resume`
            );
         }

         if (IS_LOCAL_DEV) {
            endpoints.push(
               `${FALLBACK_FLASK_URL}/api/analyze-resume`,
               `${FALLBACK_FASTAPI_URL}/analyze-resume`
            );
         }

         let lastError = 'Resume analysis failed';

         for (const endpoint of endpoints) {
            try {
               const response = await fetch(endpoint, {
                  method: 'POST',
                  body: formData
               });

               const rawText = await response.text();
               let data;

               try {
                  data = rawText ? JSON.parse(rawText) : {};
               } catch (_parseError) {
                  throw new Error(`Non-JSON response from ${endpoint}`);
               }

               if (!response.ok) {
                  throw new Error(data.detail || data.error || `Resume analysis failed at ${endpoint}`);
               }

               setResult(data);
               lastError = '';
               toast.update(toastId, {
                  render: SUCCESS_TOAST,
                  type: 'success',
                  isLoading: false,
                  autoClose: 3000,
               });
               break;
            } catch (endpointErr) {
               lastError = endpointErr.message || 'Resume analysis failed';
            }
         }

         if (lastError) {
            throw new Error(lastError);
         }
      } catch (err) {
         console.error('Error:', err);
         setError(err.message || 'An error occurred during resume analysis');
         setResult(null);
         toast.update(toastId, {
            render: ERROR_TOAST,
            type: 'error',
            isLoading: false,
            autoClose: 3000,
         });
      } finally {
         setLoading(false);
      }
   };

   const handleFileChange = (e) => {
      const file = e.target.files && e.target.files[0] ? e.target.files[0] : null;
      setSelectedFile(file);
      setError(null);
   };

   const handleNewAnalysis = () => {
      setSelectedFile(null);
      setSelectedField('');
      setResult(null);
      setError(null);
   };

   return (
      <>
         <PageTitle activeMenu="AI Resume Analyzer" motherMenu="Career Insights" />
         
         {loading && <LoadingSpinner />}

         <div 
            className="market-audit-wrapper"
            style={{ backgroundImage: 'none' }}
         >
            <div className="audit-overlay">
               {!result && (
                  <div className="audit-form-section">
                     <div className="form-header">
                        <h1>AI Resume Analyzer</h1>
                        <p>Upload your PDF resume to get skill, field, score, and improvement insights.</p>
                     </div>

                     <form onSubmit={handleSubmit} className="audit-form">
                        <div className="form-row">
                           <div className="form-group">
                              <label htmlFor="field">Target Field</label>
                              <select
                                 id="field"
                                 className="form-input"
                                 value={selectedField}
                                 onChange={(e) => {
                                    setSelectedField(e.target.value);
                                    setError(null);
                                 }}
                              >
                                 <option value="">Select a field</option>
                                 {fieldOptions.map((field) => (
                                    <option key={field} value={field}>{field}</option>
                                 ))}
                              </select>
                           </div>
                           <div className="form-group">
                              <label htmlFor="resume">Resume PDF</label>
                              <input
                                 id="resume"
                                 type="file"
                                 accept="application/pdf,.pdf"
                                 onChange={handleFileChange}
                                 className="form-input"
                              />
                           </div>
                        </div>

                        {error && <div className="error-message">{error}</div>}

                        <button
                           type="submit"
                           className="btn-submit"
                           disabled={loading}
                        >
                           {loading ? 'Analyzing...' : 'Analyze Resume'}
                        </button>
                     </form>
                  </div>
               )}

               {result && !loading && (
                  <div className="audit-results-section">
                     <div className="results-header">
                        <h2>AI Resume Analysis Results</h2>
                        <p className="field-badge">{result.field}</p>
                        {result.detected_field && result.detected_field !== result.field && (
                           <p className="field-badge" style={{ marginTop: '8px', background: '#64748b' }}>
                              Detected Field: {result.detected_field}
                           </p>
                        )}
                        <button onClick={handleNewAnalysis} className="btn-new-audit">
                           Analyze Another Resume
                        </button>
                     </div>

                     <div className="results-grid">
                        <div className="result-card">
                           <div className="card-icon">📊</div>
                           <h3>Resume Score</h3>
                           <div className="roles-list">
                              <span className="role-badge">
                                 {result.score}%
                              </span>
                           </div>
                        </div>

                        <div className="result-card">
                           <div className="card-icon">🧠</div>
                           <h3>Detected Skills</h3>
                           <div className="skills-list">
                              {(result.skills || []).map((skill, idx) => (
                                 <span key={idx} className="skill-tag basics">
                                    {skill}
                                 </span>
                              ))}
                           </div>
                        </div>

                        <div className="result-card">
                           <div className="card-icon">🎓</div>
                           <h3>Education & Experience</h3>
                           <div className="skills-list">
                              {(result.education || []).map((edu, idx) => (
                                 <span key={`edu-${idx}`} className="skill-tag advanced">
                                    {edu}
                                 </span>
                              ))}
                              {(result.experience || []).map((exp, idx) => (
                                 <span key={`exp-${idx}`} className="skill-tag basics">
                                    {exp}
                                 </span>
                              ))}
                           </div>
                        </div>
                     </div>

                     <div className="learning-resources">
                        <h3>⚠ Missing Skills</h3>
                        <div className="resources-grid">
                           {(result.missing_skills || []).map((skill, idx) => (
                              <div key={idx} className="resource-link">
                                 <span className="resource-icon">•</span>
                                 <span>{skill}</span>
                              </div>
                           ))}
                        </div>
                     </div>

                     <div className="learning-resources">
                        <h3>✅ Suggestions</h3>
                        <div className="resources-grid">
                           {(result.suggestions || []).map((item, idx) => (
                              <div key={idx} className="resource-link">
                                 <span className="resource-icon">▶</span>
                                 <span>{item}</span>
                              </div>
                           ))}
                        </div>
                     </div>
                  </div>
               )}
            </div>
         </div>
      </>
   );
};

export default MarketAudit;
