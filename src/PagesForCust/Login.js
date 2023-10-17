import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import axios from 'axios'

export default class Login extends React.Component {
    constructor() {
        super()
        this.state = {
            email: "",
            nama: "",
            password: "",
            role: "",
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
            email: this.state.email,
            password: this.state.password
        }
        let url = "http://localhost:3000/customer/loginCust"
        axios.post(url, data)
            .then(response => {
                this.setState({ logged: true })
                if (response.status === 200) {
                    let id = response.data.data.id
                    let token = response.data.data.token
                    let role = "customer"
                    let email = response.data.data.email
                    let nama = response.data.data.nama
                    localStorage.setItem("id", id)
                    localStorage.setItem("token", token)
                    localStorage.setItem("role", role)
                    localStorage.setItem("email", email)
                    localStorage.setItem("nama", nama)
                    alert("Success Login")
                    window.location.href = "/home"
                } else {
                    alert(response.data.message)
                    this.setState({ message: response.data.message })

                }
            })
            .catch(error => {
                console.log("error", error.response.status)
                if (error.response.status === 500 || error.response.status === 404) {
                    window.alert("Failed to login Slippy");
                }
            })
    }

    render() {
        return (
            <div className="dashboard1">
                <div class="flex">
                    <div class="w-1/2 bg-orange-100 text-left">
                        <form class="  px-8 pt-6 p-8 m-24 mt-30" onSubmit={(e) => this.handleLogin(e)}>
                            <p class="text-orange-900 text-2xl font-bold mb-4 text-center">Login Serenity Haven</p>
                            <p class="text-orange-900 text-sm font-normal mb-6 text-center">Silahkan login untuk memesan kamar di Hotel Serenity Haven</p>
                            <div class="mb-2">
                                <label class="block text-orange-900 text-xl font-bold mb-2" for="email">
                                    Email
                                </label>
                                <input class="shadow appearance-none  border rounded w-full py-2 px-3 text-orange-900 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="email" name="email" placeholder="Email" value={this.state.email} onChange={this.handleChange} required />
                            </div>
                            <div class="mb-6">
                                <label class="block text-orange-900 text-xl font-bold mb-2" for="password">
                                    Password
                                </label>
                                <input class="shadow appearance-none  border rounded w-full py-2 px-3 text-orange-900 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" name="password" type="password" placeholder="Password" value={this.state.password} onChange={this.handleChange} required />
                            </div>
                            <div class="flex items-center justify-between">
                                <button class="bg-orange-900 hover:bg-orange-500 text-white font-bold py-2 w-full rounded focus:outline-none focus:shadow-outline" type="submit">
                                    Login
                                </button>
                            </div>
                            <p class="text-sm font-normal text-orange-900 text-center mt-3 ">
                                Don’t have an account yet? <a href="registercust" class="font-medium text-primary-600 hover:underline dark:text-primary-500">Register</a>
                            </p>

                        </form>
                    </div>
                    <div class="w-1/2 bg-orange-100 text-center">
                        <img src="/assets/logincust.jpg" className="w-screen h-screen" alt="" />
                    </div>
                </div>
            </div>
        );
    }
}
