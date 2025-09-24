import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import LoginForm from '../LoginForm';
import { MemoryRouter } from 'react-router-dom';

// Mock useDispatch and login function
import { useDispatch } from 'react-redux';
import { login } from '../../../../services/operations/authAPI';
vi.mock('react-redux', () => ({
  useDispatch: () => vi.fn(),
}));
vi.mock('../../../../services/operations/authAPI', () => ({
  login: vi.fn(),
}));

describe('LoginForm component', () => {
  // 🧪 Test 1: Check if form elements render correctly
  test('renders email, password inputs and submit button', () => {
    render(
    <MemoryRouter>
        <LoginForm />
    </MemoryRouter>
    );
    
    // Check email input
    expect(screen.getByPlaceholderText('Enter email address')).toBeInTheDocument();
    
    // Check password input
    expect(screen.getByPlaceholderText('Enter Password')).toBeInTheDocument();
    
    // Check submit button
    expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();
    
    // Check forgot password link
    expect(screen.getByText(/forgot password/i)).toBeInTheDocument();
  });

  // 🧪 Test 2: Simulate typing in email and password fields
  test('updates input values on change', () => {
    render(
    <MemoryRouter>
        <LoginForm />
    </MemoryRouter>);
    
    const emailInput = screen.getByPlaceholderText('Enter email address');
    const passwordInput = screen.getByPlaceholderText('Enter Password');

    // Simulate typing
    fireEvent.change(emailInput, { target: { value: 'tech@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'secure123' } });

    // Check updated values
    expect(emailInput.value).toBe('tech@example.com');
    expect(passwordInput.value).toBe('secure123');
  });

  // 🧪 Test 3: Toggle password visibility
  test('toggles password visibility when icon is clicked', () => {
    render(
    <MemoryRouter>
        <LoginForm />
    </MemoryRouter>);
    
    const passwordInput = screen.getByPlaceholderText('Enter Password');
    // const toggleIcon = screen.getByRole('button', { hidden: true });
    const toggleIcon = screen.getByTestId('toggle-password');

    // Initially password type should be 'password'
    expect(passwordInput).toHaveAttribute('type', 'password');

    // Click the toggle icon
    fireEvent.click(toggleIcon);

    // Password type should now be 'text'
    expect(passwordInput).toHaveAttribute('type', 'text');
  });

  // 🧪 Test 4: Submits form and calls login function
  test('calls login function on form submit', () => {
    render(
    <MemoryRouter>
        <LoginForm />
    </MemoryRouter>);
    
    const emailInput = screen.getByPlaceholderText('Enter email address');
    const passwordInput = screen.getByPlaceholderText('Enter Password');
    const submitButton = screen.getByRole('button', { name: /sign in/i });

    // Fill in form
    fireEvent.change(emailInput, { target: { value: 'tech@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'secure123' } });

    // Submit form
    fireEvent.click(submitButton);

    // Check if login function was called
    expect(login).toHaveBeenCalledWith('tech@example.com', 'secure123', expect.any(Function));
  });
});
