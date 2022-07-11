import React, { useState, useEffect } from "react";
import MovieDataService from "../services/MovieDataService";
import { Link, useParams } from "react-router-dom";
import { Col, Container, Row, Image, Card } from "react-bootstrap";
import { useAppSelector } from "../hooks";

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
    console.log("id is: ", id);
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
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Movie;
