import '../styles/generator.css';
import Generator1 from '../img/generator1.svg';
import banner6Image1 from '../img/Group39506.svg';
import React, { useState, useEffect } from 'react';
import { FaCheckCircle } from "react-icons/fa";
import { IoMdCloseCircle } from "react-icons/io";
import { useLocation } from 'react-router-dom';  // для получения хеша из URL

function Generator() {
  const [activePlan, setActivePlan] = useState(null); // состояние для отслеживания активного плана
  const location = useLocation(); // получаем текущий URL с хешем
  
 // Создаем состояние для хранения выбранного пола
 const [gender, setGender] = useState('');

 // Обработчик изменения радиокнопки
 const handleChange = (event) => {
     setGender(event.target.value);
 };

  useEffect(() => {
    // Проверяем, если в URL есть хеш, прокручиваем к соответствующему элементу
    if (location.hash) {
      const elementId = location.hash.substring(1); // убираем символ '#'
      const element = document.getElementById(elementId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' }); // плавная прокрутка
        // Определяем, какой план активен, в зависимости от хеша
        if (elementId === 'gener-plan1') {
          setActivePlan(1); // Устанавливаем план 1 активным
        } else if (elementId === 'gener-plan2') {
          setActivePlan(2); // Устанавливаем план 2 активным
        } else if (elementId === 'gener-plan3') {
          setActivePlan(3); // Устанавливаем план 3 активным
        }
      }
    }
  }, [location]); // Зависимость от изменения URL

  const handlePlanClick = (planNumber) => {
    setActivePlan(planNumber); // устанавливаем активный план при клике
  };

  return (
    <div className="generator-page">
      <div className="generat-start">
        <div className="gener-txt1">
          <div className="gener-txt1-1">Make your </div>
          <div className="gener-txt1-2">portfolio here</div>
          <div className="gener-txt1-3">RIGHT NOW</div>
          <div className="gener-txt1-4">Follow the steps below to create your new portfolio</div>
        </div>
        <img src={Generator1} className="generator-phot1" alt="Generator" />
      </div>
      <div className="generat2">
        <div className="block-container">
          <h2>Step 1</h2>
          <div className="generated-block">      
            <div className="generated-block1">Choose a service</div>
            <div className="generated-block1">and a plan</div>
            <div className="text-gen1">
              By choosing our service, we can guarantee an interesting and high-quality portfolio based on your data. Choose a plan that fits your budget and the desired level of support, which will ensure you get the most out of it and flexibility.
            </div>
          </div>
        </div>

        <div className="block-container">
          <h2>Step 2</h2>
          <div className="generated-block">      
            <div className="generated-block1">Sign up and fill in the information</div>
            <div className="text-gen1">
              Register or log in, it's easy and fast! After choosing a plan, enter your data that you want to see in your portfolio. After that, the program will provide you with a choice of different options depending on the plan.
            </div>
          </div>
        </div>

        <div className="block-container">
          <h2>Step 3</h2>
          <div className="generated-block">
            <div className="generated-block1">Get your portfolio in any format</div>
            <div className="text-gen1">
              After generating and selecting a suitable portfolio that you like, you can save it in various formats such as: PDF, .doc
            </div>
          </div>
        </div>
      </div>

      <div className="line-with-text-gener">Step 1</div>

      <div className="generstep">
        <div className="gener-home-name">
          <div className="gener-home-name1">PRICING</div>
          <div className="gener-home-name2">Our pricing plans</div>
        </div>

        <button id="gener-plan1"
          className={`gener-plan plan1 ${activePlan === 1 ? 'active' : ''}`}
          onClick={() => handlePlanClick(1)}
        >
          <div className="gener-circle-rec">
            <div className="gener-half-circle1"></div>
            <div className="gener-half-circle2"></div>
          </div>
          <div className="gener-text-plan1-1">
            <div className="gener-text-plan1-1-1">For individuals</div>
            <div className="gener-text-plan1-1-2">Basic</div>
          </div>
          <div className="gener-text-plan1-2">
            <div>Creation of your first portfolio,</div>
            <div>without download</div>
          </div>
          <div className="gener-text-plan1-3">
            <div className="gener-text-plan1-3-1">$0</div>
            <div className="gener-text-plan1-3-2">What’s included</div>
            <div className="gener-check">
              <FaCheckCircle className="gener-eleps-chek" />
              <div className="gener-eleps-chek-text">One portfolio generating</div>
            </div>

            <div className="gener-crosss">
              <IoMdCloseCircle className="gener-eleps-cross" />
              <div className="gener-cross-text-dov">Downloading</div>
            </div>
          </div>

        </button>

        <button id="gener-plan2"
          className={`gener-plan plan2 ${activePlan === 2 ? 'active' : ''}`}
          onClick={() => handlePlanClick(2)}
        >
          <div className="gener-rectangle">
            <div className="gener-rectang1"></div>
            <div className="gener-rectang-container">
              <div className="gener-rectang2"></div>
              <div className="gener-rectang3"></div>
            </div>
          </div>
          <div className="gener-text-plan2-1">
            <div className="gener-text-plan2-1-1">For startups</div>
            <div className="gener-text-plan2-1-2">Pro</div>
          </div>
          <div className="gener-text-plan2-2">
            <div>Creation of 5 first portfolio, with</div>
            <div>download</div>
          </div>
          <div className="gener-text-plan2-3">
            <div className="gener-text-plan2-3-1">$1</div>
            <div className="gener-text-plan2-3-2">What’s included</div>
            <div className="gener-check">
              <FaCheckCircle className="gener-eleps-chek" />
              <div className="gener-eleps-chek-text">Five portfolio generating</div>
            </div>

            <div className="gener-check2">
              <FaCheckCircle className="gener-eleps-chek" />
              <div className="gener-eleps-chek-text-2">Downloading</div>
            </div>


          </div>
        </button>

        <button id="gener-plan3"
          className={`gener-plan plan3 ${activePlan === 3 ? 'active' : ''}`}
          onClick={() => handlePlanClick(3)}
        >
           <div className="gener-rectangle-pl3">
            <img src={banner6Image1} className="banner6-img1-home" />
          </div>
          <div className="gener-text-plan3-1">
            <div className="gener-text-plan3-1-1">For big companies</div>
            <div className="gener-text-plan3-1-2">Enterprise</div>
          </div>
          <div className="gener-text-plan3-2">
            <div>Creation of 50 portfolio, with </div>
            <div>download</div>
          </div>
          <div className="gener-text-plan3-3">
            <div className="gener-text-plan3-3-1">$5</div>
            <div className="gener-text-plan3-3-2">What’s included</div>
            <div className="gener-check">
              <FaCheckCircle className="gener-eleps-chek" />
              <div className="gener-eleps-chek-text">Fivety portfolio generating</div>
            </div>

            <div className="gener-check2">
              <FaCheckCircle className="gener-eleps-chek" />
              <div className="gener-eleps-chek-text-2">Downloading</div>
            </div>


          </div>
        </button>
      </div>

      <div className="line-with-text-gener">Step 2</div>
  <div className="gener-form-cont1">
      <form class="user-form1">
      <div class="column">
  <div>
    <label for="first-name">Имя:</label>
    <input type="text" id="first-name" name="first-name"></input>
  </div>

  <div>
    <label for="last-name">Фамилия:</label>
    <input type="text" id="last-name" name="last-name"></input>
  </div>

  <div>
    <label for="middle-name">Отчество:</label>
    <input type="text" id="middle-name" name="middle-name"></input>
  </div>

  <div>
    <label for="dob">Дата рождения:</label>
    <input type="date" id="dob" name="dob"></input>
  </div>

  <div>
    <label for="country">Место проживания(Страна, город):</label>
    <input type="text" id="country" name="country"></input>
  </div>
 


  </div>

  <div class="column">
  <div>
    <label for="photo">Фото:</label>
    <input type="file" id="photo" name="photo" accept="image/*"></input>
  </div>
  </div>

  <div class="column">

  <div>
    <label for="phone">Номер телефона:</label>
    <input type="tel" id="phone" name="phone"></input>
  </div>
  <div>
    <label for="email">Email:</label>
    <input type="email" id="emailfoot" name="email"></input>
  </div>

  <div>
    <label for="business-trips">Командировки:</label>
    <select id="business-trips" name="business-trips">
      <option value="not-specified">Не указано</option>
      <option value="possible">Возможны</option>
      <option value="impossible">Невозможны</option>
      <option value="rarely-possible">Возможны редко</option>
    </select>
  </div>

  <div>
    <label for="employment">Занятость:</label>
    <select id="employment" name="employment">
      <option value="full">Полная</option>
      <option value="part-time">Частичная</option>
      <option value="freelance">Разовая / Подработка</option>
      <option value="internship">Стажировка</option>
    </select>
  </div>


  <div>
    <label for="work-schedule">График работы:</label>
    <select id="work-schedule" name="work-schedule">
      <option value="fixed">Фиксированный</option>
      <option value="full-day">Полный рабочий день</option>
      <option value="shift">Сменный</option>
      <option value="flexible">Гибкий</option>
      <option value="rotation">Вахтовый метод</option>
    </select>
  </div>
  </div>

  </form>
  </div>

<form className="generform">
  <div className="gener-form-cont2">
  <div class="upload-wrapper">
  <label for="file-upload">Загрузка файла:</label>
  <div class="upload-block" onclick="document.getElementById('file-upload').click();">
    <input type="file" id="file-upload" name="file-upload" accept=".pdf, .doc, .docx"></input>
  </div>
</div>

<div class="upload-wrapper">
  <label for="video-upload">Загрузка видео:</label>
  <div class="upload-block" onclick="document.getElementById('video-upload').click();">
    <input type="file" id="video-upload" name="video-upload" accept="video/*"></input>
  </div>
</div>

<div className="gener-tatarea">
    <label for="additional-info">Дополнительная информация:</label>
    <textarea id="additional-info" name="additional-info"></textarea>
  </div>

  </div>
  </form>
  <button type="submit">Отправить</button>


    </div>
  );
}

export default Generator;
