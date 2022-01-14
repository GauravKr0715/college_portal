
import React from 'react'
import "./App.css"
// import ReactDOM from 'react-dom'
import Slide from "./components/Slide"

import StudentLogin from './components/Login/S_Login';
// import StudentLogin from './components/Login/StudentLogin';
import FacultyLogin from './components/Login/F_Login';
// import FacultyLogin from './components/Login/FacultyLogin';
import AdminLogin from './components/Login/A_Login';
// import AdminLogin from './components/Login/AdminLogin';


import FacultyHome from './components/Faculty/Home';
import FacultyFeed from './components/Faculty/Feed';
import FacultyAttendance from './components/Faculty/Attendance';
// import FacultyTT from "./components/Faculty/timetable";
import FacultyTT from "./components/Faculty/timetable_new";
import FacultyProfile from "./components/Faculty/profile"


import StudentProfile from "./components/Students/profile"
import FacultyAssignment from './components/faculty/Assignment';
import FacultyAssignmentProfile from './components/faculty/AssignmentProfile';
import FacultyAssignmentSubmissionProfile from './components/faculty/AssignmentSubmissionProfile';
import FacultyTest from './components/faculty/Test';
import FacultyTestProfile from './components/faculty/TestProfile';
import FacultyTestSubmissionProfile from './components/faculty/TestSubmissionProfile';
import FacultyNotes from './components/faculty/Notes';
import FacultyNotesProfile from './components/faculty/NotesProfile';

import FacultyQueries from './components/faculty/Queries';

import StudentHome from './components/Students/Home';
import StudentFeed from './components/Students/Feed';
import StudentAttendance from './components/Students/Attendance';
import StudentAssignment from './components/Students/Assignment';
import StudentAssignmentProfile from './components/Students/AssignmentProfile';
import StudentTest from './components/Students/Test';
import StudentTestProfile from './components/Students/TestProfile';
import StudentNotes from './components/Students/Notes';
import StudentNotesProfile from './components/Students/NotesProfile';
// import StudentTT from "./components/Students/Timetable";
import StudentTT from "./components/Students/Timetable_new_student";
import StudentQueries from './components/Students/Queries';

import AdminHome from './components/Admin/Home';
import SectionCreate from './components/Admin/Section/SectionCreate';
import SectionTable from './components/Admin/Section/SectionTable';
import SectionFinal from "./components/Admin/Section/SectionFinal";
import AdminStudents from "./components/Admin/Student";
import AdminFaculty from "./components/Admin/Faculty";
import AdminDepartments from './components/Admin/Departments';
import AdminSubjects from './components/Admin/Subjects';
import AdminSection from './components/Admin/Section';
import AdminSectionProfile from './components/Admin/SectionProfile';




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
                <Route path={`${url}/assignments/:id`} exact >
                  {/* <Authorization /> */}
                  <FacultyAssignmentProfile />
                </Route>
                <Route path={`${url}/assignments/:assignment_id/:submission_id`} exact >
                  {/* <Authorization /> */}
                  <FacultyAssignmentSubmissionProfile />
                </Route>
                <Route path={`${url}/tests`} exact >
                  {/* <Authorization /> */}
                  <FacultyTest />
                </Route>
                <Route path={`${url}/tests/:id`} exact >
                  {/* <Authorization /> */}
                  <FacultyTestProfile />
                </Route>
                <Route path={`${url}/tests/:test_id/:submission_id`} exact >
                  {/* <Authorization /> */}
                  <FacultyTestSubmissionProfile />
                </Route>
                <Route path={`${url}/notes`} exact >
                  {/* <Authorization /> */}
                  <FacultyNotes />
                </Route>
                <Route path={`${url}/notes/:id`} exact >
                  {/* <Authorization /> */}
                  <FacultyNotesProfile />
                </Route>
                <Route path={`${url}/time-table`} exact >
                  {/* <Authorization /> */}
                  <FacultyTT />
                </Route>
                <Route path={`${url}/profile`} exact >
                  {/* <Authorization /> */}
                  <FacultyProfile />
                </Route>
                <Route path={`${url}/queries`} exact >
                  {/* <Authorization /> */}
                  <FacultyQueries />
                </Route>
              </>
            )}>
          </Route>

          <Route path="/student"
            render={({ match: { url } }) => (
              <>
                <Route path={`${url}/login`} exact >
                  {/* <Authorization /> */}
                  <StudentLogin />
                </Route>
                <Route path={`${url}/`} exact >
                  {/* <Authorization /> */}
                  <StudentHome />
                </Route>
                <Route path={`${url}/feed`} exact >
                  {/* <Authorization /> */}
                  <StudentFeed />
                </Route>
                <Route path={`${url}/attendance`} exact >
                  {/* <Authorization /> */}
                  <StudentAttendance />
                </Route>
                <Route path={`${url}/assignments`} exact >
                  {/* <Authorization /> */}
                  <StudentAssignment />
                </Route>
                <Route path={`${url}/assignments/:id`} exact >
                  {/* <Authorization /> */}
                  <StudentAssignmentProfile />
                </Route>
                <Route path={`${url}/tests`} exact >
                  {/* <Authorization /> */}
                  <StudentTest />
                </Route>
                <Route path={`${url}/tests/:id`} exact >
                  {/* <Authorization /> */}
                  <StudentTestProfile />
                </Route>
                <Route path={`${url}/notes`} exact >
                  {/* <Authorization /> */}
                  <StudentNotes />
                </Route>
                <Route path={`${url}/notes/:id`} exact >
                  {/* <Authorization /> */}
                  <StudentNotesProfile />
                </Route>
                <Route path={`${url}/time-table`} exact >
                  {/* <Authorization /> */}
                  <StudentTT />
                </Route>
                <Route path={`${url}/profile`} exact >
                  {/* <Authorization /> */}
                  <StudentProfile />
                </Route>
                <Route path={`${url}/queries`} exact >
                  {/* <Authorization /> */}
                  <StudentQueries />
                </Route>
              </>
            )}>
          </Route>

          <Route path="/admin"
            render={({ match: { url } }) => (
              <>
                <Route path={`${url}/login`} exact >
                  {/* <Authorization /> */}
                  <AdminLogin />
                </Route>
                <Route path={`${url}/`} exact >
                  {/* <Authorization /> */}
                  <AdminHome />
                </Route>
                <Route path={`${url}/departments`} exact >
                  {/* <Authorization /> */}
                  <AdminDepartments />
                </Route>
                <Route path={`${url}/subjects`} exact >
                  {/* <Authorization /> */}
                  <AdminSubjects />
                </Route>
                <Route path={`${url}/sections`} exact >
                  {/* <Authorization /> */}
                  <AdminSection />
                </Route>
                <Route path={`${url}/sections/:id`} exact >
                  {/* <Authorization /> */}
                  <AdminSectionProfile />
                </Route>

                <Route path={`${url}/SectionCreate`} exact >
                  {/* <Authorization /> */}
                  <SectionCreate />
                </Route>
                <Route path={`${url}/SectionTable`} exact >
                  {/* <Authorization /> */}
                  <SectionTable />
                </Route>
                <Route path={`${url}/SectionFinal`} exact >
                  {/* <Authorization /> */}
                  <SectionFinal />
                </Route>

                <Route path={`${url}/students`} exact >
                  {/* <Authorization /> */}
                  <AdminStudents />
                </Route>

                <Route path={`${url}/faculties`} exact >
                  {/* <Authorization /> */}
                  <AdminFaculty />
                </Route>
              </>
            )}>
          </Route>


          <Route path="/StudentLogin" component={StudentLogin} />
          <Route path="/faculty/login" component={FacultyLogin} />

          <Route path="/faculty/" component={FacultyHome} />
          <Route path="/student/" component={StudentHome} />

          <Route path="/SectionCreate" component={SectionCreate} />
          <Route path="/SectionTable" component={SectionTable} />
          <Route path="/SectionFinal" exact component={SectionFinal} />


          <Route path="/FacultyTT" exact component={FacultyTT} />



        </Switch>
      </Router>

    </div>
  )
}

export default App

