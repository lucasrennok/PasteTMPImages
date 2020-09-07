import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import './styles.css'
import PageHeader from '../../components/PageHeader/PageHeader';
import { str2vector } from '../../utils/str2vector';
import { vector2uint8array } from '../../utils/vector2uint8array';
import { saveAs } from 'file-saver';

function FilePage(){

    
    // var buffer = new Buffer(file);
            
    // const vector = str2vector(file)
    // const newUint = vector2uint8array(vector);

    // // @ts-ignore
    // let newblob = new Blob([newUint], {type: allFiles[j].type});
    // saveAs(newblob)
    
    return (
        <div className="page-file">
            <h1>aaaa</h1>
        </div>
    );
}

export default FilePage;
