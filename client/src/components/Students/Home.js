import React, { useState, useEffect } from 'react';
import { validateStudentSession } from '../../services/authentication';
import Loader from '../Misc/Loader';

const StudentHome = () => {

  const verifiySession = async () => {
    const { data } = await validateStudentSession();
    console.log(data);
    if (data.verified) {
      window.location.href = `/student/feed`;
    } else {
      window.location.href = `/student/login`;
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