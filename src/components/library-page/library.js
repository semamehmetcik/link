import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import library from "../../helpers/data/library.json";
import LibraryPage from "./course-card";

const Library = () => {
  return (
    <Container>
      <Row className="row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-5">
        {library.map((library) => (
          <Col key={library.id}>
            <LibraryPage {...library} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Library;