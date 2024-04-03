import React from 'react';
import { Card } from 'react-bootstrap';
import { FiUser, FiTrendingUp } from "react-icons/fi";
import "./book-detail.scss";


const BookDetail = ({ image, title, author, description }) => {
  return (
    <Card className="book-detail-container">
      <Card.Body>
        <div className="image">
          <Card.Img variant="top" src={`/images/library/${image}`} alt={title} className="img-fluid book-detail-image" />
        </div>
        <Card.Title className="book-detail-title">{title}</Card.Title>
        <div><FiUser /> <span className="book-detail-author">{author}</span></div>
        <Card.Subtitle className="book-detail-description">
          <div><FiTrendingUp /> {description}</div>
        </Card.Subtitle>
      </Card.Body>
    </Card>
  );
};

export default BookDetail;
