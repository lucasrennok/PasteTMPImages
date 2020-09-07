import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import './styles.css'
import PageHeader from '../../components/PageHeader/PageHeader';
import { str2vector } from '../../utils/str2vector';
import { vector2uint8array } from '../../utils/vector2uint8array';
import { saveAs } from 'file-saver';

const FilePage = (props: any) => {
    console.log(props.match.params.fileId)
    
    // var buffer = new Buffer(file);
            
    // const vector = str2vector(file)
    // const newUint = vector2uint8array(vector);

    // // @ts-ignore
    // let newblob = new Blob([newUint], {type: allFiles[j].type});
    // saveAs(newblob)

    return (
        <div className="page-file">
            <PageHeader idPaste={props.match.params.fileId} />
            <h1>aaaa</h1>
        </div>
    );
}

export default FilePage;
