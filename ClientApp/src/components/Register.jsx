import axios from "axios";
import { useRef, useState, useEffect } from "react"
import AuthService from "../api/AuthService";
import { Redirect } from 'react-router-dom';



const Register = () => {

    const userRef = useRef();
    const errRef = useRef();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);


    // Focus on username
    useEffect(() => {
        userRef.current.focus();
    }, [])

    //Clear error msg
    useEffect(() => {
        setErrMsg('');
    }, [username,password])

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await AuthService.registerUser(username, password);
            setSuccess(true);
            setUsername('');
            setPassword('');
        } catch (err) {

            if (!err?.response) {
                setErrMsg('No Server Response');
            }
            else {
                setErrMsg(err.response.data);
            }
            errRef.current.focus();
        }
    }

    return (
        <section class="vh-100">
            {success ? <Redirect push to="/login"/> : null}
            <div class="container-fluid h-custom">
                <div class="row d-flex justify-content-center align-items-center h-100">
                    <div class="col-md-9 col-lg-6 col-xl-5">
                        <img src="img/sign-up-promo.svg"
                            class="img-fluid" alt="Sample image" />
                    </div>
                    <div class="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
                        {success ? (
                            <p ref={errRef} className={"alert alert-success"} aria-live="assertive">
                                Registred! 
                                <p class="small fw-bold mt-2 pt-1 mb-0"> <a href="/login"
                                        class="link-danger">Log In</a></p>
                                </p>
                        ) : (
                            <form onSubmit={handleSubmit}>
                                <p ref={errRef} className={errMsg ? "alert alert-danger" : "offscreen"} aria-live="assertive">{errMsg}</p>
                                <div class="divider d-flex align-items-center my-4">
                                    <p class="lead fw-normal mb-0 me-3">Sign Up</p>
                                </div>

                                {/* <!-- username input --> */}
                                <div class="form-outline mb-4">
                                    <input
                                        ref={userRef}
                                        type="text"
                                        id="username"
                                        onChange={(e) => setUsername(e.target.value)}
                                        required
                                        class="form-control form-control-lg"
                                        placeholder="Enter desired username" />
                                    <label class="form-label" for="form3Example3">Username</label>
                                </div>

                                {/* <!-- Password input --> */}
                                <div class="form-outline mb-3">
                                    <input 
                                        type="password" 
                                        id="password" 
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        class="form-control form-control-lg"
                                        placeholder="Enter password" />
                                    <label class="form-label" for="form3Example4">Password</label>
                                </div>

                                <div class="text-center text-lg-start mt-4 pt-2">
                                    <button 
                                        type="submit"
                                        class="btn btn-primary btn-lg"
                                        onClick={handleSubmit}

                                    >Register</button>
                                    <p class="small fw-bold mt-2 pt-1 mb-0">Already have an account? <a href="/login"
                                        class="link-danger">Log In</a></p>
                                </div>
                            </form>
                        )

                        }

                    </div>
                </div>
            </div>
        </section>
    )
}

export default Register;