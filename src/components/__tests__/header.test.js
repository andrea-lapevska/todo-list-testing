import { render, screen, cleanup} from "@testing-library/react";
import '@testing-library/jest-dom';
import React from "react";

import App from '../wrappers/App';


afterEach(() => {
   cleanup();
});

test('renders contents of header component', () => {
    render(<App/>);
   const headerText = screen.getByTestId('header-text');
   const inputElement = screen.getByTestId('input');
   expect(inputElement).toBeInTheDocument();
   expect(headerText).toBeInTheDocument();
   expect(headerText).toHaveTextContent('Things To Do');
});
