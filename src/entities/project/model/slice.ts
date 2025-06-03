import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Task, TodoList, TodoState } from './types'

const MOCK_LISTS: TodoList[] = [
  {
    id: 1,
    title: 'Личные задачи',
    icon: 1,
    tasks: [
      {
        id: '1',
        title: 'Купить продукты',
        description: 'Молоко, хлеб, яйца',
        completed: false,
        createdAt: '2024-05-01',
        priority: 'medium',
        tags: ['покупки'],
      },
      {
        id: '2',
        title: 'Позвонить маме',
        description: 'Поздравить с днем рождения',
        completed: true,
        createdAt: '2024-05-10',
        priority: 'high',
      },
    ],
  },
  {
    id: 2,
    title: 'Рабочие задачи',
    icon: 3,
    tasks: [
      {
        id: '3',
        title: 'Завершить отчет',
        description: 'Подготовить квартальный отчет',
        completed: false,
        createdAt: '2024-05-15',
        priority: 'high',
        tags: ['работа', 'важно'],
      },
    ],
  },
]

const initialState: TodoState = {
  currentList: MOCK_LISTS[0],
  lists: MOCK_LISTS,
  currentTask: null,
}

const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    setCurrentList: (state, action: PayloadAction<TodoList | null>) => {
      state.currentList = action.payload
    },
    addList: (
      state,
      action: PayloadAction<{ title: string; icon?: number }>
    ) => {
      const { title, icon } = action.payload
      const newList: TodoList = {
        id: Date.now(),
        title,
        icon,
        tasks: [],
      }
      state.lists.push(newList)
    },
    addTask: (
      state,
      action: PayloadAction<{
        listId: number
        task: Omit<Task, 'id' | 'completed' | 'createdAt'>
      }>
    ) => {
      const { listId, task } = action.payload
      const list = state.lists.find((l) => l.id === listId)

      if (list) {
        const newTask: Task = {
          ...task,
          id: Date.now().toString(),
          completed: false,
          createdAt: new Date().toISOString(),
        }
        list.tasks.push(newTask)

        if (state.currentList?.id === listId) {
          state.currentList = { ...list }
        }
      }
    },
    toggleTaskCompletion: (
      state,
      action: PayloadAction<{ listId: number; taskId: string }>
    ) => {
      const { listId, taskId } = action.payload
      const list = state.lists.find((l) => l.id === listId)

      if (list) {
        const task = list.tasks.find((t) => t.id === taskId)
        if (task) {
          task.completed = !task.completed

          if (state.currentList?.id === listId) {
            state.currentList = { ...list }
          }

          if (state.currentTask?.id === taskId) {
            state.currentTask = { ...task }
          }
        }
      }
    },
    updateTask: (
      state,
      action: PayloadAction<{
        listId: number
        taskId: string
        updates: Partial<Task>
      }>
    ) => {
      const { listId, taskId, updates } = action.payload
      const list = state.lists.find((l) => l.id === listId)

      if (list) {
        const task = list.tasks.find((t) => t.id === taskId)
        if (task) {
          Object.assign(task, updates)

          if (state.currentList?.id === listId) {
            state.currentList = { ...list }
          }

          if (state.currentTask?.id === taskId) {
            state.currentTask = { ...task }
          }
        }
      }
    },
    deleteTask: (
      state,
      action: PayloadAction<{ listId: number; taskId: string }>
    ) => {
      const { listId, taskId } = action.payload
      const list = state.lists.find((l) => l.id === listId)

      if (list) {
        list.tasks = list.tasks.filter((t) => t.id !== taskId)

        if (state.currentList?.id === listId) {
          state.currentList = { ...list }
        }

        if (state.currentTask?.id === taskId) {
          state.currentTask = null
        }
      }
    },
    setCurrentTask: (state, action: PayloadAction<Task | null>) => {
      state.currentTask = action.payload
    },
    updateListTitle: (
      state,
      action: PayloadAction<{ listId: number; newTitle: string }>
    ) => {
      const { listId, newTitle } = action.payload
      const list = state.lists.find((l) => l.id === listId)

      if (list) {
        list.title = newTitle

        if (state.currentList?.id === listId) {
          state.currentList = { ...list }
        }
      }
    },
  },
})

export const {
  setCurrentList,
  addList,
  addTask,
  toggleTaskCompletion,
  updateTask,
  deleteTask,
  setCurrentTask,
  updateListTitle,
} = todoSlice.actions

export default todoSlice.reducer
