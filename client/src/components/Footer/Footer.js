import * as React from 'react';
import github from '../../images/github.png';
import mail from '../../images/mail.png';
import linkedin from '../../images/linkedin.png';
import { Link} from 'react-router-dom';

//import {Typography} from '@material-ui/core'
import "./styles.css"
import { Button, Typography } from '@material-ui/core';

 const Footer=()=> {
  return (
   
    <div className="footer-distributed">
        
        <Link to="/" className="title">
        <Typography   variant="h6">Renzo Beccari</Typography>
        </Link>
       
        
        <div className="icons">
          <a href='https://github.com/Ren991' target="_blank">
          <img src={github} height="50px"/>
          </a>
          <a href='https://portfolio-beccari.vercel.app/' target="_blank">
          <img src={mail} height="50px"/>
          </a>
          <a href='https://www.linkedin.com/in/renzo-beccari/' target="_blank">
          <img src={linkedin} height="50px"/>
          </a>
        
       
       
        </div>
    
    </div>
     
  );
}

export default Footer