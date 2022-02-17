import { render, screen } from '@testing-library/react';
import App from './App';

test('Should show header', () => {
  render(<App />)
  const input = screen.getByText('GSR Crypto Trading');
  expect(input).toBeInTheDocument();
});

test('Should show trading pair selector label', () => {
  render(<App />)
  const input = screen.getByText('Select a Product');
  expect(input).toBeInTheDocument();
});

test('Should show trading coming soon container', () => {
  render(<App />)
  const input = screen.getByText('Trading Chart');
  expect(input).toBeInTheDocument();
});

