import React, { Component } from 'react';
import HeaderPage from '../Includes/DashboardHeader'
import Footer from '../Includes/Footer'
export default class BulkSell extends Component {
  
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
                        <h1 style={{paddingBottom: "20px"}}>Bulk Sell:
                        </h1>
                        <div className="col-sm-5 pl-1">
                            <form action="" method="POST">
                                <fieldset>
                                <div id="div_id_extra-Username" className="form-group">
                                    <label for="id_extra-Username" className="control-label  requiredField">
                                    Type                           <span className="asteriskField">*</span> 
                                    </label> 
                                    <div className="controls">
                                        <select required="" name="type" className="form-control">
                                            <option value="">Select Type</option>
                                            <option value="BTC">BTC</option>
                                            <option value="ETH">ETH</option>
                                            <option value="LTC">LTC</option>
                                            <option value="BCH">BCH</option>
                                        </select>
                                    </div>
                                </div>
                                <div>
                                    <div id="div_id_msg" className="form-group">
                                        <label for="id_msg" className="control-label  requiredField">
                                        Amount</label> 
                                        <div className="controls "> 
                                            <input type="text" name="amount" required="" className="form-control" />
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <div className="controls ">
                                        <input name="sendBtn" value="Send" className="btn btn-primary button" id="submit-id-submit" type="submit" /> 
                                    </div>
                                </div>
                                </fieldset>
                            </form>
                        </div>
                        <div className="col-md-12 bg_shadow">
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