import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import LoginForm from '../LoginForm';
import { MemoryRouter } from 'react-router-dom';

// Mock useDispatch and useNavigate
const mockDispatch = vi.fn();
const mockNavigate = vi.fn();

vi.mock('react-redux', () => ({
  useDispatch: () => mockDispatch,
}));

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

// Mock login API
import { login } from '../../../../services/operations/authAPI';
vi.mock('../../../../services/operations/authAPI', () => ({
  login: vi.fn(),
}));

describe('LoginForm integration', () => {
  test('submits form and triggers login with dispatch and navigate', () => {
    render(
      <MemoryRouter>
        <LoginForm />
      </MemoryRouter>
    );

    // Fill in form
    fireEvent.change(screen.getByPlaceholderText('Enter email address'), {
      target: { value: 'tech@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('Enter Password'), {
      target: { value: 'secure123' },
    });

    // Submit form
    fireEvent.click(screen.getByRole('button', { name: /sign in/i }));

    // Assert login was called with correct args
    expect(login).toHaveBeenCalledWith('tech@example.com', 'secure123', mockNavigate);

    // Assert dispatch was triggered
    expect(mockDispatch).toHaveBeenCalled();
  });
});
