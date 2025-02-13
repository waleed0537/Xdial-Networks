import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ContactForm from './Components/KYCForm';
import SensaiTemplate from './Components/SensaiTemplate';
import AIBotService from './Components/AIBotService';
import AutoDialerService from './Components/AutoDialerService';

function App() {
  return (
    <Router>
       <Routes>
        <Route path="/" element={<SensaiTemplate />} />
        <Route path="/contact-form" element={<ContactForm />} />
        <Route path="/ai-bot-voip" element={<AIBotService />} />
        <Route path="/auto-dialer-service" element={<AutoDialerService />} />
      </Routes>
    </Router>
  );
}

export default App;