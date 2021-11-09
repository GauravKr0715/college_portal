
import React from 'react'
// import ReactDOM from 'react-dom'
import Slide from "./components/Slide"
import Landingpage from "./components/Students/Landingpage/Landingpage"
import StudentLogin from './components/Login/S_Login';
import FacultyLogin from './components/Login/F_Login';
import AdminLogin from './components/Login/A_Login';
import Assignments from "./components/Students/Assignments/Assignments"
import Myattendence from "./components/Students/Myattendence/Myattendence"
import Myprofile from "./components/Students/Myprofile/Myprofile"
import Timetable from "./components/Students/Timetable/Timetable"
import Notes from "./components/Students/Notes/Notes"
import Queries from "./components/Students/Queries/chatBody/ChatBody"
import SectionCreate from './components/Admin/Section/SectionCreate';
import SectionTable from './components/Admin/Section/SectionTable';
import AdminLandPage from "./components/Admin/AdminLandPage";
import SubjectPage from './components/Admin/Subject/Subject';

import { BrowserRouter as Router, Switch, Route } from "react-router-dom"

/* import { library } from "@fontawesome/fontawesome-svg-core";
import { faTrash, faPlus, faEdit } from "@fontawesome/free-solid-svg-icons";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
library.add(faTrash, faEdit, faPlus); */


// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );

function App() {
  return (
    <div>
      <Router>


        <Switch>

          <Route path="/" exact component={Slide} />
          <Route path="/SLandingpage" exact component={Landingpage} />
          <Route path="/StudentLogin" component={StudentLogin} />
          <Route path="/FacultyLogin" component={FacultyLogin} />
          <Route path="/AdminLogin" component={AdminLogin} />
          <Route path="/Myprofile" component={Myprofile} />
          <Route path="/Myattendence" component={Myattendence} />
          <Route path="/Timetable" component={Timetable} />
          <Route path="/Assignments" component={Assignments} />
          <Route path="/Notes" component={Notes} />
          <Route path="/Queries" component={Queries} />
          <Route path="/SectionCreate" component={SectionCreate}/>
          <Route path="/SectionTable" component={SectionTable}/>
          <Route path="/SubjectPage" exact component={SubjectPage} />
          <Route path="/AdminLandPage" exact component={AdminLandPage}/>


        </Switch>
      </Router>

    </div>
  )
}

export default App

