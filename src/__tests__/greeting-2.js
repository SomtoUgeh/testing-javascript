import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { GreetingLoader } from '../greeting-2';
import user from '@testing-library/user-event';

test('should mock api', async () => {
  const TEST_GREETING = 'Hello';
  const mockLoadGreeting = jest.fn();
  mockLoadGreeting.mockResolvedValueOnce({ data: { greeting: TEST_GREETING } });

  render(<GreetingLoader loadGreeting={mockLoadGreeting} />);
  const input = screen.getByLabelText(/name/i);
  const button = screen.getByText(/load/i);

  user.type(input, 'John');
  user.click(button);

  expect(mockLoadGreeting).toHaveBeenCalledWith('John');
  expect(mockLoadGreeting).toHaveBeenCalledTimes(1);

  await waitFor(() =>
    expect(screen.getByLabelText(/greeting/i)).toHaveTextContent(TEST_GREETING)
  );
});
