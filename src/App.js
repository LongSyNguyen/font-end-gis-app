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

    const fecthAPi = (dataType) => {
        if (dataType === '') {
            setApi({})
            return;
        }
        if (dataType === 'weatherApi') {
            axios.get(`https://environment-admin.onrender.com/api/v1/open-api/openweathermap/airs/filter?fromdate=${formattedDate}&todate=${formattedDate}`)
            // axios.get(`https://environment-admin.onrender.com/api/v1/open-api/openweathermap/airs/filter?fromdate=2023-5-21&todate=2023-5-21`)
            .then((response) => {
                    setApi(response.data);
                })
                .catch(error => console.error(error))
            return;

        }if (dataType === 'excel') {
            axios.get(`https://environment-admin.onrender.com/api/v1/stations/airs/`)
                .then((response) => {
                    setApi(response.data);
                })
                .catch(error => console.error(error))
            return;
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
