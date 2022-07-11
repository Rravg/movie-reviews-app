import React, { useState, useEffect } from "react";
import MovieDataService from "../services/MovieDataService";
import { Link } from "react-router-dom";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";

function MoviesList(props: any) {
  const [movies, setMovies] = useState<any>([]);
  const [searchTitle, setSearchTitle] = useState<string>("");
  const [searchRating, setSearchRating] = useState<string>("");
  const [ratings, setRatings] = useState<string[]>(["All"]);

  useEffect(() => {
    retrieveMovies();
    retrieveRatings();
  }, []);

  const retrieveMovies = () => {
    MovieDataService.getAll()
      .then((response) => {
        console.log(response.data);
        setMovies(response.data.movies);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const retrieveRatings = () => {
    MovieDataService.getRatings()
      .then((response) => {
        console.log(response.data);
        setRatings(["All"].concat(response.data));
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const onChangeSearchTitle = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const title = e.target.value;
    setSearchTitle(title);
  };

  const onChangeSearchRating = (
    e: React.ChangeEvent<HTMLSelectElement>
  ): void => {
    const rating = e.target.value;
    setSearchRating(rating);
  };

  const find = (query: string, by: string) => {
    MovieDataService.find(query, by)
      .then((response) => {
        console.log(response);
        setMovies(response.data.movies);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const findByTitle = () => {
    find(searchTitle, "title");
  };

  const findByRating = () => {
    if (searchRating === "All") {
      retrieveMovies();
    } else {
      find(searchRating, "rated");
    }
  };

  return (
    <div className="App">
      <Container>
        <Form>
          <Row className="mb-3">
            <Col>
              <Form.Group className="mb-2 mt-3" controlId="titleForm">
                <Form.Control
                  type="text"
                  placeholder="Search by title."
                  value={searchTitle}
                  onChange={onChangeSearchTitle}
                />
                <Form.Text className="text-muted">
                  Find your favorite titles.
                </Form.Text>
              </Form.Group>
              <Button variant="primary" type="button" onClick={findByTitle}>
                Search
              </Button>
            </Col>

            <Col>
              <Form.Group className="mb-2 mt-3" controlId="titleForm">
                <Form.Select onChange={onChangeSearchRating}>
                  {ratings.map((rating, index) => {
                    return (
                      <option value={rating} key={index}>
                        {rating}
                      </option>
                    );
                  })}
                </Form.Select>
                <Form.Text className="text-muted">
                  Find your movies by rating.
                </Form.Text>
              </Form.Group>
              <Button variant="primary" type="button" onClick={findByRating}>
                Search
              </Button>
            </Col>
          </Row>

          <Row>
            {movies.map((movie: any) => {
              return (
                <Col>
                  <Card style={{ width: "18rem" }}>
                    <Card.Img src={movie.poster + "/100px180"} />
                    <Card.Body>
                      <Card.Title>{movie.title}</Card.Title>
                      <Card.Text>Rating: {movie.rated}</Card.Text>
                      <Card.Text>{movie.plot}</Card.Text>
                      <Link to={"/movies/" + movie._id}>View Reviews</Link>
                    </Card.Body>
                  </Card>
                </Col>
              );
            })}
          </Row>
        </Form>
      </Container>
    </div>
  );
}

export default MoviesList;
