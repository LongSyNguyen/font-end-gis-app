import { MapContainer, TileLayer, LayerGroup, useMapEvents, Marker, GeoJSON, Popup, LayersControl,FeatureGroup  } from 'react-leaflet';
import { useRef, useEffect, useState } from 'react';
import L from 'leaflet';
import "leaflet/dist/leaflet.css";
import "./Mapbody.scss";


function Mapbody(props) {
  let center = props.center

  const mapRef = useRef(null);
  const handleClick = () => {
    if (mapRef.current) {
      mapRef.current.flyTo(center, 11, {
        duration: 1,
        easeLinearity: 0.5,
      });
    }
  };
  useEffect(() => {
    handleClick();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.center]);


  function classPoint(element = "default" ) {
    if (element === "default") {
      return L.icon({
        iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
        iconRetinaUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        tooltipAnchor: [16, -28],
      });
    }
    else{
      const tspResult = element.tsp.result;
      const so2Result = element.so2.result;
      const no2Result = element.tsp.result;
      const max = Math.max(tspResult, so2Result, no2Result);

      if (max === 1) {
        return L.icon({
          iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
          iconRetinaUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
          iconSize: [25, 41],
          iconAnchor: [12, 41],
          popupAnchor: [1, -34],
          tooltipAnchor: [16, -28],
        });
      }
      else if (max === 2) {
        return L.icon({
          iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-yellow.png',
          iconRetinaUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-yellow.png',
          iconSize: [25, 41],
          iconAnchor: [12, 41],
          popupAnchor: [1, -34],
          tooltipAnchor: [16, -28]
        });
      }
      else if (max === 3) {
        return L.icon({
          iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-orange.png',
          iconRetinaUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-orange.png',
          iconSize: [25, 41],
          iconAnchor: [12, 41],
          popupAnchor: [1, -34],
          tooltipAnchor: [16, -28],
        });
      }
      else if (max === 4) {
        return L.icon({
          iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
          iconRetinaUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
          iconSize: [25, 41],
          iconAnchor: [12, 41],
          popupAnchor: [1, -34],
          tooltipAnchor: [16, -28],
        });
      }
      else if (max === 5) {
        return L.icon({
          iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-grey.png',
          iconRetinaUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-grey.png',
          iconSize: [25, 41],
          iconAnchor: [12, 41],
          popupAnchor: [1, -34],
          tooltipAnchor: [16, -28],
        });
      }
      else if (max === 6) {
        return L.icon({
          iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-violet.png',
          iconRetinaUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-violet.png',
          iconSize: [25, 41],
          iconAnchor: [12, 41],
          popupAnchor: [1, -34],
          tooltipAnchor: [16, -28],
        });
      }
    }

  }
  function LocationMarker() {
    const [position, setPosition] = useState(null)
    const map = useMapEvents({
      // overlayadd(){
      //   console.log()
      // },
      click() {
        map.locate()
      },
      locationfound(e) {
        setPosition(e.latlng)
        map.flyTo(e.latlng, map.getZoom())
      },
    })

    return position === null ? null : (
      <Marker position={position} icon={classPoint()}>
        <Popup>You are here</Popup>
      </Marker>
    )
  }

  function marker (points, listOfYears) {

      let markers = Object.assign({}, ...listOfYears.map(key => ({ [key]: [] })));
      for (let i = 0; i < points.length; i++) {
        const color = classPoint(points[i])
        markers[points[i].date.year].push(
          <Marker position={[points[i].location.latitude, points[i].location.longitude]} icon={color} >
            <Popup>
              <div dangerouslySetInnerHTML={{
                __html: (() => {
                  let keys = Object.keys(points[i]);
                  let result = '<table><tr><th style = "border-bottom: 3px solid black">  ';
                  result += `${points[i].location.address}</th></tr>`;
                  result += `<tr><td>${keys[2]}: ${points[i][keys[2]].iso.slice(0, 10)}</td></tr>`;

                  for (let index = 3; index < keys.length; index++) {
                    result += `<tr><td>${keys[index]}: ${points[i][keys[index]].aqi}</td></tr>`;
                  }
                  result += '</tr>'
                  return result;
                })()
              }} />
            </Popup>
          </Marker>
        );
      }
      return markers
    };
    const markers = marker(props.data, props.listOfYear)
    const markersDisplay = markers[props.selectedYear]
  return (
    <div className="body-content-wrapper">
      <MapContainer ref={mapRef} center={center} zoom={12} scrollWheelZoom={true} style={{ height: '100%', width: '100%' }} attributionControl={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {markersDisplay}
      <LocationMarker />
      </MapContainer>
    </div>
  );
}
export default (Mapbody);
