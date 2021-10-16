import React from 'react';

const Chat = (props) => {

    if (props.state.chat) {

     return (
         <div className = "chat">
             <div className = "column-one">
             <div className = "new-chat">
            {function () {
                if (props.state.chatButton) {
                    return <button onClick = {props.newChatButton}>Start New Chat</button>
                } else {
                    return (
                        <div className = "start-new-chat">
                        <h3> Start New Chat </h3>
                        <input className = "new-chat-enter" type="text" placeholder="Enter Username" name="chatUser" onChange = {props.changeState}></input>
                         <input className = "new-chat-enter" type="text" placeholder="Enter Message" name="chatMessage" onChange = {props.changeState}></input>
                         <div>
                        <button className = "new-chat-enter" type="submit" onClick = {props.sendNewChat}>Send</button>
                        <button className = "new-chat-enter" type="submit" onClick = {props.cancelChat}>Cancel</button>
                        </div>
                        </div>
                    )
                }
            }()}
            
             </div>
             <div className = "chat-history">
            <h3> Chat History </h3>
             <ol>
            {function() {
                let list = [];
                for (let username in props.state.messagesList) {
                    list.push(<li className = "user-list" value = {props.state.messagesList[username].id} onClick = {props.changeChat}>{username}</li>)
            }
            return list;
            }()}
            </ol>
            </div>
             </div>
             <div className = "messages">
            <h2> Messages </h2>
            {function() {
                if (props.state.activeChat == null) {
                    return null;
                } else {
                    let chat = [];
                    for (let i = 0; i < props.state.messagesList[props.state.activeChat.username].messages.length; i++) {
                        chat.push(<div className = "message">{props.state.messagesList[props.state.activeChat.username].messages[i].fromusername + ': ' + props.state.messagesList[props.state.activeChat.username].messages[i].message}</div>)
                    }
                    return chat;
                    }
            }()}
             </div>
             <div className = "send-message">
            <h3>Send Message </h3>
             <input type="text" placeholder="Enter Message" className = "send-chat" name="chatMessage" onChange = {props.changeState}></input>
             <br></br>
             <br></br>
             <button type="submit" onClick = {props.newChat}>send</button>
             </div>
         </div>
         
        )
      } else {

       return null
      }
}

export default Chat;