import { render, screen, cleanup, fireEvent} from "@testing-library/react";
import '@testing-library/jest-dom';
import React from "react";

import App from '../wrappers/App';
import {KEY_SLASH, KEY_N, KEY_ESCAPE} from 'keycode-js';
import KeyCode from 'keycode-js';


afterEach(() => {
    cleanup();
});

test('shows and removes add new', () => {
    render(<App/>);
    const input = screen.getByPlaceholderText("Add New");
    expect(input).toBeInTheDocument();
    fireEvent.keyDown(document, {keyCode: KEY_ESCAPE, charCode: 27, which: 27});
    expect(input).not.toBeInTheDocument();
    fireEvent.keyDown(document, {keyCode: KEY_N, charCode: 78, which: 78});
    expect(screen.getByTestId("input")).toBeInTheDocument();
});

test('adds new element to list', () => {
    render(<App/>);
    const input = screen.getByTestId('input');
   fireEvent.change(input, {target: {value: "Test components"}});
   fireEvent.keyUp(input, {keyCode: KeyCode.KEY_RETURN, charCode: 13, which: 13});
   expect(input).toHaveValue("");
   const todos = screen.getByTestId('list');
   expect(todos).toHaveTextContent('Test components');
});



