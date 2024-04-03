import React from 'react';
import { Card } from 'react-bootstrap';
import { FiUser, FiTrendingUp } from 'react-icons/fi';
import { Link } from 'react-router-dom'; // React Router kullanılarak bağlantı eklendi
import './library-page.scss';
import "../../helpers/data/library.json"

const LibraryPage = ({ id, image, title, author, description }) => {
  return (
    <Card className="library-page">
      <Card.Body>
        <div className="image">
          {/* Her kitap için ayrıntıları görüntülemek için Link bileşeni eklendi */}
          <Link to={`/book/${id}`} className="book-link">
            <Card.Img variant="top" src={`/images/library/${image}`} alt={title} className="img-fluid" />
          </Link>
        </div>
        <Card.Title>{title}</Card.Title>
        <div><FiUser /> {author}</div>
        <Card.Subtitle>
          <div><FiTrendingUp /> {description}</div>
        </Card.Subtitle>
      </Card.Body>
    </Card>
  );
};

export default LibraryPage;
