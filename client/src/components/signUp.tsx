import * as React from "react";
import { useNavigate } from 'react-router-dom';

//state = {this.state} sendSignUpInfo = {this.sendSignUpInfo} changeState = {this.changeState} cancel = {this.cancel}

interface Props {
  sendSignUpInfo: () => void,
  state: boolean,
  changeState: (event: React.ChangeEvent<HTMLInputElement>) => void,
  cancel: () => void
 }
 

const SignUp: React.FC<Props> = (props) => {
  const navigate = useNavigate();

  const sendLoginAndNavigate = function () {
    props.sendSignUpInfo()
    navigate('/')

  }

        return (
        
  <div className="sign-up">
    <h3>Sign Up</h3>
    <p>Please fill in this form to create an account.</p>

    <label ><b>Username</b></label>
    <input type="text" placeholder="Enter Username" name = "username" onChange = {props.changeState} required></input>
    <br></br>
    <br></br>

    <label className="psw"><b>Password</b></label>
    <input type="password" placeholder="Enter Password" name = "password" onChange = {props.changeState} required></input>
    <br></br>
    <br></br>

    <div className="clearfix">
      <button type="button" className="cancelbtn" onClick = {()=>{navigate('/')}}>Cancel</button>
      <button type="submit" className="signupbtn" onClick = {sendLoginAndNavigate}>Sign Up</button>
    </div>
    </div>
    
         )
}

export default (SignUp);