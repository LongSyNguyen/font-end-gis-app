// Libaries
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

// Modules
import Home from 'pages/Home';
import axios from 'axios';
import Map from 'pages/Map';
import { useState } from 'react';

function App() {
    const [api, setApi] = useState({});

    function fecthAPi() {
        axios.get(`https://gis-web-pollution-warning.onrender.com/api/v1/stations/airs`)
        // axios.get(`http://localhost:8080/api/v1/airs`)


            .then((response)=> {
                setApi(response.data);
            })
            .catch(error => console.error(error))

    }

    return (
        <Router>
            <Routes>
                <Route exact path="/" element={<Home callApi ={fecthAPi}/>} />
                <Route exact path="/map" element={<Map callApi ={fecthAPi}  data={api} />} />
            </Routes>
        </Router>
    );
}

export default App;
