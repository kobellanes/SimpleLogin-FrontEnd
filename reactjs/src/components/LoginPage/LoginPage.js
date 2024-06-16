import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import http from '../../http';
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa6";

function LoginPage() {

  const generateRandomToken = (length) => {
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789~!@#$%^&*()_+|[]";.,?/<>';
    let token = "";

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      token += characters.charAt(randomIndex);
    }

    return token;
  };

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [userPrompt, setUserPrompt] = useState(false);
  const [invprompt, setInvprompt] = useState("");

  const [loginLoader, setLoginLoader] = useState(false);

  const [eyePassword, setEyePassword] = useState(false);

  const togglePasswordVisibility = () => {
    setEyePassword(!eyePassword);
  };

  const login = async (e) => {
    e.preventDefault();

    setLoginLoader(true);
    http.post('/login', { email: email, password: password }).then(result => {
      const user = result.data.cvuud;
      const role = result.data.yoie;

      if (user && role === "wbpaztjspekazgkaznnwltpanw" && result.data.message.status == "404zoejknolksiajk") {
        const randomToken = generateRandomToken(1000);

        const generateToken = {
          id: user,
          accessToken: randomToken,
        };

        http.put(`accounts/${user}`, generateToken).then(result => {
          if (result.data.status === '404zoejknolksiajk') {
            localStorage.setItem("qygzfhIgkyd", randomToken);

            setTimeout(() => {
              setLoginLoader(false);
              navigate("/patient");
            }, 400);

          }
        }).catch(err => console.log(err.message));
      } else if (user && role === "xslqychaazdnvqteuchuqqnnkhzflazdrufpr" && result.data.message.status == "404zoejknolksiajk") {
        const randomToken = generateRandomToken(1000);

        const generateToken = {
          id: user,
          accessToken: randomToken,
        };

        http.put(`accounts/${user}`, generateToken).then(result => {
          if (result.data.status === '404zoejknolksiajk') {
            localStorage.setItem("qygzfhIgkyd", randomToken);

            setTimeout(() => {
              setLoginLoader(false);
              navigate("/doctor-patient");
            }, 400);

          }
        }).catch(err => console.log(err.message));

      } else {
        setTimeout(() => {
          setUserPrompt(true);
          setInvprompt("* Invalid Email Address or Password!");
          setEmail("");
          setPassword("");
          setLoginLoader(false);
        }, 400);
      }

    });
  };

  return (
    <>
      <section className="login-body-homepage vh-100">
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-8 col-lg-6 col-xl-5 mt-4">
              <div className="card o-hidden border-0 shadow-lg my-5 justify-content-center">
                <div className="card-body p-0 ">
                  <div className="">
                    <div className="col-lg-12 align-items-center justify-content-between">
                      <div className="p-5">
                        <div className="text-center">
                          <div className="py-3">
                            <h3 className="">Welcome to Sample Web App!</h3>

                            <span className="text-secondary text-muted fw-light small">
                              Login with your details to continue
                            </span>
                          </div>
                        </div>
                        <form onSubmit={login}>
                          <div className="form-group my-2">
                            <input
                              type="email"
                              className="form-control form-control-user rounded-3"
                              id="exampleInputEmail"
                              aria-describedby="emailHelp"
                              placeholder="Email Address"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              required
                              autoComplete="on"
                            />
                          </div>

                          <div className="form-group position-relative">
                            <input
                              type={eyePassword === false ? 'password' : 'text'}
                              className="form-control form-control-user rounded-3"
                              id="exampleInputPassword"
                              placeholder="Password"
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                              required
                              style={{ paddingRight: '2.5rem' }}
                              autoComplete="on"
                            />
                            {
                              password.length > 0 ?
                                <div className="text-secondary" onClick={togglePasswordVisibility}
                                  style={{
                                    cursor: 'pointer',
                                    position: 'absolute',
                                    top: '45%',
                                    right: '15px',
                                    transform: 'translateY(-50%)',
                                  }}>
                                  {eyePassword === false ?
                                    <FaEyeSlash />
                                    :
                                    <FaEye />
                                  }

                                </div>
                                :
                                ""
                            }



                          </div>
                          {
                            loginLoader === false ?
                              <button
                                type="submit"
                                className="btn loginpage-login-btn text-light col-12 mt-2 rounded-5"
                              >
                                Log in
                              </button>
                              :
                              <button className="btn btn-primary rounded-5 col-12 mt-2 text-light" type="button" disabled>
                                <span className="spinner-border spinner-border-sm" aria-hidden="true"></span>
                                <span role="status" className="ms-1">Loading...</span>
                              </button>
                          }

                        </form>

                        {userPrompt === true &&
                          email.length === 0 &&
                          password.length === 0 ? (
                          <>
                            <p className="text-center m-0 p-0 mt-3 text-danger">
                              {invprompt}
                            </p>

                            <div className="text-center m-0 p-0 mt-2">
                              <Link className=" text-primary fw-light login-forgot-function" to="/otp">
                                Forgot password?
                              </Link>
                            </div>
                          </>
                        ) : (
                          <div className="text-center m-0 p-0 mt-3">
                            <Link className=" text-primary fw-light login-forgot-function" to="/otp">
                              Forgot password?
                            </Link>
                          </div>
                        )}



                        <hr />
                        <div className="text-center">
                          <span className="text-muted fw-light small">
                            Don't have an account?
                          </span>
                          <Link
                            to="/register"
                            className="small fw-semibold ms-1 text-dark loginpage-signup-btn"
                          >
                            Sign up
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default LoginPage;
