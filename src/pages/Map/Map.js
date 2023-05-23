import MapNav from 'components/MapNav';
import { Spinner } from 'react-bootstrap';
import Mapbody from 'components/Mapbody';
import MapSidebar from 'components/MapSidebar';
import { useState } from 'react';
import './Map.scss';


function Map(props) {

    let api = props.data
    const callApiDefault = () => {
        props.callApi('')
        api = {}
    }
    const [selectedDataType, setSelectedDataType] = useState('excel');
    const [pollutionState, setPollutionState] = useState([]);
    const [selectedYear, setSelectedYear] = useState('');
    const [selectedMonth, setSelectedMonth] = useState('');
    const [eventUserAddresss, setEventUserAddress] = useState('Tỉnh Hà Nam');
    const [centerLatLng, setcenterLatLng] = useState([20.583520, 105.922990]);

    const handleDataTypeChange = (dataType) => {
        setSelectedDataType(dataType)
        setPollutionState([])
        callApiDefault()
        if (dataType === 'excel') {
            setcenterLatLng([20.583520, 105.922990])
        }
        else if (dataType === 'weatherApi') {
            setcenterLatLng([21.028511, 105.804817])
        }
    }
    if (Object.keys(api).length === 0) {
        props.callApi(selectedDataType)
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
                <span className="sr-only">Loading...</span>
                <Spinner animation="border" role="status">
                </Spinner>
            </div>
        );
    }
    else {
        function handle(api) {
            let conscious = {};
            let year = []
            let month = []
            let typeOfPollution = []
            for (let index = 0; index < api.length; index++) {
                const element = api[index];
                const lat = element.location.latitude
                const lng = element.location.longitude
                if (selectedDataType === "excel") {
                    const arr = element.location.state.split(" ");
                    arr.shift()
                    const result = arr.join(' ');
                    if (!(result in conscious)) {
                        conscious[result] = { latitude: lat, longitude: lng };
                    }
                }

                if (!(year.includes(element.date.year))) {
                    year.push(element.date.year)
                }
                if (!(month.includes(element.date.month))) {
                    month.push(element.date.month)
                }
                for (let index = 3; index < Object.keys(element).length; index++) {
                    const chillElement = Object.keys(element)[index];
                    if (!(typeOfPollution.includes(chillElement))) {
                        typeOfPollution.push(chillElement)
                    }
                }
            }
            const typeOfPollutions = {}
            for (let index = 0; index < typeOfPollution.length; index++) {
                const element = typeOfPollution[index];
                typeOfPollutions[element] = { state: '1' }
            }
            return [conscious, year, month, typeOfPollutions]
        }
        const handleTypeChange = (event) => {
            const newState = { ...pollutionState, [event.target.id]: { state: event.target.value === '1' ? '0' : '1' } };
            const list = ['0', '0', '0']
            if (!Object.values(newState).map(item => item.state).every((val, i) => val === list[i])) {
                setPollutionState(newState);
            }
            else {
                alert("chọn ít nhất 1 giá trị cho kiểu dữ liệu ")
            }
        }
        const handleOptionChange = (event, type) => {
            if (type === "tỉnh") {
                setEventUserAddress("Tỉnh " + event.target.value);
                setcenterLatLng([event.target.options[event.target.selectedIndex].dataset.lat, event.target.options[event.target.selectedIndex].dataset.lng]);
            }
            if (type === "year") {
                setSelectedYear(event.target.value)
            }
            if (type === "month") {
                setSelectedMonth(event.target.value)
            }
        };
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
        var dataMap;
        const conscious = handle(api)[0]
        const year = handle(api)[1]
        const month = handle(api)[2]
        const typeOfPollution = handle(api)[3]

        if (selectedDataType === 'excel') {
            dataMap = filterDataByAddress(api, eventUserAddresss)
        }
        if (selectedDataType === 'weatherApi') {
            dataMap = api
        }


        if (Object.keys(api).length !== 0) {
            if (selectedDataType === "excel") {
                if (!selectedYear || !selectedMonth || Object.keys(pollutionState).length === 0) {

                    setSelectedYear(selectedYear || year[0].toString());
                    setSelectedMonth(selectedMonth || month[0].toString());
                    setPollutionState(Object.keys(pollutionState).length === 0 ? typeOfPollution : pollutionState);
                }

                if (selectedYear !== '' && Object.keys(pollutionState).length !== 0) {
                        return (
                        <div className='map-container'>
                            <MapNav />
                            <div className="body-wrapper">
                                <MapSidebar listOfYear={year} listOfMonth={month} selectedYear={selectedYear} selectedMonth={selectedMonth} conscious={conscious} onOptionChange={handleOptionChange} onTypeChange={handleTypeChange} selectedDataType={selectedDataType} onDataTypeChange={handleDataTypeChange} typeOfPollutions={pollutionState} />
                                <Mapbody data={dataMap} listOfYear={year} listOfMonth={month} selectedMonth={selectedMonth} selectedYear={selectedYear} center={centerLatLng} typeOfPollutions={pollutionState} selectedDataType={selectedDataType} callApi={callApiDefault} />
                            </div>
                        </div>
                    );
                }
            }
            if (selectedDataType === "weatherApi") {
                if (Object.keys(pollutionState).length === 0) {
                    setPollutionState(typeOfPollution);
                }

                if (Object.keys(pollutionState).length !== 0) {
                    return (
                        <div className='map-container'>
                            <MapNav />
                            <div className="body-wrapper">
                                <MapSidebar listOfYear={year} listOfMonth={month} selectedYear={selectedYear} selectedMonth={selectedMonth} conscious={conscious} onOptionChange={handleOptionChange} onTypeChange={handleTypeChange} selectedDataType={selectedDataType} onDataTypeChange={handleDataTypeChange} typeOfPollutions={pollutionState} />
                                <Mapbody data={dataMap} listOfYear={year} listOfMonth={month} selectedMonth={selectedMonth} selectedYear={selectedYear} center={centerLatLng} typeOfPollutions={pollutionState} selectedDataType={selectedDataType} callApi={callApiDefault} />
                            </div>
                        </div>
                    );
                }
            }
        }
    }
    // get unique conscious and year

}

export default Map;
