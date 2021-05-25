import React, { Component } from 'react';
import HeaderPage from '../Includes/Header'
import Footer from '../Includes/Footer'
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import config from '../config/config';
import Cookies from 'js-cookie';
const headers = {
    'Content-Type': 'application/json'
};   

const initialState = {
    email: '', 
}   

export default class ForgotPassword extends Component {

    constructor(props) {
        super(props)
        this.state = initialState
        this.onChange = this.onChange.bind(this);
        this.submitForm = this.submitForm.bind(this);
    }

    componentDidMount() {

    }

    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }    

    async submitForm(e) {
        e.preventDefault()
        this.setState(initialState)
        const data = this.state
        axios.post(`${config.apiUrl}/forgotPassword`, data, { headers })
            .then(response => {
                if (response.data.success === true) {
                    toast.success(response.data.message, {
                        position: toast.POSITION.TOP_CENTER
                    });
                }

                else if (response.data.success === false) {
                    toast.error(response.data.message, {
                        position: toast.POSITION.TOP_CENTER
                    });
                }
            })

            .catch(err => {            
                toast.error(err.response.data?.message, {
                position: toast.POSITION.TOP_CENTER
                });

            })
    }      

    render() {

        return (
            <>
            <ToastContainer />
            <HeaderPage />
            <section className="buy-sell-tab">
                <div className="container">
                    <div className="row">
                    <div className="col-sm-4">
                        
                    </div>
                    <div className="col-sm-4">
                        <div id="content-block-login">
                    <div className="content-block">
                        <div className="inner text-center pt-2">
                            <img src="images/Esqro-Logo-B-1.png" className="transition" alt="Esqro crypto" />
                            <h3 className="text-center head_theme pb-5">Forgot Password</h3>
                            <div className="form-signin-heading">
                            </div>
                            <form onSubmit={this.submitForm}> 
                                <div className="form-group">
                                    <input style={{height: "38px"}} onChange={this.onChange} value={this.state.email} className="form-control" placeholder="Example@gmail.com" type="email" name="email" id="email" />
                                    <label className="error"></label>
                                </div>

                                <div className="form-group">
                                    {!this.state.email ?
                                    <button type="submit" className="btn btn-success pt-2 pb-2 col-sm-12 disabled_form" disabled >Reset Password</button>
                                    : <button type="submit" className="btn btn-success pt-2 pb-2 col-sm-12" >Reset Password</button>}
                                </div>
                                
                            </form>
                            <div className="row">
                                <div className="col-md-6">
                                <li style={{listStyle: "none",fontSize: "17px"}} className="text-center">
                                <a href={`${config.baseUrl}login`}>Login?                         
                                    </a>
                                </li>
                                </div>

                                <div className="col-md-6">
                                <li style={{listStyle: "none",fontSize: "17px"}} className="text-center">
                                    <a href={`${config.baseUrl}register`}>Sign up?                         
                                    </a>
                                </li>
                                </div>

                            </div>
                            <br />
                            <div className="row">
                                <div className="col-md-12">
                                
                                </div>
                            </div>
                            
                        </div>
                        </div>
                        </div>
                    </div>
                    <div className="col-sm-4">
                        
                    </div>
                    
                    </div>
                    
                </div>
            </section>
            <Footer />
            </>
            )
        }
    }