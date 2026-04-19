import React, { Fragment } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

/// Components
import Markup from "./jsx";

/// Style
import "./css/style.css";
import "./css/luxury-theme.css";
import "./vendor/bootstrap-select/dist/css/bootstrap-select.min.css";

import { withResizeDetector } from "react-resize-detector";

const App = ({ width }) => {
   const body = document.querySelector("body");

   width >= 1300
      ? body.setAttribute("data-sidebar-style", "full")
      : width <= 1299 && width >= 767
      ? body.setAttribute("data-sidebar-style", "mini")
      : body.setAttribute("data-sidebar-style", "overlay");
	return (
		<Fragment>
			<Markup />
         <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
         />
		</Fragment>
	);
};

export default withResizeDetector(App);
