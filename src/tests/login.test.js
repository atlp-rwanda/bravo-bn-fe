/* eslint-disable */
import React from 'react';
import '@testing-library/jest-dom';
import { render, fireEvent, screen, waitFor } from './jest.setup';

import Login from '../views/Login';

const user = {
  firstname: 'Tresor',
  lastname: 'Alain',
  email: 'alaintresor@gmail.com',
  password: 'Tresor123@',
  confirmPassword: 'Tresor123@',
};

const loginUser = {
  email: 'tresoralain351@gmail.com',
  password: 'testing',
};

const wrongData = {
  shortPassword: '123',
  validEmail: 'testing@gmail.com',
  wrongEmail: 'wrongemail@gmail',
  errorEmail: 'error@gmail.com',
};

test('Logins in the user after clicking login button', async () => {
    render(<Login />);

    expect(screen.getByText(/Login/i)).toBeInTheDocument();
    expect(screen.queryByText(/Error:/i)).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /login/i }));
    expect(screen.queryByText(/Please enter your email/i)).toBeInTheDocument();
    fireEvent.change(screen.getByPlaceholderText('Email'), {
      target: { value: wrongData.wrongEmail },
    });
    fireEvent.click(screen.getByRole('button', { name: /login/i }));
    expect(screen.queryByText(/Please enter a valid email/i)).toBeInTheDocument();

    fireEvent.change(screen.getByPlaceholderText('Email'), {
      target: { value: loginUser.email },
    });
    fireEvent.click(screen.getByRole('button', { name: /login/i }));
    expect(screen.queryByText(/Please enter your password/i)).toBeInTheDocument();
    
    fireEvent.change(screen.getByPlaceholderText('Password'), {
      target: { value: wrongData.shortPassword },
    });
    fireEvent.click(screen.getByRole('button', { name: /login/i }));
    expect(screen.queryByText(/Password must be at least 6 characters long/i)).toBeInTheDocument();
  
  });