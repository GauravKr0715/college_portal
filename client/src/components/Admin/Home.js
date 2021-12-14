import React, { useState, useEffect } from 'react';
import { validateAdminSession } from '../../services/authentication';
import Loader from '../Misc/Loader';

const StudentHome = () => {

  const verifiySession = async () => {
    const { data } = await validateAdminSession();
    console.log(data);
    if (data.verified) {
      window.location.href = `/admin/studentnew`;
    } else {
      window.location.href = `/admin/login`;
    }
  }

  useEffect(() => {
    verifiySession();
  }, []);

  return (
    <Loader />
  );
}

export default StudentHome;