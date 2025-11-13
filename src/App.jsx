import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import KYCForm from './Components/KYCForm';
import SensaiTemplate from './Components/SensaiTemplate';
import AIBotService from './Components/AIBotService';
import AutoDialerService from './Components/AutoDialerService';
import LiteService from './Components/ServiceDetailPages/LiteService';
import PlusService from './Components/ServiceDetailPages/PlusService';
import UltraService from './Components/ServiceDetailPages/UltraService';
import CustomService from './Components/ServiceDetailPages/CustomService';
import ContactForm from './Components/ContactForm';
import AutoDialer from './Components/AutoDialer';
import VoIPSolutions from './Components/VoIPSolutions';
import IntegrationForm from './Components/IntegrationForm';
import AdminDashboard from './Components/AdminDashboard';
import AdminLogin from './Components/Login';
import ClientDashboard from './Components/ClientDashboard';
import Onboarding from './Components/Onboarding';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SensaiTemplate />} />
        <Route path="/kyc-form" element={<KYCForm />} />
        <Route path="/ai-bot-voip" element={<AIBotService />} />
        <Route path="/auto-dialer-service" element={<AutoDialerService />} />
        
        {/* New Service Detail Routes */}
        <Route path="/services/lite" element={<LiteService />} />
        <Route path="/services/plus" element={<PlusService />} />
        <Route path="/services/ultra" element={<UltraService />} />
        <Route path="/services/custom" element={<CustomService />} />
        <Route path="/contact-form" element={<ContactForm />} />
        <Route path="/auto-dialer" element={<AutoDialer />} />
        <Route path="/voip-solutions" element={<VoIPSolutions />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        
        {/* Integration Form Route */}
        <Route path="/integration-form" element={<IntegrationForm />} />
        <Route path="/onboarding" element={<Onboarding />} />
      </Routes>
    </Router>
  );
}

export default App;