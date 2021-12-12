import React, { useState, useEffect } from "react";
import { Button, Checkbox, Form } from "semantic-ui-react";
import axios from "axios";
import { useHistory } from "react-router";
import { Helmet } from "react-helmet";

export default function UpdateUser() {
  let history = useHistory();
  const [id, setID] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(null);


  useEffect(() => {
    setID(localStorage.getItem("User ID"));
    setFirstName(localStorage.getItem("First Name"));
    setLastName(localStorage.getItem("Last Name"));
    setEmail(localStorage.getItem("Email"));
    setIsAdmin(localStorage.getItem("User Type"));
  }, []);

  const updateAPIData = () => {
    axios
      .put(`http://localhost:8080/api/users/${id}`, {
        firstName,
        lastName,
        email,
        isAdmin
      })
      .then(() => {
        history.push("/users");
      });
  };
  return (
    <div className='user'> 
      <Helmet>
        <title>Edit User - {firstName + ' ' +lastName} </title>
      </Helmet>

      <h2>
        Edit User - {firstName} {lastName}
      </h2>

      <Form className="create-form">
        <Form.Field>
          <label>First Name</label>
          <input
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </Form.Field>
        <Form.Field>
          <label>Last Name</label>
          <input
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </Form.Field>
        <Form.Field>
          <label>Email</label>
          <input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Field>
        <Form.Field>
          <label>User Type</label>
          <input
            placeholder="User Type"
            onChange={(e) => setIsAdmin(e.target.value === 'admin' ? 'true' : 'false')}
          />
        </Form.Field>
        <Button color="blue" type="submit" onClick={updateAPIData}>
          Update User
        </Button>
      </Form>
    </div>
  );
}
