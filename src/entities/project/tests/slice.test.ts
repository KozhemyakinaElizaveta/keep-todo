import todoReducer, {
  addList,
  addTask,
  deleteTask,
  setCurrentList,
  setCurrentTask,
  toggleTaskCompletion,
  updateListTitle,
  updateTask,
} from '../model/slice'
import { TodoState } from '../model/types'

describe('todoSlice', () => {
  const initialState: TodoState = {
    currentList: null,
    lists: [],
    currentTask: null,
  }

  const mockStateWithLists: TodoState = {
    currentList: {
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
      ],
    },
    lists: [
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
        ],
      },
      {
        id: 2,
        title: 'Рабочие задачи',
        icon: 3,
        tasks: [
          {
            id: '2',
            title: 'Завершить отчет',
            description: 'Подготовить квартальный отчет',
            completed: false,
            createdAt: '2024-05-15',
            priority: 'high',
            tags: ['работа', 'важно'],
          },
        ],
      },
    ],
    currentTask: null,
  }

  describe('setCurrentList', () => {
    it('should set current list', () => {
      const list = mockStateWithLists.lists[0]
      const action = setCurrentList(list)
      const state = todoReducer(initialState, action)

      expect(state.currentList).toEqual(list)
    })

    it('should set current list to null', () => {
      const action = setCurrentList(null)
      const state = todoReducer(mockStateWithLists, action)

      expect(state.currentList).toBeNull()
    })
  })

  describe('addList', () => {
    it('should add new list', () => {
      const newList = { title: 'Новый список', icon: 2 }
      const action = addList(newList)
      const state = todoReducer(initialState, action)

      expect(state.lists).toHaveLength(1)
      expect(state.lists[0].title).toBe(newList.title)
      expect(state.lists[0].icon).toBe(newList.icon)
      expect(state.lists[0].tasks).toEqual([])
    })
  })

  describe('addTask', () => {
    it('should add task to existing list', () => {
      const newTask = {
        listId: 1,
        task: {
          title: 'Новая задача',
          description: 'Описание новой задачи',
          priority: 'high' as const,
          tags: ['важно'],
        },
      }
      const action = addTask(newTask)
      const state = todoReducer(mockStateWithLists, action)

      const targetList = state.lists.find((l) => l.id === 1)
      expect(targetList?.tasks).toHaveLength(2)
      expect(targetList?.tasks[1].title).toBe(newTask.task.title)
    })

    it('should update currentList if task added to it', () => {
      const newTask = {
        listId: 1,
        task: {
          title: 'Новая задача',
          description: 'Описание новой задачи',
          priority: 'high' as const,
        },
      }
      const action = addTask(newTask)
      const state = todoReducer(mockStateWithLists, action)

      expect(state.currentList?.tasks).toHaveLength(2)
    })
  })

  describe('toggleTaskCompletion', () => {
    it('should toggle task completion status', () => {
      const action = toggleTaskCompletion({ listId: 1, taskId: '1' })
      const state = todoReducer(mockStateWithLists, action)

      const task = state.lists[0].tasks[0]
      expect(task.completed).toBe(true)
    })

    it('should update currentList and currentTask if they contain the toggled task', () => {
      const stateWithCurrentTask = {
        ...mockStateWithLists,
        currentTask: mockStateWithLists.lists[0].tasks[0],
      }
      const action = toggleTaskCompletion({ listId: 1, taskId: '1' })
      const state = todoReducer(stateWithCurrentTask, action)

      expect(state.currentList?.tasks[0].completed).toBe(true)
      expect(state.currentTask?.completed).toBe(true)
    })
  })

  describe('updateTask', () => {
    it('should update task properties', () => {
      const updates = {
        title: 'Обновленное название',
        priority: 'high' as const,
      }
      const action = updateTask({ listId: 1, taskId: '1', updates })
      const state = todoReducer(mockStateWithLists, action)

      const task = state.lists[0].tasks[0]
      expect(task.title).toBe(updates.title)
      expect(task.priority).toBe(updates.priority)
    })

    it('should update currentList and currentTask if they contain the updated task', () => {
      const stateWithCurrentTask = {
        ...mockStateWithLists,
        currentTask: mockStateWithLists.lists[0].tasks[0],
      }
      const updates = { title: 'Обновленное название' }
      const action = updateTask({ listId: 1, taskId: '1', updates })
      const state = todoReducer(stateWithCurrentTask, action)

      expect(state.currentList?.tasks[0].title).toBe(updates.title)
      expect(state.currentTask?.title).toBe(updates.title)
    })
  })

  describe('deleteTask', () => {
    it('should remove task from list', () => {
      const action = deleteTask({ listId: 1, taskId: '1' })
      const state = todoReducer(mockStateWithLists, action)

      expect(state.lists[0].tasks).toHaveLength(0)
    })

    it('should set currentTask to null if it was deleted', () => {
      const stateWithCurrentTask = {
        ...mockStateWithLists,
        currentTask: mockStateWithLists.lists[0].tasks[0],
      }
      const action = deleteTask({ listId: 1, taskId: '1' })
      const state = todoReducer(stateWithCurrentTask, action)

      expect(state.currentTask).toBeNull()
    })
  })

  describe('setCurrentTask', () => {
    it('should set current task', () => {
      const task = mockStateWithLists.lists[0].tasks[0]
      const action = setCurrentTask(task)
      const state = todoReducer(initialState, action)

      expect(state.currentTask).toEqual(task)
    })

    it('should set current task to null', () => {
      const action = setCurrentTask(null)
      const state = todoReducer(mockStateWithLists, action)

      expect(state.currentTask).toBeNull()
    })
  })

  describe('updateListTitle', () => {
    it('should update list title', () => {
      const newTitle = 'Новое название'
      const action = updateListTitle({ listId: 1, newTitle })
      const state = todoReducer(mockStateWithLists, action)

      expect(state.lists[0].title).toBe(newTitle)
    })

    it('should update currentList title if it was changed', () => {
      const newTitle = 'Новое название'
      const action = updateListTitle({ listId: 1, newTitle })
      const state = todoReducer(mockStateWithLists, action)

      expect(state.currentList?.title).toBe(newTitle)
    })
  })
})
