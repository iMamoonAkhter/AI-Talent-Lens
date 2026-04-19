import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from '../../images/logo-full.png';

const Login = () => {
   const [loginData, setLoginData] = useState({});
   const handleBlur = (e) => {
      const newLoginData = { ...loginData };
      newLoginData[e.target.name] = e.target.value;
      setLoginData(newLoginData);
   };
   const submitHandler = (e) => {
      e.preventDefault();
      
   };
   return (
      <div className="row justify-content-center h-100 align-items-center h-80">
         <div className="col-md-6">
            <div className="authincation-content">
               <div className="row no-gutters">
                  <div className="col-xl-12">
                     <div className="auth-form">
						<div className="text-center mb-3">
							<Link to={"/"}><img src={logo} alt="" /></Link>
						</div>
                        <h4 className="text-center mb-4 text-white"> Sign in your account  </h4>
                        <form  action="" onSubmit={(e) => e.preventDefault(submitHandler)}  >
                           <div className="form-group">   
								<label className="mb-1 text-white">  <strong>Email</strong> </label>
								<input type="email" className="form-control" value="hello@example.com"  onChange={handleBlur}   />
                           </div>
                           <div className="form-group">
                              <label className="mb-1 text-white "> <strong>Password</strong>  </label>
                              <input type="password" className="form-control" value="Password"  onChange={handleBlur}  />
                           </div>
                           <div className="form-row d-flex justify-content-between mt-4 mb-2">
                              <div className="form-group">
                                 <div className="custom-control custom-checkbox ml-1 ">
                                    <input  type="checkbox" className="custom-control-input"   id="basic_checkbox_1"  />
                                    <label  className="custom-control-label text-white" htmlFor="basic_checkbox_1"  >  Remember my preference </label>
								</div>
                              </div>
                              <div className="form-group">
                                 <Link  className="text-white"  to="/page-forgot-password"  > Forgot Password?  </Link>
                              </div>
                           </div>
                           <div className="text-center">
                              <button  type="submit"  className="btn bg-white text-primary btn-block"  onClick={() => submitHandler} > Sign Me In </button>
                           </div>
                        </form>
                        <div className="new-account mt-3">
                           <p className="text-white"> Don't have an account?{" "}   <Link className="text-primary" to="/page-register">  Sign up   </Link>  </p>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default Login;
