import React, { useState } from 'react';
import Table from '../partials/table';
import {
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsContent,
  MDBTabsPane,
  MDBRow,
  MDBCol,
  MDBBtn
} from 'mdb-react-ui-kit';
import { populateTable } from '../functions/tableFunctions';
import { useCentredModalState } from '../functions/modalHook';
import {useUserModalState} from '../functions/userModalHook';
import Modal from './modal';
import UserModal from './userModal';
import { addUserContent } from '../functions/contents';
import { addUser } from '../../routes/userRoute';
import { ARbuttonActions } from '../functions/actions';
import AttendanceTabs from './attendanceTabs';
import { all } from 'axios';
import LeaveTabs from './leaveTabs';

const AdminPartial = ({ allUsers, allPendingA, allAttendances, allPendingL, allLeaves }) => {
  const [verticalActive, setVerticalActive] = useState('tab1');
  const { centredModal, setCentredModal, toggleOpen } = useCentredModalState();
  const { uCentredModal, uSetCentredModal, utoggleOpen, selectedData } = useUserModalState();

  const handleVerticalClick = (value) => {
    if (value === verticalActive) {
      return;
    }
    setVerticalActive(value);
  };

  const getUserData = () => {
    return populateTable(allUsers);
  }

  const handleAddUser = (data) => {
    console.log('New data:', data);
    addUser(data);
  };


  return (
    <MDBRow className='no-wrap d-flex vw-100 p-0 m-0'>
      <MDBCol size='2' className='d-flex flex-column vh-100 border-end mx-0 px-0 align-items-center'>
        <MDBTabs className='flex-column w-100 text-center p-1'>
          <MDBTabsItem>
            <MDBTabsLink className='py-2' onClick={() => handleVerticalClick('tab1')} active={verticalActive === 'tab1'}>
              All Users
            </MDBTabsLink>
          </MDBTabsItem>
          <MDBTabsItem>
            <MDBTabsLink className='py-2' onClick={() => handleVerticalClick('tab2')} active={verticalActive === 'tab2'}>
              Attendances
            </MDBTabsLink>
          </MDBTabsItem>
          <MDBTabsItem>
            <MDBTabsLink className='py-2' onClick={() => handleVerticalClick('tab3')} active={verticalActive === 'tab3'}>
              Leaves
            </MDBTabsLink>
          </MDBTabsItem>
        </MDBTabs>
      </MDBCol>
      <MDBCol size='10' className='d-flex flex-column mx-0 p-0 overflow-hidden'>
        <MDBTabsContent className='row g-0 d-flex w-100 flex-fill no-wrap overflow-hidden p-3'>
          <MDBTabsPane open={verticalActive === 'tab1'} className='overflow-auto flex-column'>
            <div>
                <Table
                  data={allUsers}
                  getDynamicColumns={getUserData}
                  itemsPerPage={7}
                  tableTitle={"Users"}
                  toggleOpen={toggleOpen}
                  uToggleOpen={utoggleOpen}
                  rowClickable={true}
                />
            </div>
            {allUsers.length === 0 && <p>Loading users...</p>}
          </MDBTabsPane>
          <MDBTabsPane open={verticalActive === 'tab2'}>
            <AttendanceTabs
              utoggleOpen={utoggleOpen}
              allPendingA={allPendingA}
              toggleOpen={toggleOpen}
              allAttendances={allAttendances}
            />
          </MDBTabsPane>
          <MDBTabsPane open={verticalActive === 'tab3'}>
          <LeaveTabs
              utoggleOpen={utoggleOpen}
              allPendingL={allPendingL}
              toggleOpen={toggleOpen}
              allLeaves={allLeaves}
            />
          </MDBTabsPane>
        </MDBTabsContent>
      </MDBCol>
      <Modal
        centredModal={centredModal}
        toggleOpen={toggleOpen}
        setCentredModal={setCentredModal}
        title="Add New User"
        content={addUserContent}
        onSave={handleAddUser}
      />
      <UserModal
        uCentredModal={uCentredModal}
        uSetCentredModal={uSetCentredModal}
        utoggleOpen={utoggleOpen}
        utitle="View User"
        userData={selectedData}
      />
    </MDBRow>
  );
}

export default AdminPartial;
