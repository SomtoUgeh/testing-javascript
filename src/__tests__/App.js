import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';

describe('Testing App', () => {
  test('should render the app', () => {
    render(<App />);

    const learnReactText = screen.getByText(/learn/i);
    expect(learnReactText).toBeInTheDocument();
  });
});
