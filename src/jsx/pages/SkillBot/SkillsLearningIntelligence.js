import React from "react";

/// CSS
import "./PowerBiInsight.css";

const SkillsLearningIntelligence = () => {
  const sections = [
    {
      id: "intelligence",
      title: "Skills & Learning Intelligence",
      subtitle: "Track skills development and learning outcomes across programs",
      icon: "🧠",
      pages: [
        {
          id: 5,
          title: "Top Skills by Program",
          description:
            "Learning Mode Matrix categorizes fields into Practical, Theoretical, and Visual learning styles. Practical includes AI, CS, Cyber Security, Data Science, and IT. Theoretical includes BBA and MBBS. Visual learning includes Business Analytics. This helps identify the most effective learning approach for each field.",
        },
        {
          id: 6,
          title: "Skill Development Progress",
          description:
            "Student distribution by learning mode shows that 188 students (62%) prefer Practical learning, 80 students (26.67%) fall under Theoretical learning, and 34 students (11.33%) belong to Visual learning. This shows strong preference for hands-on practical learning.",
        },
        {
          id: 7,
          title: "Learning Outcome Metrics",
          description:
            "Skill Count Analysis provides insights into skill frequency across different fields. It identifies the most in-demand skills, compares skill distribution across domains, and highlights areas where students need more development to meet industry requirements.",
        },
        {
          id: 8,
          title: "Certification & Credentials",
          description:
            "This is an interactive Field-wise Skill Matrix. Users can select a field such as AI, CS, SE, IT, Cyber Security, Data Science, BBA, BA, or MBBS. The matrix dynamically updates to show only relevant skills for the selected field, enabling detailed skill exploration.",
        },
        {
          id: 9,
          title: "Employment Intelligence",
          description:
            "Maximum CGPA by Field shows academic performance comparison across disciplines. AI has the highest CGPA at 3.90, followed by IT (3.89), Data Science (3.85), MBBS (3.85), BBA (3.84), Business Analytics (3.84), and CS (3.77). This highlights performance differences across fields.",
        },
      ],
    },
  ];

  return (
    <div className="powerbi-insights-container">
      {sections.map((section) => (
        <div key={section.id} className="powerbi-section">
          <div className="section-header">
            <h2 className="section-title">
              <span className="section-icon">{section.icon}</span>
              {section.title}
            </h2>
            <p className="section-subtitle">{section.subtitle}</p>
          </div>

          <div className="powerbi-cards-grid">
            {section.pages.map((page) => (
              <div key={page.id} className="powerbi-card">
                <div className="card-image-wrapper">
                  <img
                    src={`${process.env.PUBLIC_URL}/images/page_${page.id}.png`}
                    alt={page.title}
                    className="card-image"
                    onError={(e) => {
                      e.target.style.display = "none";
                    }}
                  />
                </div>
                <div className="card-content">
                  <h3 className="card-title">{page.title}</h3>
                  <p className="card-description">{page.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      <div className="powerbi-footer">
        <div className="footer-info">
          <h4>🧠 Skills & Learning Intelligence</h4>
          <p>
            This section provides deep insights into skills development, learning
            outcomes, certification paths, and employment intelligence. Monitor how
            well your educational programs are preparing students for real-world
            careers and what skills are most valued by employers in your industry.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SkillsLearningIntelligence;
