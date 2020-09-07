import React, { useState, useEffect } from 'react';
import './styles.css'
import PageHeader from '../../components/PageHeader/PageHeader';
import { str2vector } from '../../utils/str2vector';
import { vector2uint8array } from '../../utils/vector2uint8array';
import { saveAs } from 'file-saver';
import api from '../../services/api';
import downloadIcon from '../../assets/images/icons/downloadIcon.png'

const FilePage = (props: any) => {
    const idReceived = props.match.params.fileId;
    const [data, setData] = useState([(<h1>Loading...</h1>)])
    const [tableDataFiles, setTableDataFiles] = useState([(<div></div>)])

    function handleDownloadFile(filename: string, type: string, fileData: string){
        const vector = str2vector(fileData)
        const newUint = vector2uint8array(vector);

        let fileInstance = new File([newUint], filename,{type: type});
        saveAs(fileInstance)
    }
    
    useEffect(()=>{
        setData([(<h1>Nothing to see here</h1>)])
        if(idReceived.length===10){
            api.get('?id='+idReceived).then(response => {
                if(response.data.length===0){
                    setData([(<h1>This Id not exists.</h1>)])
                }else{
                    setData([(
                    <div className="dataBox">
                        <h1>ID: {idReceived}</h1>
                        <h3>DATA:</h3>
                    </div>
                    )])
                    
                    let tableFiles = [(
                    <tr>
                        <th>Filename</th>
                        <th>Type</th>
                        <th>Download</th>
                    </tr>
                    )];

                    for(let i=0; i<response.data.length; i++){
                        const filename = response.data[i].filename;
                        const type = response.data[i].type;
                        const fileData = response.data[i].file;
                        const downloadButton = (
                            <button className="downloadButtons" onClick={() => handleDownloadFile(filename,type,fileData)}>
                                <img src={downloadIcon} width="50"/>
                            </button>);
                        tableFiles[tableFiles.length] = (
                            <tr>
                                <td>{filename}</td>
                                <td>{type}</td>
                                <td>{downloadButton}</td>
                            </tr>
                        );
                    }

                    setTableDataFiles(tableFiles);
                }
            })
        }else{
            setData([(<h1>Id is wrong.</h1>)])
        }
    },[idReceived])
    
    return (
        <div className="page-file">
            <PageHeader idPaste={idReceived} />
            {data}
            <table>
                {tableDataFiles}
            </table>
        </div>
    );
}

export default FilePage;
