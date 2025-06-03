export interface Task {
  id: string
  title: string
  description: string
  completed: boolean
  createdAt: string
  priority?: 'low' | 'medium' | 'high'
  tags?: string[]
  listId?: number
}

export interface TodoList {
  id: number
  title: string
  icon?: number
  tasks: Task[]
}

export interface TodoState {
  currentList: TodoList | null
  lists: TodoList[]
  currentTask: Task | null
}
