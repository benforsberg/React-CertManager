import axios from "axios";
import React, { useEffect, useState } from "react";
import { Table, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

export default function CertList() {
  const [APIData, setAPIData] = useState([]);
  const [userData, setUserData] = useState([]);
  useEffect(() => {
    axios.get(`http://localhost:8080/api/certs`).then((response) => {
      console.log(response.data);
      setAPIData(response.data);
    });
  }, []);

  const setData = (data) => {
    let {
      id,
      certType,
      certIssuer,
      certExpiration,
      certDescription,
      certCode,
      certLength,
      daysUntilExpired,
      isExpired,
      ownerID,
    } = data;
    localStorage.setItem("Cert ID", id);
    localStorage.setItem("certType", certType);
    localStorage.setItem("certIssuer", certIssuer);
    localStorage.setItem("certExpiration", certExpiration);
    localStorage.setItem("certDescription", certDescription);
    localStorage.setItem("certCode", certCode);
    localStorage.setItem("certLength", certLength);
    localStorage.setItem("daysUntilExpired", daysUntilExpired);
    localStorage.setItem("isExpired", isExpired);
    localStorage.setItem("ownerID", ownerID);

  };

  const getData = () => {
    axios.get(`http://localhost:8080/api/certs`).then((getData) => {
      setAPIData(getData.data);
    });
  };

  const onDelete = (id) => {
    axios.delete(`http://localhost:8080/api/certs/${id}`).then(() => {
      getData();
    });
  };

  // const getUser = (id) => {
  //   axios.get(`http://localhost:8080/api/users/${id}`).then((getUser) => {
  //     setUserData(getUser.data);
  //   });
  // };

  return (
    <div className="certList">
      <Helmet>
        <title>Certs</title>
      </Helmet>
      <Table singleLine>
        <Table.Header>
          <Table.Row>
          <Table.HeaderCell>ID</Table.HeaderCell>
            <Table.HeaderCell>Type</Table.HeaderCell>
            <Table.HeaderCell>Issuer</Table.HeaderCell>
            <Table.HeaderCell>Expiration</Table.HeaderCell>
            <Table.HeaderCell>Description</Table.HeaderCell>
            <Table.HeaderCell>Certcode</Table.HeaderCell>
            <Table.HeaderCell>Duration</Table.HeaderCell>
            <Table.HeaderCell>Days Remaining</Table.HeaderCell>
            <Table.HeaderCell>Status</Table.HeaderCell>
            <Table.HeaderCell>Owner ID</Table.HeaderCell>

            <Table.HeaderCell></Table.HeaderCell>
            <Table.HeaderCell></Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {APIData.map((data) => {
            return (
              <Table.Row key={data.id}>
                <Table.Cell>{data.id}</Table.Cell>
                <Table.Cell>{data.certType}</Table.Cell>
                <Table.Cell>{data.certIssuer}</Table.Cell>
                <Table.Cell>{data.certExpiration}</Table.Cell>
                <Table.Cell>{data.certDescription}</Table.Cell>
                <Table.Cell>{data.certCode}</Table.Cell>
                <Table.Cell>{data.certLength}</Table.Cell>
                <Table.Cell>{data.daysUntilExpired}</Table.Cell>
                <Table.Cell>{data.isExpired ? "Expired" : "Valid"}</Table.Cell>
                <Table.Cell>{data.ownerID}</Table.Cell>
                <Link to='/editcert/${data.id}'>
                  <Table.Cell>
                    <Button color="blue" onClick={() => setData(data)}>
                      Edit
                    </Button>
                  </Table.Cell>
                </Link>
                <Table.Cell>
                  <Button color="red" onClick={() => onDelete(data.id)}>
                    Delete
                  </Button>
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
    </div>
  );
}
