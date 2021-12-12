import React, { useState, useEffect } from "react";
import { Button, Checkbox, Form } from "semantic-ui-react";
import axios from "axios";
import { useHistory } from "react-router";
import { Helmet } from "react-helmet";

export default function GetUser() {
  let history = useHistory();
  const [user, setUser] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  //use currentuser from localstorage

  // const ViewUserDetails = _ => {
  //   const { state } = useLocation();
  // }

  let userID = null;


  //get Id from local storage, then pull that user info
  useEffect(() => {
    setUser(JSON.parse(window.localStorage.getItem('currentUser')));
    // setFirstName(localStorage.getItem("First Name"));
    // setLastName(localStorage.getItem("Last Name"));
    // setEmail(localStorage.getItem("Email"));
    // setIsAdmin(localStorage.getItem("User Type"));
    userID = 1;
    console.log('Curreent user: ' + userID)
    getAPIData(0);
  }, []);

  const getAPIData = (id) => {
    axios
      .get(`http://localhost:8080/api/users/${id}`, {
        firstName,
        lastName,
        email,
        isAdmin
      })
      .then(() => {
        console.log('API Data: ' + firstName + ' ' + lastName + ' ' + email + ' ' + isAdmin)
        //history.push("/users");
      });
  };
  return (
    <div className='user'>
      <Helmet>
        <title>View User - {firstName + ' ' +lastName} </title>
      </Helmet>
      
      

      <h3>First Name: {firstName}</h3>
      <h3>Last Name: {lastName}</h3>
      <h3>Email: {email}</h3>
      <h3>Admin?: {isAdmin ? 'Yes' : 'No'}</h3>
    </div>
  );
}
