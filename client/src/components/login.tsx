import * as React from "react";
import { useNavigate } from 'react-router-dom';

//signUp = {this.signUp} state = {this.state} changeState = {this.changeState} login = {this.login}
interface Props {
    signUp: () => void,
    state: boolean,
    changeState: (event: React.ChangeEvent<HTMLInputElement>) => void,
    login: () => void
   }
   

const Login: React.FC<Props> = (props) => {
    const navigate = useNavigate();

    if (props.state === true) {
        navigate('/chat')
    }

     return (
        <div>

        <div className="login">
            <label className="uname">Username</label>
            <input type="text" placeholder="Enter Username" name="username" onChange = {props.changeState}></input>
            <br></br>
            <br></br>
            <label className="psw"><b>Password</b></label>
            <input type="password" placeholder="Enter Password" name="password" onChange = {props.changeState} ></input>

            <button type="submit" onClick = {props.login}>Login</button>
        </div>
        <br></br>

        <div className="new-user" >
            <button onClick = {() => {navigate('/signup')}}>new user?</button>
        </div>

        </div>
    )
      
}

export default (Login);