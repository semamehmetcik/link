import React from "react";
import { Col, Container, Image, Row } from "react-bootstrap";
import "./welcome.scss";

const Welcome = () => {
  return (
    <div className="welcome">
      <Container>
        <Row className="g-5">
          <Col md={6}>
            <Image
              src="/images/about/welcome.png"
              className="img-fluid welcome-image"
              alt="Welcome image"
            />
          </Col>
          <Col md={6}>
            <h2>Welcome To Library</h2>
            <p>
              Comer; eğitimi, kişisel gelişimi ve toplumsal zenginleşmeyi
              destekler. Tutkulu ve profesyonel kadromuz, kitap, medya ve
              kütüphane kaynaklarından oluşan koleksiyonumuzu keşfetmenize
              yardımcı olmak için buradalar.
            </p>
            <ul>
              <li>Bilgi susuzluğunu giderin</li>
              <li>Kitapların dünyasını keşfedin</li>
              <li>İç benliğinizle bağlantı kurun</li>
              <li>Zihnizi besleyin</li>
            </ul>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Welcome;