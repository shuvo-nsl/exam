import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import { Link, Navigate } from 'react-router-dom';
import { getSingleUser } from '../../api/auth';
import { userInfo } from '../../utils/auth';

const Profile = () => {
    const [user, setUser] = useState({});
    const userinfo = userInfo();
    useEffect(()=> {
        getSingleUser(userinfo?._id, userinfo.token).then(data=> {
            console.log(data);
        }).catch(err=> {
            console.log(err);

        })
    },[])
  return (
    <div className='container w-50 m-auto'>
         <div className="card p-2">
        <h1>{userinfo.name}</h1>

        <p>
          <Link className='btn btn-primary' to={"/changepassword"}
          >Change Password</Link>
        </p>
      </div>
    </div>
  )
}

export default Profile