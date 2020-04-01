import React from 'react';

type HeaderProps = { children: any };

const Header = ({ children } : HeaderProps) => {
    return (
        <header>
            <h1>{children}</h1>
        </header>
    );
}

export default Header;