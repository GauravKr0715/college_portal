import React, { useState, useEffect } from "react";
import "./Login.css";
import col_logo from "../../assets/image/logo.jpg"
// import icon from "../assets/image/s_logo.jpeg";
// import { Link } from "react-router-dom";
// import image1 from "../assets/image/s.png";
import bg from "../../assets/image/b3.jpg"
import { loginAdmin } from '../../services/authentication';

export default function FacultyLogin() {

  const [userId, setUserID] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const LoginAdmin = async () => {
    setLoading(true);
    try {
      setError(null);
      const { data } = await loginAdmin(userId, password);
      console.log(data);
      if (data.success) {
        // alert(`we're in`);
        window.location.href = '/admin/students';
      } else {
        setError(data.message);
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  }

  return (
    <div >
      <img src={bg} alt="" className="body" />
      <div class="form-container">

        <img src={col_logo} alt="ui-element" className="image" />

        <h1>ADMIN LOGIN</h1>

        {/* <img src="../assets/image/a.png" alt="ui-element"/> */}
        <form class="register-form">
          {/* Uncomment the next line to show the success message */}
          {/* <div class="success-message">Success! Thank you for registering</div> */}
          {/* <h6>first</h6> */}
          {/* <label for="fname">First name: </label>
          <input
            id="first-name"
            class="form-field"
            type="text"
            placeholder="First Name"
            name="firstName"
          /> */}
          {/* Uncomment the next line to show the error message */}
          {/* <span id="first-name-error">Please enter a first name</span> */}
          {/* <label for="fname">Last name: </label>
          <input
            id="last-name"
            class="form-field"
            type="text"
            placeholder="Last Name"
            name="lastName"
          /> */}
          {/* Uncomment the next line to show the error message */}
          {/* <span id="last-name-error">Please enter a last name</span> */}
          <label for="fname">College ID Number : </label>
          <input
            id="college-id-no"
            class="form-field"
            type="text"
            placeholder="College ID No"
            name="collegeIdNo"
            value={userId}
            onChange={(e) => {
              setUserID(e.target.value);
            }}
          />
          {/* <label for="fname">Email : </label> */}

          {/* <input
            id="email"
            class="form-field"
            type="text"
            placeholder="Email"
            name="email"
          /> */}
          <label for="fname">Password : </label>

          <input
            id="password"
            class="form-field"
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          {/* Uncomment the next line to show the error message */}
          {
            error && (
              <span id="email-error">{error}</span>
            )
          }
          {
            loading ? (
              <button disabled={loading} style={{
                backgroundColor: '#555',
                cursor: 'pointer'
              }} class="button" type="button" >
                Loading...
              </button>
            ) : (
              <button disabled={loading} class="button" type="button" onClick={LoginAdmin}>
                LOGIN
              </button>

            )
          }
        </form>
      </div>
    </div>
  );
}
