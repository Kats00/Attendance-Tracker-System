import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MDBInput, MDBBtn, MDBRow, MDBCol } from 'mdb-react-ui-kit';
import { login } from '../../routes/userRoute'; // Assuming login function is correctly imported

const Login = ({ onLogin }) => {
  const [usernameOrEmail, setUsernameOrEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      await login(usernameOrEmail, password, onLogin, navigate);
    } catch (error) {
      console.error('Login failed:', error.message); 
    }
  };
  

  return (
    <div className="d-flex flex-column vh-100 justify-content-center align-items-center light-grey">
      <form className='p-3 shadow-3-strong rounded white' onSubmit={handleSubmit}>
        <MDBInput
          className='mb-4'
          type='text'
          id='usernameOrEmail'
          label='Username or Email'
          value={usernameOrEmail}
          onChange={(e) => setUsernameOrEmail(e.target.value)}
          required
        />
        <MDBInput
          className='mb-4'
          type='password'
          id='password'
          label='Password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <MDBRow className='mb-4'>
          <MDBCol>
            <a href='/signup'>Sign Up</a>
          </MDBCol>
        </MDBRow>

        <MDBBtn type='submit' block>
          Sign in
        </MDBBtn>
      </form>
    </div>
  );
};

export default Login;
