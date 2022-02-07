import axios from "axios";
import React, { useEffect, useState } from "react";
import { Table, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

export default function UserList() {
  const [APIData, setAPIData] = useState([]);
  useEffect(() => {
    // `https://60fbca4591156a0017b4c8a7.mockapi.io/fakeData
    axios.get(`http://localhost:8080/api/users`).then((response) => {
      console.log(response.data);
      setAPIData(response.data);
    });
  }, []);

  // const setData = (id) => {
  //   sessionStorage.setItem("currentUserID", JSON.stringify(id));
  // };

  const setData = (data) => {
    let { id, firstName, lastName, email, isAdmin, certs } = data;
    sessionStorage.setItem("id", id);
    sessionStorage.setItem("First Name", firstName);
    sessionStorage.setItem("Last Name", lastName);
    sessionStorage.setItem("Email", email);
    sessionStorage.setItem("User Type", isAdmin);
    sessionStorage.setItem("Certs", certs);
  };

  const getData = () => {
    axios.get(`http://localhost:8080/api/users`).then((getData) => {
      setAPIData(getData.data);
    });
  };

  const onDelete = (id) => {
    axios.delete(`http://localhost:8080/api/users/${id}`).then(() => {
      getData();
    });
  };

  return (
    <div className="userList">
      <Helmet>
      <title>Users</title>
      </Helmet>
        <Table singleLine>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>ID</Table.HeaderCell>
              <Table.HeaderCell>First Name</Table.HeaderCell>
              <Table.HeaderCell>Last Name</Table.HeaderCell>
              <Table.HeaderCell>Email</Table.HeaderCell>
              <Table.HeaderCell>Role</Table.HeaderCell>

              <Table.HeaderCell>Actions</Table.HeaderCell>
              <Table.HeaderCell></Table.HeaderCell>
              <Table.HeaderCell></Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {APIData.map((data) => {
              return (
                <Table.Row key={data.id}>
                  <Table.Cell>{data.id}</Table.Cell>
                  <Table.Cell>{data.firstName}</Table.Cell>
                  <Table.Cell>{data.lastName}</Table.Cell>
                  <Table.Cell>{data.email}</Table.Cell>
                  <Table.Cell>{data.isAdmin ? "Admin" : "Standard"}</Table.Cell>

                  {/* <Link to="/users/:id">
                    <Table.Cell>
                      <Button color="orange" onClick={() => setData(data.id)}>
                        View
                      </Button>
                    </Table.Cell>
                  </Link> */}

                  <Link to="/user/certs">
                    <Table.Cell>
                      <Button color="green" onClick={() => setData(data)}>
                        Certs
                      </Button>
                    </Table.Cell>
                  </Link>

                  <Link to="/users/:id">
                    <Table.Cell>
                      <Button color="pink" onClick={() => setData(data)}>
                        View
                      </Button>
                    </Table.Cell>
                  </Link>

                  <Link to="/edituser">
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
