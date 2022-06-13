import { TabPanel } from '@mui/lab'
import { Box, Button, Divider, FormControl, FormHelperText, Input, InputLabel, makeStyles, Paper, styled, Tab, Tabs, Typography, } from '@mui/material'
import { Container } from '@mui/system'
import React, { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/storeHooks/storeHooks'
import './TodoList.scss'

const TodoList = () => {

    const StyledButton = styled(Button)({
        marginLeft: 'auto',
    })

    const [currentTabValue, setCurrentTabValue] = useState('all');
    const { loading, error } = useAppSelector(state => state.todos)
    const dispatch = useAppDispatch();

    console.log(loading, error)

    const changeCurrentTabValue = (event: React.SyntheticEvent, tabValue: string) => {
        setCurrentTabValue(tabValue);
    };



    return (
        <Container>
            <Paper elevation={3} sx={{ mt: 2, p: 2 }}>
                <div className='todo-list'>
                    <Typography variant="h2" component="h2" sx={{ mb: 3 }}>TodoList</Typography>
                    <div className='todo-list__form-wrapper'>
                        <FormControl className="todo-list__form" sx={{ mb: 3 }}>
                            <InputLabel htmlFor=""> Add new ToDo</InputLabel>
                            <Input id="my-input" aria-describedby="my-helper-text" />
                        </FormControl>
                        <Button variant="contained" sx={{ ml: 2 }}>+</Button>
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
                        <Typography variant="h4" component="p" className="tab-content__title">List of all todos:</Typography>
                        <Divider />
                        <p>content</p>
                        <Divider />
                        <p>content</p>
                        <div className="tab-content__footer">
                            <p>Todos left to complete: 1</p>
                            <StyledButton variant="contained">Clear completed</StyledButton>
                        </div>
                    </div>
                    <div data-value="active" className={`todo-list__tab-content tab-content ${currentTabValue === "active" ? 'active' : ''}`} >
                        <Typography variant="h4" component="p" className="tab-content__title">List of active todos:</Typography>
                        <Divider />
                        <p>content</p>
                        <Divider />
                        <p>content</p>
                        <div className="tab-content__footer">
                            <p>Todos left to complete: 1</p>
                            <StyledButton variant="contained">Clear completed</StyledButton>
                        </div>
                    </div>
                    <div data-value="complited" className={`todo-list__tab-content tab-content ${currentTabValue === "complited" ? 'active' : ''}`} >
                        <Typography variant="h4" component="p" className="tab-content__title">List of completed todos</Typography>
                        <Divider />
                        <p>content</p>
                        <Divider />
                        <p>content</p>
                        <div className="tab-content__footer">
                            <p>Todos left to complete: 1</p>
                            <StyledButton variant="contained">Clear completed</StyledButton>
                        </div>
                    </div>
                </Paper>
            </Paper>
        </Container >
    )
}

export default TodoList