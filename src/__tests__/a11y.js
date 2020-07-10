import React from 'react';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';

function Form() {
  return (
    <form>
      <label htmlFor="input">
        My input
        <input id="input" placeholder="input" />
      </label>
    </form>
  );
}

test('form should be accessible', async () => {
  const { container } = render(<Form />);
  expect(await axe(container)).toHaveNoViolations();
});
