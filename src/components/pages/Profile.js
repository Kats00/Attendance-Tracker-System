import React, { useEffect, useState } from 'react';
import Navbar from '../partials/navbar';
import "../../assets/styles/style.css";
import { getUserById, saveUserData } from '../../routes/userRoute'; 

const Profile = () => {
    const thisUserId = localStorage.getItem('userid');
    const [thisUser, setThisUser] = useState(null);

    useEffect(() => {
        getUserById(thisUserId)
            .then(result => {
                setThisUser(result.data.user); 
            })
            .catch(error => {
                console.error('Error:', error); 
            });
    }, [thisUserId]); 

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setThisUser(prevUser => ({
            ...prevUser,
            [name]: value
        }));
    };

    const handleUpdateUser = () => {
        console.log('updatedUser', thisUser);
        try {
            saveUserData(thisUser, thisUserId);
        } catch (error) {
            console.log(error);
        }
    };

    if (!thisUser) {
        return <div>Loading...</div>; // Add a loading state while user data is being fetched
    }

    return (
        <div className='vh-100 overflow-hidden d-flex flex-column'>
            <Navbar className="sticky-top" />
            <div className='border d-flex flex-column justify-content-center align-items-center h-100'>
                <div className='w-75 border rounded shadow-1-strong'>
                    <div className='d-flex flex-column p-3 px-4'>
                        <h3>Welcome, {thisUser.username}</h3>
                        <hr></hr>
                        <div className='mb-3 d-flex align-items-center justify-content-between'>
                            <label htmlFor='firstname' className='form-label fw-bold'>First Name</label>
                            <input type='text' id='firstname' name='firstname' value={thisUser.firstname} onChange={handleInputChange} className='form-control w-fit-content' />
                        </div>
                        <div className='mb-3 d-flex align-items-center justify-content-between'>
                            <label htmlFor='lastname' className='form-label fw-bold'>Last Name</label>
                            <input type='text' id='lastname' name='lastname' value={thisUser.lastname} onChange={handleInputChange} className='form-control w-fit-content' />
                        </div>
                        <div className='mb-3 d-flex align-items-center justify-content-between'>
                            <p className='fw-bold'>Email</p>
                            <input type='text' id='email' name='email' value={thisUser.email} onChange={handleInputChange} className='form-control w-fit-content' />
                        </div>
                        <div className='mb-3 d-flex align-items-center justify-content-between'>
                            <p className='fw-bold'>Position</p>
                            <input type='text' id='position' name='position' value={thisUser.position} onChange={handleInputChange} className='form-control w-fit-content' />
                        </div>
                        <div className='mb-3 d-flex align-items-center justify-content-between'>
                            <p className='fw-bold'>Role</p>
                            <p>{thisUser.role}</p>
                        </div>
                        <div className='mb-3 d-flex align-items-center justify-content-between'>
                            <p className='fw-bold'>Department</p>
                            <input type='text' id='department' name='department' value={thisUser.department} onChange={handleInputChange} className='form-control w-fit-content' />
                        </div>
                        <div className='d-flex justify-content-end p-3'>
                            <button className='btn btn-primary' onClick={handleUpdateUser}>Save Changes</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
