import React from 'react';
import { render, screen } from '@testing-library/react';
import user from '@testing-library/user-event';
import App from '../my-app';
import { submitForm as mockSubmitForm } from '../api';

jest.mock('../api');

test('should render a working step form', async () => {
  mockSubmitForm.mockResolvedValueOnce({ success: true });
  render(<App />);

  user.click(await screen.findByText(/fill.*form/i));

  user.click(await screen.findByText(/go home/i));
  expect(await screen.findByText(/fill.*form/i)).toBeInTheDocument();

  user.click(await screen.findByText(/fill.*form/i));
  user.type(await screen.findByLabelText(/food/i), 'rice');
  user.click(await screen.findByText(/next/i));

  user.type(await screen.findByLabelText(/drink/i), 'fanta');
  user.click(await screen.findByText(/review/i));

  user.click(await screen.findByText(/confirm/i, { selector: 'button' }));

  expect(mockSubmitForm).toHaveBeenCalledTimes(1);
  expect(mockSubmitForm).toHaveBeenCalledWith({
    food: 'rice',
    drink: 'fanta',
  });

  user.click(await screen.findByText(/home/i));
  expect(await screen.findByText(/welcome home/i)).toBeInTheDocument();
});
