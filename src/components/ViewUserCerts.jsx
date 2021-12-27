import React, { useState, useEffect } from "react";
import { Button, Checkbox, Form } from "semantic-ui-react";
import axios from "axios";
import { useHistory } from "react-router";
import { Helmet } from "react-helmet";

export default function ViewUserCerts() {
  let history = useHistory();
  const [id, setID] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [certs, setCerts] = useState([]);
  //const [isAdmin, setIsAdmin] = useState();


  useEffect(() => {
    setID(sessionStorage.getItem("id"));
    setFirstName(sessionStorage.getItem("First Name"));
    setLastName(sessionStorage.getItem("Last Name"));
    // setEmail(sessionStorage.getItem("Email"));
    // setCerts(sessionStorage.getItem("certs"))
    //setIsAdmin(sessionStorage.getItem("User Type"));
    getUserCerts(id);

  }, []);

  let getURL = `http://localhost:8080/api/users/${id}/certs`;
  let numCerts = 0;

  const getUserCerts = (id) => {
    console.log("Checking if null");
    if (id == null){
      console.log("User id detected as null")
      setID(sessionStorage.getItem("id"));
      let getID = id;
      console.log ("Detected ID: " + id);
      console.log ("getID: " + getID);
    }
    
    console.log ("Trying to pull certs from: " + getURL);
    axios.get(getURL).then((response) => {
      setCerts(response.data);
      console.log("Looking for certs for user " + id);
      numCerts = certs.length;
      console.log("Found: " + numCerts + " certs.");
      console.log(certs);
    });
  };

  return (
    <div>
      <Helmet> 
        <title> Certs - { firstName + ' ' +lastName } </title>
      </Helmet>
      
      {/* Show User Certs here in table*/}
      <div>
        Showing certs for {firstName + " " + lastName} who is user ID: {id}
      </div>


      
    </div>
  );
}
