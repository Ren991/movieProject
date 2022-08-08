import React, {useState, useEffect} from 'react'
import { Link , useNavigate, useLocation} from 'react-router-dom'
import { AppBar,Toolbar,Typography,Button,Avatar } from '@material-ui/core'
import useStyles from './styles'
import { useDispatch } from 'react-redux'
import decode from 'jwt-decode';


const Navbar =()=>{
    const classes = useStyles();
    const dispatch = useDispatch();
    const [user,setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const navigate= useNavigate()
    const location = useLocation()
   
    
    const logout = ()=>{
        dispatch({type:'LOGOUT'});
        navigate('/auth')
        setUser(null)
    }

    useEffect(() => {
        const token = user?.token;
    
       /*  if (token) {
          const decodedToken = decode(token);
    
          if (decodedToken.exp * 1000 < new Date().getTime()) logout();
        } */
    
        setUser(JSON.parse(localStorage.getItem('profile')));
      }, [location]);
    
    return(
        <AppBar className={classes.appBar} position="static" color="inherit">
            <div className={classes.brandContainer}>
                <Typography component={Link} to="/posts" className={classes.heading} variant="h2" align="center">Movie Project</Typography>
                <img className={classes.image} src={"https://images.ecestaticos.com/leU_vr7vwdksdq_fkLknTvqTmlw=/0x90:1696x1041/1600x900/filters:fill(white):format(jpg)/f.elconfidencial.com%2Foriginal%2F4eb%2Fa77%2F5f9%2F4eba775f9bbe9f2f8c602b8731e81a46.jpg"} alt="movies" height="60"  />
            </div>
           
            <Toolbar className={classes.toolbar}>
                {user?.result ?  (
                    <div className={classes.profile}>
                        <Avatar className={classes.purple} >{user?.result.name.charAt(0)} </Avatar>
                        <Typography className={classes.userName} variant="h6">{user?.result.name}</Typography>
                        <Button variant="contained" className={classes.logout} color="secondary" onClick={logout}>Logout</Button>
                    </div>
                ):(
                    <Link to="/auth">
                        <Button  variant="contained" color="primary">Sign In</Button>
                    </Link>
                    
                )}
            </Toolbar>
        </AppBar>
    )
}

export default Navbar 