import '../styles/home.css';
import { Link } from 'react-router-dom'; 
import banner1Image1 from '../img/Group7.svg';
import banner2Image1 from '../img/Icon1.png';
import banner2Image2 from '../img/Icon2.png';
import banner2Image3 from '../img/Icon3.png';
import banner6Image1 from '../img/Group39506.svg';
import portfolImg3 from '../img/portfolImg/cv-templates-resumelab_impetus@2x.png';
import portfolImg4 from '../img/portfolImg/d7a3fea6fc363bcfa0efd9b5e6386c02.jpg';
import portfolImg5 from '../img/portfolImg/example-cv-it-e9e9e9.jpg';
import portfolImg7 from '../img/portfolImg/Снимок экрана 2025-04-10 002947.png';
import portfolImg8 from '../img/portfolImg/Снимок экрана 2025-04-10 003022.png';
import portfolImg9 from '../img/portfolImg/Снимок экрана 2025-04-10 003209.png';
import banner4Image1 from '../img/rafiki.png';
import { GoPeople } from "react-icons/go";
import { CiCreditCard1 } from "react-icons/ci";
import React, { useEffect, useRef, useState } from 'react';
import { FaCheckCircle } from "react-icons/fa";
import { IoMdCloseCircle } from "react-icons/io";
import { useTranslation } from 'react-i18next';
import { IoIosArrowForward } from "react-icons/io";
import { useLocation } from 'react-router-dom';


const Counter = ({ target, duration }) => {
  const [count, setCount] = useState(0);
  const ref = useRef();
  const [hasAnimated, setHasAnimated] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          let start = 0;
          const step = Math.ceil(target / (duration / 30)); // update every 30ms
          setCount(0);

          const interval = setInterval(() => {
            start += step;
            if (start >= target) {
              start = target;
              clearInterval(interval);
            }
            setCount(start);
          }, 30);

          setHasAnimated(true);
        }
      },
      { threshold: 0.5 }
    );

    const current = ref.current;
    if (current) observer.observe(current);

    return () => {
      if (current) observer.unobserve(current);
    };
  }, [target, duration]);

  // Прокрутка при переходе по якорю
  useEffect(() => {
    if (location.hash) {
      const elementId = location.hash.substring(1);
      const element = document.getElementById(elementId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location]);

  return <p ref={ref}>{count.toLocaleString()}</p>;
};


function Home() {
  const [activePlan, setActivePlan] = useState(null);


  const { t } = useTranslation();
  const handlePlanClick = (planNumber) => {
    setActivePlan(planNumber); 
  };

  const [activeIndex, setActiveIndex] = useState(0);
  
     const toggleAnswer = (index) => {
       if (index === activeIndex) {
         setActiveIndex(null); 
       } else {
         setActiveIndex(index); 
       }
     };

  return (
    <div className="Home">
      <div className="banner1-home">
        <div className="text-ban1">
          <div>{t('homePage.createPortfolio')}</div>
          <div className="min15">{t('homePage.inMinutes')}</div>
          <div className="we-help">{t('homePage.helpMessage')}</div>
          <Link to="/register" className='ban1-btn-reg'>{t('homePage.register')}</Link>
        </div>
        <img src={banner1Image1} alt="Banner1-home" className="banner-img1-home" />
      </div>
      <div className="banner2-home">
        <div className='text-ban2'>
          <div>{t('homePage.createSingleSystem')}</div>
          <div>{t('homePage.createSingleSystem1')}</div>
          <div className='who-is'>{t('homePage.suitableFor')}</div>
        </div>
        <div className="icon-text-ban2">
          <div className="icon-text-ban2-1">
            <img src={banner2Image1} className="banner2-img1-home" />
            <div className='text-ban2-1'>
              <div>{t('homePage.studentNoJob')}</div>
              <div>{t('homePage.noJob')}</div>
            </div>
            <div className='text-ban2-1-1'>
              <div >{t('homePage.studentHelp')}</div>
              <div >{t('homePage.stHelp2')}</div>
            </div>
          </div>
          <div className="icon-text-ban2-2">
            <img src={banner2Image2} className="banner2-img2-home" />
            <div className='text-ban2-2'>
              <div>{t('homePage.changeProfession')}</div>
              <div>{t('homePage.chprof')}</div>
            </div>
            <div className='text-ban2-2-2'>
              <div >{t('homePage.changeHelp')}</div>
              <div >{t('homePage.change1Help')}</div>
              <div>{t('homePage.change2Help')}</div>
            </div>

          </div>
          <div className="icon-text-ban2-3">
            <img src={banner2Image3} className="banner2-img3-home" />
            <div className='text-ban2-3'>
              <div>{t('homePage.undecided')}</div>
              <div>{t('homePage.undecided1')}</div>
            </div>
            <div className='text-ban2-3-3'>
              <div >{t('homePage.undecidedHelp')}</div>
              <div >{t('homePage.undecidedHelp1')} </div>
              <div>{t('homePage.undecidedHelp2')}</div>
            </div>
          </div>

        </div>
      </div>
      <div className="banner3-home">
      <div className="photo-strips">
  <div className="photo-track">
  <div className="track track-1">
  <img src={portfolImg9} />
  <img src={portfolImg8} />
  <img src={portfolImg3} />
  <img src={portfolImg4} />
  <img src={portfolImg5} />
  <img src={portfolImg7} />
  </div>
  </div>

  <div className="photo-track">
  <div className="track track-2">
  <img src="https://s3.resume.io/cdn-cgi/image/width=384,format=auto/uploads/local_template_image/image/383/persistent-resource/santiago-resume-templates.jpg?v=1656070649" />
  <img src={portfolImg8} />
  <img src={portfolImg9} />
  <img src={portfolImg3} />
  <img src={portfolImg5} />
  <img src={portfolImg4} />
  <img src={portfolImg7} />
  </div>
  </div>
</div>
        <div className='text-banner3'>
          <div className='text-ban3-1'>
            <div>{t('homePage.howCreatePortfolio')}</div>
            <div>{t('homePage.howCreatePortfolio1')}</div>
          </div>

          <div className='text-6line'>
          {t('homePage.createPortfolioDesc')}</div>
          <Link to="/generator#block-container" className="learnMoreBtn">{t('homePage.learnMore')}</Link>


          <div className='text-banner4'>
          <div className='text-ban4-1'>
          {t('homePage.howItWorks')} </div>

          <div className='text-4line'>
          {t('homePage.howItWorksDesc')} </div>
          <Link to="/generator#block-container" className="learnMoreBtn">{t('homePage.learnMore')}</Link>

        </div>
        </div>
      </div>
      <div className="banner5-home">
        <div className='text-banner5'>
          <div>{t('homePage.weDoingGreat')}</div>
          <div className='great'>{t('homePage.great')}</div>
          <div className='we'>{t('homePage.reachedHere')}</div>
        </div>
        <div className='icon-text-ban5'>
          <div className='icon-text-ban5-1'>
            <GoPeople className="banner5-home-icons" />
            <div className='icon-text-ban5-1-1'>
            <Counter target={2245341} duration={2000} />
              <p className='p2'>{t('homePage.usersCount')}</p>
            </div>
          </div>
          <div className='icon-text-ban5-2'>
            <CiCreditCard1 className="banner5-home-icons" />
            <div className='icon-text-ban5-1-1'>
            <Counter target={1926436} duration={2000} />
              <p className='p2'>{t('homePage.paymentsCount')}</p>
            </div>
          </div>
        </div>

      </div>
      <div className="banner6-home">
        <div className="ban6-home-name">
          <div className="ban6-home-name1">{t('homePage.pricing')}</div>
          <div className="ban6-home-name2">{t('homePage.pricingPlans')}</div>
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
            <div className="text-plan1-1-1">{t('homePage.forIndividuals')}</div>
            <div className="text-plan1-1-2">{t('homePage.basic')}</div>
          </div>
          <div className="text-plan1-2">
            <div>{t('homePage.basicDesc')}</div>
            <div>{t('homePage.basicDesc1')}</div>
          </div>
          <div className="text-plan1-3">
            <div className="text-plan1-3-1">$0</div>
            <div className="text-plan1-3-2">{t('homePage.whatsIncluded')}</div>
            <div className="check">
              <FaCheckCircle className="eleps-chek" />
              <div className="eleps-chek-text">{t('homePage.onePortfolio')}</div>
            </div>

            <div className="crosss">
              <IoMdCloseCircle className="eleps-cross" />
              <div className="cross-text-dov">{t('homePage.noDownload')}</div>
            </div>
          </div>
          <Link to="/generator#gener-plan1" className={`inner-btn ${activePlan === 1 ? 'active-btn' : ''}`}>{t('homePage.getStarted')}</Link>
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
            <div className="text-plan2-1-1">{t('homePage.forStartups')}</div>
            <div className="text-plan2-1-2">{t('homePage.pro')}</div>
          </div>
          <div className="text-plan2-2">
            <div>{t('homePage.proDesc')}</div>
            <div>{t('homePage.proDesc1')}</div>
          </div>
          <div className="text-plan2-3">
            <div className="text-plan2-3-1">$1</div>
            <div className="text-plan2-3-2">{t('homePage.whatsIncluded')}</div>
            <div className="check">
              <FaCheckCircle className="eleps-chek" />
              <div className="eleps-chek-text">{t('homePage.fivePortfolios')}</div>
            </div>

            <div className="check2">
              <FaCheckCircle className="eleps-chek" />
              <div className="eleps-chek-text-2">{t('homePage.noDownload')}</div>
            </div>


          </div>
          <Link to="/generator#gener-plan2" className={`inner-btn ${activePlan === 2 ? 'active-btn' : ''}`}>{t('homePage.getStarted')}</Link>
        </button>

        <button
          className={`plan plan3 ${activePlan === 3 ? 'active' : ''}`}
          onClick={() => handlePlanClick(3)}
        >
          <div className="rectangle-pl3">
            <img src={banner6Image1} className="banner6-img1-home" />
          </div>
          <div className="text-plan3-1">
            <div className="text-plan3-1-1">{t('homePage.forCompanies')}</div>
            <div className="text-plan3-1-2">{t('homePage.enterprise')}</div>
          </div>
          <div className="text-plan3-2">
            <div>{t('homePage.enterpriseDesc')}</div>
            <div>{t('homePage.enterpriseDesc1')}</div>
          </div>
          <div className="text-plan3-3">
            <div className="text-plan3-3-1">$5</div>
            <div className="text-plan3-3-2">{t('homePage.whatsIncluded')}</div>
            <div className="check">
              <FaCheckCircle className="eleps-chek" />
              <div className="eleps-chek-text">{t('homePage.fiftyPortfolios')}</div>
            </div>

            <div className="check2">
              <FaCheckCircle className="eleps-chek" />
              <div className="eleps-chek-text-2">{t('homePage.noDownload')}</div>
            </div>


          </div>
          <Link to="/generator#gener-plan3" className={`inner-btn ${activePlan === 3 ? 'active-btn' : ''}`}>{t('homePage.getStarted')}</Link>
        </button>
      </div>
          <div className="bann7" id="bann7">   
          <div className="ban6-home-name">
          <div className="ban6-home-name1">FAQ</div>
          <div className="ban6-home-name2">We already know</div>
          <div className="ban6-home-name2">what you're going to ask!</div>
        </div>     
            <div className="faq-container">
              <div className="questions">
                <div className={`question ${activeIndex === 0 ? 'active' : ''}`} onClick={() => toggleAnswer(0)} >
                  <div className="queCircle"></div>
                  <h3>What is a Payment Gateway?</h3>
                  <IoIosArrowForward  className="queArrow"/>
                </div>
                <div className={`question ${activeIndex === 1 ? 'active' : ''}`} onClick={() => toggleAnswer(1)} >
                  <div className="queCircle"></div>
                  <h3>Does Instapay provide international payments support?</h3>
                  <IoIosArrowForward  className="queArrow"/>
                </div>
                <div className={`question ${activeIndex === 2 ? 'active' : ''}`}onClick={() => toggleAnswer(2)}>
                  <div className="queCircle"></div>
                  <h3>Do I need to pay to Instapay even when there is no transaction going on in my business?</h3>
                  <IoIosArrowForward  className="queArrow"/>
                </div>
      
                <div className={`question ${activeIndex === 3 ? 'active' : ''}`} onClick={() => toggleAnswer(3)}>
                  <div className="queCircle"></div>
                  <h3>What platforms does Instapay payment gateway support?</h3>
                  <IoIosArrowForward  className="queArrow"/>
                </div>
      
                <div className={`question ${activeIndex === 4 ? 'active' : ''}`} onClick={() => toggleAnswer(4)} >
                  <div className="queCircle"></div>
                  <h3>Is there any setup fee or annual maintainance fee that I need to pay regularly?</h3>
                  <IoIosArrowForward  className="queArrow"/>
                </div>
              </div>
              <div className="answers">
                <div className={`answer ${activeIndex === 0 ? 'visible' : ''}`}>
                  <h2>What is a Payment Gateway?</h2>
                  <div className="ansN">
                    A payment gateway is an ecommerce service that processes online
                    payments for online as well as offline businesses. Payment gateways
                    help accept payments by transferring key information from their
                    merchant websites to issuing banks, card associations and online
                    wallet players.
                  </div>
                  <div>
                    Payment gateways play a vital role in the online transaction
                    process, which is the realisation of value, and hence are seen as
                    an important pillar of ecommerce.
                  </div>
                </div>
                <div className={`answer ${activeIndex === 1 ? 'visible' : ''}`}>
                <h2>What is a Payment Gateway?</h2>
                  <div className="ansN">Ответ на вопрос 2</div>
                </div>
                <div className={`answer ${activeIndex === 2 ? 'visible' : ''}`}>
                <h2>What is a Payment Gateway?</h2>
                <div className="ansN">Ответ на вопрос 3</div>
                </div>
                <div className={`answer ${activeIndex === 3 ? 'visible' : ''}`}>
                <h2>What is a Payment Gateway?</h2>
                <div className="ansN">Ответ на вопрос 4</div>
                </div>
                <div className={`answer ${activeIndex === 4 ? 'visible' : ''}`}>
                <h2>What is a Payment Gateway?</h2>
                <div className="ansN">Ответ на вопрос 5</div>
                </div>
              </div>
            </div>
            </div>    
    </div>
  )
}

export default Home;