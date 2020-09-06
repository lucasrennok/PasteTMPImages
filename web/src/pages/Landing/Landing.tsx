import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import './styles.css'
import PageHeader from '../../components/PageHeader/PageHeader';
import Dropzone from 'react-dropzone';
import { saveAs } from 'file-saver';
import { getRandomId } from '../../utils/getRandomId';
import api from '../../services/api';
import { str2vector } from '../../utils/str2vector';
import { vector2uint8array } from '../../utils/vector2uint8array';

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

        let arrayResult: Uint8Array;
        var reader = new FileReader();
        reader.onload = function(){
            let dataLength, data;
            data = reader.result;
            //@ts-ignore
            dataLength = data.length;
            arrayResult = new Uint8Array(dataLength);
            for (let i = 0; i < dataLength; i++){
                //@ts-ignore
                arrayResult[i] = data.charCodeAt(i);
            }
        };
        let j=0;
        reader.onloadend = function(){
            
            //@ts-ignore
            let filename = allFiles[j].name
            //@ts-ignore
            let type = allFiles[j].type
            let file = arrayResult.toString()

            // var buffer = new Buffer(file);
            
            const vector = str2vector(file)
            const newUint = vector2uint8array(vector);

            //@ts-ignore
            let newblob = new Blob([newUint], {type: allFiles[j].type});
            saveAs(newblob)

            api.post('', {
                id,
                filename,
                type,
                file
            })

            j++;
            if(j<allFiles.length){
                reader.readAsBinaryString(allFiles[j]);
            }
        }
        reader.readAsBinaryString(allFiles[j]);
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
