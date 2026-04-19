import React from "react";

/// CSS
import "./PowerBiInsight.css";

const StudentDemographicOverview = () => {
  const sections = [
    {
      id: "demographic",
      title: "Student & Demographic Overview",
      subtitle: "Analyze student demographics and enrollment patterns",
      icon: "👥",
      pages: [
        {
          id: 1,
          title: "Student Distribution by Age",
          description:
            "University-wise student distribution shows participation from major universities across Pakistan. LUMS leads with 40 students, followed by UET Lahore (34), IBA Karachi (31), University of the Punjab (31), University of Karachi (30), Comsats University Islamabad (29), NED University (29), IIUI (24), NUST (22), BZU (8), UAF (8), University of Balochistan (7), and University of Peshawar (7). This highlights strong academic diversity across top institutions.",
        },
        {
          id: 2,
          title: "Geographic Location Analysis",
          description:
            "City-wise distribution shows student concentration across major cities. Lahore has the highest number with 105 students, followed by Karachi (90) and Islamabad (75). Smaller cities like Faisalabad and Multan each have 8 students, while Peshawar and Quetta have 7 students each. This indicates strong urban dominance in student distribution.",
        },
        {
          id: 3,
          title: "Program Enrollment Trends",
          description:
            "Province-wise distribution highlights regional representation. Punjab leads with 121 students, followed by Sindh with 90. Islamabad accounts for 75 students, while KPK and Balochistan both have 7 students each. This shows a significant concentration of students in Punjab.",
        },
        {
          id: 4,
          title: "Student Demographics Report",
          description:
            "Field-wise distribution shows academic specialization trends. AI leads with 45 students (15%), followed by CS (43, 14.33%), BBA (41, 13.67%), MBBS (39, 13%), IT (36, 12%), Business Analytics (34, 11.33%), Data Science (32, 10.67%), and Cyber Security (30, 10%). This reflects balanced interest across technical, medical, and business fields.",
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
          <h4>📊 Student & Demographic Overview</h4>
          <p>
            This section provides comprehensive insights into student demographics,
            geographic distribution, enrollment trends, and detailed demographic
            breakdowns. Use these insights to understand your student population
            better and make informed decisions about program offerings and resource
            allocation.
          </p>
        </div>
      </div>
    </div>
  );
};

export default StudentDemographicOverview;
