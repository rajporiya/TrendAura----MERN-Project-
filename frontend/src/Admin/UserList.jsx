import React, { useEffect } from 'react'
import '../AdminStyles/UsersList.css'
import Navbar from '../componant/Navbar'
import PageTitle from '../componant/PageTitle'
import { Link } from 'react-router-dom'
import { Delete, Edit } from '@mui/icons-material'
import { useDispatch, useSelector } from 'react-redux'
import { clearMessage, deleteUser, fetchUser, removeError, removeSuccess } from '../feature/admin/adminSlice'
import Loader from "../componant/Loader";
import { toast } from 'react-toastify'

function UserList() {
    const {users, loading, error,success,message}= useSelector(state=>state.admin)
    
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

      const handleDelete=(userId)=>{
        const confirm= window.confirm("Are You sure delete this user?")
        if(confirm){
            dispatch(deleteUser(userId))
        }
}

useEffect(() => {
     if (success) {
          toast.success(message, {
            position: "top-right",
            autoClose: 2000,
          });
          dispatch(removeSuccess());
          dispatch(clearMessage());
          dispatch(fetchUser());
        }
      }, [ dispatch, success, message]); 

  return (
<>
    {loading ? (<Loader />) : (
    <>
    <Navbar />
    <PageTitle title="All Users" />

    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-6 pt-6 pb-12">
      <div className="w-full flex flex-col gap-6">

        {/* Heading */}
        <div className="flex items-center gap-2">
          <div className="w-1 h-6 rounded-full bg-amber-400" />
          <h1 className="text-2xl font-bold text-white tracking-tight">All Users</h1>
        </div>

        {/* Table Card */}
        <div className="bg-slate-800/60 backdrop-blur-sm border border-slate-700/50 rounded-2xl shadow-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-700/50">
                  <th className="text-left px-6 py-3 text-xs font-bold uppercase tracking-widest text-slate-500">Sl No.</th>
                  <th className="text-left px-6 py-3 text-xs font-bold uppercase tracking-widest text-slate-500">Name</th>
                  <th className="text-left px-6 py-3 text-xs font-bold uppercase tracking-widest text-slate-500">Email</th>
                  <th className="text-left px-6 py-3 text-xs font-bold uppercase tracking-widest text-slate-500">Role</th>
                  <th className="text-left px-6 py-3 text-xs font-bold uppercase tracking-widest text-slate-500">Created At</th>
                  <th className="text-left px-6 py-3 text-xs font-bold uppercase tracking-widest text-slate-500">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700/50">
                {users?.length > 0 ? (
                  users.map((user, index) => (
                    <tr key={user._id} className="hover:bg-slate-700/20 transition-all duration-150">

                      <td className="px-6 py-4 text-slate-400">{index + 1}</td>

                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-xs font-bold text-amber-400 shrink-0">
                            {user.name?.charAt(0).toUpperCase()}
                          </div>
                          <span className="text-white font-medium">{user.name}</span>
                        </div>
                      </td>

                      <td className="px-6 py-4 text-slate-300">{user.email}</td>

                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold
                          ${user.role === 'admin'
                            ? 'bg-amber-400/10 border border-amber-400/20 text-amber-400'
                            : 'bg-slate-700/50 border border-slate-600/50 text-slate-300'
                          }`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${user.role === 'admin' ? 'bg-amber-400' : 'bg-slate-400'}`} />
                          {user.role}
                        </span>
                      </td>

                      <td className="px-6 py-4 text-slate-400 text-xs">
                        {new Date(user.createdAt).toLocaleDateString()}
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <Link
                            to={`/admin/user/${user._id}`}
                            className="w-8 h-8 rounded-lg flex items-center justify-center border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10 transition-all duration-200"
                          >
                            <Edit style={{fontSize: 16}} />
                          </Link>
                          <button
                            onClick={() => handleDelete(user._id)}
                            className="w-8 h-8 rounded-lg flex items-center justify-center border border-red-500/30 text-red-400 hover:bg-red-500/10 transition-all duration-200"
                          >
                            <Delete style={{fontSize: 16}} />
                          </button>
                        </div>
                      </td>

                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="px-6 py-20 text-center">
                      <div className="flex flex-col items-center gap-3">
                        <div className="w-14 h-14 rounded-2xl bg-slate-700/30 border border-slate-600/50 flex items-center justify-center">
                          <People style={{fontSize: 24}} className="text-slate-500" />
                        </div>
                        <p className="text-sm text-slate-400">No users found</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
    </>
    )}
    </>
  ) 
}

export default UserList
