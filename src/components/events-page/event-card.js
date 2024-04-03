import React from 'react'
import { Card } from 'react-bootstrap';
import { FiClock, FiInfo, FiMapPin } from "react-icons/fi";
import "./event-card.scss";

const EventCard = ({image, title, time, location,description}) => {
  return (
    <Card className="event-card">
      <Card.Body>
        <div className="image">
          <Card.Img variant="top" src={`/images/events/${image}`} alt={title} className="img-fluid" />
        </div>
        <Card.Subtitle>
            <div><FiClock/> {time}</div>
            <div><FiMapPin/> {location}</div>
           
        </Card.Subtitle>
        <Card.Title>{title}</Card.Title>
        


        <Card.Subtitle>
           
            <div><FiInfo/>
      <span> {description}</span> </div>

           
        </Card.Subtitle>



      </Card.Body>
    </Card>
  )
}

export default EventCard