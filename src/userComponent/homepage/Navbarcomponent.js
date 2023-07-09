import React from 'react'
import {Navbar,Nav,NavDropdown,Form,FormControl,Container} from 'react-bootstrap'
import {
    BrowserRouter as Router,
    Switch,
    Routes,
    Route,
    Link,Outlet
  } from "react-router-dom";
import Viewpost from '../postcomponent/Viewpost';
import Createpost from '../postcomponent/Createpost';
  
const Navbarcomponent = () => {

  const removedata=()=>{
    localStorage.removeItem('AUTH');
    localStorage.removeItem('USERNAME');

  }

  return (
    <>
        <div>
    <div>
    <Navbar bg ='dark' variant={'dark'} expand="lg" className="">
      <Container >
        <Navbar.Brand >Post APP</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to={"/post/view"}>VIEW</Nav.Link>
            <Nav.Link as={Link} to={"/post/create"}>CREATE</Nav.Link>
            <Nav.Link as={Link} to={"/login"} onClick={removedata}>LOGOUT</Nav.Link>

          </Nav>
        </Navbar.Collapse>
      </Container>

    </Navbar>
    <Outlet/>

    </div>
    <div>
        {/* <Routes>
          <Route path="/view" element={<Viewpost />} />
          <Route path="/create" element={<Createpost />} />
        </Routes>  */}
    </div>
    </div>
    </>
  )
}

export default Navbarcomponent