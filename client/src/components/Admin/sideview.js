import React from 'react'
import "../Students/Landingpage/Landingpage.css"
import { Link } from "react-router-dom";
import logo from "../../assets/image/logo.jpg";


function Sideview() {
     
  
    return (
        <div>
        <div className="container">{
        
         <div className="nav">
            <div>
          <Link to="/AdminLandPage">  <img src={logo} alt="" className="img"/></Link>
            <p>Admin</p>
            </div>
            
            <div className="Opt1">
            <ul style={{listStyleType:"none"}}>
               <Link to="/SubjectPage"  style={{textDecoration:"none",color:"beige"}}> <li><div className="icon"> <i class="fas fa-book"></i></div>&nbsp;  Subjects</li></Link>
               <Link  to="/studentnew" style={{textDecoration:"none",color:"beige"}} > <li><div className="icon"><i className="far fa-id-badge"></i></div> &nbsp; Student Creation</li></Link>
               <Link to="/TeacherC" style={{textDecoration:"none",color:"beige"}}> <li><div className="icon"><i class="fas fa-chalkboard-teacher"></i></div>&nbsp;  Teacher Creation</li></Link>
               
                         
               <Link to="/SectionCreate" style={{textDecoration:"none",color:"beige"}}>  <li ><div className="icon"><i className="fas fa-table"></i></div> &nbsp;Section Creation</li></Link>
              
               <Link to="/logout" style={{textDecoration:"none",color:"beige" ,fontSize:3}}>  <li><div className="icon"><i className="fas fa-sign-out-alt"></i></div>&nbsp;  Logout</li></Link>
            
                
            </ul>
        </div>
         </div>
        
        
         
        }
         </div>
         </div>
    )
}

export default Sideview