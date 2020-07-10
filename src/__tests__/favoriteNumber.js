import React from 'react';
import { render, screen } from '@testing-library/react';
import { FavoriteNumber } from '../favoriteNumber';
import user from '@testing-library/user-event';

test('should render an input with label "Favorite Number"', () => {
  const { rerender, debug } = render(<FavoriteNumber />);

  const input = screen.getByLabelText(/favorite number/i);
  expect(input).toBeInTheDocument();

  user.type(input, '10');
  const alert = screen.getByRole('alert');
  expect(alert).toBeInTheDocument();
  expect(alert).toHaveTextContent(/number is invalid/i);

  rerender(<FavoriteNumber max={10} />);
  expect(screen.queryByRole('alert')).toBeNull();
});
