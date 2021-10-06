// we have created new file for this app 
const redux=require("redux");
const createStore=redux.createStore
const applyMiddleware=redux.applyMiddleware
const thunkMiddleware = require('redux-thunk').default
const axios = require('axios')
const initalState={
    loading: false,
    users:[],
    errors:''
}
const FETCH_USER_REQUEST=' FETCH_USER_REQUEST' 
const FETCH_USER_SUCCESS=' FETCH_USER_SUCCESS' 
const FETCH_USER_FAILURE=' FETCH_USER_FALIURE' 
// DECLEARING C0NSTANT and functions
const fetchUsersRequest=()=>{
    return{
        type:FETCH_USER_REQUEST
    }
}
const fetchUsersSuccess =users=>{
    return{
        type:FETCH_USER_SUCCESS,
        payload:users
    }
}
const fetchUsersFailure=error=>{
    return {
    type: FETCH_USER_FAILURE,
    payload:error
    }
}
// now we will declear a reducer that will hold main logic of app
const reducer=(state=initalState,action)=>{
    switch (action.type) {
        case FETCH_USER_REQUEST:
            return {
                ...state,
            loading: true}
            break;
        case FETCH_USER_SUCCESS:
            return{
                loading: false,
                users:action.payload,
                error: ""
            }
        case FETCH_USER_FAILURE:
            return {
                loading: false,
                users:[],
                error:action.payload
            }    
    }
}           
// now we will creata action creatr and pass Dispaltch as a argumnet
const fetchUser=()=>{
    return function (dispatch) {
        dispatch(fetchUsersRequest())
        axios.get('https://jsonplaceholder.typicode.com/users')
        .then(response=>{
//  response data is an array
            const users=response.data //.map(users=>users.id)
            dispatch(fetchUsersSuccess(users))
        })
        .catch(error=>{
            // error message is an discraption
            dispatch(fetchUsersFailure(error.message))
        })
    }
}
const store=createStore(reducer, applyMiddleware(thunkMiddleware))
store.subscribe(()=>{console.log(store.getState())})
store.dispatch(fetchUser())