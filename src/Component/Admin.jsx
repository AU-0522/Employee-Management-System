import React, { useState, useEffect } from 'react';
import { Button, Navbar, Nav, Container, Row, Col, Card, Table, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Admin.css'; // Import the CSS file

const  Admin= ({ onLogout }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate(); // Hook for navigation

  useEffect(() => {
    axios.get('http://localhost:8082/addDashemp')
      .then(response => {
        setEmployees(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the employees!", error);
      });
  }, []);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const toggleStatus = (id) => {
    setEmployees(employees.map(emp =>
      emp.id === id ? { ...emp, isActive: !emp.isActive } : emp
    ));
  };

  const totalEmployees = employees.length;
  const activeEmployees = employees.filter(emp => emp.isActive).length;
  const activePercentage = ((activeEmployees / totalEmployees) * 100).toFixed(2);

  return (
    <div className="d-flex" style={{ minHeight: '100vh' }}>
      <div className="sidebar bg-dark text-white p-3" style={{ width: '250px' }}>
        <div className="d-flex flex-column align-items-center">
          <img
            src="admin.jpeg"
            alt="Admin"
            className="rounded-circle mb-2"
            style={{ width: '70px', height: '70px' }}
          />
          <p className="mt-1 mb-0" style={{ color: 'white' }}><b>Admin</b></p>
          <Button
            variant="link"
            onClick={toggleCollapse}
            className="mt-1"
            style={{
              width: '25px',
              height: '25px',
              borderRadius: '50%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#fff',
              color: '#000',
              border: '1px solid #ddd',
              padding: '0',
            }}
          >
            <FontAwesomeIcon icon={isCollapsed ? faMinus : faPlus} />
          </Button>
        </div>

        {isCollapsed && (
          <div className="menu mt-4">
            <div className="menu-item">
              <button className="btn btn-link text-white text-left" onClick={() => navigate('/employee-details')}>
                Employee Details
              </button>
            </div>
            <div className="menu-item">
              <button className="btn btn-link text-white text-left" onClick={() => navigate('/add-edit')}>
                Add Employee
              </button>
            </div>
            <div className="menu-item">
              <button className="btn btn-link text-white text-left" onClick={() => navigate('/leave')}>
                Leave Application
              </button>
            </div>
            <div className="menu-item">
              <button className="btn btn-link text-white text-left" onClick={() => navigate('/payroll')}>
                Payroll
              </button>
            </div>
            <div className="menu-item">
              <button className="btn btn-link text-white text-left" onClick={() => alert('Navigate to Report')}>
                Report
              </button>
            </div>
            <div className="menu-item">
              <button className="btn btn-link text-white text-left" onClick={() => alert('Navigate to Help')}>
                Help
              </button>
            </div>
          </div>
        )}
      </div>

      <div 
        className="flex-grow-1" 
        style={{ 
          backgroundImage: 'url("bg.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundColor: 'rgba(255, 255, 255, 0.5)',
          backgroundBlendMode: 'overlay',
          width:'100%'
        }}
      >
        <Navbar bg="light" expand="lg" className="mb-3">
          <Container fluid>
            <Form className="d-flex" style={{ width: '30%' }}>
              <Form.Control
                type="search"
                placeholder="Search..."
                className="me-2"
                aria-label="Search"
                value={searchQuery}
                onChange={handleSearch}
                style={{ flexGrow: 1 }}
              />
              <Button variant="outline-success">Search</Button>
            </Form>
            <Nav className="ml-auto">
            </Nav>
            <Button variant="danger" style={{width:'10%'}} onClick={onLogout}>Logout</Button>
          </Container>
        </Navbar>

        <Container fluid>
          <Row>
            <Col xs={6} sm={3} md={2}>
              <Card className="text-center" style={{ padding: '10px', marginBottom: '10px' }}>
                <Card.Body>
                  <Card.Title style={{ fontSize: '16px' }}>Employees</Card.Title>
                  <Card.Text style={{ fontSize: '20px', fontWeight: 'bold' }}>{totalEmployees}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col xs={6} sm={3} md={2}>
              <Card className="text-center" style={{ padding: '10px', marginBottom: '10px' }}>
                <Card.Body>
                  <Card.Title style={{ fontSize: '16px' }}>Active Percentage</Card.Title>
                  <Card.Text style={{ fontSize: '20px', fontWeight: 'bold' }}>{activePercentage}%</Card.Text>
                </Card.Body>
              </Card>
            </Col>

            <Col xs={12} md={8}>
              <Card>
                <Card.Header>
                  <h5>Employee DataTable</h5>
                </Card.Header>
                <Card.Body>
                  <Table striped bordered hover>
                    <thead>
                      <tr>
                        <th>SL</th>
                        <th>Name of Employee</th>
                        <th>Department</th>
                        <th>Status</th>
                        <th>Duration</th>
                      </tr>
                    </thead>
                    <tbody>
                      {employees.filter(emp => 
                        emp.name.toLowerCase().includes(searchQuery.toLowerCase())
                      ).map((employee, index) => (
                        <tr key={employee.id}>
                          <td>{index + 1}</td>
                          <td>{employee.name}</td>
                          <td>{employee.department}</td>
                          <td>
                            <Button
                              variant={employee.isActive ? 'success' : 'danger'}
                              onClick={() => toggleStatus(employee.id)}
                            >
                              {employee.isActive ? 'Active' : 'Inactive'}
                            </Button>
                          </td>
                          <td>{employee.duration}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default Admin;