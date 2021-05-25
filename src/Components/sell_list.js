import React, { Component, Fragment } from 'react';
import config from '../config/config'
import HeaderPage from '../Includes/Header'
import Footer from '../Includes/Footer'
import { Link } from 'react-router-dom'
import axios from 'axios';
import Cookies from 'js-cookie';
import ReactDatatable from '@ashvin27/react-datatable';
import 'react-toastify/dist/ReactToastify.css';

const headers ={
    'Content-Type' : 'application/json'
}

export default class SellList extends Component {
    constructor(props) {
        super(props)
        this.state = ({
            sellOrdersList : []
        })       

        if(Cookies.get('loginSuccess')){
            this.loginData = JSON.parse(Cookies.get('loginSuccess'))
        }  

        this.onChange = this.onChange.bind(this);
        this.searchAmountFormSubmit = this.searchAmountFormSubmit.bind(this);        
           
        this.columns = [
            {
                key: "username",
                text: "Username",
                sortable: true,
                cell: record => { 
                    return (
                        <Fragment>
                            <div className="css-h23qqv">
                            <div className="css-22x53h">
                                <div className="css-1rhb69f">
                                    <div className="css-188b24c">{record.username.charAt(0)}</div>
                                    <a id="C2Cofferlistsell_link_merchant" className=""  target="_self" style={{color: "rgb(40, 92, 147)", marginLeft: "8px", marginRight: "0px", textDecoration: "none"}}>{record.username}</a>
                                </div>
                                <div className="css-2m7z0">
                            
                                </div>
                            </div>
                            </div>
                        </Fragment>
                    );
                }                
            },

            {
                key: "coin_quantity",
                text: "Qoin Quantity",
                sortable: true,
                cell: record => { 
                    return (
                        <div className="css-1um5b4w">
                        <div className="css-4ptx7h">
                            <div className="css-1kj0ifu">
                                <div className="css-1m1f8hn">{record.coin_quantity}</div>
                                <div className="css-dyl994">Qoin</div>
                            </div>
                        </div>
                        </div>
                    );
                }                
            },
            
            {
                key: "purchase_price",
                text: "Price",
                sortable: true,
                cell: record => { 
                    return (
                        <Fragment>
                            <div className="css-1um5b4w">
                            <div className="css-4ptx7h">
                                <div className="css-1kj0ifu">
                                    <div className="css-1m1f8hn">{record.purchase_price}</div>
                                    <div className="css-dyl994">AUD</div>
                                </div>
                            </div>
                            </div>
                        </Fragment>
                    );
                }                
            },
            
            {
                key: "coin_available",
                text: "Limits",
                sortable: true,
                cell: record => { 
                    return (
                        <Fragment>
                            <div className="css-1kqmkdm">
                                <div className="css-vurnku">
                                    <div className="css-3v2ep2">
                                        <div className="css-1v5oc77">Available</div>
                                        <div className="css-vurnku">{record.coin_available} Qoin</div>
                                    </div>
                                    <div className="css-16w8hmr">
                                        <div className="css-1v5oc77">Limit</div>
                                        <div className="css-vurnku" style={{direction: "ltr"}}>{record.min_transaction_limit} - {record.max_transaction_limit}</div>
                                    </div>
                                </div>
                            </div>
                        </Fragment>
                    );
                }                
            },    
            
            {
                key: "location",
                text: "Location",
                sortable: true,
                cell: record => { 
                    return (
                        <Fragment>
                            <div className="pt-3">{record.location}</div>
                        </Fragment>
                    );
                }                
            }, 
            
            {
                key: "action",
                text: "Trade",
                sortable: true,
                cell: record => { 
                    return (
                        <Fragment>
                            {Cookies.get('loginSuccess')?
                                <Link to={`${config.baseUrl}trade/`+record.id}  className="btn  btn-red megabutton">Sell</Link>
                            :
                                <Link to={`${config.baseUrl}login`} className="btn  btn-red megabutton">Sell</Link>
                            }
                            
                        </Fragment>
                    );
                }                
            },             

        ];

        this.config = {
            page_size: 10,
            length_menu: [10, 20, 50],
            show_filter: true,
            show_pagination: true,
            pagination: 'advance',
            button: {
                excel: false,
                print: false
            }
        }         

    }

    componentDidMount() {
        this.getsellList()
    }

    onChange(e) {   
        this.setState({
            [e.target.name]: e.target.value
        })
    }        
    
    async searchAmountFormSubmit(e) {
        e.preventDefault()
        this.setState(this.state)
        const data = this.state
        data.trade_type = 1;
        data.user_id = this.loginData?.data.id
        console.log(data);
        axios.post(`${config.apiUrl}/searchAmountOfferList`, data, { headers })
           .then(response => {
            if (response.data.success === true) {
                this.setState({
                    sellOrdersList: response.data.response
                })
            }
            else if (response.data.success === false) {
                this.setState({
                    sellOrdersList: []
                })
            } 
           })
           .catch(err => {
            this.setState({
                sellOrdersList: []
            })
        })
  }      

    async getsellList() {
        axios.post(`${config.apiUrl}/sellList`, {'user_id' : this.loginData?.data.id} ,{ headers }).then(response => {
            if (response.data.success === true) {
                this.setState({
                    sellOrdersList: response.data.response
                })
            }
            else if (response.data.success === false) {
                this.setState({
                    sellOrdersList: []
                })
            }            
        })
        .catch(err => {
            this.setState({
                sellOrdersList: []
            })
        })
    }

    render() {

        return (
            <>
            <HeaderPage />
            <section className="buy-sell-tab bg_grey mt-4">
                <div className="container-fluid ">
                    <div className="row">
                    <div className="col-lg-12 buy-sell">
                        <div className="package-tab-content">
                            <div className="row pt-4 pb-3 bg-white" style={{boxShadow: "0px 2px 4px rgb(0 0 0 / 8%), 0px 0px 4px rgb(0 0 0 / 8%)", position: "relative"}}>
                                <div className="container">
                                    <form onSubmit={this.searchAmountFormSubmit}>
                                    <div className="row">
                                            <div className="col-sm-3 pt-4">
                                                <ul className="nav nav-tabs" role="tablist">
                                                <li role="presentation" className="sell active">
                                                    <a href="#tab5" role="tab" data-toggle="tab" aria-selected="false" className="active" aria-expanded="true">I Want To SELL</a>
                                                </li>
                                            <li role="presentation" className="buy">
                                                <a href={`${config.baseUrl}buy-list`} aria-selected="true" aria-expanded="false">I Want To BUY </a>
                                            </li>
                                            </ul>
                                        </div>
                                        <div className="col-sm-2"></div>
                                        
                                            <div className="col-sm-4">
                                                <label>Amount</label>
                                                <div className="input-group">
                                                    <input type="number" className="form-control" name="amount" onChange={this.onChange} value={this.state.amount} required placeholder="Enter Amount" aria-label="Recipient's username" aria-describedby="basic-addon2" />
                                                </div>
                                            </div>
                                            <div className="col-sm-3 text-right">
                                                <button type="submit" className="btn btn-outline-secondary" style={{marginTop: "25px", padding: "12px 0px", width: "134px", height: "47px"}}><i className="fa fa-search"></i>&nbsp;Search</button>
                                                <a href={`${config.baseUrl}sell-list`} > &nbsp;
                                                    <button type="button" className="btn btn-outline-secondary" style={{marginTop: "25px", padding: "12px 0px", width: "134px", height: "47px"}}><i className="fa fa-refresh"></i>&nbsp;Refresh</button>
                                                </a>
                                            </div>
                                            
                                    
                                     </div>
                                </form>
                                </div>
                            </div>
                        
                            <div className="tab-content">
                                <div role="tabpanel" className="tab-pane fade active in show" id="tab5">
                                <br />
                                <div className="tab-content">
                                    <div role="tabpanel" className="tab-pane fade active show" id="tab11">
                                        <div className="row">
                                            <div className="container">
                                            <div className="row">
                                                <div className="col-lg-12">
                                                    <div className="coinprice-table table-responsive">
                                                    
                                                    <ReactDatatable
                                                        config={this.config}
                                                        records={this.state.sellOrdersList}
                                                        columns={this.columns}
                                                        onSort={this.onSort} />                                                    
    
                                                    </div>
                                                </div>
                                                
                                            </div>
                                            
                                            </div>
                                        </div>
                                    </div>

                                </div>
                                </div>
                            </div>
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