export interface Todo {
	id: number,
	text: string;
	completed: boolean 
}

export type TodoStatus = "all" | "completed" | "active"
export type SelectTodoStatus = (status: TodoStatus) => void