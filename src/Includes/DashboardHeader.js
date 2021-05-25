import React, { Component } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import config from '../config/config'
import { Link } from 'react-router-dom'

const headers = {
   'Content-Type': 'application/json'
};

export default class DashboardHeader extends Component {

    constructor(props) {
        super(props)

        if(Cookies.get('loginSuccess')){
            this.loginData = JSON.parse(Cookies.get('loginSuccess'))
         }        

        this.state = {
         current_url:''
        }

        window.scrollTo({top: 0, left: 0, behavior: 'smooth' }); 
    }
    
    componentDidMount() {
      this.setState({
         current_url:window.location.href.substring(window.location.href.lastIndexOf('/') + 1)
      });

      if(!Cookies.get('loginSuccess')){
         window.location.href = "login"; 
      }

    }

    scrollTop(){
      window.scrollTo({top: 0, left: 0, behavior: 'smooth' });       
    }

    logout(){
      //  axios.post(`${config.apiUrl}/logout`, { 'user_id': this.loginData.data.id }, { headers })
      //  .then(response => { })       
       Cookies.remove("loginSuccess")
       window.location.href = "/esqro_frontent/";
    }

    render() {

        return (
            <>
            
      {/* <div id="preloader"></div> */}
      <div onClick={this.scrollTop} className="top-scroll transition">
            <i className="fa fa-angle-up" aria-hidden="true"></i>
      </div>
      <header className={`transition ${(this.state.current_url == '')?'':'black-header'}`}>
         <div className="container">
            <div className="row flex-align">
               <div className="col-lg-4 col-md-3 col-8">
                  <div className="logo">
                     <a href="/esqro_frontent/" alt="img2"><img src="images/Esqro-Logo-B-1.png" className="transition" alt="Esqro crypto" /></a>
                  </div>
               </div>
               <div className="col-lg-8 col-md-9 col-4 text-right">
                  <div className="menu-toggle">
                     <span></span>
                  </div>
                  <div className="menu">
                     <ul className="d-inline-block">
                        <li><Link to={`${config.baseUrl}`}>Home</Link></li>
                        <li><Link to={`${config.baseUrl}buy-list`}>Buy</Link></li>
                        <li><Link to={`${config.baseUrl}sell-list`}>Sell</Link></li>
                        <li><Link to={`${config.baseUrl}create-offer`}>Create Offer</Link></li>
                        <li class="mega-menu">
                           <span class="opener plus"></span>
                           <a href="#">My Account</a>
                           <ul class="transition">
                              <li><Link to={`${config.baseUrl}dashboard`}>Dashboard</Link></li>
                              <li><Link to={`${config.baseUrl}support`}>Support</Link></li>
                              <li><Link to={`${config.baseUrl}dispute_management`}>Dispute</Link></li>
                              <li><Link to={`${config.baseUrl}myActivity`}>My Activity</Link></li>
                              <li><Link onClick={this.logout} to={`${config.baseUrl}`}>Logout</Link></li>
                           </ul>
                        </li>
                     </ul>
                     <div class="signin d-inline-block"></div>
                     <div class="signin d-inline-block"></div>
                  </div>
               </div>
            </div>
         </div>
      </header>
            </>
            )
        }
    }