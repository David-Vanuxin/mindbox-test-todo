import React from "react" 
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';

import { SelectTodoStatus, TodoStatus } from "./types"

type ChipView = "outlined" | "filled"

interface IFilterView {
  all: ChipView,
  active: ChipView,
  completed: ChipView
}

const defaultFilterView: IFilterView = { all: "outlined", active: "outlined", completed: "outlined"}

export default function FilterControls(props: { setSelectedStatus: SelectTodoStatus }) {
  const [chipView, setChipView] = React.useState<IFilterView>({...defaultFilterView, all: "filled"})

  function selectStatus(status: TodoStatus) {
    props.setSelectedStatus(status)
    switch (status) {
    case "all":
      setChipView({...defaultFilterView, all: "filled"})
      break
    case "active":
      setChipView({...defaultFilterView, active: "filled"})
      break
    case "completed":
      setChipView({...defaultFilterView, completed: "filled"})
      break
    }
  }

  return (<Container maxWidth="sm" sx={{ mb: 1 }}>
    <Stack direction="row" spacing={1}>
      <Chip label="All" variant={chipView.all} onClick={() => selectStatus("all") } />
      <Chip label="Active" variant={chipView.active} onClick={() => selectStatus("active") } />
      <Chip label="Completed" variant={chipView.completed} onClick={() => selectStatus("completed") } />
    </Stack>
  </Container>)
}