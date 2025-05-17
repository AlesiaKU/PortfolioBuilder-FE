import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const extractEmailFromToken = () => {
  const token = localStorage.getItem('token'); // Получаем токен из localStorage
  if (!token) return null;

  try {
    const payload = JSON.parse(atob(token.split('.')[1])); // Декодируем payload токена
    return payload.sub; // Извлекаем email
  } catch (error) {
    console.error('Ошибка при декодировании токена:', error);
    return null;
  }
};

export const useGeneratorLogic = () => {
  const [activePlan, setActivePlan] = useState(null); 
  const location = useLocation(); 
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isWorkModalOpen, setIsWorkModalOpen] = useState(false);
  const [isLanguageModalOpen, setIsLanguageModalOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  useEffect(() => {
    const token = localStorage.getItem('token'); // Получаем токен из localStorage
    setIsAuthenticated(!!token); // Устанавливаем isAuthenticated в true, если токен существует
  }, []);

  const [educations, setEducations] = useState([]);
  const [language, setLanguages] = useState([]);
  const [newLanguages, setNewLanguages] = useState([{ language: '', level: 1 }]);
  const [newEducations, setNewEducations] = useState([{ specialization: '', institution: '', city: '', startDate: '', endDate: '', educationInfo: '' }]);
  const [jobs, setJobs] = useState([]);
  const [newJobs, setNewJobs] = useState([{ position: '', company: '', city: '', startDate: '', endDate: '', jobsInfo: '' }]);
 
  useEffect(() => {
    if (location.hash) {
      const elementId = location.hash.substring(1);
      const element = document.getElementById(elementId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        if (elementId === 'gener-plan1') setActivePlan(1);
        else if (elementId === 'gener-plan2') setActivePlan(2);
        else if (elementId === 'gener-plan3') setActivePlan(3);
        else if (elementId === 'block-container') {
          setActivePlan(null);
        }
      }
    }
  }, [location]);

  const handlePlanClick = (planNumber) => {
    setActivePlan(planNumber);
  };

  const openModal = (event) => {
    event.preventDefault();
    setIsModalOpen(true);
  };

  const openWorkModal = (event) => {
    event.preventDefault();
    setIsWorkModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const closeWorkModal = () => {
    setIsWorkModalOpen(false);
  };

  const addEducationField = () => {
    setNewEducations([...newEducations, { specialization: '', institution: '', city: '', startDate: '', endDate: '', educationInfo: '' }]);
  };

  const addWorkField = () => {
    setNewJobs([...newJobs, { position: '', company: '', city: '', startDate: '', endDate: '', jobsInfo: '' }]);
  };

  const openLanguageModal = (event) => {
    event.preventDefault();
    setIsLanguageModalOpen(true);
  };

  const closeLanguageModal = () => setIsLanguageModalOpen(false);

  const addLanguageField = () => {
    setNewLanguages([...newLanguages, { language: '', level: 1 }]); // Инициализируйте уровень с 1
  };

  const deleteLanguageField = (index) => {
    setNewLanguages(newLanguages.filter((_, i) => i !== index));
  };

  const handleChange = (index, field, value, type = 'education') => {
    if (type === 'education') {
      const updatedEducations = [...newEducations];
      updatedEducations[index][field] = value;
      setNewEducations(updatedEducations);
    } else if (type === 'job') {
      const updatedJobs = [...newJobs];
      updatedJobs[index][field] = value;
      setNewJobs(updatedJobs);
    } else if (type === 'language') {
      const updatedLanguages = [...newLanguages];
      updatedLanguages[index][field] = value;
      setNewLanguages(updatedLanguages);
    }
  };

  const deleteEducationField = (index) => {
    const updatedEducations = newEducations.filter((_, i) => i !== index);
    setNewEducations(updatedEducations);
  };

  const deleteWorkField = (index) => {
    const updatedJobs = newJobs.filter((_, i) => i !== index);
    setNewJobs(updatedJobs);
  };

  const saveEducations = () => {
    setEducations([...educations, ...newEducations]);
    closeModal();
  };

  const saveJobs = () => {
    setJobs([...jobs, ...newJobs]);
    closeWorkModal();
  };

  const saveLanguages = () => {
    console.log('Languages to save:', newLanguages); // Лог для отладки
    const updatedLanguages = [...language, ...newLanguages];
    setLanguages(updatedLanguages);
    //setNewLanguages([{ language: '', level: '1' }]); // Сброс форм
    closeLanguageModal();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    const photoFile = event.target.photo?.files[0]; // Извлекаем файл из input
    const email = extractEmailFromToken();
    if (!email) {
      console.error('Email не найден в токене!');
      return;
    }

    const formData = new FormData();
    formData.append('userEmail', email);
    formData.append('firstName', event.target.firstName?.value || '');
    formData.append('lastName', event.target.lastName?.value || '');
    formData.append('desiredPosition', event.target.desiredPosition?.value || '');
    formData.append('country', event.target.country?.value || '');
    formData.append('phone', event.target.phone?.value || '');
    formData.append('gender', event.target.gender?.value || '');
    formData.append('businessTrips', event.target.businessTrips?.value || '');
    formData.append('employment', event.target.employment?.value || '');
    formData.append('workMode', event.target.workMode?.value || '');

    newJobs.forEach((job, index) => {
      formData.append(`works[${index}].position`, job.position || '');
      formData.append(`works[${index}].company`, job.company || '');
      formData.append(`works[${index}].city`, job.city || '');
      formData.append(`works[${index}].startDate`, job.startDate || '');
      formData.append(`works[${index}].endDate`, job.endDate || '');
      formData.append(`works[${index}].jobsInfo`, job.jobsInfo || '');
    });

    newEducations.forEach((education, index) => {
      formData.append(`educations[${index}].specialization`, education.specialization || '');
      formData.append(`educations[${index}].institution`, education.institution || '');
      formData.append(`educations[${index}].city`, education.city || '');
      formData.append(`educations[${index}].startDate`, education.startDate || '');
      formData.append(`educations[${index}].endDate`, education.endDate || '');
      formData.append(`educations[${index}].educationInfo`, education.educationInfo || '');
    });

    newLanguages.forEach((lang, index) => {
      formData.append(`languages[${index}].language`, lang.language || '');
      formData.append(`languages[${index}].level`, lang.level.toString() || '');
    });

  
    const token = localStorage.getItem('token'); // Получаем токен из localStorage
    if (!token) {
      console.error('Ошибка: Токен не найден в localStorage.');
      return;
    }

if (photoFile) {
  formData.append('photo', photoFile); 
}
for (let [key, value] of formData.entries()) {
  console.log(`${key}:`, value);
}


    try {
      const response = await fetch(
        `http://26.188.13.76:8080/api/portfolios/create?email=${encodeURIComponent(email)}`,
        {
          method: 'POST',
          headers: {
            //'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`, // Только заголовок Authorization
          },
          //body: JSON.stringify(fullFormData),
          body: formData
        }
      );
  
      let data;
  
      if (response.ok) {
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          data = await response.json(); // Читаем ответ как JSON
        } else {
          data = { jwt: await response.text() }; // Читаем как текст
        }
  
        if (data.jwt && data.jwt !== 'not ok') {
          console.log('Existing JWT Token:', token);
          console.log('Перехлд на страницу');
          if (activePlan === 2 || activePlan === 3) {
            navigate(`/payment?plan=${activePlan}`);
           } else {
              // План 1: просто сохраняем данные
              console.log('Plan 1 selected, no payment required.');
              navigate('/PortfolioPage');
            }
          
          
        } else {
          console.error('Error: Invalid JWT token received:', data.jwt);
        }
      } else if (response.status === 401) {
        console.error('Unauthorized: Invalid credentials');
      } else {
        console.error('Server response status:', response.status);
      }
    } catch (error) {
      console.error('Error sending data to server:', error);
    }
  };
  

  return {
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
    openLanguageModal,
    closeLanguageModal,
    addLanguageField,
    saveLanguages,
    deleteLanguageField,
    handleSubmit,
    isAuthenticated,
  };
};