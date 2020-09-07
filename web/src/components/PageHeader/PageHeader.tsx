import React, { useState } from 'react';

import './styles.css'
import { Redirect } from 'react-router-dom';
import logoImg from '../../assets/images/logo.png'
import searchIcon from '../../assets/images/icons/searchIcon.png'

//Create props
interface PageHeaderProps{
    idPaste: string;
}

const PageHeader: React.FC<PageHeaderProps>= (pageHeaderProps) => {    
    const [idPaste, setIdPaste] = useState(pageHeaderProps.idPaste);
    const [redirect, setRedirect] = useState((<div></div>));

    //Search Files with the ID
    function handleSearchFiles(){
        if(idPaste.length!==10){
            alert('Id is wrong.')
        }else{
            //Redirect to a route
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
                <h1 className="titleText"><img src={logoImg} alt="file" width="50"/>Hey! Drop your file</h1>
                <h3 className="titleText">Copy-Paste anything, then get it from anywhere</h3>
            </div>
            <div className="inputBox">
                <label>Files Id</label>
                <input type="text" defaultValue={idPaste} onChange={e => setIdPaste(e.target.value)}></input>
                <button type="button" id="searchButton" onClick={handleSearchFiles}>
                    <img src={searchIcon} alt="search" width="30"/>
                    Search
                </button>
                {redirect}
            </div>
        </div>
    );
}

export default PageHeader;