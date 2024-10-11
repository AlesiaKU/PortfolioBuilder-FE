import '../styles/home.css';
import { Link } from 'react-router-dom'; // Добавляем импорт Link
import banner1Image1 from '../img/Illustration.png';
import banner2Image1 from '../img/Icon1.png';
import banner2Image2 from '../img/Icon2.png';
import banner2Image3 from '../img/Icon3.png';
import banner3Image1 from '../img/pana.png';
import banner4Image1 from '../img/rafiki.png';
import banner6Image1 from '../img/Group39506.svg';
import { GoPeople } from "react-icons/go";
import { CiCreditCard1 } from "react-icons/ci";
import React, { useState } from 'react';
import { FaCheckCircle } from "react-icons/fa";
import { IoMdCloseCircle } from "react-icons/io";



function Home() {
  const [activePlan, setActivePlan] = useState(null);

  const handlePlanClick = (planNumber) => {
    setActivePlan(planNumber); 
  };

  return (
    <div className="Home">
      <div className="banner1-home">
        <div className="text-ban1">
          <div>Create your portfolio</div>
          <div className="min15"> in 15 minutes</div>
          <div className="we-help">We help everyone who wants to find a job without difficulties!</div>
          <Link to="/register" className='ban1-btn-reg'>Register</Link>
        </div>
        <img src={banner1Image1} alt="Banner1-home" className="banner-img1-home" />
      </div>
      <div className="banner2-home">
        <div className='text-ban2'>
          <div>Create your portfolio </div>
          <div>in a single system</div>
          <div className='who-is'>Who is PortfolioBuilder suitable for?</div>
        </div>
        <div className="icon-text-ban2">
          <div className="icon-text-ban2-1">
            <img src={banner2Image1} className="banner2-img1-home" />
            <div className='text-ban2-1'>
              <div>A student without </div>
              <div>job?</div>
            </div>
            <div className='text-ban2-1-1'>
              <div >Our software help you crete your firs</div>
              <div >portfolio even without job experience</div>
            </div>
          </div>
          <div className="icon-text-ban2-2">
            <img src={banner2Image2} className="banner2-img2-home" />
            <div className='text-ban2-2'>
              <div>Want to change</div>
              <div>profession?</div>
            </div>
            <div className='text-ban2-2-2'>
              <div >Our software provides the creation</div>
              <div >of a portfolio based on existing </div>
              <div>experience</div>
            </div>

          </div>
          <div className="icon-text-ban2-3">
            <img src={banner2Image3} className="banner2-img3-home" />
            <div className='text-ban2-3'>
              <div>Don’t know what</div>
              <div>you want?</div>
            </div>
            <div className='text-ban2-3-3'>
              <div >Our software will help you decide on</div>
              <div >a profession based on your  </div>
              <div>preferences</div>
            </div>
          </div>

        </div>
      </div>
      <div className="banner3-home">
        <img src={banner3Image1} />
        <div className='text-banner3'>
          <div className='text-ban3-1'>
            <div>How you can create a portfolio in</div>
            <div>our software</div>
          </div>

          <div className='text-6line'>
          Creating a portfolio in our software is quick and easy. First, choose one of our customized plans
depending on your needs — whether you are looking for a free option or a premium plan with advanced
features. After selecting a plan, you will be asked to enter your portfolio data, such as personal
such as personal data, project descriptions, and images. If you have chosen a paid plan, you will
need to complete the secure payment process before moving on. After confirming the payment, you will
have full access to customize the design and layout of your portfolio. You can customize each
element according to your style and professional needs. Finally, review your portfolio, make the latest
changes, and you're ready to publish it and share it with potential clients or employers. It's so easy!
          </div>
          <button>Learn More</button>

        </div>
      </div>
      <div className="banner4-home">
        <img src={banner4Image1} />
        <div className='text-banner4'>
          <div className='text-ban4-1'>
            How it works?
          </div>

          <div className='text-4line'>
          Our application simplifies the process of creating a portfolio in just a few steps.
First, you choose the plan that suits your needs, free or paid. Then enter data about your
project and customize the layout according to your style. Finally, if you have chosen a paid plan,
complete the payment and your portfolio is ready to be published worldwide!
          </div>
          <button>Learn More</button>

        </div>
      </div>
      <div className="banner5-home">
        <div className='text-banner5'>
          <div>We doing our job </div>
          <div className='great'>Great</div>
          <div className='we'>We reached here with our hard work and dedication</div>
        </div>
        <div className='icon-text-ban5'>
          <div className='icon-text-ban5-1'>
            <GoPeople className="banner5-home-icons" />
            <div className='icon-text-ban5-1-1'>
              <p>2,245,341</p>
              <p className='p2'>Users</p>
            </div>
          </div>
          <div className='icon-text-ban5-2'>
            <CiCreditCard1 className="banner5-home-icons" />
            <div className='icon-text-ban5-1-1'>
              <p>1,926,436</p>
              <p className='p2'>Payments</p>
            </div>
          </div>
        </div>

      </div>
      <div className="banner6-home">
        <div className="ban6-home-name">
          <div className="ban6-home-name1">PRICING</div>
          <div className="ban6-home-name2">Our pricing plans</div>
        </div>
        <button
          className={`plan plan1 ${activePlan === 1 ? 'active' : ''}`}
          onClick={() => handlePlanClick(1)}
        >
          <div className="circle-rec">
            <div className="half-circle1"></div>
            <div className="half-circle2"></div>
          </div>
          <div className="text-plan1-1">
            <div className="text-plan1-1-1">For individuals</div>
            <div className="text-plan1-1-2">Basic</div>
          </div>
          <div className="text-plan1-2">
            <div>Creation of your first portfolio,</div>
            <div>without download</div>
          </div>
          <div className="text-plan1-3">
            <div className="text-plan1-3-1">$0</div>
            <div className="text-plan1-3-2">What’s included</div>
            <div className="check">
              <FaCheckCircle className="eleps-chek" />
              <div className="eleps-chek-text">One portfolio generating</div>
            </div>

            <div className="crosss">
              <IoMdCloseCircle className="eleps-cross" />
              <div className="cross-text-dov">Downloading</div>
            </div>
          </div>
          <Link to="/generator#gener-plan1" className={`inner-btn ${activePlan === 1 ? 'active-btn' : ''}`}>Get started</Link>
        </button>

        <button
          className={`plan plan2 ${activePlan === 2 ? 'active' : ''}`}
          onClick={() => handlePlanClick(2)}
        >
          <div className="rectangle">
            <div className="rectang1"></div>
            <div className="rectang-container">
              <div className="rectang2"></div>
              <div className="rectang3"></div>
            </div>
          </div>
          <div className="text-plan2-1">
            <div className="text-plan2-1-1">For startups</div>
            <div className="text-plan2-1-2">Pro</div>
          </div>
          <div className="text-plan2-2">
            <div>Creation of 5 first portfolio, with</div>
            <div>download</div>
          </div>
          <div className="text-plan2-3">
            <div className="text-plan2-3-1">$1</div>
            <div className="text-plan2-3-2">What’s included</div>
            <div className="check">
              <FaCheckCircle className="eleps-chek" />
              <div className="eleps-chek-text">Five portfolio generating</div>
            </div>

            <div className="check2">
              <FaCheckCircle className="eleps-chek" />
              <div className="eleps-chek-text-2">Downloading</div>
            </div>


          </div>
          <Link to="/generator#gener-plan2" className={`inner-btn ${activePlan === 2 ? 'active-btn' : ''}`}>Get started</Link>
        </button>

        <button
          className={`plan plan3 ${activePlan === 3 ? 'active' : ''}`}
          onClick={() => handlePlanClick(3)}
        >
          <div className="rectangle-pl3">
            <img src={banner6Image1} className="banner6-img1-home" />
          </div>
          <div className="text-plan3-1">
            <div className="text-plan3-1-1">For big companies</div>
            <div className="text-plan3-1-2">Enterprise</div>
          </div>
          <div className="text-plan3-2">
            <div>Creation of 50 portfolio, with </div>
            <div>download</div>
          </div>
          <div className="text-plan3-3">
            <div className="text-plan3-3-1">$5</div>
            <div className="text-plan3-3-2">What’s included</div>
            <div className="check">
              <FaCheckCircle className="eleps-chek" />
              <div className="eleps-chek-text">Fivety portfolio generating</div>
            </div>

            <div className="check2">
              <FaCheckCircle className="eleps-chek" />
              <div className="eleps-chek-text-2">Downloading</div>
            </div>


          </div>
          <Link to="/generator#gener-plan3" className={`inner-btn ${activePlan === 3 ? 'active-btn' : ''}`}>Get started</Link>
        </button>
      </div>
    </div>
  )
}

export default Home;