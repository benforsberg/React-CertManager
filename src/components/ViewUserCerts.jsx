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
    setID(localStorage.getItem("ID"));
    setFirstName(localStorage.getItem("First Name"));
    setLastName(localStorage.getItem("Last Name"));
    setEmail(localStorage.getItem("Email"));
    setCerts(localStorage.getItem("certs"))
    //setIsAdmin(localStorage.getItem("User Type"));
  }, []);


  const getUserCerts = (id) => {
    axios.get(`http://localhost:8080/api/users/${id}/certs`).then((getData) => {
      setCerts(getData.data.cert);
    });
  };

  return (
    <div>
      <Helmet>
        <title> Certs - { firstName + ' ' +lastName } </title>
      </Helmet>
      
      {/* Show User Certs here in table*/}
      <div>
        certs
      </div>
    </div>
  );
}
