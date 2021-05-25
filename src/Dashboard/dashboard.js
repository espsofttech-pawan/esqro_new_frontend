import React, { Component, Fragment } from 'react';
// import '../css/css/style_new.css'   
import config from '../config/config'
import HeaderPage from '../Includes/DashboardHeader'
import Footer from '../Includes/Footer'
import axios from 'axios';
import Cookies from 'js-cookie';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom'
import ReactDatatable from '@ashvin27/react-datatable';

const headers = {
    'Content-Type': 'application/json'
}


const initialState = {
    old_password: '',
    new_password: '',
    confirm_password: '',
    passwordLength: '',
    user_id: '',
    termsOfTrade:'',
    qrCode : ''
}

export default class Dashboard extends Component {

    constructor(props) {
        super(props)
        if(Cookies.get('loginSuccess')){
            this.loginData = JSON.parse(Cookies.get('loginSuccess'))
         }
         this.state = ({
            getcountryList : [],
            initialState : [],
            personalInformation: [],
            myOffersList:[],
            getTradeRequestList:[],
            getOngoingTradeRequestList : [],
            getCompletedTradeRequestList : [],
            getCancelledTradeRequestList : []
        })           

        this.onChange = this.onChange.bind(this);
        this.UpdatePasswordForm = this.UpdatePasswordForm.bind(this);
        this.profileFormSubmit = this.profileFormSubmit.bind(this);
        this.accountDetailsSubmit = this.accountDetailsSubmit.bind(this);
        this.imageChangeFunction = this.imageChangeFunction.bind(this);
        this.UpdateUserSettings = this.UpdateUserSettings.bind(this);
        this.googleAuth = this.googleAuth.bind(this);
        this.onChange= this.handleTwoWay.bind(this)


        // >>>>>>>>>>>>>>>>>>>>>>>>    Offer List Datatable >>>>>>>>>>>>>>>>>>>>>>

        this.columns = [
            {
                key: "tradeType",
                text: "Trade type",
                sortable: true
            },
            {
                key: "coin_quantity",
                text: "Coin Quantity",
                sortable: true
            },
            {
                key: "offer_expiration",
                text: "Expiration",
                sortable: true
            },
            {
                key: "purchase_price",
                text: "Purchase Price",
                sortable: true
            }, 
            {
                key: "tradeLimit",
                text: "Limit",
                sortable: true
            },
            {
                key: "action",
                text: "Terms Of Trade",
                sortable: false,
                cell: record => { 
                    return (
                        <Fragment>
                            <p style={{ color: "#fff", textAlign: "center" }} onClick={this.termsOfTradeFun.bind(this,record.terms_of_trade)}>
                            <i className="fa fa-eye" data-toggle="modal" data-target={`#termsTrade`} aria-hidden="true"></i> </p>
                        </Fragment>
                    );
                }
            },
            {
                key: "offer_expiration",
                text: "Offer Expiration",
                sortable: true
            },
            {
                key: "created_date",
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

        // >>>>>>>>>>>>>>>>>>>>>>>>  My Trades List Datatable >>>>>>>>>>>>>>>>>>>>>>

        this.columnsForAllTrade = [
            {
                key: "tradeType",
                text: "Trade type",
                sortable: true
            },
            {
                key: "buyername",
                text: "Buyer",
                sortable: true
            },
            {
                key: "sellername",
                text: "Seller",
                sortable: true
            },
            {
                key: "token_amount",
                text: "Qoin",
                sortable: true
            }, 
            {
                key: "currency_amount",
                text: "AUD Amount",
                sortable: true
            },
            {
                key: "tradeStatus",
                text: "Status",
                sortable: true
            },            
            {
                key: "action",
                text: "View",
                sortable: false,
                cell: record => { 
                    return (
                        <Fragment>
                            <a href={`${config.baseUrl}trade_process/`+record.id} className="btn  btn-green megabutton">
                                View
                            </a>
                        </Fragment>
                    );
                }
            }                                              
            
        ];

        this.configForAllTrade = {
            page_size: 5,
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

    componentDidMount() {
        this.personalInformationAPI()
        this.getcountryList()
        this.bankDetailsInformationAPI()
        this.getMyoffersAPI()
        this.getTradeRequestList()
        this.getOngoingTradeRequestListAPI()
        this.getCompletedTradeRequestAPI()
        this.getCancelledTradeRequestAPI()
    }

    onChange(e) {
        
        this.setState({
            [e.target.name]: e.target.value
        })

        this.setState(prevState => ({
            list: { ...prevState.list, [e.target.name]: e.target.value }
        }))

        this.setState(prevState => ({
            bankDetails: { ...prevState.bankDetails, [e.target.name]: e.target.value }
        }))

        if (e.target.name === 'new_password') {
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

        if(e.target.name =='activities_log'){
            if(e.target.value==1){
            this.setState({
                activities_log:0
            })
            }else{
                this.setState({
                    activities_log:1
                })
            }
        }

        if(e.target.name =='password_change_email_status'){
            if(e.target.value==1){
            this.setState({
                password_change_email_status:0
            })
            }else{
                this.setState({
                    password_change_email_status:1
                })
            }
        }
        
        if(e.target.name =='latest_news'){
            if(e.target.value==1){
            this.setState({
                latest_news:0
            })
            }else{
                this.setState({
                    latest_news:1
                })
            }
        }
        
        if(e.target.name =='unusual_activity'){
            if(e.target.value==1){
            this.setState({
                unusual_activity:0
            })
            }else{
                this.setState({
                    unusual_activity:1
                })
            }
        }  
        
        // if(e.target.name =='is_enable_google_auth_code'){
        //     alert(e.target.value)
        //     if(e.target.value==1){
        //     this.setState({
        //         unusual_activity:0
        //     })
        //     }else{
        //         this.setState({
        //             unusual_activity:1
        //         })
        //     }
        // }  
                
    }

    imageChangeFunction(event) {
        this.setState({
          [event.target.name+"_preview"]: URL.createObjectURL(event.target.files[0]),
          [event.target.name] : event.target.files[0]
        })
    }    

    handleTwoWay = event => {
        event.preventDefault()
        if (event.target.checked === true && event.target.type === 'checkbox') {
            event.target.value = '1'
        }
        else if (event.target.checked === false && event.target.type === 'checkbox') {
            event.target.value = '0'
        }
        let value = event.target.value;  
        this.setState(prevState => ({
            list: { ...prevState.list, [event.target.name]: value }
        }))
        
    }
    
    //======================================  Change Password API Start  ======================        

    async UpdatePasswordForm(e) {
        e.preventDefault()
        this.setState(initialState)
        const data = this.state
        data.user_id = this.loginData.data.id
        delete this.state.confirmPasswordCheck
        delete this.state.passwordLength
        axios.post(`${config.apiUrl}/change_password`, data, { headers })
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

    //====================================== Get & Update Account details API Start  ======================        

    async bankDetailsInformationAPI() {
        axios.post(`${config.apiUrl}/getAccoutDetails`, { 'user_id': this.loginData.data.id }, { headers }).then(response => {
            if (response.data.success === true) {
                this.setState({
                    bankDetails:response.data.response
                })
                console.log(this);
            }
            else if (response.data.success === false) {
                this.setState({
                    bankDetails: ''
                })
            }            
        })
        .catch(err => {
            this.setState({
                bankDetails: ''
            })
        })
    } 

    async accountDetailsSubmit(e) {
        e.preventDefault()
        console.log(this.state.bankDetails);
        let formData = new FormData();
        formData.append('card_holder_name', this.state.bankDetails?.card_holder_name);
        formData.append('branch_name', this.state.bankDetails?.branch_name);        
        formData.append('account_number', this.state.bankDetails?.account_number);
        formData.append('ifsc', this.state.bankDetails?.ifsc);
        formData.append('user_id', this.loginData.data.id);
        axios.post(`${config.apiUrl}/saveAccountDetails`, formData, { headers })
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

    //======================================  Update Settings API Start  ======================    

    async UpdateUserSettings(e) {
        e.preventDefault()
        const data = {
            'activities_log' : this.state.activities_log,
            'password_change_email_status' : this.state.password_change_email_status,
            'latest_news' : this.state.latest_news,
            'unusual_activity' : this.state.unusual_activity
        }
        
        data.user_id = this.loginData.data.id
        console.log(data);
        axios.post(`${config.apiUrl}/updateSettings`, data, { headers })
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

    //======================================  Update Profile API Start  ======================        

    async profileFormSubmit(e) {
        e.preventDefault()
        let formData = new FormData();
        formData.append('first_name', this.state.list?.first_name);
        formData.append('last_name', this.state.list?.last_name);
        formData.append('dob', this.state.list?.dob);
        formData.append('mobile', this.state.list?.mobile);
        formData.append('country', this.state.list?.country_id);
        formData.append('user_id', this.loginData.data.id);
        formData.append('profile_pic', this.state.profile);
        console.log(formData);
        axios.post(`${config.apiUrl}/update_profile`, formData, { headers })
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

    //======================================  Get Profile API Start  ====================== 

    async personalInformationAPI() {
        axios.post(`${config.apiUrl}/getProfile`, { 'user_id': this.loginData.data.id }, { headers }).then(response => {
            if (response.data.success === true) {
                this.setState({
                    list:response.data.response
                })
                this.setState({
                    activities_log:this.state.list.activities_log,
                    unusual_activity:this.state.list.unusual_activity,
                    latest_news:this.state.list.latest_news,
                    password_change_email_status:this.state.list.password_change_email_status
                })
            }
            else if (response.data.success === false) {
                this.setState({
                    personalInformation: []
                })
            }            
        })
        .catch(err => {
            this.setState({
                personalInformation: []
            })
        })
    }      

    //======================================  Get My Offers API Start  ====================== 

    async getMyoffersAPI(){
        axios.post(`${config.apiUrl}/getMyOffers`, { user_id : this.loginData.data.id }, { headers }). then(response => {
            if(response.data.success === true){
                this.setState({
                    myOffersList: response.data.response
                })
            }else if(response.data.success === false){
                this.setState({
                    myOffersList:[]
                })
            }
        })
        .catch(err => {
            this.setState({
                myOffersList:[]
            })
        })
    }

    //======================================  Country List API Start  ====================== 

    async getcountryList() {
        axios.get(`${config.apiUrl}/getcountryList`, { headers }).then(response => {
            if (response.data.success === true) {
                this.setState({
                    getcountryList: response.data.response
                })
            }
            else if (response.data.success === false) {
                this.setState({
                    getcountryList: []
                })
            }            
        })
        .catch(err => {
            this.setState({
                getcountryList: []
            })
        })
    }   

    //======================================  Trade Request list API Start  ====================== 

    async getTradeRequestList() {
        axios.post(`${config.apiUrl}/getTradeRequestList`, { 'user_id': this.loginData.data.id }, { headers }).then(response => {
            if (response.data.success === true) {
                this.setState({
                    getTradeRequestList: response.data.response
                })
            }
            else if (response.data.success === false) {
                this.setState({
                    getTradeRequestList: []
                })
            }            
        })
        .catch(err => {
            this.setState({
                getTradeRequestList: []
            })
        })
    } 

    async getOngoingTradeRequestListAPI() {
        axios.post(`${config.apiUrl}/getOngoingTradeRequestList`, { 'user_id': this.loginData.data.id }, { headers }).then(response => {
            if (response.data.success === true) {
                this.setState({
                    getOngoingTradeRequestList: response.data.response
                })
            }
            else if (response.data.success === false) {
                this.setState({
                    getOngoingTradeRequestList: []
                })
            }            
        })
        .catch(err => {
            this.setState({
                getOngoingTradeRequestList: []
            })
        })
    }     

    async getCompletedTradeRequestAPI() {
        axios.post(`${config.apiUrl}/getCompletedTradeRequest`, { 'user_id': this.loginData.data.id }, { headers }).then(response => {
            if (response.data.success === true) {
                this.setState({
                    getCompletedTradeRequestList: response.data.response
                })
            }
            else if (response.data.success === false) {
                this.setState({
                    getCompletedTradeRequestList: []
                })
            }            
        })
        .catch(err => {
            this.setState({
                getCompletedTradeRequestList: []
            })
        })
    }
    
    async getCancelledTradeRequestAPI() {
        axios.post(`${config.apiUrl}/getCancelledTradeRequestList`, { 'user_id': this.loginData.data.id }, { headers }).then(response => {
            if (response.data.success === true) {
                this.setState({
                    getCancelledTradeRequestList: response.data.response
                })
            }
            else if (response.data.success === false) {
                this.setState({
                    getCancelledTradeRequestList: []
                })
            }            
        })
        .catch(err => {
            this.setState({
                getCancelledTradeRequestList: []
            })
        })
    }    

    termsOfTradeFun(terms_of_trade)
    {
        this.setState({
            termsOfTrade:terms_of_trade
        })
    }

    // >>>>>>>>>>>>>>>>>>>>   Google Auth Code >>>>>>>>>>>>>>>>>>>>

    async googleAuth(e) {
        e.preventDefault()

        axios.post(`${config.apiUrl}/googleAuthCode`, { 'user_id' : this.loginData.data.id, 'qrCode' : this.state.list?.qrCode, 'is_enable_google_auth_code' : this.state.list?.is_enable_google_auth_code  }, { headers })
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

        if (this.state.new_password != this.state.confirm_password) {
            this.state.confirmPasswordCheck = '1'
        } else {
            this.state.confirmPasswordCheck = '0'
        }

        
        return (
            <>
                <ToastContainer />
                <HeaderPage />
                <section className="mt-5 pt-5 bg-shadow">
                    <div className="container mt-4">
                        <div className="row">
                            <div className="col-sm-8">
                                <ul className="nav nav-tabs nav-tabs-line mb-0 btm-line-none" role="tablist">
                                    <li className="nav-item"><a className="nav-link active show" data-toggle="tab" href="#personal-data"><em className="fa fa-dashboard"></em>&nbsp;Dashboard</a></li>
                                    <li className="nav-item"><a className="nav-link" data-toggle="tab" href="#settings">Offers</a>
                                    </li>
                                    <li className="nav-item"><a className="nav-link" data-toggle="tab" href="#password">Profile</a>
                                    </li>
                                </ul>
                            </div>
                            <div className="col-sm-4 ">
                                <ul className="navbar-btns pull-right">
                                    <li><a href={`${config.baseUrl}kyc`} className="btn btn-sm btn-outline btn-light text-white"><em className="text-white fa fa-file"></em><span>KYC Application</span></a></li>
                                    <li className="d-none"><span className="badge badge-outline badge-success badge-lg"><em className="text-success ti ti-files mgr-1x"></em><span className="text-success">KYC Approved</span></span></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>
                <div className="page-content dashboard">
                    <div id="particles-js2"></div>
                    <div className="container pt-5">
                        <div className="tab-content" id="profile-details">
                            <div className="tab-pane fade show active" id="personal-data">
                                <div className="row">
                                    <div className="col-sm-12">
                                        <div className="row">
                                            <div className="col-sm-3  text-center">
                                                <div className="balance-card profile_img  bg-shadow" id="profile-img-id">
                                                        {this.state.list?.profile_pic?
                                                            <img width="120px" src={`${config.imageUrl}`+this.state.list?.profile_pic}/>: <img src="images/profile.png" width="120px" /> 
                                                        }
                                                    <h2>{!this.state.list?.username?'':this.state.list?.username}</h2>
                                                    <h4>{!this.state.list?.email?'':this.state.list?.email}</h4>
                                                </div>
                                            </div>
                                            <div className="col-sm-9 mobile-device">
                                                <div className="balance-card profile_img bg-shadow pt-1 pb-1">
                                                    <div className="right-section ">
                                                        <div className="row">
                                                            <div className="col-12 col-md-6">
                                                                <a href="#" className="mansa-img">
                                                                    <img className="mansa_gold" src="images/Esqro-Logo-B-1.png" style={{ left: "84px", position: "absolute", top: "35px" }} />
                                                                </a>
                                                            </div>
                                                            <div className="col-6 col-md-3 mt-5 mt-mobile">
                                                                <h6 className="pt-5">2FA Authentication</h6>
                                                                <a data-toggle="tab" href="#password" className="btn  btn-enable">Enable/Disable</a>
                                                            </div>
                                                            <div className="col-6 col-md-3 mt-5 mt-mobile">
                                                                <h6 className="pt-5">Profile</h6>
                                                                <a data-toggle="tab" href="#password" className="btn  btn-backup nav-link ">View &amp; Update Profile</a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-3">
                                        <div className="card mytabs bg-shadow">
                                            <ul className="nav nav-tabs" role="tablist">
                                                <li className="nav-item"><a className="nav-link active show" data-toggle="tab" href="#tab-item-1">My Trades</a></li>
                                                <li className="nav-item"><a className="nav-link" data-toggle="tab" href="#tab-item-2">Ongoing trades</a></li>
                                                <li className="nav-item"><a className="nav-link  " data-toggle="tab" href="#tab-item-3">Completed trades</a></li>
                                                <li className="nav-item"><a className="nav-link " data-toggle="tab" href="#tab-item-4">Cancelled trades</a></li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="col-lg-9">
                                        <div className="token-transaction card card-full-height bg-shadow">
                                            <div className="tab-content">
                                                <div className="tab-pane fade active show" id="tab-item-1">
                                                    <div className="contact-table-overflow table-responsive">

                                                    <ReactDatatable
                                                        config={this.configForAllTrade}
                                                        records={this.state.getTradeRequestList}
                                                        columns={this.columnsForAllTrade}
                                                        onSort={this.onSort} />

                                                    </div>
                                                </div>

                                                <div className="tab-pane fade " id="tab-item-2">
                                                    <div className="contact-table-overflow">
                                                    
                                                    <ReactDatatable
                                                        config={this.configForAllTrade}
                                                        records={this.state.getOngoingTradeRequestList}
                                                        columns={this.columnsForAllTrade}
                                                        onSort={this.onSort} />

                                                    </div>
                                                </div>

                                                <div className="tab-pane fade " id="tab-item-3">
                                                    <div className="contact-table-overflow">
                                                  
                                                    <ReactDatatable
                                                        config={this.configForAllTrade}
                                                        records={this.state.getCompletedTradeRequestList}
                                                        columns={this.columnsForAllTrade}
                                                        onSort={this.onSort} />
                                                    </div>
                                                </div>

                                                <div className="tab-pane fade " id="tab-item-4">
                                                    <div className="contact-table-overflow">
                                                    
                                                    <ReactDatatable
                                                        config={this.configForAllTrade}
                                                        records={this.state.getCancelledTradeRequestList}
                                                        columns={this.columnsForAllTrade}
                                                        onSort={this.onSort} />
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="tab-pane fade" id="settings">
                                <div className="container">
                                    <div className="card content-area bg-shadow">
                                        <div className="card-innr">
                                            <div className="card-head">
                                                <h4 className="card-title">My Offers List</h4>
                                            </div>
                                            <div className="contact-table-overflow table-responsive">
                                                
                                            <ReactDatatable
                                                config={this.config}
                                                records={this.state.myOffersList}
                                                columns={this.columns}
                                                onSort={this.onSort} />

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="modal" id={`termsTrade`} role="dialog">
                                <div className="modal-dialog">
                                    <div className="modal-content">
                                        <div className="modal-body" style={{whiteSpace:"break-spaces"}}>
                                        <div style={{color : "#000"}}>
                                           {this.state.termsOfTrade?
                                                this.state.termsOfTrade
                                                :
                                                'No Terms of trade found!'
                                            }
                                            </div>
                                        </div>
                                        <div className="modal-footer">
                                        <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="tab-pane fade" id="password">
                                <div className="page-content">
                                    <div className="container">
                                        <div className="row">
                                            <div className="main-content col-lg-8">
                                                <div className="content-area card bg-shadow">
                                                    <div className="card-innr">
                                                        <div className="card-head">
                                                            <h4 className="card-title">Profile Details</h4>
                                                        </div>
                                                        <ul className="nav nav-tabs nav-tabs-line" role="tablist">
                                                            <li className="nav-item"><a className="nav-link active" data-toggle="tab" href="#personal-data2">Personal Data</a></li>
                                                            <li className="nav-item"><a className="nav-link" data-toggle="tab" href="#settings2">Settings</a></li>
                                                            <li className="nav-item"><a className="nav-link" data-toggle="tab" href="#password2">Password</a></li>
                                                        </ul>
                                                        <div className="tab-content" id="profile-details">
                                                            <div className="tab-pane fade show active" id="personal-data2">
                                                            <form onSubmit={this.profileFormSubmit}> 
                                                                    <div className="row">
                                                                        <div className="col-md-6">
                                                                            <div className="input-item input-with-label"><label for="full-name" className="input-item-label">First Name</label>
                                                                                <input className="input-bordered" autoComplete="off" onChange={this.onChange} type="text" id="full-name" name="first_name" value={this.state.list?.first_name} /></div>
                                                                        </div>

                                                                        <div className="col-md-6">
                                                                            <div className="input-item input-with-label"><label for="full-name" className="input-item-label">Last Name</label>
                                                                                <input className="input-bordered" onChange={this.onChange} type="text" id="full-name" name="last_name" value={this.state.list?.last_name} /></div>
                                                                        </div>

                                                                        <div className="col-md-6">
                                                                            <div className="input-item input-with-label"><label for="email-address" className="input-item-label">Email Address</label><input className="input-bordered" type="text" id="email-address" name="email" value={this.state.list?.email} /></div>
                                                                        </div>
                                                                        <div className="col-md-6">
                                                                            <div className="input-item input-with-label"><label for="mobile-number" className="input-item-label">Mobile Number</label>
                                                                            <input className="input-bordered" onChange={this.onChange} type="number" id="mobile-number" value={this.state.list?.mobile} name="mobile" /></div>
                                                                        </div>
                                                                        <div className="col-md-6">
                                                                            <div className="input-item input-with-label"><label for="date-of-birth" className="input-item-label">Date of Birth</label><input className="input-bordered" value={this.state.list?.dob} type="date" onChange={this.onChange} id="date-of-birth" name="dob" /></div>
                                                                        </div>
                                                                        <div className="col-md-6">
                                                                            <div className="input-item input-with-label">
                                                                                <label for="nationality" className="input-item-label">Nationality</label>
                                                                                <select onChange={this.onChange} value={this.state.list?.country_id} className="select-bordered select-block" name="country_id" id="nationality">
                                                                                {this.state.getcountryList.map(item => (
                                                                                    <>
                                                                                        <option value={item.id}>{item.name}</option>
                                                                                    </>
                                                                                ))}
                                                                                </select>
                                                                            </div>
                                                                        </div>                                                               
                                                                        <div className="col-md-6">
                                                                            <div className="input-item input-with-label"><label for="date-of-birth" className="input-item-label">Profile</label>
                                                                            <input className="input-bordered" type="file" onChange={this.imageChangeFunction} name="profile" accept="image/*" />
                                                                                {this.state.list?.profile_pic?
                                                                                <img width="120px" src={`${config.imageUrl}`+this.state.list?.profile_pic}/>: <img src="images/profile.png" width="120px"  /> 
                                                                                }
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="gaps-1x"></div>
                                                                    <div className="d-sm-flex justify-content-between align-items-center">
                                                                        <button className="btn ">Update</button>
                                                                        <div className="gaps-2x d-sm-none"></div>
                                                                        {/* <span className="text-success"><em className="ti ti-check-box"></em> All Changes are saved</span> */}
                                                                    </div>
                                                                </form>
                                                            </div>
                                                            <div className="tab-pane fade " id="settings2">
                                                            <form onSubmit={this.UpdateUserSettings}>
                                                                <div className="pdb-1-5x">
                                                                    <h5 className="card-title card-title-sm text-dark">Security Settings</h5>
                                                                </div>
                                                                <div className="input-item">
                                                                    
                                                                    <input type="checkbox" defaultChecked={(this.state?.password_change_email_status)}   name="activities_log" onChange={this.onChange} className="input-switch input-switch-sm" value={this.state?.activities_log} id="save-log" />

                                                                    <label for="save-log">Save my Activities Log</label>
                                                                </div>
                                                                <div className="input-item">
                                                                    <input type="checkbox" defaultChecked={!this.state?.password_change_email_status} name="password_change_email_status" value={this.state?.password_change_email_status} onChange={this.onChange} className="input-switch input-switch-sm" id="pass-change-confirm" />
                                                                    <label for="pass-change-confirm">Confirm me through email before password change</label>
                                                                </div>
                                                                <div className="pdb-1-5x">
                                                                    <h5 className="card-title card-title-sm text-dark">Manage Notification</h5>
                                                                </div>
                                                                <div className="input-item">
                                                                    <input type="checkbox" defaultChecked={!this.state?.latest_news} name="latest_news" onChange={this.onChange} value={this.state?.latest_news} className="input-switch input-switch-sm" id="latest-news"  />
                                                                    <label for="latest-news">Notify me by email about sales and latest news</label>
                                                                </div>
                                                                <div className="input-item">
                                                                    <input type="checkbox" defaultChecked={!this.state?.unusual_activity} value={this.state?.unusual_activity} name="unusual_activity" onChange={this.onChange} className="input-switch input-switch-sm" id="activity-alert" />
                                                                    <label for="activity-alert">Alert me by email for unusual activity.</label>
                                                                </div>
                                                                <div className="gaps-1x"></div>
                                                                <div className="d-flex justify-content-between align-items-center">
                                                                    <span className="text-success">
                                                                        <em className="ti ti-check-box"></em>
                                                                        <button className="btn ">Update</button>
                                                                    </span>
                                                                </div>
                                                            </form>
                                                            </div>

                                                            <div className="tab-pane fade" id="password2">
                                                                <form onSubmit={this.UpdatePasswordForm}>
                                                                    <div className="row">
                                                                        <div className="col-md-6">
                                                                            <div className="input-item input-with-label"><label for="old-pass" className="input-item-label">Old Password</label>
                                                                                <input onChange={this.onChange} value={this.state.old_password} className="input-bordered" type="password" name="old_password" id="old-pass" />
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="row">
                                                                        <div className="col-md-6">
                                                                            <div className="input-item input-with-label"><label for="new-pass" className="input-item-label">New Password</label>
                                                                                <input onChange={this.onChange} value={this.state.new_password} className="input-bordered" type="password" id="new-pass" name="new_password" /></div>

                                                                            {this.state.passwordLength === '1' ? <p className="errorMessage">Password length should be greater than 6</p> : ''}
                                                                            {this.state.confirmPasswordCheck === '1' ? <p className="errorMessage">Password not match</p> : ''}

                                                                        </div>
                                                                        <div className="col-md-6">
                                                                            <div className="input-item input-with-label"><label for="confirm-pass" className="input-item-label">Confirm New Password</label>
                                                                                <input onChange={this.onChange} value={this.state.confirm_password} className="input-bordered" type="password" id="confirm-pass" name="confirm_password" /></div>
                                                                            {this.state.confirmPasswordCheck === '1' ? <p className="errorMessage">Password not match</p> : ''}
                                                                        </div>
                                                                    </div>
                                                                    <div className="note note-plane note-info pdb-1x">
                                                                        <em className="fas fa-info-circle"></em>
                                                                        <p>Password should be minmum 6 letter.</p>
                                                                    </div>
                                                                    <div className="gaps-1x"></div>
                                                                    <div className="d-sm-flex justify-content-between align-items-center">
                                                                        {!this.state.old_password || this.state.new_password?.length < 6 || this.state.confirm_password?.length < 6 || this.state.confirmPasswordCheck === '1' ?
                                                                            <button className="btn" disabled>Update Password</button>
                                                                            : <button className="btn ">Update Password</button>}
                                                                        <div className="gaps-2x d-sm-none"></div>
                                                                    </div>
                                                                </form>
                                                            </div>

                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="content-area card bg-shadow">
                                                    <div className="card-innr">
                                                        <div className="card-head">
                                                            <h4 className="card-title">Two-Factor Verification</h4>
                                                        </div>
                                                        <p>Two-factor authentication is a method for protection your web account. When it is activated you need to enter not only your password, but also a special code. You can receive this code by in mobile app. Even if third person will find your password, then can't access with that code.</p>

                                                        <img src={this.state.list?.qrCodeImage} />
                                                        <br /><br />
                                                        
                                                        <form onSubmit={this.googleAuth}>
                                                            <div className="col-md-1">
                                                                <div className="input-item input-with-label">
                                                                {this.state.list?.is_enable_google_auth_code === 1 ? 
                                                               
                                                               <input className="input-checkbox100" id="ckb1" value="1" checked type="checkbox" 
                                                                name="is_enable_google_auth_code" onChange={this.handleTwoWay}/>
                                                                :
                                                                <input className="input-checkbox100" id="ckb1" value="0"  type="checkbox"
                                                                name="is_enable_google_auth_code" onChange={this.handleTwoWay}/>
                                                                
                                                            }
       
                                                                </div>
                                                            </div>         

                                                            <div className="col-md-6">
                                                                <div className="input-item input-with-label"><label for="full-name" className="input-item-label">Enter Auth Code</label>
                                                                    <input className="input-bordered" autoComplete="off" onChange={this.onChange} type="number" name="qrCode" /></div>
                                                            </div> 

                                                            <div className="d-sm-flex justify-content-between align-items-center pdt-1-5x">
                                                                <span className="text-light ucap d-inline-flex align-items-center"><span className="mb-0"><small>Current Status:</small></span> <span className="badge badge-disabled ml-2">
                                                                {this.state.list?.is_enable_google_auth_code === 1 ? 'Enabled' : 'Disabled' }
                                                                    </span></span>
                                                                <div className="gaps-2x d-sm-none"></div>
                                                                <button type="submit" className="order-sm-first btn ">Enable 2FA</button>
                                                            </div>
                                                        </form>
                                                       
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="aside sidebar-right col-lg-4">
                                                <div className="account-info card bg-shadow">
                                                    <div className="card-innr">
                                                        <h6 className="card-title card-title-sm">Your Account Status</h6>
                                                        <ul className="btn-grp">
                                                            <li><a href="#" className="btn btn-auto btn-xs btn-success">Email Verified</a></li>
                                                            <li><a href="#" className="btn btn-auto btn-xs btn-warning">KYC Pending</a></li>
                                                        </ul>
                                                        <div className="gaps-2-5x"></div>
                                                        <h6 className="card-title card-title-sm">Receiving Wallet</h6>
                                                        <div className="d-flex justify-content-between"><span>
                                                            <span>{!this.state.list?.wallet_address_concatinate?'':this.state.list?.wallet_address_concatinate}</span>
                                                            {/* <em className="fas fa-info-circle text-exlight" data-toggle="tooltip" data-placement="bottom" title="" data-original-title="1 ETH = 100 TWZ"></em> */}
                                                            </span>
                                                            <li><Link className="link link-ucap" to={`${config.baseUrl}kyc_details`}>Edit</Link></li></div>
                                                    </div>
                                                </div>
                                                <div className="referral-info card bg-shadow">
                                                    <div className="card-innr">
                                                        <h6 className="card-title card-title-sm">Bank Account Detail</h6>
                                                        <form onSubmit={this.accountDetailsSubmit}> 
                                                            <div className="row">
                                                                <div className="col-md-12">
                                                                    <div className="input-item input-with-label"><label for="full-name" className="input-item-label">Cardholder Name</label><input className="input-bordered" type="text" id="full-name" value={this.state.bankDetails?.card_holder_name} name="card_holder_name" onChange={this.onChange}  /></div>
                                                                </div>
                                                                <div className="col-md-12">
                                                                    <div className="input-item input-with-label"><label for="email-address" className="input-item-label">Account No</label><input className="input-bordered" type="number" id="email-address" name="account_number" value={this.state.bankDetails?.account_number} onChange={this.onChange}  /></div>
                                                                </div>
                                                                <div className="col-md-12">
                                                                    <div className="input-item input-with-label"><label for="mobile-number" className="input-item-label">BSC</label><input className="input-bordered" type="text" id="mobile-number" value={this.state.bankDetails?.ifsc} name="ifsc" onChange={this.onChange}  /></div>
                                                                </div>
                                                                <div className="col-md-12">
                                                                    <div className="input-item input-with-label"><label for="branchname" className="input-item-label">Branch Name</label><input className="input-bordered date-picker-dob" type="text" id="branchname" value={this.state.bankDetails?.branch_name} name="branch_name" onChange={this.onChange}  /></div>
                                                                </div>

                                                            </div>
                                                            <div className="gaps-1x"></div>
                                                            <div className="d-sm-flex justify-content-between align-items-center">
                                                                <button className="btn btn-sm">Submit</button>
                                                            </div>
                                                        </form>

                                                    </div>
                                                </div>
                                                <div className="kyc-info card bg-shadow">
                                                    <div className="card-innr">
                                                        <h6 className="card-title card-title-sm">Identity Verification - KYC</h6>
                                                        <p>To comply with regulation, participant will have to go through indentity verification.</p>
                                                        <p className="lead text-light pdb-0-5x">You have not submitted your KYC application to verify your indentity.</p>
                                                        <a href={`${config.baseUrl}kyc_details`} className="btn  btn-block">Click to Proceed</a>
                                                        <h6 className="kyc-alert text-danger">* KYC verification required for purchase token</h6>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </>
        )
    }
}