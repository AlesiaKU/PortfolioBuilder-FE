// generatorLogic.js
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom'; 

export const useGeneratorLogic = () => {
  const [activePlan, setActivePlan] = useState(null); // состояние для отслеживания активного плана
  const location = useLocation(); // получаем текущий URL с хешем
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isWorkModalOpen, setIsWorkModalOpen] = useState(false);
  const [educations, setEducations] = useState([]);
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

 /* const handleChange = (index, field, value) => {
    const updatedEducations = [...newEducations];
    updatedEducations[index][field] = value;
    setNewEducations(updatedEducations);
  };*/

  const handleChange = (index, field, value, type = 'education') => {
    if (type === 'education') {
      const updatedEducations = [...newEducations];
      updatedEducations[index][field] = value;
      setNewEducations(updatedEducations);
    } else if (type === 'job') {
      const updatedJobs = [...newJobs];
      updatedJobs[index][field] = value;
      setNewJobs(updatedJobs);
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

  return {
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
  };
};
