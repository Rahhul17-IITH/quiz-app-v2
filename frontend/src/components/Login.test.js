import { render, screen } from '@testing-library/react';
import Login from './Login';

test('renders Login heading', () => {
  render(<Login />);
  expect(screen.getByText(/login/i)).toBeInTheDocument();
});
