/* import React, {useState} from 'react'
import {Avatar, Button, Paper, Grid,Typography,Container} from '@material-ui/core'
import useStyles from './styles';
import jwt_decode from 'jwt-decode'
import Input from './Input';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import { GoogleLogin } from '@react-oauth/google';
import { useDispatch } from 'react-redux';
import {useNavigate} from 'react-router-dom'
import {signin,signup} from '../../actions/auth'
import { AUTH } from '../../constants/actionTypes';

const initialState={firstName:'',lastName:'',email:'',password:'',confirmPassword:''};
const Auth = () =>{
    const classes=useStyles()

    const [showPassword,setShowPassword]= useState(false);
    const [isSignup, setIsSignup]= useState(false)
    const [formData, setFormData]= useState(initialState)
    const dispatch = useDispatch()
    const history=useNavigate()
    


    const handleShowPassword = () => setShowPassword ((prevShowPassword)=> !prevShowPassword)

    const handleSubmit =(e)=>{
        e.preventDefault();

        if(isSignup){
            console.log(formData)
            dispatch(signup(formData,history))
        }else{
        console.log(formData)
            dispatch(signin(formData,history))
        }
    }
    const handleChange =(e)=>{
        setFormData({...formData,[e.target.name]:e.target.value})

    };
    const switchMode =()=>{
        setFormData(initialState)
        setIsSignup((prevIsSignup) => !prevIsSignup)   
        handleShowPassword(false)
    }
     const createOrGetUser = async (response)=>{
        const decoded = jwt_decode(response.credential);
        const token = decoded.sub;
        console.log(decoded)
        console.log(token)

        try {
            dispatch({type: AUTH, data:{decoded, token}})
            history("/")
        } catch (error) {
            console.log(error);
        }


    }
    
    
    return(
      <Container component="main" maxWidth="xs">
        <Paper className={classes.paper} elevation={3}>
            <Avatar className={classes.avatar}>
                <LockOutlinedIcon/>
            </Avatar>
            <Typography variant="h5">{isSignup?'Sign Up': 'Sign in'}</Typography>
            <form className={classes.form} onSubmit={handleSubmit} >
                <Grid container spacing={2}>
                    {
                        isSignup && (
                            <>  
                                <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
                                <Input name="lastName" label="Last Name" handleChange={handleChange} autoFocus half />
                            </>
                        )}
                        <Input name="email" label="Email Address" handleChange={handleChange} type="email"/>
                        <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? "text": "password"} handleShowPassword={handleShowPassword}/>
                        {isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" />}
                </Grid>
                <GoogleLogin
                             onSuccess={(response)=>
                             createOrGetUser(response)}
                             onError={()=>console.log('Error')}/>
                <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                    {isSignup ? 'Sign Up' : 'Sign In'}
                </Button>
                <Grid container justify="flex-end">
                    <Grid item>
                        <Grid>
                            <Button onClick={switchMode}>
                                {isSignup ? 'Already have an account ? Sign In' : "Don´t have an account? Sign Up " }
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </form>

        </Paper>

      </Container>
    )
}
export default Auth */

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import jwt_decode from 'jwt-decode'

import { signin, signup } from '../../actions/auth';
import { AUTH } from '../../constants/actionTypes';
import useStyles from './styles';
import Input from './Input';

const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' };

const Auth = () => {
  const [formData, setFormData] = useState(initialState);
  const [isSignup, setIsSignup] = useState(false);
  const dispatch = useDispatch();
  const history = useNavigate();
  const classes = useStyles();

  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => setShowPassword(!showPassword);

  const switchMode = () => {
    setFormData(initialState);
    setIsSignup((prevIsSignup) => !prevIsSignup);
    setShowPassword(false);
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();

    if (isSignup) {
      
      dispatch(signup(formData, history));
      
    } else {
      
      dispatch(signin(formData, history));
      
    }
  };

   const createOrGetUser = async (response) => {
    const result = jwt_decode(response?.credential);
    const token = response?.credential;
    console.log(result)
    console.log(response.credential)
    console.log(token)

    try {
        dispatch({type: AUTH, data:{result, token}})
        history("/")
    } catch (error) {
        console.log(error);
    }
  }; 

  

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">{ isSignup ? 'Sign up' : 'Sign in' }</Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            { isSignup && (
            <>
              <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
              <Input name="lastName" label="Last Name" handleChange={handleChange} half />
            </>
            )}
            <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
            <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
            { isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" /> }
          </Grid>
          <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
            { isSignup ? 'Sign Up' : 'Sign In' }
          </Button>
           <GoogleLogin
             onSuccess={(response)=>
                createOrGetUser(response)}
                onError={()=>console.log('Error')}
          /> 
          <Grid container justify="flex-end">
            <Grid item>
              <Button onClick={switchMode}>
                { isSignup ? 'Already have an account? Sign in' : "Don't have an account? Sign Up" }
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default Auth;