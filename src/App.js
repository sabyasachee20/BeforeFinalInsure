import logo from './logo.svg';
import './App.css';
// import LoginComponent from './login';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Customers from './admin/Customer';
import CustomerDetails from './admin/customerDetails';
import Buy from './admin/buy';
import PurchaseDetails from './admin/purchaseDetails';
import Claim from './admin/claim';
import ClaimDetails from './admin/claimdetails';
import Section2 from './Userinterface/Userlandingfooter';

import AutoInsurance from './Userinterface/buynow/userautoinsurance';
import TermPolicyDetails from './Userinterface/buynow/userlifeinsurance';
import HealthInsurance from './Userinterface/buynow/userhealthinsurance';
import HealthPolicyForm from './Userinterface/purchaserequests/healthform';
import AutoPolicyForm from './Userinterface/purchaserequests/autoform';
import TermPolicyForm from './Userinterface/purchaserequests/termpolicyform';
import MyPolicies from './Userinterface/mypolicy';
import PolicyDetails from './Userinterface/policydetails';
import PolicyRenewal from './Userinterface/renew/renew';
import SolvedTickets from './agent/viewTickets';
import AutoClaim from './Userinterface/claims/Userautoclaim';
import HealthClaim from './Userinterface/claims/healthclaim';
import TermClaim from './Userinterface/claims/termclaim';
import SecurePayment from './Userinterface/payment/securePayment';
import PaymentHistory from './Userinterface/payment/payementHistory';
import OpenTickets from './agent/opentickets';
import AgentClosedTicket from './agent/closetickets';
import ViewOpenTickets from './agent/viewopentickets';
import ViewClosedTickets from './agent/viewclosedtickets';
import Dashmain from './agent/dashmain';

import Admindashboard from './admin/admindashboard';

import Help from './agent/help';
import Navbar1 from './Userinterface/Usernavbar';
// import DashboardComponent from './dashboard';
import { AppProvider } from './AppContext';
import UserLogin from './loginpages/userlogin';
import AdminLogin from './loginpages/adminlogin';
import AgentLogin from './loginpages/agentlogin';
import GuestNavbar from './guesthome/guestnavbar';
import DashboardComponent from './loginpages/dashboard';
import ForgetPasswordComponent from './loginpages/ForgetPassword';
import Dasb from './agent/dashside';
import AgentNavbar from './agent/agentnav';
import GuestFooter from './guesthome/guestfooter';
import AdminNav from './admin/adminnav';
import SignupComponent from './loginpages/signup/signupcomponent';
import EditProfile from './admin/adminProfile';
import DashboardComponent1 from './loginpages/UserDashboard';
import Policies from './policycards';
import AboutUs from './guesthome/aboutus';
// import EditProfile from './admin/adminProfile';

 
function App() {
  
  return (
 
    <AppProvider>
       <Router>
            <Routes>
              <Route path="/admindashboard" element={<Admindashboard />} />
              <Route path="/customers" element={<Customers />} />
              <Route path="/customer-details" element={<CustomerDetails />} />
              <Route path="/buy" element={<Buy />} />
              <Route path="/purchase-details" element={<PurchaseDetails />} />
              <Route path="/claim" element={<Claim />} />
              <Route path="/claim-details" element={<ClaimDetails />} />
              <Route path="/edit" element={<EditProfile />} />
              {/* <Route path="/" element={<GuestFooter />} /> */}
            </Routes>
    </Router>
      <Router>
        <Routes>
          <Route path='/user' element={<UserLogin/>} />
          <Route path='/forget-password' element={<ForgetPasswordComponent/>}/>
          <Route path='/dashboard' element={<DashboardComponent/>}/>
          <Route path='/useredit' element={<DashboardComponent1/>}/>
          <Route path='/adminnav' element={<AdminNav/>}/>
          <Route path='/admin' element={<AdminLogin/>} />
          <Route path='/signup' element={<SignupComponent/>}/>
          <Route path='/section2' element={<Section2 />} />
          <Route path='/' element={<GuestFooter/>} />
          {/* <Route path='/' element={<Navbar1/>} /> */}
          <Route path='/dasb' element={<Dasb/>}/>
          <Route path='/helpme' element={<Help />} />
          <Route path="/autoinsurance" element={<AutoInsurance/>} />
          <Route path="/terminsurance" element={<TermPolicyDetails />} />
          <Route path="/healthinsurance" element={<HealthInsurance />} />
          <Route path="/health-policy-form" element={<HealthPolicyForm />} />
          <Route path="/auto-policy-form" element={<AutoPolicyForm />} />
          <Route path="/term-policy-form" element={<TermPolicyForm />} />
          <Route path="/mypolicies" element={<MyPolicies/>} />
          <Route path="/policydetails" element={<PolicyDetails />} />
          <Route path="/renew" element={<PolicyRenewal/>} />
          <Route path="/viewTickets" element={<SolvedTickets />} />
          <Route path="/autoclaim" element={<AutoClaim/>} />
          <Route path="/healthclaim" element={<HealthClaim />} />
          <Route path="/termclaim" element={<TermClaim/>} />
          <Route path="/payment" element={<SecurePayment />} />
          <Route path="/payment-history" element={<PaymentHistory />} />
          <Route path="/open-tickets" element={<OpenTickets />} />
                <Route path="/closed-tickets" element={<AgentClosedTicket />} />
                <Route path="/view-open-ticket/:ticketId" element={<ViewOpenTickets />} />
    
                <Route path="/view-closed-ticket" element={<ViewClosedTickets />} />
                <Route path="/agentdashboard" element={<Dashmain/>}/>
                <Route path='/agent' element={<AgentLogin/>} />
                <Route path='/agentnav' element={<AgentNavbar/>}/>
                <Route path='/dashmain' element={<Dashmain/>}/>
                <Route path="/closed-tickets" element={<SolvedTickets />} />
                <Route path="/aboutus" element={<AboutUs />} />
                {/* <Route path="/home" element={<GuestFooter />} /> */}
                
<Route path='/policycards' element={<Policies/>}/>
        </Routes>
        {/* /:ticketId */}
      </Router>
 
    </AppProvider>
 
 
  );
}
 
export default App;