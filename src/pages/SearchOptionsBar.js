// searchOptionBar.jsx
import React, { useState } from 'react';
import { Form, InputGroup } from 'react-bootstrap';
import { FiSearch } from 'react-icons/fi';
import "./SearchOptionsBar.scss";


const SearchOptionsBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <InputGroup className="mb-3">
        <Form.Control
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleChange}
        />
        <InputGroup.Text>
          <FiSearch />
        </InputGroup.Text>
      </InputGroup>
    </Form>
  );
};

export default SearchOptionsBar;
