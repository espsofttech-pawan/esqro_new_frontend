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
    password: '',
    passwordLength: '0'    
}   

export default class Login extends Component {

    constructor(props) {
        super(props)

        if(Cookies.get('loginSuccess')){
            window.location.href = `${config.baseUrl}dashboard`
         }        

        this.state = initialState
        this.onChange = this.onChange.bind(this);
        this.submitForm = this.submitForm.bind(this);
        const { match: { params } } = this.props;
        this.token = params.token         
    }

    componentDidMount() {
        this.verifyAccountAPI()
    }

    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
        if (e.target.name === 'password') {
            if (e.target.value.length < 6) {
                this.setState({
                    passwordLength: '1'
                })
            }
            else {
                this.setState({
                    passwordLength: '0'
                })
            }
        }
    }    

    async submitForm(e) {
        e.preventDefault()
        this.setState(initialState)
        const data = this.state
        delete this.state.passwordLength
        axios.post(`${config.apiUrl}/login`, data, { headers })
            .then(response => {
                if (response.data.success === true) {
                    toast.success('Login Successfully!', {
                        position: toast.POSITION.TOP_CENTER
                    });

                    setTimeout(() => {
                        if(response.data.data.is_enable_google_auth_code){
                            Cookies.set('user_id', response.data.data.id);
                            window.location.href = `${config.baseUrl}googleAuth`
                        }else{
                            Cookies.set('loginSuccess', response.data);
                            window.location.href = `${config.baseUrl}dashboard`
                        }
                    }, 2000);
                }

                else if (response.data.success === false) {
                    toast.error(response.data.message, {
                        position: toast.POSITION.TOP_CENTER
                    });
                    setTimeout(() => {
                        window.location.href = `${config.baseUrl}login`
                    }, 2000);
                }
            })

            .catch(err => {            
                toast.error(err.response.data?.message, {
                position: toast.POSITION.TOP_CENTER
                });
                setTimeout(() => {
                    window.location.href = `${config.baseUrl}login`
                }, 2000);
            })
    }      

    async verifyAccountAPI() {
        axios.get(`${config.apiUrl}/verifyAccount/`+this.token, { headers }).then(response => {
            if (response.data.success === true) {
                toast.success(response.data.message, {
                    position: toast.POSITION.LEFT_CENTER
                  });
            }

            else if (response.data.success === false) {
                toast.error(response.data.message, {
                    position: toast.POSITION.LEFT_CENTER
                  });
            }           
        })
        .catch(err => {
           
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
                            <img src={`${config.baseUrl}images/Esqro-Logo-B-1.png`} className="transition" alt="Esqro crypto" />
                            <h3 className="text-center head_theme pb-5">Login</h3>
                            <div className="form-signin-heading">
                            </div>
                            <form onSubmit={this.submitForm}> 
                                <div className="form-group">
                                    <input style={{height: "38px"}} onChange={this.onChange} value={this.state.email} className="form-control" placeholder="Example@gmail.com" type="email" name="email" id="email" />
                                    <label className="error"></label>
                                </div>

                                <div className="form-group">
                                    <input style={{height: "38px"}} onChange={this.onChange} value={this.state.password} className="form-control" placeholder="Password" type="password" name="password" id="password" />
                                    {this.state.passwordLength === '1' ? <p className="errorMessage">Password length should be greater than 6</p> : ''}                                    
                                    <label className="error"></label>
                                </div>                              
                            
                                <div className="input-group">
                                    <div className="checkbox">
                                        <label>
                                        <input id="login-remember" type="checkbox" name="remember" value="1" /> Remember me
                                        </label>
                                    </div>
                                </div><br />
                                
                                <div className="form-group">
                                    {!this.state.email || this.state.password.length < 6 ?
                                    <button type="submit" className="btn btn-success pt-2 pb-2 col-sm-12 disabled_form" disabled >Login</button>
                                    : <button type="submit" className="btn btn-success pt-2 pb-2 col-sm-12" >Login</button>}
                                </div>
                                
                            </form>
                            <div className="row">
                                <div className="col-md-6">
                                <li style={{listStyle: "none",fontSize: "17px"}} className="text-center">
                                <a href={`${config.baseUrl}forgotPassword`}>Forgot your password?                         
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