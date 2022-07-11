import { Button } from "react-bootstrap";
import { useAppSelector, useAppDispatch } from "../hooks";
import { login } from "../reducers/userSlice";

function Login() {
  const user = useAppSelector((state) => state.user.value);
  const dispatch = useAppDispatch();

  const handleClick = () => {
    dispatch(login(!user));
  };

  return (
    <div>
      <Button variant="primary" onClick={handleClick}>
        Login
      </Button>
    </div>
  );
}

export default Login;
