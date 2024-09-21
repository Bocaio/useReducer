import {  useEffect, useReducer, useRef, useState } from "react";

// Initializing state for reducer
const reduceState = { 
    loading : false,
    data : {},
    city : 'London'
}

// component for Reducer 
const  Reducer = () => {

// reducer function
    function reducer(state,action) {
        switch(action.type) {
            case 'Loading': 
            return {...state, loading : true};
            case 'Change_City':
            return {...state,city : action.payload};
            case 'Set_State' :
            return {...state, data : action.payload,loading : false};
            default : 
            return {...state};
        }
}
    const [state,dispatch] = useReducer(reducer,reduceState);
    const inputCity = useRef("London");

    const fetchStudents = async (city,signal) => {
        //fetching data with GET method
        const res = await fetch(`http://api.weatherapi.com/v1/current.json?key=d1251874866e4d93bdd203055241809&q=${city}&aqi=yes`,{method : 'GET',signal : signal,headers : {
            key : 'd1251874866e4d93bdd203055241809'
        }});
        const data = await res.json();
        dispatch({type : 'Set_State', payload : data.current}); // seting data from the result of API
    }

    const handleInputCity = () => dispatch({type : 'Change_City' ,payload : inputCity.current.value}) // changing city with dispatch

    useEffect(() => {
    // creating AbortController
    const controller = new AbortController();
    const signal = controller.signal;
    // Setting Loading with Dispatch
    dispatch({type : 'Loading'})
    fetchStudents(state.city,signal);
        // return () => controller.abort();

    },[state.city])
    return <div>
        <input ref={inputCity}></input>
        <button onClick={handleInputCity}>CLick Me</button>
        {state.loading ? 'Loading' : 'Data Fetching completed!'}
        </div>
}
export default Reducer;