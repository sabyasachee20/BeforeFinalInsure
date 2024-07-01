import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';


import AutoInsurance from './autoinsurance';
import TermPolicyDetails from './terminsurance';
import HealthInsurance from './healthinsurance';
import HealthPolicyForm from './healthform';
import AutoPolicyForm from './autoform';
import TermPolicyForm from './termpolicyform';
import MyPolicies from './mypolicy';
import PolicyDetails from './policydetails';
import PolicyRenewal from './renew';
import AutoClaim from './autoclaim';
import HealthClaim from './healthclaim';
import UserLogin from './user';
import Customers from './Customer';
import CustomerDetails from './customerDetails';
import Buy from './buy';
import PurchaseDetails from './purchaseDetails';
import Claim from './claim';
import ClaimDetails from './claimdetails';
import EditProfile from './adminProfile';
import AdminLogin from './admin';
import Section2 from './section2';
import Navbar from './navbar';
import AdminNav from './adminnav';
import Main from './admindashboard';
import { AppProvider } from './AppContext';
import ViewTickets from './viewTickets';
import Help from './help';
import LoginComponent from './login';


const App1 = () => {
  return (
    <Router>
      <Routes>
        <Route path="/*" element={<UserRoutes />} />
        <Route path="/admin/*" element={<AdminRoutes />} />
      </Routes>
    </Router>
  );
};

const UserRoutes = () => {
  return (
    <div className='page'>
        <AppProvider>
      <Navbar/>
      <Routes>
        
        <Route path='/' element={<Navbar />} />
        <Route path="/autoinsurance" element={<AutoInsurance />} />
        <Route path="/terminsurance" element={<TermPolicyDetails />} />
        <Route path="/healthinsurance" element={<HealthInsurance />} />
        <Route path="/health-policy-form" element={<HealthPolicyForm />} />
        <Route path="/auto-policy-form" element={<AutoPolicyForm />} />
        <Route path="/term-policy-form" element={<TermPolicyForm/>} />
        <Route path="/mypolicies" element={<MyPolicies />} />
        <Route path="/policydetails" element={<PolicyDetails />} />
        <Route path="/renew" element={<PolicyRenewal/>} />
        <Route path="/autoclaim" element={<AutoClaim />} />
        <Route path="/healthclaim" element={<HealthClaim />} />
        <Route path="/user-login" element={<UserLogin />} />
        <Route path="/section2" element={<Section2/>} />
        <Route path="/viewTickets" element={<ViewTickets/>} />
        <Route path="/helpme" element={<Help/>} />
        {/* Redirect to user login if no route matches */}
        <Route path="*" element={<Navigate to="/user-login" />} />
      </Routes>
      </AppProvider>
    </div>
  );
};

const AdminRoutes = () => {
  return (
    <div className='page'>
      <AdminNav/>
      <div className='admincontent'>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/customer-details" element={<CustomerDetails/>} />
          <Route path="/buy" element={<Buy />} />
          <Route path="/purchase-details" element={<PurchaseDetails />} />
          <Route path="/claim" element={<Claim/>} />
          <Route path="/claim-details" element={<ClaimDetails />} />
          <Route path="/edit" element={<EditProfile />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/admindashboard" element={<Main />} />
      
          {/* Redirect to admin login if no route matches */}
          <Route path="*" element={<Navigate to="/admin" />} />
        </Routes>
      </div>
    </div>
  );
};

export default App1;
