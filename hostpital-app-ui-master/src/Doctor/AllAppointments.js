import React, { useState, useEffect } from "react";
import Axios from "axios";
import jwt_decode from "jwt-decode";
import Scrollbar from "react-scrollbars-custom";
import Navbar from "../Basic/Navbar";
import "../Dashbaord/dashboard.css";
import Leftside from "../Dashbaord/LeftsideDoctor";

const AllAppointments = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      var token = localStorage.getItem("token");
      var decoded = jwt_decode(token);
      const { data } = await Axios.post(
        `${process.env.REACT_APP_SERVER_URL}/doctors/all-appointments`,
        {
          doctorId: decoded._id,
        }
      );

      setAppointments(data);
      console.log(data);
    };

    fetchAppointments();
  }, []);

  return (
    <div className="bg-dark" style={{ minHeight: "100vh" }}>
      <Navbar />
      <div>
        <div className="row m-5" style={{ maxWidth: "100%" }}>
          <div
            className="col-3 col-md-3 p-4 bg-white "
            style={{ minHeight: "80vh" }}
          >
            <Leftside />
          </div>
          <div
            className="col-9 col-md-9 p-3"
            style={{
              border: "15px solid yellow ",
              minHeight: "80vh",
              backgroundColor: "#6c757d",
            }}
          >
            <Scrollbar
              noScrollX
              style={{ position: "", height: "73vh", width: "150vh" }}
              className="col-12 col-md-12"
            >
              <table className="table table-hover table-dark">
                <thead>
                  <tr>
                    <th scope="col">Date</th>
                    <th scope="col">Time</th>
                    <th scope="col">Patient Name</th>
                    <th scope="col">Meet Link</th>
                  </tr>
                </thead>
                <tbody>
                  {appointments.map((appointment) => (
                    <tr key={appointment._id}>
                      <th scope="row">{appointment.date}</th>
                      <th scope="row">{appointment.slotTime}</th>
                      <th scope="row">{appointment.patientName}</th>
                      <th scope="row"><a href={appointment.googleMeetLink} target="_blank">Join Meet</a></th>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Scrollbar>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllAppointments;
