import React from 'react';
import { render, screen } from '@testing-library/react';
import "@testing-library/jest-dom";
import InicioPage from '@/pages/home'; 

describe('Inicio page ', () => {
    it('Should render property', () => {
        render(<InicioPage />);

    });
});

