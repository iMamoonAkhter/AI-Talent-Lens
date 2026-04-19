import React, { useState } from "react";
import PageTitle from "../../layouts/PageTitle";

const InterviewAI = () => {
   const [answer, setAnswer] = useState("");

   return (
      <>
         <PageTitle activeMenu="Interview AI" motherMenu="AI Navigation" />
         <div className="row">
            <div className="col-xl-12">
               <div className="card">
                  <div className="card-header">
                     <h4 className="card-title">Interview AI Simulator</h4>
                  </div>
                  <div className="card-body">
                     <p className="mb-3">Question: Explain the difference between REST and GraphQL APIs.</p>
                     <textarea
                        className="form-control"
                        rows="6"
                        value={answer}
                        onChange={(e) => setAnswer(e.target.value)}
                        placeholder="Write your answer here"
                     />
                     <div className="mt-3">
                        <button type="button" className="btn btn-primary">
                           Evaluate Answer
                        </button>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </>
   );
};

export default InterviewAI;
