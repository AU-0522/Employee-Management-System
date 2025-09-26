import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

import Login from './Component/Login';
import AddEmp from './Component/AddEmp';
import LeaveNew from './Component/LeaveNew';
import EmployeeDetails from './Component/EmployeeDetails';
import SubAdmin from './Component/SubAdmin';
import Admin from './Component/Admin';
import Attendance from './Component/Attendance';
import Payroll from './Component/Payroll';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Admin />} />
        <Route path="/add-emp" element={<AddEmp />} />
        <Route path="/leave" element={<LeaveNew />} />
        <Route path="/payroll" element={<Payroll/>} />
        <Route path="/employee-details" element={<EmployeeDetails />} />
        <Route path="/subadmin" element={<SubAdmin />} />
        {/* Add additional routes here */}
      </Routes>
    </Router>
    // <Attendance/>
  );
}

export default App;
