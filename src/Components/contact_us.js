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


export default class ContactUs extends Component {
   
   constructor(props) {
      super(props)
      this.onChange = this.onChange.bind(this);
      this.submitForm = this.submitForm.bind(this);    
    }

    onChange(e) {
       this.setState({
           [e.target.name]: e.target.value
       })
   }

  componentDidMount() {

  }

  async submitForm(e) {
    e.preventDefault()
    this.setState(this.state)
    const data = this.state
    axios.post(`${config.apiUrl}/getintouch`, data, { headers })
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
            <section className="create-offer-section mt-5 pt-5 mb-12">
                <div className="container pt-5">
                    
                    <div className="row">
                        <div id="identification_hint" className="col-md-12 display-none">
                        </div>
                    </div>
                    <form onSubmit={this.submitForm} id="ad-form" className="form-horizontal add-adform border_btm_line balance-card"> 
                    <fieldset>
                  <legend className="head_theme">Get in touch</legend>
                 

                  <div className="row " id="row_id_ad-max_amount">
                     <div id="div_id_ad-max_amount" className="col-md-2 label-col form-group"> <label for="id_ad-max_amount" className="control-label ">
                        Name</label> 
                     </div>
                     <div className="col-md-4">
                        <div className="input-group"> 
                           <label style={{color: "red"}} id="sufficientAmt"></label>
                           <input required className="numberinput form-control" id="id_ad-max_amount" name="name" type="text" onChange={this.onChange} /> 
                        </div>
                     </div>
                     <div className="col-md-4 two-col-help-text">
                     </div>
                  </div>

                  <div className="row " id="row_id_ad-max_amount">
                     <div id="div_id_ad-max_amount" className="col-md-2 label-col form-group"> <label for="id_ad-max_amount" className="control-label ">
                        Email</label> 
                     </div>
                     <div className="col-md-4">
                        <div className="input-group"> 
                           <label style={{color: "red"}} id="sufficientAmt"></label>
                           <input required className="numberinput form-control" id="id_ad-max_amount" name="email" type="email" onChange={this.onChange} /> 
                        </div>
                     </div>
                     <div className="col-md-4 two-col-help-text">
                     </div>
                  </div> 

                  <div className="row " id="row_id_ad-max_amount">
                     <div id="div_id_ad-max_amount" className="col-md-2 label-col form-group"> <label for="id_ad-max_amount" className="control-label ">
                        Phone number</label> 
                     </div>
                     <div className="col-md-4">
                        <div className="input-group"> 
                           <label style={{color: "red"}} id="sufficientAmt"></label>
                           <input required className="numberinput form-control" id="id_ad-max_amount" name="mobile" type="number" onChange={this.onChange} /> 
                        </div>
                     </div>
                     <div className="col-md-4 two-col-help-text">
                     </div>
                  </div>  

                  <div className="row " id="row_id_ad-max_amount">
                     <div id="div_id_ad-max_amount" className="col-md-2 label-col form-group"> <label for="id_ad-max_amount" className="control-label ">
                        Comment</label> 
                     </div>
                     <div className="col-md-4">
                        <div className="input-group"> 
                           <label style={{color: "red"}} id="sufficientAmt"></label>
                           <textarea onChange={this.onChange} required className="form-control" name="comment" ></textarea>
                        </div>
                     </div>
                     <div className="col-md-4 two-col-help-text">
                     </div>
                  </div>

                  <div className="row " id="row_id_ad-max_amount">
                     <div id="div_id_ad-max_amount" className="col-md-2 label-col form-group"> <label for="id_ad-max_amount" className="control-label ">
                        </label> 
                     </div>
                     <div className="col-md-4">
                        <div className="input-group"> 
                           <label style={{color: "red"}} id="sufficientAmt"></label>
                              <input style={{borderRadius: "14px"}} id="submiBtn" name="btnsubmit" value="Submit" className="btn aid" type="submit" />
                        </div>
                     </div>
                     <div className="col-md-4 two-col-help-text">
                     </div>
                  </div>

               </fieldset>
                    </form>
                </div>
            </section>


            <Footer />
            </>
            )
        }
    }