import React, { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import PageTitle from "../../layouts/PageTitle";
import "./RecommendationSystem.css";
import "./RoadMapEngine.css";

const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";
const PROCESSING_TOAST = "Processing your request...";
const SUCCESS_TOAST = "Operation completed successfully";
const ERROR_TOAST = "Something went wrong. Please try again.";

const PRACTICAL_LEETCODE_FIELDS = ["ai", "data science", "cs", "it", "se", "software engineering"];
const PRACTICAL_PROJECT_FIELDS = ["business analytics", "bba", "ba", "mbbs", "business analyst"];
const FALLBACK_FIELDS = [
  "AI",
  "CS",
  "SE",
  "IT",
  "Data Science",
  "Cyber Security",
  "Business Analytics",
  "BBA",
  "BA",
  "MBBS",
];

const RecommendationSystem = () => {
  const [field, setField] = useState("");
  const [fieldOptions, setFieldOptions] = useState(FALLBACK_FIELDS);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);
  const [businessLinks, setBusinessLinks] = useState({
    sql: "",
    excel: "https://www.youtube.com/results?search_query=excel+tutorial",
    powerbi: "",
  });

  const normalizedMode = useMemo(() => {
    if (!result?.prediction) return "";
    return String(result.prediction).trim().toUpperCase();
  }, [result]);

  const normalizedField = useMemo(() => String(result?.field || "").trim().toLowerCase(), [result]);

  useEffect(() => {
    const fetchFields = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/options`);
        if (!response.ok) {
          return;
        }

        const payload = await response.json();
        const merged = Array.from(new Set([...(payload.fields || []), ...FALLBACK_FIELDS]));
        const filtered = merged.filter((option) => option !== "Business Analyst");
        setFieldOptions(filtered);
      } catch (fetchError) {
        setFieldOptions(FALLBACK_FIELDS);
      }
    };

    fetchFields();
  }, []);

  useEffect(() => {
    const fetchBusinessAnalyticsLinks = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/audit`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: "Recommendation User",
            city: "Lahore",
            field: "Business Analytics",
          }),
        });

        if (!response.ok) {
          return;
        }

        const payload = await response.json();
        const learningLinks = payload?.learning_links || {};

        setBusinessLinks({
          sql: learningLinks.sql || "https://www.youtube.com/results?search_query=sql+tutorial",
          excel: learningLinks.excel || "https://www.youtube.com/results?search_query=excel+tutorial",
          powerbi: learningLinks["power bi"] || "https://www.youtube.com/results?search_query=power+bi+tutorial",
        });
      } catch (fetchError) {
        setBusinessLinks({
          sql: "https://www.youtube.com/results?search_query=sql+tutorial",
          excel: "https://www.youtube.com/results?search_query=excel+tutorial",
          powerbi: "https://www.youtube.com/results?search_query=power+bi+tutorial",
        });
      }
    };

    fetchBusinessAnalyticsLinks();
  }, []);

  const renderBespokeLearningResources = () => (
    <div className="resources-section visual-learning-section">
      <h3>Bespoke Learning Resources</h3>
      <div className="resources-flow">
        <a
          href="https://learn.microsoft.com/en-us/power-bi/"
          target="_blank"
          rel="noreferrer"
          className="resource-btn"
        >
          <span>▶</span> Microsoft Power BI Learning
        </a>
        <a
          href={businessLinks.sql}
          target="_blank"
          rel="noreferrer"
          className="resource-btn"
        >
          <span>▶</span> SQL
        </a>
        <a
          href={businessLinks.excel}
          target="_blank"
          rel="noreferrer"
          className="resource-btn"
        >
          <span>▶</span> Excel
        </a>
        <a
          href={businessLinks.powerbi}
          target="_blank"
          rel="noreferrer"
          className="resource-btn"
        >
          <span>▶</span> Power BI
        </a>
      </div>
    </div>
  );

  const handlePredict = async (event) => {
    event.preventDefault();

    if (!field.trim()) {
      setError("Please select a field.");
      setResult(null);
      toast.error(ERROR_TOAST);
      return;
    }

    const toastId = toast.loading(PROCESSING_TOAST);

    setLoading(true);
    setError("");

    try {
      const response = await fetch(`${API_BASE_URL}/api/predict`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ field: field.trim() }),
      });

      const payload = await response.json();

      if (!response.ok) {
        throw new Error(payload.error || "Prediction failed.");
      }

      setResult({
        field: payload.field,
        prediction: payload.prediction,
      });
      toast.update(toastId, {
        render: SUCCESS_TOAST,
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });
    } catch (err) {
      setResult(null);
      setError(err.message || "Unable to connect to prediction API.");
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
    setField("");
    setResult(null);
    setError("");
  };

  const renderModeAction = () => {
    if (!result) return null;
    const isBusinessAnalystField =
      normalizedField === "business analyst" || normalizedField === "business analytics";

    if (normalizedMode === "THEORETICAL") {
      return (
        <div className="recommend-action">
          <a
            className="recommend-primary-btn"
            href={`${process.env.PUBLIC_URL}/student_dataset.csv`}
            download
          >
            Download Learning Roadmap
          </a>
        </div>
      );
    }

    if (normalizedMode === "VISUAL") {
      if (isBusinessAnalystField) {
        return renderBespokeLearningResources();
      }

      return (
        <div className="resources-section visual-learning-section">
          <h3>Visual Learning Resources</h3>
          <div className="resources-flow">
            <a
              href="https://www.youtube.com/results?search_query=visual+learning+for+students"
              target="_blank"
              rel="noreferrer"
              className="resource-btn"
            >
              <span>▶</span> Visual Learning
            </a>
            <a
              href="https://www.coursera.org/"
              target="_blank"
              rel="noreferrer"
              className="resource-btn"
            >
              <span>▶</span> Guided Courses
            </a>
          </div>
        </div>
      );
    }

    if (normalizedMode === "PRACTICAL") {
      if (isBusinessAnalystField) {
        return renderBespokeLearningResources();
      }

      if (PRACTICAL_LEETCODE_FIELDS.includes(normalizedField)) {
        return (
          <div className="recommend-action">
            <a
              className="recommend-primary-btn"
              href="https://leetcode.com"
              target="_blank"
              rel="noreferrer"
            >
              Practice on LeetCode
            </a>
          </div>
        );
      }

      if (normalizedField === "cyber security") {
        return (
          <div className="recommend-action">
            <a
              className="recommend-primary-btn"
              href="https://tryhackme.com"
              target="_blank"
              rel="noreferrer"
            >
              Practice on TryHackMe
            </a>
          </div>
        );
      }

      if (PRACTICAL_PROJECT_FIELDS.includes(normalizedField)) {
        return (
          <p className="recommend-guidance">
            Do as many projects as you can. Focus on real-world case studies, research, and practical implementation to build strong domain expertise.
          </p>
        );
      }

      return (
        <p className="recommend-guidance">
          Start with hands-on practice, solve practical tasks regularly, and build project-based experience in your domain.
        </p>
      );
    }

    return null;
  };

  return (
    <div className="recommend-page">
      <PageTitle activeMenu="Recommendation System" motherMenu="Career Insights" />

      <div className="recommend-wrapper">
        <div className="recommend-card">
          <div className="recommend-header">
            <h2>Recommendation System</h2>
            <p>Enter your field to predict the most suitable learning mode and get action-focused guidance.</p>
          </div>

          <form onSubmit={handlePredict} className="recommend-form">
            <label htmlFor="recommend-field">Field Name</label>
            <select
              id="recommend-field"
              value={field}
              onChange={(e) => {
                setField(e.target.value);
                setError("");
              }}
              className="recommend-input"
            >
              <option value="" disabled>Select Field</option>
              {fieldOptions.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>

            {error && <div className="recommend-error">{error}</div>}

            <div className="recommend-btn-row">
              <button type="submit" className="recommend-primary-btn" disabled={loading}>
                {loading ? "Predicting..." : "Predict"}
              </button>
              <button type="button" className="recommend-reset-btn" onClick={handleReset}>
                Reset
              </button>
            </div>
          </form>

          {result && (
            <div className="recommend-result-card">
              <div className="recommend-result-row">
                <span className="recommend-label">Selected Field</span>
                <span className="recommend-value">{result.field}</span>
              </div>
              <div className="recommend-result-row">
                <span className="recommend-label">Predicted Learning Mode</span>
                <span className={`recommend-prediction ${normalizedMode.toLowerCase()}`}>
                  {result.prediction}
                </span>
              </div>

              <div className="recommend-mode-content">{renderModeAction()}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecommendationSystem;
