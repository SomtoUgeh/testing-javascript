import React from 'react';
import { render, screen } from '@testing-library/react';
import user from '@testing-library/user-event';
import { HiddenMessage } from '../hidden-message';

// mock packages and its return values
jest.mock('react-transition-group', () => {
  return {
    CSSTransition: (props) => (props.in ? props.children : null),
  };
});

test('should show hidden message when toggle is clicked', async () => {
  const message = 'Hello world';
  render(<HiddenMessage>{message}</HiddenMessage>);

  const toggleButton = screen.getByText(/toggle/i);
  expect(screen.queryByText(/hello world/i)).not.toBeInTheDocument();

  user.click(toggleButton);
  expect(screen.getByText(/hello world/i)).toBeInTheDocument();

  user.click(toggleButton);
  expect(screen.queryByText(/hello world/i)).not.toBeInTheDocument();
});
