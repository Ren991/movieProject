import * as React from 'react';
import github from '../../images/github.png';
import mail from '../../images/mail.png';
import linkedin from '../../images/linkedin.png';
import flecha from '../../images/flecha.jpg'
import { Link} from 'react-router-dom';


import "./styles.css"


 const Footer=()=> {
  return (
   
    <div className="footer-distributed">
        
       
      
          <div className="icons">
          <Link to="/" >
          
              <img src={flecha} alt="flecha" height="50px"/>
            
            </Link>
            <a href='https://github.com/Ren991' target="_blank">
              <img src={github} alt="github" height="50px"/>
            </a>
            <a href='https://portfolio-beccari.vercel.app/' target="_blank">
              <img src={mail} alt="mail" height="50px"/>
            </a>
            <a href='https://www.linkedin.com/in/renzo-beccari/' target="_blank">
              <img src={linkedin} alt="linkedin" height="50px"/>
            </a>
          </div>
    </div>
     
  );
}

export default Footer