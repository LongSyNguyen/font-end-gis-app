import {BsTextCenter, BsSearch} from "react-icons/bs";
import { NavLink } from "react-router-dom";

import "./MapNav.scss";

function MapNav() {
    const menuData = [
    {
      path: "/",
      name: "Trang chủ",
    },
    {
      path: "/news",
      name: "Bản tin",
    },
    {
      path: "/contact",
      name: "Liên hệ",
    },
  ];

  return (
   <>
      <div className="MapNav">
        <div className="Navbar-items-left">
          <BsTextCenter className="Navbar-items-toggle-open"/>
        </div>
        <div className="Navbar-items-center">
          <BsSearch className="search-input-icon"/>
          <input
            placeholder="Nhập tên vị trí..."
            spellCheck={false}
          />
          <button>TÌM KIẾM</button>
        </div>
        <div className="Navbar-items-right">
          {menuData.map((item) => (
            <NavLink to={item.path} key={item.name}>
              {item.name}
            </NavLink>
          ))}
        </div>
      </div>
   </>
  );
}

export default MapNav;
