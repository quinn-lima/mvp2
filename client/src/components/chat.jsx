import React from 'react';

const Chat = (props) => {

    if (props.state.chat) {

     return (
         <div>
             <div>
            <h3> start new chat </h3>
             <input type="text" placeholder="Enter Username" name="chatUser" onChange = {props.changeState}></input>
             <input type="text" placeholder="Enter Message" name="chatMessage" onChange = {props.changeState}></input>
             <button type="submit" onClick = {props.sendNewChat}>send</button>
             </div>
             <div>
            <h3> chat history </h3>
             <ol>
            {function() {
                let list = [];
                for (let username in props.state.messagesList) {
                    list.push(<li value = {props.state.messagesList[username].id} onClick = {props.changeChat}>{username}</li>)
            }
            return list;
            }()}
            </ol>
             </div>
             <div>
            <h3> messages </h3>
            {function() {
                if (props.state.activeChat == null) {
                    return null;
                } else {
                    let chat = [];
                    for (let i = 0; i < props.state.messagesList[props.state.activeChat.username].messages.length; i++) {
                        chat.push(<div>{props.state.messagesList[props.state.activeChat.username].messages[i].fromusername + ': ' + props.state.messagesList[props.state.activeChat.username].messages[i].message}</div>)
                    }
                    return chat;
                    }
            }()}
             </div>
             <div>
            <h3>Send Message </h3>
             <input type="text" placeholder="Enter Message" name="chatMessage" onChange = {props.changeState}></input>
             <button type="submit" onClick = {props.newChat}>send</button>
             </div>
         </div>
        )
      } else {

       return null
      }
}

export default Chat;