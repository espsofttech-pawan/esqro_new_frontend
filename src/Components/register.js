import React, { Component } from 'react';
import HeaderPage from '../Includes/Header'
import Footer from '../Includes/Footer'
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import config from '../config/config';
const headers = {
    'Content-Type': 'application/json'
};   

const initialState = {
    username: '',
    email: '',
    password: '',
    terms_conditions :'',
    confirm_password: '',
    passwordLength2: '0',
    passwordLength: '0'    
}   

export default class Register extends Component {
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

        if (e.target.name === 'password2') {
            if (e.target.value.length < 7) {
                this.setState({
                    passwordLength2: '1'
                })
            }
            else {
                this.setState({
                    passwordLength2: '0'
                })
            }
        }
    }

    //======================================  Signup API  ======================

    async submitForm(e) {
        e.preventDefault()
        this.setState(initialState)
        const data = this.state
        delete this.state.confirmPasswordCheck
        delete this.state.passwordLength2
        delete this.state.passwordLength
        axios.post(`${config.apiUrl}/register`, data, { headers })
            .then(response => {

                if (response.data.success === true) {
                    toast.success(response.data.msg, {
                        position: toast.POSITION.LEFT_CENTER
                      });
                }

                else if (response.data.success === false) {
                    toast.error(response.data.msg, {
                        position: toast.POSITION.LEFT_CENTER
                      });
                }
            })
            .catch(err => {
                toast.error(err.response.data?.msg, {
                    position: toast.POSITION.LEFT_CENTER
                  });
               
            })
    }    

    render() {
        if (this.state.password != this.state.confirm_password) {
            this.state.confirmPasswordCheck = '1'
        }
        else {
            this.state.confirmPasswordCheck = '0'
        }
        return (
            <>
            <ToastContainer />
            <HeaderPage />
            <section className="buy-sell-tab ">            
                <div className="container">
                    <div className="row">
                    <div className="col-sm-4">
                        
                    </div>
                    <div className="col-sm-4">
                        <div id="content-block-login">
                    <div className="content-block pt-2 pb-2" >
                    <div className="inner ">
                        
                        <h3 className="text-center head_theme">Register
                        </h3>
                        <form onSubmit={this.submitForm}>                            
                            <input type="hidden" name="reffered_by" value="" />
                            <div className="form-group mb-0">
                                <label for="user_name" style={{color: "#fff"}}>Username <span className="requiredField">*</span></label>
                                <input style={{height: "38px"}} onChange={this.onChange} value={this.state.username} placeholder="Type Username" autoComplete="off" required="" className="form-control" type="text" name="username" id="username" />
                                <label className="error"></label>
                            </div>

                            <div className="form-group mb-0">
                                <label for="user_email" style={{color: "#fff"}}>E-mail <span className="requiredField">*</span></label>
                                <input style={{height: "38px"}} onChange={this.onChange} value={this.state.email} autoComplete="off" placeholder="Example@gmail.com" required="" className="form-control" type="email" name="email" id="email" />
                                <label className="error"></label>
                            </div>

                            <div className="form-group mb-0">
                                <label for="password" style={{color: "#fff"}}>Password <span className="requiredField">*</span></label>
                                <input style={{height: "38px"}} onChange={this.onChange} value={this.state.password} className="form-control" placeholder="Type password" minlength="5" required="" type="password" name="password" id="password" />
                                <label className="error"></label>
                            </div>
                            {this.state.passwordLength === '1' ? <p className="errorMessage">Password length should be greater than 6</p> : ''}
                            {this.state.confirmPasswordCheck === '1' ? <p className="errorMessage">Password Not match</p> : ''}

                            <div className="form-group mb-0">
                                <label for="confirm_password" style={{color: "#fff"}}>Re-enter Password <span className="requiredField">*</span></label>
                                <input style={{height: "38px"}} onChange={this.onChange} value={this.state.confirm_password} className="form-control" placeholder="Type password" required="" type="password" name="confirm_password" id="confirm_password" />
                                <label className="error"></label>
                            </div>    
                            {this.state.passwordLength2 === '1' ? <p className="errorMessage">Password length should be greater than 6</p> : ''}
                            {this.state.confirmPasswordCheck === '1' ? <p className="errorMessage">Password Not match</p> : ''}                                                  

                            <div className="form-check mb-4">
                                <label className="form-check-label">
                                <input required onChange={this.onChange} value="1" name="terms_conditions" type="checkbox" className="form-check-input" />
                                Accept terms and condition <span className="requiredField">*</span>
                                </label>
                            </div>

                            <div className="col-md-12  pl-0 pr-0">
                            <div className="form-group">
                                <div className="form-group">
                                    {!this.state.username || !this.state.email || this.state.password.length < 6 || this.state.confirm_password.length < 6 ?
                                            <button type="submit" className="btn btn-success pt-2 pb-2 col-sm-12 disabled_form" disabled >SIGN UP</button>
                                            : <button type="submit" className="btn btn-success pt-2 pb-2 col-sm-12" >SIGN UP</button>}
                                </div>
                            </div>
                            </div>
                        </form>
                        
                        <div className="row">
                            <div className="col-md-12">
                            <div className="text-white">Existing account, Sign In <a href={`${config.baseUrl}login`}>here.</a></div>
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