import '../styles/generator.css';
import Generator1 from '../img/generator1.svg';
import banner6Image1 from '../img/Group39506.svg';
import React, { useState, useEffect } from 'react';
import { FaCheckCircle } from "react-icons/fa";
import { IoMdCloseCircle } from "react-icons/io";
import { TbPhoto } from "react-icons/tb";
import { MdOutlineFileUpload } from "react-icons/md";
import { useGeneratorLogic } from '../JavaScript/Generator2.js'

function Generator() {
  const {
    activePlan,
    isModalOpen,
    isWorkModalOpen,
    newEducations,
    newJobs,
    newLanguages,
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
    isLanguageModalOpen,
    isAuthenticated,
    openLanguageModal,
    closeLanguageModal,
    addLanguageField,
    saveLanguages,
    deleteLanguageField,
    handleSubmit,
  } = useGeneratorLogic();

  const [photo, setPhoto] = useState(null);


  {/*const handlePhotoChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPhoto(imageUrl);
    }
  };*/}

  const handlePhotoChange = (event) => {
    const file = event.target.files[0];
    
    if (file) {
      const isJPG = file.name.toLowerCase().endsWith('.jpg'); // Проверяем расширение файла
      if (isJPG) {
        const reader = new FileReader();
        reader.onloadend = () => {
          console.log("File uploaded successfully:", reader.result);  // Логируем Data URL изображения
          setPhoto(reader.result);  // Устанавливаем Data URL в состояние
        };
        reader.readAsDataURL(file);  // Преобразуем файл в Data URL
      } else {
        console.error('Please upload a valid JPG file.');
      }
    } else {
      console.error('No file selected.');
    }
  };
  
  
  

 /* const [fileName, setFileName] = useState(null);
  const [videoName, setVideoName] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name);
    }
  };

  const handleVideoChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setVideoName(file.name);
    }
  };*/

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
      <div className="generat2" id="generat2">
        <div className="block-container" id='block-container'>
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
      <div className={`page-content ${!isAuthenticated ? 'blurred' : ''}`}>
        <div className="line-with-text-gener">Step 1</div>

        <div className="generstep">
          <div className="gener-home-name">
            <div className="gener-home-name1">PRICING</div>
            <div className="gener-home-name2">Our pricing plans</div>
          </div>

          <button id="gener-plan1"
            className={`gener-plan plan1 ${activePlan === 1 ? 'active' : ''}`}
            onClick={() => handlePlanClick(1)} disabled={!isAuthenticated} >
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
            onClick={() => handlePlanClick(2)} disabled={!isAuthenticated} >
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
            onClick={() => handlePlanClick(3)} disabled={!isAuthenticated}>
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
          <form class="user-form1" onSubmit={handleSubmit}>
            <div class="column">
              <div>
                <label for="first-name">Name:</label>
                <input type="text" id="firstName" name="firstName" disabled={!isAuthenticated}></input>
              </div>

              <div>
                <label for="last-name">Surname:</label>
                <input type="text" id="lastName" name="lastName" disabled={!isAuthenticated}></input>
              </div>

              <div>
                <label for="desiredPosition">DesiredPosition:</label>
                <input type="text" id="desiredPosition" name="desiredPosition" disabled={!isAuthenticated}></input>
              </div>

              <div>
                <label for="country">Place of residence (country, city):</label>
                <input type="text" id="country" name="country" disabled={!isAuthenticated}></input>
              </div>

              <div>
                <label for="phone">Phone number:</label>
                <input type="tel" id="phone" name="phone" disabled={!isAuthenticated}></input>
              </div>
              {/*<div>
                <label for="email">Email:</label>
                <input type="email" id="emailfoot" name="email" disabled={!isAuthenticated}></input>
              </div>*/}
            </div>

            <div class="column">
              <div className="photoBlock">
                <label for="photo">Photo(250/250):</label>
                <div className="photo-block" onClick={() => document.getElementById('photo').click()}>
                  <input type="file" id="photo" name="photo" accept="image/*" style={{ display: 'none' }} onChange={handlePhotoChange} disabled={!isAuthenticated} />
                  {/* Если фото загружено, отображаем его, если нет - показываем иконку */}
                  {photo ? (
                    <img src={photo} alt="Selected" className="photo-preview" />
                  ) : (
                    <TbPhoto className="photo-icon" />
                  )}
                </div>
              </div>
            </div>

            <div className="column">
              <div className="gender">
                <label htmlFor="gender">
                  Gender:
                </label>
                <select id="gender" name="gender" disabled={!isAuthenticated}>
                  <option value="FEMALE">Woman</option>
                  <option value="MALE">Man</option>
                  <option value="not-specified">Doesn't matter</option>
                </select>
              </div>

              <div>
                <label for="business-trips">Business trips:</label>
                <select id="businessTrips" name="businessTrips" disabled={!isAuthenticated}>
                  <option value="NOT_SPECIFIED">Not specified</option>
                  <option value="POSSIBLE">Possible</option>
                  <option value="IMPOSSIBLE">Impossible</option>
                  <option value="RARELY_POSSIBLE">Rarely possible</option>
                </select>
              </div>

              <div>
                <label for="employment">Busyness:</label>
                <select id="employment" name="employment" disabled={!isAuthenticated}>
                  <option value="FULL_TIME">Full</option>
                  <option value="PART_TIME">Partial</option>
                  <option value="FREELANCE">One-time / Part-time job</option>
                  <option value="INTERNSHIP">Internship</option>
                </select>
              </div>

              <div>
                <label for="work-mode">Work mode :</label>
                <select id="workMode" name="workMode" disabled={!isAuthenticated}>
                  <option value="OFFICE">Office</option>
                  <option value="HYBRID">Hybrid</option>
                  <option value="REMOTE">Remote</option>
                </select>
              </div>

              <div className="education ">
                <label>Education</label>
                <button className="add-education-button" onClick={openModal} disabled={!isAuthenticated}>+</button>
              </div>

              <div className="language">
                <label>Languages</label>
                <button className="add-language-button" onClick={openLanguageModal} disabled={!isAuthenticated}>+</button>
              </div>

              <div className="job">
                <label>Job</label>
                <button className="add-job-button" onClick={openWorkModal} disabled={!isAuthenticated}>+</button>
              </div>
            </div>

            <div className="generformbtn-container">
              <button type="submit" className="generformbtn" disabled={!isAuthenticated}>Continue</button>
            </div>
          </form>
        </div>

      </div>


      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Education</h2>
            {newEducations.map((education, index) => (
              <div key={index} className="education-field">
                <div className="specialization">
                  <label>Specialization</label>
                  <input type="text" placeholder=" " value={education.specialization}
                    onChange={(e) => handleChange(index, 'specialization', e.target.value)}
                  />
                </div>
                <div className="educate-city">
                  <div className="institution">
                    <label>Educational institution</label>
                    <input type="text" placeholder="" value={education.institution}
                      onChange={(e) => handleChange(index, 'institution', e.target.value)}
                    /></div>
                  <div className="city">
                    <label>City</label>
                    <input type="text" placeholder="" value={education.city}
                      onChange={(e) => handleChange(index, 'city', e.target.value)}
                    /></div>
                </div>
                <div className="startEndDate">
                  <div className="startname">
                    <label>Start date</label>
                    <input type="date" value={education.startDate}
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
                  <textarea type="text" value={education.educationInfo}
                    onChange={(e) => handleChange(index, 'educationInfo', e.target.value)}
                  />
                </div>

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
                  <input type="text" placeholder="" value={job.position}
                    onChange={(e) => handleChange(index, 'position', e.target.value, 'job')}
                  />
                </div>
                <div className="work-city">
                  <div className="company">
                    <label>Company</label>
                    <input type="text" placeholder="" value={job.company}
                      onChange={(e) => handleChange(index, 'company', e.target.value, 'job')}
                    />
                  </div>
                  <div className="city">
                    <label>City</label>
                    <input type="text" placeholder="" value={job.city}
                      onChange={(e) => handleChange(index, 'city', e.target.value, 'job')}
                    />
                  </div>
                </div>
                <div className="startEndDate">
                  <div className="startname">
                    <label>Start date</label>
                    <input type="date" value={job.startDate}
                      onChange={(e) => handleChange(index, 'startDate', e.target.value, 'job')}
                    />
                  </div>
                  <div className="enddate">
                    <label>End date</label>
                    <input type="date" value={job.endDate}
                      onChange={(e) => handleChange(index, 'endDate', e.target.value, 'job')}
                    />
                  </div>
                </div>
                <div className="infojob">
                  <label for="job-info">Additional information:</label>
                  <textarea type="text" value={job.jobsInfo}
                    onChange={(e) => handleChange(index, 'jobsInfo', e.target.value, 'job')}
                  />
                </div>

                {/* Кнопка для удаления текущего набора полей */}
                <div className="lineBtn">
                  <button className="delete-job-button" onClick={() => deleteWorkField(index)}>Delete</button>
                  <div></div>
                </div>
              </div>
            ))}
            <div className="btnSaveClose">
              <button onClick={addWorkField}>Add</button>
              <button onClick={saveJobs}>Save</button>
              <button onClick={closeWorkModal}>Close</button>
            </div>
          </div>
        </div>
      )}

{isLanguageModalOpen && (
  <div className="modal-overlay">
    <div className="modal-content">
      <h2>Languages</h2>
      {newLanguages.map((languageObj, index) => (
        <div key={index} className="language-field">
          <div className="language-name">
            <label>Language</label>
            <input 
              type="text" 
              value={languageObj.language}
              onChange={(e) => handleChange(index, 'language', e.target.value, 'language')}
            />
          </div>
          <div className="language-level">
            <label>Proficiency Level</label>
            <input 
              type="range" 
              min="1" 
              max="5" 
              value={languageObj.level}
              onChange={(e) => handleChange(index, 'level', e.target.value, 'language')}
            />
            <span>{["Novice", "Intermediate", "Good", "Very Good", "Fluent"][languageObj.level - 1]}</span>
          </div>
          <div className="lineBtn">
          <button className="delete-job-button" onClick={() => deleteLanguageField(index)}>Delete</button>
          <div></div>
          </div>
        </div>
      ))}
      <div className="btnSaveClose">
      <button onClick={addLanguageField}>Add</button>
      <button onClick={saveLanguages}>Save</button>
      <button onClick={closeLanguageModal}>Close</button>
    </div>
    </div>
  </div>
)}



    </div>
  );
}

export default Generator;
