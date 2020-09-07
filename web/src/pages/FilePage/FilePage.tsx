import React, { useState, useEffect } from 'react';
import './styles.css'
import PageHeader from '../../components/PageHeader/PageHeader';
import { str2vector } from '../../utils/str2vector';
import { vector2uint8array } from '../../utils/vector2uint8array';
import { saveAs } from 'file-saver';
import api from '../../services/api';
import downloadIcon from '../../assets/images/icons/downloadIcon.png'
import { table } from 'console';

const FilePage = (props: any) => {
    const idReceived = props.match.params.fileId;
    const [data, setData] = useState([(<h2 id="idTitle" key="idTitle">Loading...</h2>)])
    const [tableDataFiles, setTableDataFiles] = useState([(<tbody key="tbody0"><tr key="0"></tr></tbody>)])

    function handleDownloadFile(filename: string, type: string, fileData: string){
        const vector = str2vector(fileData)
        const newUint = vector2uint8array(vector);

        let fileInstance = new File([newUint], filename,{type: type});
        saveAs(fileInstance)
    }
    
    useEffect(()=>{
        setData([(<h2 id="idTitle" key="idTitle">Nothing to see here</h2>)])
        if(idReceived.length===10){
            api.get('?id='+idReceived).then(response => {
                if(response.data.length===0){
                    setData([(<h2 id="idTitle" key="idTitle">This Id not exists.</h2>)])
                }else{
                    setData([(
                    <div className="dataBox" key="dataBox">
                        <h2 id="idTitle" key="idTitle">ID: {idReceived}</h2>
                    </div>
                    )])
                    
                    let tableFiles = [(
                        <tbody key="tbody0">
                            <tr key="0">
                                <th key="filename">Filename</th>
                                <th key="type">Type</th>
                                <th key="download">Download</th>
                            </tr>
                        </tbody>
                    )];

                    for(let i=0; i<response.data.length; i++){
                        const filename = response.data[i].filename;
                        const type = response.data[i].type;
                        const fileData = response.data[i].file;
                        const downloadButton = (
                            <button className="downloadButtons" onClick={() => handleDownloadFile(filename,type,fileData)}>
                                <img src={downloadIcon} width="50" alt="download" />
                            </button>);
                        tableFiles[tableFiles.length] = (
                            <tbody key={"tbody"+tableFiles.length.toString()}>
                                <tr key={tableFiles.length.toString()}>
                                    <td key={"filename"+tableFiles.length.toString()}>{filename}</td>
                                    <td key={"type"+tableFiles.length.toString()}>{type}</td>
                                    <td key={"download"+tableFiles.length.toString()}>{downloadButton}</td>
                                </tr>
                            </tbody>
                        );
                    }

                    setTableDataFiles(tableFiles);
                }
            })
        }else{
            setData([(<h2 id="idTitle" key="idTitle">Id is wrong.</h2>)])
        }
    },[idReceived])
    
    return (
        <div className="page-file">
            <PageHeader idPaste={idReceived} />
            {data}
            <table>
                {tableDataFiles.map((data)=>{
                    return data
                })}
            </table>
        </div>
    );
}

export default FilePage;
