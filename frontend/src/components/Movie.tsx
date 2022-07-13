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
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    getMovie(id);
  }, [id]);

  const deleteReview = (reviewId: string, index: number) => {
    MovieDataService.deleteReview(reviewId, user?.id)
      .then((response) => {
        setMovie((state: any) => {
          state.reviews.splice(index, 1);
          return { ...state };
        });
      })
      .catch((e) => console.log(e));
  };

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
            {movie.reviews.map((review: any, index: number) => {
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
                        <Button
                          variant="link"
                          onClick={() => deleteReview(review._id, index)}
                        >
                          Delete
                        </Button>
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
