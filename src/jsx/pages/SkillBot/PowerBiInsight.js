import React from "react";
import PageTitle from "../../layouts/PageTitle";
import "./PowerBiInsight.css";

const PowerBiInsight = () => {
   // Section and page data with descriptions
   const sections = [
      {
         id: "demographic",
         title: "Student & Demographic Overview",
         icon: "👥",
         pages: [
            {
               num: 1,
               title: "University-wise Student Count",
               description: "Distribution of students across major universities in Pakistan - LUMS (40), UET Lahore (34), IBA Karachi (31), and others."
            },
            {
               num: 2,
               title: "City-wise Distribution",
               description: "Student enrollment by city - Lahore (105), Karachi (90), Islamabad (75), and other major cities."
            },
            {
               num: 3,
               title: "Province-wise Distribution",
               description: "Regional breakdown of students - Punjab (121), Sindh (90), Islamabad (75), KPK (7), and Balochistan (7)."
            },
            {
               num: 4,
               title: "Field-wise Distribution",
               description: "Student enrollment by field of study - AI (45, 15%), CS (43, 14.33%), BBA (41, 13.67%), and more."
            }
         ]
      },
      {
         id: "intelligence",
         title: "Skills & Learning Intelligence",
         icon: "🧠",
         pages: [
            {
               num: 5,
               title: "Learning Mode Matrix",
               description: "Field-wise learning modes - Practical (AI, CS, Cyber Security, Data Science, IT), Theoretical (BBA, MBBS), Visual (Business Analytics)."
            },
            {
               num: 6,
               title: "Learning Mode Distribution",
               description: "Overall distribution of learning modes - Practical (188, 62%), Theoretical (80, 26.67%), Visual (34, 11.33%)."
            },
            {
               num: 7,
               title: "Skill Count Analysis",
               description: "Frequency and distribution of skills across all fields - identifying most in-demand and sought-after skills."
            },
            {
               num: 8,
               title: "Field-wise Skill Matrix",
               description: "Interactive skill matrix by field - BBA, BA, MBBS, CS, SE, IT, Cyber Security, Data Science, AI with dynamic filtering."
            },
            {
               num: 9,
               title: "Maximum CGPA by Field",
               description: "Highest academic performance metrics by field - AI (3.90), IT (3.89), Data Science (3.85), MBBS (3.85), and others."
            }
         ]
      }
   ];

   return (
      <>
         <PageTitle activeMenu="PowerBi Insight" motherMenu="PowerBi Insight" />
         
         <div className="powerbi-insights-container">
            {sections.map(section => (
               <section key={section.id} className="powerbi-section">
                  <div className="section-header">
                     <h2 className="section-title">
                        <span className="section-icon">{section.icon}</span>
                        {section.title}
                     </h2>
                     <p className="section-subtitle">
                        {section.id === "demographic" 
                           ? "Comprehensive overview of student demographics and geographic distribution" 
                           : "Analysis of learning modes, skill requirements, and academic performance"}
                     </p>
                  </div>

                  <div className="powerbi-cards-grid">
                     {section.pages.map(page => (
                        <div key={page.num} className="powerbi-card">
                           <div className="card-image-wrapper">
                              <img
                                 src={`/images/page_${page.num}.png`}
                                 alt={page.title}
                                 className="card-image"
                                 onError={(e) => {
                                    e.target.src = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 600 400'%3E%3Crect fill='%23f0f4f8' width='600' height='400'/%3E%3Crect fill='%23e2e8f0' x='30' y='30' width='540' height='340' rx='8'/%3E%3Ctext x='300' y='190' text-anchor='middle' font-family='Arial, sans-serif' font-size='16' fill='%23637381'%3EPage ${page.num} image not found%3C/text%3E%3Ctext x='300' y='220' text-anchor='middle' font-family='Arial, sans-serif' font-size='12' fill='%23929daf'%3EAdd page_${page.num}.png to /images folder%3C/text%3E%3C/svg%3E`;
                                 }}
                              />
                              <div className="card-badge">Page {page.num}</div>
                           </div>

                           <div className="card-content">
                              <h3 className="card-title">{page.title}</h3>
                              <p className="card-description">{page.description}</p>
                           </div>
                        </div>
                     ))}
                  </div>
               </section>
            ))}

            {/* Info Footer */}
            <div className="powerbi-footer">
               <div className="footer-info">
                  <h4>📊 Power BI Insights Dashboard</h4>
                  <p>A comprehensive view of student demographics, learning patterns, and skill intelligence across all fields and regions.</p>
               </div>
            </div>
         </div>
      </>
   );
};

export default PowerBiInsight;
