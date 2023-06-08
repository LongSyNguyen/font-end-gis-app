import "./MapSidebar.scss";
import { Accordion, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from 'react';
import { Modal, Container, Row, Col } from "react-bootstrap";
import { Bar, Doughnut } from 'react-chartjs-2';

import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function MapSidebar(props) {
  const data_all = props.data
  const list_months = props.listOfMonth
  list_months.sort(function (a, b) {
    return a - b;
  });
  function getBackgroundColor(value) {
    if (value === 1) {
      return '#4cb84c';
    } else if (value === 2) {
      return 'yellow';
    } else if (value === 3) {
      return 'orange';
    } else if (value === 4) {
      return 'grey';
    } else if (value === 5) {
      return '#d81e1e';
    } else if (value === 6) {
      return '#ab19ab';
    }
  };

  const handleButtonClick = (divType) => {
    setActiveDiv(divType);
  };
  const userActive = (event, type) => {
    if (type === 'search') {
      setSearchInput("")
      setCurrentYear(props.selectedYear)
      setCurrentMonth(props.selectedMonth)
      setCurrentAddress('')
      setOptionsBarChart({
        plugins: {
          legend: {
            display: false,
          },
          title: {
            display: false,
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            max: 500,
            ticks: {
              stepSize: 50,
            }
          }
        }
      })
      event.preventDefault();
      setSearchInput(event.target.value)
      setShowModal(
        <div>
          <table style={{ borderCollapse: 'separate', borderSpacing: 0, width: "100%" }}>
            <colgroup>
              <col style={{ width: "7%" }} />
              <col style={{ width: "63%" }} />
              <col style={{ width: "10%" }} />
              <col style={{ width: "20%" }} />
            </colgroup>
            <thead>
              <tr>
                <th colSpan={2} style={{ position: 'sticky', top: 0, borderBottom: 'solid 1px black', backgroundColor: '#eae3e3' }}>Name</th>
                <th style={{ position: 'sticky', top: 0, borderBottom: 'solid 1px black', backgroundColor: '#eae3e3' }}>AQI</th>
                <th style={{ position: 'sticky', top: 0, borderBottom: 'solid 1px black', backgroundColor: '#eae3e3' }}>chất lượng</th>
              </tr>
            </thead>
            <tbody>
              {props.data.map((element, index) => {
                if (
                  // eslint-disable-next-line
                  element.date.year == currentYear &&
                  // eslint-disable-next-line
                  element.date.month == currentMonth &&
                  element.location.address.match(event.target.value)
                ) {
                  var mainPollutant = ''
                  var valueMainPollutant = 0
                  for (let index = 3; index < 5; index++) {
                    const key = Object.keys(element)[index];
                    if (mainPollutant === '') {
                      mainPollutant = key
                      valueMainPollutant = element[key].result
                    }
                    else {
                      if (valueMainPollutant < element[key].result) {
                        valueMainPollutant = element[key].result
                      }
                    }
                  }
                  return (
                    <div className={'table-row'} id={index.toString()} onClick={() => {
                      handleClickTable(element.location.address, currentYear, currentMonth, index, element[mainPollutant].aqi, typeOfPollution(valueMainPollutant)[0], mainPollutant.toUpperCase())
                    }} style={{ display: "table-row", }}>
                      <div style={{ display: "table-cell", paddingTop: "3px", paddingBottom: "3px", verticalAlign: "middle" }}>
                        <td><div style={{ borderRadius: "50%", width: "100%", height: "100%", verticalAlign: "middle", backgroundColor: typeOfPollution(valueMainPollutant)[0], color: typeOfPollution(valueMainPollutant)[0] }}>.....</div></td>
                      </div>
                      <div style={{ display: "table-cell", paddingTop: "3px", paddingBottom: "3px", verticalAlign: "middle" }}>
                        <td>{element.location.address}</td>
                      </div>
                      <div style={{ display: "table-cell", paddingTop: "3px", paddingBottom: "3px", verticalAlign: "middle" }}>
                        <td>{element[mainPollutant].aqi}</td>
                      </div>
                      <div style={{ display: "table-cell", paddingTop: "3px", paddingBottom: "3px", verticalAlign: "middle" }}>
                        <td>{typeOfPollution(valueMainPollutant)[2]}</td>
                      </div>
                    </div>

                  );
                }
                return null;
              })}
            </tbody>
          </table>
        </div>
      );
    }
    if (type === 'year') {
      setSearchInput("")
      setCurrentYear(props.selectedYear)
      setCurrentMonth(props.selectedMonth)
      setCurrentAddress('')
      setOptionsBarChart({
        plugins: {
          legend: {
            display: false,
          },
          title: {
            display: false,
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            max: 500,
            ticks: {
              stepSize: 50,
            }
          }
        }
      })
      setCurrentYear(event.target.value)
      document.getElementById("month")
      setShowModal(
        <div>
          <table style={{ borderCollapse: 'separate', borderSpacing: 0, width: "100%" }}>
            <colgroup>
              <col style={{ width: "7%" }} />
              <col style={{ width: "63%" }} />
              <col style={{ width: "10%" }} />
              <col style={{ width: "20%" }} />
            </colgroup>
            <thead>
              <tr>
                <th colSpan={2} style={{ position: 'sticky', top: 0, borderBottom: 'solid 1px black', backgroundColor: '#eae3e3' }}>Name</th>
                <th style={{ position: 'sticky', top: 0, borderBottom: 'solid 1px black', backgroundColor: '#eae3e3' }}>AQI</th>
                <th style={{ position: 'sticky', top: 0, borderBottom: 'solid 1px black', backgroundColor: '#eae3e3' }}>chất lượng</th>
              </tr>
            </thead>
            <tbody>
              {props.data.map((element, index) => {
                if (
                  // eslint-disable-next-line
                  element.date.year == event.target.value &&
                  // eslint-disable-next-line
                  element.date.month == currentMonth
                ) {
                  var mainPollutant = ''
                  var valueMainPollutant = 0
                  for (let index = 3; index < 5; index++) {
                    const key = Object.keys(element)[index];
                    if (mainPollutant === '') {
                      mainPollutant = key
                      valueMainPollutant = element[key].result
                    }
                    else {
                      if (valueMainPollutant < element[key].result) {
                        valueMainPollutant = element[key].result
                      }
                    }
                  }
                  return (
                    <div className={'table-row'} id={index.toString()} onClick={() => {
                      handleClickTable(element.location.address, event.target.value, currentMonth, index, element[mainPollutant].aqi, typeOfPollution(valueMainPollutant)[0], mainPollutant.toUpperCase())
                    }} style={{ display: "table-row", }}>
                      <div style={{ display: "table-cell", paddingTop: "3px", paddingBottom: "3px", verticalAlign: "middle" }}>
                        <td><div style={{ borderRadius: "50%", width: "100%", height: "100%", verticalAlign: "middle", backgroundColor: typeOfPollution(valueMainPollutant)[0], color: typeOfPollution(valueMainPollutant)[0] }}>.....</div></td>
                      </div>
                      <div style={{ display: "table-cell", paddingTop: "3px", paddingBottom: "3px", verticalAlign: "middle" }}>
                        <td>{element.location.address}</td>
                      </div>
                      <div style={{ display: "table-cell", paddingTop: "3px", paddingBottom: "3px", verticalAlign: "middle" }}>
                        <td>{element[mainPollutant].aqi}</td>
                      </div>
                      <div style={{ display: "table-cell", paddingTop: "3px", paddingBottom: "3px", verticalAlign: "middle" }}>
                        <td>{typeOfPollution(valueMainPollutant)[2]}</td>
                      </div>
                    </div>

                  );
                }
                return null;
              })}
            </tbody>
          </table>
        </div>
      );
      if (currentAddress !== '') {
        setOptionsBarChart(
          {
            plugins: {
              legend: {
                display: false,
              },
              title: {
                display: true,
                text: `Biểu đồ Theo dõi Chỉ số AQI ${currentAddress}`,
                fontSize: 20
              }
            }
          })
      }
    }
    else if (type === 'month') {
      setSearchInput("")
      setCurrentYear(props.selectedYear)
      setCurrentMonth(props.selectedMonth)
      setCurrentAddress('')
      setOptionsBarChart({
        plugins: {
          legend: {
            display: false,
          },
          title: {
            display: false,
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            max: 500,
            ticks: {
              stepSize: 50,
            }
          }
        }
      })
      setCurrentMonth(event.target.value)
      setShowModal(
        <div>
          <table style={{ borderCollapse: 'separate', borderSpacing: 0, width: "100%" }}>
            <colgroup>
              <col style={{ width: "7%" }} />
              <col style={{ width: "63%" }} />
              <col style={{ width: "10%" }} />
              <col style={{ width: "20%" }} />
            </colgroup>
            <thead>
              <tr>
                <th colSpan={2} style={{ position: 'sticky', top: 0, borderBottom: 'solid 1px black', backgroundColor: '#eae3e3' }}>Name</th>
                <th style={{ position: 'sticky', top: 0, borderBottom: 'solid 1px black', backgroundColor: '#eae3e3' }}>AQI</th>
                <th style={{ position: 'sticky', top: 0, borderBottom: 'solid 1px black', backgroundColor: '#eae3e3' }}>chất lượng</th>
              </tr>
            </thead>
            <tbody>
              {props.data.map((element, index) => {
                if (
                  // eslint-disable-next-line
                  element.date.year == currentYear &&
                  // eslint-disable-next-line
                  element.date.month == event.target.value
                ) {
                  var mainPollutant = ''
                  var valueMainPollutant = 0
                  for (let index = 3; index < 5; index++) {
                    const key = Object.keys(element)[index];
                    if (mainPollutant === '') {
                      mainPollutant = key
                      valueMainPollutant = element[key].result
                    }
                    else {
                      if (valueMainPollutant < element[key].result) {
                        valueMainPollutant = element[key].result
                      }
                    }
                  }
                  return (
                    <div className={'table-row'} id={index.toString()} onClick={() => {
                      handleClickTable(element.location.address, currentYear, event.target.value, index, element[mainPollutant].aqi, typeOfPollution(valueMainPollutant)[0], mainPollutant.toUpperCase())
                    }} style={{ display: "table-row", }}>
                      <div style={{ display: "table-cell", paddingTop: "3px", paddingBottom: "3px", verticalAlign: "middle" }}>
                        <td><div style={{ borderRadius: "50%", width: "100%", height: "100%", verticalAlign: "middle", backgroundColor: typeOfPollution(valueMainPollutant)[0], color: typeOfPollution(valueMainPollutant)[0] }}>.....</div></td>
                      </div>
                      <div style={{ display: "table-cell", paddingTop: "3px", paddingBottom: "3px", verticalAlign: "middle" }}>
                        <td>{element.location.address}</td>
                      </div>
                      <div style={{ display: "table-cell", paddingTop: "3px", paddingBottom: "3px", verticalAlign: "middle" }}>
                        <td>{element[mainPollutant].aqi}</td>
                      </div>
                      <div style={{ display: "table-cell", paddingTop: "3px", paddingBottom: "3px", verticalAlign: "middle" }}>
                        <td>{typeOfPollution(valueMainPollutant)[2]}</td>
                      </div>
                    </div>

                  );
                }
                return null;
              })}
            </tbody>
          </table>
        </div>
      );

    }
  }
  const handleSelectChange = (address = currentAddress, year = currentYear, month = currentMonth) => {

    let newData1;
    let newData2;
    let newData3;
    if (address !== '') {
      let dataNew = []
      let dataNew_no2 = []
      let dataNew_so2 = []
      let dataNew_tsp = []
      let dataNew_no2_aqi = []
      let dataNew_so2_aqi = []
      let dataNew_tsp_aqi = []

      const borderColorArray = Array(12).fill('white');
      borderColorArray[parseInt(month) - 1] = '#000000';

      data_all.forEach(element => {
        if (element.date.year === parseInt(year) && element.location.address === address) {
          dataNew.push(element)
        }
      });
      dataNew.forEach(element => {
        console.log(element)
        for (let i = 0; i < 12; i++) {
          if (element.date.month === i + 1) {
            dataNew_no2[i] = element.no2.aqi
            dataNew_no2_aqi[i] = element.no2.result
            dataNew_so2[i] = element.so2.aqi
            dataNew_so2_aqi[i] = element.so2.result
            dataNew_tsp[i] = element.tsp.aqi
            dataNew_tsp_aqi[i] = element.tsp.result
          }
        }
      })

      newData1 = {
        labels: list_months,
        datasets: [
          {
            label: 'NO2',
            data: dataNew_no2,
            backgroundColor: dataNew_no2_aqi.map(getBackgroundColor),
            borderColor: borderColorArray,
            borderWidth: 5,
          },
        ],
      }
      newData2 = {
        labels: list_months,
        datasets: [
          {
            label: 'SO2',
            data: dataNew_so2,
            backgroundColor: dataNew_so2_aqi.map(getBackgroundColor),
            borderColor: borderColorArray,
            borderWidth: 5,
          },
        ],
      }
      newData3 = {
        labels: list_months,
        datasets: [
          {
            label: 'TSP',
            data: dataNew_tsp,
            backgroundColor: dataNew_tsp_aqi.map(getBackgroundColor),
            borderColor: borderColorArray,
            borderWidth: 5,
          },
        ],
      }
    }
    else {
      newData1 = {
        labels: list_months,
        datasets: [
          {
            label: 'NO2',
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            backgroundColor: ['white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white'],
          },
        ],
      }
      newData2 = {
        labels: list_months,
        datasets: [
          {
            label: 'NO2',
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            backgroundColor: ['white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white'],
          },
        ],
      }
      newData3 = {
        labels: list_months,
        datasets: [
          {
            label: 'NO2',
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            backgroundColor: ['white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white'],
          },
        ],
      }
    }
    setChartData1(newData1);
    setChartData2(newData2);
    setChartData3(newData3);
  };

  function handleClickTable(name, year, month, index, aqi, color, mainPollutant) {
    setActiveDiv(mainPollutant)
    handleSelectChange(name, year, month)
    setOptionsBarChart(
      {
        plugins: {
          legend: {
            display: false,
          },
          title: {
            display: true,
            text: `Biểu đồ Theo dõi Chỉ số AQI ${name}`,
            fontSize: 20
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            max: 500,
            ticks: {
              stepSize: 50,
            }
          }
        }
      }
    )
    setDataDoughnutChart({
      labels: ['tốt', 'trung bình', 'kém', 'xấu', 'rất xấu', 'nguy hiểm'],
      datasets: [{
        data: [50, 50, 50, 50, 100, 200],
        backgroundColor: ['#4cb84c', 'yellow', 'orange', 'grey', '#d81e1e', '#ab19ab'],
        borderColor: ['#4cb84c', 'yellow', 'orange', 'grey', '#d81e1e', '#ab19ab'],
        circumference: 180,
        rotation: 270,
        cutout: '55%',
        hoverOffset: 20,
        needleValue: aqi,
        fillText: color,
      }]
    })
    const elements = document.querySelectorAll('.table-row');

    elements.forEach(element => {
      element.style.backgroundColor = "#eae3e3";
    });

    document.getElementById(index).style.backgroundColor = " rgb(173, 173, 135)"

    setCurrentAddress(name)

  }

  function typeOfPollution(maxValue) {
    if (maxValue === 1) {
      return ['#4cb84c', "#000000", 'Tốt']
    }
    else if (maxValue === 2) {
      return ['yellow', "#000000", 'Trung bình']
    }
    else if (maxValue === 3) {
      return ['orange', "#000000", 'Kém']
    }
    else if (maxValue === 4) {
      return ['grey', "#ffffff", 'Xấu']
    }
    else if (maxValue === 5) {
      return ['#d81e1e', "#ffffff", 'Rất xấu']
    }
    else if (maxValue === 6) {
      return ['#ab19ab', "#ffffff", 'Nguy hiểm']
    }
  }

  const [activeDiv, setActiveDiv] = useState('TSP');
  const [searchInput, setSearchInput] = useState("");

  const [currentAddress, setCurrentAddress] = useState("");
  const [currentYear, setCurrentYear] = useState(props.selectedYear);
  const [currentMonth, setCurrentMonth] = useState(props.selectedMonth);

  // handle user clicks fast
  const [status, setStatus] = useState();
  const [timer, countdown] = useState();
  const [isStatusUpdated, setIsStatusUpdated] = useState(false);
  const [showLink, setShowLink] = useState(false);
  // end handle user clicks fast

  // modal bootstrap and chart
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
    setSearchInput("")
    setCurrentYear(props.selectedYear)
    setCurrentMonth(props.selectedMonth)
    setCurrentAddress('')
    setOptionsBarChart({
      plugins: {
        legend: {
          display: false,
        },
        title: {
          display: false,
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          max: 500,
          ticks: {
            stepSize: 50,
          }
        }
      }
    })
  };

  const [showModal, setShowModal] = useState("");
  const [chartData1, setChartData1] = useState({});
  const [chartData2, setChartData2] = useState({});
  const [chartData3, setChartData3] = useState({});

  // bar chart
  const [optionsBarChart, setOptionsBarChart] = useState({
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      }
    }
  });

  // doughnut chart
  const [dataDoughnutChart, setDataDoughnutChart] = useState({});
  const [optionsDoughnutChart, setOptionsDoughnutChart] = useState({});
  const [pluginDoughnutChart, setPluginDoughnutChart] = useState({});
  // end modal bootstrap and chart
  const canvasRef = useRef(null);


  const handleShow = () => {
    handleSelectChange();

    setOptionsDoughnutChart({
      responsive: true,
      plugins: {
        legend: {
          display: true,
          position: 'right',
        },
        tooltip: {
          callbacks: {
            label: function (content) {
              if (content.label === "Tốt") {
                return 'AQI: 0-50';
              }
              else if (content.label === "Trung bình") {
                return 'AQI: 51-100';
              }
              else if (content.label === "Kém") {
                return 'AQI: 101-150';
              }
              else if (content.label === "Xấu") {
                return 'AQI: 151-200';
              }
              else if (content.label === "Rất xấu") {
                return 'AQI: 201-300';
              }
              else if (content.label === "Nguy hiểm") {
                return 'AQI: 301-500';
              }
            }
          }
        }
      }
    })

    setDataDoughnutChart({
      labels: ['Tốt', 'Trung bình', 'Kém', 'Xấu', 'Rất xấu', 'Nguy hiểm'],
      datasets: [{
        label: 'aaaaaaaaaaaaaaaaaaaaa',
        data: [50, 50, 50, 50, 100, 200],
        backgroundColor: ['#4cb84c', 'yellow', 'orange', 'grey', '#d81e1e', '#ab19ab'],
        borderColor: ['#4cb84c', 'yellow', 'orange', 'grey', '#d81e1e', '#ab19ab'],
        circumference: 180,
        rotation: 270,
        cutout: '55%',
        hoverOffset: 20,
        needleValue: 0,
        fillText: 'black',
      }]
    })

    setPluginDoughnutChart({
      id: 'gaugeNeedle',
      afterDatasetsDraw(chart, args, options) {
        const { ctx, data, chartArea: { width, height } } = chart;
        ctx.save();
        const needleValue = data.datasets[0].needleValue;
        const dataTotal = data.datasets[0].data.reduce((a, b) => a + b, 0);
        const angle = -(1 / dataTotal * needleValue * Math.PI);
        const cx = width / 2;
        const cy = height - 100;

        ctx.translate(cx, cy);
        ctx.rotate(Math.PI - angle);

        // Vẽ kim chỉ số
        ctx.beginPath();
        ctx.moveTo(0, -2);
        ctx.lineTo(80, 0);
        ctx.lineTo(0, 2);
        ctx.fillStyle = "#444";
        ctx.fill();

        // Vẽ điểm quay
        ctx.translate(-cx, -cy);
        ctx.beginPath();
        ctx.arc(cx, cy, 5, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        // Hiển thị giá trị AQI
        ctx.font = 'bolder 30px sans-serif';
        ctx.fillStyle = data.datasets[0].fillText;
        ctx.fillText(`AQI: ${needleValue}`, cx, cy + 60);
        ctx.textAlign = 'center';
      }
    })

    setShowModal(
      <div>
        <table style={{ borderCollapse: 'separate', borderSpacing: 0, width: "100%" }}>
          <colgroup>
            <col style={{ width: "7%" }} />
            <col style={{ width: "63%" }} />
            <col style={{ width: "10%" }} />
            <col style={{ width: "20%" }} />
          </colgroup>
          <thead>
            <tr>
              <th colSpan={2} style={{ position: 'sticky', top: 0, borderBottom: 'solid 1px black', backgroundColor: '#eae3e3' }}>Name</th>
              <th style={{ position: 'sticky', top: 0, borderBottom: 'solid 1px black', backgroundColor: '#eae3e3' }}>AQI</th>
              <th style={{ position: 'sticky', top: 0, borderBottom: 'solid 1px black', backgroundColor: '#eae3e3' }}>chất lượng</th>
            </tr>
          </thead>

        </table>
      </div>
    );
    setShow(true)

  };
  // end modal bootstrap and chart


  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLink(true);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    let seconds = 4;
    const timer = setInterval(() => {
      countdown(seconds)
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
    <div className="body-sidebar-wrapper" >
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
                    <Accordion.Header className="cus" onClick={() => handleShow()}>Thống kê</Accordion.Header>
                    <Modal show={show} onHide={handleClose} size="lg" centered>
                      <Modal.Header closeButton >
                        <Modal.Title>Modal</Modal.Title>
                      </Modal.Header>
                      <Modal.Body >
                        {/* <Modal.Body className="show-grid"> */}
                        <Container >
                          <Row className="custom-select">
                            <div className="search">

                              <input
                                type="text"
                                placeholder="Search here"
                                style={{ width: '100%' }}
                                onChange={(event) => {
                                  userActive(event, 'search')
                                  handleSelectChange('')
                                }}
                                value={searchInput} />

                            </div>
                            <select className="year" id="year" onChange={(event) => {
                              userActive(event, "year");
                              handleSelectChange(currentAddress, event.target.value, currentMonth)
                            }}>
                              <option disabled selected>chọn năm</option>
                              {props.listOfYear.map((year) => (
                                <option key={year} value={year}>
                                  Năm {year}
                                </option>
                              ))}
                            </select>
                            <select className="month" id="month" onChange={(event) => {
                              userActive(event, "month");
                              handleSelectChange(currentAddress, currentYear, event.target.value)
                            }}>
                              <option disabled selected>chọn tháng</option>
                              {props.listOfMonth.map((month) => (
                                <option key={month} value={month}>
                                  Tháng {month}
                                </option>
                              ))}
                            </select>
                          </Row>
                          <Row style={{ display: "grid" }} className="custom-modal-body">
                            <Col className="col-1" xs={7} md={8}>
                              {showModal}
                            </Col>
                            <Col className="col-2" xs={5} md={4}>
                              <div>
                                <Doughnut
                                  ref={canvasRef}
                                  data={dataDoughnutChart}
                                  options={optionsDoughnutChart}
                                  plugins={[pluginDoughnutChart]}
                                ></Doughnut>
                              </div>
                            </Col>
                          </Row>
                          <Row className="chart-container">
                            <div className="chart-data">
                              {activeDiv === 'NO2' && (
                                <div className="chart">
                                  <Bar data={chartData1} options={optionsBarChart} />
                                </div>
                              )}
                              {activeDiv === 'SO2' && (
                                <div className="chart">
                                  <Bar data={chartData2} options={optionsBarChart} />
                                </div>
                              )}
                              {activeDiv === 'TSP' && (
                                <div className="chart">
                                  <Bar data={chartData3} options={optionsBarChart} />
                                </div>
                              )}
                              <button onClick={() => handleButtonClick('NO2')}>NO2</button>
                              <button onClick={() => handleButtonClick('SO2')}>SO2</button>
                              <button onClick={() => handleButtonClick('TSP')}>TSP</button>
                            </div>

                          </Row>
                        </Container>
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
    </div >
  );
}

export default (MapSidebar);