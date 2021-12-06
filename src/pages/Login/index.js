import React, { useState } from 'react';
import { ENDPOINTS, endpointURL } from '../../api/index';
import { parsedJwtReturn } from '../cookieReader';
import { DisconnectionLogout, UserLogout } from '../Logout';
import styled, {keyframes} from 'styled-components'
import './styles.css';

const move = keyframes`
0%{
    opacity:0;

}
95%{
    opacity:1;2

}

`;
const BackgroundBox = styled.div`
  background-color: #beeefb;
  height: 50vh;
  width: 50%;

  display: flex;
  justify-content: center;
  align-items: center;

  margin: 15rem auto;

  position: relative;
  border-radius: 23px;
  border: 1px solid #053271;

  .text1 {
    z-index: ${(props) => (props.clicked ? "-700" : "700")};
    transform: ${(props) =>
      props.clicked ? "translateX(0)" : "translateX(100%)"};
    transition: transform 1s ease-in-out;
    animation: ${(props) => (props.clicked ? move : "none")} 1.5s;
  }

  .text2 {
    z-index: ${(props) => (props.clicked ? "700" : "-700")};
    animation: ${(props) => (props.clicked ? "none" : move)} 1.5s;

    transform: ${(props) =>
      props.clicked ? "translateX(-100%)" : "translateX(0%)"};
    transition: transform 1s ease-in-out;
  }

  .signin {
    position: absolute;
    top: 0%;
    text-align: center;
    z-index: ${(props) => (props.clicked ? "-600" : "500")};
    transform: ${(props) => (props.clicked ? "none" : "translateX(-50%)")};
    transition: all 1s;
  }
  .signup {
    position: absolute;
    top: 0%;
    text-align: center;
    z-index: ${(props) => (props.clicked ? "500" : "-500")};
    transform: ${(props) => (props.clicked ? "translateX(50%)" : "none")};
    transition: all 1s;
  }
`;

const Box1 = styled.div`
  background-color: #f1fdcd;
  width: 49%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;

  transform: ${(props) =>
    props.clicked ? "translateX(90%)" : "translateX(10%)"};

  transition: transform 1s;

  &::after,
  &::before {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: #f1fdcd;

    z-index: -200;
  }

  &::before {
    top: 3rem;
    border-radius: 23px;
    border: 4px solid #053271;
  }

  &::after {
    bottom: 3rem;
    border-radius: 23px 23px 0 0;
    border-top: 4px solid #053271;
    border-right: 4px solid #053271;
    border-left: 4px solid #053271;
  }
`;

const Box2 = styled.div`
  background-color: #053271;
  width: 45%;
  height: 100%;
  position: absolute;
  right: 0;
  top: 0;

  z-index: 600;
  transform: ${(props) =>
    props.clicked ? "translateX(-122%)" : "translateX(0%)"};
  transition: transform 1s;

  border-radius: ${(props) =>
    props.clicked ? "23px 0 0 23px" : "0 23px 23px 0"};
`;

const Form = styled.form`
  color: #1b1b1b;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 0 5rem 0 4rem;

  /* z-index: 100; */
`;

const Main = styled.main`
  color: #1b1b1b;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 0 5.5rem 0 4rem;

  /* z-index: 100; */
`;

const Input = styled.input`
  background-color: #fff;
  border: none;
  border-bottom: 2px solid #053271;

  padding: 1rem;
  margin: 0.5rem;
  width: 100%;

  &:focus {
    outline: none;
    border: none;
    border: 2px solid #053271;
  }
`;

const Button = styled.button`
  border-radius: 3px;
  padding: 1rem 3.5rem;
  margin-top: 1rem;
  border: 1px solid black;
  background-color: black;
  color: #fff;
  text-transform: uppercase;
  cursor: pointer;
  letter-spacing: 1px;

  box-shadow: 0 7px #999;

  &:hover {
    background-color: #1b1b1b;
  }
  &:active {
    background-color: black;

    box-shadow: 0 5px #666;
    transform: translateY(4px);
  }

  &:focus {
    outline: none;
  }
`;

const Title = styled.h1`
  font-size: 3.5rem;
  margin-bottom: 2rem;
`;

const Link = styled.a`
  text-decoration: none;
  color: #333;
  font-size: 1.4rem;
  margin: 1rem 0;
`;

const ButtonAnimate = styled.button`
  position: absolute;
  z-index: 1000;
  height: 5rem;
  width: 5rem;
  top: 70%;
  border: none;
  cursor: pointer;

  right: ${(props) => (props.clicked ? "52%" : "42%")};

  transform: ${(props) => (props.clicked ? "rotate(360deg)" : "rotate(0)")};

  transition: all 1.5s;
  background-color: transparent;

  &::before {
    content: "😜";
    font-size: 4rem;
  }

  &:focus {
    outline: none;
  }
`;

const Text = styled.div`
  position: absolute;
  z-index: 1000;
  font-size: 1.5rem;
  display: flex;
  flex-direction: column;
  letter-spacing: 0.2rem;
  color: #fff;

  .attention {
    font-size: 2.5rem;
    position: relative;
    margin-top: 2rem;
  }

  .attention-icon {
    position: absolute;
    right: ${(props) => (props.clicked ? "0" : "none")};
    top: 100%;
    font-size: 5rem;
  }
`;

const Login = () => {
    const [click, setClick] = useState(false);
    const handleClick = () => setClick(!click);
    const [usernameIO, setUsername] = useState("");
    const [passwordIO, setPassword] = useState("");

    async function userAuthenticate(){            
            localStorage.getItem('token');
            DisconnectionLogout();

            let userCreds = {username: usernameIO, password: passwordIO};

            let result = await fetch(endpointURL(ENDPOINTS.AUTHENTICATE),{
                method:'POST',
                headers:{
                    "Content-Type": "application/json",
                    "Accept": 'application/json',
                },
                body:JSON.stringify(userCreds)
            });

            result = await result.json();
            try {
                var jwtToken = result.body.jwt;
            } catch (error) {
                alert("User was not authenticated properly.");
                UserLogout();
                throw new Error("Endpoint for authentication is unreachable");
            }
            

            localStorage.setItem('token', jwtToken);

            document.cookie = "token=" + localStorage.getItem('token') + ";";            
            
            if (localStorage.getItem('token') === "undefined"){
                alert("Incorrect Credentials");
                window.location.href = '/login';   
            }
            else{
                switch(parsedJwtReturn().roles){
                    case "[ROLE_ADMIN]":
                        window.location.href = '/masterlist';
                        break;
                    default:
                        window.location.href = '/menu';
                        break;
                }                
            }            
            
    }

    return (
      <>
      <BackgroundBox clicked={click}>
        <ButtonAnimate clicked={click} onClick={handleClick}></ButtonAnimate>

        <Main className="signin">
          <Title>Sign In</Title>
          <Input onChange={(e) => setUsername(e.target.value)} type="text" placeholder='Username'/>
          <Input onChange={(e) => setPassword(e.target.value)} type='password' placeholder='Password'/>
          <Link href="#">Forgot Your Password?</Link>
          <Button onClick = {(e) => userAuthenticate()} variant = 'outlined'> Sign In </Button>
        </Main>

        <Form className="signup">
          <Title>Sign Up</Title>
          <Input
            type="text"
            name="username"
            id="username"
            placeholder="Username"
          />

          <Input 
            type='password' 
            name="password" 
            id="password"
            placeholder='Password'
          />
          
          <Input 
          type="school" 
          name="school" 
          id="school" 
          placeholder="School" 
          />

          <Link href="#" onClick={handleClick}>
            Already have an Account?
          </Link>
          <Button onClick = {(e) => userAuthenticate()} variant = 'outlined'> Sign Up </Button>
        </Form>

        <Text className="text1" clicked={click}>
          <h1>Welcome!</h1>
          Don't have an account?
          <br />
          <span className="attention">Click on Emoji</span>
          <span className="attention-icon">⤶</span>
        </Text>

        <Text className="text2" clicked={click}>
          <h1>Hi There!</h1>
          <span className="attention">Click on Emoji</span>
          <span className="attention-icon">⤷</span>
        </Text>

        <Box1 clicked={click} />
        <Box2 clicked={click} />
      </BackgroundBox>
    </>
  );
}

export default Login;