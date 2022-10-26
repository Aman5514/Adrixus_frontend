import React from "react";
import Styled from "styled-components";
import {
  Input,
  Image,
  InputRightElement,
  Button,
  InputGroup,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);
  const toast = useToast();
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false);
  const [loginData, setLoginData] = React.useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const loginRequest = async () => {
    try {
      setLoading(true);
      const response = await axios.post(
        "https://adrixus-server.herokuapp.com/api/auth/login",
        loginData
      );
      if (response.status === 200) {
        toast({
          title: response.data.message,
          description: "Redirecting to main page ",
          status: "success",
          duration: 2000,
        });
        setTimeout(() => {
          navigate("/dashboard");
          setLoading(false);
        }, 1000);
      }
    } catch (error) {
      toast({
        title: error.response.data.message,
        status: "error",
        duration: 2000,
      });
      setLoading(false);
    }
  };

  return (
    <LoginWrapper>
      <LoginContainer>
        <Image src="https://adrixus.com/images/logo.png" alt="Adrixus Logo" />
        <Input
          placeholder="Email Address"
          size="md"
          variant="filled"
          onChange={handleChange}
          name="email"
          required
        />
        <InputGroup size="md">
          <Input
            pr="4.5rem"
            variant="filled"
            type={show ? "text" : "password"}
            placeholder="Enter password"
            onChange={handleChange}
            name="password"
            required
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
        <Button
          colorScheme="green"
          variant="solid"
          width="full"
          isLoading={loading}
          onClick={loginRequest}
        >
          Sign in
        </Button>
        <Button
          colorScheme="gray"
          variant="outline"
          width="full"
          onClick={() => {
            navigate("/sign-up");
          }}
        >
          Sign up
        </Button>
      </LoginContainer>
    </LoginWrapper>
  );
};

export default Login;

const LoginWrapper = Styled("div")`
display:flex;
justify-content:center;
align-items:center;
height:100vh;
`;

const LoginContainer = Styled(LoginWrapper)`
flex-direction:column;
width: 450px;
gap:25px;
margin-bottom: 10vh;
`;
