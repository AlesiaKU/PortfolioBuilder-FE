import '../styles/faq.css';
import React, { useState } from 'react';
import FAQ1 from '../img/FAQ1.svg';




function FAQ() {
  return (
    <div className="FAQ-page">
      <div className="faqBan1">
      <div className="faq-txt1">
          <div className="faq-txt1-1">Frequently </div>
          <div className="faq-txt1-2">asked <span style={{ color: '#4CAF4F' }}>questions!</span></div>
          <div className="faq-txt1-3">Find your question here!</div>
        </div>
        <img src={FAQ1} className="faq-phot1" alt="FAQ" />
      </div>
    </div>
  )
}

export default FAQ;