// an action is an object that return type property with an action to be perform 
// we are runnning this aas a simple node-js app
const redux =require("redux")
const creatStore=redux.createStore
const combineReducer =redux.combineReducers
const applyMiddleware=redux.applyMiddleware
const reduxlogger=require('redux-logger')
const logger=reduxlogger.createLogger()
// we will combine two reducer together combineReducer is meyhod of redux
const BUY_CAKE="Buy-CAKE"
const BUY_ICECREM="BUY_ICECREM"
function buyCake() {
    return{
        type: BUY_CAKE,
        info: "First redux action"
    }
}
function buyIceCrem() {
    return {
        type:BUY_ICECREM
    }
}

const initalCakeState = {
    numofCakes : 10
}
const initalIceCremState ={
    numofIceCrems :20
}
// first redux action created and now cereat a reducer function take prevstate AND return new state
// now we will creat multiple reducer in our app 
const initalState={
    numofCake:10,
    numofIceCrem:20
} 

const cakeReducer = (state=initalCakeState,action)=>{
    switch (action.type) {
        case BUY_CAKE: return {
            ...state, 
            numofCakes: state.numofCakes-1
        }
        default:return state
    }
}

const iceReducer = (state=initalIceCremState,action)=>{
    switch (action.type) {
        case BUY_ICECREM: return {
            ...state, 
            numofIceCrems: state.numofIceCrems-1
        }
        default:return state
    }
}

//  ..state make a copy of state object because in  real world it will have more than one states  in above reducer function if a cake is seel from the shop the 1 wil be subtracted an d we have pass inital value as a state it retue value according to the case
const rootReducer=combineReducer({
    cake: cakeReducer,
    iceCrem: iceReducer 
})
 

const store =creatStore(rootReducer,applyMiddleware(logger))
// it will accept a parameter whic is reducer functioin and reducer function have inital state of application this is base on inital state of application
console.log("inital state" ,store.getState())
// we havwe bot given any state it will givev us inital state 

const unsubscribe = store.subscribe(()=>{})
// subscribe allow us to make changes to app state

// despatch method allow us to make update state it accept parametetr as an a action  we can also provide directly
store.dispatch(buyCake()) 
store.dispatch(buyCake()) 
store.dispatch(buyCake())
store.dispatch(buyIceCrem())
store.dispatch(buyIceCrem())
unsubscribe()
// WE HAVE ALSO buy icecrem
// final part is to unsubscribe from the store by calling subscribe method
// these are all responsciblty of redux store run tha file
// we will see the a state have be reduce from the initat state  we are using redux library
// reducer control the main action
// now if we run app it show whole detail of item num of icecrem and Cake 

// if we have larde objedt it will be very confusing for us to manage difeernt Propertes of object so we will make differnt reducer  to do our work

// now we will split reducer into two 

// we will import redux-logger and craet a logger in our app and define it at the top of app and user it in redux-store applyMiddleware and pass logger as a propas
// it will give us all detail of logg and change in the state