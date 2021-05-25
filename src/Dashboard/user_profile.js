import React, { Component } from 'react';
import HeaderPage from '../Includes/DashboardHeader'
import Footer from '../Includes/Footer'
export default class UserProfile extends Component {
  
    //  constructor(props) {
   //      super(props)
   //  }

    componentDidMount() {

    }

    render() {

        return (
            <>
            <HeaderPage />
            <section className="bg-blue margin-top-spc">
                <div className="flex px-4 justify-between pt-4 sm:pt-8 ">
                    <div className="flex justify-between container mx-auto">
                    <div className="flex flex-wrap container items-center">
                        <div className="w-full text-center">
                            <h1 className="text-5xl font-400 text-white pb-4 leading-tight">
                                A Guide to Making Money with P2P Trading in 2020
                            </h1>
                            <h2 className="text-xl text-white font-600">
                                We take an in-depth look at Peer-To-Peer (P2P) trading and explain how you can use this trading style to set up your own cryptocurrency business and make money buying and selling cryptocurrency. 
                            </h2>
                        </div>
                    </div>
                    </div>
                </div>
                <div className="flex justify-between m-5-per">
                    <img src="images/wave2.png" className="w-full" />
                </div>
            </section>
            <Footer />
            </>
            )
        }
    }