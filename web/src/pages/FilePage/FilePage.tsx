import React, { useState, useEffect } from 'react';
import './styles.css'
import PageHeader from '../../components/PageHeader/PageHeader';
import { str2vector } from '../../utils/str2vector';
import { vector2uint8array } from '../../utils/vector2uint8array';
import { saveAs } from 'file-saver';
import api from '../../services/api';

const FilePage = (props: any) => {
    const idReceived = props.match.params.fileId;
    const [data, setData] = useState((<h1>Loading...</h1>))

    useEffect(()=>{
        setData((<h1>Nothing to see here</h1>))
        if(idReceived.length===10){
            api.get('?id='+idReceived).then(response => {
                if(response.data.length===0){
                    setData((<h1>This Id not exists.</h1>))
                }else{
                    //SET DATA
                    setData((
                    <div className="dataBox">
                        <h1>ID: {idReceived}</h1>
                        <h3>DATA:</h3>
                    </div>
                    ))
                }
            })
        }else{
            setData((<h1>Id is wrong.</h1>))
        }
    },[idReceived])
    
    // var buffer = new Buffer(file);
            
    // const vector = str2vector(file)
    // const newUint = vector2uint8array(vector);

    // // @ts-ignore
    // let newblob = new Blob([newUint], {type: allFiles[j].type});
    // saveAs(newblob)

    return (
        <div className="page-file">
            <PageHeader idPaste={idReceived} />
            {data}
        </div>
    );
}

export default FilePage;
