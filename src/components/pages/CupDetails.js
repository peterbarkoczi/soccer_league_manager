import React from "react";
import {ListGroup} from "react-bootstrap";

const CupDetails = (props) => {
    return (
        <div>
            <h1>{props.location.cup.name}</h1>
            <ListGroup>
                {props.location.cup.teams.map(team => (
                    <ListGroup.Item>{team.teamName}</ListGroup.Item>
                    )
                )}

            </ListGroup>
        </div>

    )
}

export default CupDetails;