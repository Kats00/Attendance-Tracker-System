import React, { useState } from 'react';
import {
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsContent,
  MDBTabsPane
} from 'mdb-react-ui-kit';
import { populateTable } from '../functions/tableFunctions';
import { ARbuttonActions } from '../functions/actions';
import Table from './table';

const AttendanceTabs = ( {allPendingA, toggleOpen, utoggleOpen, allAttendances}) => {
  const [basicActive, setBasicActive] = useState('tab1');

  const handleBasicClick = (value) => {
    if (value === basicActive) {
      return;
    }

    setBasicActive(value);
  };

  const getPendingAttendances = () => {
    return populateTable(allPendingA);
  }

  const getAllAttendances = () => {
    return populateTable(allAttendances);
  }


  return (
    <div className='d-flex flex-column w-100'>
      <MDBTabs className='mb-3'>
        <MDBTabsItem>
          <MDBTabsLink onClick={() => handleBasicClick('tab1')} active={basicActive === 'tab1'}>
            Pending
          </MDBTabsLink>
        </MDBTabsItem>
        <MDBTabsItem>
          <MDBTabsLink onClick={() => handleBasicClick('tab2')} active={basicActive === 'tab2'}>
            All Attendance
          </MDBTabsLink>
        </MDBTabsItem>
      </MDBTabs>

      <MDBTabsContent>
        <MDBTabsPane open={basicActive === 'tab1'}>
            <Table
              data={allPendingA}
              getDynamicColumns={getPendingAttendances}
              itemsPerPage={7}
              tableTitle={"Pending Attendances"}
              toggleOpen={toggleOpen}
              uToggleOpen={utoggleOpen}
              buttonActions={ARbuttonActions}
              noButton={true}
            />
        </MDBTabsPane>
        <MDBTabsPane open={basicActive === 'tab2'}>
            <Table
              data={allAttendances}
              getDynamicColumns={getAllAttendances}
              itemsPerPage={7}
              tableTitle={"Attendances"}
              toggleOpen={toggleOpen}
              uToggleOpen={utoggleOpen}
              noButton={true}
            />
        </MDBTabsPane>
      </MDBTabsContent>
    </div>
  );
}

export default AttendanceTabs;