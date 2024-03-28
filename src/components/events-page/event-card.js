import React from 'react'
import { Card } from 'react-bootstrap';

import "./event-card.scss";

const EventCard = ({image, title, time, location}) => {
  return (
    <Card className="event-card">
      <Card.Body>
        <div className="image">
          <Card.Img variant="top" src={`/images/events/${image}`} alt={title} className="img-fluid" />
        </div>

        <Card.Title>{title}</Card.Title>
        
      </Card.Body>
    </Card>
  )
}

export default EventCard