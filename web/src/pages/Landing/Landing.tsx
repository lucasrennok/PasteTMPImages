import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import './styles.css'
import PageHeader from '../../components/PageHeader/PageHeader';
import Dropzone from 'react-dropzone';
import { saveAs } from 'file-saver';

function Landing() {
    const [allFiles, setAllFiles] = useState([]);
    const [allFilesText, setAllFilesText] = useState([(<p key="default">Drag 'n' drop some files here, or click to select files</p>)]);

    function handleAllFiles(allFilesVector: any){
        //@ts-ignore
        let newAllFilesText = [];
        let filesSize = 0;
        for(let i in allFilesVector){
            //@ts-ignore
            newAllFilesText[i] = (<p key={i}>Name: {allFilesVector[i].name} | Size: {Math.round(allFilesVector[i].size/(1024*1024)*100)/100}MB</p>)
            filesSize += allFilesVector[i].size;
        }
        if(filesSize/(1024*1024)<=5){
            setAllFiles(allFilesVector);
            //@ts-ignore
            setAllFilesText(newAllFilesText);
        }else{
            alert('Storage accepted: 5MB');
        }
    }

    function handlePasteIt(){
        saveAs(allFiles[0])
    }

    return (
        <div className="page-landing">
            <PageHeader idPaste="0" />
            <Dropzone onDrop={acceptedFiles => handleAllFiles(acceptedFiles)}>
                {({getRootProps, getInputProps}) => (
                    <section className="dropBox">
                        <div {...getRootProps()}>
                            <input {...getInputProps()} />
                            
                            {allFilesText}
                        </div>
                        
                    </section>
                )}
            </Dropzone>
            <button type="button" onClick={handlePasteIt} disabled={allFiles.length>0? false: true}>Paste it</button>
        </div>
    );
}

export default Landing;
