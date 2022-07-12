import React, { useState } from "react";
import { Button, Form, Container } from "react-bootstrap";
import { useNavigate } from "react-router";
import { useAppDispatch } from "../hooks";
import { login } from "../reducers/userSlice";

function Login(props: any) {
  const dispatch = useAppDispatch();

  const [name, setName] = useState("");
  const [id, setId] = useState("");

  const navigate = useNavigate();

  const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    setName(name);
  };

  const onChangeId = (e: React.ChangeEvent<HTMLInputElement>) => {
    const id = e.target.value;
    setId(id);
  };

  const handleClick = () => {
    dispatch(login({ name: name, id: id }));
    navigate("/", { replace: true });
  };

  return (
    <div>
      <Container>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter username"
              required
              value={name}
              onChange={onChangeName}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>ID</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter ID"
              required
              value={id}
              onChange={onChangeId}
            />
          </Form.Group>
          <Button variant="primary" onClick={handleClick}>
            Submit
          </Button>
        </Form>
      </Container>
    </div>
  );
}

export default Login;
