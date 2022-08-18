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

  test('save on click',  () => {
    render(<Details />)
    const button =screen.getByTestId("btn1");
     fireEvent.click(button)
    expect(button).toHaveTextContent('Save')
  })

  test('close on click', () => {
    render(<Details />)
    const button = screen.getByTestId("btn2");
    expect(button).toHaveTextContent('Close')
  })

});