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

export default class TradeProcess extends Component {

    constructor(props) {
        super(props)
    
        const { match: { params } } = this.props;
        this.id = params.id
    
        if(Cookies.get('loginSuccess')){
            this.loginData = JSON.parse(Cookies.get('loginSuccess'))
        }

        this.state = ({
            getRequestDetails : [],
            getAdminBankDetails : [],
            sellerBankDetails : []
        })

        this.onChange = this.onChange.bind(this);
        this.buyerWalletFormSubmit = this.buyerWalletFormSubmit.bind(this);
        this.buyerTransactionFormSubmit = this.buyerTransactionFormSubmit.bind(this);
        this.sellerBankDetailsFormSubmit = this.sellerBankDetailsFormSubmit.bind(this);
        this.submitSellerTransactionForm = this.submitSellerTransactionForm.bind(this);
    }    

    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }    

    componentDidMount() {
        this.getRequestDetailsAPI()
        this.getAdminBankDetailsAPI()
        this.getSellerBankDetailsAPI()
    }

    //======================================  Get offer request API Start  ====================== 

    async getRequestDetailsAPI() {
        axios.post(`${config.apiUrl}/getTradeRequestDetails`, { 'id': this.id }, { headers }).then(response => {
            if (response.data.success === true) {
                this.setState({
                    getRequestDetails:response.data.response
                })
            }
            else if (response.data.success === false) {
                this.setState({
                    getRequestDetails: []
                })
            }            
        })
        .catch(err => {
            this.setState({
                getRequestDetails: []
            })
        })
    }

    async getAdminBankDetailsAPI() {
        axios.post(`${config.apiUrl}/getAdminBankDetails`, { headers }).then(response => {
            if (response.data.success === true) {
                this.setState({
                    getAdminBankDetails:response.data.response
                })
            }
            else if (response.data.success === false) {
                this.setState({
                    getAdminBankDetails: []
                })
            }            
        })
        .catch(err => {
            this.setState({
                getAdminBankDetails: []
            })
        })
    }    

    async getSellerBankDetailsAPI() {
        axios.post(`${config.apiUrl}/getSellerBankDetails`, { 'id': this.id }, { headers }).then(response => {
            if (response.data.success === true) {
                this.setState({
                    sellerBankDetails:response.data.response
                })
            }
            else if (response.data.success === false) {
                this.setState({
                    sellerBankDetails: []
                })
            }            
        })
        .catch(err => {
            this.setState({
                sellerBankDetails: []
            })
        })
    }    

    // ***************  Buyer wallet form API start **************** //

    acceptTrade(status){
        axios.post(`${config.apiUrl}/acceptOrRejectTrade`, { 'id': this.id, 'status': status, 'trade_type': this.state.getRequestDetails.trade_type, 'user_id' : this.loginData.data.id }, { headers }).then(response => {
            if (response.data.success === true) {
                toast.success(response.data.msg, {
                    position: toast.POSITION.LEFT_CENTER
                });

                setTimeout(() => {
                    window.location.href = `${config.baseUrl}trade_process/`+this.id;
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

    async buyerWalletFormSubmit(e) {
        e.preventDefault()
        const data = this.state
        data.id = this.id
        console.log(data);
        axios.post(`${config.apiUrl}/buyerWalletSubmit`, data, { headers })
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

    async buyerTransactionFormSubmit(e) {
        e.preventDefault()
        const data = this.state
        data.id = this.id
        console.log(data);
        axios.post(`${config.apiUrl}/buyerTransaction`, data, { headers })
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

        async sellerBankDetailsFormSubmit(e) {
            e.preventDefault()
            const data = this.state
            data.id = this.id
            console.log(data);
            axios.post(`${config.apiUrl}/sellerBankDetails`, data, { headers })
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

        async submitSellerTransactionForm(e) {
            e.preventDefault()
            const data = this.state
            data.id = this.id
            console.log(data);
            axios.post(`${config.apiUrl}/sellerTransaction`, data, { headers })
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

        return (
            <>
            <ToastContainer />
            <HeaderPage />

            {this.state.getRequestDetails.buyer_id == this.loginData.data.id ?
            <section className="create-offer-section mt-9 mb-9">
                <div className="container">
                    <div className="col-sm-12">
                        <div className="row">
                            <div className="col-sm-6">
                            <h2>Buy Qoin</h2>
                            </div> 
                            <div className="col-sm-6 ">
                            <table className="pull-right">
                                <tr>
                                <th>Created time:</th>
                                <td> {this.state.getRequestDetails.datetime}</td>
                                </tr>
                                <tr>
                                {this.state.getRequestDetails.order_number?
                                <>
                                <th>Order Number:</th>
                                <td>{this.state.getRequestDetails.order_number}&nbsp;</td>
                                </>
                                : ""}
                                </tr>
                            </table>
                            </div>
                        </div>
                        <hr />
                        <div className="row">
                            <div className="col-sm-2">
                            <label>Amount</label>
                            <h3 className="text-success">{this.state.getRequestDetails.token_amount} Qoin</h3>
                            </div> 
                            <div className="col-sm-1 ">
                            <label>Price</label><br />
                            <span className="text-white">{this.state.getRequestDetails.currency_amount} AUD</span>
                            
                            </div>  
                            <div className="col-sm-2 ">
                            <label>Quantity</label><br />
                            <span className="text-white">{this.state.getRequestDetails.token_amount} Qoin</span>
                            
                            </div> 
                            <div className="col-sm-7">
                            
                            </div>             
                        </div>
                        <hr />
                    </div>

                    <div className="row">
                        <div className="col-sm-12">
                            <article>
                                <div className="row">
                                <div className="tsf-wizard tsf-wizard-3">
                                    <div className="tsf-nav-step">
                                        <ul className="gsi-step-indicator triangle gsi-style-1  gsi-transition ">
                                        <li className="current" data-target="step-1">
                                            <a href="#">
                                            <span className="number">1</span>
                                            <span className="desc">
                                            <label>Handshake</label>
                                            </span>
                                            </a>
                                        </li>

                                        <li data-target={this.state.getRequestDetails.status == 2?"step-1":'step-2'}>
                                            <a href="#">
                                            <span className="number">2</span>
                                            <span className="desc">
                                            <label>Wallet detail</label>
                                            </span>
                                            </a>
                                        </li>
                                        <li data-target={this.state.getRequestDetails.status == 2?"step-1":'step-3'}>
                                            <a href="#">
                                            <span className="number">
                                            3
                                            </span>
                                            <span className="desc">
                                            <label>Admin detail</label>
                                            </span>
                                            </a>
                                        </li>
                                        <li data-target={this.state.getRequestDetails.status == 2?"step-1":'step-4'}>
                                            <a href="#">
                                            <span className="number">
                                            4
                                            </span>
                                            <span className="desc">
                                            <label>Status</label>
                                            </span>
                                            </a>
                                        </li>
                                        </ul>
                                    </div>
                                    <div className="tsf-container">
                                        <div className="tsf-content">
                                        <div className="tsf-step step-1 active">
                                            <fieldset>
                                                <legend>Handshake</legend>
                                                <form className="tsf-step-content">
                                                <div className="row">
                                                 <div className="col-sm-4">
                                                 </div>

                                                    {this.state.getRequestDetails.status == 1? 
                                                    <h3>Trade Accepted!!</h3>
                                                    :
                                                    "" 
                                                    }
                                                    {this.state.getRequestDetails.status == 2?
                                                    <h3>Trade Rejected!!</h3>
                                                    :"" }

                                                    {!this.state.getRequestDetails.status && this.state.getRequestDetails.buyer_confirm == 0 ? 
                                                    <>
                                                    <div className="col-sm-2">
                                                        <button onClick={this.acceptTrade.bind(this, 1)} type="button" data-type="Accept" className="btn mt-3 btn-success btn-small btn-right tsf-wizard-btn" style={{padding: "5px 22px!important"}}>Accept</button>
                                                    </div>
                                                    <div className="col-sm-2">
                                                        <button onClick={this.acceptTrade.bind(this, 2)} type="button" data-type="Reject" className="btn mt-3 btn-danger btn-small btn-right tsf-wizard-btn" style={{padding: "5px 22px!important"}} >Reject </button>
                                                    </div>
                                                    <div className="col-sm-4">
                                                    </div>
                                                    <div className="col-lg-12 text-center pt-3">
                                                        <p >You have 24h for respond this offer</p>
                                                    </div>
                                                    </>
                                                    : ''}                                                 
                                                {!this.state.getRequestDetails.status && this.state.getRequestDetails.buyer_confirm == 1 ? 
                                                    <p style={{color: "red"}}>Please wait for 24h until seller accept your offer</p>
                                                    :''}

                                             </div>
                                                </form>
                                            </fieldset>
                                        </div>
                                        <div className=" tsf-step step-2 ">
                                            <fieldset>
                                                <legend>Provide wallet address for Qoin</legend>
                                                    <form onSubmit={this.buyerWalletFormSubmit}>
                                                        <div className="row">
                                                        <div className="col-sm-2">
                                                            <div className="form-group mt-3 ml-4">    
                                                                <label>Wallet Address</label>
                                                            </div>
                                                        </div>
                                                            <div className="col-sm-8">
                                                            <div className="form-group mt-3 ml-4">
                                                                <input type="text" className="form-control" placeholder="Provide wallet address for Qoin" name="wallet_address" onChange={this.onChange} value={this.state.getRequestDetails.buyer_wallet} required="" />
                                                            </div>
                                                            </div>
                                                            <div className="col-sm-2">
                                                            {!this.state.getRequestDetails.buyer_wallet?
                                                                <button type="submit" className="btn mt-3 btn-small" style={{padding: "5px 22px!important"}}>Submit</button>                                                            
                                                            : ''}
                                                            
                                                            </div>
                                                            <div className="col-sm-2">
                                                            
                                                            </div>
                                                        </div>
                                                    </form>
                                            </fieldset>
                                        </div>
                                        <div className=" tsf-step step-3 ">
                                            <fieldset>
                                                <legend>Please send {this.state.getRequestDetails.currency_amount} AUD to admin at below bank detail</legend>
                                                <form onSubmit={this.buyerTransactionFormSubmit}>
                                                <div className="row">
                                                    <div className="col-sm-3">
                                                        <div className="form-group mt-3 ml-4">
                                                        
                                                        <label>Account Holder Name</label>
                                                    </div>
                                                    </div>
                                                    <div className="col-sm-6">
                                                        <div className="form-group mt-3 ">
                                                        
                                                        <input type="text" className="form-control" id="example_username" value={this.state.getAdminBankDetails.account_holder_name} placeholder="" readOnly />
                                                    </div>
                                                    </div>
                                                    <div className="col-sm-3">
                                                    </div>
                                                    <div className="col-sm-3">
                                                        <div className="form-group mt-3 ml-4">
                                                        
                                                        <label>Account Number</label>
                                                    </div>
                                                    </div>
                                                    <div className="col-sm-6">
                                                        <div className="form-group  ">
                                                        <input type="text" className="form-control" value={this.state.getAdminBankDetails.account_number} readOnly />
                                                    </div>
                                                    </div>
                                                    <div className="col-sm-3">
                                                        
                                                    </div>
                                                    <div className="col-sm-3">
                                                        <div className="form-group  ml-4">
                                                        <label>BSC</label>
                                                    </div>
                                                    </div>
                                                    <div className="col-sm-6">
                                                        <div className="form-group ">
                                                            <input type="text" className="form-control" value={this.state.getAdminBankDetails.bsc} readOnly  />
                                                        </div>
                                                    </div>
                                                    <div className="col-sm-3"> </div>

                                                    <div className="col-sm-3">
                                                        <div className="form-group  ml-4">
                                                        <label>Provide transaction ID</label>
                                                        </div>
                                                    </div>
                                                    <div className="col-sm-6">
                                                        <div className="form-group ">
                                                            <input type="text" name="buyer_transaction_id" onChange={this.onChange} className="form-control" required placeholder="Please enter transaction id" value={this.state.getRequestDetails?.buyer_transaction_id} />
                                                        </div>
                                                    </div>
                                                    <div className="col-sm-3"> </div>

                                                    <div className="col-sm-3">
                                                        <div className="form-group  ml-4">
                                                        <label></label>
                                                        </div>
                                                    </div>
                                                    <div className="col-sm-6">
                                                        <div className="form-group ">
                                                            {!this.state.getRequestDetails?.buyer_transaction_id ?
                                                                <button type="submit" className="btn mt-3 btn-small" style={{padding: "5px 22px!important"}}>Submit</button>                 
                                                            : '' }
                                                        </div>
                                                    </div>
                                                    <div className="col-sm-3"> </div></div>

                                                </form>
                                            </fieldset>
                                        </div>
                                        <div className="tsf-step step-4">
                                            <fieldset>
                                                <legend>Status</legend>
                                                <form className="tsf-step-content">
                                                    <div className="row">
                                                    <div className="col-lg-4"></div>
                                                    <div className="col-lg-4">
                                                        <p>
                                                            {this.state.getRequestDetails.status == 4 ?  <h3>Trade Completed!!</h3> : '' }

                                                            {this.state.getRequestDetails.status == 3 ?  <h3>Trade Cancelled!!</h3> : '' }
                                                            
                                                            {this.state.getRequestDetails.status < 3 ?  <h3>Trade Pending!!</h3> : '' }                                           
                                                        </p>
                                                    </div>
                                                    </div>
                                                </form>
                                            </fieldset>
                                        </div>
                                        </div>
                                        <div className="tsf-controls " >
                                        <button type="button" data-type="prev" className="btn btn-left tsf-wizard-btn">
                                        <i className="fa fa-chevron-left"></i> PREV
                                        </button>
                                        <button type="button" data-type="next" className="btn btn-right tsf-wizard-btn">
                                        NEXT <i className="fa fa-chevron-right"></i>
                                        </button>
                                        <button type="button" data-type="finish" className="btn btn-right tsf-wizard-btn">
                                        FINISH
                                        </button>
                                        </div>
                                    </div>
                                </div>
                                <div className="clearfix"></div>
                                
                            </div>
                        </article>
                        </div>
                    </div>
                </div>
            </section>
             : 
             <section className="create-offer-section mt-9 mb-9">
             <div className="container">
                 <div className="col-sm-12">
                     <div className="row">
                             <div className="col-sm-6">
                             <h2>Sell Qoin</h2>
                             </div> 
                             <div className="col-sm-6 ">
                             <table className="pull-right">
                                 <tr>
                                 <th>Created time:</th>
                                 <td> {this.state.getRequestDetails.datetime}</td>
                                 </tr>
                                 <tr>
                                    {this.state.getRequestDetails.order_number?
                                    <>
                                    <th>Order Number:</th>
                                    <td>{this.state.getRequestDetails.order_number}&nbsp;</td>
                                    </>
                                    : ""}
                                    </tr>
                             </table>
                             </div>
                     </div>
                     <hr />
                     <div className="row">
                         <div className="col-sm-2">
                         <label>Amount</label>
                         <h3 className="text-success">{this.state.getRequestDetails.token_amount} Qoin</h3>
                         </div> 
                         <div className="col-sm-1 ">
                         <label>Price</label><br />
                         <span className="text-white">{this.state.getRequestDetails.currency_amount} AUD</span>
                         
                         </div>  
                         <div className="col-sm-2 ">
                         <label>Quantity</label><br />
                         <span className="text-white">{this.state.getRequestDetails.token_amount} Qoin</span>
                         
                         </div> 
                         <div className="col-sm-7">
                         
                         </div>             
                     </div>
                 <hr />
                 </div>
                 <div className="row">
                 <div className="col-sm-12">
                     <article>
                         <div className="row">
                             <div className="tsf-wizard tsf-wizard-3">
                             <div className="tsf-nav-step">
                                 <ul className="gsi-step-indicator triangle gsi-style-1  gsi-transition ">
                                     <li className="current" data-target="step-1">
                                         <a href="#">
                                         <span className="number">1</span>
                                         <span className="desc">
                                         <label>Handshake</label>
                                         </span>
                                         </a>
                                     </li>
                                     <li data-target={this.state.getRequestDetails.status == 2?"step-1":'step-2'}>
                                         <a href="#">
                                         <span className="number">2</span>
                                         <span className="desc">
                                             <label>Bank detail</label>
                                         </span>
                                         </a>
                                     </li>
                                     <li data-target={this.state.getRequestDetails.status == 2?"step-1":'step-3'}>
                                         <a href="#">
                                         <span className="number">
                                         3
                                         </span>
                                         <span className="desc">
                                             <label>Wallet detail</label>
                                         </span>
                                         </a>
                                     </li>
                                     <li data-target={this.state.getRequestDetails.status == 2?"step-1":'step-4'}>
                                         <a href="#">
                                         <span className="number">
                                         4
                                         </span>
                                         <span className="desc">
                                             <label>Status</label>
                                         </span>
                                         </a>
                                     </li>
                                 </ul>
                             </div>
                             <div className="tsf-container">
                                 <div className="tsf-content">
                                     <div className="tsf-step step-1 active">
                                         <fieldset>
                                         <legend>Handshake</legend>
                                         <form className="tsf-step-content">
                                             <div className="row">
                                                 <div className="col-sm-4">
                                                 </div>

                                                    {this.state.getRequestDetails.status == 1? 
                                                    <h3>Trade Accepted!!</h3>
                                                    :
                                                    "" 
                                                    }
                                                    {this.state.getRequestDetails.status == 2?
                                                    <h3>Trade Rejected!!</h3>
                                                    :"" }

                                                    {!this.state.getRequestDetails.status && this.state.getRequestDetails.seller_confirm == 0 ? 
                                                    <>
                                                    <div className="col-sm-2">
                                                        <button onClick={this.acceptTrade.bind(this, 1)} type="button" data-type="Accept" className="btn mt-3 btn-success btn-small btn-right tsf-wizard-btn" style={{padding: "5px 22px!important"}}>Accept</button>
                                                    </div>
                                                    <div className="col-sm-2">
                                                        <button onClick={this.acceptTrade.bind(this, 2)} type="button" data-type="Reject" className="btn mt-3 btn-danger btn-small btn-right tsf-wizard-btn" style={{padding: "5px 22px!important"}} >Reject </button>
                                                    </div>
                                                    <div className="col-sm-4">
                                                    </div>
                                                    <div className="col-lg-12 text-center pt-3">
                                                        <p >You have 24h for respond this offer</p>
                                                    </div>
                                                    </>
                                                    : ''
                                                    }   

                                                    {!this.state.getRequestDetails.status && this.state.getRequestDetails.seller_confirm == 1 ? 
                                                    <p style={{color: "red"}}>Please wait for 24h until buyer accept your offer</p>
                                                    :''}                                                                                                  
                                             </div>
                                         </form>
                                         </fieldset>
                                     </div>
                                     <div className=" tsf-step step-2 ">
                                         <fieldset>
                                         <legend>Provide your bank account detail</legend>
                                            <form onSubmit={this.sellerBankDetailsFormSubmit}>
                                                <div className="row">
                                                    <div className="col-sm-3">
                                                        <div className="form-group mt-3 ml-4">
                                                        <label>Account Holder Name</label>
                                                        </div>
                                                    </div>
                                                    <div className="col-sm-6">
                                                        <div className="form-group mt-3 ">
                                                        <input name="account_holder_name" onChange={this.onChange} type="text" value={this.state.sellerBankDetails?.account_holder_name } className="form-control" required="" />
                                                        </div>
                                                    </div>
                                                    <div className="col-sm-3">
                                                    </div>
                                                    <div className="col-sm-3">
                                                        <div className="form-group mt-3 ml-4">
                                                        <label>Account Number</label>
                                                        </div>
                                                    </div>
                                                    <div className="col-sm-6">
                                                        <div className="form-group  ">
                                                        <input type="text" onChange={this.onChange} className="form-control" value={this.state.sellerBankDetails?.account_number } name="account_number" required="" />
                                                        </div>
                                                    </div>
                                                    <div className="col-sm-3">
                                                    </div>
                                                    <div className="col-sm-3">
                                                        <div className="form-group  ml-4">
                                                        <label>BSC</label>
                                                        </div>
                                                    </div>
                                                    <div className="col-sm-6">
                                                        <div className="form-group ">
                                                        <input type="text" onChange={this.onChange} className="form-control" value={this.state.sellerBankDetails?.bsc } name="bsc" />
                                                        </div>
                                                    </div>
                                                    <div className="col-sm-3">
                                                    </div>

                                                    <div className="col-sm-3">
                                                        <div className="form-group  ml-4">
                                                        <label></label>
                                                        </div>
                                                    </div>
                                                    
                                                    <div className="col-sm-6">
                                                        <div className="form-group ">
                                                        {!this.state.sellerBankDetails?.account_holder_name ?
                                                            <button type="submit" className="btn mt-3 btn-small" style={{padding: "5px 22px!important"}}>Submit</button>
                                                            : '' }
                                                        </div>
                                                    </div>
                                                    <div className="col-sm-3">
                                                    </div>

                                                </div>
                                            </form>
                                            </fieldset>
                                     </div>
                                     
                                     
                                 <div className=" tsf-step step-3 ">
                                     <fieldset>
                                         <legend>Please send {this.state.getRequestDetails.token_amount} QOIN to admin at below address</legend>
                                         <form onSubmit={this.submitSellerTransactionForm} >
                                         <div className="row">
                                         <div className="col-sm-3">
                                            <div className="form-group  ml-4">
                                            <label>Admin Wallet</label>
                                            </div>
                                        </div>
                                        <div className="col-sm-6">
                                            <div className="form-group ">
                                            <input type="text" value={this.state.getAdminBankDetails.wallet_address} readOnly className="form-control" />
                                            </div>
                                        </div>
                                        <div className="col-sm-3">
                                        </div>

                                        <div className="col-sm-3">
                                            <div className="form-group  ml-4">
                                            <label>Provide Transaction ID</label>
                                            </div>
                                        </div>
                                        <div className="col-sm-6">
                                            <div className="form-group ">
                                            <input type="text" onChange={this.onChange} name="seller_transaction_id" value={this.state.getRequestDetails.seller_transaction_id} className="form-control" />
                                            </div>
                                        </div>
                                        <div className="col-sm-3">
                                        </div>

                                        <div className="col-sm-3">
                                            <div className="form-group  ml-4">
                                            <label></label>
                                            </div>
                                        </div>
                                        <div className="col-sm-6">
                                            <div className="form-group ">

                                            {!this.state.getRequestDetails.seller_transaction_id?
                                            <button type="submit" className="btn mt-3 btn-small" style={{padding: "5px 22px!important"}}>Submit</button>
                                            : ''}

                                            </div>
                                        </div>
                                        <div className="col-sm-3">
                                        </div>                                        

                                         </div>
                                 
                                         </form>
                                     </fieldset>
                                 </div>
                                 <div className="tsf-step step-4">
                                     <fieldset>
                                         <legend>Status</legend>
                                         <form className="tsf-step-content">
                                         <div className="row">
                                         <div className="col-lg-4"></div>
                                             <div className="col-lg-4">
                                                 <p>
                                                 {this.state.getRequestDetails.status == 4 ?  <h3>Trade Completed!!</h3> : '' }

                                                {this.state.getRequestDetails.status == 3 ?  <h3>Trade Cancelled!!</h3> : '' }

                                                {this.state.getRequestDetails.status < 3 ?  <h3>Trade Pending!!</h3> : '' }   

                                                 </p>
                                             </div>
                                         </div>
                                         </form>
                                     </fieldset>
                                 </div>
                             </div>
                             <div className="tsf-controls " >
                                 <button type="button" data-type="prev" className="btn btn-left tsf-wizard-btn">
                                 <i className="fa fa-chevron-left"></i> PREV
                                 </button>
                                 <button type="button" data-type="next" className="btn btn-right tsf-wizard-btn">
                                 NEXT <i className="fa fa-chevron-right"></i>
                                 </button>
                                 <button type="button" data-type="finish" className="btn btn-right tsf-wizard-btn">
                                 FINISH
                                 </button>
                             </div>
                             </div>
                         </div>
                         <div className="clearfix"></div>
                 </div>
                 </article>
                 </div>
             </div>
             </div>
         </section>             
             }
            <Footer />
            </>
            )
        }
    }