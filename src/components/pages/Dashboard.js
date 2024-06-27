import React, { useState, useEffect } from 'react';
import Navbar from '../partials/navbar';
import "../../assets/styles/style.css";
import "../../assets/styles/dashboard.css";
import "../../assets/styles/tabs.css";
import { getAllUsersData, getUserById } from '../../routes/userRoute';
import AdminPartial from '../partials/admin';
import EmployeePartial from '../partials/employee';
import { getAllPendingAttendance, getAttendances } from '../../routes/attendnceRoute';
import { getAllPendingLeaves, getLeaves } from '../../routes/leaveRoute';


const Dashboard = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [allPendingA, setAllPendingA] = useState([]);
  const [allPendingL, setAllPendingL] = useState([]);
  const [allAttendances, setallAttendances] = useState([]);
  const [allLeaves, setallLeaves] = useState([]);
  const role = localStorage.getItem('role');

  useEffect(() => {
    if (role === 'Admin') {
      getAllUsersData().then(result => {
        //console.log(result); 
        setAllUsers(result);
      }).catch(error => {
        console.error('Error:', error); 
      });
      
      getAllPendingAttendance().then(result => {
        setAllPendingA(result);
        //console.log(allPendingA);
      }).catch(error => {
        console.error('Error:', error); 
      });

      getAttendances().then(result => {
        setallAttendances(result);
        //console.log(allAttendances);
      }).catch(error => {
        console.error('Error:', error); 
      });

      getAllPendingLeaves().then(result => {
        setAllPendingL(result);
        //console.log(allPendingL);
      }).catch(error => {
        console.error('Error:', error); 
      });

      getLeaves().then(result => {
        setallLeaves(result);
        //console.log(allLeaves);
      }).catch(error => {
        console.error('Error:', error); 
      });
    } 
  }, [role]);


  return (
    <div className='vh-100 overflow-hidden d-flex flex-column'>
      <Navbar className="sticky-top" />
      {role === 'Admin' ? (
        <AdminPartial 
          allUsers={allUsers}
          allPendingA={allPendingA}
          allAttendances={allAttendances}
          allPendingL={allPendingL}
          allLeaves={allLeaves}
        />
      ) : (
        <EmployeePartial
        />
      )}
    </div>
  );
};

export default Dashboard;
