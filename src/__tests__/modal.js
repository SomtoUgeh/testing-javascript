import React from 'react';
import { render, within } from '@testing-library/react';
import { Modal } from '../modal';

test('modal shows the children', () => {
  render(
    <>
      <div data-testid="wow" />
      <Modal>
        <div data-testid="test" />
      </Modal>
    </>
  );

  // creates a bind for elements within a specific scope
  const { getByTestId, queryByTestId } = within(
    document.getElementById('modal-root')
  );

  expect(getByTestId('test')).toBeInTheDocument();
  expect(queryByTestId('wow')).not.toBeInTheDocument();
});
