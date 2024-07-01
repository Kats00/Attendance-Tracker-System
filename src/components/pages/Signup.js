import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MDBInput, MDBBtn, MDBRow, MDBCol} from 'mdb-react-ui-kit'; // Import MDBAlert for displaying error messages
import { registerUser } from '../../routes/userRoute';

const Signup = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [position, setPosition] = useState('');
  const [department, setDepartment] = useState('');
  const [error, setError] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      console.log(username);
      const response = await registerUser({
        username,
        email,
        password,
        firstname,
        lastname,
        position,
        department
      });

      console.log('Registration successful:', response);

      // Redirect to login page after successful registration
      navigate('/');
    } catch (error) {
      console.error('Registration error:', error.message);
      setError(error.message);
    }
  };

  return (
    <div className="d-flex flex-column vh-100 justify-content-center align-items-center light-grey">
      <form className='p-3 shadow-3-strong rounded white' onSubmit={handleSignup}>
        {error && <div color='danger'>{error}</div>}

        <MDBInput
          className='mb-4'
          type='text'
          id='username'
          label='Username'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <MDBInput
          className='mb-4'
          type='email'
          id='email'
          label='Email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
        <MDBInput
          className='mb-4'
          type='text'
          id='firstname'
          label='First Name'
          value={firstname}
          onChange={(e) => setFirstname(e.target.value)}
          required
        />
        <MDBInput
          className='mb-4'
          type='text'
          id='lastname'
          label='Last Name'
          value={lastname}
          onChange={(e) => setLastname(e.target.value)}
          required
        />
        <MDBInput
          className='mb-4'
          type='text'
          id='position'
          label='Position'
          value={position}
          onChange={(e) => setPosition(e.target.value)}
          required
        />
        <MDBInput
          className='mb-4'
          type='text'
          id='department'
          label='Department'
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          required
        />

        <MDBRow className='mb-4'>
          <MDBCol>
            <a href='/'>Already have an account? Sign in</a>
          </MDBCol>
        </MDBRow>

        <MDBBtn type='submit' block disabled={!username || !email || !password || !firstname || !lastname || !position || !department}>
          Sign Up
        </MDBBtn>
      </form>
    </div>
  );
};

export default Signup;
