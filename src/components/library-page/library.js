import React, { useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import libraryData from '../../helpers/data/library.json';
import LibraryPage from './library-page';
import SearchOptionBar from '../../pages/SearchOptionsBar';
import OtherBooksInTheSameCategory from "../../components/library-page/OtherBooksInTheSameCategory";

const Library = () => {
  const [filteredLibrary, setFilteredLibrary] = useState(libraryData);

  const handleSearch = (term) => {
    const filtered = libraryData.filter((book) =>
      book.title.toLowerCase().includes(term.toLowerCase()) ||
      book.author.toLowerCase().includes(term.toLowerCase()) ||
      book.description.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredLibrary(filtered);
  };

  return (
    <Container>
      <SearchOptionBar onSearch={handleSearch} />
      <Row className="row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4 g-5">
        {filteredLibrary.map((book) => (
          <Col key={book.id}>
            <a href={`/book/${book.id}`}>
              <LibraryPage {...book} />
            </a>
          </Col>
        ))}
      </Row>
      <OtherBooksInTheSameCategory />
    </Container>
  );
};

export default Library;
