import React, { Component } from 'react';
import HeaderPage from '../Includes/DashboardHeader'
import Footer from '../Includes/Footer'
export default class Referral extends Component {
  
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
                        <h1 style={{paddingBottom: "20px"}}>Referral:
                        </h1>
                        <div className="col-sm-5 pl-1">
                            <form action="" method="POST">
                                <fieldset>                    
                                <div id="div_id_extra-Username" className="form-group">
                                <div>
                                    <div id="div_id_msg" className="form-group">
                                        <label for="id_msg" className="control-label  requiredField">
                                        Referral Link</label> 
                                        <div className="controls "> 
                                            <input type="text" name="link" value="https://localcointrade.com/login/signup/go95ta9" className="form-control" />
                                        </div>
                                    </div>
                                </div>

                                </div></fieldset>
                            </form>
                        </div>
                        <div className="col-md-12 bg_shadow">
                            <h3>Referral List</h3>
                                No Data Found!            
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