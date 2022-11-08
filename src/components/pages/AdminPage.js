import axios from 'axios'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useSearchParams } from 'react-router-dom';
import { adminActions } from '../../core/slices/adminSlice';
import { serverApiPath } from '../../data/utils/serverApiPaths'
import Admin from '../admin/Admin';

let isRequested = false;

function AdminPage() {
  const [searchParams] = useSearchParams();

  const dispatch = useDispatch();
  const admin = useSelector(state => state._admin);

  checkAdmin();

  function checkAdmin() {
    if (!admin.isAdmin) {
      isRequested = true;
      axios.get(serverApiPath.getAdminContent + searchParams.get("secret"))
        .then(r => {
          isRequested = false;
          dispatch(adminActions.setAdmin(r.data.success));
        })
        .catch(e => {
          isRequested = false;
        });
    }
  }

  return (
    <div>
      {admin.isAdmin ? <Admin /> : isRequested ? null : <Navigate to="/" replace />}
    </div>
  )
}

export default AdminPage