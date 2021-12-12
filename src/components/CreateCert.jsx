import React, { useState } from "react";
import { Button, Form } from "semantic-ui-react";
import axios from "axios";
import { useHistory } from "react-router";
import { Helmet } from "react-helmet";

export default function CreateCert() {
  let history = useHistory();
  const [certType, setcertType] = useState("");
  const [certIssuer, setcertIssuer] = useState("");
  const [certExpiration, setcertExpiration] = useState("");
  const [certDescription, setcertDescription] = useState("");
  const [certCode, setcertCode] = useState("");
  const [certLength, setcertLength] = useState("");
  const [daysUntilExpired, setdaysUntilExpired] = useState("");
  const [isExpired, setisExpired] = useState(false);
  const [ownerID, setownerID] = useState("");
  const [APIData, setAPIData] = useState([]);
  const [userData, setUserData] = useState([]);


  async function getUserData (ownerID) {
    // axios.get(`http://localhost:8080/api/users/${ownerID}`).then((response) => {
    //   console.log(response.data);
    //   setUserData(response.data);
    //   console.log("User Data for ID: " + ownerID + " " + response.data)
    //   currentUser = response.data;
    //   console.log("userdata: " + userData);
    //   console.log("Current User" + currentUser);
    // });

    const response = await axios.get(`http://localhost:8080/api/users/${ownerID}`)
    //console.log("User: " + response.data)
    return response.data
  };



  const postData = () => {
    console.log("Trying to create cert for user ID: " + ownerID);
    let currentUser = getUserData(ownerID);
    console.log("Info for user " + ownerID + " " + currentUser);
    let user = ownerID;


    let newCert = [certType,
      certIssuer,
      certExpiration,
      certDescription,
      certCode,
      certLength,
      daysUntilExpired,
      isExpired,
      user,];

    axios
      .post(`http://localhost:8080/api/certs`, {
        newCert
      })
      .then(() => {
        history.push("/certs");
        console.log("Tried to push user data!");
        console.log("Cert Data: " + newCert);
      });
  };
  return (
    <div>
      <Helmet>
        <title>New Cert</title>
      </Helmet>
      <Form className="create-form">
        <Form.Field>
          <label>Type</label>
          <input
            placeholder="WSI"
            onChange={(e) => setcertType(e.target.value)}
          />
        </Form.Field>
        <Form.Field>
          <label>Issuer</label>
          <input
            placeholder="American Red Cross"
            onChange={(e) => setcertIssuer(e.target.value)}
          />
        </Form.Field>
        <Form.Field>
          <label>Expiration Date</label>
          <input
            placeholder="2022-10-19"
            onChange={(e) => setcertExpiration(e.target.value)}
          />
        </Form.Field>

        <Form.Field>
          <label>Description</label>
          <input
            placeholder="Water Safety Instructor"
            onChange={(e) => setcertDescription(e.target.value)}
          />
        </Form.Field>
        <Form.Field>
          <label>Cert Code</label>
          <input
            placeholder="H3JW8W"
            onChange={(e) => setcertCode(e.target.value)}
          />
        </Form.Field>
        <Form.Field>
          <label>Duration</label>
          <input
            placeholder="2 Years"
            onChange={(e) => setcertLength(e.target.value)}
          />
        </Form.Field>

        <Form.Field>
          <label>Owner ID</label>
          <input placeholder="0" onChange={(e) => setownerID(e.target.value)} />
        </Form.Field>

        <Button color="green" onClick={postData} type="submit">
          Create Cert
        </Button>
      </Form>
    </div>
  );
}
