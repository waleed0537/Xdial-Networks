import React from 'react';
import { Headphones, PhoneIncoming, PhoneOutgoing, Bot } from 'lucide-react';
import shape55 from '../assets/images/shape/shape-55.png';

const FeaturesSection = () => {
    return (
      <section className="feature-style-three pb_120 centred">
        <div className="auto-container">
          <div className="sec-title mb_55">
            <h2>Comprehensive Call Center Solutions</h2>
            <p>We offer holistic solutions that you need to optimize your call center's performance and productivity.</p>
          </div>
          <div className="inner-container">
            <div className="shape" style={{ backgroundImage: `url(${shape55})` }}></div>
            <div className="row clearfix">
              
              <div className="col-lg-3 col-md-6 col-sm-12 feature-block">
                <div className="feature-block-two">
                  <div className="inner-box">
                    <div className="icon-box">
                      <Bot size={24} className="icon-bot" />
                    </div>
                    <h3><a href="#">AI Agent</a></h3>
                    <p>Revolutionize customer interactions with AI-powered agents that provide instant, intelligent, and personalized responses.</p>
                  </div>
                </div>
              </div>

              <div className="col-lg-3 col-md-6 col-sm-12 feature-block">
                <div className="feature-block-two">
                  <div className="inner-box">
                    <div className="icon-box">
                      <PhoneIncoming size={24} className="icon-phone-incoming" />
                    </div>
                    <h3><a href="#">Inbound</a></h3>
                    <p>Effortlessly manage and route incoming calls with precision, ensuring seamless customer support and satisfaction.</p>
                  </div>
                </div>
              </div>
              
              <div className="col-lg-3 col-md-6 col-sm-12 feature-block">
                <div className="feature-block-two">
                  <div className="inner-box">
                    <div className="icon-box">
                      <PhoneOutgoing size={24} className="icon-phone-outgoing" />
                    </div>
                    <h3><a href="#">Outbound</a></h3>
                    <p>Maximize outreach efficiency with crystal-clear VoIP calls and premium SIP trunking for global connectivity.</p>
                  </div>
                </div>
              </div>
              
              <div className="col-lg-3 col-md-6 col-sm-12 feature-block">
                <div className="feature-block-two">
                  <div className="inner-box">
                    <div className="icon-box">
                      <Headphones size={24} className="icon-headset" />
                    </div>
                    <h3><a href="#">Cloud Telephony</a></h3>
                    <p>Empower your agents with seamless, cloud-based communication tools designed for speed, efficiency, and scalability.</p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>
    );
};

export default FeaturesSection;
