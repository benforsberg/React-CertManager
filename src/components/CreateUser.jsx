import React, { useState } from "react";
import { Button, Checkbox, Form } from "semantic-ui-react";
import axios from "axios";
import { useHistory } from "react-router";
import { Helmet } from "react-helmet";

export default function CreateUser() {
  let history = useHistory();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  //const [isAdmin, setIsAdmin] = useState(false);

  const postData = () => {
    axios
      .post(`http://192.168.1.25:8080/api/users`, {
        firstName,
        lastName,
        email,
        //isAdmin
      })
      .then(() => {
        history.push("/users");
      });
  };
  return (
    <div>
      <Helmet>
        <title>Create User</title>
      </Helmet>
      <Form className="create-form">
        <Form.Field>
          <label>First Name</label>
          <input
            placeholder="First Name"
            onChange={(e) => setFirstName(e.target.value)}
          />
        </Form.Field>
        <Form.Field>
          <label>Last Name</label>
          <input
            placeholder="Last Name"
            onChange={(e) => setLastName(e.target.value)}
          />
        </Form.Field>
        <Form.Field>
          <label>Email</label>
          <input
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Field>
        {/* <Form.Field>
          <label>User Type</label>
          <input
            placeholder="User Type"
            onChange={(e) => setIsAdmin(e.target.value)}
          />
        </Form.Field> */}
        <Button color="green" onClick={postData} type="submit">
          Create User
        </Button>
      </Form>
    </div>
  );
}
