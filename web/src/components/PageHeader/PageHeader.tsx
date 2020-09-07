import React, { useState } from 'react';

import './styles.css'
import { Redirect } from 'react-router-dom';

interface PageHeaderProps{
    idPaste: string;
}

const PageHeader: React.FC<PageHeaderProps>= (pageHeaderProps) => {    
    const [idPaste, setIdPaste] = useState(pageHeaderProps.idPaste);
    const [redirect, setRedirect] = useState((<div></div>));

    function handleSearchFiles(){
        if(idPaste.length!==10){
            alert('Id is wrong.')
        }else{
            const routeToGo = "/paste/"+idPaste;
            if(window.location.pathname.substr(0,7)==='/paste/'){
                window.location.pathname = routeToGo;
            }
            setRedirect(<Redirect to={routeToGo} />);
        }
    }

    return (
        <div className="page-header">
            <div className="headerText">
                <h1>Hey! Drop your file</h1>
                <h3>Copy-Paste anything you want, then get it from anywhere</h3>
            </div>
            <div className="inputBox">
                <label>File Id</label>
                <input type="text" defaultValue={idPaste} onChange={e => setIdPaste(e.target.value)}></input>
                <button type="button" onClick={handleSearchFiles}>Search</button>
                {redirect}
            </div>
        </div>
    );
}

export default PageHeader;