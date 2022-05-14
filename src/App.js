import './App.css';
import io from 'socket.io-client'
import { useEffect,useState } from 'react';
const socket = io.connect('http://localhost:3003')

function App() {
  const [userName, setUserName]=useState('')
  const [room, setRoom] = useState('')
const [message, setMessage] = useState({
  content:''
})
const [messageReceived, setMessageReceived] = useState("")


const joinRoom= () => {
  if ( room !== ""){
    socket.emit("join_room", room);
  }
}




  const sendMessage = () => {
    
    socket.emit("send_message", {message,room,userName })
  }

  useEffect(()  => {
    socket.on("receive_message",(data) => {
setMessageReceived( data.message )
setUserName(data.userName)
 })

  }, [socket])
  
  return (
    <div className="App">

      <input placeholder='Name' onChange={(evt) => {
        setUserName(evt.target.value)
      }} />


      <input placeholder='room number...' onChange={(evt) => {
        setRoom(evt.target.value)
      }} />



      <button onClick={joinRoom}>Join Room</button>

    <input placeholder='message...' onChange={ (evt) => {
      setMessage(evt.target.value)

    }} />
    <button onClick={sendMessage}>Send Message</button>
     <h1>Message:</h1>
   Room number: {room} <br/> 
    {userName} says: {messageReceived}
    
    </div>
  );
}

export default App;
