import React from 'react';
import { render as rtlRender, screen } from '@testing-library/react';
import { Counter } from '../redux-counter';
import user from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { reducer } from '../redux-reducer';

function render(
  ui,
  {
    initialState,
    store = createStore(reducer, initialState),
    ...rtlOptions
  } = {}
) {
  function Wrapper({ children }) {
    return <Provider store={store}>{children}</Provider>;
  }

  return { ...rtlRender(ui, { wrapper: Wrapper, ...rtlOptions }), store };
}

function renderCounter(initialState) {
  render(<Counter />, { initialState });

  const addBtn = screen.getByText('+');
  const subtractBtn = screen.getByText('-');

  const count = screen.getByLabelText(/count/i);

  return {
    addBtn,
    subtractBtn,
    count,
  };
}

test('should render a counter', () => {
  const { addBtn, subtractBtn, count } = renderCounter();

  user.click(addBtn);
  expect(count).toHaveTextContent('1');

  user.click(addBtn);
  expect(count).toHaveTextContent('2');

  user.click(subtractBtn);
  expect(count).toHaveTextContent('1');
});

test('should render redux with custom initial state', () => {
  const { addBtn, subtractBtn, count } = renderCounter({ count: 3 });

  user.click(addBtn);
  expect(count).toHaveTextContent('4');

  user.click(addBtn);
  expect(count).toHaveTextContent('5');

  user.click(subtractBtn);
  expect(count).toHaveTextContent('4');
});
