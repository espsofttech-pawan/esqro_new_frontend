import React, { Component } from 'react';
import config from '../config/config'
import { Link } from 'react-router-dom'
import Cookies from 'js-cookie';

export default class header extends Component {

    constructor(props) {
        super(props)
        this.state = {
         current_url:''
        }
        window.scrollTo({top: 0, left: 0, behavior: 'smooth' }); 
    }

    componentDidMount() {
      this.setState({
         current_url:window.location.href.substring(window.location.href.lastIndexOf('/') + 1)
      });
    }

    scrollTop(){
      window.scrollTo({top: 0, left: 0, behavior: 'smooth' });       
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
                     <a href={`${config.baseUrl}`} alt="img2">
                        <img src={`${config.baseUrl}images/Esqro-Logo-B-1.png`} className="transition" alt="Esqro crypto" /></a>
                  </div>
               </div>
               <div className="col-lg-8 col-md-9 col-4 text-right">
                  <div className="menu-toggle">
                     <span></span>
                  </div>
                  <div className="menu">
                     <ul className="d-inline-block">
                        {/* <li><Link to={`${config.baseUrl}`}>Home</Link></li> */}
                        <li><a href={`${config.baseUrl}`}>Home</a></li>
                        <li><Link to={`${config.baseUrl}buy-list`}>Buy</Link></li>
                        <li><Link to={`${config.baseUrl}sell-list`}>Sell</Link></li>
                        <li>
                           {!Cookies.get('loginSuccess')?
                              <Link to={`${config.baseUrl}login`}>Create Offer</Link>
                           :
                              <Link to={`${config.baseUrl}create-offer`}>Create Offer</Link>
                           }
                           </li>
                        {/* <li><Link to={`${config.baseUrl}wallet`}>Wallet</Link></li> */}
                     </ul>
                     <div className="signin d-inline-block">
                     {!Cookies.get('loginSuccess')?
                        <Link to={`${config.baseUrl}register`} className="btn">Register</Link>
                     :''}
                     </div>
                     <div className="signin d-inline-block">                     
                     {!Cookies.get('loginSuccess')?
                        <Link to={`${config.baseUrl}login`} className="btn">login</Link>
                     :''}                     
                     </div>

                     <div className="signin d-inline-block">                     
                     {Cookies.get('loginSuccess')?
                        <Link to={`${config.baseUrl}dashboard`} className="btn">Dashboard</Link>
                     :''}                     
                     </div>

                  </div>
               </div>
            </div>
         </div>
      </header>
            </>
            )
        }
    }