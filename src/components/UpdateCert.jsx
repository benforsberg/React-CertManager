import React, { useState, useEffect } from "react";
import { Button, Checkbox, Form } from "semantic-ui-react";
import axios from "axios";
import { useHistory, useParams } from "react-router";
import { Helmet } from "react-helmet";

export default function UpdateCert() {
  let history = useHistory();
  //let {id} = useParams();

  const [userData, setUserData] = useState([]);
  const [id, setID] = useState(null);
  const [certType, setcertType] = useState("");
  const [certIssuer, setCertIssuer] = useState("");
  const [certExpiration, setCertExpiration] = useState("");
  const [certDescription, setCertDescription] = useState("");
  const [certCode, setCertCode] = useState("");
  const [certLength, setCertLength] = useState("");
  const [daysUntilExpired, setDaysUntilExpired] = useState("");
  const [isExpired, setIsExpired] = useState(false);
  const [ownerID, setOwnerID] = useState("");

  useEffect(() => {
    setID(localStorage.getItem("Cert ID"));
    setcertType(localStorage.getItem("certType"));
    setCertIssuer(localStorage.getItem("certIssuer"));
    setCertExpiration(localStorage.getItem("certExpiration"));
    setCertDescription(localStorage.getItem("certDescription"));
    setCertCode(localStorage.getItem("certCode"));
    setCertLength(localStorage.getItem("certLength"));
    setDaysUntilExpired(localStorage.getItem("daysUntilExpired"));
    setIsExpired(localStorage.getItem("isExpired"));
    setOwnerID(localStorage.getItem("ownerID"));


    getUserData(ownerID);
    console.log('Current owner: ' + ownerID)
    console.log('UserData ' + userData)
 
  }, []);


  const getUserData = (id) => {
    axios.get(`http://localhost:8080/api/users/${id}`).then((getData) => {
      setUserData(getData.data);
    });
  };


  const updateAPIData = () => {
    axios
      .put(`http://localhost:8080/api/certs/${id}`, {
        certType,
        certIssuer,
        certExpiration,
        certDescription,
        certCode,
        certLength,
        daysUntilExpired,
        isExpired,
        userData,
      })
      .then(() => {
        history.push("/certs");
      });
  };
  return (
    <div>
      <Helmet>
        <title>Edit Cert - {certCode} </title>
      </Helmet>
      <Form className="create-form">
        <Form.Field>
          <label>Type</label>
          <input
          value={certType}
            placeholder="WSI"
            onChange={(e) => setcertType(e.target.value)}
          />
        </Form.Field>
        <Form.Field>
          <label>Issuer</label>
          <input
          value={certIssuer}
            placeholder="American Red Cross"
            onChange={(e) => setCertIssuer(e.target.value)}
          />
        </Form.Field>
        <Form.Field>
          <label>Expiration Date</label>
          <input
          value={certExpiration}
            placeholder="2022-10-19"
            onChange={(e) => setCertExpiration(e.target.value)}
          />
        </Form.Field>

        <Form.Field>
          <label>Description</label>
          <input
          value={certDescription}
            placeholder="Water Safety Instructor"
            onChange={(e) => setCertDescription(e.target.value)}
          />
        </Form.Field>
        <Form.Field>
          <label>Cert Code</label>
          <input
          value={certCode}
            placeholder="H3JW8W"
            onChange={(e) => setCertCode(e.target.value)}
          />
        </Form.Field>
        <Form.Field>
          <label>Duration</label>
          <input
          value={certLength}
            placeholder="2 Years"
            onChange={(e) => setCertLength(e.target.value)}
          />
        </Form.Field>

        <Form.Field>
          <label>Owner ID</label>
          <input
          value={ownerID}
          placeholder="0" 
          onChange={(e) => setOwnerID(e.target.value)} />
        </Form.Field>

        <Button color="blue" onClick={updateAPIData} type="submit">
          Update Cert
        </Button>
      </Form>
    </div>
  );
}
