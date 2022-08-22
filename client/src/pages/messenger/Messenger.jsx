import "./messenger.css"
import Topbar from "../../components/topbar/Topbar"
import Conversation from "../../components/conversation/Conversation"
import Message from "../../components/message/Message"
import ChatOnline from "../../components/chatOnline/ChatOnline"
import { useContext, useState, useEffect, useRef } from "react"
import { AuthContext } from "../../context/AuthContext"
import axios from "axios"
import io from 'socket.io-client'

export default function Messenger() {
    
    //state to set all other users engaged in convo threads with current user
    const [conversations, setConversations] = useState([])
    const [currentChat, setCurrentChat] = useState(null)
    const [messages, setMessages] = useState([])
    const [newMessage, setNewMessage] = useState("")
    const [arrivalMessage, setArrivalMessage] = useState(null)
    const [onlineUsers, setOnlineUsers] = useState([])
    const {user} = useContext(AuthContext) 
    const socket = useRef()
    const scrollRef = useRef()

    useEffect(() => {
        socket.current = io("ws://localhost:8900")
        socket.current.on("getMessage", data => {
            setArrivalMessage({
                sender: data.senderId,
                text: data.text,
                createdAt: Date.now(),
            })
        })
    }, [])

    //only update the chat from the conversation chat window that is open
    useEffect(() => {
        arrivalMessage && currentChat?.members.includes(arrivalMessage.sender) &&
        setMessages(prev => [...prev, arrivalMessage])
    }, [arrivalMessage, currentChat])

    useEffect(() => {
        socket.current.emit("addUser", user._id)
        socket.current.on("getUsers", users=> {
            //detemine which users the currentUser follows are online to pass to the ChatOnline component
            setOnlineUsers(user.following.filter(f=>users.some(u=>u.userId === f)))
        })
    }, [user])

    // useEffect(() => {
    //     socket?.on("welcome", message=> {
    //         console.log(message)
    //     })
    // }, [socket])

    // console.log(socket)

    //hook to fetch all conversations from current user to display left hand panel showing all users current user has open conversation threads with 
    useEffect(() => {
        const getConversations = async () => {
            try {
                const res = await axios.get("/conversations/"+user._id)  
                setConversations(res.data)
            }
            catch(err) {
                console.log(err)
            }
           
        }    
        getConversations()
    }, [user._id])


    useEffect(()=> {
        const getMessages = async () => {
            try {
                const res = await axios.get('/messages/'+currentChat?._id)
                setMessages(res.data)
            }
            catch(err) {
                console.log(err)
            }
            
        }
        getMessages()
    }, [currentChat])

    const handleSubmit = async e => {
        // prevent refresh on click
        e.preventDefault()
        const message = {
            sender: user._id,
            text: newMessage, 
            conversationId: currentChat._id
        }

        //check the members array and find the user id that does not belong to the current user
        const receiverId = currentChat.members.find(member=>member !== user._id)

        socket.current.emit("sendMessage", {
            senderId: user._id,
            receiverId,
            text: newMessage,

        })

        try {
            const res = await axios.post('/messages', message)
            // add newest message to array of all past messages in Conversation
            setMessages([...messages, res.data])
            // clear textbox after message has been sent
            setNewMessage("")
        }
        catch(err) {
            console.log(err)
        }
    }

    //effect to scroll to the bottom every time a new message is sent
    useEffect(()=> {
        scrollRef.current?.scrollIntoView({behavior: "smooth"})
    }, [messages])

  return (
    <>
        <Topbar/>
        <div className="messenger">
            <div className="chatMenu">
                <div className="chatMenuWrapper">
                    <input placeholder="Search for friends" className= "chatMenuInput"/>
                    {conversations.map(c=> (
                        //pass conversation as prop, and currentUser as pulled in from Context above
                        <div onClick={()=>setCurrentChat(c)}>
                            <Conversation conversation={c} currentUser={user}/>
                        </div>
                    ))}
                </div>
            </div>
            <div className="chatBox">
                <div className="chatBoxWrapper">
                    {
                        currentChat ?
                        <>
                    <div className="chatBoxTop">
                        {messages.map(m=> (
                            <div ref={scrollRef}>
                                <Message message={m} own={m.sender === user._id}/>
                            </div>
                        ))}
                        {/* <Message/> */}
                    </div>
                    <div className="chatBoxBottom">
                        <textarea placeholder="write something..." className="chatMessageInput" onChange={e=>setNewMessage(e.target.value)} value={newMessage}></textarea>
                        <button className="chatSubmitButton" onClick={handleSubmit}>Send</button>
                    </div></> : <span className="noConversationText">Open a conversation to start a chat</span>}
                </div>
            </div>
            <div className="chatOnline">
                <div className="chatOnlineWrapper">
                    <ChatOnline onlineUsers={onlineUsers} currentId={user._id} setCurrentChat={setCurrentChat}/>
                </div>
            </div>
        </div>
    </>
  )
}
