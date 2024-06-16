"useclient";
import React, { useState } from "react";
import http from '../../http';
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa6";
import { Link } from "react-router-dom";

function SignUp() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [registeredPrompt, setRegisteredPrompt] = useState('');

    const [registerLoader, setRegisterLoader] = useState(false);

    const [invalidPassword, setInvalidPassword] = useState('');

    const [invalidEmail, setInvalidEmail] = useState('');

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setRegisterLoader(true);

        if (password === confirmPassword) {
            const account = {
                email: email,
                password: password,
            }

            http.post('accounts', account).then((result) => {

                if (result.data.status === "404zoejknolksiajk") {

                    setTimeout(() => {
                        setRegisterLoader(false);
                        setRegisteredPrompt(result.data.message);

                        setEmail('');
                        setPassword('');
                        setConfirmPassword('');
                        setInvalidPassword('');
                        setInvalidEmail('');

                    }, 400);

                } else if (result.data.status === "404lryoynlaabtooopzld") {
                    setTimeout(() => {
                        setRegisterLoader(false);
                        setInvalidEmail(result.data.message);

                        setEmail('');
                        setInvalidPassword('');
                        setRegisteredPrompt('');
                    }, 400);
                }

            }).catch(err => console.log(err.message));

        } else {

            setTimeout(() => {
                setPassword('')
                setConfirmPassword('');

                setRegisterLoader(false);
                setInvalidPassword("Password does not match");
            }, 400);



        }

    }

    const [eyePassword, setEyePassword] = useState(false);

    const togglePasswordVisibility = () => {
        setEyePassword(!eyePassword);
    };

    const [eyeConfirmPassword, setEyeConfirmPassword] = useState(false);

    const toggleConfirmPasswordVisibility = () => {
        setEyeConfirmPassword(!eyeConfirmPassword);
    };


    return (
        <>
            <section className="SignUp-body-homepage vh-100">
                <div className="container py-5 h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                            <div className="card o-hidden border-0 shadow-lg my-5 justify-content-center">
                                <div className="card-body p-0 ">
                                    <div className="">
                                        <div className="col-lg-12 align-items-center">
                                            <div className="p-5">

                                                <div className="text-center mb-4 mt-3">
                                                    <h1 className="h4 text-gray-900 mb-2">
                                                        Let's Get Started
                                                    </h1>
                                                    <span className="text-muted fw-light small">
                                                        Input Your Details
                                                    </span>
                                                </div>
                                                <form onSubmit={handleFormSubmit}>

                                                    <div className={
                                                        invalidEmail.length > 0 && email.length === 0 ?
                                                            "form-group my-2 mb-2"
                                                            :
                                                            "form-group my-2 mb-3"

                                                    }>
                                                        <input
                                                            type="email"
                                                            className="form-control form-control-user"
                                                            id="exampleInputEmail"
                                                            aria-describedby="emailHelp"
                                                            placeholder=" Active Email Address (ex: john.john@gmail.com)"
                                                            value={email}
                                                            onChange={(e) => setEmail(e.target.value)}
                                                            required
                                                        />

                                                        {
                                                            invalidEmail.length > 0 && email.length === 0 ?
                                                                <div className="form-group mx-2 row">
                                                                    <p className="text-danger m-0 p-0">{invalidEmail}</p>
                                                                </div>
                                                                :
                                                                ""
                                                        }
                                                    </div>

                                                    <div className="form-group my-2 mb-3 row">
                                                        <div className="col-sm-6 mb-3 mb-sm-0">
                                                            <input
                                                                type={eyePassword === false ? 'password' : 'text'}
                                                                className="form-control form-control-user"
                                                                id="exampleInputPassword"
                                                                style={{ paddingRight: '2rem' }}
                                                                placeholder="Password"
                                                                value={password}
                                                                onChange={(e) => setPassword(e.target.value)}
                                                                required
                                                            />

                                                            {
                                                                password.length > 0 ?
                                                                    invalidEmail.length > 0 && email.length === 0 ?
                                                                        <div className="text-secondary position-absolute" onClick={togglePasswordVisibility}
                                                                            style={{
                                                                                cursor: 'pointer',
                                                                                top: '52%',
                                                                                right: '285px',
                                                                                padding: '0',
                                                                            }}
                                                                        >
                                                                            {eyePassword === false ?
                                                                                <FaEyeSlash />
                                                                                :
                                                                                <FaEye />
                                                                            }

                                                                        </div>
                                                                        :
                                                                        registeredPrompt.length > 0 ?
                                                                            <div className="text-secondary position-absolute" onClick={togglePasswordVisibility}
                                                                                style={{
                                                                                    cursor: 'pointer',
                                                                                    top: '52%',
                                                                                    right: '285px',
                                                                                    padding: '0',
                                                                                }}
                                                                            >
                                                                                {eyePassword === false ?
                                                                                    <FaEyeSlash />
                                                                                    :
                                                                                    <FaEye />
                                                                                }

                                                                            </div>
                                                                            :
                                                                            <div className="text-secondary position-absolute" onClick={togglePasswordVisibility}
                                                                                style={{
                                                                                    cursor: 'pointer',
                                                                                    top: '52%',
                                                                                    right: '285px',
                                                                                    padding: '0',
                                                                                }}
                                                                            >
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

                                                        <div className="col-sm-6">
                                                            <input
                                                                type={eyeConfirmPassword === false ? 'password' : 'text'}
                                                                className="form-control form-control-user"
                                                                style={{ paddingRight: '2rem' }}
                                                                id="exampleRepeatPassword"
                                                                placeholder="Repeat Password"
                                                                value={confirmPassword}
                                                                onChange={(e) => setConfirmPassword(e.target.value)}
                                                                required
                                                            />
                                                            {
                                                                confirmPassword.length > 0 ?
                                                                    invalidEmail.length > 0 && email.length === 0 ?
                                                                        <div className="text-secondary position-absolute" onClick={toggleConfirmPasswordVisibility}
                                                                            style={{
                                                                                cursor: 'pointer',
                                                                                top: '52%',
                                                                                right: '60px',
                                                                                padding: '0',
                                                                            }}
                                                                        >
                                                                            {eyeConfirmPassword === false ?
                                                                                <FaEyeSlash />
                                                                                :
                                                                                <FaEye />
                                                                            }

                                                                        </div>
                                                                        :
                                                                        registeredPrompt.length > 0 ?
                                                                            <div className="text-secondary position-absolute" onClick={toggleConfirmPasswordVisibility}
                                                                                style={{
                                                                                    cursor: 'pointer',
                                                                                    top: '52%',
                                                                                    right: '60px',
                                                                                    padding: '0',
                                                                                }}
                                                                            >
                                                                                {eyeConfirmPassword === false ?
                                                                                    <FaEyeSlash />
                                                                                    :
                                                                                    <FaEye />
                                                                                }

                                                                            </div>
                                                                            :
                                                                            <div className="text-secondary position-absolute" onClick={toggleConfirmPasswordVisibility}
                                                                                style={{
                                                                                    cursor: 'pointer',
                                                                                    top: '52%',
                                                                                    right: '60px',
                                                                                }}
                                                                            >
                                                                                {eyeConfirmPassword === false ?
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
                                                            invalidPassword.length > 0 && password.length === 0 && confirmPassword.length === 0 ?
                                                                <div className="form-group mx-2 row mt-3">
                                                                    <p className="text-danger text-center m-0 p-0">{invalidPassword}</p>
                                                                </div>
                                                                :
                                                                ""
                                                        }
                                                    </div>

                                                    {
                                                        registerLoader === false ?
                                                            <button
                                                                type="submit"
                                                                className="btn loginpage-login-btn text-light col-12 rounded-5"
                                                            >

                                                                Register
                                                            </button>
                                                            :
                                                            <button className="btn btn-primary rounded-5 col-12 mt-2 text-light" type="button" disabled>
                                                                <span className="spinner-border spinner-border-sm" aria-hidden="true"></span>
                                                                <span role="status" className="ms-1">Loading...</span>
                                                            </button>
                                                    }

                                                    {
                                                        registeredPrompt.length > 0 ?
                                                            <p className="text-center text-success col-12">
                                                                {registeredPrompt}
                                                            </p>
                                                            :
                                                            ""
                                                    }


                                                </form>
                                                <hr />
                                                <div className="text-center">
                                                    <span className="text-muted fw-light small">
                                                        Already have an account?
                                                    </span>
                                                    <Link
                                                        to="/"
                                                        className="small fw-semibold ms-1 text-dark loginpage-signup-btn"
                                                    >
                                                        Log in
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

export default SignUp;
