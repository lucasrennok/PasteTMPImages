import React, { useState } from 'react';
import './styles.css'
import PageHeader from '../../components/PageHeader/PageHeader';
import Dropzone from 'react-dropzone';
import { getRandomId } from '../../utils/getRandomId';
import api from '../../services/api';
import { Link } from 'react-router-dom';
import pasteIcon from '../../assets/images/icons/pasteIcon.png'

function Landing() {
    const [urlIdFiles, setUrlIdFiles] = useState(<div></div>);
    const [allFiles, setAllFiles] = useState([]);
    const [allFilesText, setAllFilesText] = useState([(<p key="default">Drag 'n' drop some files here, or click to select files</p>)]);

    //This function starts when files are dropped at dropzone
    //It will verify the size of the files
    function handleAllFiles(allFilesVector: any){
        //@ts-ignore
        let newAllFilesText = [];
        let filesSize = 0;
        for(let i in allFilesVector){
            //@ts-ignore
            newAllFilesText[i] = (<p key={i}><strong>Name:</strong> {allFilesVector[i].name} - <strong>Size:</strong> {Math.round(allFilesVector[i].size/(1024*1024)*100)/100}MB</p>)
            filesSize += allFilesVector[i].size;
        }
        if(filesSize/(1024*1024)<=5.1){
            setAllFiles(allFilesVector);
            //@ts-ignore
            setAllFilesText(newAllFilesText);
        }else{
            alert('Storage accepted: 5MB');
        }
    }

    //This function will post the files and save at the database
    //It starts when 'paste it' button is clicked
    async function handlePasteIt(){
        let id = getRandomId();
        let flag = 0;

        // Create new ID if the ID already exists
        while(flag===0){
            await api.get('?id='+id).then(response => {
                if(response.data.length===0){
                    flag = 1;
                }else{
                    id = getRandomId();
                }
            });
        }

        //Set an output to display
        const redirectRoute = "/paste/"+id;
        const outputId = (
        <div>
            <p>
                <strong>ID:</strong> {id} - <strong>Link:</strong> 
                <Link to={redirectRoute}>http://localhost:3000/paste/{id}</Link> 
            </p>
        </div>);
        setUrlIdFiles(outputId);
    
        //Reset arrays: files and text
        setAllFiles([])
        setAllFilesText([(<p key="default">Drag 'n' drop some files here, or click to select files</p>)]);

        let arrayResult: Uint8Array;
        var reader = new FileReader();

        //Create Uint8Array when FileReader is reading the file
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

        //When Uint8Array is already created, send it to the database
        let j=0;
        reader.onloadend = function(){
            //@ts-ignore
            let filename = allFiles[j].name
            //@ts-ignore
            let type = allFiles[j].type
            let file = arrayResult.toString()

            //Post file to save at db
            api.post('', {
                id,
                filename,
                type,
                file
            })

            //Read the next files
            j++;
            if(j<allFiles.length){
                reader.readAsBinaryString(allFiles[j]);
            }
        }

        //Read the first file
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
            <button type="button" id="pasteButton" onClick={handlePasteIt} disabled={allFiles.length>0? false: true}>
                <img src={pasteIcon} alt="paste" width="30"/>
                Paste it
            </button>
            {urlIdFiles}
        </div>
    );
}

export default Landing;
