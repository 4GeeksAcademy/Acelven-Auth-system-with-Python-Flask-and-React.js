import Card from "react-bootstrap/Card";
import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import context from "react-bootstrap/esm/AccordionContext";
import { Context } from "../store/appContext";

function Private() {
  const { store, actions } = useContext(Context);
  const history = useNavigate();

  useEffect(() => {
    if (!store.token || store.token === "" || store.token === undefined) {
      history("/"); // Replace "public" with the desired URL for the opposite scenario
    }
  }, [store.token, history]);
  return (
    <div className="privateCard">
      <Card style={{ width: "18rem" }}>
        <Card.Body>
          <Card.Title>Card Title</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            Card Subtitle
          </Card.Subtitle>
          <Card.Text>
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </Card.Text>
          <Card.Link href="#">Card Link</Card.Link>
          <Card.Link href="#">Another Link</Card.Link>
        </Card.Body>
      </Card>
    </div>
  );
}

export default Private;
