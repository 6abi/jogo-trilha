import React from "react";
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';


function Piece(props) {
    return (
        <Button
            variant={props.variant + " rounded-circle"}
            onClick={props.onClick}
            id={"point" + props.point}
            style={{
                height: "50%",
                width: "50%",
                display: "inline-block",
                border: "2px solid gray",
                margin: "25% 25% 25% 25%",
                opacity: "1"}}
        >
        </Button>
    );
}

export default Piece

