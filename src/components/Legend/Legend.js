import "./Legend.css";
import { useEffect, useState } from 'react';
import greenMarker from "../.././assets/images/marker-icon-2x-green.png";
import yellowMarker from "../.././assets/images/marker-icon-2x-yellow.png";
import orangeMarker from "../.././assets/images/marker-icon-2x-orange.png";
import greyMarker from "../.././assets/images/marker-icon-2x-grey.png";
import redMarker from "../.././assets/images/marker-icon-2x-red.png";
import violetMarker from "../.././assets/images/marker-icon-2x-violet.png";

function Legend() {
  const [isWide, setIsWide] = useState(window.innerWidth >= 684);

  useEffect(() => {
    const handleResize = () => {
      setIsWide(window.innerWidth >= 684);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  if (isWide) {
    return (
      <div className="legend" >
        <table>
          <tbody>
            <tr>
              <td style={{ backgroundColor: "#00e400", color: "#000000", padding: "0px 9px", borderTopLeftRadius: "15px", borderBottomLeftRadius: "15px" }}>Tốt</td>
              <td style={{ backgroundColor: "#ffff00", color: "#000000", padding: "0px 9px" }}>Trung bình</td>
              <td style={{ backgroundColor: "#ff7e00", color: "#000000", padding: "0px 9px" }}>Kém</td>
              <td style={{ backgroundColor: "gray", color: "#ffffff", padding: "0px 9px" }}>Xấu</td>
              <td style={{ backgroundColor: "#ff0000", color: "#ffffff", padding: "0px 9px" }}>Rất xấu</td>
              <td style={{ backgroundColor: "#7f00ff", color: "#ffffff", padding: "0px 9px", borderTopRightRadius: "15px", borderBottomRightRadius: "15px" }}>Nguy hiểm</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
  else {
    return (
      <div className="legend" >
        <table>
          <tbody style={{backgroundColor: "white"}}>
              <tr><td className="marker"><img src={greenMarker} alt=""></img></td><td style={{ backgroundColor: "#00e400", color: "#000000", padding: "0px 9px"}}>Tốt</td></tr>
              <tr><td className="marker"><img src={yellowMarker} alt=""></img></td><td style={{ backgroundColor: "#ffff00", color: "#000000", padding: "0px 9px" }}>Trung bình</td></tr>
              <tr><td className="marker"><img src={orangeMarker} alt=""></img></td><td style={{ backgroundColor: "#ff7e00", color: "#000000", padding: "0px 9px" }}>Kém</td></tr>
              <tr><td className="marker"><img src={greyMarker} alt=""></img></td><td style={{ backgroundColor: "gray", color: "#ffffff", padding: "0px 9px" }}>Xấu</td></tr>
              <tr><td className="marker"><img src={redMarker} alt=""></img></td><td style={{ backgroundColor: "#ff0000", color: "#ffffff", padding: "0px 9px" }}>Rất xấu</td></tr>
              <tr><td className="marker"><img src={violetMarker} alt=""></img></td><td style={{ backgroundColor: "#7f00ff", color: "#ffffff", padding: "0px 9px"}}>Nguy hiểm</td></tr>
          </tbody>
        </table>
      </div>

    );
  }
}
export default Legend;
