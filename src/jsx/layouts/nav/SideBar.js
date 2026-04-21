import React, { Component } from "react";

/// Link
import { Link } from "react-router-dom";

/// Scroll
import PerfectScrollbar from "react-perfect-scrollbar";
	

/// Menu
import MetisMenu from "metismenujs";

class MM extends Component {
   componentDidMount() {
      this.$el = this.el;
      this.mm = new MetisMenu(this.$el);
   }
   componentWillUnmount() {
      //this.mm("dispose");
      this.mm.dispose();
   }
   render() {
      return (
         <div className="mm-wrapper">
            <ul className="metismenu" ref={(el) => (this.el = el)}>
               {this.props.children}
            </ul>
         </div>
      );
   }
}

class SideBar extends Component {

   /// Open menu
   componentDidMount() {
      // sidebar open/close
      var btn = document.querySelector(".nav-control");
      var aaa = document.querySelector("#main-wrapper");

      function toggleFunc() {
         return aaa.classList.toggle("menu-toggle");
      }

      btn.addEventListener("click", toggleFunc);
   }
   render() {
      /// Path
      let path = window.location.pathname;
	  path = path.split("/");
   	  path = path[path.length - 1];

      /// Active menu
         let innovationHub = [
            "roadmap-engine",
            "project-engine",
         ],
         careerInsights = [
            "ai-resume-analyzer",
            "project-chatbot",
            "interview-ai",
            "recommendation-system",
         ],
         charts = [
            "student-demographic-overview",
            "skills-learning-intelligence",
         ];

      return (
         <div className="dlabnav">
            <PerfectScrollbar className="dlabnav-scroll">
               <MM className="metismenu" id="menu">
                  <li className={`${innovationHub.includes(path) ? "mm-active" : ""}`}>
                     <Link className="has-arrow ai-icon" to="#">
                        <i className="flaticon-381-idea"></i>
                        <span className="nav-text">Innovation Hub</span>
                     </Link>
                     <ul>
                        <li>
                           <Link
                              className={`${path === "roadmap-engine" ? "mm-active" : ""}`}
                              to="/roadmap-engine"
                              onClick={() => this.props.onClick()}
                           >
                              RoadMap Engine
                           </Link>
                        </li>
                        <li>
                           <Link
                              className={`${path === "project-engine" ? "mm-active" : ""}`}
                              to="/project-engine"
                              onClick={() => this.props.onClick()}
                           >
                              Project Engine
                           </Link>
                        </li>
                     </ul>
                  </li>
                  <li className={`${careerInsights.includes(path) ? "mm-active" : ""}`}>
                     <Link className="has-arrow ai-icon" to="#">
                        <i className="flaticon-381-list"></i>
                        <span className="nav-text">Career Insights</span>
                     </Link>
                     <ul>
                        <li>
                           <Link
                              className={`${path === "ai-resume-analyzer" ? "mm-active" : ""}`}
                              to="/ai-resume-analyzer"
                              onClick={() => this.props.onClick()}
                           >
                              AI Resume Analyzer
                           </Link>
                        </li>
                        <li>
                           <Link
                              className={`${path === "interview-ai" ? "mm-active" : ""}`}
                              to="/interview-ai"
                              onClick={() => this.props.onClick()}
                           >
                              AI Interviewer
                           </Link>
                        </li>
                        <li>
                           <Link
                              className={`${path === "recommendation-system" ? "mm-active" : ""}`}
                              to="/recommendation-system"
                              onClick={() => this.props.onClick()}
                           >
                              Recommendation System
                           </Link>
                        </li>
                     </ul>
                  </li>
                  <li
                     className={`${
                        charts.includes(path) ? "mm-active" : ""
                     }`}
                  >
                     <Link
                        className="has-arrow ai-icon"
                        to="#"
                        
                     >
                        <i className="flaticon-381-controls-3"></i>
                        <span className="nav-text">PowerBi Insight</span>
                     </Link>
                     <ul >
                        <li>
                           <Link
                              className={`${ path === "student-demographic-overview" ? "mm-active" : "" }`}
                              onClick={() => this.props.onClick()}
                              to="/student-demographic-overview"
                           >
                              Student & Demographic
                           </Link>
                        </li>
                        <li>
                           <Link
                              className={`${ path === "skills-learning-intelligence" ? "mm-active" : "" }`}
                              onClick={() => this.props.onClick()}
                              to="/skills-learning-intelligence"
                           >
                              Skills & Intelligence
                           </Link>
                        </li>
                     </ul>
                  </li>
               </MM>
              
            </PerfectScrollbar>
         </div>
      );
   }
}

export default SideBar;
