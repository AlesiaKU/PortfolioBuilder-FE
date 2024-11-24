import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Register from '../components/Register.jsx';
import '@testing-library/jest-dom'; // Импортируем jest-dom для дополнительных матчеров

// Мокируем useNavigate
const mockNavigate = jest.fn();
const mockLocation = { search: '' };

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
  useLocation: () => mockLocation,
}));

// Мокируем глобальную функцию fetch
global.fetch = jest.fn();

describe('Компонент Register', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('отображение первого этапа (отправка email)', () => {
    render(
      <MemoryRouter>
        <Register />
      </MemoryRouter>
    );

    // Проверяем отображение формы для отправки email
    expect(screen.getByPlaceholderText(/Enter your email/i)).toBeInTheDocument();
    expect(screen.getByText(/Отправить/i)).toBeInTheDocument();
  });

  test('отправка email успешно', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ message: 'Verification email sent' }),
    });

    render(
      <MemoryRouter>
        <Register />
      </MemoryRouter>
    );

    const emailInput = screen.getByPlaceholderText(/Enter your email/i);
    const submitButton = screen.getByText(/Отправить/i);

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.click(submitButton);

    // Проверяем, что сообщение об успешной отправке появилось
    await waitFor(() => {
      expect(screen.getByText(/Проверьте вашу почту для подтверждения/i)).toBeInTheDocument();
    });
  });

  test('ошибка при отправке email', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: false,
      json: () => Promise.resolve({ message: 'Invalid email' }),
    });

    render(
      <MemoryRouter>
        <Register />
      </MemoryRouter>
    );

    const emailInput = screen.getByPlaceholderText(/Enter your email/i);
    const submitButton = screen.getByText(/Отправить/i);

    fireEvent.change(emailInput, { target: { value: 'wrongemail' } });
    fireEvent.click(submitButton);

    await waitFor(() => expect(screen.getByText(/Invalid email/i)).toBeInTheDocument());
  });

  test('переход на второй этап при наличии параметров URL', () => {
    mockLocation.search = '?email=test@example.com&token=123456';

    render(
      <MemoryRouter>
        <Register />
      </MemoryRouter>
    );

    // Проверяем, что email отображается и заблокирован для редактирования
    expect(screen.getByDisplayValue('test@example.com')).toBeInTheDocument();
    expect(screen.getByDisplayValue('test@example.com')).toBeDisabled();

    // Проверяем, что отображается форма установки пароля
    expect(screen.getByPlaceholderText(/Enter your password/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Confirm your password/i)).toBeInTheDocument();
  });

  test('ошибка при отсутствии токена в URL на втором этапе', () => {
    mockLocation.search = '?email=test@example.com';

    render(
      <MemoryRouter>
        <Register />
      </MemoryRouter>
    );

    expect(screen.getByPlaceholderText(/Enter your email/i)).toBeInTheDocument();
    expect(screen.getByText(/Отправить/i)).toBeInTheDocument();
    expect(screen.queryByPlaceholderText(/Enter your password/i)).not.toBeInTheDocument();
  });
  
  
  test('ошибка при регистрации с неверным паролем', async () => {
    mockLocation.search = '?email=test@example.com&token=123456';

    render(
      <MemoryRouter>
        <Register />
      </MemoryRouter>
    );

    const passwordInput = screen.getByPlaceholderText(/Enter your password/i);
    const confirmPasswordInput = screen.getByPlaceholderText(/Confirm your password/i);
    const submitButton = screen.getByText(/Create Account/i);

    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.change(confirmPasswordInput, { target: { value: 'password1234' } });
    fireEvent.click(submitButton);

    expect(screen.getByText(/Passwords do not match/i)).toBeInTheDocument();
  });
});
