import {
  Navbar,
  NavbarBrand,
  NavbarToggler,
  Collapse,
  Nav,
  NavItem,
} from "reactstrap";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useState } from "react";
import "../Navbar/nav.css";
import { isAuthenticated, signOut } from "../../utils/auth";
const ResponsiveAppBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  return (
    <div>
      {/* <Navbar color="dark" dark>
        <NavbarBrand className="me-auto">
          NSL
        </NavbarBrand>
        <NavbarToggler className="me-2" onClick={() => { setIsOpen(!isOpen) }}  />
        <Collapse isOpen={isOpen} navbar>
          <Nav navbar>{isAuthenticated && (<>
          
            <NavItem>
              <Link style={{"cursor": "pointer", "color": "white"}} to={"/home"}  >Home</Link>
            </NavItem>
            <NavItem>
              <span style={{"cursor": "pointer", "color": "white"}}  onClick={()=> signOut(()=> {
                navigate("/");
              })}>Logout</span>
            </NavItem>
          </>)}
          </Nav>
        </Collapse>
      </Navbar> */}
      <nav className="navbar navbar-expand-md navbar-dark bg-dark ">
        <div className="container-fluid">
          <Link className="navbar-brand logo-font" to="/">
            NSL
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav nav ">
              {isAuthenticated() && (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/home">
                      <span className="font-weight-bolder">Home</span>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/addproject">
                      <span className="font-weight-bolder">Add Project</span>
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link className="nav-link" to="/profile">
                      <span className="font-weight-bolder">Profile</span>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <span
                    style={{cursor : "pointer"}}
                      className="nav-link "
                      onClick={() =>
                        signOut(() => {
                          navigate("/");
                        })
                      }
                    >
                      <span className="font-weight-bolder">Log Out</span>
                    </span>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};
export default ResponsiveAppBar;
