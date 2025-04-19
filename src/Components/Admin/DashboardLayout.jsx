import SideBar from './SideBar';
import TopBar from './TopBar';
import { Outlet } from 'react-router'; // لاحظ: react-router-dom وليس react-router

const DashboardLayout = () => {
  return (
    <div className="d-flex " style={{ height: "100vh" }}>
      {/* Sidebar */}
      <SideBar />

      {/* Main content area */}
      <div className="flex-grow-1 d-flex flex-column" style={{ marginLeft: '0' }}>
        {/* TopBar */}
        <div className="position-fixed top-0 start-0 end-0 z-0" >
          <TopBar />
        </div>

        {/* Main page content */}
        <div
          className="p-3"
          style={{
            marginLeft: '220px',    // Push content to the right of sidebar
            marginTop: '56px',      // Push content below Topbar
            overflowY: 'auto',
            height: 'calc(100vh - 56px)', // Full height minus Topbar
          }}
        >
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
