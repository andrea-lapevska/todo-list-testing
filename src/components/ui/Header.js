import React from 'react';
import InputWrapper from './InputWrapper';

export default function Header(props) {
    return (
        <header data-testid='header-element'>
            <h1 data-testid='header-text'>Things To Do</h1>
            <InputWrapper {...props}/>
        </header>
    );
}
