// an action is an object that return type property with an action to be perform 
// we are runnning this aas a simple node-js app
const redux =require("redux")
const creatStore=redux.createStore
const combineReducer =redux.combineReducers
// we will combine two reducer together combineReducer is meyhod of redux
const BUY_CAKE="Buy-Cake"
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
// first redux action created and now cereat a reducer function take prevstate AND return new state
// now we will creat multiple reducer in our app 
const initalState={
    numofCake:10,
    numofIceCrem:20
} 


//  ..state make a copy of state object because in  real world it will have more than one states  in above reducer function if a cake is seel from the shop the 1 wil be subtracted an d we have pass inital value as a state it retue value according to the case

const store =creatStore(reducer)
// it will accept a parameter whic is reducer functioin and reducer function have inital state of application this is base on inital state of application
console.log("inital state" ,store.getState())
// we havwe bot given any state it will givev us inital state 

const unsubscribe = store.subscribe(()=>console.log("Update state", store.getState()))
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

const initalCake = {
    numofCake : 10
}
const initalIceCrem ={
    numofIceCrem :20
}
// now we will split reducer into two 

const cakeReducer = (state=initalCake,action)=>{
    switch (action) {
        case BUY_CAKE: return {
            ...state, 
            numofCake: state.numofCake-1
        }
        default:return state
    }
}

const iceReducer = (state=initalIceCrem,action)=>{
    switch (action) {
        case BUY_CAKE: return {
            ...state, 
            numofCake: state.numofCake-1
        }
        default:return state
    }
}
const rootReducer=combineReducer({
    cake: cakeReducer,
    iceCrem: iceReducer 
})
const storeOne= creatStore(rootReducer)
// this is our second reducedr store that will take root reducer 
console.log("inital state",storeOne.getState())
const unsubscribeOne= storeOne.subscribe(()=>console.log('Update Store',storeOne.getState()))
storeOne.dispatch(iceReducer())
storeOne.dispatch(iceReducer())
storeOne.dispatch(iceReducer())
storeOne.dispatch(iceReducer())
storeOne.dispatch(cakeReducer())
storeOne.dispatch(cakeReducer())
storeOne.dispatch(cakeReducer())
unsubscribeOne()