import React, { Component } from 'react';
import config from '../config/config';
import HeaderPage from '../Includes/DashboardHeader'
import Footer from '../Includes/Footer'
export default class Kyc extends Component {
  
    //  constructor(props) {
   //      super(props)
   //  }

    componentDidMount() {

    }

    render() {

        return (
            <>
            <HeaderPage />
            <div className="page-header page-header-kyc mt-5">
                <div className="container mt-5 pt-5">
                    <div className="row justify-content-center">
                    <div className="col-lg-8 col-xl-7 text-center">
                        <h2 className="page-title text-white">KYC Verification</h2>
                        <p className="large">To comply with regulation, each participant will have to go through identity verification (KYC/AML) to prevent fraud. Please complete our fast and secure verification process to participate on this site.</p>
                    </div>
                    </div>
                </div>
            </div>
            <div className="page-content">
                <div className="container">
                    <div className="row justify-content-center">
                    <div className="col-lg-10 col-xl-9">
                        <div className="kyc-status card bg-shadow mx-lg-4">
                            <div className="card-innr">
                                <div className="status status-empty">
                                <div className="status-icon"><em className="fa fa-file"></em></div>
                                <span className="status-text text-dark">You have not submitted the necessary documents to verify your identity. To participate on this site, please verify your identity.</span><a href={`${config.baseUrl}kyc_details`} className="btn ">Click here to complete your KYC</a>
                                </div>
                            </div>
                        </div>
                        
                        <div className="gaps-1x"></div>
                        <div className="gaps-3x d-none d-sm-block"></div>
                    </div>
                    </div>
                </div>
            </div>
            <Footer />
            </>
            )
        }
    }