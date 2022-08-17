import React from 'react';
import '@testing-library/jest-dom';
import { render, fireEvent, screen, waitFor } from './jest.setup';
import userEvent from '@testing-library/user-event';
import Details from '../components/dashboard/details'
import Users from "../components/dashboard/Users";
 
describe("<details />", () => {
    test('shows proper span when rendered', () => {
        render(<Details />)
        const span = screen.getByText('User')
        expect(span).toBeInTheDocument()
      });

  test('save on click', async () => {
    render(<Details />)
    

    const button =screen.getByTestId("btn1");
    await fireEvent.click(button)
    expect(button).toHaveTextContent('Save')
  })

  test('close on click', async () => {
    render(<Details />)
    const button = screen.getByTestId("btn2");
    expect(button).toHaveTextContent('Close')
  })

});