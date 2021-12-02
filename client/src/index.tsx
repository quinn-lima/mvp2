
//import React from 'react';
import * as React from "react";
//import ReactDOM from 'react-dom';
import * as ReactDOM from "react-dom";
import Login from './components/login';
import SignUp from "./components/signUp";
import Chat from "./components/chat";
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
//import { createBrowserHistory } from 'history';
import { createBrowserHistory } from 'history';
import Cookies from 'js-cookie';
//things to do
//newChat- function which submits a post request to add a new chat to database with user
//
//type MyProps = {string: string};
const history = createBrowserHistory();

interface MyState {
        signUp: boolean,
          login: boolean,
          chat: boolean,
          id: number | null,
          username: string,
          password: string,
          chatUser: string,
          chatMessage: string,
          activeChat: {id: number, username: string} | null,
          messagesList: any,
          chatButton: boolean,
          auth: boolean
}

class App extends React.Component<any, MyState> {
    constructor (props: any) {
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
          messagesList: [],
          chatButton: true,
          auth: false
      };

      this.signUp = this.signUp.bind(this);
      this.sendSignUpInfo = this.sendSignUpInfo.bind(this);
      this.changeState = this.changeState.bind(this);
      this.login = this.login.bind(this);
      this.sendNewChat = this.sendNewChat.bind(this);
      this.newChat = this.newChat.bind(this);
      this.changeChat = this.changeChat.bind(this);
      this.cancel = this.cancel.bind(this);
      this.newChatButton = this.newChatButton.bind(this);
      this.cancelChat = this.cancelChat.bind(this);
      this.logout = this.logout.bind(this);
    }

    componentDidMount () {
        
        const user = Cookies.get("user")
        const password = Cookies.get("password")
        console.log('dododod', user, password)
        if (user && password) {
            // call login with password stored in cookie
            this.setState({
                username: user,
                password: password
            })
            setTimeout(()=>this.login(), 50)
            
        }

    }

    signUp () {
        this.setState({
            signUp: true, 
            login: false
        })

    }

    cancel () {
        this.setState({
            signUp: false,
            login: true,
            chat: false,
        })
    }

    changeState (e: React.ChangeEvent<any>) {
        console.log('fad', e.target.value)
        this.setState((current) => ({
            ...current,
            [e.target.name]: e.target.value
        }))

    }

    login () {
        interface Results {config: any
                            data: {pass: boolean, id: number, messages: any}
                            headers: any
                            request: any
                            status: number
                            statusText: string}
       
        axios.post('/login', {username: this.state.username, password: this.state.password}).then((results: Results) => {
            console.log('resultagdo', results)
        
            //iterate through and make an array of objects that has 
            //each object has a user then all of the messages for that user as an array
            //[{id: , username: '', messages: [], }]
            interface object1 {
                id: number,
                messages: any
            }
           interface personalMessages {
               [key: string]: object1 | undefined
           };

            let personalMessages: personalMessages = {};

            for (let i = 0; i < results.data.messages.length; i++) {
                if (personalMessages[results.data.messages[i].username] === undefined) {
                    let object1 = {id: results.data.messages[i].id, messages: [results.data.messages[i]]}
                    personalMessages[results.data.messages[i].username] = object1;
                } else {
                    personalMessages[results.data.messages[i].username].messages.push(results.data.messages[i])
                }
            }
        

            for (let key in personalMessages) {
                let sorted = personalMessages[key].messages.sort(function(a: any, b: any) {
                    return a.messageid - b.messageid;
                    });

                personalMessages[key].messages = sorted;
            }

           if (results.data.pass) {
               Cookies.set('user', this.state.username)
               Cookies.set('password', this.state.password)

               this.setState({
                signUp: false, 
                login: false,
                chat: true,
                id: results.data.id,
                messagesList: personalMessages
            })
            history.push('/chat')
        }
 //       axios.post('/getMessages', {})
            //make get request to get all the chats from  
            
        })
    }

    sendNewChat () {
        // first make a get request to see if that is a user, if it is then enter chat in database
        axios.post('/newMessage', {from: this.state.id, toName: this.state.chatUser, username: this.state.username, message: this.state.chatMessage}).then((results: any) => {
            console.log('resultsss', results)
        
            interface object1 {
                id: number,
                messages: any
            }
           interface personalMessages {
               [key: string]: object1 | undefined
           };

            let personalMessages: personalMessages = {};
            

            for (let i = 0; i < results.data.messages.length; i++) {
                if (personalMessages[results.data.messages[i].username] === undefined) {
                    let object = {id: results.data.messages[i].id, messages: [results.data.messages[i]]}
                    personalMessages[results.data.messages[i].username] = object;
                } else {
                    personalMessages[results.data.messages[i].username].messages.push(results.data.messages[i])
                }
            }
            
            for (let key in personalMessages) {
                let sorted = personalMessages[key].messages.sort(function(a: any, b: any) {
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
        axios.post('/newChat', {from: this.state.id, to: this.state.activeChat.id, username: this.state.username, message: this.state.chatMessage}).then((results: any) => {

            interface object1 {
                id: number,
                messages: any
            }
           interface personalMessages {
               [key: string]: object1 | undefined
           };

            let personalMessages: personalMessages = {};

            for (let i = 0; i < results.data.messages.length; i++) {
                if (personalMessages[results.data.messages[i].username] === undefined) {
                    let object = {id: results.data.messages[i].id, messages: [results.data.messages[i]]}
                    personalMessages[results.data.messages[i].username] = object;
                } else {
                    personalMessages[results.data.messages[i].username].messages.push(results.data.messages[i])
                }
            }
            
            for (let key in personalMessages) {
                let sorted = personalMessages[key].messages.sort(function(a: any, b: any) {
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

    newChatButton () {
        this.setState({
            chatButton: false
        })
    }

    changeChat (e : React.ChangeEvent<any>) {
        console.log('activeChat', e.target.value)
        this.setState({
            activeChat: {id: e.target.value, username: e.target.innerText}
        })

    }

    cancelChat () {
        this.setState({
            chatButton: true
        })
    }

    logout () {
        Cookies.remove("user")
        Cookies.remove("password")
        this.setState({
            chat: false,
            username: '',
            password: ''
        })
    }
    


    render () {
        return (
        <Router>
          <React.Fragment>
            <Routes>
                <Route path='/' element = {<Login signUp = {this.signUp} state = {this.state.chat} changeState = {this.changeState} login = {this.login}/>}>
                </Route>
                <Route path='/signup' element = {<SignUp state = {this.state.chat} sendSignUpInfo = {this.sendSignUpInfo} changeState = {this.changeState} cancel = {this.cancel}/>}>
                </Route>
                <Route path='/chat' element = {<Chat state = {{chatButton: this.state.chatButton, chat : this.state.chat, messagesList: this.state.messagesList}} activeChat = {this.state.activeChat} changeState = {this.changeState} sendNewChat = {this.sendNewChat} changeChat = {this.changeChat} newChat = {this.newChat} newChatButton = {this.newChatButton} cancelChat = {this.cancelChat} logout = {this.logout}/>}>
                </Route>
            </Routes>
          </React.Fragment>
        </Router>
            
            
        )
    }
}

ReactDOM.render(<App />, document.getElementById('App'));

export default App;