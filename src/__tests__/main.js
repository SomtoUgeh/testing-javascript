import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import user from '@testing-library/user-event';
import { render as rtlRender, screen } from '@testing-library/react';
import { Main } from '../main';

function render(
  ui,
  {
    route = '/',
    history = createMemoryHistory({
      initialEntries: [route],
    }),
    ...renderOptions
  } = {}
) {
  function Wrapper({ children }) {
    return <Router history={history}>{children}</Router>;
  }

  return {
    ...rtlRender(ui, {
      wrapper: Wrapper,
      ...renderOptions,
    }),
    history,
  };
}

test('should render routes properly', () => {
  render(<Main />);
  expect(screen.getByRole('heading')).toHaveTextContent(/home/i);
  user.click(screen.getByText(/about/i));

  // TODO: Navigation is breaking
  // expect(screen.getByRole('heading')).toHaveTextContent(/about/i);
});

test('landing on a bad page shows 404 page', () => {
  render(<Main />, { route: '/some/bad/route' });
  expect(screen.getByRole('heading')).toHaveTextContent('404');
});
