import "./MapSidebar.scss";
import { Accordion, Form } from "react-bootstrap";
import { Link } from "react-router-dom";


function MapSidebar(props) {
  const handleOptionChange = (event, type) => {
    props.onOptionChange(event, type);
  };

  return (
    <div className="body-sidebar-wrapper">
      <div className="sidebar-logo">
        <Link to="/">HUMG - IT</Link>
      </div>
      <div className="sidebar-menu-items">
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
        <div className="menu-items-header">DỮ LIỆU QUAN TRẮC</div>
        <Accordion>
          <Accordion.Item eventKey="0" className="accordion-item-toggle">
            <Accordion.Header>Chất lượng không khí</Accordion.Header>
            <Accordion.Body className="accordion-item-toggle-body">
              <p>dữ liệu hiện thị cho:<br /> {props.selectedYear}, {props.typeOfPollution.join(', ')} </p>
              <Form.Select onChange={(event) => handleOptionChange(event, "year")}>
                <option disabled selected>chọn năm</option>
                {Object.values(props.listOfYear).map((value) => (
                  <option value={value}>{value}</option>
                ))}
              </Form.Select>
              <Accordion style={{marginTop: '5px'}}>
                <Accordion.Item eventKey="0" className="accordion-item-toggle1">
                <Accordion.Header className="cus">chọn kiểu dữ liệu</Accordion.Header>
                  <Accordion.Body className="accordion-item-toggle-body1">
                  <Form>

                  {Object.values(props.typeOfPollution).map((key) => (
                  <p><Form.Check
                  type="switch"
                  id={key}
                  label={key}
                /></p>
                ))}

                    </Form>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>

            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
        <div className="menu-items-header">DỮ LIỆU API TÍCH HỢP</div>
        <Accordion>
          <Accordion.Item eventKey="0" className="accordion-item-toggle">
            <Accordion.Header>Dữ liệu từ weather api</Accordion.Header>
            <Accordion.Body>
              <p>Dữ liệu từ weather api</p>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </div>
    </div>
  );
}

export default (MapSidebar);
