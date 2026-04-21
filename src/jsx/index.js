import React, { useState } from "react";

/// React router dom
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";

/// Css
import "./index.css";
import "./chart.css";

/// Layout
import Nav from "./layouts/nav";
import Footer from "./layouts/Footer";
import ScrollToTop from "./pages/ScrollToTop";

/// Pages
import MarketAudit from "./pages/SkillBot/MarketAudit";
import RoadMapEngine from "./pages/SkillBot/RoadMapEngine";
import StudentDemographicOverview from "./pages/SkillBot/StudentDemographicOverview";
import SkillsLearningIntelligence from "./pages/SkillBot/SkillsLearningIntelligence";
import RecommendationSystem from "./pages/SkillBot/RecommendationSystem";
import ProjectEngine from "./pages/SkillBot/ProjectEngine";
import ProjectChatbot from "./pages/SkillBot/ProjectChatbot";
import InterviewAI from "./pages/SkillBot/InterviewAI";

const Markup = () => {
	let path = window.location.pathname;
	path = path.split("/");
	path = path[path.length - 1];
	let pagePath = path.split("-").includes("page");

	const [activeEvent, setActiveEvent] = useState(!path);

	const routes = [
		{ url: "roadmap-engine", component: RoadMapEngine },
		{ url: "ai-resume-analyzer", component: MarketAudit },
		{ url: "project-engine", component: ProjectEngine },
		{ url: "project-chatbot", component: ProjectChatbot },
		{ url: "interview-ai", component: InterviewAI },
		{ url: "recommendation-system", component: RecommendationSystem },
		{ url: "student-demographic-overview", component: StudentDemographicOverview },
		{ url: "skills-learning-intelligence", component: SkillsLearningIntelligence },
	];

	return (
		<Router>
			<div
				id={`${!pagePath ? "main-wrapper" : ""}`}
				className={`${!pagePath ? "show" : "mh100vh"}`}
			>
				{!pagePath && (
					<Nav
						onClick={() => setActiveEvent(!activeEvent)} activeEvent={activeEvent}
						onClick2={() => setActiveEvent(false)}
						onClick3={() => setActiveEvent(true)}
					/>
				)}

				<div
					className={` ${!path && activeEvent ? "rightside-event" : ""} ${
						!pagePath ? "content-body" : ""
					}`}
				>
					<div className={`${!pagePath ? "container-fluid" : ""}`}>
						<Switch>
							<Route exact path="/">
								<Redirect to="/roadmap-engine" />
							</Route>
							{routes.map((data, i) => (
								<Route
									key={i}
									exact
									path={`/${data.url}`}
									component={data.component}
								/>
							))}
						</Switch>
					</div>
				</div>
				{!pagePath && <Footer />}
			</div>

			<ScrollToTop />
		</Router>
	);
};

export default Markup;
