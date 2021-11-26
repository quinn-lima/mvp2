import * as React from "react";
//signUp = {this.signUp} state = {this.state} changeState = {this.changeState} login = {this.login}
interface Props {
    signUp: () => void,
    state: boolean,
    changeState: (event: React.ChangeEvent<HTMLInputElement>) => void,
    login: () => void
   }
   

const Login: React.FC<Props> = (props) => {

    if (props.state) {

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
            <button onClick = {props.signUp}>new user?</button>
        </div>

        </div>
    )
      } else {

       return null
      }
}

export default Login;