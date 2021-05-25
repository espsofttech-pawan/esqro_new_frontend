import React, { Component } from 'react';
import HeaderPage from '../Includes/DashboardHeader'
import Footer from '../Includes/Footer'
export default class DisputeManagement extends Component {
  
    //  constructor(props) {
   //      super(props)
   //  }

    componentDidMount() {

    }

    render() {

        return (
            <>
            <HeaderPage />
            <section className="create-offer-section mt-12 mb-12">
                <div className="container ">
                    <div className="row" id="faqdiv">
                    <div className="col-md-12 white_box">
                        <h1 style={{paddingBottom: "20px"}}>Dispute Management:
                        </h1>
                        
                    </div>
                    </div>
                </div>
            </section>
            <Footer />
            </>
            )
        }
    }