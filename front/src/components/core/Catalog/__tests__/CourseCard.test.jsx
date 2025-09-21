import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import Course_Card from '../Course_Card';

// Mock GetAvgRating
vi.mock('../../../utils/avgRating', () => ({
  default: () => 4.2,
}));

const mockCourse = {
  _id: '123',
  courseName: 'React Mastery',
  instructor: {
    firstName: 'Jane',
    lastName: 'Doe',
  },
  thumbnail: 'test-thumbnail.jpg',
  ratingAndReviews: [{ rating: 5 }, { rating: 3 }],
  price: '499',
};

test('renders Course_Card with course details', () => {
  render(
    <MemoryRouter>
      <Course_Card course={mockCourse} Height="h-40" />
    </MemoryRouter>
  );

  expect(screen.getByText('React Mastery')).toBeInTheDocument();
  expect(screen.getByText('Jane Doe')).toBeInTheDocument();
  expect(screen.getByText(/Rs. 499/)).toBeInTheDocument();
  expect(screen.getByText(/2 Ratings/)).toBeInTheDocument();
});
