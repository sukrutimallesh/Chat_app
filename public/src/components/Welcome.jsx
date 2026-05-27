import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Robot from "../assets/robot.gif";

export default function Welcome() {
  const [userName, setUserName] = useState("");
  const [isGuest, setIsGuest] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY));
    if (user) {
      setUserName(user.username);
      setIsGuest(user.username?.startsWith("Guest_"));
    }
  }, []);

  return (
    <Container>
      {isGuest && (
        <GuestBanner>
          👀 Guest mode — pick any contact on the left to start chatting.
          Open this page in another tab to chat with yourself in real time!
        </GuestBanner>
      )}
      <img src={Robot} alt="" />
      <h1>
        Welcome, <span>{userName}!</span>
      </h1>
      <h3>Please select a chat to Start messaging.</h3>
    </Container>
  );
}

const GuestBanner = styled.div`
  background-color: #9a86f320;
  border: 1px solid #9a86f3;
  color: #9a86f3;
  padding: 0.8rem 1.5rem;
  border-radius: 0.5rem;
  font-size: 0.9rem;
  text-align: center;
  max-width: 80%;
  margin-bottom: 1rem;
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  flex-direction: column;
  img {
    height: 20rem;
  }
  span {
    color: #4e0eff;
  }
`;