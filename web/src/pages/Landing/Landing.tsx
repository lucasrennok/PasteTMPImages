import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import './styles.css'
import PageHeader from '../../components/PageHeader/PageHeader';
import Dropzone from 'react-dropzone';
import { saveAs } from 'file-saver';
import { getRandomId } from '../../utils/getRandomId';

function Landing() {
    const [urlIdFiles, setUrlIdFiles] = useState('');
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
        const id = getRandomId();
        //Save at db
        setUrlIdFiles('ID: '+ id + ' | Link: ' + 'localhost:3000/'+id);
    
        console.log(allFiles)
        //Reset files
        setAllFiles([])
        setAllFilesText([(<p key="default">Drag 'n' drop some files here, or click to select files</p>)]);
    
        let reader = new FileReader();

        reader.readAsArrayBuffer(allFiles[0]);
        reader.onloadend = function(){
            console.log(reader.result);
            // Convert to string and put at db
            
            //I can store reader.result at database... name and type too
            //@ts-ignore
            let newfile = new File([reader.result], allFiles[0].name, {type: allFiles[0].type});
            //@ts-ignore
            let newblob = new Blob([reader.result], {type: allFiles[0].type});
            console.log(newblob);
            saveAs(newblob)
        }
        // saveAs(File)
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
            {urlIdFiles}
        </div>
    );
}

export default Landing;
