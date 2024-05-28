import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

export const LoginFormComponent = ({ isLogin, setUser }) => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [profileType, setProfileType] = useState("Seller");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    // useEffect(() => {
    //     // Fetch data from the Express server
    //     axios.get('http://localhost:5000/users')
    //         .then(response => console.log(response))
    //         .catch(error => console.error(error));
    // }, []);

    const handleLogin = () => {
        console.log("Login");
        if (isLogin) {
            axios.post(`${process.env.REACT_APP_BACKEND}/login`, { email: email, password: password })
                .then(response => {
                    if (!response.data.success) {
                        alert("Invalid email or password");
                        return;
                    }
                    const user = response.data.user;
                    localStorage.setItem("user", JSON.stringify(user));
                    setUser(user);
                    navigate(`/`);
                })
                .catch(error => console.error(error));
        } else {
            axios.post(`${process.env.REACT_APP_BACKEND}/signup`, {
                firstName: firstName, lastName: lastName, email: email, phoneNumber: phoneNumber, type: profileType,
                password: password,
            })
                .then(response => {
                    const user = response.data;
                    localStorage.setItem("user", JSON.stringify(user));
                    setUser(user);
                    navigate(`/`);
                })
                .catch(error => console.error(error));
        }
    }

    return (
        <div className="space-y-4 md:space-y-6">
            <div>
                <label for="email" className="text-left block mb-1 text-sm font-medium text-gray-900 dark:text-white">
                    Your email
                </label>
                <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)}
                    className="bg-gray-50 border border-gray-300 
                text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full 
                p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white 
                dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required="" />
            </div>
            {isLogin ? (<></>) : (
                <><div className='flex gap-6'>
                    <div>
                        <label for="firstName" className="text-left block mb-1 text-sm font-medium text-gray-900 dark:text-white">
                            First Name
                        </label>
                        <input type="text" id="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)}
                            className="bg-gray-50 border border-gray-300 text-gray-900 
                sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 
                dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white 
                dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required />
                    </div>
                    <div>
                        <label for="lastName" className="text-left block mb-1 text-sm font-medium text-gray-900 dark:text-white">
                            Last Name
                        </label>
                        <input type="text" id="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)}
                            className="bg-gray-50 border border-gray-300 text-gray-900 
                sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 
                dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white 
                dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required="" />
                    </div>
                </div>

                    <div>
                        <label for="phoneNumber" className="text-left block mb-1 text-sm font-medium text-gray-900 dark:text-white">
                            Phone Number
                        </label>
                        <input type="phoneNumber" id="email" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)}
                            className="bg-gray-50 border border-gray-300 
                text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full 
                p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white 
                dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required="" />
                    </div>
                    <div>
                        <label for="profileType" className="text-left block mb-1 text-sm font-medium text-gray-900 dark:text-white">
                            Choose Profile
                        </label>

                        <div className="flex justify-start">
                            <select className="rounded-lg px-2 border border-gray-600" id="profileType"
                                value={profileType} onChange={(e) => setProfileType(e.target.value)}>
                                <option value="Seller">Seller</option>
                                <option value="Buyer">Buyer</option>
                            </select>
                        </div>
                    </div>
                </>)}
            <div>
                <label for="password" className="text-left block mb-1 text-sm font-medium text-gray-900 dark:text-white">
                    Password
                </label>
                <input type="password" id="password" placeholder="••••••••"
                    value={password} onChange={(e) => setPassword(e.target.value)} className="bg-gray-50 
                border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 
                focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 
                dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required="" />
            </div>
            {isLogin ? (<div className="flex items-center justify-between">
                <div className="flex items-start">
                    <div className="flex items-center h-5">
                        <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required="" />
                    </div>
                    <div className="ml-3 text-sm">
                        <label for="remember" className="text-gray-500 dark:text-gray-300">Remember me</label>
                    </div>
                </div>
                <a href="#" className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">
                    Forgot password?
                </a>
            </div>) : (<></>)}
            <button onClick={handleLogin} className="w-full text-white bg-blue-600 hover:bg-primary-700 focus:ring-4 
            focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center 
            dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">{isLogin ? "Login" : "Signup"}</button>
            {isLogin ? (<p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Don’t have an account yet? <Link to={'/signup'} className="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up</Link>
            </p>) : (<></>)}
        </div>
    )
}