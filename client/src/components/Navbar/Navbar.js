import React, {useState, useEffect} from 'react'
import { Link , useNavigate, useLocation} from 'react-router-dom'
import { AppBar,Toolbar,Typography,Button,Avatar } from '@material-ui/core'
import useStyles from './styles'
import { useDispatch } from 'react-redux'
import Movies from '../../images/Movies.png';
import Swal from 'sweetalert2'
import decode from 'jwt-decode';


const Navbar =()=>{
    const classes = useStyles();
    const dispatch = useDispatch();
    const [user,setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const navigate= useNavigate()
    const location = useLocation()
   
    

    const logout = ()=>{
      
        
        Swal.fire({
            title: 'Are you sure you want to logout?',
            
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes',
            cancelButtonText: 'No',
            reverseButtons: true
          }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire(
                'See you soon',
                
                
              )
              dispatch({type:'LOGOUT'});



              navigate('/auth')
      
              setUser(null)
            } else if (
              /* Read more about handling dismissals below */
              result.dismiss === Swal.DismissReason.cancel
            ) {
              
              navigate('/posts')
            }
          })

       
    }

    useEffect(() => {
        const token = user?.token;
    
        if (token) {
          const decodedToken = decode(token);
    
          if (decodedToken.exp * 1000 < new Date().getTime()) logout();
        } 
    
        setUser(JSON.parse(localStorage.getItem('profile')));
      }, [location]);
    
    return(
        <AppBar className={classes.appBar} position="static" color="inherit">
            <div className={classes.brandContainer}>
               <Link to="/" className={classes.brandContainer}>
               <img component={Link} to="/posts" src={Movies} alt="icon" height="100px" />
               </Link>
               
            </div>
            {/* <Typography variant="h6">Help someone decide which movie to watch.</Typography> */}
            <Toolbar className={classes.toolbar}>
            
                {user?.result ?  (
                    <div className={classes.profile}>
                        <Avatar className={classes.purple} >{user?.result.name.charAt(0)} </Avatar>
                        <Typography className={classes.userName} variant="h6">{user?.result.name}</Typography>
                        <Button variant="contained" className={classes.logout} color="secondary" onClick={logout}>Logout</Button>
                    </div>
                ):(
                    <Link to="/auth" style={{textDecoration:"none"}}>
                        <Button  variant="contained" color="primary">Sign In</Button>
                    </Link>
                    
                )}
            </Toolbar>
            
        </AppBar>
    )
}

export default Navbar 