import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ContactForm from './Components/KYCForm';
import SensaiTemplate from './Components/SensaiTemplate';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SensaiTemplate />} />
        <Route path="/contact-form" element={<ContactForm />} />
      </Routes>
    </Router>
  );
}

export default App;