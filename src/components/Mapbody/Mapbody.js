import { MapContainer, TileLayer, Marker, GeoJSON } from 'react-leaflet';
import { useRef, useEffect, useState } from 'react';
import L from 'leaflet';
import "leaflet/dist/leaflet.css";
import "./Mapbody.scss";
import Legend from 'components/Legend';
import Locate from 'components/Locate';
import blueMarker from "../.././assets/images/marker-icon-2x-blue.png";
import greenMarker from "../.././assets/images/marker-icon-2x-green.png";
import yellowMarker from "../.././assets/images/marker-icon-2x-yellow.png";
import orangeMarker from "../.././assets/images/marker-icon-2x-orange.png";
import greyMarker from "../.././assets/images/marker-icon-2x-grey.png";
import redMarker from "../.././assets/images/marker-icon-2x-red.png";
import violetMarker from "../.././assets/images/marker-icon-2x-violet.png";
import greenFace from "../.././assets/images/ic-face-green.svg";
import yellowFace from "../.././assets/images/ic-face-yellow.svg";
import orangeFace from "../.././assets/images/ic-face-orange.svg";
import greyFace from "../.././assets/images/ic-face-grey.svg";
import redFace from "../.././assets/images/ic-face-red.svg";
import violetFace from "../.././assets/images/ic-face-purple.svg";
import banDoHanhChinhHanam from "../../data/gadm41_VNM_HaNam.json";


import recommendationGreenSport from "../.././assets/images/recommendationGreenSport.svg";
import recommendationGreenWindow from "../.././assets/images/recommendationGreenWindow.svg";
import recommendationGreyAirpurifier from "../.././assets/images/recommendationGreyAirpurifier.svg";
import recommendationGreyMask from "../.././assets/images/recommendationGreyMask.svg";
import recommendationGreySport from "../.././assets/images/recommendationGreySport.svg";
import recommendationGreyWindow from "../.././assets/images/recommendationGreyWindow.svg";
import recommendationOrangeAirpurifier from "../.././assets/images/recommendationOrangeAirpurifier.svg";
import recommendationOrangeMask from "../.././assets/images/recommendationOrangeMask.svg";
import recommendationOrangeSport from "../.././assets/images/recommendationOrangeSport.svg";
import recommendationOrangeWindow from "../.././assets/images/recommendationOrangeWindow.svg";
import recommendationPurpleAirpurifier from "../.././assets/images/recommendationPurpleAirpurifier.svg";
import recommendationPurpleMask from "../.././assets/images/recommendationPurpleMask.svg";
import recommendationPurpleSport from "../.././assets/images/recommendationPurpleSport.svg";
import recommendationPurpleWindow from "../.././assets/images/recommendationPurpleWindow.svg";
import recommendationRedAirpurifier from "../.././assets/images/recommendationRedAirpurifier.svg";
import recommendationRedMask from "../.././assets/images/recommendationRedMask.svg";
import recommendationRedSport from "../.././assets/images/recommendationRedSport.svg";
import recommendationRedWindow from "../.././assets/images/recommendationRedWindow.svg";
import recommendationYellowAirpurifier from "../.././assets/images/recommendationYellowAirpurifier.svg";
import recommendationYellowMask from "../.././assets/images/recommendationYellowMask.svg";
import recommendationYellowSport from "../.././assets/images/recommendationYellowSport.svg";
import recommendationYellowWindow from "../.././assets/images/recommendationYellowWindow.svg";

import { Modal } from "react-bootstrap";


function Mapbody(props) {
  // trả về obj bao gồm tên các giá trị ô nhiễm, state, value. mainPollutant là giá trị ô nhiễm chính
  function typeOfPollution(objectType, inputData) {
    const keys = Object.keys(objectType)
    let mainPollutant = ""
    for (let index = 0; index < keys.length; index++) {
      const element = keys[index];
      objectType[element].value = inputData[element].result
    }
    for (let index = 0; index < Object.keys(objectType).length; index++) {
      const element = Object.keys(objectType)[index];
      if (objectType[element].state === "1") {
        if (mainPollutant === "") {
          mainPollutant = element
        }
        else {
          if (objectType[mainPollutant].value < objectType[element].value) {
            mainPollutant = element
          }
        }
      }
    }
    return [objectType, mainPollutant]
  }

  // trả về obj icon của leaflet, mã màu icon, hình mặt người tương ứng, màu font chữ
  function classPoint(inputData = "default", typeOfPollution) {
    if (inputData === "default") {
      return [L.icon({
        iconUrl: blueMarker,
        iconRetinaUrl: blueMarker,
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        tooltipAnchor: [16, -28],
      }), '', '']
    }
    else {
      const maxValue = typeOfPollution[0][typeOfPollution[1]].value
      if (maxValue === 1) {
        return [L.icon({
          iconUrl: greenMarker,
          iconRetinaUrl: greenMarker,
          iconSize: [25, 41],
          iconAnchor: [12, 41],
          popupAnchor: [1, -34],
          tooltipAnchor: [16, -28],
        }), '#4cb84c', greenFace, "#000000", 'Chất lượng ko khí ở mức tốt', maxValue]
      }
      else if (maxValue === 2) {
        return [L.icon({
          iconUrl: yellowMarker,
          iconRetinaUrl: yellowMarker,
          iconSize: [25, 41],
          iconAnchor: [12, 41],
          popupAnchor: [1, -34],
          tooltipAnchor: [16, -28]
        }), 'yellow', yellowFace, "#000000", 'Chất lượng ko khí ở mức trung bình', maxValue]
      }
      else if (maxValue === 3) {
        return [L.icon({
          iconUrl: orangeMarker,
          iconRetinaUrl: orangeMarker,
          iconSize: [25, 41],
          iconAnchor: [12, 41],
          popupAnchor: [1, -34],
          tooltipAnchor: [16, -28],
        }), 'orange', orangeFace, "#000000", 'Chất lượng ko khí ở mức kém', maxValue]
      }
      else if (maxValue === 4) {
        return [L.icon({
          iconUrl: greyMarker,
          iconRetinaUrl: greyMarker,
          iconSize: [25, 41],
          iconAnchor: [12, 41],
          popupAnchor: [1, -34],
          tooltipAnchor: [16, -28],
        }), 'grey', greyFace, "#ffffff", 'Chất lượng ko khí xấu', maxValue]
      }
      else if (maxValue === 5) {
        return [L.icon({
          iconUrl: redMarker,
          iconRetinaUrl: redMarker,
          iconSize: [25, 41],
          iconAnchor: [12, 41],
          popupAnchor: [1, -34],
          tooltipAnchor: [16, -28],
        }), '#d81e1e', redFace, "#ffffff", 'Ô nhiễm không khí ở mức rất xấu', maxValue]
      }
      else if (maxValue === 6) {
        return [L.icon({
          iconUrl: violetMarker,
          iconRetinaUrl: violetMarker,
          iconSize: [25, 41],
          iconAnchor: [12, 41],
          popupAnchor: [1, -34],
          tooltipAnchor: [16, -28],
        }), '#ab19ab', violetFace, "#ffffff", 'chất lượng ko khí ở nguy hiểm', maxValue]
      }
    }

  }


  // bay tới người dùng
  function LocationMarker() {
    const map = mapRef.current;
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(function (position) {
        map.flyTo([position.coords.latitude, position.coords.longitude], 16, {
          animate: true,
          duration: 1,
          easeLinearity: 0.5,
        });
      });
    }
  }

  // tạo marker, geojson, obj data year month
  function marker(points, type, typeOfPollutions, fileGeoJSON, listOfYears = [], listOfMonths = []) {
    if (type === 'excel') {
      let markers = []
      let dataMap = []
      let key = []
      for (let index = 0; index < fileGeoJSON.features.length; index++) {
        const elementGeojson = fileGeoJSON.features[index];
        key.push(
          elementGeojson.properties.NAME_3
        )
      }

          for (let index = 0; index < fileGeoJSON.features.length; index++) {
            const elementGeojson = fileGeoJSON.features[index];
            dataMap.push(
              <GeoJSON
                name={elementGeojson.properties.NAME_3}
                data={elementGeojson.geometry}
                weight="0.3"
                color='black'
                fillColor="blue"
                fillOpacity={0.07} />
            )
      }
      for (let i = 0; i < points.length; i++) {
        const mainPollutant = typeOfPollution(typeOfPollutions, points[i])
        const color = classPoint(points[i], mainPollutant)

        markers.push(
          <Marker commune={points[i].location.commune} level={color[5]} color={color[1]} id={i} position={[points[i].location.latitude, points[i].location.longitude]} icon={color[0]}
            eventHandlers={{
              click: () => {
                handleMarkerClick(i);
              },
            }}>
          </Marker>
        );
      }
      // for (let index = 0; index < Object.keys(markers).length; index++) {
      //   const element = markers[Object.keys(markers)[index]];
      //   Object.keys(element).forEach(key => {
      //     if (element[key].length === 0) {
      //       delete element[key];
      //     }
      //   });
      // }
      return [markers, dataMap]
    }
    else if (type === 'weatherApi') {
      let markers = []
      for (let i = 0; i < points.length; i++) {
        const mainPollutant = typeOfPollution(typeOfPollutions, points[i])
        const color = classPoint(points[i], mainPollutant)
        markers.push(
          <Marker id={i} position={[points[i].location.latitude, points[i].location.longitude]} icon={color[0]}
            eventHandlers={{
              click: () => {
                handleMarkerClick(i)
              },
            }}>
          </Marker>
        );
      }
      return markers

    }

  };

  //handle level of pollutants
  const constructor = {
    level_1: {
      percent: 16.6,
      color: '#4cb84c',
      c_low: {
        o3: 0,
        pm2_5: 0,
        pm10: 0,
        co: 0,
        tsp: 0,
        so2: 0,
        no2: 0,
      },
      c_high: {
        o3: 54,
        pm2_5: 12.0,
        pm10: 54,
        co: 4.4,
        tsp: 15.4,
        so2: 35,
        no2: 53,
      }
    }, level_2: {
      percent: 33.3,
      color: 'yellow',
      c_low: {
        o3: 55,
        pm2_5: 12.1,
        pm10: 55,
        co: 4.5,
        tsp: 15.5,
        so2: 36,
        no2: 54,
      },
      c_high: {
        o3: 70,
        pm2_5: 35.4,
        pm10: 154,
        co: 9.4,
        tsp: 40.4,
        so2: 75,
        no2: 100,
      }
    }, level_3: {
      percent: 50,
      color: 'orange',
      c_low: {
        o3: 71,
        pm2_5: 35.5,
        pm10: 155,
        co: 9.5,
        tsp: 40.5,
        so2: 76,
        no2: 101,
      },
      c_high: {
        o3: 85,
        pm2_5: 55.4,
        pm10: 254,
        co: 12.4,
        tsp: 65.4,
        so2: 185,
        no2: 360,
      }
    }, level_4: {
      percent: 66.6,
      color: 'grey',
      c_low: {
        o3: 86,
        pm2_5: 55.5,
        pm10: 255,
        co: 12.5,
        tsp: 65.5,
        so2: 186,
        no2: 361,
      },
      c_high: {
        o3: 105,
        pm2_5: 150.4,
        pm10: 354,
        co: 15.4,
        tsp: 150.4,
        so2: 304,
        no2: 649,
      }
    }, level_5: {
      percent: 83.3,
      color: '#d81e1e',

      c_low: {
        o3: 106,
        pm2_5: 150.5,
        pm10: 355,
        co: 15.5,
        tsp: 150.5,
        so2: 305,
        no2: 650,
      },
      c_high: {
        o3: 200,
        pm2_5: 250.4,
        pm10: 424,
        co: 30.4,
        tsp: 250.4,
        so2: 604,
        no2: 1249,
      }
    }, level_6: {
      percent: 100,
      color: '#ab19ab',
      c_low: {
        o3: 201,
        pm2_5: 250.5,
        pm10: 425,
        co: 30.5,
        tsp: 250.5,
        so2: 605,
        no2: 1250,
      },
      c_high: {
        o3: 604,
        pm2_5: 500.4,
        pm10: 604,
        co: 50.4,
        tsp: 500.4,
        so2: 1004,
        no2: 2049,
      }
    }
  }
  // function return % of progress, color
  function checkProgress(constructor, type, value) {
    const numOfLevel = Object.keys(constructor)
    const valueOfLevel = Object.values(constructor)
    let percent = valueOfLevel[0].percent
    let level = numOfLevel[0]
    for (let index = 0; index < numOfLevel.length; index++) {
      const element = valueOfLevel[index];
      if (value > element.c_low[type]) {
        percent = element.percent
        level = numOfLevel[index]
      }
    }
    return [percent, level]
  }
  //end handle level of pollutants

  // handle modal
  const [show, setShow] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalBody, setModalBody] = useState('');
  const [modalColor, setModalColor] = useState(['', '']);
  const [modalImg, setModalImg] = useState('');
  const [modalAqi, setModalAqi] = useState('');
  const [recommendation, setRecommendation] = useState('');
  const handleClose = () => setShow(false);

  function handleMarkerClick(id) {
    setShow(true)
    const mainPollutant = typeOfPollution(props.typeOfPollutions, props.data[id])
    const color = classPoint(props.data[id], mainPollutant)
    let keys = Object.keys(props.data[id]);
    if (props.selectedDataType === 'excel') {
      setModalTitle(`${props.data[id].location.address}`)
    }
    else if (props.selectedDataType === 'weatherApi') {
      setModalTitle(`dữ liệu từ tỉnh ${props.data[id].location.district_city}`)
    }

    setModalBody(
      <div dangerouslySetInnerHTML={{
        __html: (() => {
          let result = `<table>
          <tbody>
          <tr>
          <td class="column1">${keys[2]}: ${props.data[id][keys[2]].iso.slice(0, 10)}</td>`
          if (color[1] === "#4cb84c") {
            result += `<td class="column2"><u>${color[4]}</u> so với kiểu dữ liệu bạn quan tâm</td>`
          }
          else if (color[1] !== "#4cb84c") {
            result += `<td class="column2"><u>${color[4]}</u> so với kiểu dữ liệu bạn quan tâm</td>`
          }


          for (let index = 3; index < keys.length; index++) {
            if (keys[index] === mainPollutant[1]) {
              result += `<tr>
              <td class="column1"><b>${keys[index].toUpperCase()}: ${props.data[id][keys[index]].value}</b></td>
              <td class="column2"><div class="progress custom-progress-${checkProgress(constructor, keys[index], props.data[id][keys[index]].value)[1]}">
                <div class="progress-bar custom-progress-bar-${checkProgress(constructor, keys[index], props.data[id][keys[index]].value)[1]} progress-bar" role="progressbar"  style="width: ${checkProgress(constructor, keys[index], props.data[id][keys[index]].value)[0]}%" </div>
              </div></td>
              </tr>`;
            }
            else {
              result += `<tr>
              <td class="column1">${keys[index].toUpperCase()}: ${props.data[id][keys[index]].value}</td>
              <td class="column2"><div class="progress custom-progress-${checkProgress(constructor, keys[index], props.data[id][keys[index]].value)[1]}">
                <div class="progress-bar custom-progress-bar-${checkProgress(constructor, keys[index], props.data[id][keys[index]].value)[1]} progress-bar" role="progressbar"  style="width: ${checkProgress(constructor, keys[index], props.data[id][keys[index]].value)[0]}%" </div>
              </div></td>
              </tr>`;
            }
          }
          result += `</table>`

          return result;
        })()
      }} />);
    setRecommendation(
      <div dangerouslySetInnerHTML={{
        __html: (() => {
          let result = `<table class = "recommendation">
          <tr>
            <th colspan="4">Khuyến nghị sức khỏe</th>
          </tr>
        `
          if (color[1] === "#4cb84c") {
            result += `
          <tr>
            <td class = "rcmColumn1"><img src = ${recommendationGreenSport}/></td>
            <td class = "rcmColumn2">Mở cửa sổ để đưa không khí sạch và trong lành vào nhà</td>
            <td class = "rcmColumn1"><img src = ${recommendationGreenWindow}/></td>
            <td class = "rcmColumn2">Tận hưởng các hoạt động ngoài trời</td>
          </tr>
        </table>`
            return result;
          }
          else if (color[1] === "yellow") {
            result += `
          <tr>
            <td class = "rcmColumn1"><img src = ${recommendationYellowMask}/></td>
            <td class = "rcmColumn2">Các nhóm nhạy cảm nên đeo mặt nạ khi ra ngoài</td>
            <td class = "rcmColumn1"><img src = ${recommendationYellowSport}/></td>
            <td class = "rcmColumn2">Các nhóm nhạy cảm nên giảm tập thể dục ngoài trời</td>
          </tr>
          <tr>
            <td class = "rcmColumn1"><img src = ${recommendationYellowWindow}/></td>
            <td class = "rcmColumn2">Đóng cửa sổ để tránh không khí bẩn bên ngoài</td>
            <td class = "rcmColumn1"><img src = ${recommendationYellowAirpurifier}/></td>
            <td class = "rcmColumn2">Các nhóm nhạy cảm nên khởi động máy lọc không khí</td>
          </tr>
        </table>`
            return result;
          }
          else if (color[1] === "orange") {
            result += `
          <tr>
            <td class = "rcmColumn1"><img src = ${recommendationOrangeMask}/></td>
            <td class = "rcmColumn2">Các nhóm nhạy cảm nên đeo mặt nạ khi ra ngoài</td>
            <td class = "rcmColumn1"><img src = ${recommendationOrangeSport}/></td>
            <td class = "rcmColumn2">Giảm vận động ngoài trời</td>
          </tr>
          <tr>
            <td class = "rcmColumn1"><img src = ${recommendationOrangeWindow}/></td>
            <td class = "rcmColumn2">Đóng cửa sổ để tránh không khí bẩn bên ngoài</td>
            <td class = "rcmColumn1"><img src = ${recommendationOrangeAirpurifier}/></td>
            <td class = "rcmColumn2">Chạy máy lọc không khí</td>
          </tr>
        </table>`
            return result;
          }
          else if (color[1] === "grey") {
            result += `
          <tr>
            <td class = "rcmColumn1"><img src = ${recommendationGreyMask}/></td>
            <td class = "rcmColumn2">Đeo mặt nạ khi ra ngoài</td>
            <td class = "rcmColumn1"><img src = ${recommendationGreySport}/></td>
            <td class = "rcmColumn2">Tránh vận động ngoài trời</td>
          </tr>
          <tr>
            <td class = "rcmColumn1"><img src = ${recommendationGreyWindow}/></td>
            <td class = "rcmColumn2">Đóng cửa sổ để tránh không khí bẩn bên ngoài</td>
            <td class = "rcmColumn1"><img src = ${recommendationGreyAirpurifier}/></td>
            <td class = "rcmColumn2">Chạy máy lọc không khí</td>
          </tr>
        </table>`
            return result;
          }
          else if (color[1] === "#d81e1e") {
            result += `
          <tr>
            <td class = "rcmColumn1"><img src = ${recommendationRedMask}/></td>
            <td class = "rcmColumn2">Đeo mặt nạ khi ra ngoài</td>
            <td class = "rcmColumn1"><img src = ${recommendationRedSport}/></td>
            <td class = "rcmColumn2">Tránh vận động ngoài trời</td>
          </tr>
          <tr>
            <td class = "rcmColumn1"><img src = ${recommendationRedWindow}/></td>
            <td class = "rcmColumn2">Đóng cửa sổ để tránh không khí bẩn bên ngoài</td>
            <td class = "rcmColumn1"><img src = ${recommendationRedAirpurifier}/></td>
            <td class = "rcmColumn2">Chạy máy lọc không khí</td>
          </tr>
        </table>`
            return result;
          }
          else if (color[1] === "#ab19ab") {
            result += `
            <tr>
              <td class = "rcmColumn1"><img src = ${recommendationPurpleMask}/></td>
              <td class = "rcmColumn2">Đeo mặt nạ khi ra ngoài</td>
              <td class = "rcmColumn1"><img src = ${recommendationPurpleSport}/></td>
              <td class = "rcmColumn2">Tránh vận động ngoài trời</td>
            </tr>
            <tr>
              <td class = "rcmColumn1"><img src = ${recommendationPurpleWindow}/></td>
              <td class = "rcmColumn2">Đóng cửa sổ để tránh không khí bẩn bên ngoài</td>
              <td class = "rcmColumn1"><img src = ${recommendationPurpleAirpurifier}/></td>
              <td class = "rcmColumn2">Chạy máy lọc không khí</td>
            </tr>
          </table>`
            return result;
          }

        })()
      }} />)
    setModalColor([color[1], color[3]])
    setModalImg(color[2])
    setModalAqi(`${props.data[id][mainPollutant[1]].aqi}`)
  }
  // end handle modal

  // handle select tỉnh thành
  let center = props.center
  const mapRef = useRef(null);
  const handleClick = () => {
    if (mapRef.current) {
      mapRef.current.flyTo(center, 11, {
        animate: true,
        duration: 1,
        easeLinearity: 0.5,
      });
    }
  };
  useEffect(() => {
    handleClick();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.center]);
  // end handle select tỉnh thành

  let latLng = props.selectedLatLng
  const locateMarker = () => {
    if (mapRef.current && latLng.length !== 0) {
      mapRef.current.flyTo(latLng, 15, {
        animate: true,
        duration: 1,
        easeLinearity: 0.5,
      });
    }
  };
  useEffect(() => {
    locateMarker();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.selectedLatLng]);

  if (props.selectedDataType === 'excel') {
    const markers = marker(props.data, props.selectedDataType, props.typeOfPollutions, banDoHanhChinhHanam, props.listOfYear, props.listOfMonth);

    return (
      <div className="body-content-wrapper">
        <MapContainer attributionControl={false} ref={mapRef} center={center} zoom={12} scrollWheelZoom={true} style={{ height: '100%', width: '100%' }} >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {markers[0]}
          {markers[1]}
          <Legend />
        </MapContainer>
        <Modal show={show} onHide={handleClose} size="lg" centered >
          <Modal.Header closeButton style={{ backgroundColor: modalColor[0], color: modalColor[1] }}>
            <img src={modalImg} style={{ height: "100px", width: "100px", backgroundColor: modalColor[0] }} alt="" />
            <table className='aqi-value'>
              <tr>US AQI</tr>
              <tr></tr>
              <tr id='valueAqi'>{modalAqi}</tr>
            </table>
            <Modal.Title style={{ color: modalColor[1] }}>{modalTitle}</Modal.Title>
          </Modal.Header>
          <Modal.Body>{modalBody}{recommendation}</Modal.Body>
        </Modal>
      </div>
    );
  }
  else if (props.selectedDataType === 'weatherApi') {
    const markersDisplay = marker(props.data, props.selectedDataType, props.typeOfPollutions);

    return (
      <div className="body-content-wrapper">
        <MapContainer attributionControl={false} ref={mapRef} center={center} zoom={12} scrollWheelZoom={true} style={{ height: '100%', width: '100%' }} >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {markersDisplay}
          {/* <LocationMarker /> */}
          <Legend />
          <Locate locate={LocationMarker} />
        </MapContainer>
        <Modal show={show} onHide={handleClose} size="lg" centered >
          <Modal.Header closeButton style={{ backgroundColor: modalColor[0], color: modalColor[1] }}>
            <img src={modalImg} style={{ height: "100px", width: "100px", backgroundColor: modalColor[0] }} alt="" />
            <table className='aqi-value'>
              <tr>US AQI</tr>
              <tr></tr>
              <tr id='valueAqi'>{modalAqi}</tr>
            </table>
            <Modal.Title style={{ color: modalColor[1] }}>{modalTitle}</Modal.Title>
          </Modal.Header>
          <Modal.Body>{modalBody}{recommendation}</Modal.Body>
        </Modal>
      </div>
    );
  }


}
export default (Mapbody);
