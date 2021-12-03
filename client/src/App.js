
import React from 'react'
// import ReactDOM from 'react-dom'
import Slide from "./components/Slide"
import Landingpage from "./components/Students/Landingpage/Landingpage"
import StudentLogin from './components/login/S_Login';
import FacultyLogin from './components/login/F_Login';
import FacultyHome from './components/Faculty/Home';
import FacultyFeed from './components/Faculty/Feed';
import FacultyAttendance from './components/Faculty/Attendance';
import FacultyAssignment from './components/Faculty/Assignment';
import FacultyTest from './components/Faculty/Test';
import FacultyNotes from './components/Faculty/Notes';
import AdminLogin from './components/login/A_Login';
import Assignments from "./components/Students/Assignments/Assignments"
import Myattendence from "./components/Students/Myattendence/Myattendence"
import Myprofile from "./components/Students/Myprofile/Myprofile"
import Timetable from "./components/Students/Timetable/Timetable"
import Notes from "./components/Students/Notes/Notes"
import Queries from "./components/Students/Queries/chatBody/ChatBody"
import SectionCreate from './components/Admin/Section/SectionCreate';
import SectionTable from './components/Admin/Section/SectionTable';
import SectionFinal from "./components/Admin/Section/SectionFinal";
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

          <Route path="/faculty"
            render={({ match: { url } }) => (
              <>
                <Route path={`${url}/login`} exact >
                  {/* <Authorization /> */}
                  <FacultyLogin />
                </Route>
                <Route path={`${url}/`} exact >
                  {/* <Authorization /> */}
                  <FacultyHome />
                </Route>
                <Route path={`${url}/feed`} exact >
                  {/* <Authorization /> */}
                  <FacultyFeed />
                </Route>
                <Route path={`${url}/attendance`} exact >
                  {/* <Authorization /> */}
                  <FacultyAttendance />
                </Route>
                <Route path={`${url}/assignments`} exact >
                  {/* <Authorization /> */}
                  <FacultyAssignment />
                </Route>
                <Route path={`${url}/tests`} exact >
                  {/* <Authorization /> */}
                  <FacultyTest />
                </Route>
                <Route path={`${url}/notes`} exact >
                  {/* <Authorization /> */}
                  <FacultyNotes />
                </Route>
              </>
            )}>
          </Route>

          <Route path="/SLandingpage" exact component={Landingpage} />
          <Route path="/StudentLogin" component={StudentLogin} />
          <Route path="/faculty/login" component={FacultyLogin} />
          <Route path="/faculty/" component={FacultyHome} />
          <Route path="/AdminLogin" component={AdminLogin} />
          <Route path="/Myprofile" component={Myprofile} />
          <Route path="/Myattendence" component={Myattendence} />
          <Route path="/Timetable" component={Timetable} />
          <Route path="/Assignments" component={Assignments} />
          <Route path="/Notes" component={Notes} />
          <Route path="/Queries" component={Queries} />
          <Route path="/SectionCreate" component={SectionCreate} />
          <Route path="/SectionTable" component={SectionTable} />
          <Route path="/SectionFinal" exact component={SectionFinal} />
          <Route path="/SubjectPage" exact component={SubjectPage} />
          <Route path="/AdminLandPage" exact component={AdminLandPage} />



        </Switch>
      </Router>

    </div>
  )
}

export default App

