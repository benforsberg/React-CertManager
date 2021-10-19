import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Table, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

export default function UserList() {
    const [APIData, setAPIData] = useState([]);
    useEffect(() => {
        // `https://60fbca4591156a0017b4c8a7.mockapi.io/fakeData
        axios.get(`http://192.168.1.25:8080/api/users`)
            .then((response) => {
                console.log(response.data)
                setAPIData(response.data);
            })
    }, []);

    const setData = (data) => {
        let { id, firstName, lastName, email, isAdmin } = data;
        localStorage.setItem('ID', id);
        localStorage.setItem('First Name', firstName);
        localStorage.setItem('Last Name', lastName);
        localStorage.setItem('Email', email);
        localStorage.setItem('isAdmin', isAdmin)
    }

    const getData = () => {
        axios.get(`http://192.168.1.25:8080/api/users`)
            .then((getData) => {
                setAPIData(getData.data);
            })
    }

    const onDelete = (id) => {
        axios.delete(`http://192.168.1.25:8080/api/users/${id}`)
        .then(() => {
            getData();
        })
    }

    return (
        <div className="userList">
            <Table singleLine>
                <Table.Header>
                    <Table.Row>
                    <Table.HeaderCell>ID</Table.HeaderCell>
                        <Table.HeaderCell>First Name</Table.HeaderCell>
                        <Table.HeaderCell>Last Name</Table.HeaderCell>
                        <Table.HeaderCell>Email</Table.HeaderCell>
                        <Table.HeaderCell>User Type</Table.HeaderCell>

                        <Table.HeaderCell>Update</Table.HeaderCell>
                        <Table.HeaderCell>Delete</Table.HeaderCell>
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
                                
                                <Link to='/edituser'>
                                    <Table.Cell> 
                                        <Button color="blue" onClick={() => setData(data)}>Edit</Button>
                                    </Table.Cell>
                                </Link>
                                <Table.Cell>
                                    <Button color="red" onClick={() => onDelete(data.id)}>Delete</Button>
                                </Table.Cell>
                            </Table.Row>
                        )
                    })}
                </Table.Body>
            </Table>
        </div>
    )
}
