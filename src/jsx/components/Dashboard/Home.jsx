import { Row, Col, Card, Button } from "react-bootstrap";
import React, { Fragment, useState, useEffect } from "react";

const Home = () => {

	  useEffect(() => {

	}, []);
	

	return(
		<>
    <Fragment>
      <Row>
        <Col lg={12}>
          <Card>
            <Card.Header>
              <Card.Title>
                <Button className="me-2" variant="info btn-rounded" >
                  <span className="btn-icon-start text-info">
                    <i className="fa fa-plus color-info" />
                  </span>
                  Lista de Usuarios
                </Button>
              </Card.Title>
            </Card.Header>
            <Card.Body>
				<div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis incidunt minima labore nulla eveniet repellat illum sapiente dicta provident. Quae ipsum dolorem commodi exercitationem enim qui odio nemo corrupti ad?</div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Fragment>
		</>
	)
}
export default Home;