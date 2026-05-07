import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { supabase } from "../utils/supabaseClient";
import ChatContainer from "../components/ChatContainer";
import Contacts from "../components/Contacts";
import Welcome from "../components/Welcome";

export default function Chat() {
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const [currentChat, setCurrentChat] = useState(undefined);
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const stored = localStorage.getItem('chat-app-user');
    if (!stored) {
      navigate("/login");
    } else {
      setCurrentUser(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    if (!currentUser) return;
    if (!currentUser.isAvatarImageSet) {
      navigate("/setAvatar");
      return;
    }
    const fetchContacts = async () => {
      const { data } = await supabase
        .from('profiles')
        .select('id, username, avatar_image, is_avatar_set')
        .neq('id', currentUser.id);
      setContacts(data || []);
    };
    fetchContacts();
  }, [currentUser]);

  return (
    <Container>
      <div className="container">
        <Contacts contacts={contacts} changeChat={setCurrentChat} />
        {currentChat === undefined ? (
          <Welcome />
        ) : (
          <ChatContainer currentChat={currentChat} currentUser={currentUser} />
        )}
      </div>
    </Container>
  );
}

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  .container {
    height: 85vh;
    width: 85vw;
    background-color: #00000076;
    display: grid;
    grid-template-columns: 25% 75%;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
  }
`;
