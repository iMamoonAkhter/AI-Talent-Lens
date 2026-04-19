import React, { useState } from "react";

const NavHader = () => {
   const [toggle, setToggle] = useState(false);

   return (
      <div className="nav-header">
         <div className="nav-control" onClick={() => setToggle(!toggle)}>
            <div className={`hamburger ${toggle ? "is-active" : ""}`}>
               <span className="line"></span>
               <span className="line"></span>
               <span className="line"></span>
            </div>
         </div>
      </div>
   );
};

export default NavHader;
