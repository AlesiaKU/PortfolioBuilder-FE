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
  const [activePlan, setActivePlan] = useState(null); // состояние для отслеживания активного плана

  const handlePlanClick = (planNumber) => {
    setActivePlan(planNumber); // устанавливаем активный план при клике
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
          <div className='who-is'>Who is Ilya&Masha Corp. suitable for?</div>
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
            <div>Donec a eros justo. Fusce egestas tristique ultrices. Nam tempor, augue nec tincidunt</div>
            <div>molestie, massa nunc varius arcu, at scelerisque elit erat a magna. Donec quis erat at </div>
            <div>libero ultrices mollis. In hac habitasse platea dictumst. Vivamus vehicula leo dui, at porta </div>
            <div>nisi facilisis finibus. In euismod augue vitae nisi ultricies, non aliquet urna tincidunt. Integer</div>
            <div>in nisi eget nulla commodo faucibus efficitur quis massa. Praesent felis est, finibus et nisi </div>
            <div>ac, hendrerit venenatis libero. Donec consectetur faucibus ipsum id gravida.</div>
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
            <div>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet justo ipsum. Sed </div>
            <div>accumsan quam vitae est varius fringilla. Pellentesque placerat vestibulum lorem sed  </div>
            <div>porta. Nullam mattis tristique iaculis. Nullam pulvinar sit amet risus pretium auctor. Etiam </div>
            <div>quis massa pulvinar, aliquam quam vitae, tempus sem. Donec elementum pulvinar odio.</div>
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
          <Link to="/payment" className={`inner-btn ${activePlan === 1 ? 'active-btn' : ''}`}>Get started</Link>
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
          <Link to="/payment" className={`inner-btn ${activePlan === 2 ? 'active-btn' : ''}`}>Get started</Link>
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
          <Link to="/payment" className={`inner-btn ${activePlan === 3 ? 'active-btn' : ''}`}>Get started</Link>
        </button>
      </div>
    </div>
  )
}

export default Home;