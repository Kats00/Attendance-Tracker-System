import React from 'react';
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,
  MDBIcon,
  MDBNavbarLink,
  MDBDropdownItem,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
} from 'mdb-react-ui-kit';
import '../../assets/styles/navbar.css';
import '../../assets/styles/style.css';
import { useNavigate, Link } from 'react-router-dom';

export default function App() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token'); 
    localStorage.removeItem('role');
    navigate('/');
  };

  const handleProfile = () => {
    navigate('/profile');
  };

  return (
    <>
      <MDBNavbar light bgColor='light shadow-0 border'>
        <MDBContainer fluid className='flex-row'>
          <div className='d-flex'>
            <MDBNavbarBrand href='#'>Attendance Tracker</MDBNavbarBrand>
            <MDBNavbarLink aria-current='page' className='w-fit-content' color='bg-light' href='/dashboard'>
              <Link to="/dashboard">DASHBOARD</Link>
            </MDBNavbarLink>
          </div>

          <div className='d-flex flex-row gap-medium'>

            <MDBDropdown>
              <MDBDropdownToggle tag='a' className='nav-link'>
                <MDBIcon fas icon='user-alt' />
              </MDBDropdownToggle>
              <MDBDropdownMenu className='border shadow-2-strong'>
                <MDBDropdownItem onClick={handleProfile} className='cursor-pointer p-2'>Profile</MDBDropdownItem>
                <MDBDropdownItem onClick={handleLogout} className='border-bottom cursor-pointer p-2'>Logout</MDBDropdownItem>
              </MDBDropdownMenu>
            </MDBDropdown>
          </div>

        </MDBContainer>
      </MDBNavbar>
    </>
  );
}
