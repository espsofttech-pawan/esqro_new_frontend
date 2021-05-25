import React, { Component } from 'react';
import config from '../config/config';
import axios from 'axios';
import { Link } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const headers = {
    'Content-Type': 'application/json'
};

export default class Footer extends Component {

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
      axios.post(`${config.apiUrl}/newslatter`, data, { headers })
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
      <footer className="bg-pattern bg-black ptb-100">
         <div className="container">
            <div className="footer">
               <div className="row">
                  <div className="col-lg-4 col-md-6">
                     <div className="footer-logo pb-25">
                        <a href=""><img src={`${config.baseUrl}images/Esqro-Logo-B-1.png`} alt="Esqro crypto" /></a>
                     </div>
                     <div className="footer-icon">
                        <ul>
                           <li><a href="#"><i className="fa fa-facebook" aria-hidden="true"></i></a></li>
                           <li><a href="#"><i className="fa fa-twitter" aria-hidden="true"></i></a></li>
                           <li><a href="#"><i className="fa fa-linkedin" aria-hidden="true"></i></a></li>
                           <li><a href="#"><i className="fa fa-instagram" aria-hidden="true"></i></a></li>
                        </ul>
                     </div>
                  </div>
                  <div className="col-lg-2 col-md-6">
                     <div className="footer-link">
                     	<h5 className="mb-2">Solutions</h5>
                        <ul className="list-unstyled footer-list">
                           <li><a href="#">P2P Trading Guides</a></li>
                           <li><a href="#">How to buy Qoin</a></li>
                           <li><a href="#">How to sell Qoin</a></li>
                           <li><a href="#">How to Create a Trade Offer</a></li>
                        </ul>
                     </div>
                  </div>
                  <div className="col-lg-2 col-md-6">
                     <div className="footer-link">
                     	<h5 className="mb-2">Useful Links</h5>
                        <ul className="list-unstyled footer-list">
                            <li><a href="#">About Us</a></li>
                            <li><a href="#">Help &amp; Support</a></li>
                            <li><a href="#">Privacy Policy</a></li>
                            <li><a href="#">Terms &amp; Conditions</a></li>
                        </ul>
                     </div>
                  </div>
                  <div className="col-lg-4 col-md-6">
                     <div className="subscribe">
                        <div className="form-group">
                           <label>Subscribe to our Newsletter</label>
                           <form onSubmit={this.submitForm}> 
                              <input type="email" name="email" onChange={this.onChange} className="form-control" placeholder="Enter your email Address" />
                              <input type="submit" name="submit" value="Subscribe" className="submit" />
                           </form>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
            <div className="copyright">
               <div className="row">
                  <div className="col-lg-6">
                     <p>© Esqro crypto all Rights Reserved. Designed By <a target="_blank" href="https://espsofttech.in/">Espsofttech pvt ltd</a></p>
                  </div>
                  <div className="col-lg-6">
                     <ul>
                        <li><a href="#">Terms & Condition</a></li>
                        <li><a href="#">Privacy Policy</a></li>
                        <li><Link to={`${config.baseUrl}contactUs`}>Contact Us</Link></li>
                     </ul>
                  </div>
               </div>
            </div>
         </div>
      </footer> 


           
            </>
            )
        }
    }