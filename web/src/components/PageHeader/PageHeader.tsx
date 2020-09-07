import React, { useState } from 'react';

import './styles.css'
import api from '../../services/api';
import { ifError } from 'assert';

interface PageHeaderProps{
    idPaste: string;
}

const PageHeader: React.FC<PageHeaderProps>= (pageHeaderProps) => {    
    const [idPaste, setIdPaste] = useState(pageHeaderProps.idPaste);

    function handleSearchFiles(){
        if(idPaste.length!==10){
            alert('Id is wrong.')
        }else{
            api.get('?id='+encodeURIComponent(idPaste)).then(response => {
                if(response.data.length===0){
                    alert('Id is wrong.')
                }else{
                    //Redirect to filepage
                    console.log(response.data)
                }
            })
        }
    }

    return (
        <div className="page-header">
            <div className="headerText">
                <h1>Hey! Drop your your file</h1>
                <h3>Copy-Paste anything you want, then get it from anywhere</h3>
            </div>
            <div className="inputBox">
                <label>File Id</label>
                <input type="text" defaultValue={idPaste} onChange={e => setIdPaste(e.target.value)}></input>
                <button type="button" onClick={handleSearchFiles}>Search</button>
            </div>
        </div>
    );
}

export default PageHeader;