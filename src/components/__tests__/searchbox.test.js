import { render, screen, cleanup, fireEvent} from "@testing-library/react";
import '@testing-library/jest-dom';
import React from "react";

import App from '../wrappers/App';
import {KEY_SLASH, KEY_N, KEY_ESCAPE} from 'keycode-js';


afterEach(() => {
    cleanup();
});

test('shows and removes search', () => {
    render(<App/>);
    fireEvent.keyDown(document, {keyCode: KEY_ESCAPE, charCode: 27, which: 27});
    fireEvent.keyDown(document, {keyCode: KEY_SLASH, charCode: 47, which: 47});
    const search = screen.getByPlaceholderText("Search");
    expect(search).toBeInTheDocument();
    fireEvent.keyDown(document, {keyCode: KEY_ESCAPE, charCode: 27, which: 27});
    expect(search).not.toBeInTheDocument();
    fireEvent.keyDown(document, {keyCode: KEY_SLASH, charCode: 47, which: 47});
    expect(screen.getByTestId("search")).toBeInTheDocument();
});

test('shows search results', () => {
    render(<App/>);
    fireEvent.keyDown(document, {keyCode: KEY_ESCAPE, charCode: 27, which: 27});
    fireEvent.keyDown(document, {keyCode: KEY_SLASH, charCode: 47, which: 47});
    const search = screen.getByTestId('search');
    fireEvent.change(search, {target: {value: "Learn"}});
    const todos = screen.getByTestId('list');
    expect(todos).toHaveTextContent('Learn Javascript Learn React');
    expect(todos).not.toHaveTextContent('Build a React App');
});
