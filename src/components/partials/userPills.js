import React, { useState, useEffect } from 'react';
import {
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsContent,
  MDBTabsPane
} from 'mdb-react-ui-kit';
import '../../assets/styles/userModal.css'
import UserDetails from './userDetails';
import { getUserAttendances } from '../../routes/attendnceRoute';
import { populateTable } from '../functions/tableFunctions';
import Table from './table';
import { getUserPerformances } from '../../routes/perfRoutes';

const UserPills = (user) => {
  const [basicActive, setBasicActive] = useState('tab1');
  const [userAttendances, setUserAttendances] = useState(null);
  const [userPerformances, setUserPerformances] = useState(null);

  useEffect(() => {
    const fetchUserAttendances = async () => {
      try {
        const data = await getUserAttendances(user.user.id);
        setUserAttendances(data); 
      } catch (error) {
        console.error('Error fetching user attendances:', error.message);
        setUserAttendances([]); 
      }
    };

    const fetchUserPerformances = async () => {
      try {
        const data = await getUserPerformances(user.user.id);
        setUserPerformances(data); 
      } catch (error) {
        console.error('Error fetching user attendances:', error.message);
        setUserPerformances([]); 
      }
    };

    fetchUserAttendances();
    fetchUserPerformances();
  }, []); 

  const handleBasicClick = (value) => {
    if (value === basicActive) {
      return;
    }

    setBasicActive(value);
  };

  const populateAttendance = () => {
    return populateTable(userAttendances);
  };

  const populatePerformance= () => {
    return populateTable(userPerformances);
  };

  return (
    <div className=''>
      <MDBTabs pills className=' ms-0'>
        <MDBTabsItem>
          <MDBTabsLink onClick={() => handleBasicClick('tab1')} active={basicActive === 'tab1'}>
            Details
          </MDBTabsLink>
        </MDBTabsItem>
        <MDBTabsItem>
          <MDBTabsLink onClick={() => handleBasicClick('tab2')} active={basicActive === 'tab2'}>
            Attendance
          </MDBTabsLink>
        </MDBTabsItem>
        <MDBTabsItem>
          <MDBTabsLink onClick={() => handleBasicClick('tab3')} active={basicActive === 'tab3'}>
            Performance
          </MDBTabsLink>
        </MDBTabsItem>
      </MDBTabs>

      <MDBTabsContent className='mytab p-3'>
        <MDBTabsPane open={basicActive === 'tab1'}>
            <UserDetails
                user = {user}
            />
        </MDBTabsPane>
        <MDBTabsPane open={basicActive === 'tab2'}>
          {userAttendances === null ? (
             <p>Loading attendances...</p>
           ) : userAttendances.length > 0 ? (
             <Table
               data={userAttendances}
               getDynamicColumns={populateAttendance}
               itemsPerPage={5}
               tableTitle={"Attendances"}
               noButton={true}
               noLabel={true}
             />
           ) : (
             <p>No attendances found.</p>
           )}
        </MDBTabsPane>
        <MDBTabsPane open={basicActive === 'tab3'}>
          {userPerformances === null ? (
             <p>Loading attendances...</p>
           ) : userPerformances.length > 0 ? (
             <Table
               data={userPerformances}
               getDynamicColumns={populatePerformance}
               itemsPerPage={5}
               tableTitle={"Attendances"}
               noButton={true}
               noLabel={true}
             />
           ) : (
             <p>No performances found.</p>
           )}
        </MDBTabsPane>
      </MDBTabsContent>
    </div>
  );
}

export default UserPills;