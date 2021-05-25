import React, { Component } from 'react';
import HeaderPage from '../Includes/DashboardHeader'
import Footer from '../Includes/Footer'

import axios from 'axios';
import Cookies from 'js-cookie';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import config from '../config/config';

const headers = {
    'Content-Type': 'application/json'
}

export default class KycDetails extends Component {
  
    constructor(props) {
        super(props)
        if(Cookies.get('loginSuccess')){
            this.loginData = JSON.parse(Cookies.get('loginSuccess'))
         }
         this.state = ({
            getcountryListData : []
        })           

        this.onChange = this.onChange.bind(this);
        this.KycFormSubmit = this.KycFormSubmit.bind(this);
        this.imageChangeFunction = this.imageChangeFunction.bind(this)
    }

    onChange = event => {
		event.persist();

		let value = event.target.value;

		this.setState(prevState => ({
			personalInformation: { ...prevState.personalInformation, [event.target.name]: value }
		}))
	};

    imageChangeFunction(event) {
        this.setState({
          [event.target.name+"_preview"]: URL.createObjectURL(event.target.files[0]),
          [event.target.name] : event.target.files[0]
        })
    }

    componentDidMount() {
        this.personalInformationAPI()
        this.getcountryListAPI()
    }

	async KycFormSubmit(e) {
		e.preventDefault()
        let formData = new FormData();
        formData.append('user_id', this.loginData.data.id);
        formData.append('first_name', this.state.personalInformation?.first_name);
        formData.append('last_name', this.state.personalInformation?.last_name);
        formData.append('dob', this.state.personalInformation?.dob);
        formData.append('telegram_username', this.state.personalInformation?.telegram_username);
        formData.append('address1', this.state.personalInformation?.address1);
        formData.append('address2', this.state.personalInformation?.address2);
        formData.append('state', this.state.personalInformation?.state);
        formData.append('postcode', this.state.personalInformation?.postcode);
        formData.append('country', this.state.personalInformation?.country_id);
        formData.append('mobile', this.state.personalInformation?.mobile);
        formData.append('city', this.state.personalInformation?.city);
        formData.append('passport', this.state.passport);
        formData.append('nationalfront', this.state.nationalfront);
        formData.append('nationalback', this.state.nationalback);
        formData.append('driving_licence', this.state.driving_licence);
        formData.append('wallet_address', this.state.personalInformation?.public_address);
        

        console.log(formData)
        axios.post(`${config.apiUrl}/kycFormUpdate`, formData, { headers })
			.then(response => {
				if (response.data.success === true) {
					toast.success(response.data.msg, {
						position: toast.POSITION.TOP_CENTER
					});                    
					setTimeout(() => {
						window.location.reload()
                    }, 1000);
				}

				else if (response.data.success === false) {
					toast.error(response.data.msg, {
						position: toast.POSITION.TOP_CENTER
					});
				}
			})

			.catch(err => {
				toast.error(err?.response?.data?.msg, {
					position: toast.POSITION.TOP_CENTER
				});

			})
	}


    //======================================  Get Profile API Start  ====================== 

    async personalInformationAPI() {
        axios.post(`${config.apiUrl}/getProfile`, { 'user_id': this.loginData.data.id }, { headers }).then(response => {
            if (response.data.success === true) {
                this.setState({
                    personalInformation:response.data.response
                })
            }
            else if (response.data.success === false) {

            }            
        })
        .catch(err => {
    
        })
    }

    //======================================  Country List API Start  ====================== 

    async getcountryListAPI() {
        axios.get(`${config.apiUrl}/getcountryList`, { headers }).then(response => {
            if (response.data.success === true) {
                this.setState({
                    getcountryListData: response.data.response
                })
            }
            else if (response.data.success === false) {
                this.setState({
                    getcountryListData: []
                })
            }            
        })
        .catch(err => {
            this.setState({
                getcountryListData: []
            })
        })
    }       

    render() {

        return (
            <>
            <ToastContainer />
            <HeaderPage />
            <div className="page-header page-header-kyc mt-5">
                <div className="container pt-5 mt-5">
                    <div className="row justify-content-center">
                    <div className="col-lg-8 col-xl-7 text-center">
                        <h2 className="page-title text-white">ID Verification</h2>
                        <p className="large">Verify your identity to participate in this site.</p>
                    </div>
                    </div>
                </div>
            </div>
            <div className="page-content">
                <div className="container">
                    <div className="row justify-content-center">
                    <div className="col-lg-10 col-xl-9">
                    <form onSubmit={this.KycFormSubmit}>
                        <div className="kyc-form-steps card bg-shadow mx-lg-4">
                            <div className="form-step form-step1">
                                <div className="form-step-head card-innr">
                                <div className="step-head">
                                    <div className="step-number">01</div>
                                    <div className="step-head-text">
                                        <h4>Personal Details</h4>
                                    </div>
                                </div>
                                </div>
                                <div className="form-step-fields card-innr">
                                <div className="note note-plane note-light-alt note-md pdb-1x">
                                    <em className="fas fa-info-circle"></em>
                                    <p>Please type carefully and fill out the form with your personal details. Your can’t edit these details once you submitted the form.</p>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="input-item input-with-label"><label className="input-item-label">First Name <span className="text-danger">*</span></label>
                                        <input required autoComplete="off" onChange={this.onChange} value={this.state.personalInformation?.first_name} name="first_name" className="input-bordered" type="text" /></div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="input-item input-with-label"><label className="input-item-label">Last Name <span className="text-danger">*</span></label>
                                        <input required autoComplete="off" onChange={this.onChange} value={this.state.personalInformation?.last_name} name="last_name" className="input-bordered" type="text" /></div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="input-item input-with-label"><label className="input-item-label">Email Address <span className="text-danger">*</span></label>
                                        <input autoComplete="off" readOnly value={this.state.personalInformation?.email} name="email" className="input-bordered" type="text" /></div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="input-item input-with-label"><label className="input-item-label">Phone Number <span className="text-danger">*</span></label>
                                        <input required autoComplete="off" onChange={this.onChange} value={this.state.personalInformation?.mobile} name="mobile" className="input-bordered" type="number" /></div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="input-item input-with-label"><label className="input-item-label">Date of Birth <span className="text-danger">*</span></label>
                                        <input required onChange={this.onChange} value={this.state.personalInformation?.dob} name="dob" className="input-bordered" type="date" /></div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="input-item input-with-label"><label className="input-item-label">Telegram Username</label>
                                        <input autoComplete="off" onChange={this.onChange} value={this.state.personalInformation?.telegram_username} name="telegram_username" className="input-bordered" type="text" /></div>
                                    </div>
                                </div>
                                <h4 className="text-secondary mgt-0-5x">Your Address</h4>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="input-item input-with-label"><label className="input-item-label">Address Line 1 <span className="text-danger">*</span></label>
                                        <input required autoComplete="off" onChange={this.onChange} value={this.state.personalInformation?.address1} name="address1" className="input-bordered" type="text" /></div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="input-item input-with-label"><label className="input-item-label">Address Line 2</label>
                                        <input autoComplete="off" onChange={this.onChange} value={this.state.personalInformation?.address2} name="address2" className="input-bordered" type="text" /></div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="input-item input-with-label"><label className="input-item-label">City <span className="text-danger">*</span></label>
                                        <input required autoComplete="off" onChange={this.onChange} value={this.state.personalInformation?.city} name="city" className="input-bordered" type="text" /></div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="input-item input-with-label"><label className="input-item-label">State <span className="text-danger">*</span></label>
                                        <input required autoComplete="off" onChange={this.onChange} value={this.state.personalInformation?.state} name="state" className="input-bordered" type="text" /></div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="input-item input-with-label">
                                            <label for="nationality" className="input-item-label">Nationality <span className="text-danger">*</span></label>
                                                <select required onChange={this.onChange} value={this.state.personalInformation?.country_id} className="select-bordered select-block" name="country_id" id="nationality">
                                                <option value="" disabled selected>Please select country</option>
                                                {this.state.getcountryListData.map(item => (
                                                    <option value={item.id}>{item.name}</option>
                                                ))}
                                                </select>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="input-item input-with-label"><label className="input-item-label">Postcode <span className="text-danger">*</span></label>
                                        <input required autoComplete="off" onChange={this.onChange} value={this.state.personalInformation?.postcode} name="postcode" className="input-bordered" type="text" /></div>
                                    </div>
                                </div>
                                </div>
                            </div>
                            <div className="form-step form-step2">
                                <div className="form-step-head card-innr">
                                <div className="step-head">
                                    <div className="step-number">02</div>
                                    <div className="step-head-text">
                                        <h4>Document Upload</h4>
                                        <p>To verify your identity, please upload any of your document</p>
                                    </div>
                                </div>
                                </div>
                                <div className="form-step-fields card-innr">
                                <div className="note note-plane note-light-alt note-md pdb-0-5x">
                                    <em className="fas fa-info-circle"></em>
                                    <p>In order to complete, please upload any of the following personal document.</p>
                                </div>
                                <div className="gaps-2x"></div>
                                <ul className="nav nav-tabs nav-tabs-bordered row flex-wrap guttar-20px" role="tablist">
                                    <li className="nav-item flex-grow-0">
                                        <a className="nav-link d-flex align-items-center active" data-toggle="tab" href="#passport">
                                            <div className="nav-tabs-icon"><img src="images/icon-passport.png" alt="icon" /><img src="images/icon-passport-color.png" alt="icon" /></div>
                                            <span>Passport</span>
                                        </a>
                                    </li>
                                    <li className="nav-item flex-grow-0">
                                        <a className="nav-link d-flex align-items-center" data-toggle="tab" href="#national-card">
                                            <div className="nav-tabs-icon"><img src="images/icon-national-id.png" alt="icon" /><img src="images/icon-national-id-color.png" alt="icon" /></div>
                                            <span>National Card</span>
                                        </a>
                                    </li>
                                    <li className="nav-item flex-grow-0">
                                        <a className="nav-link d-flex align-items-center" data-toggle="tab" href="#driver-licence">
                                            <div className="nav-tabs-icon"><img src="images/icon-licence.png" alt="icon" /><img src="images/icon-licence-color.png" alt="icon" /></div>
                                            <span>Driver’s License</span>
                                        </a>
                                    </li>
                                </ul>
                                <div className="tab-content" id="myTabContent">
                                    <div className="tab-pane fade show active" id="passport">
                                        <h5 className="text-secondary font-bold">To avoid delays when verifying account, Please make sure bellow:</h5>
                                        <ul className="list-check">
                                            <li>Chosen credential must not be expired.</li>
                                            <li>Document should be good condition and clearly visible.</li>
                                            <li>Make sure that there is no light glare on the card.</li>
                                        </ul>
                                        <div className="gaps-2x"></div>
                                        <h5 className="font-mid">Upload Documents Here</h5>
                                        {/* <div className="row align-items-center">
                                            <div className="col-sm-8">
                                            <div className="upload-box">
                                                <div className="upload-zone">
                                                    <div className="dz-message" data-dz-message><span className="dz-message-text">Drag and drop file</span><span className="dz-message-or">or</span><button className="btn ">SELECT</button></div>
                                                </div>
                                            </div>
                                            </div>
                                            <div className="col-sm-4 d-none d-sm-block">
                                            <div className="mx-md-4"><img src="images/vector-passport.png" alt="vector" /></div>
                                            </div>
                                        </div> */}

                                        {this.state.personalInformation?.kyc_status != 1 ?
                                            <input accept="image/*" type="file" name="passport" onChange={this.imageChangeFunction}/>
                                        : ''}
                                        
                                        {this.state.passport_preview?
                                        <img height="150px" width="200px" src={this.state.passport_preview}/>:'' }

                                        {this.state.personalInformation?.passport_file?
                                        <img height="150px" width="200px" src={`${config.imageUrl}`+this.state.personalInformation?.passport_file}/>: '' }

                                    </div>
                                    <div className="tab-pane fade" id="national-card">
                                        <h5 className="text-secondary font-bold">To avoid delays when verifying account, Please make sure bellow:</h5>
                                        <ul className="list-check">
                                            <li>Chosen credential must not be expaired.</li>
                                            <li>Document should be good condition and clearly visible.</li>
                                            <li>Make sure that there is no light glare on the card.</li>
                                        </ul>
                                        <div className="gaps-2x"></div>
                                        <h5 className="font-mid">Upload Here Your National id Front Side</h5>
                                        {/* <div className="row align-items-center">
                                            <div className="col-sm-8">
                                            <div className="upload-box">
                                                <div className="upload-zone">
                                                    <div className="dz-message" data-dz-message><span className="dz-message-text">Drag and drop file</span><span className="dz-message-or">or</span><button className="btn ">SELECT</button></div>
                                                </div>
                                            </div>
                                            </div>
                                            <div className="col-sm-4 d-none d-sm-block">
                                            <div className="mx-md-4"><img src="images/vector-id-front.png" alt="vector" /></div>
                                            </div>
                                        </div> */}

                                        {this.state.personalInformation?.kyc_status != 1 ?
                                            <input accept="image/*" type="file" name="nationalfront" onChange={this.imageChangeFunction}/>
                                        :''}

                                        {this.state.nationalfront_preview?
                                        <img height="150px" width="200px" src={this.state.nationalfront_preview}/>:'' }

                                        {this.state.personalInformation?.national_card_front?
                                        <img height="150px" width="200px" src={`${config.imageUrl}`+this.state.personalInformation?.national_card_front}/>: '' }

                                        <div className="gaps-3x"></div>
                                        <h5 className="font-mid">Upload Here Your National id Back Side</h5>
                                        {/* <div className="row align-items-center">
                                            <div className="col-sm-8">
                                            <div className="upload-box">
                                                <div className="upload-zone">
                                                    <div className="dz-message" data-dz-message><span className="dz-message-text">Drag and drop file</span><span className="dz-message-or">or</span><button className="btn ">SELECT</button></div>
                                                </div>
                                            </div>
                                            </div>
                                            <div className="col-sm-4 d-none d-sm-block">
                                            <div className="mx-md-4"><img src="images/vector-id-back.png" alt="vector" /></div>
                                            </div>
                                        </div> */}

                                        {this.state.personalInformation?.kyc_status != 1 ?                                        
                                            <input accept="image/*" type="file" name="nationalback" onChange={this.imageChangeFunction}/>
                                        :""}

                                        {this.state.nationalback_preview?
                                        <img height="150px" width="200px" src={this.state.nationalback_preview}/>:'' } 

                                        {this.state.personalInformation?.national_card_back?
                                        <img height="150px" width="200px" src={`${config.imageUrl}`+this.state.personalInformation?.national_card_back}/>: '' }            
                                    </div>
                                    <div className="tab-pane fade" id="driver-licence">
                                        <h5 className="text-secondary font-bold">To avoid delays when verifying account, Please make sure bellow:</h5>
                                        <ul className="list-check">
                                            <li>Chosen credential must not be expaired.</li>
                                            <li>Document should be good condition and clearly visible.</li>
                                            <li>Make sure that there is no light glare on the card.</li>
                                        </ul>
                                        <div className="gaps-2x"></div>
                                        <h5 className="font-mid">Upload Here Your Driving Licence Copy</h5>
                                        {/* <div className="row align-items-center">
                                            <div className="col-sm-8">
                                            <div className="upload-box">
                                                <div className="upload-zone">
                                                    <div className="dz-message" data-dz-message><span className="dz-message-text">Drag and drop file</span><span className="dz-message-or">or</span><button className="btn ">SELECT</button></div>
                                                </div>
                                            </div>
                                            </div>
                                            <div className="col-sm-4 d-none d-sm-block">
                                            <div className="mx-md-4"><img src="images/vector-licence.png" alt="vector" /></div>
                                            </div>
                                        </div> */}

                                        {this.state.personalInformation?.kyc_status != 1 ?
                                            <input accept="image/*" type="file" name="driving_licence" onChange={this.imageChangeFunction}/>
                                        :""}
                                        {this.state.driving_licence_preview?
                                        <img height="150px" width="200px" src={this.state.driving_licence_preview}/>:'' }

                                        {this.state.personalInformation?.driving_licence?
                                        <img height="150px" width="200px" src={`${config.imageUrl}`+this.state.personalInformation?.driving_licence}/>: '' }                                        
                                    </div>
                                </div>
                                <br />
                                {this.state.personalInformation?.kyc_status == 1 ? 'Status: Approved' : '' }  
                                         {this.state.personalInformation?.kyc_status == 2 ? 'Status: Rejected' : "" }
                                         {this.state.personalInformation?.kyc_status == 0 && (this.state.personalInformation?.passport || this.state.personalInformation?.national_card_back || this.state.personalInformation?.national_card_front || this.state.personalInformation?.driving_licence ) ? 'Status: Pending' : "" }
                                </div>
                            </div>
                            <div className="form-step form-step3">
                                <div className="form-step-head card-innr">
                                <div className="step-head">
                                    <div className="step-number">03</div>
                                    <div className="step-head-text">
                                        <h4>Your Qoin Wallet</h4>
                                        <p>Submit your wallet address for Qoin Deposits</p>
                                    </div>
                                </div>
                                </div>
                                <div className="form-step-fields card-innr">
                                
                                <div className="input-item input-with-label"><label for="token-address" className="input-item-label">Your Address for Qoin:</label>
                                <input className="input-bordered" value={this.state.personalInformation?.public_address} type="text" id="token-address" name="public_address" onChange={this.onChange} /><span className="input-note"></span></div>
                                </div>
                            </div>
                            <div className="form-step form-step-final">
                                <div className="form-step-fields card-innr">
                                {/* <div className="input-item"><input className="input-checkbox input-checkbox-md" id="term-condition" required type="checkbox" /><label for="term-condition">I have read the <a href="#">Terms of Condition</a> and <a href="#">Privacy Policy.</a></label></div> */}
                                {/* <div className="input-item"><input className="input-checkbox input-checkbox-md" id="info-currect" required type="checkbox" /><label for="info-currect">All the personal information I have entered is correct.</label></div> */}
                                <div className="gaps-1x"></div>
                                <button type="submit" className="btn" >Process for Verify</button>
                                </div>
                            </div>
                        </div>
                        </form>
                    </div>
                    </div>
                </div>
            </div>
            <Footer />
            </>
            )
        }
    }