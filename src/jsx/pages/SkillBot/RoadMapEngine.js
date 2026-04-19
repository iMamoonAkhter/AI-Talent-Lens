import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import PageTitle from "../../layouts/PageTitle";
import "./RoadMapEngine.css";
import csRoadmapPdf from "../../../data/cs_roadmap.pdf";
import aiRoadmapPdf from "../../../data/ai_roadmap.pdf";
import dsRoadmapPdf from "../../../data/ds_roadmap.pdf";
import cyberRoadmapPdf from "../../../data/cyber_roadmap.pdf";
import seRoadmapPdf from "../../../data/se_roadmap.pdf";
import businessRoadmapPdf from "../../../data/business_roadmap.pdf";
import mbbsRoadmapPdf from "../../../data/mbbs_roadmap.pdf";
import bbaRoadmapPdf from "../../../data/bba_roadmap.pdf";
import baRoadmapPdf from "../../../data/ba_roadmap.pdf";
import itRoadmapPdf from "../../../data/it_roadmap.pdf";

/**
 * ROADMAP ENGINE - FULLY DYNAMIC API EDITION
 * Theme: Human-Centric Light Interface
 * Requirement: 0% Hardcoded Data. All intelligence sourced from API.
 */

const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";
const PROCESSING_TOAST = "Processing your request...";
const SUCCESS_TOAST = "Operation completed successfully";
const ERROR_TOAST = "Something went wrong. Please try again.";

const ROADMAP_PDFS = {
    CS: csRoadmapPdf,
    AI: aiRoadmapPdf,
    "Data Science": dsRoadmapPdf,
    "Cyber Security": cyberRoadmapPdf,
    SE: seRoadmapPdf,
    "Software Engineering": seRoadmapPdf,
    "Business Analytics": businessRoadmapPdf,
    MBBS: mbbsRoadmapPdf,
    BBA: bbaRoadmapPdf,
    BA: baRoadmapPdf,
    IT: itRoadmapPdf,
};

const getRoadmapPdf = (field) => {
    return ROADMAP_PDFS[field] || ROADMAP_PDFS[(field || "").toString().trim()] || null;
};

const normalizeList = (value) => {
    if (!value) return [];
    if (Array.isArray(value)) return value;
    if (typeof value === "string") return [value];
    if (typeof value === "object") return Object.values(value).flat ? Object.values(value).flat() : [].concat(...Object.values(value));
    return [];
};

const normalizeItemLabel = (item) => {
    if (typeof item === "string") return item;
    if (item && typeof item === "object") return item.name || item.title || item.label || item.skill || item.role || item.value || "";
    return "";
};

const toTitleCase = (value) => {
    const text = String(value || "").replace(/_/g, " ").replace(/\s+/g, " ").trim();
    if (!text) return "";

    return text
        .split(" ")
        .map((word) => {
            if (/^[A-Z0-9]{2,5}$/.test(word)) {
                return word;
            }
            return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
        })
        .join(" ");
};

const normalizeRoadmap = (roadmap) => {
    if (!roadmap || typeof roadmap !== "object") return {};
    if (roadmap.Roadmap && typeof roadmap.Roadmap === "object") return roadmap.Roadmap;
    if (roadmap.roadmap && typeof roadmap.roadmap === "object") return roadmap.roadmap;
    return roadmap;
};

const normalizeWeekContent = (content) => {
    if (Array.isArray(content)) {
        return { Topics: content };
    }

    if (content && typeof content === "object") {
        return content;
    }

    return {};
};

const getSortedWeekEntries = (monthDetails) => {
    return Object.entries(monthDetails || {})
        .filter(([key]) => key !== "Goal")
        .sort(([a], [b]) => {
            const aMatch = a.match(/Week_(\d+)/i);
            const bMatch = b.match(/Week_(\d+)/i);
            const aNum = aMatch ? parseInt(aMatch[1], 10) : Number.MAX_SAFE_INTEGER;
            const bNum = bMatch ? parseInt(bMatch[1], 10) : Number.MAX_SAFE_INTEGER;
            return aNum - bNum;
        });
};

const RoadMapEngine = () => {
    // --- State Management ---
    const [formData, setFormData] = useState({
        name: "",
        city: "",
        field: "",
    });
    const [options, setOptions] = useState({ 
        fields: [], 
        cities: [] 
    });
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const targetRoles = normalizeList(result?.jobs).map(normalizeItemLabel).filter(Boolean);
    const foundationSkills = normalizeList(result?.foundation_layer).map(normalizeItemLabel).filter(Boolean);
    const specialistSkills = normalizeList(result?.specialist_layer).map(normalizeItemLabel).filter(Boolean);
    const formattedTargetRoles = targetRoles.map(toTitleCase);
    const formattedFoundationSkills = foundationSkills.map(toTitleCase);
    const formattedSpecialistSkills = specialistSkills.map(toTitleCase);
    const roadmapMonths = normalizeRoadmap(result?.detailed_roadmap || result?.roadmap);
    const roadmapPdfUrl = getRoadmapPdf(result?.field || formData.field);

    // --- Dynamic Background Logic ---
    // Uses the field name directly to find the image in your public folder
    const getDynamicBg = () => {
        if (!formData.field) return "none";
        return `url(images/${formData.field.toLowerCase().replace(/\s+/g, '')}.jpg)`;
    };

    // --- API Interactions ---
    useEffect(() => {
        const fetchInitialData = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/api/options`);
                if (!response.ok) throw new Error("Connection Refused");
                const data = await response.json();
                setOptions(data);
            } catch (err) {
                setError("System Sync Failure: Could not load career domains.");
            }
        };
        fetchInitialData();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        setError(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.name || !formData.field || !formData.city) {
            setError("All credentials must be validated before generation.");
            toast.error(ERROR_TOAST);
            return;
        }

        const toastId = toast.loading(PROCESSING_TOAST);

        setLoading(true);
        setError(null);

        try {
            const response = await fetch(`${API_BASE_URL}/api/roadmap`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: formData.name,
                    choice: formData.field,
                    city: formData.city
                }),
            });

            const payload = await response.json();
            if (!response.ok) throw new Error(payload.error || "Synthesis Failed");
            
            // The result now contains everything: roadmap, jobs, skills, and links
            setResult(payload);
            toast.update(toastId, {
                render: SUCCESS_TOAST,
                type: "success",
                isLoading: false,
                autoClose: 3000,
            });
        } catch (err) {
            setError(err.message || "An unexpected error occurred.");
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
        setFormData({ name: "", city: "", field: "" });
        setResult(null);
        setError(null);
    };

    return (
        <div className="human-engine-root">
            <PageTitle activeMenu="RoadMap Engine" motherMenu="Innovation Hub" />

            {/* Subtle Dynamic Background Layer */}
            <div className="dynamic-aura" style={{ backgroundImage: getDynamicBg() }}></div>

            <div className="engine-content-wrapper">
                {!result ? (
                    <section className="entry-portal animate-fade-up">
                        <header className="entry-header">
                            <h1>Career <span>Architect</span></h1>
                            <p>Generate a high-visibility 3-month roadmap sourced from real-time market data.</p>
                        </header>

                        <form onSubmit={handleSubmit} className="entry-form-card">
                            <div className="field-row">
                                <div className="input-box full">
                                    <label>Professional Identity</label>
                                    <input 
                                        type="text" 
                                        name="name" 
                                        placeholder="Full Name" 
                                        value={formData.name}
                                        onChange={handleInputChange} 
                                    />
                                </div>
                            </div>

                            <div className="field-row split">
                                <div className="input-box">
                                    <label>Geographic Region</label>
                                    <select name="city" value={formData.city} onChange={handleInputChange}>
                                        <option value="" disabled>Select City</option>
                                        {options.cities?.map(c => <option key={c} value={c}>{c}</option>)}
                                    </select>
                                </div>
                                <div className="input-box">
                                    <label>Domain Focus</label>
                                    <select name="field" value={formData.field} onChange={handleInputChange}>
                                        <option value="" disabled>Select Field</option>
                                        {options.fields?.map(f => <option key={f} value={f}>{f}</option>)}
                                    </select>
                                </div>
                            </div>

                            {error && <div className="portal-error">{error}</div>}

                            <button type="submit" className={`portal-submit ${loading ? 'loading' : ''}`} disabled={loading}>
                                {loading ? "CONNECTING TO API..." : "GENERATE BLUEPRINT"}
                            </button>
                        </form>
                    </section>
                ) : (
                    <section className="results-portal animate-fade-in">
                        <header className="results-top-bar">
                            <div className="user-intro">
                                <h2>Success Trajectory: {formData.name}</h2>
                                <p>{formData.field} • {formData.city}</p>
                            </div>
                            <div className="results-actions">
                                {roadmapPdfUrl && (
                                    <a className="download-roadmap-btn" href={roadmapPdfUrl} download>
                                        Download RoadMap PDF
                                    </a>
                                )}
                                <button onClick={handleReset} className="btn-refresh">RESET SYSTEM</button>
                            </div>
                        </header>

                        {/* Intelligence Grid - All data mapped from API 'result' */}
                        <div className="intelligence-grid">
                            {/* Dynamically rendering Jobs from API */}
                            <div className="intel-card">
                                <h3>Target Roles</h3>
                                <div className="chip-container">
                                    {targetRoles.map((job, i) => (
                                        <span key={i} className="intel-chip">{formattedTargetRoles[i]}</span>
                                    ))}
                                </div>
                            </div>

                            {/* Dynamically rendering Top Skills from API */}
                            <div className="intel-card">
                                <h3>Skill Architecture</h3>
                                <div className="skill-tiers">
                                    <div className="tier">
                                        <label>Core Foundation</label>
                                        <p>{formattedFoundationSkills.join(" • ")}</p>
                                    </div>
                                    <div className="tier">
                                        <label>Elite Specialization</label>
                                        <p>{formattedSpecialistSkills.join(" • ")}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Learning Resources - Sourced from API links */}
                        <div className="resources-section">
                            <h3>Bespoke Learning Resources</h3>
                            <div className="resources-flow">
                                {normalizeList(result.foundation_layer).filter((skill) => skill && skill.resource).map((skill, i) => (
                                    <a key={i} href={skill.resource} target="_blank" rel="noreferrer" className="resource-btn">
                                        <span>▶</span> {toTitleCase(normalizeItemLabel(skill))}
                                    </a>
                                ))}
                                {normalizeList(result.specialist_layer).filter((skill) => skill && skill.resource).map((skill, i) => (
                                    <a key={i} href={skill.resource} target="_blank" rel="noreferrer" className="resource-btn">
                                        <span>▶</span> {toTitleCase(normalizeItemLabel(skill))}
                                    </a>
                                ))}
                            </div>
                        </div>

                        {/* Main Roadmap Timeline - Detailed Monthly View */}
                        <div className="blueprint-timeline">
                            {Object.entries(roadmapMonths).map(([month, details], mIdx) => (
                                <div key={month} className="timeline-phase">
                                    <div className="phase-marker">
                                        <div className="marker-node">{mIdx + 1}</div>
                                        <div className="marker-rail"></div>
                                    </div>
                                    <div className="phase-body">
                                        <div className="phase-header">
                                            <h3>{toTitleCase(month)}</h3>
                                            <p className="phase-goal">{toTitleCase(details.Goal)}</p>
                                        </div>

                                        <div className="week-blueprint-grid">
                                            {getSortedWeekEntries(details).map(([week, content]) => {
                                                const weekContent = normalizeWeekContent(content);
                                                const topicText = Array.isArray(weekContent.Topics)
                                                    ? weekContent.Topics.join(" • ")
                                                    : normalizeItemLabel(weekContent.Topics);
                                                const practiceText = Array.isArray(weekContent.Practice)
                                                    ? weekContent.Practice.join(", ")
                                                    : normalizeItemLabel(weekContent.Practice);
                                                const isWeek12 = /week_12/i.test(week);
                                                const projectLabel = isWeek12 ? "Execution" : "Final Milestone";

                                                return (
                                                <div key={week} className="blueprint-row">
                                                    <div className="row-label">{toTitleCase(week)}</div>
                                                    <div className="row-content">
                                                        <div className="content-item">
                                                            <label>Curriculum</label>
                                                            <p>{toTitleCase(topicText)}</p>
                                                        </div>
                                                        {practiceText && (
                                                            <div className="content-item">
                                                                <label>Execution</label>
                                                                <p className="blue-accent">{toTitleCase(practiceText)}</p>
                                                            </div>
                                                        )}
                                                        {weekContent.Project && (
                                                            <div className="content-item">
                                                                <label>{projectLabel}</label>
                                                                <p className="blue-accent">{toTitleCase(weekContent.Project)}</p>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            );
                                            })}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}
            </div>
        </div>
    );
};

export default RoadMapEngine;