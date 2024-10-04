import '../styles/payment.css';
import React, { useState } from "react";
import { TbLockCheck } from "react-icons/tb";
import Card from '../img/card.svg';

function Payment() {
  const [activeButton, setActiveButton] = useState(null); // Состояние для отслеживания активной кнопки

  const handleButtonClick = (buttonIndex) => {
    setActiveButton(buttonIndex); // Установите индекс активной кнопки
  };
  const [cardNumber, setCardNumber] = useState('');
  const [expiryMonth, setExpiryMonth] = useState('01'); // Месяц по умолчанию
  const [expiryYear, setExpiryYear] = useState('');
  const [securityCode, setSecurityCode] = useState('');

  const handleCardInput = (e) => {
    let value = e.target.value.replace(/\D/g, '');
    value = value.replace(/(.{4})/g, '$1 ').trim();
    setCardNumber(value);
  };

  const handleYearChange = (e) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length <= 4) {
      setExpiryYear(value);
    }
  };

  const handleSecurityCodeChange = (e) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length <= 3) {
      setSecurityCode(value);
    }
  };

  const handleMonthChange = (e) => {
    setExpiryMonth(e.target.value);
  };
  return (
    <div className="payconteiners">
      <div className="payment-cont1">
        <div className="cont1-txt">Choose a payment plan: </div>
        <button className={`cont1-plan1 ${activeButton === 1 ? 'active' : ''}`} onClick={() => handleButtonClick(1)}>
          <div>Creation of your first portfolio, without download</div>
          <div className="cost">US$0</div>
          <div className="italic">The perfect plan to try out our generator and evaluate the results</div>
        </button>
        <button className={`cont1-plan2 ${activeButton === 2 ? 'active' : ''}`} onClick={() => handleButtonClick(2)}>
          <div>Creation of 5 first portfolio, with download</div>
          <div className="cost">US$1</div>
          <div className="italic">A good plan for you if you are actively looking for a job right now</div>
        </button>
        <button className={`cont1-plan3 ${activeButton === 3 ? 'active' : ''}`} onClick={() => handleButtonClick(3)}>
          <div>Creation of 50 portfolio, with download</div>
          <div className="cost">US$5</div>
          <div className="italic">The right plan for you if you need to choose from several options or if you regularly change spheres of activity.</div>
        </button>
        <div className="cont1-txt-1">
          <TbLockCheck className="lockCheck" />
          <div>Secure transaction</div>
          <button>Continue</button>
        </div>
      </div>

      <div className="payment-cont2">
        <div className="cont2-txt1">Your email:</div>
        <div className="cont2-txt2">Payment information will be sent to this address</div>
        <div className="cont2-txt3">Your Country/Region:</div>
        <input type="email" id="email" name="email" className="pay-email" placeholder="example@example.com" required></input>
        <select id="country" name="country" className="country">
          <option value="bl">Belarus</option>
          <option value="us">United States</option>
          <option value="ca">Canada</option>
          <option value="uk">United Kingdom</option>
          <option value="au">Australia</option>
          <option value="de">Germany</option>
          <option value="fr">France</option>
          <option value="jp">Japan</option>
          <option value="ru">Russia</option>
          <option value="pl">Poland</option>
        </select>
        <div className="card-container">
          <img src={Card} alt="Bank Card" className="bankcard" />
          <div className="form-fields">
            <div>

              <input type="text" id="cardNumber" className="card-input" value={cardNumber} onChange={handleCardInput}
                maxLength="19" placeholder="YYYY YYYY YYYY YYYY" required />
            </div>
            <div>
              <select id="expiryMonth" value={expiryMonth} onChange={handleMonthChange} required className="select-month">
                <option value="01">January</option>
                <option value="02">February</option>
                <option value="03">March</option>
                <option value="04">April</option>
                <option value="05">May</option>
                <option value="06">June</option>
                <option value="07">July</option>
                <option value="08">August</option>
                <option value="09">September</option>
                <option value="10">October</option>
                <option value="11">November</option>
                <option value="12">December</option>
              </select>
              <input type="text" id="expiryYear" className="years" value={expiryYear} onChange={handleYearChange} maxLength="4" placeholder="YYYY" required />

              <div className="card-holder">Not required</div>
            </div>
            <input type="text" id="securityCode" className="cvc" value={securityCode} onChange={handleSecurityCodeChange} maxLength="3" placeholder="YYY" required />
          </div>
          <div className="pay-line"></div>
        </div>
        <div className="cont2-txt4">
          <div>By proceeding to purchase, you are entering into an agreement with Corp. Ilya&Masha under the</div>
          <div>terms specified below.</div>
          <div className="cont2-txt4-1">Personal data required in the order form is needed for entering into the agreement with us and</div>
          <div>delivery of the products or services (unless marked optional). We will process the personal data as</div>
          <div>described in our Privacy Policy. We may use Third-Party Services for the described purposes.</div>
          <div className="checkbox-container">
            <label>
              <span className="checkbox-label">I have read and agree</span>
              <input type="checkbox" className="checkbox" />
            </label>
          </div>
          <button>Order and Pay</button>
        </div>

      </div>
    </div>


  )
}
 
export default Payment;