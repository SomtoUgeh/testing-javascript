import React from 'react';
import user from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import { ErrorBoundary } from '../error-boundary';
import { reportError as mockReportError } from '../api';

jest.mock('../api');

beforeAll(() => {
  jest.spyOn(console, 'error').mockImplementation(() => {});
});

afterAll(() => {
  console.error.mockRestore();
});

// retain the functionality of console.error and mock in other tests
afterEach(() => {
  jest.clearAllMocks();
});

function Bomb({ shouldThrow = false }) {
  if (shouldThrow) {
    throw new Error('💣');
  } else {
    return null;
  }
}

test('should render error boundary', () => {
  mockReportError.mockResolvedValueOnce({ success: true });

  const { rerender } = render(<Bomb />, { wrapper: ErrorBoundary });
  rerender(<Bomb shouldThrow={true} />);

  const error = expect.any(Error);
  const info = { componentStack: expect.stringContaining('Bomb') };

  expect(mockReportError).toHaveBeenCalledWith(error, info);
  expect(mockReportError).toHaveBeenCalledTimes(1);
  expect(console.error).toHaveBeenCalledTimes(2);

  // reset mock and console call times to 0
  mockReportError.mockClear();
  console.error.mockClear();

  rerender(<Bomb />);

  const alert = screen.getByRole('alert');
  expect(alert).toHaveTextContent(/There was a problem/i);

  const button = screen.getByText(/try again/i);
  user.click(button);

  expect(mockReportError).not.toHaveBeenCalled();
  expect(console.error).not.toHaveBeenCalled();
  expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  expect(screen.queryByText(/try again/i)).not.toBeInTheDocument();
});
