import React, { Component, Fragment, Redirect } from 'react';
import config from '../config/config'
import HeaderPage from '../Includes/DashboardHeader'
import Footer from '../Includes/Footer'
import axios from 'axios';
import Cookies from 'js-cookie';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReactDatatable from '@ashvin27/react-datatable';
import { Link } from 'react-router-dom'

const headers = {
    'Content-Type': 'application/json'
}

export default class Support extends Component {
  
    constructor(props) {
        super(props)
        if(Cookies.get('loginSuccess')){
            this.loginData = JSON.parse(Cookies.get('loginSuccess'))
         }
         this.state = ({
            getCategoryList : [],
            supportReqList : []
        })           

        this.onChange = this.onChange.bind(this);
        this.sendRequestForm = this.sendRequestForm.bind(this);
        this.imageChangeFunction = this.imageChangeFunction.bind(this);

        this.columns = [
            {
                key: "token",
                text: "Token",
                sortable: true,
                cell: record => { 
                    return (
                        <Fragment>
                            <span onClick={() => this.viewChat(record.token)}>{record.token}</span>
                        </Fragment>
                    );
                }                
            },
            {
                key: "category_name",
                text: "Category",
                sortable: true
            },
            {
                key: "subject",
                text: "Subject",
                sortable: true
            },
            {
                key: "description",
                text: "Description",
                sortable: true
            },
            {
                key: "request_date",
                text: "Created Date",
                sortable: true
            },                                   
            
        ];

        this.config = {
            page_size: 10,
            length_menu: [10, 20, 50],
            show_filter: true,
            show_pagination: true,
            pagination: 'advance',
            button: {
                excel: false,
                print: false
            }
        }        

    }

    viewChat(token) {
        window.location.href = `${config.baseUrl}supportChat/`+token
    }    

    componentDidMount() {
        this.getCategoryListAPI()
        this.getSupportRequestList()
    }

    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })     
    }    

    imageChangeFunction(event) {
        this.setState({
          [event.target.name+"_preview"]: URL.createObjectURL(event.target.files[0]),
          [event.target.name] : event.target.files[0]
        })
    }    

    //======================================  Category List API Start  ====================== 

    async getCategoryListAPI() {
        axios.get(`${config.apiUrl}/getSupportCategory`, { headers }).then(response => {
            if (response.data.success === true) {
                this.setState({
                    getCategoryList: response.data.response
                })
            }
            else if (response.data.success === false) {
                this.setState({
                    getCategoryList: []
                })
            }            
        })
        .catch(err => {
            this.setState({
                getCategoryList: []
            })
        })
    }    

    //======================================  Send Request API Start  ======================        

    async sendRequestForm(e) {
        e.preventDefault()
        let formData = new FormData();
        formData.append('category_id', this.state.category_id);
        formData.append('subject', this.state.subject);
        formData.append('message', this.state.message);
        formData.append('attachment', this.state.attachment);
        formData.append('user_id', this.loginData.data.id);
        console.log(formData);
        axios.post(`${config.apiUrl}/supportRequest`, formData, { headers })
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

    //======================================  get request List API Start  ====================== 

    async getSupportRequestList() {
        axios.post(`${config.apiUrl}/getSupportRequestList`, { 'user_id': this.loginData.data.id }, { headers }).then(response => {
            if (response.data.success === true) {
                this.setState({
                    supportReqList:response.data.response
                })
            }
            else if (response.data.success === false) {
                this.setState({
                    supportReqList: []
                })
            }
        })
        .catch(err => {
            this.setState({
                supportReqList: []
            })
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
                        <h1 style={{paddingBottom: "20px"}}>Support:
                        </h1>
                        <div class="alert alert-info" role="alert">
                            Current support ticket reply delays are approximately 10-12 days, please do not open multiple tickets it will only increase your waiting time. We're very sorry for the issues and we're working hard to resolve them.               
                        </div>
                        <hr />
                        {/* <div class="more_info">
                            <h4>Please include with your report:</h4>
                            <ul>
                                <li>The EsqroCrypto username of the user you are reporting</li>
                                <li>Explain in detail your reason for the report</li>
                            </ul>
                        </div> */}
                        <div class="col-sm-12">
                            <form onSubmit={this.sendRequestForm}> 
                                <fieldset>
                                <legend>Write a request</legend>
                                <div id="div_id_extra-Username" class="form-group">
                                    <label for="id_extra-Username" class="control-label">
                                    Category<span class="asteriskField requiredField">*</span> 
                                    </label> 
                                    <div class="controls">
                                        <select onChange={this.onChange} name="category_id" class="textinput textInput form-control">
                                            <option value="">Select Category</option>
                                            {this.state.getCategoryList.map(item => (
                                                <option value={item.id}>{item.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <div class="form-group" id="sub_cat">
                                </div>
                                <div id="div_id_extra-Subject" class="form-group">
                                    <label for="id_extra-Subject" class="control-label">
                                    Subject<span class="asteriskField requiredField">*</span> 
                                    </label> 
                                    <div class="controls ">
                                        <input required="" onChange={this.onChange} placeholder="Enter Subject" class="textinput textInput form-control" id="id_extra-Subject" maxlength="140" name="subject" type="text" /> 
                                    </div>
                                </div>
                                <div>
                                    <div id="div_id_msg" class="form-group">
                                        <label for="id_msg" class="control-label">
                                        Message<span class="asteriskField requiredField">*</span> </label> 
                                        <div class="controls "> 
                                            <textarea required="" onChange={this.onChange} class="widetextarea form-control form-control" cols="40" id="id_msg" name="message" placeholder="Enter your message here..." rows="9"></textarea> 
                                        </div>
                                    </div>
                                    <div id="div_id_document" class="form-group">
                                        <label for="id_document" class="control-label ">
                                        Attachment</label> 
                                        <div class="controls">
                                            <input class="clearablefileinput" onChange={this.imageChangeFunction} id="id_document" name="attachment" type="file" /> 
                                        </div>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <div class="controls "> 
                                    {!this.state.category_id || !this.state.subject || !this.state.message ?
                                        <input name="btnSubmit" disabled value="Send request" class="btn btn-primary button" id="submit-id-submit" type="submit" />
                                    :
                                        <input name="btnSubmit" value="Send request" class="btn btn-primary button" id="submit-id-submit" type="submit" />
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
                        <h1 style={{paddingBottom: "20px"}}>Support List:
                        </h1>
                        <div class="col-sm-12">

                        <ReactDatatable
                            config={this.config}
                            records={this.state.supportReqList}
                            columns={this.columns}
                            onSort={this.onSort} />                        
                        
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