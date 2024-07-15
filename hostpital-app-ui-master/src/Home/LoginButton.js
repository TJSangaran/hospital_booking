import React from "react";
import { Link } from "react-router-dom";
import Card from "./Card";

import doctorlogin from "../image/doctorlogin.png";
import patientlogin from "../image/patientlogin.png";
import adminlogin from "../image/tabiconcircle.png";

const LoginButton = () => {
  return (
    <div className="d-flex flex-md-row flex-column justify-content-around align-items-center my-4">
      <Card Image={doctorlogin} link={"/doctor/login"} />
      <Card
        LoginButton="Patient"
        Image={patientlogin}
        link={"/patient/login"}
        login="Patient"
      />
      <div className="card mb-3" style={{ width: "18rem" }}>
        <img src={adminlogin} className="card-img-top" alt="..." height="240" />
        <div className="card-body">
          <Link to="admin" className="btn btn-primary justify-content-center w-100">Login As A Admin</Link>
        </div>
      </div>
    </div>
  );
};

export default LoginButton;

// <div
//   className="row "
//   style={{
//     maxWidth: "100%",
//     padding: "10px",
//     margin: "10px",
//     marginLeft: "190px",
//   }}
// >
//   <div className="col-12 col-md-6 mb-4  ">
//     <Card Image={doctorlogin} link={"/doctorlogin"} />
//   </div>
//   <div className="col-12 col-md-6 mb-4">
//     <Card
//       LoginButton="Patient"
//       Image={patientlogin}
//       link={"/patient"}
//       login="Patient"
//     />
//   </div>
// </div>
