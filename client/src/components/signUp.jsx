import React from 'react';

const SignUp = (props) => {

    if (props.state.signUp)  {

        return (
        
  <div className="container">
    <h1>Sign Up</h1>
    <p>Please fill in this form to create an account.</p>

    <label ><b>Username</b></label>
    <input type="text" placeholder="Enter Username" name = "username" onChange = {props.changeState} required></input>

    <label className="psw"><b>Password</b></label>
    <input type="password" placeholder="Enter Password" name = "password" onChange = {props.changeState} required></input>

    <div className="clearfix">
      <button type="button" className="cancelbtn">Cancel</button>
      <button type="submit" className="signupbtn" onClick = {props.sendSignUpInfo}>Sign Up</button>
    </div>
    </div>
    
         )} else {
             return null;
         } 
}

export default SignUp;