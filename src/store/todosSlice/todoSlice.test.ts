
import reducer, { addTodo, toggleCompleted, removeCompletedToDos, ITodosState } from './todosSlice'

test('should return the initial state', () => {
    expect(reducer(undefined, {} as any)).toEqual(
        {
            todosList: [],
        }
    )
})

test('should add todo', () => {
    const previousState: ITodosState = { todosList: [] }
    const newState = reducer(previousState, addTodo('add todo'))
    expect(newState.todosList[0].text).toBe('add todo')
})

test('should toggleCompleted', () => {
    const previousState: ITodosState = {
        todosList: [
            {
                id: '1',
                text: 'todo',
                completed: false,
            },
            {
                id: '2',
                text: 'todo2',
                completed: false,
            }
        ]
    }
    const todoCompleted = previousState.todosList.find(todo => todo.id === '2')!.completed
    let newState = reducer(previousState, toggleCompleted('2'))
    expect(newState.todosList.find(todo => todo.id === '2')!.completed).toEqual(true)
    newState = reducer(newState, toggleCompleted('2'))
    expect(newState.todosList.find(todo => todo.id === '2')!.completed).toEqual(false)
})

test('remove completed todos', () => {
    const previousState: ITodosState = {
        todosList: [
            {
                id: '1',
                text: 'todo',
                completed: false,
            },
            {
                id: '2',
                text: 'todo2',
                completed: true,
            },
            {
                id: '3',
                text: 'todo3',
                completed: true,
            }
        ]
    }

    const newState = reducer(previousState, removeCompletedToDos())
    expect(newState.todosList.every(todo => todo.completed === true)).toBe(false)
})
