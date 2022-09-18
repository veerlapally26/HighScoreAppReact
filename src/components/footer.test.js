import React from 'react';
import { render, fireEvent, cleanup } from '@testing-library/react';
import Footer from './footer';

afterEach(cleanup)

it('should fire event score click', () => {
  const { getByTestId, getByText } = render(<Footer />);
  fireEvent.click(getByTestId('score-button'));
  const sendButton = getByText('Send it!');
  expect(sendButton).toBeDisabled;
});