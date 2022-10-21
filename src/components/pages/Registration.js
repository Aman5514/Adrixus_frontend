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
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);
  const navigate = useNavigate();

  return (
    <RegistrationWrapper>
      <RegistrationContainer>
        <Title>Registration</Title>
        <Input
          placeholder="First Name"
          size="md"
          variant="filled"
          // onChange={handleChange}
          name="firstName"
        />
        <Input
          placeholder="Last Name"
          size="md"
          variant="filled"
          // onChange={handleChange}
          name="lastName"
        />
        <Input
          placeholder="Email Address"
          size="md"
          variant="filled"
          // onChange={handleChange}
          name="email"
        />
        <InputGroup size="md">
          <Input
            pr="4.5rem"
            variant="filled"
            type={show ? "text" : "password"}
            placeholder="Enter password"
            // onChange={handleChange}
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
          // onClick={loginRequest}
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

const RegistrationContainer = Styled(RegistrationWrapper)`
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
