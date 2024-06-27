import React, { useState } from 'react';
import {
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsContent,
  MDBTabsPane
} from 'mdb-react-ui-kit';
import { populateTable } from '../functions/tableFunctions';
import { ARbuttonActions, LARbuttonActions } from '../functions/actions';
import Table from './table';

const LeaveTabs = ( {allPendingL, allLeaves}) => {
  const [basicActive, setBasicActive] = useState('tab1');

  const handleBasicClick = (value) => {
    if (value === basicActive) {
      return;
    }

    setBasicActive(value);
  };

  const getPendingLeaves = () => {
    return populateTable(allPendingL);
  }

  const getAllLeaves = () => {
    return populateTable(allLeaves);
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
            All Leaves
          </MDBTabsLink>
        </MDBTabsItem>
      </MDBTabs>

      <MDBTabsContent>
        <MDBTabsPane open={basicActive === 'tab1'}>
            <Table
              data={allPendingL}
              getDynamicColumns={getPendingLeaves}
              itemsPerPage={7}
              tableTitle={"Pending Leaves"}
              buttonActions={LARbuttonActions}
              noButton={true}
              rowClickable={false}
            />
        </MDBTabsPane>
        <MDBTabsPane open={basicActive === 'tab2'}>
            <Table
              data={allLeaves}
              getDynamicColumns={getAllLeaves}
              itemsPerPage={7}
              tableTitle={"All Leaves"}
              noButton={true}
              rowClickable={false}
            />
        </MDBTabsPane>
      </MDBTabsContent>
    </div>
  );
}

export default LeaveTabs;