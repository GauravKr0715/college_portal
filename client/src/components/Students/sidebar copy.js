import React from 'react'
import "../Students/Landingpage/Landingpage.css"
import { Link } from "react-router-dom";
import logo from "../../assets/image/logo.jpg";
import { useState } from "react"

function Sidebar() {
     
    const [value, setValue] = useState(true);
    return (
        <div>
        <div className="container">{
        (value)?(
         <div className="nav">
            <div>
          <Link to="/Landingpage">  <img src={logo} alt="" className="img"/></Link>
            <p>Student</p>
            </div>
            
            <div className="Opt1">
            <ul style={{listStyleType:"none"}}>
               <Link to="/Myprofile"  style={{textDecoration:"none",color:"beige"}}> <li><div className="icon"> <i className="fas fa-user-circle"></i></div>&nbsp;  My Profile</li></Link>
               <Link  to="/Myattendence" style={{textDecoration:"none",color:"beige"}} > <li><div className="icon"><i className="far fa-id-badge"></i></div> &nbsp; My Attendence</li></Link>
               <Link to="/Timetable" style={{textDecoration:"none",color:"beige"}}> <li><div className="icon"><i className="fas fa-table"></i></div>&nbsp;  Time Table</li></Link>
               
                         
               <Link to="/Assignments" style={{textDecoration:"none",color:"beige"}}>  <li ><div className="icon"><i className="fas fa-tasks"></i></div> &nbsp;Assignments & &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;Tests</li></Link>
               <Link to="/Notes" style={{textDecoration:"none",color:"beige"}}>  <li><div className="icon"><i className="far fa-sticky-note"></i></div> &nbsp; Notes</li></Link>
               <Link to="/Queries" style={{textDecoration:"none",color:"beige"}}>  <li><div className="icon"><i className="fas fa-comment-dots"></i></div>&nbsp;  Queries</li></Link>
               
               <Link to="/logout" style={{textDecoration:"none",color:"beige" ,fontSize:3}}>  <li><div className="icon"><i className="fas fa-sign-out-alt"></i></div>&nbsp;  Logout</li></Link>
            
                <button className="btns" onClick={()=>{setValue(false)}}><i className="fas fa-arrow-circle-left"></i></button>
            </ul>
        </div>
         </div>
        
        )
         :( 

           <div className="nav2">
            <div>
            <Link to="/Landingpage">  <img src={logo} alt="" className="img" /></Link>
            
            </div>
            
            <div className="Opt2">
            <ul style={{listStyleType:"none"}}>
               <Link to="/Myprofile"  style={{textDecoration:"none",color:"beige"}}> <li> <i className="fas fa-user-circle"></i></li></Link>

               <Link  to="/Myattendence" style={{textDecoration:"none",color:"beige"}} > <li><i className="far fa-id-badge"></i></li></Link>

               <Link to="/Timetable" style={{textDecoration:"none",color:"beige"}}> <li><i className="fas fa-table"></i></li></Link>               
                         
               <Link to="/Assignments" style={{textDecoration:"none",color:"beige"}}>  <li ><i className="fas fa-tasks"></i></li></Link>

               <Link to="/Notes" style={{textDecoration:"none",color:"beige"}}>  <li><i className="far fa-sticky-note"></i></li></Link>

               <Link to="/Queries" style={{textDecoration:"none",color:"beige"}}>  <li><i className="fas fa-comment-dots"></i></li></Link>
               
               <Link to="/logout" style={{textDecoration:"none",color:"beige" ,fontSize:3}}>  <li><i className="fas fa-sign-out-alt"></i></li></Link>
            
                <button id="btn" onClick={()=>{setValue(true)}}><i className="fas fa-arrow-circle-right"></i></button>
            </ul>
        </div>
         </div>
         )
        }
         </div>
         </div>
    )
}

export default Sidebar