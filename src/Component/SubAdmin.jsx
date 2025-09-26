import React, { useState } from 'react';
import axios from 'axios';
import { Button, Navbar, Form, Container, Nav } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faPlus, faMinus, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import './SubAdmin.css'; // Import the CSS file

const SubAdmin = ({ onLogout }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isCollapsed, setIsCollapsed] = useState(false); // Fixing the collapse state

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed); // Toggle collapse state
  };

  const fetchAttendance = async () => {
    try {
      const response = await axios.get('/api/attendance', {
        params: {
          query: searchQuery,
        },
      });
      console.log('Attendance Data:', response.data);
      // Handle the response data here, e.g., set state or navigate
    } catch (error) {
      console.error('Error fetching attendance data:', error);
    }
  };

  const handleAddEmployee = async () => {
    try {
      const response = await axios.post('/api/employees', {
        // Add your employee data here
        name: 'New Employee',
        position: 'Developer',
      });
      console.log('Employee Added:', response.data);
      // Handle the response data here, e.g., update UI or state
    } catch (error) {
      console.error('Error adding employee:', error);
    }
  };

  return (
    <div className="d-flex subadmin-container">
      {/* Sidebar */}
      <div className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
        <div className="d-flex flex-column align-items-center">
          <img
            src="admin.jpeg"
            alt="Sub-Admin"
            className="rounded-circle mb-2"
          />
          <p className="mt-1 mb-0"><b>Sub-Admin</b></p>
          <Button
            variant="link"
            onClick={toggleCollapse}
            className="collapse-button"
          >
            <FontAwesomeIcon icon={isCollapsed ? faMinus : faPlus} />
          </Button>
        </div>

        {/* Collapsible Menu Items */}
        {isCollapsed && (
          <div className="menu mt-4">
            <div className="menu-item">
              <button className="btn btn-link text-white text-left" onClick={fetchAttendance}>
                Show Attendance
              </button>
            </div>
            <div className="menu-item">
              <button className="btn btn-link text-white text-left" onClick={() => alert('Navigate to Add/Edit Attendance')}>
                Add Attendance
              </button>
            </div>
            <div className="menu-item">
              <button className="btn btn-link text-white text-left" onClick={handleAddEmployee}>
                Add Employee
              </button>
            </div>
            <div className="menu-item">
              <button className="btn btn-link text-white text-left" onClick={() => alert('Navigate to Leave Management')}>
                Leave Management
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Main Content Area */}
      <div className="main-content">
        {/* Top Navigation Bar */}
        <Navbar bg="light" expand="lg" className="mb-3">
          <Container fluid>
            <Form className="d-flex search-form">
              <Form.Control
                type="search"
                placeholder="Search..."
                className="me-2"
                aria-label="Search"
                value={searchQuery}
                onChange={handleSearch}
              />
              <Button variant="outline-success" className="search-button" onClick={fetchAttendance}>Search</Button>
            </Form>
            <Nav className="ml-auto">
              {/* Add any additional Nav items here */}
            </Nav>
            <Button variant="danger" onClick={onLogout} className="logout-button">Logout</Button>
          </Container>
        </Navbar>

        {/* Main content goes here */}
        <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
          <div className="text-center">
            <h2>Welcome, Sub-Admin</h2>
            <p>Use the sidebar to navigate through the system.</p>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default SubAdmin;
