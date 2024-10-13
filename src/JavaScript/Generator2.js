import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom'; 

export const useGeneratorLogic = () => {
  const [activePlan, setActivePlan] = useState(null); // состояние для отслеживания активного плана
  const location = useLocation(); // получаем текущий URL с хешем
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isWorkModalOpen, setIsWorkModalOpen] = useState(false);
  const [isLanguageModalOpen, setIsLanguageModalOpen] = useState(false);
  const [educations, setEducations] = useState([]);
  const [newLanguages, setNewLanguages] = useState([
    { name: '', level: 1 }
  ]);
  const [newEducations, setNewEducations] = useState([
    { specialization: '', institution: '', city: '', startDate: '', endDate: '' }
  ]);

    // Состояние для работы
    const [jobs, setJobs] = useState([]);
    const [newJobs, setNewJobs] = useState([
      { position: '', company: '', city: '', startDate: '', endDate: '' }
    ]);

  useEffect(() => {
    if (location.hash) {
      const elementId = location.hash.substring(1); // убираем символ '#'
      const element = document.getElementById(elementId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' }); // плавная прокрутка
        if (elementId === 'gener-plan1') setActivePlan(1);
        else if (elementId === 'gener-plan2') setActivePlan(2);
        else if (elementId === 'gener-plan3') setActivePlan(3);
      }
    }
  }, [location]);

  const handlePlanClick = (planNumber) => {
    setActivePlan(planNumber);
  };

  const openModal = (event) => {
    event.preventDefault(); // предотвращаем действие по умолчанию (отправку формы)
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
    setNewEducations([...newEducations, { specialization: '', institution: '', city: '', startDate: '', endDate: '' }]);
  };

  const addWorkField = () => {
    setNewJobs([...newJobs, { position: '', company: '', city: '', startDate: '', endDate: '' }]);
  };

  const openLanguageModal = (event) => {
    event.preventDefault();
    setIsLanguageModalOpen(true);} // Открыть окно языка
  const closeLanguageModal = () => setIsLanguageModalOpen(false); // Закрыть окно языка

  const addLanguageField = () => { // Добавить новый язык
    setNewLanguages([...newLanguages, { name: '', level: 1 }]);
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
    }else if (type === 'language') {
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
    // Логика для сохранения языков
    closeLanguageModal();
  };

  const [formData, setFormData] = useState({}); // состояние для хранения данных формы

  const handleSubmit = (event) => {
    event.preventDefault(); // предотвращает перезагрузку страницы при отправке формы

    const form = event.target;
    const formDataObj = new FormData(form);

    // Собираем данные формы в объект
    const formValues = {};
    formDataObj.forEach((value, key) => {
      formValues[key] = value;
    });

    const formData = new FormData(event.target);

    // Добавляем данные из модальных окон (образование, языки, работа и т.д.)
    const educationData = educations; // предположим, что educations хранит данные об образовании
    const jobData = jobs; // данные о работе
    const languageData = newLanguages; // данные о языках
  
    // Собираем все данные в один объект
    const fullFormData = {
      ...Object.fromEntries(formData),
      education: educationData,
      jobs: jobData,
      languages: languageData
    };
  
    console.log('Form Data:', fullFormData); // выводим данные формы в консоль

    // Дополнительно можно обновить состояние
    setFormData(formValues);
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
    openLanguageModal, // Добавлено открытие окна для языков
    closeLanguageModal, // Закрытие окна для языков
    addLanguageField, 
    saveLanguages,
    deleteLanguageField,
    handleSubmit,
  };
};
