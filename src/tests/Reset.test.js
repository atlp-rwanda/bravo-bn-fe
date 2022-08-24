import React from 'react';
import '@testing-library/jest-dom';
import { render, fireEvent, screen, waitFor } from './jest.setup';
import userEvent from '@testing-library/user-event';
 
import Reset from '../views/Reset.js';
 
describe("<Reset />", () => {
 
  test('render email input', () => {
    render(<Reset />);
 
    const inputEl = screen.getByPlaceholderText("Email");
    expect(inputEl).toBeInTheDocument();
    expect(inputEl).toHaveAttribute("type", "text");
    expect(inputEl).toHaveAttribute("name", "email");
    expect(inputEl).toHaveAttribute("placeholder", "Email");
  });
 
  test('pass valid email to test email input field', () => {
    render(<Reset />);
 
    fireEvent.change(screen.getByPlaceholderText('Email'), {
        target: { value: "test@gmail.com" },
      });
    expect(screen.getByPlaceholderText('Email')).toHaveValue("test@gmail.com");
    expect(screen.queryByTestId("error-msg")).not.toBeInTheDocument();
  });
  test('send email on click', async () => {
    render(<Reset />)
    const button = screen.getByRole('button')
    await fireEvent.click(button)
    expect(button).toHaveTextContent('Reset Password')
    expect(button).toHaveAttribute("type", "submit");
  })
 
  test('pass invalid email to test input value', () => {
    render(<Reset />);
 
    fireEvent.change(screen.getByPlaceholderText('Email'), {
        target: { value: "testgmail.com" },
      });
 
    expect(screen.getByPlaceholderText('Email')).toHaveValue("testgmail.com");
  });

  test('shows proper heading when rendered', () => {
    render(<Reset/>)
    const heading = screen.getByText('You forgot your password?')
    expect(heading).toBeInTheDocument()
  })

  
});