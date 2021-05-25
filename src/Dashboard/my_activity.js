import React, { Component, Fragment } from 'react';
import config from '../config/config'
import HeaderPage from '../Includes/DashboardHeader'
import Footer from '../Includes/Footer'
import axios from 'axios';
import Cookies from 'js-cookie';
import { ToastContainer, toast } from 'react-toastify';
import ReactDatatable from '@ashvin27/react-datatable';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom'

const headers = {
    'Content-Type': 'application/json'
}

export default class MyActivity extends Component {
  
    constructor(props) {
        super(props)
        if(Cookies.get('loginSuccess')){
            this.loginData = JSON.parse(Cookies.get('loginSuccess'))
         }
         this.state = ({
            myActivityList : []
        })           

        this.onChange = this.onChange.bind(this);

        this.columns = [
            {
                key: "activity",
                text: "Activity",
                sortable: true
            },
            {
                key: "created_date",
                text: "Created Date",
                sortable: true
            }
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
        this.getMyActivityList()
    }

    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })     
    }    

    //======================================  get request List API Start  ====================== 

    async getMyActivityList() {
        axios.post(`${config.apiUrl}/getMyActivity`, { 'user_id': this.loginData.data.id }, { headers }).then(response => {
            if (response.data.success === true) {
                this.setState({
                    myActivityList:response.data.response
                })
            }
            else if (response.data.success === false) {
                this.setState({
                    myActivityList: []
                })
            }
        })
        .catch(err => {
            this.setState({
                myActivityList: []
            })
        })
    }    

    render() {

        return (
            <>
            <ToastContainer />
            <HeaderPage />
            <section class="create-offer-section mt-12 mb-12">
                <div class="container ">
                    <div class="row" id="faqdiv">
                    <div class="col-md-12 white_box">
                        <h1 style={{paddingBottom: "20px"}}>My Activity:
                        </h1>
                        <div class="col-sm-12">
                        <ReactDatatable
                            config={this.config}
                            records={this.state.myActivityList}
                            columns={this.columns}
                            onSort={this.onSort} />   
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