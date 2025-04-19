import { Nav, Offcanvas } from 'react-bootstrap';
import { Link, Links, useLocation } from 'react-router';
import { useState, useEffect } from 'react';

const SideBar = () => {
  const [show, setShow] = useState(false);
  const location = useLocation();

  // Close Offcanvas when route changes (for small screens only)
  useEffect(() => {
    setShow(false);
  }, [location.pathname]);

  const toggleSidebar = () => setShow(!show);

  return (
    <>
      <div className="d-md-none bg-success p-2 z-3 shadow-sm">
        <button className="btn btn-outline-light" onClick={toggleSidebar}>
          ☰ Menu
        </button>
      </div>

      <Offcanvas show={show} onHide={toggleSidebar} className="bg-dark text-white">
        <Offcanvas.Header closeButton closeVariant="white">
          <Offcanvas.Title>Dashboard</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Nav className="flex-column">
            <Nav.Link as={Link} to="/admin/dashboard/add-ads" className="text-white">
              Add Ads
            </Nav.Link>
            <Nav.Link as={Link} to="/admin/dashboard/show-ads" className="text-white">
              Show All Ads
            </Nav.Link>
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>

      <div className="d-none d-md-block h-100 bg-success z-3 text-white p-3 position-fixed vh-100" style={{ width: '220px' }}>
        <h5 className="mb-4" >
          <Link to="/"  style={{textTransform:'capitalize' , textDecoration:"none" , color: "#ffff" , border: "1px solid #fff" , borderRadius:"10px" , padding: "6px 4px"}}>
          to home
          </Link>
        </h5>
        <Nav className="flex-column">
          <Nav.Link as={Link} to="/admin/dashboard/add-ads" className="text-white">
            Add Ads
          </Nav.Link>
          <Nav.Link as={Link} to="/admin/dashboard/show-ads" className="text-white">
            Show All Ads
          </Nav.Link>
        </Nav>
      </div>
    </>
  );
};

export default SideBar;
