import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { detailsUser, updateUser } from '../actions/userActions';
import { LoadingBox } from '../components/LoadingBox'
import { MessageBox } from '../components/MessageBox'
import { USER_UPDATE_RESET } from '../contants/userConstants';

export const UserEditScreen = ( props ) => {


    const userId = props.match.params.id;

    const [name, setName] = useState( '' );
    const [email, setEmail] = useState( '' );
   
    const [isAdmin, setIsAdmin] = useState( false );


    const userDetails = useSelector(state => state.userDetails);
    const { loading, error, user } = userDetails;

    

    const userUpdate = useSelector(state => state.userUpdate);
    const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } =  userUpdate;

    const dispatch = useDispatch();
    
    useEffect(() => {
        if(successUpdate){
            dispatch({ type: USER_UPDATE_RESET });
            props.history.push('/userlist');
        }

        if(!user){
            dispatch(detailsUser(userId));
        } else {
            
            setName(user.name);
            setEmail(user.email);
       
            setIsAdmin(user.isAdmin);

        }
       
    }, [dispatch, props.history, user, userId, successUpdate]);


    const submitHandler = (e) => {
        e.preventDefault()

        dispatch(updateUser({ _id: userId, name, email, isAdmin }));

    };


    return (
        <div>
            <form className="form" onSubmit={submitHandler}>

                <div>
                   <h1> Editar usuario {name} </h1>
        
                {loadingUpdate && <LoadingBox></LoadingBox>}
                {errorUpdate && (<MessageBox variant="danger">{errorUpdate}</MessageBox>)}
        
                </div>

                
                {loading? (
                <LoadingBox/> 
                ) : error? (
                <MessageBox variant='danger'>{error}</MessageBox>
                ) : (
                
                <>
                        
                            <div>
                                <label htmlFor="name">Name</label>
                                <input
                                 type="text"
                                 id="name"
                                 placeholder="Ingrese nombre"
                                 value={name}
                                 onChange={(e)=> setName(e.target.value)}
                                 />
                            </div>
                            <div>
                                <label htmlFor="email">Email</label>
                                <input
                                 type="email"
                                 id="email"
                                 placeholder="Ingrese email"
                                 value={email}
                                 onChange={(e)=> setEmail(e.target.value)}
                                 />
                            </div>
                           
                            <div>
                                <label htmlFor="isAdmin">Administrador</label>
                                <input
                                 type="checkbox"
                                 id="isAdmin"
                                 checked={isAdmin}
                                 onChange={(e)=> setIsAdmin(e.target.checked)}
                                 />
                            </div>                            
                        

                        <div>
                            <button type="submit" className="primary">
                                 Actualizar
                            </button>
                        </div>
                   </>)} 
            
            </form>
        </div>
    )
}
