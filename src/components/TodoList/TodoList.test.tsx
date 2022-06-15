import { render as rtlRender, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';

import store from '../../store';
import TodoList from './TodoList';

const render = (component: any) => rtlRender(
    <Provider store={store}>
        {component}
    </Provider>
)

describe('renders critical elements', () => {

    test('render input', () => {
        render(<TodoList />)
        const todoInput = screen.getByTestId('todo-input')
        expect(todoInput).toBeInTheDocument()
    })

    test('render clear button or buttons', () => {
        render(<TodoList />)
        const todoClearButton = screen.getAllByTestId('todo-clear-button')
        expect(todoClearButton).toBeTruthy()
    })

});

test('add todo on button click', async () => {
    render(<TodoList />)
    const todoInput = screen.getByTestId('todo-input').querySelector('input') as Element
    const todoInputButton = screen.getByTestId('todo-input-button')
    fireEvent.change(todoInput, { target: { value: 'add task' } })
    fireEvent.click(todoInputButton)
    const todoCard = screen.getAllByTestId('todo-card')
    expect(todoCard).toBetruthy
})
