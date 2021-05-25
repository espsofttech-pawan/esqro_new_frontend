import React, { Component } from 'react';
import config from '../config/config'
import HeaderPage from '../Includes/Header'
import Footer from '../Includes/Footer'
import { Link } from 'react-router-dom'
import axios from 'axios';
import Cookies from 'js-cookie';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const headers ={
    'Content-Type' : 'application/json'
}

export default class Index extends Component {

   constructor(props) {
      super(props)
      this.state = ({
          buyOrdersList : [],
          sellOrdersList : [],
          homeData : [],
          howItWorks : [],
          features : [],
          blog : [],
          askQuestion : []
      })

      if(Cookies.get('loginSuccess')){
         this.loginData = JSON.parse(Cookies.get('loginSuccess'))
      }

  }   

   componentDidMount() {
      this.getbuyList()
      this.getsellList()
      this.getHomeDataAPI()
      this.getHowItWorksAPI()
      this.getFeaturesAPI()
      this.getBlogAPI()
      this.askQuestionAPI()
  }

   // >>>>>>>>>>>>>>>>>>>> Buy List >>>>>>>>>>>>>>>>>>>
   async getbuyList() {
      axios.post(`${config.apiUrl}/buyList`, {'user_id' : this.loginData?.data.id}, { headers }).then(response => {
         if (response.data.success === true) {
            this.setState({
                  buyOrdersList: response.data.response
            })
         }
         else if (response.data.success === false) {
            this.setState({
                  buyOrdersList: []
            })
         }            
      })
      .catch(err => {
         this.setState({
            buyOrdersList: []
         })
      })
   }  

   // >>>>>>>>>>>>>>>>>>>> Sell List >>>>>>>>>>>>>>>>>>>
   async getsellList() {
      axios.post(`${config.apiUrl}/sellList`, {'user_id' : this.loginData?.data.id}, { headers }).then(response => {
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

  // >>>>>>>>>>>>>>>>>>>> Home Page data >>>>>>>>>>>>>>>>>>>

  async getHomeDataAPI() {
   axios.get(`${config.apiUrl}/getHomeData`, { headers }).then(response => {
       if (response.data.success === true) {
           this.setState({
               homeData: response.data.response
           })
       }
       else if (response.data.success === false) {
           this.setState({
            homeData: []
           })
       }            
   })
   .catch(err => {
       this.setState({
         homeData: []
       })
   })
}  

  // >>>>>>>>>>>>>>>>>>>> How IT Works data >>>>>>>>>>>>>>>>>>>

  async getHowItWorksAPI() {
   axios.get(`${config.apiUrl}/getHowItWorks`, { headers }).then(response => {
       if (response.data.success === true) {
           this.setState({
               howItWorks: response.data.response
           })
       }
       else if (response.data.success === false) {
           this.setState({
            howItWorks: []
           })
       }            
   })
   .catch(err => {
       this.setState({
         howItWorks: []
       })
   })
}  

  // >>>>>>>>>>>>>>>>>>>> Esqro Features data >>>>>>>>>>>>>>>>>>>

  async getFeaturesAPI() {
   axios.get(`${config.apiUrl}/getFeatures`, { headers }).then(response => {
       if (response.data.success === true) {
           this.setState({
               features: response.data.response
           })
       }
       else if (response.data.success === false) {
           this.setState({
            features: []
           })
       }            
   })
   .catch(err => {
       this.setState({
         features: []
       })
   })
}  

  // >>>>>>>>>>>>>>>>>>>> Blog data >>>>>>>>>>>>>>>>>>>

  async getBlogAPI() {
   axios.get(`${config.apiUrl}/getBlog`, { headers }).then(response => {
       if (response.data.success === true) {
           this.setState({
               blog: response.data.response
           })
       }
       else if (response.data.success === false) {
           this.setState({
            blog: []
           })
       }            
   })
   .catch(err => {
       this.setState({
         blog: []
       })
   })
}  

  // >>>>>>>>>>>>>>>>>>>> Frequently Asked questions data >>>>>>>>>>>>>>>>>>>

  async askQuestionAPI() {
   axios.get(`${config.apiUrl}/getAskQuestion`, { headers }).then(response => {
       if (response.data.success === true) {
           this.setState({
               askQuestion: response.data.response
           })
       }
       else if (response.data.success === false) {
           this.setState({
            askQuestion: []
           })
       }            
   })
   .catch(err => {
       this.setState({
         askQuestion: []
       })
   })
}  

    render() {

        return (
            <>
            <HeaderPage />                        
            <section className="home-banner parallax" id="banner">
               <div id="particles-js"></div>
               <div className="container pt-5 mt-5">
                  <div className="row">
                     <div className="col-lg-6 col-md-6 position-u flex-align wow fadeInLeft">
                        <div className="banner-contain">
                           <h3 className="banner-heading">{this.state.homeData?.title}</h3>
                           {!Cookies.get('loginSuccess')?
                           <a href={`${config.baseUrl}login`} className="btn  mt-3 pt-2 pb-2">Create Offer</a>
                           :
                           <a href={`${config.baseUrl}create-offer`} className="btn  mt-3 pt-2 pb-2">Create Offer</a>
                           }
                        </div>
                     </div>
                     <div className="col-lg-6 col-md-6 position-u wow fadeInRight">
                        <div className="banner-img">
                           <img src={`${config.frontendImages}`+this.state.homeData?.image} alt="banner" />
                        </div>
                     </div>
                  </div>
               </div>
            </section>
            <section className="buy-sell-tab bg-white">
               <div className="container">
               <div className="row">
                  <div className="col-lg-12">
                     <div className="package-tab-content">
                        <ul className="nav nav-tabs" role="tablist">
                           <li role="presentation" className="sell active">
                              <a href="#tab5" role="tab" data-toggle="tab" aria-selected="false" className="active" aria-expanded="true">I Want To Sell</a>
                           </li>
                           <li role="presentation" className="bor_vt_line"></li>
                           <li role="presentation" className="buy">
                              <a href="#tab4" role="tab" data-toggle="tab" aria-selected="true" aria-expanded="false">I Want To Buy</a>
                           </li>
                        </ul>
                        <div className="tab-content">
                           <div role="tabpanel" className="tab-pane fade" id="tab4">
                              <div className="row buy_coin">
                              </div>
                              <br />
                              <div className="tab-content">
                                 <div role="tabpanel" className="tab-pane fade active show" id="tab1">
                                    <div className="row">
                                       <div className="col-lg-12">
                                          <div className="coinprice-table table-responsive">
                                             <table className="table table-bordered table-striped text-left" border="1px">
                                                <thead>
                                                   <tr>
                                                      <th>Advertisers</th>
                                                      <th>Qoin Quantity</th>
                                                      <th>Price</th>
                                                      <th>Limits</th>
                                                      <th>Location</th>
                                                      <th>Trade</th>
                                                   </tr>
                                                </thead>
                                                <tbody className="bg-white">
                                                      {this.state.buyOrdersList.map((item,i) => (
                                                         // item.user_id != this.loginData.data.id ?
                                                         (i<10)?
                                                      <tr>
                                                         <td>
                                                            <div className="css-h23qqv">
                                                            <div className="css-22x53h">
                                                                  <div className="css-1rhb69f">
                                                                     <div className="css-188b24c">{item.username.charAt(0)}</div>
                                                                     <a id="C2Cofferlistsell_link_merchant" className="" href="#" target="_self" style={{color: "rgb(40, 92, 147)", marginLeft: "8px", marginRight: "0px", textDecoration: "none", cursor: "pointer"}}>{item.username}</a>
                                                                  </div>
                                                                  <div className="css-2m7z0">
                                                                     {/* <div className="css-1a0u4z7">13  orders</div>
                                                                     <div className="css-1u7jnqh"></div>
                                                                     <div className="css-19crpgd">92.86% completion</div> */}
                                                                  </div>
                                                            </div>
                                                            </div>
                                                         </td>
                                                         <td>
                                                            <div className="css-1um5b4w">
                                                            <div className="css-4ptx7h">
                                                                  <div className="css-1kj0ifu">
                                                                     <div className="css-1m1f8hn">{item.coin_quantity}</div>
                                                                     <div className="css-dyl994">Qoin</div>
                                                                  </div>
                                                            </div>
                                                            </div>
                                                         </td>
                                                         <td>
                                                            <div className="css-1um5b4w">
                                                            <div className="css-4ptx7h">
                                                                  <div className="css-1kj0ifu">
                                                                     <div className="css-1m1f8hn">{item.purchase_price}</div>
                                                                     <div className="css-dyl994">AUD</div>
                                                                  </div>
                                                            </div>
                                                            </div>
                                                         </td>
                                                         <td>
                                                            <div className="css-1kqmkdm">
                                                            <div className="css-vurnku">
                                                                  <div className="css-3v2ep2">
                                                                     <div className="css-1v5oc77">Available</div>
                                                                     <div className="css-vurnku">{item.purchase_price} Qoin</div>
                                                                  </div>
                                                                  <div className="css-16w8hmr">
                                                                     <div className="css-1v5oc77">Limit</div>
                                                                     <div className="css-vurnku" style={{direction: "ltr"}}>{item.min_transaction_limit} - {item.max_transaction_limit}</div>
                                                                  </div>
                                                            </div>
                                                            </div>
                                                         </td>                                                                    
                                                         <td>
                                                            <div className="pt-3">{item.location}</div>
                                                         </td>
                                                         <td className="column-button act text-center">

                                                         {Cookies.get('loginSuccess')?
                                                               <Link to={`${config.baseUrl}trade/`+item.id} className="btn  btn-green megabutton">Buy</Link>
                                                         :
                                                               <Link to={`${config.baseUrl}login`} className="btn  btn-green megabutton">Buy</Link>
                                                         }
                                                         </td>
                                                      </tr>
                                                      // :''
                                                      :''
                                                      ))}
                                                </tbody>
                                             </table>
                                          </div>
                                       </div>
                                    </div>
                                 </div>
                              </div>
                           </div>
                           <div role="tabpanel" className="tab-pane fade active in show" id="tab5">
                              <div className="row sell_coin">
                              
                              </div>
                              <br />
                              <div className="tab-content">
                                 <div role="tabpanel" className="tab-pane fade active show" id="tab11">
                                    <div className="row">
                                       <div className="col-lg-12">
                                          <div className="coinprice-table table-responsive">
                                             <table className="table table-bordered table-striped text-left" border="1px">
                                                <thead>
                                                <tr>
                                                   <th>Advertisers</th>
                                                   <th>Qoin Quantity</th>
                                                   <th>Price</th>
                                                   <th>Limits</th>
                                                   <th>Location</th>
                                                   <th>Trade</th>
                                                </tr>
                                                </thead>
                                                <tbody className="bg-white">
                                                   {this.state.sellOrdersList.map((item,i) => (
                                                      // item.user_id != this.loginData.data.id ?
                                                      (i<10)?
                                                   <tr>
                                                      <td>
                                                         <div className="css-h23qqv">
                                                         <div className="css-22x53h">
                                                               <div className="css-1rhb69f">
                                                                  <div className="css-188b24c">{item.username.charAt(0)}</div>
                                                                  <a id="C2Cofferlistsell_link_merchant" className="" href="#" target="_self" style={{color: "rgb(40, 92, 147)", marginLeft: "8px", marginRight: "0px", textDecoration: "none", cursor: "pointer"}}>{item.username}</a>
                                                               </div>
                                                               <div className="css-2m7z0">
                                                                  {/* <div className="css-1a0u4z7">13  orders</div>
                                                                  <div className="css-1u7jnqh"></div>
                                                                  <div className="css-19crpgd">92.86% completion</div> */}
                                                               </div>
                                                         </div>
                                                         </div>
                                                      </td>
                                                      <td>
                                                         <div className="css-1um5b4w">
                                                         <div className="css-4ptx7h">
                                                               <div className="css-1kj0ifu">
                                                                  <div className="css-1m1f8hn">{item.coin_quantity}</div>
                                                                  <div className="css-dyl994">Qoin</div>
                                                               </div>
                                                         </div>
                                                         </div>
                                                      </td>
                                                      <td>
                                                         <div className="css-1um5b4w">
                                                         <div className="css-4ptx7h">
                                                               <div className="css-1kj0ifu">
                                                                  <div className="css-1m1f8hn">{item.purchase_price}</div>
                                                                  <div className="css-dyl994">AUD</div>
                                                               </div>
                                                         </div>
                                                         </div>
                                                      </td>
                                                      <td>
                                                         <div className="css-1kqmkdm">
                                                         <div className="css-vurnku">
                                                               <div className="css-3v2ep2">
                                                                  <div className="css-1v5oc77">Available</div>
                                                                  <div className="css-vurnku">{item.purchase_price} Qoin</div>
                                                               </div>
                                                               <div className="css-16w8hmr">
                                                                  <div className="css-1v5oc77">Limit</div>
                                                                  <div className="css-vurnku" style={{direction: "ltr"}}>{item.min_transaction_limit} - {item.max_transaction_limit}</div>
                                                               </div>
                                                         </div>
                                                         </div>
                                                      </td>                                                                    
                                                      <td>
                                                         <div className="pt-3">{item.location}</div>
                                                      </td>
                                                      <td className="column-button act text-center">
                                                      {Cookies.get('loginSuccess')?
                                                         <Link to={`${config.baseUrl}trade/`+item.id}  className="btn  btn-red megabutton">Sell</Link>
                                                      :
                                                         <Link to={`${config.baseUrl}login`} className="btn  btn-red megabutton">Sell</Link>
                                                      }
                                                      </td>
                                                   </tr>
                                                //   :''  
                                                  :''
                                                  ))}
                                             </tbody>
                                             </table>
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
            <section className="work-part   ptb-100">
               <div className="container">
                  <div className="row">
                     <div className="col-md-12 wow fadeInUp">
                        <div className="section-heading text-center pb-65">
                           <label className="sub-heading">what is Esqro ?</label>
                           <h2 className="heading-title">{this.state.howItWorks?.title1}</h2>
                           <p className="heading-des">{this.state.howItWorks?.description1}</p>
                        </div>
                     </div>
                  </div>
                  <div className="row">
                     <div className="col-md-6 text-center flex-align justify-center wow fadeInLeft">
                        <div className="work-box">
                           <div className="work-box-bg"></div>
                           <img src={`${config.frontendImages}`+this.state.howItWorks?.image} className="rotation-img" alt="Work Process" />
                        </div>
                     </div>
                     <div className="col-md-6 flex-align wow fadeInRight">
                        <div className="work-box">
                           <h3 className="work-process-title pb-25">{this.state.howItWorks?.title2}</h3>
                           <p className="work-des pb-20">{this.state.howItWorks?.description2} </p>
                        </div>
                     </div>
                  </div>
               </div>
            </section>
            <section className="feature-part  bg-white bg-pattern pt-100 pb-10 ">
               <div className="container">
                  <div className="row">
                     <div className="col-md-12 wow fadeInUp">
                        <div className="section-heading text-center pb-65">
                           <h2 className="heading-title">{this.state.features?.title}</h2>
                           <p className="heading-des">{this.state.features?.description}</p>
                        </div>
                     </div>
                  </div>
                  <div className="row">
                     <div className="col-md-4 wow fadeInUp pb-80">
                        <div className="feature-box">
                           <div className="feature-icon">
                              <img src={`${config.frontendImages}`+this.state.features?.blog_image1} alt="Safe & Secure" />
                           </div>
                           <div className="feature-contain pt-25">
                              <span className="feature-title pb-15">{this.state.features?.blog_title1}</span>
                              <p className="feature-des">{this.state.features?.blog_description1}</p>
                           </div>
                        </div>
                     </div>
                     <div className="col-md-4 wow fadeInUp pb-80">
                        <div className="feature-box">
                           <div className="feature-icon">
                              <img src={`${config.frontendImages}`+this.state.features?.blog_image2} alt="Early Bonus" />
                           </div>
                           <div className="feature-contain pt-25">
                              <span className="feature-title pb-15">{this.state.features?.blog_title2}</span>
                              <p className="feature-des">{this.state.features?.blog_description2}</p>
                           </div>
                        </div>
                     </div>
                  
                     <div className="col-md-4 wow fadeInUp pb-80">
                        <div className="feature-box">
                           <div className="feature-icon">
                              <img src={`${config.frontendImages}`+this.state.features?.blog_image3} alt="Low Cost" />
                           </div>
                           <div className="feature-contain pt-25">
                              <span className="feature-title pb-15">{this.state.features?.blog_title3}</span>
                              <p className="feature-des">{this.state.features?.blog_description3}</p>
                           </div>
                        </div>
                     </div>
                  
                  </div>
               </div>
            </section>
      
            <section className="blog-part  ptb-100">
               <div className="container">
                  <div className="row">
                     <div className="col-md-12 wow fadeInUp">
                        <div className="section-heading text-center pb-65">
                           <label className="sub-heading">news</label>
                           <h2 className="heading-title"> Blog</h2>
                        </div>
                     </div>
                  </div>
                  <div className="blog-slider owl-carousel">
                    
                  {this.state.blog.map((item,i) => (
                     <div className="blog-box wow fadeInUp">
                        <div className="blog-img mb-15">
                           <a href="#"><img src={`${config.frontendImages}`+item.image} alt="blog" /></a>
                        </div>
                        <div className="blog-des-box">
                           <a href="#" className="blog-title">{item.title}</a>
                           <ul className="blog-date">
                              <li>{item.created_date}</li>
                              {/* <li>Qoin News</li> */}
                           </ul>
                           <p className="blog-des">{item.description}</p>
                           <a href="#" className="read-more">Read More</a>
                        </div>
                     </div>
                  ))}
                                   

                  </div>
               </div>
            </section>
      
            <section className="faq-part  bg-white  pt-100">
               <div className="container">
                  <div className="row">
                     <div className="col-md-12 wow fadeInUp">
                        <div className="section-heading text-center pb-65">
                           <label className="sub-heading">Faqs</label>
                           <h2 className="heading-title">Frequently Asked questions</h2>
                        
                        </div>
                     </div>
                  </div>
                  <div className="row">
                     <div className="col-md-12 wow fadeInUp"></div>
                  </div>
                  <div className="row">
                     <div className="col-md-12 wow fadeInUp">
                        <div className="tab-content" id="myTabContent">
                           <div className="tab-pane fade show active" id="general" role="tabpanel">
                              <div className="row">

                              {this.state.askQuestion.map((item,i) => (
                                 <div className="col-md-6 pb-65">
                                    <div className="faq-tab">
                                       <a href="faq.html" className="qus-title">{item.title}</a>
                                       <p className=" pt-10">{item.description}</p>
                                    </div>
                                 </div>
                              ))}
                            
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