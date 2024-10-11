// educationModal.js
export function initEducationModal() {
  // Открытие модального окна
  document.getElementById('add-education-btn').addEventListener('click', function () {
    document.getElementById('education-modal').style.display = 'block';
  });

  // Закрытие модального окна
  document.querySelector('.close-btn').addEventListener('click', function () {
    document.getElementById('education-modal').style.display = 'none';
  });

  // Добавление нового блока образования
  document.getElementById('add-education').addEventListener('click', function () {
    const degree = document.getElementById('degree').value;
    const institution = document.getElementById('institution').value;
    const city = document.getElementById('city').value;
    const startMonth = document.getElementById('start-month').value;
    const startYear = document.getElementById('start-year').value;
    const endMonth = document.getElementById('end-month').value;
    const endYear = document.getElementById('end-year').value;
    const description = document.getElementById('description').value;

    // Создаем новый блок для отображения введенной информации
    const educationEntry = document.createElement('div');
    educationEntry.classList.add('education-entry');
    educationEntry.innerHTML = `
      <strong>Образование:</strong> ${degree} <br>
      <strong>Учебное заведение:</strong> ${institution} <br>
      <strong>Город:</strong> ${city} <br>
      <strong>Дата начала:</strong> ${startMonth} ${startYear} <br>
      <strong>Дата окончания:</strong> ${endMonth} ${endYear} <br>
      <strong>Описание:</strong> ${description}
    `;

    // Добавляем новый блок в список образования
    document.getElementById('education-list').appendChild(educationEntry);

    // Очищаем поля формы
    document.getElementById('degree').value = '';
    document.getElementById('institution').value = '';
    document.getElementById('city').value = '';
    document.getElementById('start-month').value = '';
    document.getElementById('start-year').value = '';
    document.getElementById('end-month').value = '';
    document.getElementById('end-year').value = '';
    document.getElementById('description').value = '';

    // Закрываем модальное окно
    document.getElementById('education-modal').style.display = 'none';
  });

  // Закрытие модального окна при клике вне его
  window.onclick = function (event) {
    const modal = document.getElementById('education-modal');
    if (event.target == modal) {
      modal.style.display = 'none';
    }
  };
}
