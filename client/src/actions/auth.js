import { AUTH} from '../constants/actionTypes';
import * as api from '../api/index.js';
import Swal from 'sweetalert2'


export const signin = (formData, history) => async(dispatch)=>{
    try {
        const {data} = await api.signIn(formData);
        dispatch({type: AUTH, data})
        
        history('/posts')
        Swal.fire({ 
            
            title:'Bienvenid@ nuevamente!' ,
            icon:'success'
        })
        
    } catch (error) {
        Swal.fire({
            title: 'Error!',
            text: 'Datos incorrectos,por favor intente nuevamente.',
            icon: 'error',
            confirmButtonText: 'Cool'
          })
        
    }
}
export const signup = (formData, history) => async(dispatch)=>{
    try {
        const {data} = await api.signUp(formData);
        dispatch({type: AUTH, data})
        console.log(dispatch)
        history('/posts')
        Swal.fire({ 
            title:'Bienvenid@!',
            icon:'success'
        })
    } catch (error) {
        console.log(error)
        Swal.fire({
            title: 'Error!',
            text: 'Datos incorrectos,por favor intente nuevamente.',
            icon: 'error',
            confirmButtonText: 'Cool'
          })
          history('/posts')
    }
}
