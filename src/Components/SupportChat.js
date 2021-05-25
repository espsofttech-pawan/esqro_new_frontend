import React, { Component } from 'react';
import HeaderPage from '../Includes/Header'
import Footer from '../Includes/Footer'
import axios from 'axios';
import config from '../config/config'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'js-cookie';
const headers = {
    'Content-Type': 'application/json'
};   

export default class SupportChat extends Component {

    constructor(props) {
        super(props)
        if(Cookies.get('loginSuccess')){
            this.loginData = JSON.parse(Cookies.get('loginSuccess'))
         }
         this.state = ({
            getChatList : [],
            supportReqList : []
        })           

        const { match: { params } } = this.props;
        this.ticket = params.ticket
        this.onChange = this.onChange.bind(this);
        this.sendRequestForm = this.sendRequestForm.bind(this);
    }

    componentDidMount() {
        this.getChatListAPI()
    }

    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })     
    }       

    async getChatListAPI() {
        axios.post(`${config.apiUrl}/getChatList`, { 'ticket': this.ticket }, { headers }).then(response => {
            if (response.data.success === true) {
                this.setState({
                    getChatList: response.data.response
                })
            }
            else if (response.data.success === false) {
                this.setState({
                    getChatList: []
                })
            }            
        })
        .catch(err => {
            this.setState({
                getChatList: []
            })
        })
    }    

    //======================================  Send Request API Start  ======================        

    async sendRequestForm(e) {
        e.preventDefault()
        this.setState(this.state)
        const data = this.state        
        data.token = this.ticket
        data.from_id = this.loginData.data.id

        axios.post(`${config.apiUrl}/supportChatMsg`, data, { headers })
            .then(response => {

                if (response.data.success === true) {
                    toast.success(response.data.msg, {
                        position: toast.POSITION.LEFT_CENTER
                    });

					setTimeout(() => {
						window.location.reload()
					}, 2000);                    
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

        return (
            <>
            <ToastContainer />
            <HeaderPage />

            <section class="create-offer-section mt-12 mb-12">
                <div class="container ">
                    <div class="row" id="faqdiv">
                        <div class="col-md-12 white_box">
                            <h1 style={{paddingBottom: "20px"}}>Support Chat:</h1>       
                            <div class="col-sm-12">
                                <form onSubmit={this.sendRequestForm}> 
                                    <fieldset>
                                
                                    <div>
                                        <div id="div_id_msg" class="form-group">
                                            <label for="id_msg" class="control-label">
                                            Message<span class="asteriskField requiredField">*</span> </label> 
                                            <div class="controls "> 
                                                <textarea required="" onChange={this.onChange} class="widetextarea form-control form-control" cols="40" id="id_msg" name="message" placeholder="Enter your message here..." rows="9"></textarea> 
                                            </div>
                                        </div>
                                
                                    </div>
                                    <div class="form-group">
                                        <div class="controls "> 
                                        {!this.state.message ?
                                            <input name="btnSubmit" disabled value="Send" class="btn btn-primary button" id="submit-id-submit" type="submit" />
                                        :
                                            <input name="btnSubmit" value="Send" class="btn btn-primary button" id="submit-id-submit" type="submit" />
                                        } 
                                        </div>
                                    </div>
                                    </fieldset>
                                </form>
                            </div>
                        </div>
                    </div>

                    <div class="row" id="faqdiv">
                        <div class="col-md-12 white_box">       
                            <div class="col-sm-12">
                                <fieldset>
                                    {this.state.getChatList.map(item => (
                                        <div class="well">
                                            <div class="panel-heading">
                                                <h4 class="panel-title pull-left"><span>From : </span> <strong>{item.fromuser}
                                                </strong>&nbsp; <span>To : </span> 
                                                <strong>{item.touser}</strong></h4>
                                                <h4 class="panel-title pull-right">{item.start_date}</h4><br/>
                                            </div>
                                            <div class="form-control">
                                                <p class="">{item.message}</p>
                                            </div>
                                        </div>
                                    ))}
                                
                                </fieldset>
                            </div>
                        </div>
                    </div>

                </div>
            </section>

            

            <Footer />
            </>
            )
        }
    }