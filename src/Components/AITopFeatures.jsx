import React from 'react';
import { Headphones, PhoneIncoming, PhoneOutgoing, Bot } from 'lucide-react';
import shape55 from '../assets/images/shape/shape-55.png';

const FeaturesSection = () => {
    return (
      <section className="feature-style-three pb_120 centred">
        <div className="auto-container">
          <div className="sec-title mb_55">
            <span className="sub-title">Our Solutions</span>
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
                      <Headphones size={24} className="icon-headset" />
                    </div>
                    <h3><a href="#">Cloud Telephony</a></h3>
                    <p>Increase agents efficiency, more talk time less wait time with our automated dialer solution.</p>
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
                    <p>Quickly find and allocate a number to your account with absolute ease by accessing our user-friendly web portal.</p>
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
                    <p>High quality US domestic VoIP Calls and A-Z SIP termination trunk routes.</p>
                  </div>
                </div>
              </div>
              
              <div className="col-lg-3 col-md-6 col-sm-12 feature-block">
                <div className="feature-block-two">
                  <div className="inner-box">
                    <div className="icon-box">
                      <Bot size={24} className="icon-bot" />
                    </div>
                    <h3><a href="#">AI Bot</a></h3>
                    <p>Intelligent automated responses and support using advanced AI technology to enhance customer service efficiency.</p>
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