import React from 'react'
import { Col, Container, Image, Row } from 'react-bootstrap'
import "./welcome.scss";
 
const Welcome = () => {
  return (
    <div className="welcome">
        <Container>
            <Row className="g-5">
                <Col md={6}>
                    <Image src="/images/about/welcome.png" className="img-fluid"/>
                </Col>
                <Col md={6}>
                   
                    <h2 className="mb-3">Bir Bilgi Merkezi</h2>
                    <p className="mb-3">comer; eğitimi, kişisel gelişimi ve toplumsal zenginleşmeyi destekler. Tutkulu ve profesyonel kadromuz, kitap, medya ve kütüphane kaynaklarından oluşan koleksiyonumuzu keşfetmenize yardımcı olmak için buradalar.</p>

                    <ul>
                        <li>Her kitap, bir hikayenin kapısıdır.</li>
                        <li>Kitaplarla yolculuğa çık, sınırlarını keşfet.</li>
                        <li>Hands-on training and real-world projects for practical experience.</li>
                        <li>Earn industry-recognized certifications for enhanced employability.</li>
                    </ul>
                </Col>
            </Row>
        </Container>

    </div>
  )
}

export default Welcome