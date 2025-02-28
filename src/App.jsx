import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ContactForm from './Components/KYCForm';
import SensaiTemplate from './Components/SensaiTemplate';
import AIBotService from './Components/AIBotService';
import AutoDialerService from './Components/AutoDialerService';
import LiteService from './Components/ServiceDetailPages/LiteService';
import PlusService from './Components/ServiceDetailPages/PlusService';
import UltraService from './Components/ServiceDetailPages/UltraService';
import CustomService from './Components/ServiceDetailPages/CustomService';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SensaiTemplate />} />
        <Route path="/kyc-form" element={<ContactForm />} />
        <Route path="/ai-bot-voip" element={<AIBotService />} />
        <Route path="/auto-dialer-service" element={<AutoDialerService />} />
        
        {/* New Service Detail Routes */}
        <Route path="/services/lite" element={<LiteService />} />
        <Route path="/services/plus" element={<PlusService />} />
        <Route path="/services/ultra" element={<UltraService />} />
        <Route path="/services/custom" element={<CustomService />} />
      </Routes>
    </Router>
  );
}

export default App;