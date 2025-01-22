/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom'
import {render, screen, fireEvent} from '@testing-library/react'
import App from "../src/App"
import React from "react"

test('Type text to input', () => {
  render(<App />)
  const input = screen.getByPlaceholderText("Type new todo")
  const value = "NEW TODO 123"
  fireEvent.change(input, {
    target: { value }
  })
  expect(input).toHaveValue(value)
})

test('Clear input after press Enter', () => {
  render(<App />)
  const input = screen.getByPlaceholderText("Type new todo")
  const value = "NEW TODO 123"
  fireEvent.change(input, {
    target: { value }
  })
  fireEvent.keyPress(input, { key: "Enter", code: 'Enter', charCode: 13 })
  expect(input).toHaveValue("")
})

test('Create todo', () => {
  render(<App />)
  const input = screen.getByPlaceholderText("Type new todo")
  const value = "NEW TODO"
  fireEvent.change(input, {
    target: { value }
  })
  fireEvent.keyPress(input, { key: "Enter", code: 'Enter', charCode: 13 })
  screen.getByText(value)
  expect(screen.getByRole("checkbox")).not.toBeChecked()
})

test('Filter by status', () => {
  render(<App />)
  const input = screen.getByPlaceholderText("Type new todo")

  function addTodo(value: "completed" | "active"): void {
    fireEvent.change(input, {
      target: { value }
    })
    fireEvent.keyPress(input, { key: "Enter", code: 'Enter', charCode: 13 })
  }

  addTodo("completed todo")
  addTodo("completed todo")

  screen.getAllByRole("checkbox").forEach(checkbox => fireEvent.click(checkbox))

  addTodo("active todo")
  addTodo("active todo")
  addTodo("active todo")

  fireEvent.click( screen.getByText("Completed") )
  expect(screen.getAllByText(/completed/)).toHaveLength(2)

  fireEvent.click( screen.getByText("Active") )
  expect(screen.getAllByText(/active/)).toHaveLength(3)

  fireEvent.click( screen.getByText("All") )
  expect(screen.getAllByText(/todo/)).toHaveLength(5)
})