import React from "react";
import { useNavigate } from "react-router-dom";
import { Row, Col, Card, Button } from "react-bootstrap";

const InicioPastoral = () => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/pastor/ficha-pastoral");
  };

  return (
    <Row>
      <Col lg={12}>
        <Card>
          <Card.Header>
            <div className="col mt-3 text-right">
              <Row className="align-items-center">
                <Col>
                  <Card.Title className="mb-0">Inicio Pastoral</Card.Title>
                </Col>
              </Row>
            </div>
          </Card.Header>
          <Card.Body>
            <div className="text-center">
              <Button onClick={handleNavigate} variant="primary">
                Ir a Ficha Pastoral
              </Button>
            </div>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default InicioPastoral;
