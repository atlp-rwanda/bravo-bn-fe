import React from 'react'
import {
    BrowserRouter as Router
} from 'react-router-dom';
import AllRoutes from './routes/index'


const App = () => {
    return (
        <div className='container'>
            <Router>
                <AllRoutes />
            </Router>
        </div>

    );
}
export default App;
