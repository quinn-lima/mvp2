import React from 'react';

const Login = (props) => {

    if (props.state.login) {

     return (
        <div>

        <div className="container">
            <label className="uname"><b>Username</b></label>
            <input type="text" placeholder="Enter Username" name="username" onChange = {props.changeState}></input>

            <label className="psw"><b>Password</b></label>
            <input type="password" placeholder="Enter Password" name="password" onChange = {props.changeState} ></input>

            <button type="submit" onClick = {props.login}>Login</button>
            <label>
            <input type="checkbox" name="remember"/> Remember me
            </label>
        </div>

        <div className="container" >
            <button type="button" className="cancelbtn">Cancel</button>
            <button onClick = {props.signUp}>new user?</button>
        </div>

        </div>
    )
      } else {

       return null
      }
}

export default Login;