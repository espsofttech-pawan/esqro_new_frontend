import './App.css';
import config from './config/config'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Index from './Components/index'
import BuyList from './Components/buy_list'
import SellList from './Components/sell_list'
import CreateOffer from './Components/create_offer'
import EditOffer from './Components/edit_offer'
import Register from './Components/register'
import Login from './Components/login'
import BulkSell from './Components/bulksell'
import Trade from './Components/trade'
import Dashboard from './Dashboard/dashboard'
import DisputeManagement from './Dashboard/dispute_management'
import Kyc from './Dashboard/kyc'
import KycDetails from './Dashboard/kyc_details'
import Referral from './Dashboard/referral'
import Support from './Dashboard/support'
import SupportChat from './Components/SupportChat'
import TradingGuides from './Dashboard/trading_guides'
import ForgotPassword from './Components/forgot_password'
import VerifyAccount from './Components/login'
import TradeProcess from './Components/trade_process'
import Datatable from './Dashboard/datatable'
import ContactUs from './Components/contact_us'
import myActivity from './Dashboard/my_activity'
import googleAuth from './Components/google_auth'

function App() {
  return (
    <BrowserRouter>
      <div>
        {/* <Menu /> */}
        <Switch>
          <Route path={`${config.baseUrl}`} exact component={Index} />
          <Route path={`${config.baseUrl}buy-list`}  component={BuyList} />
          <Route path={`${config.baseUrl}sell-list`}  component={SellList} />
          <Route path={`${config.baseUrl}create-offer`}  component={CreateOffer} />
          <Route path={`${config.baseUrl}edit-offer/:id`}  component={EditOffer} />
          <Route path={`${config.baseUrl}register`}  component={Register} />
          <Route path={`${config.baseUrl}login`}  component={Login} />
          <Route path={`${config.baseUrl}forgotPassword`}  component={ForgotPassword} />
          <Route path={`${config.baseUrl}bulk_sell`}  component={BulkSell} />
          <Route path={`${config.baseUrl}verifyAccount/:token`}  component={VerifyAccount} />

          {/* Dashboard Pages Start */}
          <Route path={`${config.baseUrl}dashboard`}  component={Dashboard} />
          <Route path={`${config.baseUrl}dispute_management`}  component={DisputeManagement} />
          <Route path={`${config.baseUrl}kyc`}  component={Kyc} />
          <Route path={`${config.baseUrl}kyc_details`}  component={KycDetails} />
          <Route path={`${config.baseUrl}referral`}  component={Referral} />
          <Route path={`${config.baseUrl}support`}  component={Support} />
          <Route path={`${config.baseUrl}supportChat/:ticket`}  component={SupportChat} />
          <Route path={`${config.baseUrl}trading_guides`}  component={TradingGuides} />
          <Route path={`${config.baseUrl}trade/:id`}  component={Trade} />
          <Route path={`${config.baseUrl}trade_process/:id`}  component={TradeProcess} />
          <Route path={`${config.baseUrl}datatable`}  component={Datatable} />
          <Route path={`${config.baseUrl}ContactUs`}  component={ContactUs} />
          <Route path={`${config.baseUrl}myActivity`}  component={myActivity} />
          <Route path={`${config.baseUrl}googleAuth`}  component={googleAuth} />
          
        </Switch>
      </div>
    </BrowserRouter>

  );
}
export default App;