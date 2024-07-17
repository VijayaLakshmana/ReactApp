import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import React from "react";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import Api from "../../service/ApiService";


export default React.memo(function NavigationBar() {
  const [loginName, setloginName] = useState("");
  useEffect(() => {
    const token = sessionStorage.getItem("username");
    if (!token) {
      setloginName("Login");
      return;
    }
    const api = new Api();
    api
      .get("http://localhost:5000/protected",{headers: {
        Authorization: `${token}`
      }})
      .then((response) => {
        console.log(response);
        const username = response.data.username;
        setloginName(username);
       
      })
      .catch(() => {
        setloginName("Login");
      });
  }, []);
  function handleBookingClick(e, name) {
    if (loginName === "Login") {
      e.preventDefault();
      toast.error(`Please login to  ${name}`);
    }
  }

  return (
    <>
      <div className="content1">
        <span className="appLogo">Bus Ticket Booking</span>
        <div className="navigationbar-right">
          <Link to={"/login"} id="login">
            {loginName}
          </Link>
          <Link
            to={"/mybookings/ticketcancel"}
            id="ticketCancel"
            onClick={(e) => handleBookingClick(e, "Cancel Ticket")}
          >
            Cancel ticket
          </Link>
          <Link
            to={"/mybookings"}
            id="ticket"
            onClick={(e) => handleBookingClick(e, "view My Bookings")}
          >
            My Bookings
          </Link>
        </div>
      </div>
    </>
  );
});
