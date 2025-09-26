import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const mockDispatch = vi.fn();
const mockNavigate = vi.fn();


vi.mock('react-hot-toast', () => ({
  __esModule: true,
  toast: {
    error: vi.fn(),
  },
}));


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

vi.mock('../../../services/operations/authAPI', () => ({
  sendOtp: vi.fn(),
}));

vi.mock('../../../slices/authSlice', () => ({
  setSignupData: vi.fn(),
}));

vi.doMock('../../../common/Tab', () => ({
  __esModule: true,
  default: () => <div data-testid="mock-tab">Mock Tab</div>,
}));

let SignupForm;

beforeEach(async () => {
  SignupForm = (await import('../SignupForm')).default;
});

describe('SignupForm unit tests', () => {
  test('renders all input fields and submit button', () => {
    render(
      <MemoryRouter>
        <SignupForm />
      </MemoryRouter>
    );

    expect(screen.getByPlaceholderText('Enter first name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter last name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter email address')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter Password')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Confirm Password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /create account/i })).toBeInTheDocument();
  });

  test('updates input values on change', () => {
    render(
      <MemoryRouter>
        <SignupForm />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText('Enter first name'), {
      target: { value: 'Tech' },
    });
    fireEvent.change(screen.getByPlaceholderText('Enter email address'), {
      target: { value: 'tech@example.com' },
    });

    expect(screen.getByPlaceholderText('Enter first name').value).toBe('Tech');
    expect(screen.getByPlaceholderText('Enter email address').value).toBe('tech@example.com');
  });

  test('toggles password visibility when icon is clicked', () => {
    render(
      <MemoryRouter>
        <SignupForm />
      </MemoryRouter>
    );

    const passwordInput = screen.getByPlaceholderText('Enter Password');
    const toggleIcon = passwordInput.nextSibling;

    expect(passwordInput).toHaveAttribute('type', 'password');
    fireEvent.click(toggleIcon);
    expect(passwordInput).toHaveAttribute('type', 'text');
  });


  test('dispatches signup data and sendOtp when passwords match', () => {
  render(
    <MemoryRouter>
      <SignupForm />
    </MemoryRouter>
  );

  fireEvent.change(screen.getByPlaceholderText('Enter first name'), {
    target: { value: 'Tech' },
  });
  fireEvent.change(screen.getByPlaceholderText('Enter last name'), {
    target: { value: 'Builder' },
  });
  fireEvent.change(screen.getByPlaceholderText('Enter email address'), {
    target: { value: 'tech@example.com' },
  });
  fireEvent.change(screen.getByPlaceholderText('Enter Password'), {
    target: { value: 'secure123' },
  });
  fireEvent.change(screen.getByPlaceholderText('Confirm Password'), {
    target: { value: 'secure123' },
  });

  fireEvent.click(screen.getByRole('button', { name: /create account/i }));

  expect(mockDispatch).toHaveBeenCalledTimes(2);
  expect(mockDispatch).toHaveBeenCalledWith(
    expect.objectContaining({ type: expect.stringMatching(/auth\/setSignupData/) })
  );
  expect(mockDispatch).toHaveBeenCalledWith(
    expect.any(Function) // sendOtp is a thunk
  );
});


 


  
});
