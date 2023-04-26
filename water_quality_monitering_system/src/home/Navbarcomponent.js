import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import "./Navbarcomponent.css";
function Navbarcomponent() {

  return (
    <Navbar
      className="navbar"
      bg="dark"
      expand="lg"
      variant="dark"
      sticky="top"
    >
      <Container className="navbar_inner">
        <Navbar.Brand className="navbar_brand">
          Water Quality Monitoring System
        </Navbar.Brand>
        {/* <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#link">Link</Nav.Link>
          </Nav>
        </Navbar.Collapse> */}

        <img
          className="navbar_image"
          src="https://thumbs.dreamstime.com/b/hand-drops-water-logo-raindrops-blue-76212740.jpg"
          alt=""
        />
      </Container>
    </Navbar>
  );
}

export default Navbarcomponent;
