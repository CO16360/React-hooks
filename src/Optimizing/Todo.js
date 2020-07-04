import React, { useState, useEffect, useReducer, useRef, useMemo } from 'react';
// use in beginning means that it is a hook
// useState is a function
import axios from 'axios';
import List from './List'

const Todo = props => {// Component name must start from capital letter otherwise we get a error:
    //React Hook "useState" is called in function "todo" which is neither component

    // const inputState = useState(''); // this function takes initial state e.g. empty string,0, null empty object
    // it returns an array to be precise having 2 values ie. current state (inputState[0]) & function (inputState[1]) to manipulate that state which is given by react  

    const [inputIsValid , setInputIsValid]=useState(false)  // for optimizing example


    //applying array destructuring
    const [todoName, setTodoName] = useState('');
    // const [submittedTodo, setSubmittedTodo] = useState(null);  // state and effect gotchas i.e to get rid of lock of state in function  //not req with usereducer() as reducer function receives latest state guaranteed by react

    // useReducer() is powerful alternative to useState()
    // const [todoList, setTodoList] = useState([]); // we can have as many useState() as we wish

    const todoInputRef = useRef()  // hook used to use ref in functional components 


    const todoListReducer = (state, action) => {  // react passes these arguments automatically for us
        switch (action.type) {   // we always return a new state
            case 'ADD':
                return state.concat(action.payload);
            case "SET":
                return action.payload;
            case 'REMOVE':
                return state.filter(todo => todo.id !== action.payload);
            default:
                return state;
        }

    }

    //we get 2 things 1. state  2. dispatch function that we can call
    const [todoList, dispatch] = useReducer(todoListReducer, [])   //reducer function, starting state, initial action


    // called after evry render cycyle by default
    // useEffect takes 2 parameters 1. function 2. array of values change to whom calls it again
    useEffect(() => {
        axios.get('https://todo-hooks-b7726.firebaseio.com/todos.json')
            .then(response => {
                console.log(response)
                const todoData = response.data
                const todos = []
                for (const key in todoData) {
                    todos.push({
                        id: key,
                        name: todoData[key].name
                    })
                }
                dispatch({ type: 'SET', payload: todos });
            });
        // clean up work react does before it applies effect of main code so we can clen up after last useEffect
        return () => {
            console.log("cleanup")
        }

    }, [todoName])  //[] lets it work as componentDidMount()
    //[todoname] lets it works as componentDidMount + componentDidUpdate based on todoname


    //clean up example
    const mouseMoveHandler = event => {
        console.log(event.clientX, event.clientY)
    }


    // useEffect(
    //     () => {
    //         if (submittedTodo) {
    //             dispatch({type:'ADD'  , payload: submittedTodo})   // concat returns new array     
    //         }
    //     } , [submittedTodo])

    // NO NEED OF THIS METHOD WITH useRef() hook
    // const inputChangeHandler = (event) => {  // a  function in function is possible in Js
    //     //  inputState[1](event.target.value)
    //     setTodoName(event.target.value)
    // }

    const inputValidationHandler=event=>{
        if (event.target.value.trim()===''){
            setInputIsValid(false);
        }
        else{
            setInputIsValid(true);
        }

    }

    const todoAddHandler = () => {
        const todoName = todoInputRef.current.value


        axios.post("https://todo-hooks-b7726.firebaseio.com/todos.json", { name: todoName })
            .then(response => {
                setTimeout(() => {
                    const todoItem = { id: response.data.name, name: todoName }
                    dispatch({ type: "ADD", payload: todoItem })
                }, 3000)
            })
            .catch(error => {
                console.log(error);
            })
    }

    const todoRemoveHandler = (todoId) => {
        axios.delete(`https://todo-hooks-b7726.firebaseio.com/todos/${todoId}.json`)
            .then(res => {
                dispatch({ type: "REMOVE", payload: todoId })

            })
            .catch(err => {
                console.log(err)
            }
            )

    }

    return (<React.Fragment>
        <input type="text"
            placeholder="Todo"
            // onChange={inputChangeHandler}   NO NEED OF onChange and value attribute while using useRef() Hook
            // value={todoName}
            ref={todoInputRef}
            onChange={inputValidationHandler}    // only for showing optimization example
            style={{backgroundColor: inputIsValid ? 'whitesmoke' : 'red'}}
       />
        <button type="button" onClick={todoAddHandler} >Add</button>
        {/* useMemo() takes function as arg. and this func ret value (don't necessarily to be jsx , can be number like 1 also) , 2nd parametr is an array of values based on changes to which component is re-rendered againrende */}
        {useMemo(() => <List todoList={todoList} todoRemoveHandler={todoRemoveHandler} /> , [todoList] //useMemo() can be used for memoization i.e caching values if their inputs don't change
        )}
    </React.Fragment>)

}

export default Todo;


