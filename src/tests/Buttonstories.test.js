import React from 'react';
import '@testing-library/jest-dom';
import { render, fireEvent, screen, waitFor } from './jest.setup';

import Button from '../components/Button/Button.js';

describe("<button />", () => {

    test('render input', () => {
        render(<Button />);
        const btnEl = screen.getByRole('button');
        expect(btnEl).toBeInTheDocument();
        expect(btnEl).toHaveAttribute("type", "submit");

    })
})