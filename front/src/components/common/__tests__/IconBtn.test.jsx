import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import IconBtn from '../IconBtn';

test('renders IconBtn with text', () => {
  render(<IconBtn text="Click me" />);
  expect(screen.getByText('Click me')).toBeInTheDocument();
});
