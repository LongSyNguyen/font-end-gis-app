// Modules
import "./HomeNav.scss";

// Libaries
import { Form, Button } from "react-bootstrap";
import { BsSearch, BsTextCenter, BsXLg } from "react-icons/bs";
import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";

function HomeNav() {
  const [toggleMenu, setToggleMenu] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  const toggleNav = () => {
    setToggleMenu(!toggleMenu);
  };

  // Control when screen resize
  useEffect(() => {
    const changeWidth = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener("resize", changeWidth);

    return () => {
      window.removeEventListener("resize", changeWidth);
    };
  }, []);

  const menuData = [
    {
      path: "/",
      name: "TRANG CHỦ",
    },
    {
      path: "/map",
      name: "BẢN ĐỒ",
    },
    {
      path: "/news",
      name: "BẢN TIN",
    },
    {
      path: "/contact",
      name: "LIÊN HỆ",
    },
  ];

  return (
    <nav className="Navbar">
      <NavLink className="Navbar-logo">HUMG - IT</NavLink>
      {(toggleMenu || screenWidth > 800) && (
      <div className="Navbar-items">
        <BsXLg className={"Navbar-items-toggle-close"} onClick={toggleNav} />
        {menuData.map((item) => (
          <NavLink to={item.path} key={item.name}>
            {item.name}
          </NavLink>
        ))}
      </div>
      )}
      <Form className="d-flex Navbar-search_form">
        <Form.Control
          type="search"
          placeholder="Search"
          className="me-2"
          aria-label="Search"
        />
        <Button variant="outline-success">
          <BsSearch />
        </Button>
      </Form>
      <BsTextCenter className="Navbar-items-toggle-open" onClick={toggleNav} />
    </nav>
  );
}

export default HomeNav;
