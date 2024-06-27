import React, { useState } from 'react';
import { MDBTable, MDBTableHead, MDBTableBody, MDBIcon, MDBBtn } from 'mdb-react-ui-kit';
import Pagination from './pagination'; // Adjust the import path as per your project structure
import '../../assets/styles/style.css';
import { actionIcons } from '../functions/actions';

const Table = ({ data, getDynamicColumns, buttonActions, itemsPerPage, tableTitle, toggleOpen, uToggleOpen, noButton, rowClickable, noLabel }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1); 
  };

  const filteredData = data.filter((item) =>
    Object.values(item).some((value) =>
      typeof value === 'string' && value.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const dynamicColumns = data.length > 0 ? getDynamicColumns(filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)) : [];
  const paginatedData = data.length > 0 ? filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage) : [];

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleRowClick = (item) => {
    if (rowClickable){
      uToggleOpen(item);
    }
  }

  return (
    <div className='d-flex flex-column overflow-hidden border rounded h-fit-content w-100 white'>
      <div className='d-flex justify-content-between border-bottom p-2 flex-wrap'>
        { !noLabel && 
          <div className='d-flex mb-0 h3'>{tableTitle}</div>
        }
        <div className='d-flex align-items-center'>
          <form className='d-flex input-group w-auto'>
            <input
              type='search'
              className='form-control'
              placeholder='Type query'
              aria-label='Search'
              value={searchQuery}
              onChange={handleSearchInputChange}
            />
          </form>
          { !noButton && 
            <MDBBtn onClick={toggleOpen}>Add</MDBBtn>
          }
        </div>
      </div>
      {data.length > 0 ? (
        <div className='d-flex overflow-auto'>
          <MDBTable>
            <MDBTableHead dark>
              <tr>
                {dynamicColumns.map((column) => (
                  <th key={column.key} scope='col'>
                    {column.label}
                  </th>
                ))}
                {buttonActions && <th>Actions</th>}
              </tr>
            </MDBTableHead>
            <MDBTableBody className='overflow-y-auto'>
              {paginatedData.map((item, index) => (
                <tr key={index}>
                  {dynamicColumns.map((column) => (
                    <td key={column.key} onClick={() => handleRowClick(item)} className='pe-auto'>
                      {item[column.key]}
                    </td>
                  ))}
                  {buttonActions && (
                    <td>
                      <div className='actions d-flex flex-row justify-content-center gap-1'>
                        {Object.keys(buttonActions).map((actionName) => (
                          <MDBBtn
                            key={actionName}
                            color='primary'
                            onClick={() => buttonActions[actionName](item)}
                          >
                            {console.log(item)}
                            <MDBIcon fas icon={actionIcons[actionName]} />
                          </MDBBtn>
                        ))}
                      </div>
                    </td>
                  )}
                </tr>
              ))}
            </MDBTableBody>
          </MDBTable>
        </div>
      ) : (
        <div className='d-flex align-items-center justify-content-center'>
          <p>No items</p>
        </div>
      )}
      {data.length > 0 && (
        <div className='d-flex align-items-center justify-content-center'>
          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
        </div>
      )}
    </div>
  );
};

export default Table;

