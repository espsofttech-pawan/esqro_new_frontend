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

export default class EditOffer extends Component {
   
   constructor(props) {
      super(props)

      this.state = ({
        offerDetails:[]
    })  

      if(Cookies.get('loginSuccess')){
         this.loginData = JSON.parse(Cookies.get('loginSuccess'))
      }
      this.onChange = this.onChange.bind(this);
      this.offerUpdate = this.offerUpdate.bind(this);

      const { match: { params } } = this.props;
      this.id = params.id

   }

    componentDidMount() {
        this.getOfferDetailsAPI()
    }

    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
      this.setState(prevState => ({
        offerDetails: { ...prevState.list, [e.target.name]: e.target.value }
      }))

  }

  async offerUpdate(e) {
    e.preventDefault()
    const data = this.state.offerDetails
    data.id = this.id
    console.log(this.state);
    data.user_id = this.loginData.data.id
    axios.post(`${config.apiUrl}/updateOffer`, data, { headers })
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

    //======================================  Get offer details API Start  ====================== 

    async getOfferDetailsAPI() {
        axios.post(`${config.apiUrl}/getOfferDetails`, { 'id': this.id }, { headers }).then(response => {
            if (response.data.success === true) {
                this.setState({
                    offerDetails:response.data.response
                })
            }
            else if (response.data.success === false) {
                this.setState({
                    offerDetails: []
                })
            }            
        })
        .catch(err => {
            this.setState({
                offerDetails: []
            })
        })
    }   

    render() {

        return (
            <>
            <ToastContainer />
            <HeaderPage />
            <section className="create-offer-section mt-5 pt-5 mb-12">
                <div className="container pt-5">
                    
                    <div className="row">
                        <div id="identification_hint" className="col-md-12 display-none">
                        </div>
                    </div>
                    <form onSubmit={this.offerUpdate} id="ad-form" className="form-horizontal add-adform border_btm_line balance-card"> 
                    <fieldset>
                  <legend className="head_theme">Edit offer</legend>
                  <div className="row " id="row_id_ad-trade_type">
                     <div id="div_id_ad-trade_type" className="col-md-2 label-col form-group"> <label for="id_ad-trade_type_0" className="control-label">
                        I want to...</label> 
                     </div>
                     <div className="col-md-3">
                        <div className="controls ">
                           <select onChange={this.onChange} value={this.state.offerDetails?.trade_type} className="select form-control" id="id_ad-online_provider" name="trade_type">
                           <option id="id_ad-trade_type_1" value="" className="add-adform-radio ">Select Trade</option>
                              <option id="id_ad-trade_type_1" value="2" className="add-adform-radio ">Sell</option>
                              <option id="id_ad-trade_type_2" value="1" className="add-adform-radio">Buy</option>
                           </select>
                        </div>
                     </div>
                     <div className="col-md-7 two-col-help-text"></div>
                  </div>
                 
                  <div className="row " id="row_id_ad-price_equation11">
                     <div className="col-md-2 label-col form-group">
                        <label for="id_ad-price_equation" className="control-label">
                       Quantity of Qoin</label>
                     </div>
                     <div className="col-md-3">
                        <div className="input-group"> 
                           <input className="numberinput form-control" id="id_ad-min_amount"  name="coin_quantity" type="number" onChange={this.onChange} value={this.state.offerDetails?.coin_quantity} /> 
                        </div>
                     </div>
                  </div>

                  <div className="row " id="row_id_ad-online_provider">
                     <div id="div_id_ad-online_provider" className="col-md-2 label-col form-group"> <label for="id_ad-online_provider" className="control-label">Purchase Price</label> 
                     </div>
                     <div className="col-md-3">
                        <div className="input-group"> 
                           <input className="numberinput form-control" id="id_ad-min_amount" name="purchase_price" type="number" onChange={this.onChange} value={this.state.offerDetails?.purchase_price} /> 
                        </div>
                     </div>
                  </div>
                  
                  <div className="row " id="row_id_ad-online_provider">
                     <div id="div_id_ad-online_provider" className="col-md-2 label-col form-group"> <label for="id_ad-online_provider" className="control-label">Offer Expiration</label> 
                     </div>
                     <div className="col-md-3">
                        <div className="input-group"> 
                           <input className="numberinput form-control" id="id_ad-min_amount"  name="offer_expiration" type="date" onChange={this.onChange} value={this.state.offerDetails?.offer_expiration} /> 
                        </div>
                     </div>
                  </div>

               </fieldset>
               <fieldset>
                  <legend className="head_theme">More information</legend>
                  
                  <div className="row " id="row_id_ad-min_amount">
                     <div id="div_id_ad-min_amount" className="col-md-2 label-col form-group"> <label for="id_ad-min_amount" className="control-label ">
                        Min. transaction limit</label> 
                     </div>
                     <div className="col-md-3">
                        <div className="input-group"> 
                           <input className="numberinput form-control" id="id_ad-min_amount" name="min_transaction_limit" type="number" onChange={this.onChange} value={this.state.offerDetails?.min_transaction_limit}  /> 
                        </div>
                     </div>
                     <div className="col-md-7 two-col-help-text">
                     </div>
                  </div>

                  <div className="row " id="row_id_ad-max_amount">
                     <div id="div_id_ad-max_amount" className="col-md-2 label-col form-group"> <label for="id_ad-max_amount" className="control-label ">
                        Max. transaction limit</label> 
                     </div>
                     <div className="col-md-3">
                        <div className="input-group"> 
                           <label style={{color: "red"}} id="sufficientAmt"></label>
                           <input className="numberinput form-control" id="id_ad-max_amount" name="max_transaction_limit" type="number" onChange={this.onChange} value={this.state.offerDetails?.max_transaction_limit} /> 
                        </div>
                     </div>
                     <div className="col-md-7 two-col-help-text">
                     </div>
                  </div>
                 
                  <div className="row " id="row_id_ad-other_info">
                     <div id="div_id_ad-other_info" className="col-md-2 label-col form-group"> <label for="id_ad-other_info" className="control-label ">
                        Terms of trade</label> 
                     </div>
                     <div className="col-md-6">
                        <div className="controls"> 
                           <textarea required="" className="textarea form-control" cols="40" id="id_ad-other_info" name="terms_of_trade" rows="8" onChange={this.onChange} value={this.state.offerDetails?.terms_of_trade}></textarea> 
                        </div>
                     </div>
                  </div>

               </fieldset>
                    <div className="form-group">
                        <div className="controls ">
                            <center>
                            <input style={{borderRadius: "14px"}} id="submiBtn" name="btnsubmit" value="Submit for Approval" className="btn aid" type="submit" />
                                 
                            </center>
                        </div>
                    </div>
                    <input id="id_ad-zipcode" name="ad_zipcode" type="hidden" />
                    </form>
                </div>
            </section>


            <Footer />
            </>
            )
        }
    }