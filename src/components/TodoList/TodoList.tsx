import { Box, Button, Divider, FormControl, Input, InputLabel, Paper, styled, Tab, Tabs, Typography, } from '@mui/material'
import { Container } from '@mui/system'
import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/storeHooks/storeHooks'
import { addTodo, ITodo, toggleCompleted, removeCompletedToDos } from '../../store/todosSlice/todosSlice'
import './TodoList.scss'

import completeImg from '../../imgs/complete.svg'

const TodoList = () => {

    const StyledButton = styled(Button)((props) => ({
        marginLeft: 'auto',
        [props.theme.breakpoints.down('sm')]: {
            padding: '5px',
            fontSize: '12px',
        },
    }))

    const { todosList } = useAppSelector(state => state.todos)
    const [currentTabValue, setCurrentTabValue] = useState('all')
    const [inputValue, setInputValue] = useState('')
    const [todos, setTodos] = useState<ITodo[]>(todosList || [])
    const dispatch = useAppDispatch();

    useEffect(() => {
        setTodos(todosList)

        function windowHandler(e: any) {
            if (e.key === 'Enter') {
                addToDoHandler()
            }
        }
        window.addEventListener('keypress', windowHandler)
        return () => {
            window.removeEventListener('keypress', windowHandler)
        }

    }, [todosList, addToDoHandler])

    const changeCurrentTabValue = (event: React.SyntheticEvent, tabValue: string) => {
        setCurrentTabValue(tabValue);
    }

    function addToDoHandler() {
        if (inputValue) {
            dispatch(addTodo(inputValue))
            setInputValue('')
        }
    }

    const toggleCompletedHandler = (e: any) => {
        const id = e.target.getAttribute("data-todoid")
        dispatch(toggleCompleted(id))
    }

    const removeCompletedToDosHandler = () => {
        dispatch(removeCompletedToDos())
    }

    return (
        <Container>
            <Paper elevation={3} sx={{ mt: 2, p: 2 }}>
                <div className="todo-list">
                    <Typography fontSize={{ xs: "2.5rem", sm: "3.5rem", md: "3.75rem" }} component="h2" sx={{ mb: 3 }} >TodoList</Typography>
                    <div className="todo-list__form-wrapper">
                        <FormControl className="todo-list__form" sx={{ mb: 3 }}>
                            <InputLabel htmlFor=""> Add new ToDo</InputLabel>
                            <Input data-testid="todo-input" className="todo-list__input" value={inputValue} onChange={(e) => setInputValue(e.target.value)} id="my-input" aria-describedby="my-helper-text" />
                        </FormControl>
                        <Button data-testid="todo-input-button" variant="contained" sx={{ ml: 2 }} onClick={addToDoHandler}>+</Button>
                    </div>
                </div>
                <Box sx={{ borderBottom: 1, borderColor: 'divider', display: 'flex', justifyContent: 'center' }}>
                    <Tabs
                        value={currentTabValue}
                        onChange={changeCurrentTabValue}
                        textColor="primary"
                        indicatorColor="primary"
                        aria-label="secondary tabs example"
                        sx={{ mb: 3, }}
                    >
                        <Tab value="all" label="All" />
                        <Tab value="active" label="Active" />
                        <Tab value="complited" label="Complited" />
                    </Tabs>
                </Box>
                <Paper sx={{ m: 3, }}>
                    <div data-value="all" className={`todo-list__tab-content tab-content ${currentTabValue === "all" ? 'active' : ''}`} >
                        <Typography fontSize={{ xs: "1.5rem", sm: "2rem", md: "2rem" }} component="p" className="tab-content__title">List of all todos:</Typography>
                        <Divider />

                        {todos.map(todo => {
                            return (
                                <div key={todo.id}>
                                    <div data-testid="todo-card" className='todo-card'>
                                        <button data-todoid={todo.id} className={`todo-card__complete ${todo.completed ? 'completed' : ''}`} onClick={toggleCompletedHandler}><img src={completeImg} alt='Button toggle completed task' /></button>
                                        <p className={`todo-card__text ${todo.completed ? 'completed' : ''}`}>{todo.text}</p>
                                    </div>
                                    <Divider />
                                </div>
                            )
                        })}
                        <div className="tab-content__footer">
                            <p>{`ToDos left to complete: ${todosList.filter(todo => todo.completed === false).length}`}</p>
                            <StyledButton data-testid="todo-clear-button" variant="contained" onClick={removeCompletedToDosHandler}>Clear completed</StyledButton>
                        </div>
                    </div>

                    <div data-value="active" className={`todo-list__tab-content tab-content ${currentTabValue === "active" ? 'active' : ''}`} >
                        <Typography fontSize={{ xs: "1.5rem", sm: "2rem", md: "2rem" }} component="p" className="tab-content__title">List of active todos:</Typography>
                        <Divider />
                        {todos.map(todo => {
                            if (todo.completed === false) {
                                return (
                                    <div key={todo.id}>
                                        <div data-testid="todo-card" className='todo-card'>
                                            <button data-todoid={todo.id} className={`todo-card__complete ${todo.completed ? 'completed' : ''}`} onClick={toggleCompletedHandler}><img src={completeImg} alt='Button toggle completed task' /></button>
                                            <p className={`todo-card__text ${todo.completed ? 'completed' : ''}`}>{todo.text}</p>
                                        </div>
                                        <Divider />
                                    </div>
                                )
                            }
                        })}
                        <div className="tab-content__footer">
                            <p>{`Active ToDos: ${todosList.filter(todo => todo.completed === false).length}`}</p>

                        </div>
                    </div>

                    <div data-value="complited" className={`todo-list__tab-content tab-content ${currentTabValue === "complited" ? 'active' : ''}`} >
                        <Typography fontSize={{ xs: "1.3rem", sm: "2rem", md: "2rem" }} component="p" className="tab-content__title">List of completed todos:</Typography>
                        <Divider />
                        {todos.map(todo => {
                            if (todo.completed === true) {
                                return (
                                    <div key={todo.id}>
                                        <div data-testid="todo-card" className='todo-card'>
                                            <button data-todoid={todo.id} className={`todo-card__complete ${todo.completed ? 'completed' : ''}`} onClick={toggleCompletedHandler}><img src={completeImg} alt='Button toggle completed task' /></button>
                                            <p className={`todo-card__text ${todo.completed ? 'completed' : ''}`}>{todo.text}</p>
                                        </div>
                                        <Divider />
                                    </div>
                                )
                            }
                        })}
                        <div className="tab-content__footer">
                            <p>{`Completed ToDos: ${todosList.filter(todo => todo.completed === true).length}`}</p>
                            <StyledButton data-testid="todo-clear-button" variant="contained" onClick={removeCompletedToDosHandler}>Clear completed</StyledButton>
                        </div>
                    </div>

                </Paper>
            </Paper>
        </Container >
    )
}

export default TodoList

