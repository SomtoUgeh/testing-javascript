import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { GreetingLoader } from '../greeting';
import user from '@testing-library/user-event';
import { loadGreeting as mockLoadGreeting } from '../api';

jest.mock('../api');

describe('Greeting components', () => {
  test('should show greeting after entering name', async () => {
    const TEST_GREETING = 'Hello';
    mockLoadGreeting.mockResolvedValueOnce({
      data: { greeting: TEST_GREETING },
    });

    render(<GreetingLoader />);

    const input = screen.getByLabelText(/name/i);
    const button = screen.getByText(/load/i);

    user.type(input, 'Mary');
    user.click(button);

    expect(mockLoadGreeting).toHaveBeenCalledWith('Mary');
    expect(mockLoadGreeting).toHaveBeenCalledTimes(1);

    // had to update test script in package.json to get this to work
    // it is a CRA issue using old jest and js-dom
    await waitFor(() =>
      expect(screen.getByLabelText(/greeting/i)).toHaveTextContent(
        TEST_GREETING
      )
    );
  });
});
