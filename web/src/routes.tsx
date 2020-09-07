import React from 'react';
import {BrowserRouter,Route} from 'react-router-dom';
import Landing from './pages/Landing/Landing';
import FilePage from './pages/FilePage/FilePage'

function Routes(){
    return (
        <BrowserRouter>
            <Route path="/" exact component={Landing} />
            <Route path="/paste/:fileId" exact component={FilePage} />
        </BrowserRouter>
    )
}

export default Routes;