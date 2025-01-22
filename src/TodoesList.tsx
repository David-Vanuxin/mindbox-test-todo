import React from 'react'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';

import {Todo, TodoStatus} from "./types"

type setTodoesFunction = (todoes: Todo[]) => void
type completeTodoFunction = (todo: Todo) => void

export default function TodoesList(props: { todoes: Todo[], setTodoes: setTodoesFunction, selectedStatus: TodoStatus }) {

	function completeTodo(todo: Todo) {
		const index = props.todoes.findIndex(elem => elem.id == todo.id)
		const found = props.todoes[index]
		found.completed = !found.completed
		props.setTodoes([...props.todoes])
	}

	return (<>
		<List>
		{
			props.todoes.map(todo => {
				if (props.selectedStatus != "all") {
					if (props.selectedStatus == 'completed' && !todo.completed) return
					if (props.selectedStatus == 'active' && todo.completed) return
				}

				return (<TodoItem key={todo.id} todo={todo} completeTodo={completeTodo}/>)
			})
		}
		</List>
	</>)
}

type textDecorationUnion = "none" | "line-through"

function TodoItem(props: { todo: Todo, completeTodo: completeTodoFunction }) {
	const [textDecoration, setTextDecoration] = React.useState<textDecorationUnion>('none')

	React.useEffect(() => {
		if (props.todo.completed) {
			setTextDecoration("line-through")
		} else {
			setTextDecoration("none")
		}
	}, [props.todo.completed])

	return (<>
		<ListItem>
			<Checkbox onChange={() => props.completeTodo(props.todo)} checked={props.todo.completed}/>
			<ListItemText style={{ textDecoration }}>{props.todo.text}</ListItemText>
		</ListItem>
	</>)
}