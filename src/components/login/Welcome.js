import React from 'react'
import { useDispatch } from 'react-redux';
import { authActions } from '../../core/slices/authSlice';

function Welcome(props) {
    const dispatch = useDispatch();

    const handleLogoutClick = () => {
        dispatch(authActions.logout());
    }

   return (
       <div>
           <h2>Welcome {props.user.name}</h2>
           <div>Email: {props.user.email}</div>
           <button onClick={ handleLogoutClick }>Logout</button>
       </div>
   )
}

export default Welcome