import React, { useEffect } from 'react'
import '../AdminStyles/UsersList.css'
import Navbar from '../componant/Navbar'
import PageTitle from '../componant/PageTitle'
import { Link } from 'react-router-dom'
import { Delete, Edit } from '@mui/icons-material'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUser, removeError } from '../feature/admin/adminSlice'
import Loader from "../componant/Loader";
import { toast } from 'react-toastify'

function UserList() {
    const {users, loading, error}= useSelector(state=>state.admin)
    console.log(users);
    
    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(fetchUser())
    },[dispatch])

    useEffect(() => {
        if (error) {
          toast.error(error?.message || error, {
            position: "top-right",
            autoClose: 2000,
          });
    
          dispatch(removeError());
        }
      }, [error, dispatch]);
  return (
    <>
    {loading ? (<Loader />) : (
    <>
    <Navbar />
    <PageTitle title="All User" />
    <div className='usersList-container'>
      <h1 className="usersList-title">All Users</h1>
      <div className='usersList-table-container'>
      <table className='usersList-table'>
        <thead>
            <tr>
                <th>Sl No.</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Created At</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            {users?.length > 0 ? (
              users.map((user, index) => (
                <tr key={user._id}>
                  <td>{index + 1}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                  <td>
                    <Link to={`/admin/user/${user._id}`} className='action-icon edit-icon'>
                      <Edit />
                    </Link>
                    <button className="action-icon delete-icon">
                      <Delete />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" style={{ textAlign: "center", padding: "20px" }}>
                  No users found
                </td>
              </tr>
            )}
        </tbody>
      </table>
      </div>
    </div>
    </>
    )}
    </>
  )
}

export default UserList
