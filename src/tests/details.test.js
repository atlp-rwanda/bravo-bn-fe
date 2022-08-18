import React from 'react';
import '@testing-library/jest-dom';
import { render, fireEvent, screen, waitFor } from './jest.setup';
import Details from '../components/dashboard/details'

 
describe("<details />", () => {
    test('shows proper span when rendered', () => {
        render(<Details />)
        const span = screen.getByText('User')
        expect(span).toBeInTheDocument()
      });

  test('click on save',  () => {
    render(<Details />)
    const button =screen.getByTestId("btn1");
    expect(button).toHaveTextContent('Save')
  })

  test('click on close', () => {
    render(<Details />)
    const button = screen.getByTestId("btn2");
    expect(button).toHaveTextContent('Close')
  })

});