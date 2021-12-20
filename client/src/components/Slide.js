import React from "react";
/* import { useHistory } from "react-router-dom"; */

import "./Slide.css";
import { Link } from "react-router-dom";
import image1 from "../assets/image/one.jpg";
import icon1 from "../assets/image/s.png";
import icon2 from "../assets/image/t.png";
import icon3 from "../assets/image/a.png";
import logo from "../assets/image/logo.jpg";




function Slide() {
    /*   const history = useHistory();
      useEffect(() => {
          if (!localStorage.getItem("Auth-token")) {
              history.push("/login");
          }
      }, []); */
    return (
        <div >


            <img
                className="d-block w-100"
                src={image1}
                alt=" "
            />


            <div className="Sl">

                <div className="flex" id="flex">
                    <div className="box" id="one">
                        <img
                            className="icon"
                            src={icon1}
                            alt=" "
                        />
                        <Link to="/student/" className="a">
                            <h3>Student</h3>
                        </Link>
                    </div>

                    <div className="box" id="two">
                        <img
                            className="icon"
                            src={icon2}
                            alt=" "
                        />
                        <Link to="/faculty/" className="a">
                            <h3>Faculty</h3>
                        </Link>
                    </div>

                    <div className="box" id="thee">
                        <img
                            className="icon"
                            src={icon3}
                            alt=" "
                        />
                        <Link to="/admin/" className="a">
                            <h3>
                                Admin
                            </h3>
                        </Link>
                    </div> 


                </div>
                <p className="head">College Portal</p>
                <img src={logo} alt="" className="log" />
                <p className="nam">Dr. Akhilesh Das Gupta Institute Of Technology and Management</p>
            </div>
        </div>
    );
}

export default Slide;
