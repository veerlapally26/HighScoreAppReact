import React from 'react';
import { render, cleanup, fireEvent, waitFor } from '@testing-library/react';
import App from './App';

afterEach(cleanup);

test('should take a snapshot', () => {
  const { asFragment } = render(<App />);
    
  expect(asFragment(<App />)).toMatchSnapshot();
});

test('Has header and checkbox', () => {
  const { getByTestId } = render(<App />);
  expect(getByTestId('header-text')).toHaveTextContent('LEADER BOARD');
  expect(getByTestId('counter')).toHaveTextContent('10 clicks left.');
});