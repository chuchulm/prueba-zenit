import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteUser, listUsers } from '../actions/userActions'
import { LoadingBox } from '../components/LoadingBox'
import { MessageBox } from '../components/MessageBox'
import { USER_DETAILS_RESET } from '../contants/userConstants'

export const UserListScreen = ( props ) => {
    
    const userlist = useSelector(state => state.userlist)
    const {loading, error, users } = userlist
    
    

    const userDelete = useSelector(state => state.userDelete)
    const {loading: loadingDelete, error: errorDelete, success: successDelete} = userDelete
    

    const dispatch = useDispatch()

   
    useEffect(() => {

       dispatch(listUsers());
       dispatch({type: USER_DETAILS_RESET});
        
    }, [dispatch, successDelete]);

    
    const deleteHandler = (user) => {

       if(window.confirm('estas seguro de borrar')){
     
           dispatch(deleteUser(user._id));
       }
        
    }
 


    return (
        <div>
            <h1>Usuarios</h1>
            {loadingDelete && <LoadingBox></LoadingBox>}
            {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}
            {successDelete && <MessageBox variant="success">Usuario Eliminado!</MessageBox>}

            {
                loading? (<LoadingBox></LoadingBox>)
                :
                error? (<MessageBox variant="danger">{error}</MessageBox>)
                :
                (
                    <table className="table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>NAME</th>
                                <th>EMAIL</th>
                                <th>IS ADMIN</th>
                                <th>ACTIONS</th>
                            </tr>
                        </thead>

                        <tbody>
                            {
                                users.map((user) => (
                                    <tr key={user._id}>

                                        <td>{user._id}</td>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td>{user.isAdmin? 'YES' : 'NO' }</td>
                                        <td>
                                            <button type="button" className="small" onClick={()=> props.history.push(`/user/${user._id}/edit`)}>Editar</button>
                                            <button type="button" className="small" onClick={()=> deleteHandler(user)}>Borrar</button>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                )
            }
        </div>
    )
}
