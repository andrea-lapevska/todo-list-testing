import { render, screen, cleanup, fireEvent} from "@testing-library/react";
import '@testing-library/jest-dom';
import React from "react";

import App from '../wrappers/App';

afterEach(() => {
    cleanup();
});

test('add button shows input box', () => {
    render(<App/>);
    const addButton = screen.getByTestId('add-button');
    const input = screen.getByTestId("input");
    fireEvent.click(addButton);
    expect(input).not.toBeInTheDocument();
    fireEvent.click(addButton);
    expect(screen.getByPlaceholderText("Add New")).toBeInTheDocument();
});

test('search button shows search box', () => {
    render(<App/>);
    const searchButton = screen.getByTestId('search-button');
    fireEvent.click(searchButton);
    const search = screen.getByTestId("search");
    expect(search).toBeInTheDocument();
    fireEvent.click(searchButton);
    expect(search).not.toBeInTheDocument();
});

test('should show amount of items left', () => {
   render(<App/>);
   const itemsLeft = screen.getByTestId("items-left");
   expect(itemsLeft).toHaveTextContent("3 items left");
   const checkBox1 = screen.getByTestId(1);
   fireEvent.click(checkBox1);
   expect(itemsLeft).toHaveTextContent("2 items left");
});

test('all button shows all items in the list', () => {
   render(<App/>);
   const allFilterButton = screen.getByTestId("All");
   const itemList = screen.getByTestId("list");
   fireEvent.click(allFilterButton);
   expect(itemList).toHaveTextContent("Learn Javascript Learn React Build a React App");
});

test('active button shows active items', () => {
    render(<App/>);
    const activeFilterButton = screen.getByTestId("Active");
    const itemList = screen.getByTestId("list");
    fireEvent.click(activeFilterButton);
    expect(itemList).toHaveTextContent("Learn Javascript Learn React Build a React App");
    const checkBox1 = screen.getByTestId(1);
    fireEvent.click(checkBox1);
    expect(itemList).not.toHaveTextContent("Learn Javascript");
    expect(itemList).toHaveTextContent("Learn React Build a React App");
});

test('completed button shows completed items', () => {
    render(<App/>);
    const completedFilterButton = screen.getByTestId("Completed");
    fireEvent.click(completedFilterButton);
    const errorMsg = screen.getByTestId('error-message');
    expect(errorMsg).toBeInTheDocument();
    expect(errorMsg).toHaveTextContent('There are no items.');
    const allFilterButton = screen.getByTestId("All");
    fireEvent.click(allFilterButton);
    const checkBox1 = screen.getByTestId(1);
    fireEvent.click(checkBox1);
    fireEvent.click(completedFilterButton);
    const itemList = screen.getByTestId("list");
    expect(itemList).not.toHaveTextContent("Learn React Build a React App");
    expect(itemList).toHaveTextContent("Learn Javascript");
});
