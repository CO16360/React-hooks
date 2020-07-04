import React from 'react'

const List = (props) => {
    console.log('Rendering the list');
    return (
        <div>
             <ul>
            {
                props.todoList.map(todo => <li key={todo.id} onClick={() => props.todoRemoveHandler(todo.id)}>{todo.name}</li>)
            }
        </ul>
        </div>
    )
}

export default List

