import React from 'react'
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';

import {Todo, TodoStatus} from "./types"
import TodoesList from "./TodoesList"
import FilterControls from "./FilterControls"

export default function App() {
  const [todoes, setTodoes] = React.useState<Todo[]>([])
  const [selectedStatus, setSelectedStatus] = React.useState<TodoStatus>("all")

  function onKeyPress(event: any): void {
    if (event.key == "Enter") {
      setTodoes([...todoes, {
        id: todoes.length,
        text: event.target.value,
        completed: false
      }])

      event.target.value = ""
    }
  }

  return (<Container maxWidth="sm">
    <Box sx={{ height: '100vh' }} >
      <Typography sx={{ textAlign: "center" }} variant="h2" component="h1">Todoes</Typography>
      <FilterControls setSelectedStatus={setSelectedStatus}/>
      <Container maxWidth="sm">
        <TextField onKeyPress={onKeyPress} fullWidth placeholder="Type new todo" variant="outlined"/>
        <TodoesList todoes={todoes} setTodoes={setTodoes} selectedStatus={selectedStatus}/>
      </Container>
    </Box>
  </Container>)
}
