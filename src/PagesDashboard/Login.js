import React from "react";
import axios from 'axios'
import { Navigate } from "react-router-dom";

export default class Login extends React.Component {
    constructor() {
        super()
        this.state = {
            email_user: "",
            password_user: "",
            isModalOpen: false,
            logged: false,
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleLogin = (e) => {
        e.preventDefault()
        let data = {
            email: this.state.email_user,
            password: this.state.password_user
        }
        let url = "http://localhost:3000/user/login"
        axios.post(url, data)
            .then(response => {
                this.setState({ logged: response.data.data.logged })
                if (response.status === 200) {
                    let id = response.data.data.id
                    let token = response.data.data.token
                    let role = response.data.data.role
                    let email = response.data.data.email
                    let nama_user = response.data.data.nama_user
                    localStorage.setItem("id", id)
                    localStorage.setItem("token", token)
                    localStorage.setItem("role", role)
                    localStorage.setItem("email", email)
                    localStorage.setItem("nama_user", nama_user)
                    alert("Success Login")
                    window.location.href = "/dashboard"
                } else {
                    alert(response.data.message)
                    this.setState({ message: response.data.message })

                }
                this.setState({ logged: true });
            })
            .catch(error => {
                console.log("error", error.response.status)
                if (error.response.status === 500 || error.response.status === 404) {
                    window.alert("Failed to login dashboard");
                }
            })
    }
    componentDidMount() {
        const token = localStorage.getItem("token");
        if (token) {
            this.setState({ logged: true });
        }
    }

render() {
    if (this.state.logged) {
        // Redirect to the dashboard if the user is logged in.
        return <Navigate to="/dashboard" />;
    }

        return (
            <div className="dashboard1">
                <div className="flex">
                    <div className="w-1/2 bg-orange-50 text-left">
                        <form className="  rounded px-8 pt-6 p-8 m-24 mt-30" onSubmit={(e) => this.handleLogin(e)}>
                            <p className="text-yellow-900 text-2xl font-bold mb-8 text-center">Hotel Serenity Haven</p>
                            <div className="mb-4">
                                <label className="block  text-yellow-900 text-xl font-bold mb-2" for="email">
                                    Email 
                                </label>
                                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-yellow-900 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="email_user" name="email_user" placeholder="Email" value={this.state.email_user} onChange={this.handleChange} required />
                            </div>
                            <div className="mb-6">
                                <label className="block text-yellow-900 text-xl font-bold mb-2" for="password">
                                    Password
                                </label>
                                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-yellow-900 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" name="password_user" type="password" placeholder="Password" value={this.state.password_user} onChange={this.handleChange} required />
                            </div>
                            <div className="flex items-center justify-between">
                                <button className="bg-orange-300 hover:bg-orange-500 text-yellow-900 font-bold py-2 w-full rounded focus:outline-none focus:shadow-outline" type="submit">
                                    Login
                                </button>
                            </div>
                        </form>
                    </div>
                    <div className="w-1/2 bg-gray-500 text-center">
                        <img src="/assets/loginuser.jpg" className="w-screen h-screen" alt="" />
                    </div>
                </div>
            </div>
        );
    }
}