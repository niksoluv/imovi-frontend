import { Button, Col, Container, Form, FormControl, Nav, Navbar, NavDropdown, Row } from "react-bootstrap"
import { ReactSVG } from "react-svg"
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../storeAsyncActions/account";

const Header = () => {

  const dispatch = useDispatch()

  const userData = useSelector((state) => {
    return state.userInfo.userData
  })

  return (
    <Navbar bg="light" expand="lg">
      <Container fluid>
        <Navbar.Brand href="#">
          <ReactSVG
            beforeInjection={(svg) => {
              svg.classList.add('svg-class-name')
              svg.setAttribute('style', 'width: 100px; height: 40px')
            }}
            src={process.env.PUBLIC_URL + "/imoviIcon.svg"} />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link>
              <NavLink to={{ pathname: '/' }} style={{ textDecoration: 'none', color: 'grey' }}>Trending</NavLink>
            </Nav.Link>
            <Nav.Link href="#action2">Link</Nav.Link>
            <NavDropdown title="Link" id="navbarScrollingDropdown">
              <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action4">Another action</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action5">
                Something else here
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="#" disabled>
              Link
            </Nav.Link>
          </Nav>
          <Form className="d-flex">
            <FormControl
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success">Search</Button>
            {userData?.id ?
              <>
                <Nav.Link href="#" disabled>{userData.username}</Nav.Link>
                <Button as={Row} onClick={() => logout(dispatch)} variant="secondary"
                  className="mx-2">logout</Button>
              </>
              :
              <>
                <NavLink as={Col} to={{ pathname: '/login' }}>
                  <Button as={Col} variant="secondary" className="mx-2">login</Button>
                </NavLink>
              </>}
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
export default Header