import React, {useEffect, useState} from "react";
import axios from "axios";
import {Table, Button, Form} from "react-bootstrap";

const AdminUsersPage = () => {

    const [users, setUsers] = useState([]);
    const [teams, setTeams] = useState([]);
    const [editable, setEditable] = useState("");
    const [value, setValue] = useState("");

    const getUsers = axios.get(`http://localhost:8080/auth/getUsers`)
    const getTeams = axios.get(`http://localhost:8080/teams/all`)

    useEffect(() => {
        axios.all([getUsers, getTeams])
            .then(axios.spread((...response) => {
                setUsers(response[0].data);
                setTeams(response[1].data);
            }));
    }, [])

    const getTeamName = (teamId) => {
        if (teams.length !== 0) {
            let team = teams.find(element => element.id === teamId);
            return team.name;
        }
    }

    const setEditableCell = (cell, index, object) => {
        if (editable !== cell + index) {
            setEditable(cell + index);
            setValue(object[cell]);
        }
    }

    const reset = () => {
        setEditable("");
    }

    return (
        <div id="adminPageTable">
            <h1>Admin Page</h1>
            <Table striped borderless responsive="md" hover size="sm">
                <colgroup>
                    <col className="adminPageIndex"/>
                    <col className="adminPageUsername"/>
                    <col className="adminPageRole"/>
                    <col className="adminPageTeam"/>
                    <col className="adminPageDelete"/>
                </colgroup>
                <thead>
                <tr>
                    <th>#</th>
                    <th>Felhasználónév</th>
                    <th>Regisztráció típusa</th>
                    <th>Csapat</th>
                    <th>Szerkesztés</th>
                </tr>
                </thead>
                <tbody>
                {users.map((user, index) => (
                    <tr>
                        <td>{++index}</td>
                        <td onClick={() => setEditableCell("username", index, user)}>
                            {editable === "username" + index ?
                                <Form>
                                    <Form.Group>
                                        <Form.Control
                                            type="text"
                                            placeholder={value}
                                            value={value}
                                            onChange={(e) => setValue(e.target.value)}/>
                                    </Form.Group>
                                    <Button
                                        size="sm"
                                        variant="success"
                                        onClick={() => {
                                            console.log(value);
                                            reset();
                                        }}>Mentés</Button>
                                </Form> : user["username"]}
                        </td>
                        <td onClick={() => setEditableCell("role", index, user)}>
                            {editable === "role" + index ?
                                <Form>
                                    <Form.Group>
                                        <Form.Control
                                            as="select"
                                            onChange={(e) => console.log(e.target.value)}>
                                            <option label={value} style={{color: "green"}}/>
                                            {["admin", "referee", "coach"].map((role) => (
                                                <option
                                                    label={role}
                                                    value={role}
                                                />
                                            ))}
                                        </Form.Control>
                                    </Form.Group>
                                    <Button
                                        size="sm"
                                        variant="success"
                                        onClick={() => {
                                            console.log(value);
                                            reset();
                                        }}>Mentés</Button>
                                </Form> : user["role"]}
                        </td>
                        <td onClick={() => setEditableCell("teamId", index, user)}>
                            {editable === "teamId" + index && user["teamId"] !== null ?
                                <Form>
                                    <Form.Group>
                                        <Form.Control
                                            as="select"
                                            onChange={(e) => console.log(e.target.value)}>
                                            <option label={getTeamName(value)}/>
                                            {teams.map((team) => (
                                                <option label={team.name} value={team.id}/>
                                            ))}
                                        </Form.Control>
                                    </Form.Group>
                                    <Button
                                        size="sm"
                                        variant="success"
                                        onClick={() => {
                                            console.log(value);
                                            reset();
                                        }}>Mentés</Button>
                                </Form> : user["teamId"] !== null ? getTeamName(user["teamId"]) : ""}
                        </td>
                        <td>
                            <Button  style={{background: "red", fontSize:"75%", border:"2px solid #d3d3d3"}}>Törlés</Button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </Table>
        </div>
    )
}

export default AdminUsersPage;