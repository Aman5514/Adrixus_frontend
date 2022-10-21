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
import { useNavigate } from "react-router-dom";
import axios from "axios";
const Registration = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const [show, setShow] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [registrationData, setRegistrationData] = React.useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleClick = () => setShow(!show);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegistrationData({ ...registrationData, [name]: value });
  };

  const registerNewUser = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post(
        "https://adrixus-server.herokuapp.com/api/auth/registration",
        registrationData
      );
      if (response.status === 201) {
        toast({
          title: response.data.message,
          description: "Redirecting to login page",
          status: "success",
          duration: 2000,
        });
        setTimeout(() => {
          navigate("/");
        }, 1000);
        setLoading(false);
      }
    } catch (error) {
      toast({
        title: error.message,
        status: "error",
        duration: 2000,
      });
      setLoading(false);
    }
  };

  return (
    <RegistrationWrapper>
      <RegistrationContainer onSubmit={(e) => registerNewUser(e)}>
        <Title>Registration</Title>
        <Input
          placeholder="First Name"
          size="md"
          variant="filled"
          onChange={handleChange}
          name="firstName"
          required
        />
        <Input
          placeholder="Last Name"
          size="md"
          variant="filled"
          onChange={handleChange}
          name="lastName"
          required
        />
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
          disabled={loading}
          type="submit"
        >
          Register
        </Button>
        <Button
          colorScheme="gray"
          variant="solid"
          width="full"
          onClick={() => {
            navigate("/");
          }}
        >
          Back to login
        </Button>
      </RegistrationContainer>
    </RegistrationWrapper>
  );
};

export default Registration;

const RegistrationWrapper = Styled("div")`
display:flex;
justify-content:center;
align-items:center;
height:100vh;
`;

const RegistrationContainer = Styled("form")`
display:flex;
justify-content:center;
align-items:center;
flex-direction:column;
width: 450px;
gap:25px;
margin-bottom: 10vh;
`;

const Title = Styled("h1")`
font-size:1.8rem;
font-weight:600;
letter-spacing:1px;
`;
