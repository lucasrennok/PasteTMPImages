import React from 'react';

import './styles.css'

interface PageHeaderProps{
    idPaste: string;
}

const PageHeader: React.FC<PageHeaderProps>= (pageHeaderProps) => {    
    const idPaste = pageHeaderProps.idPaste;

    return (
        <div className="page-header">
            <div className="headerText">
                <h1>Hey! Drop your your file</h1>
                <h3>Copy-Paste anything you want, then get it from anywhere</h3>
            </div>
            <div className="inputBox">
                <label>File Id</label>
                <input type="text" defaultValue="0"></input>
                <button type="button">Search</button>
            </div>
        </div>
    );
}

export default PageHeader;