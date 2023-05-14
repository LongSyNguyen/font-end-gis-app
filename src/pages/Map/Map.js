import MapNav from 'components/MapNav';
import { Spinner } from 'react-bootstrap';
import Mapbody from 'components/Mapbody';
import MapSidebar from 'components/MapSidebar';
import { useState } from 'react';
import './Map.scss';


function Map(props) {
    let api = props.data
    // get unique conscious and year
    let conscious = {};
    let year = []
    let typeOfPollution = []
    for (let index = 0; index < api.length; index++) {
        const element = api[index];
        const lat = element.location.latitude
        const lng = element.location.longitude
        const arr = element.location.state.split(" ");
        arr.shift()
        const result = arr.join(' ');
        if (!(result in conscious)) {
            conscious[result] = { latitude: lat, longitude: lng };
        }
        if (!(year.includes(element.date.year))) {
            year.push(element.date.year)
        }
        for (let index = 3; index < Object.keys(element).length; index++) {
            const chillElement = Object.keys(element)[index];
            if (!(typeOfPollution.includes(chillElement))) {
                typeOfPollution.push(chillElement)
            }
        }
    }
    const [selectedYear, setSelectedLayer] = useState('');

    const [eventUserAddresss, setEventUserAddress] = useState('Tỉnh Hà Nam');
    const [centerLatLng, setcenterLatLng] = useState([20.583520, 105.922990]);

    const handleOptionChange = (event, type) => {
        if (type === "tỉnh") {
            setEventUserAddress("Tỉnh " + event.target.value);
            setcenterLatLng([event.target.options[event.target.selectedIndex].dataset.lat, event.target.options[event.target.selectedIndex].dataset.lng]);
        }
        else if (type === "year") {
            setSelectedLayer(event.target.value)
        }
    };

    if (Object.keys(api).length === 0) {
        props.callApi()
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
                <span className="sr-only">Loading...</span>
                <Spinner animation="border" role="status">
                </Spinner>
            </div>
        );
    }

    function filterDataByAddress(dataInput, addressInput) {
        const points = [];

        for (let index = 0; index < dataInput.length; index++) {
            const element = dataInput[index];
            if (element.location.state === addressInput) {
                points.push(element);
            }
        }
        return points
    }
    var dataMap = filterDataByAddress(api, eventUserAddresss)
    if (Object.keys(api).length !== 0) {
        if (selectedYear === '') {
            setSelectedLayer(year[year.length - 1].toString())
        }
        else if (selectedYear !== '') {
            return (
                <div className='map-container'>
                    <MapNav />
                    <div className="body-wrapper">
                        <MapSidebar conscious={conscious} onOptionChange={handleOptionChange} listOfYear={year} selectedYear={selectedYear} typeOfPollution={typeOfPollution} />
                        <Mapbody data={dataMap} listOfYear={year} selectedYear={selectedYear} center={centerLatLng} />
                    </div>
                </div>
            );
        }
    }
}

export default Map;
