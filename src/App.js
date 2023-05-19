// Libaries
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

// Modules
import Home from 'pages/Home';
import Map from 'pages/Map';
import axios from 'axios';
import { useState } from 'react';

function App() {
    const [api, setApi] = useState({});
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');

    const formattedDate = `${year}-${month}-${day}`;

    function fecthAPi(dataType) {
        if (dataType === '') { setApi({}) }
        else if (dataType === 'excel') {
            axios.get(`https://environment-admin.onrender.com/api/v1/stations/airs/`)
                // axios.get(`http://localhost:8080/api/v1/stations/airs/`)
                .then((response) => {
                    setApi(response.data);
                })
                .catch(error => console.error(error))
        }
        else if (dataType === 'weatherApi') {
            axios.get(`https://environment-admin.onrender.com/api/v1/open-api/openweathermap/airs/filter?fromdate=${formattedDate}`)
                .then((response) => {
                    setApi(response.data);
                })
                .catch(error => console.error(error))
        }
    }
    return (
        <Router>
            <Routes>
                <Route exact path="/" element={<Home callApi={fecthAPi} />} />
                <Route exact path="/map" element={<Map callApi={fecthAPi} data={api} />} />
            </Routes>
        </Router>
    );
}

export default App;
