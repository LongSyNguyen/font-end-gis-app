import "./MapNote.scss";
import { Accordion } from "react-bootstrap";
import { BsClipboardMinusFill } from "react-icons/bs";

function MapNote() {
  return (
    <Accordion className="mapnote-container">
      <Accordion.Item>
        <Accordion.Header className="accordin-header">
          <BsClipboardMinusFill className="accordin-icon" />
          <span>CHÚ GIẢI</span>
        </Accordion.Header>
        <Accordion.Body>Chú giải here</Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}

export default MapNote;
