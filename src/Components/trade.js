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

export default class Trade extends Component {

    constructor(props) {
        super(props)
      const { match: { params } } = this.props;
      this.id = params.id

      this.state = ({
        getOfferDetails : []
    })

    if(Cookies.get('loginSuccess')){
        this.loginData = JSON.parse(Cookies.get('loginSuccess'))
    }    

    this.onChange = this.onChange.bind(this);
    this.submitForm = this.submitForm.bind(this);
    }

    onChange(e) {

        if(e.target.name == 'token_amount'){
            this.setState({
                aud_amount:e.target.value/10
            })
        }

        if(e.target.name == 'aud_amount'){
            this.setState({
                token_amount:e.target.value*10
            })
        }        

        this.setState({
            [e.target.name]: e.target.value
        })
    }

    async submitForm(e) {
        e.preventDefault()
        this.setState(this.state)
        const data = this.state
        data.offer_id = this.id
        data.user_id = this.loginData.data.id
        axios.post(`${config.apiUrl}/tradeRequest`, data, { headers })
           .then(response => {
  
              if (response.data.success === true) {
                 toast.success(response.data.msg, {
                       position: toast.POSITION.LEFT_CENTER
                       });
                       
                       setTimeout(() => {
                          window.location.href= `${config.baseUrl}`+"dashboard"
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

    componentDidMount() {
        this.getOfferDetailsAPI()
    }

    //======================================  Get offer details API Start  ====================== 

    async getOfferDetailsAPI() {
        axios.post(`${config.apiUrl}/getOfferDetailsForTrade`, { 'offer_id': this.id }, { headers }).then(response => {
            if (response.data.success === true) {
                this.setState({
                    getOfferDetails:response.data.response
                })
            }
            else if (response.data.success === false) {
                this.setState({
                    getOfferDetails: []
                })
            }            
        })
        .catch(err => {
            this.setState({
                getOfferDetails: []
            })
        })
    }
  
    render() {

        return (
            <>
            <ToastContainer />
            <HeaderPage />

            <section class="create-offer-section mt-9 mb-5">
                    <div class="container">
                        <div class="row">
                        <div class=" col-md-12" id="toc2">
                            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                <div class="edit_div">
                                    <div class="ui header">
                                    <div class="settings-head__title">
                                        <h2>
                                            {this.state.getOfferDetails?.trade_type == 1 ?
                                            "Sell Qoin" : 'Buy Qoin'
                                            }
                                        </h2>
                                    </div>
                                    <div class="settings-head__subheading">
                                        You are 
                                        {this.state.getOfferDetails?.trade_type == 1 ?
                                            " selling " : ' buying '
                                        }
                                         from <a href="#">{this.state.getOfferDetails?.username}</a>
                                    </div>
                                    </div>
                                </div>
                                
                            </div>
                        </div>
                        <div class="col-md-6">
                                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                    <form onSubmit={this.submitForm} id="ad-form" className="form-horizontal add-adform border_btm_line balance-card"> 
                                    <div class="container-fluid grid">
                                        <div class="row pull-center box-head">
                                            <div class="col-md-12">
                                                <label>Enter amount of Qoin:</label>
                                                <div style={{color: "red"}} id="amountError"></div>
                                                <div class="row">
                                                <div class="col-md-12">
                                                    <div class="form-group">
                                                        <input type="number" name="token_amount" onChange={this.onChange} id="buy_amount" class="form-control" placeholder="Enter amount" value={this.state.token_amount} />
                                                    </div>
                                                </div>
                                                <div class="col-md-12">
                                                    <div class="form-group">
                                                        <label>Amount (AUD)</label>
                                                        <input type="text" onChange={this.onChange} placeholder="Amount in AUD" id="cryptoAmount" name="aud_amount" class="form-control" value={this.state.aud_amount} />
                                                    </div>
                                                    <p>Limits: {this.state.getOfferDetails?.min_transaction_limit}  - {this.state.getOfferDetails?.max_transaction_limit} </p>
                                                </div>
                                                </div>
                                                <div class="row">
                                                <div class="col-md-12">
                                                    <b>
                                                        <h3>Click 
                                                        {this.state.getOfferDetails?.trade_type == 1 ?" Sell " : ' Buy '}
                                                             to trade</h3>
                                                    </b>
                                                    <br />
 
                                                    {this.state.getOfferDetails?.trade_type == 1 ?
                                                        <button id="buy_now_btn" type="submit" class=" btn-danger btn-lg update-btn">Sell Now</button> : 
                                                        
                                                        <button id="buy_now_btn" type="submit" class=" btn-success btn-lg update-btn">Buy Now</button>
                                                    }

                                                </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    </form>
                                </div>
                                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                    <form method="post" class="balance-card p-0 pb-3" action="#" id="change_password1">
                                    <div class="container-fluid grid">
                                        <div class="row pull-center box-head">
                                            <div class="col-md-12" style={{padding: "3px 14px", background: "linear-gradient(40deg, #30761d 20%, #000 51%, #000 90%);border-bottom: 1px solid #fff"}}>
                                                <b>
                                                <h3>Trade Info</h3>
                                                </b>
                                            </div>
                                            <div class="col-sm-12">
                                                <div class="row">
                                                <div class="col-md-4">
                                                    <label>Trader : </label>
                                                </div>
                                                <div class="col-md-8">
                                                    <div class="text_font">{this.state.getOfferDetails?.username}</div>
                                                </div>
                                                </div>
                                                <div class="row">
                                                <div class="col-md-4">
                                                    <label>Payment Method : </label>
                                                </div>
                                                <div class="col-md-8">
                                                    <div class="text_font">AUD</div>
                                                </div>
                                                </div>
                                                <div class="row">
                                                <div class="col-md-4">
                                                    <label>Trade Limits :</label>
                                                </div>
                                                <div class="col-md-8">
                                                    <div class="text_font">{this.state.getOfferDetails?.min_transaction_limit}  - {this.state.getOfferDetails?.max_transaction_limit} </div>
                                                </div>
                                                </div>
                                                <div class="row">
                                                <div class="col-md-4">
                                                    <label>Location :</label>
                                                </div>
                                                <div class="col-md-8">
                                                    <div class="text_font">{this.state.getOfferDetails?.address1}</div>
                                                </div>
                                                </div>

                                                <div class="row">
                                                <div class="col-md-4">
                                                    <label>Available qoin :</label>
                                                </div>
                                                <div class="col-md-8">
                                                    <div class="text_font">{this.state.getOfferDetails?.coin_available}</div>
                                                </div>
                                                </div>                                                
                                            
                                            </div>
                                        </div>
                                    </div>
                                    </form>
                                </div>
                        </div>
                        <div class="col-md-6">
                            
                            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                <form method="post" class="balance-card " action="#" style={{minHeight: "73px"}}>
                                    <div class="container-fluid grid ui header mt-2">
                                    <div class="row pull-center">
                                        <div class="col-sm-12">
                                            <div class="align-left-component">
                                                <h2 class="ui header mt-3">
                                                {/* <img src="https://localcointrade.com/assets/mansa/images/bitcoin-symble.png" width="25px" /> */}
                                                &nbsp;<span>Price</span>
                                                <span class="price_top_spc" id="live_gold_price"> 1 AUD = 10 Qoin 
                                                <input type="hidden" id="marginPriceWithCrypto" value="4154428.42" />
                                                </span>
                                                </h2>
                                            </div>
                                        </div>
                                    </div>
                                    </div>
                                </form>
                            </div>
                            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                <form method="post" class="balance-card p-0" action="#" style={{height: "300px"}}>
                                    <div class="container-fluid grid">
                                    <div class="row box-head">
                                        <div class="col-md-12">
                                            <div class="row">
                                                <div class="col-md-12" style={{padding: "3px 14px", background: "linear-gradient(40deg, #30761d 20%, #000 51%, #000 90%);border-bottom: 1px solid #fff"}}>
                                                <b>
                                                    <h3>Terms and conditions set by this trader:</h3>
                                                </b>
                                                </div>
                                                <div class="col-sm-12 pt-2">
                                                <p>
                                                    {this.state.getOfferDetails?.terms_of_trade? this.state.getOfferDetails?.terms_of_trade : "No terms of trade!!"}
                                                </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    </div>
                                </form>
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