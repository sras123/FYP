import io from "socket.io-client";
import { useState, handleLogout } from "react";
import { useHistory } from "react-router-dom";
import Chat from "../../Chat";
import { Link } from "react-router-dom";

const socket = io.connect("http://localhost:8080");

function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);

  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", room);
      setShowChat(true);
    }
  };
  const history = useHistory()
	const handleLogout = () => {
		localStorage.removeItem("token");
		history.push("/login");
	};
  return (
    <>
      <style>
        @import url('/css/chatting.css');

      </style>

      <div class="navbar">
        <Link to="/" >
          <img src="/images/logo2.png" class="logo"></img>
        </Link>
        <ul>
          <li><a href="/aboutUs">About Us</a></li>
          <li><a href="/doctors">Doctors</a></li>
          <li><a href="/room">Room</a></li>
          <li><a href="/reviews">Reviews</a></li>
          <li><a href="/login" onClick={handleLogout}>logout</a></li>
        </ul>
      </div>

      <div className="App">
        {!showChat ? (
          <div className="joinChatContainer">
            <h3>Join the Chat</h3>
            <input
              type="text"
              placeholder="Username"
              onChange={(event) => {
                setUsername(event.target.value);
              }}
            />
            <input
              type="text"
              placeholder="Room ID..."
              onChange={(event) => {
                setRoom(event.target.value);
              }}
            />
            <button onClick={joinRoom}>Join A Room</button>
          </div>
        ) : (
          <Chat socket={socket} username={username} room={room} />
        )}
      </div>
      <div class="footer">
        <div class="social">
          <a href="#"><i class="fab fa-instagram"></i></a>
          <a href="#"><i class="fab fa-facebook"></i></a>
          <a href="#"><i class="fab fa-twitter"></i></a>
        </div>
        <ul class="list">
          <li><a href="/aboutUs">About Us</a></li>
          <li><a href="/reviews">Reviews</a></li>
          <li><a href="/privacypolicy">Privacy Policy</a></li>
        </ul>
        <p class="Copyright">
          @2023 My Psychiatrist
        </p>
      </div>
    </>
  );
}

export default App;