import React, { useState, useEffect } from 'react';
import Table from '../partials/table';
import {
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsContent,
  MDBTabsPane,
  MDBRow,
  MDBCol,
} from 'mdb-react-ui-kit';

import { addAttendance, getUserAttendances } from '../../routes/attendnceRoute';
import { populateTable } from '../functions/tableFunctions';
import { useCentredModalState, useLeaveModalState } from '../functions/modalHook';
import Modal from './modal';
import { addAttendanceContent, addLeaveContent } from '../functions/contents';
import ItemModal from './itemModal';
import {useULeaveModalState, useUserModalState} from '../functions/userModalHook';
import { addLeave, getUserLeaves } from '../../routes/leaveRoute';
import UserModal from './userModal';
import EditLeaveModal from './editLeaveModal';

const EmployeePartial = () => {
    const [verticalActive, setVerticalActive] = useState('tab1');
    const [userAttendances, setUserAttendances] = useState(null); 
    const [userLeaves, setUserLeaves] = useState(null); 
    const { centredModal, setCentredModal, toggleOpen } = useCentredModalState();
    const { leaveModal, setLeaveModal, toggleLeaveModal } = useLeaveModalState();
    const { uLeaveModal, uSetLeaveModal, uToggleLeaveModal, leaveData } = useULeaveModalState();
    const { uCentredModal, uSetCentredModal, utoggleOpen, selectedData } = useUserModalState();
    const [userId, setUserId] = useState(null);

    const handleAdd = (data) => {
        console.log('New data:', data);
        addAttendance(data, localStorage.getItem('userid'));
    };

    const handleAddLeave = (data) => {
        console.log('New data:', data);
        addLeave(data, localStorage.getItem('userid'));
    };
      
    useEffect(() => {
      const fetchUserAttendances = async () => {
        try {
          const data = await getUserAttendances(localStorage.getItem('userid'));
          setUserAttendances(data); 
        } catch (error) {
          console.error('Error fetching user attendances:', error.message);
          setUserAttendances([]); 
        }
      };

      const fetchUserLeaves = async () => {
        try {
          const data = await getUserLeaves(localStorage.getItem('userid'));
          setUserLeaves(data); 
        } catch (error) {
          console.error('Error fetching user leaves:', error.message);
          setUserLeaves([]); 
        }
      };

      setUserId(localStorage.getItem('userid'));
  
      fetchUserAttendances();
      fetchUserLeaves();
    }, []); 
  
    const handleVerticalClick = (value) => {
      if (value === verticalActive) {
        return;
      }
      setVerticalActive(value);
    };
  
    const populateAttendance = () => {
      return populateTable(userAttendances);
    };

    const populateLeaves = () => {
        return populateTable(userLeaves);
      };
    
  
    return (
      <MDBRow className='no-wrap d-flex vw-100 p-0 m-0'>
        <MDBCol size='2' className='d-flex flex-column vh-100 border-end mx-0 px-0 align-items-center'>
          <MDBTabs className='flex-column w-100 text-center p-1'>
            <MDBTabsItem>
              <MDBTabsLink className='py-2' onClick={() => handleVerticalClick('tab1')} active={verticalActive === 'tab1'}>
                Attendance
              </MDBTabsLink>
            </MDBTabsItem>
            <MDBTabsItem>
              <MDBTabsLink className='py-2' onClick={() => handleVerticalClick('tab2')} active={verticalActive === 'tab2'}>
                Leave
              </MDBTabsLink>
            </MDBTabsItem>
          </MDBTabs>
        </MDBCol>
        <MDBCol size='10' className='d-flex flex-column mx-0 p-0 overflow-hidden'>
          <MDBTabsContent className='row g-0 d-flex w-100 flex-fill no-wrap overflow-hidden p-3'>
            <MDBTabsPane open={verticalActive === 'tab1'} className='overflow-auto flex-column'>
              <div className='w-100'>
                {userAttendances === null ? (
                  <p>Loading attendances...</p>
                ) : userAttendances.length >= 0 ? (
                  <Table
                    data={userAttendances}
                    getDynamicColumns={populateAttendance}
                    itemsPerPage={7}
                    tableTitle={"Attendances"}
                    toggleOpen={toggleOpen}
                    uToggleOpen={utoggleOpen}
                    rowClickable={true}
                  />
                ) : (
                  <p>No attendances found.</p>
                )}
              </div>
            </MDBTabsPane>
  
            <MDBTabsPane open={verticalActive === 'tab2'}>
                <div className='w-100'>
                    {userLeaves === null ? (
                        <p>Loading user leaves...</p>
                        ) : userLeaves.length >= 0  ? (
                            <Table
                                data={userLeaves}
                                getDynamicColumns={populateLeaves}
                                itemsPerPage={7}
                                tableTitle={"Leaves"}
                                rowClickable={true}
                                toggleOpen={toggleLeaveModal}
                                uToggleOpen={uToggleLeaveModal}
                            />
                        ) : (
                        <p>Loadng Table</p>
                    )}
                </div>
            </MDBTabsPane>
          </MDBTabsContent>
        </MDBCol>
        <Modal
            centredModal={centredModal}
            toggleOpen={toggleOpen}
            setCentredModal={setCentredModal}
            title="Add Attendance"
            content={addAttendanceContent}
            onSave={handleAdd}
        />
        <Modal
            centredModal={leaveModal}
            toggleOpen={toggleLeaveModal}
            setCentredModal={setLeaveModal}
            title="File a Leave"
            content={addLeaveContent}
            onSave={handleAddLeave}
        />
        <EditLeaveModal
            iCentredModal={uLeaveModal}
            iSetCentredModal={uSetLeaveModal}
            ititle="Edit Item" 
            item={leaveData}
            userId={userId}
            currentId={userId}
        />
        <ItemModal
            iCentredModal={uCentredModal}
            iSetCentredModal={uSetCentredModal}
            ititle="Edit Item" 
            item={selectedData}
            userId={userId}
            currentId={userId}
        />
      </MDBRow>
    );
  }
  
  export default EmployeePartial;

