import '../styles/generator.css';
import Generator1 from '../img/generator1.svg';
import banner6Image1 from '../img/Group39506.svg';
import React, { useState, useEffect } from 'react';
import { FaCheckCircle } from "react-icons/fa";
import { IoMdCloseCircle } from "react-icons/io";
import { useGeneratorLogic } from '../JavaScript/Generator2'

function Generator() {
  const {
    activePlan,
    isModalOpen,
    isWorkModalOpen,
    newEducations,
    newJobs,
    openModal,
    closeModal,
    openWorkModal,
    closeWorkModal,
    handlePlanClick,
    addEducationField,
    addWorkField,
    handleChange,
    deleteEducationField,
    deleteWorkField,
    saveEducations,
    saveJobs,
  } = useGeneratorLogic();


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
 


      <div>
    <label for="phone">Номер телефона:</label>
    <input type="tel" id="phone" name="phone"></input>
  </div>
  <div>
    <label for="email">Email:</label>
    <input type="email" id="emailfoot" name="email"></input>
  </div>
</div>

  <div class="column">
  <div>
    <label for="photo">Фото:</label>
    <input type="file" id="photo" name="photo" accept="image/*"></input>
  </div>
  </div>

  <div class="column">
  <div className="gender">
    <label for = "gender">
      Пол:
    </label>
    <select id="business-trips" name="business-trips">
      <option value="not-specified">Женщина</option>
      <option value="possible">Мужчина</option>
      <option value="impossible">Неважно</option>
    </select>
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

  <div className="education ">
  <label>Education</label>
  <button className="add-education-button" onClick={openModal}>+</button>
 </div>

 <div className="job">
   <label>Job</label>
   <button className="add-job-button" onClick={openWorkModal}>+</button>
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

<div className="gener-textarea">
    <label for="additional-info">Дополнительная информация:</label>
    <textarea id="additional-info" name="additional-info"></textarea>
  </div>

  </div>
  </form>
  <button type="submit">Отправить</button>

  {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Education</h2>
            {newEducations.map((education, index) => (
              <div key={index} className="education-field">
                <div className= "specialization">
                  <label>Specialization</label>
                <input type="text" placeholder=" " value={education.specialization}
                  onChange={(e) => handleChange(index, 'specialization', e.target.value)}
                />
                </div>
                <div className="educate-city">
                <div className="institution">
                <label>Educational institution</label>
                <input type="text" placeholder="institution" value={education.institution}
                  onChange={(e) => handleChange(index, 'institution', e.target.value)}
                /></div>
                <div className="city">
                <label>City</label>
                <input type="text" placeholder="institution" value={education.city}
                  onChange={(e) => handleChange(index, 'city', e.target.value)}
                /></div>
                </div>
                <div className="startEndDate">
                <div className="startname">
                  <label>Start date</label>
                <input type="date"  value={education.startDate}
                  onChange={(e) => handleChange(index, 'startDate', e.target.value)}
                /></div>
                <div className="enddate">
                  <label>End date</label>
                <input type="date" value={education.endDate}
                  onChange={(e) => handleChange(index, 'endDate', e.target.value)}
                />
                </div>
                </div>
                <div className="infoeducate">
                <label for="education-info">Дополнительная информация:</label>
                <textarea id="education-info" name="education-info"></textarea>
                </div>

                {/* Кнопка для удаления текущего набора полей */}
                <div className="lineBtn">
                <button className="delete-education-button" onClick={() => deleteEducationField(index)}>Delete</button>
                <div></div>
                </div>
              </div>
            ))}
            <div className="btnSaveClose">
            <button onClick={addEducationField}>Add</button>
            <button onClick={saveEducations}>Save</button>
            <button onClick={closeModal}>Close</button>
            </div>
          </div>
        </div>
      )}

{isWorkModalOpen && (
  <div className="modal-overlay">
    <div className="modal-content">
      <h2>Work</h2>
      {newJobs.map((job, index) => (
        <div key={index} className="job-field">
          <div className="position">
            <label>Position</label>
            <input
              type="text"
              placeholder="Position"
              value={job.position}
              onChange={(e) => handleChange(index, 'position', e.target.value, 'job')}
            />
          </div>
          <div className="work-city">
            <div className="company">
              <label>Company</label>
              <input
                type="text"
                placeholder="Company"
                value={job.company}
                onChange={(e) => handleChange(index, 'company', e.target.value, 'job')}
              />
            </div>
            <div className="city">
              <label>City</label>
              <input
                type="text"
                placeholder="City"
                value={job.city}
                onChange={(e) => handleChange(index, 'city', e.target.value, 'job')}
              />
            </div>
          </div>
          <div className="startEndDate">
            <div className="startname">
              <label>Start date</label>
              <input
                type="date"
                value={job.startDate}
                onChange={(e) => handleChange(index, 'startDate', e.target.value, 'job')}
              />
            </div>
            <div className="enddate">
              <label>End date</label>
              <input
                type="date"
                value={job.endDate}
                onChange={(e) => handleChange(index, 'endDate', e.target.value, 'job')}
              />
            </div>
          </div>

          {/* Кнопка для удаления текущего набора полей */}
          <button className="delete-job-button" onClick={() => deleteWorkField(index)}>Delete</button>
        </div>
      ))}
      <button onClick={addWorkField}>Add</button>
      <button onClick={saveJobs}>Save</button>
      <button onClick={closeWorkModal}>Close</button>
    </div>
  </div>
)}

    </div>
  );
}

export default Generator;
