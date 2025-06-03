import { RootState } from 'shared/config/redux/store'

export const selectCurrentList = (state: RootState) => state.todo.currentList

export const selectCurrentTask = (state: RootState) => state.todo.currentTask

export const selectAllLists = (state: RootState) => state.todo.lists

export const selectTasksForCurrentList = (state: RootState) =>
  state.todo.currentList?.tasks || []

export const selectActiveTasks = (state: RootState) =>
  state.todo.currentList?.tasks.filter((task) => !task.completed) || []

export const selectCompletedTasks = (state: RootState) =>
  state.todo.currentList?.tasks.filter((task) => task.completed) || []
