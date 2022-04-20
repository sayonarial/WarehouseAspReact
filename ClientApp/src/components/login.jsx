import axios from "axios";
import { useState, useEffect, useContext } from "react";
import AuthService from "../api/AuthService"
import { AuthContext } from '../context';
import { Redirect } from 'react-router-dom';

const Login = () => {


    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const { isAuth, setIsAuth } = useContext(AuthContext);
    const [redirect, setRedirect] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            await AuthService.validateUser(username, password);
            setUsername('');
            setPassword('');
            setIsLoading(false);
            setIsAuth(true);
            setRedirect(true)

        } catch (error) {
            setErrorMessage(error.response.data)
        }
    }


    useEffect(() => {
        setIsLoading(false);
        setErrorMessage("");
    }, [username,password])

    return (
        <section class="vh-100">
            {redirect ? <Redirect push to="/items"/> : null}
            <div class="container-fluid h-custom">
                <div class="row d-flex justify-content-center align-items-center h-100">
                    <div class="col-md-9 col-lg-6 col-xl-5">
                        <img src="img/sign-up-promo.svg"
                            class="img-fluid" alt="Sample image" />
                    </div>
                    <div class="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
                    <p className={errorMessage ? "alert alert-danger" : "offscreen"} aria-live="assertive">{errorMessage}</p>
                        <form onSubmit={handleSubmit}>

                            <div class="divider d-flex align-items-center my-4">
                                <p class="lead fw-normal mb-0 me-3">Sign In</p>
                            </div>
                            <form >
                                {/* <!-- Username input --> */}
                                <div class="form-outline mb-4">
                                    <input
                                        type="text"
                                        id="form3Example3"
                                        class="form-control form-control-lg"
                                        placeholder="Enter valid username"
                                        onChange={(e) => setUsername(e.target.value)}
                                        value = {username}
                                    />
                                    <label class="form-label" for="form3Example3">Username</label>
                                </div>

                                {/* <!-- Password input --> */}
                                <div class="form-outline mb-3">
                                    <input
                                        type="password"
                                        id="form3Example4"
                                        class="form-control form-control-lg"
                                        placeholder="Enter password"
                                        onChange={(e) => setPassword(e.target.value)}
                                        value = {password}
                                    />
                                    <label class="form-label" for="form3Example4">Password</label>
                                </div>

                                <div class="text-center text-lg-start mt-4 pt-2">
                                    {isLoading ?
                                        <button
                                            class="btn btn-primary btn-lg disabled"
                                        >Login</button>
                                    :
                                        <button
                                            onClick={handleSubmit}
                                            class="btn btn-primary btn-lg"
                                        >Login</button>
                                    }

                                    <p class="small fw-bold mt-2 pt-1 mb-0">Don't have an account? <a href="/register"
                                        class="link-danger">Register</a></p>
                                </div>

                            </form>


                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Login;