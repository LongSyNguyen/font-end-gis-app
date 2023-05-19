import "./MapSidebar.scss";
import { Accordion, Form } from "react-bootstrap";
import { Link } from "react-router-dom";


function MapSidebar(props) {
  const handleDataTypeChange = (type) => {
    props.onDataTypeChange(type);
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
        <Link to="/">HUMG - IT</Link>
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
            <Accordion.Header onClick={() => handleDataTypeChange("excel")}>Chất lượng không khí</Accordion.Header>
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
                  <Accordion.Header className="cus">chọn kiểu dữ liệu</Accordion.Header>
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

            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
        <div className="menu-items-header">DỮ LIỆU API TÍCH HỢP</div>
        <Accordion>
          <Accordion.Item eventKey="2" className="accordion-item-toggle">
            <Accordion.Header onClick={() => handleDataTypeChange("weatherApi")}>Dữ liệu từ weather api</Accordion.Header>
            {/* <Accordion.Body>
              <p>Dữ liệu từ weather api</p>
            </Accordion.Body> */}
          </Accordion.Item>
        </Accordion>
      </div>
    </div>
  );
}

export default (MapSidebar);
