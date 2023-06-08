import "./MapSidebar.scss";
import { Accordion, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState, useEffect } from 'react';
import { Modal } from "react-bootstrap";
// import { Button } from "react-bootstrap";
import { Bar } from 'react-chartjs-2';
// import 'chartjs-plugin-datalabels';
import {Chart} from '../../../node_modules/chart.js/auto';
// import { element } from "prop-types";


function getBackgroundColor(value) {
  if (value === 1) {
    return '#4cb84c';
  } else if (value === 2) {
    return 'yellow';
  } else if (value === 3){
    return 'orange';
  } else if (value === 4){
    return 'grey';
  } else if (value === 5){
    return '#d81e1e';
  } else if (value === 6){
    return '#ab19ab';
  }
};



function MapSidebar(props) {
  // modal bootstrap
  const [show, setShow] = useState(false);
  const data_all = props.data
  const list_months = props.listOfMonth
  list_months.sort(function(a, b) {
    return a - b;
  });

  const [activeDiv, setActiveDiv] = useState(1);
  const handleButtonClick = (divNumber) => {
    setActiveDiv(divNumber);
  };
  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
    console.log(props.data);
    console.log(props.listOfMonth)
  };

  let data1 = []
  let month1_no2 = []
  let month1_so2 = []
  let month1_tsp = []
  let month1_no2_aqi = []
  let month1_so2_aqi = []
  let month1_tsp_aqi = []
  data_all.forEach(element => {
    if (element.date.year === props.listOfYear[0] &&  element.location.address === 'KV góc cuối CCN Ngọc Động theo hướng Tây Bắc, huyện Duy Tiên') {
      data1.push(element)
    }
  });

  data1.forEach(element => {
    for (let i = 0; i < 12; i++) {
      if (element.date.month === i+1) {
        month1_no2[i] = element.no2.value
        month1_no2_aqi[i] = element.no2.result
      }
    }
  })
  data1.forEach(element => {
    for (let i = 0; i < 12; i++) {
      if (element.date.month === i+1) {
        month1_so2[i] = element.so2.value
        month1_so2_aqi[i] = element.so2.result
      }
    }
  })
  data1.forEach(element => {
    for (let i = 0; i < 12; i++) {
      if (element.date.month === i+1) {
        month1_tsp[i] = element.tsp.value
        month1_tsp_aqi[i] = element.tsp.result
      }
    }
  })

  const borderColorDefault = Array(12).fill('white');
  borderColorDefault[0] = '#000000';

  const [chartData1, setChartData1] = useState({
    labels: list_months,
    datasets: [
      {
        label: 'NO2',
        data: month1_no2,
        backgroundColor: month1_no2_aqi.map(getBackgroundColor),
        borderColor: borderColorDefault,
        borderWidth: 4,
      },
    ],
  });

  const [chartData2, setChartData2] = useState({
    labels: list_months,
    datasets: [
      {
        label: 'SO2',
        data: month1_so2,
        backgroundColor: month1_so2_aqi.map(getBackgroundColor),
        borderColor: borderColorDefault,
        borderWidth: 4,
      },
    ],
  });
  const [chartData3, setChartData3] = useState({
    labels: list_months,
    datasets: [
      {
        label: 'TSP',
        data: month1_tsp,
        backgroundColor: month1_tsp_aqi.map(getBackgroundColor),
        borderColor: borderColorDefault,
        borderWidth: 4,
      },
    ],
  });



  const handleSelectChange = () => {
    let data2 = []
    let month2_no2 = []
    let month2_so2 = []
    let month2_tsp = []
    let month2_no2_aqi = []
    let month2_so2_aqi = []
    let month2_tsp_aqi = []

    const borderColorArray = Array(12).fill('white');
    borderColorArray[parseInt(document.getElementById("month").value) - 1] = '#000000';

    console.log(parseInt(document.getElementById("month").value))
    console.log(document.getElementById("year").value)

    data_all.forEach(element => {
      if (element.date.year === parseInt(document.getElementById("year").value) &&  element.location.address === 'KV góc cuối CCN Ngọc Động theo hướng Tây Bắc, huyện Duy Tiên') {
        data2.push(element)
      }
      });

    data2.forEach(element => {
      for (let i = 0; i < 12; i++) {
        if (element.date.month === i+1) {
          month2_no2[i] = element.no2.value
          month2_no2_aqi[i] = element.no2.result
        }
      }
    })
    data2.forEach(element => {
      for (let i = 0; i < 12; i++) {
        if (element.date.month === i+1) {
          month2_so2[i] = element.so2.value
          month2_so2_aqi[i] = element.so2.result
        }
      }
    })
    data2.forEach(element => {
      for (let i = 0; i < 12; i++) {
        if (element.date.month === i+1) {
          month2_tsp[i] = element.tsp.value
          month2_tsp_aqi[i] = element.tsp.result
        }
      }
    })

    let newData1
    let newData2
    let newData3
    newData1 = {
      labels: list_months,
      datasets: [
          {
            label: 'NO2',
            data:  month2_no2,
            backgroundColor: month2_no2_aqi.map(getBackgroundColor),
            borderColor: borderColorArray,
            borderWidth: 4,
          },
        ],
      }
    newData2 = {
      labels: list_months,
      datasets: [
        {
          label: 'SO2',
          data:  month2_so2,
          backgroundColor: month2_so2_aqi.map(getBackgroundColor),
          borderColor: borderColorArray,
          borderWidth: 4,
        },
      ],
    }
      newData3 = {
        labels: list_months,
        datasets: [
          {
            label: 'TSP',
            data:  month2_tsp,
            backgroundColor: month2_tsp_aqi.map(getBackgroundColor),
            borderColor: borderColorArray,
            borderWidth: 4,
          },
        ],
      }

    setChartData1(newData1);
    setChartData2(newData2);
    setChartData3(newData3);
  };



  const options = {
    plugins: {
      legend: {
        display: false,
      },
    },
  }


  const [status, setStatus] = useState();
  const [timer, countdown] = useState();
  const [isStatusUpdated, setIsStatusUpdated] = useState(false);
  const [showLink, setShowLink] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLink(true);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    let seconds = 4;
    const timer = setInterval(() => {
      countdown(seconds);
      setStatus(false);
      seconds--;

      if (seconds < 0) {
        setStatus(true);
        clearInterval(timer);
      }
    }, 1000);
  }, [isStatusUpdated]);

  const handleDataTypeChange = (type) => {
    if (type !== props.selectedDataType) {
      setIsStatusUpdated(!isStatusUpdated);
      if (status) {
        props.onDataTypeChange(type);
      }
    }
  };

  const handleOptionChange = (event, type) => {
    props.onOptionChange(event, type);
  };

  const handleTypeChange = (event) => {
    props.onTypeChange(event);
  };

  return (
    <div className="body-sidebar-wrapper">
      <div className="sidebar-logo">
        {showLink ? (
          <Link to="/">HUMG - IT</Link>
        ) : (
          <Link>HUMG - IT</Link>
        )}
      </div>
      <div className="sidebar-menu-items">
        {props.selectedDataType === 'excel' && (
          <div>
            <div className="menu-items-header">CHỌN VÙNG QUAN TÂM</div>
            <Accordion>
              <Accordion.Item eventKey="0" className="accordion-item-toggle">
                <Accordion.Header>Theo tỉnh thành</Accordion.Header>
                <Accordion.Body className="accordion-item-toggle-body">
                  <Form.Select onChange={(event) => handleOptionChange(event, "tỉnh")}>
                    {Object.keys(props.conscious).map((key) => (
                      <option
                        value={key}
                        data-lat={props.conscious[key].latitude}
                        data-lng={props.conscious[key].longitude}
                      >
                        {key}
                      </option>
                    ))}
                  </Form.Select>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </div>
        )}

        <div className="menu-items-header">DỮ LIỆU QUAN TRẮC</div>
        <Accordion>
          <Accordion.Item eventKey="0" className="accordion-item-toggle">
            <Accordion.Header onClick={() => (props.selectedDataType === 'excel') ? null : (status ? handleDataTypeChange("excel") : alert(`bạn đang ấn quá nhanh, mời thử lại sau ${timer} giây`))} >Chất lượng không khí</Accordion.Header>
            {props.selectedDataType === 'excel' && (
              <Accordion.Body className="accordion-item-toggle-body">
                <p>dữ liệu hiện thị cho:<br /> tháng {props.selectedMonth} năm {props.selectedYear}<br /> {Object.keys(props.typeOfPollutions).filter(key => props.typeOfPollutions[key].state === "1").map(key => key.toUpperCase()).join(", ")} </p>
                <Form.Select onChange={(event) => handleOptionChange(event, "year")}>
                  <option disabled selected>chọn năm</option>
                  {Object.values(props.listOfYear).map((value) => (
                    <option value={value}>{value}</option>
                  ))}
                </Form.Select>
                <Form.Select onChange={(event) => handleOptionChange(event, "month")}>
                  <option disabled selected>chọn tháng</option>
                  {Object.values(props.listOfMonth).map((value) => (
                    <option value={value}>{value}</option>
                  ))}
                </Form.Select>
                <Accordion style={{ marginTop: '5px' }}>
                  <Accordion.Item eventKey="0" className="accordion-item-toggle1">
                    <Accordion.Header className="cus">Chọn kiểu dữ liệu</Accordion.Header>
                    <Accordion.Body className="accordion-item-toggle-body1">
                      {Object.entries(props.typeOfPollutions).map(([key, value]) => (
                        <div className="form-check form-switch">
                          {
                            <input className="form-check-input" type="checkbox" value={value.state === '1' ? '1' : '0'} id={key} onChange={handleTypeChange} checked={value.state === '1' ? true : false} />
                          }
                          <label className="form-check-label">
                            {key.toUpperCase()}
                          </label>
                        </div>
                      ))}
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
                <Accordion style={{ marginTop: '5px' }}>
                  <Accordion.Item eventKey="0" className="accordion-item-toggle1">
                    <Accordion.Header className="cus" onClick={() => handleShow()}>Bộ lọc nâng cao</Accordion.Header>
                    <Modal show={show} onHide={handleClose} size="lg" centered>
                      <Modal.Header closeButton>
                        <Modal.Title>Modal</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        {/* Chart */}
                        <div>
                          <button onClick={() => handleButtonClick(1)}>NO2</button>
                          <button onClick={() => handleButtonClick(2)}>SO2</button>
                          <button onClick={() => handleButtonClick(3)}>TSP</button>

                          {activeDiv === 1 && (
                            <div>
                              <Bar data={chartData1} options={options} />
                              NO2
                            </div>
                          )}
                          {activeDiv === 2 && (
                            <div>
                              <Bar data={chartData2} options={options} />
                              SO2
                            </div>
                          )}
                          {activeDiv === 3 && (
                            <div>
                              <Bar data={chartData3} options={options} />
                              TSP
                            </div>
                          )}
                        </div>
                        <select  id="year"  onChange={handleSelectChange}>
                          {props.listOfYear.map((year) => (
                            <option key={year} value={year}>
                              Năm {year}
                            </option>
                          ))}
                        </select>
                         <select id="month" onChange={handleSelectChange}>
                        {props.listOfMonth.map((month) => (
                            <option key={month} value={month}>
                              Tháng {month}
                            </option>
                          ))}
                        </select>
                      </Modal.Body>
                    </Modal>
                  </Accordion.Item>
                </Accordion>
              </Accordion.Body>
            )}
          </Accordion.Item>
        </Accordion>
        <div className="menu-items-header">DỮ LIỆU API TÍCH HỢP</div>
        <Accordion>
          <Accordion.Item eventKey="2" className="accordion-item-toggle">
            <Accordion.Header onClick={() => (props.selectedDataType === 'weatherApi') ? null : (status ? handleDataTypeChange("weatherApi") : alert(`bạn đang ấn quá nhanh, mời thử lại sau ${timer} giây`))} >Dữ liệu từ weather api</Accordion.Header>
            {/* <Accordion.Body>
              <p>Dữ liệu từ weather api</p>
            </Accordion.Body> */}
          </Accordion.Item>
        </Accordion>
      </div>
    </div>
  );
}

export default MapSidebar;
