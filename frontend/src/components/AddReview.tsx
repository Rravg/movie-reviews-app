import React, { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { Link, useLocation, useParams } from "react-router-dom";
import { useAppSelector } from "../hooks";
import MovieDataService from "../services/MovieDataService";

interface State {
  currentReview: Review;
}

type Review = {
  date: string;
  movie_id: string;
  name: string;
  review: string;
  user_id: string;
  _id: string;
};

interface Data {
  review: string;
  name: string | undefined;
  user_id: string | undefined;
  movie_id: string | undefined;
  review_id?: string | undefined;
}
function AddReview() {
  let editing: boolean = false;
  let initialReviewState: string = "";

  let location = useLocation();
  let state: State = location.state as State;

  if (state && state.currentReview) {
    editing = true;
    initialReviewState = state.currentReview.review;
  }

  const [review, setReview] = useState<string>(initialReviewState);
  const [submitted, setSubmitted] = useState<boolean>(false);

  const user = useAppSelector((state) => state.user.value);
  const { id } = useParams();

  const onChangeReview = (e: React.ChangeEvent<HTMLInputElement>) => {
    const review = e.target.value;
    setReview(review);
  };

  const saveReview = () => {
    let data: Data = {
      review: review,
      name: user?.name,
      user_id: user?.id,
      movie_id: id,
    };
    if (editing) {
      data.review_id = state.currentReview._id;
      MovieDataService.updateReview(data)
        .then((response) => {
          setSubmitted(true);
          console.log(response.data);
        })
        .catch((e) => console.log(e));
    } else {
      MovieDataService.createReview(data)
        .then((response) => {
          setSubmitted(true);
        })
        .catch((e) => console.log(e));
    }
  };

  return (
    <div>
      <Container>
        {submitted ? (
          <div>
            <h4>Review submitted successfully</h4>
            <Link to={"/movies/" + id}>Back to Movie</Link>
          </div>
        ) : (
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>{editing ? "Edit" : "Create"} Review</Form.Label>
              <Form.Control
                type="text"
                required
                value={review}
                onChange={onChangeReview}
              />
            </Form.Group>
            <Button variant="primary" onClick={saveReview}>
              Submit
            </Button>
          </Form>
        )}
      </Container>
    </div>
  );
}

export default AddReview;
