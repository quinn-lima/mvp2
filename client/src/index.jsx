
import React from 'react';
import ReactDOM from 'react-dom';
import Login from './components/login.jsx';
import SignUp from "./components/signUp.jsx";
import Chat from "./components/chat.jsx";
import axios from 'axios';

//things to do
//newChat- function which submits a post request to add a new chat to database with user
//


class App extends React.Component {
    constructor (props) {
      super(props);
      this.state = {
          signUp: false,
          login: true,
          chat: false,
          id: null,
          username: '',
          password: '',
          chatUser: '',
          chatMessage: '',
          activeChat: null,
          messagesList: []
      };

      this.signUp = this.signUp.bind(this);
      this.sendSignUpInfo = this.sendSignUpInfo.bind(this);
      this.changeState = this.changeState.bind(this);
      this.login = this.login.bind(this);
      this.sendNewChat = this.sendNewChat.bind(this);
      this.newChat = this.newChat.bind(this);
      this.changeChat = this.changeChat.bind(this);
    }

    componentDidMount () {

    }

    signUp () {
        this.setState({
            signUp: true, 
            login: false
        })

    }

    changeState (e) {
        this.setState({
            [e.target.name]: e.target.value
        })

    }

    login () {
        axios.post('/login', {username: this.state.username, password: this.state.password}).then((results) => {

            //iterate through and make an array of objects that has 
            //each object has a user then all of the messages for that user as an array
            //[{id: , username: '', messages: [], }]
            let personalMessages = {};

            for (let i = 0; i < results.data.messages.length; i++) {
                if (personalMessages[results.data.messages[i].username] === undefined) {
                    let object = {id: results.data.messages[i].id, messages: [results.data.messages[i]]}
                    personalMessages[results.data.messages[i].username] = object;
                } else {
                    personalMessages[results.data.messages[i].username].messages.push(results.data.messages[i])
                }
            }
        

            for (let key in personalMessages) {
                let sorted = personalMessages[key].messages.sort(function(a, b) {
                    return a.messageid - b.messageid;
                    });

                personalMessages[key].messages = sorted;
            }

           if (results.data.pass) {
               this.setState({
                signUp: false, 
                login: false,
                chat: true,
                id: results.data.id,
                messagesList: personalMessages
            })
        }
 //       axios.post('/getMessages', {})
            //make get request to get all the chats from  
            
        })
    }

    sendNewChat () {
        // first make a get request to see if that is a user, if it is then enter chat in database
        axios.post('/newMessage', {from: this.state.id, toName: this.state.chatUser, username: this.state.username, message: this.state.chatMessage}).then((results) => {
            console.log('resultsss', results)
            let personalMessages = {};

            for (let i = 0; i < results.data.messages.length; i++) {
                if (personalMessages[results.data.messages[i].username] === undefined) {
                    let object = {id: results.data.messages[i].id, messages: [results.data.messages[i]]}
                    personalMessages[results.data.messages[i].username] = object;
                } else {
                    personalMessages[results.data.messages[i].username].messages.push(results.data.messages[i])
                }
            }
            
            for (let key in personalMessages) {
                let sorted = personalMessages[key].messages.sort(function(a, b) {
                    return a.messageid - b.messageid;
                    });

                personalMessages[key].messages = sorted;
            }
        

           if (results.data.pass) {
               this.setState({
                messagesList: personalMessages
            })
        }


        })
        //then change the display on the chat screen to show that chat thread
        
        
    }

    newChat () {
        axios.post('/newChat', {from: this.state.id, to: this.state.activeChat.id, username: this.state.username, message: this.state.chatMessage}).then((results) => {

            let personalMessages = {};

            for (let i = 0; i < results.data.messages.length; i++) {
                if (personalMessages[results.data.messages[i].username] === undefined) {
                    let object = {id: results.data.messages[i].id, messages: [results.data.messages[i]]}
                    personalMessages[results.data.messages[i].username] = object;
                } else {
                    personalMessages[results.data.messages[i].username].messages.push(results.data.messages[i])
                }
            }
            
            for (let key in personalMessages) {
                let sorted = personalMessages[key].messages.sort(function(a, b) {
                    return a.messageid - b.messageid;
                    });

                personalMessages[key].messages = sorted;
            }
        

           if (results.data.pass) {
               this.setState({
                messagesList: personalMessages
            })
        }
        })
    }

    sendSignUpInfo () {

        axios.post('/signup', {username: this.state.username, password: this.state.password}).then((results) => {
            this.setState({
                signUp: false, 
                login: true
            })
        })

    }

    changeChat (e) {
        console.log('activeChat', e.target.value)
        this.setState({
            activeChat: {id: e.target.value, username: e.target.innerText}
        })

    }

    render () {
        return (
            <div>
            <SignUp state = {this.state} sendSignUpInfo = {this.sendSignUpInfo} changeState = {this.changeState}/>  
            <Login signUp = {this.signUp} state = {this.state} changeState = {this.changeState} login = {this.login}/>
            <Chat state = {this.state} changeState = {this.changeState} sendNewChat = {this.sendNewChat} changeChat = {this.changeChat} newChat = {this.newChat}/> 
            </div>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('App'));

export default App;