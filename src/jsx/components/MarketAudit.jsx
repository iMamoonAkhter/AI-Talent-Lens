import React, { useState, useEffect } from 'react';
import LoadingSpinner from '../LoadingSpinner';
import './MarketAudit.css';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const MarketAudit = () => {
    // Form state
    const [formData, setFormData] = useState({
        name: '',
        city: '',
        field: ''
    });

    // Options state
    const [options, setOptions] = useState({
        fields: [],
        cities: []
    });

    // Result state
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [backgroundImage, setBackgroundImage] = useState('');

    // Fetch dropdown options on component mount
    useEffect(() => {
        fetchOptions();
    }, []);

    const fetchOptions = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/api/options`);
            if (!response.ok) throw new Error('Failed to fetch options');
            const data = await response.json();
            setOptions(data);
            setError(null);
        } catch (err) {
            console.error('Error fetching options:', err);
            setError('Failed to load form options');
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        setError(null); // Clear error on input change
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        // Validate form
        if (!formData.name.trim()) {
            setError('Please enter your name');
            return;
        }
        if (!formData.city) {
            setError('Please select a city');
            return;
        }
        if (!formData.field) {
            setError('Please select a field');
            return;
        }

        setLoading(true);

        try {
            const response = await fetch(`${API_BASE_URL}/api/audit`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Audit failed');
            }

            const data = await response.json();
            setResult(data);
            setBackgroundImage(data.background);
        } catch (err) {
            console.error('Error:', err);
            setError(err.message || 'An error occurred during market audit');
            setResult(null);
        } finally {
            setLoading(false);
        }
    };

    const handleNewAudit = () => {
        setFormData({ name: '', city: '', field: '' });
        setResult(null);
        setError(null);
        setBackgroundImage('');
    };

    return (
        <div className="market-audit-container">
            {loading && <LoadingSpinner />}

            <div 
                className="market-audit-wrapper"
                style={{
                    backgroundImage: backgroundImage ? `url(${backgroundImage})` : 'none'
                }}
            >
                <div className="audit-overlay">
                    {/* Form Section */}
                    {!result && (
                        <div className="audit-form-section">
                            <div className="form-header">
                                <h1>Market Audit</h1>
                                <p>Discover career paths, skills, and growth opportunities tailored to your field</p>
                            </div>

                            <form onSubmit={handleSubmit} className="audit-form">
                                <div className="form-row">
                                    {/* Name Input */}
                                    <div className="form-group">
                                        <label htmlFor="name">Your Name</label>
                                        <input
                                            id="name"
                                            type="text"
                                            name="name"
                                            placeholder="Enter your name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            className="form-input"
                                        />
                                    </div>

                                    {/* City Dropdown */}
                                    <div className="form-group">
                                        <label htmlFor="city">City</label>
                                        <select
                                            id="city"
                                            name="city"
                                            value={formData.city}
                                            onChange={handleInputChange}
                                            className="form-input"
                                        >
                                            <option value="">Select a city</option>
                                            {options.cities.map(city => (
                                                <option key={city} value={city}>
                                                    {city}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    {/* Field Dropdown */}
                                    <div className="form-group">
                                        <label htmlFor="field">Field of Interest</label>
                                        <select
                                            id="field"
                                            name="field"
                                            value={formData.field}
                                            onChange={handleInputChange}
                                            className="form-input"
                                        >
                                            <option value="">Select a field</option>
                                            {options.fields.map(field => (
                                                <option key={field} value={field}>
                                                    {field}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                {error && <div className="error-message">{error}</div>}

                                <button
                                    type="submit"
                                    className="btn-submit"
                                    disabled={loading}
                                >
                                    {loading ? 'Analyzing...' : 'Start Market Audit'}
                                </button>
                            </form>
                        </div>
                    )}

                    {/* Results Section */}
                    {result && !loading && (
                        <div className="audit-results-section">
                            <div className="results-header">
                                <h2>Market Audit Results for {formData.name}</h2>
                                <p className="field-badge">{result.field}</p>
                                <button onClick={handleNewAudit} className="btn-new-audit">
                                    New Audit
                                </button>
                            </div>

                            <div className="results-grid">
                                {/* Job Roles */}
                                <div className="result-card">
                                    <div className="card-icon">💼</div>
                                    <h3>Career Roles</h3>
                                    <div className="roles-list">
                                        {result.job_roles.map((role, idx) => (
                                            <span key={idx} className="role-badge">
                                                {role}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Basic Skills */}
                                <div className="result-card">
                                    <div className="card-icon">📚</div>
                                    <h3>Foundation Skills</h3>
                                    <div className="skills-list">
                                        {result.skills.basics.map((skill, idx) => (
                                            <span key={idx} className="skill-tag basics">
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Advanced Skills */}
                                <div className="result-card">
                                    <div className="card-icon">⚡</div>
                                    <h3>Advanced Skills</h3>
                                    <div className="skills-list">
                                        {result.skills.advanced.map((skill, idx) => (
                                            <span key={idx} className="skill-tag advanced">
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Learning Resources */}
                            <div className="learning-resources">
                                <h3>📖 Learning Resources</h3>
                                <div className="resources-grid">
                                    {Object.entries(result.learning_links).map(([skill, url]) => (
                                        <a
                                            key={skill}
                                            href={url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="resource-link"
                                        >
                                            <span className="resource-icon">▶</span>
                                            <span>{skill}</span>
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MarketAudit;
