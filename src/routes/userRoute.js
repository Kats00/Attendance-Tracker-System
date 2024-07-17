import axios from 'axios';
import User from '../models/user';

const login = async (usernameOrEmail, password, onLogin, navigate) => {
  try {
    const response = await axios.post('https://attendance-tracker-system-api.onrender.com/api/login', {
      usernameOrEmail,
      password
    });

    const { token, user } = response.data; 

    localStorage.setItem('token', token);
    localStorage.setItem('role',  JSON.stringify(user.role));
    localStorage.setItem('userid', JSON.stringify(user.id));


    onLogin(token, user.role, user.id);
    navigate('/dashboard');
  } catch (error) {
    throw new Error(error.response.data.message); // Throw error to be caught in handleSubmit
  }
};

const registerUser = async (userData) => {
    try {
        const newUser = new User();
        newUser.setUsername(userData.username);
        newUser.setEmail(userData.email);
        newUser.setPassword(userData.password);
        newUser.setFirstname(userData.firstname);
        newUser.setLastname(userData.lastname);
        newUser.setPosition(userData.position);
        newUser.setDepartment(userData.department);

        console.log(userData.username);
  
        const response = await axios.post('https://attendance-tracker-system-api.onrender.com/api/register', newUser);
  
        return response.data;
    }catch (error) {
        if (error.response && error.response.data && error.response.data.message) {
          throw new Error(error.response.data.message); 
        } else {
          throw new Error('Failed to register user'); 
        }
    }
};

const addUser = async (userData) => {
  try {
      const newUser = new User();
      newUser.setUsername(userData.username);
      newUser.setEmail(userData.email);
      newUser.setPassword("default");
      newUser.setFirstname(userData.firstname);
      newUser.setLastname(userData.lastname);
      newUser.setPosition(userData.position);
      newUser.setDepartment(userData.department);
      newUser.setRole(userData.role);

      console.log(userData.username);

      const response = await axios.post('https://attendance-tracker-system-api.onrender.com/api/register', newUser);

      return response.data;
  }catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        throw new Error(error.response.data.message); 
      } else {
        throw new Error('Failed to register user'); 
      }
  }
};

const getAllUsersData = async () => {
  try {
    const response = await axios.get('https://attendance-tracker-system-api.onrender.com/api/allUsers', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });

    const tableData = response.data.map(user => ({
      id: user._id,
      username: user.username,
      firstname: user.firstname,
      lastname: user.lastname,
      role: user.role,
      email: user.email,
      department: user.department,
      position: user.position
    }));

    return tableData;
  } catch (error) {
    console.error('Error fetching users:', error.message);
    throw error;
  }
};

const saveUserData = async (userData, id) => {
  let uid = id;
  if (uid && typeof id === 'string') {
    uid = id.replace(/^"(.*)"$/, '$1'); 
  }

  try {
    const newUser = new User();
    newUser.setUsername(userData.username);
    newUser.setEmail(userData.email);
    newUser.setFirstname(userData.firstname);
    newUser.setLastname(userData.lastname);
    newUser.setPosition(userData.position);
    newUser.setDepartment(userData.department);
    newUser.setRole(userData.role);

    console.log(userData.username);

    const response = await axios.put(`https://attendance-tracker-system-api.onrender.com/api/admin-edit/${uid}`, newUser);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const deleteUser = async (id) => {
  try {
    const response = await axios.delete(`https://attendance-tracker-system-api.onrender.com/api/delete-user/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });

    console.log(response);

  } catch (error) {
    console.error('Error deleting user:', error.message);
    throw error;
  }
}

const getUserById = async (id) => {
  try {
    let uid = id; // Assign userId to uid
      if (uid && typeof id === 'string') {
        uid = id.replace(/^"(.*)"$/, '$1'); // Remove surrounding quotes if present
    }
    const response = await axios.get(`https://attendance-tracker-system-api.onrender.com/api/getUser/${uid}`);
    return response;
  } catch (error) {
    console.error('Error fetching users:', error.message);
    throw error;
  }
};

  
export { login, registerUser, addUser, getAllUsersData, saveUserData, deleteUser, getUserById };