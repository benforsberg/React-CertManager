import React, { useState, useEffect } from "react";
import { Button, Checkbox, Form } from "semantic-ui-react";
import axios from "axios";
import { useHistory } from "react-router";
import { Helmet } from "react-helmet";
import CertList from "./CertList";

export default function GetUser() {
  let history = useHistory();
  const [id, setUserID] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  //const [certs, setCerts] = ("");


  //get Id from local storage, then pull that user info
  useEffect(() => {
    setUserID(localStorage.getItem("id"));
    setFirstName(localStorage.getItem("First Name"));
    setLastName(localStorage.getItem("Last Name"));
    setEmail(localStorage.getItem("Email"));
    setIsAdmin(localStorage.getItem("User Type"));

    console.log('Displaying data for user: ' + id)
    getAPIData(id);
  }, []);

  const getAPIData = (id) => {
    axios
      .get(`http://localhost:8080/api/users/${id}`, {
        firstName,
        lastName,
        email,
        isAdmin,
        //certs,
      })
      .then(() => {
        console.log('API Data: ' + firstName + ' ' + lastName + ' ' + email + ' ' + isAdmin )//+ certs)
        //history.push("/users");
      });
  };
  return (
    <div className='user'>
      <Helmet>
        <title>View User - {firstName + ' ' +lastName} </title>
      </Helmet>
      
      <div>
        <h3>First Name: {firstName}</h3>
      <h3>Last Name: {lastName}</h3>
      <h3>Email: {email}</h3>
      <h3>Admin?: {isAdmin ? 'Yes' : 'No'}</h3>
      {/* <h3>Certs: {certs}</h3> */}
      </div>

      
    </div>
  );
}
