import React, { useState, useEffect } from "react";
import MovieDataService from "../services/MovieDataService";
import { Link, useParams } from "react-router-dom";
import { Col, Container, Row, Image, Card, Button } from "react-bootstrap";
import { useAppSelector } from "../hooks";
import moment from "moment";

function Movie(props: any) {
  const [movie, setMovie] = useState<any>({
    id: null,
    title: "",
    rated: "",
    reviews: [],
  });

  const user = useAppSelector((state) => state.user.value);
  const { id } = useParams();

  const getMovie = (id: any) => {
    MovieDataService.get(id)
      .then((response) => {
        setMovie(response.data);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    getMovie(id);
  }, [id]);

  return (
    <div>
      <Container>
        <Row>
          <Col>
            <Image src={movie.poster + "/100px250"} fluid />
          </Col>

          <Col>
            <Card>
              <Card.Header as="h5">{movie.title}</Card.Header>
              <Card.Body>
                <Card.Text>{movie.plot}</Card.Text>
                {user && (
                  <Link to={"/movies/" + id + "/review"}>Add Review</Link>
                )}
              </Card.Body>
            </Card>
            <br></br>
            <h2>Reviews</h2>
            <br></br>
            {movie.reviews.map((review: any, index: any) => {
              return (
                <Card key={index}>
                  <Card.Title>
                    {review.name +
                      " reviewed on " +
                      moment(review.date).format("Do MMMM YYYY")}
                  </Card.Title>
                  <Card.Text>{review.review}</Card.Text>
                  {user && user.id === review.user_id && (
                    <Row>
                      <Col>
                        <Link
                          to={"/movies/" + id + "/review"}
                          state={{ currentReview: review }}
                        >
                          Edit
                        </Link>
                      </Col>
                      <Col>
                        <Button variant="link">Delete</Button>
                      </Col>
                    </Row>
                  )}
                </Card>
              );
            })}
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Movie;
