import "./Locate.scss";
import marker from "../.././assets/images/marker.svg";

function Locate(props) {
  function locateUser() {
    props.locate()
  }

  return (
    <div className="locate-container">
      <div className="locate-block" onClick={locateUser}>
        Định vị tôi
        <img src={marker} alt="Marker" />
      </div>
    </div>
  );
}

export default Locate;
