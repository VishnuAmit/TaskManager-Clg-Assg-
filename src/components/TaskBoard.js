import React, { useState, useEffect } from 'react';
import TaskColumn from './TaskColumn';
import { DragDropContext } from 'react-beautiful-dnd';
import styled from 'styled-components';

const TaskBoard = () => {
  const [tasks, setTasks] = useState({
    todo: [],
    inProgress: [],
    done: []
  });

  // Load tasks from localStorage on component mount
  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks'));
    if (savedTasks) {
      setTasks(savedTasks);
    }
  }, []);

  // Save tasks to localStorage whenever the task state changes
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  // Handle the task movement across columns
  const onDragEnd = (result) => {
    const { source, destination } = result;

    if (!destination) return; // Return if dropped outside any column

    if (source.droppableId === destination.droppableId) {
      // If task is dropped in the same column, reorder tasks
      const column = [...tasks[source.droppableId]];
      const [movedTask] = column.splice(source.index, 1);
      column.splice(destination.index, 0, movedTask);

      setTasks({
        ...tasks,
        [source.droppableId]: column,
      });
    } else {
      // If task is moved to a different column
      const sourceColumn = [...tasks[source.droppableId]];
      const destinationColumn = [...tasks[destination.droppableId]];
      const [movedTask] = sourceColumn.splice(source.index, 1);

      destinationColumn.splice(destination.index, 0, movedTask);

      setTasks({
        ...tasks,
        [source.droppableId]: sourceColumn,
        [destination.droppableId]: destinationColumn,
      });
    }
  };

  // Add a task to a specific column, removing it from any other column
  const addTask = (columnId, taskContent) => {
    // Remove task with the same content from all columns
    const updatedTasks = {
      todo: tasks.todo.filter(task => task.content !== taskContent),
      inProgress: tasks.inProgress.filter(task => task.content !== taskContent),
      done: tasks.done.filter(task => task.content !== taskContent),
    };

    // Add the task to the new column
    setTasks({
      ...updatedTasks,
      [columnId]: [...updatedTasks[columnId], { id: Date.now().toString(), content: taskContent }]
    });
  };

  // Clear all tasks
  const clearAllTasks = () => {
    setTasks({
      todo: [],
      inProgress: [],
      done: []
    });
    localStorage.removeItem('tasks');
  };

  return (
    <>
      <ButtonContainer>
        <ClearButton onClick={clearAllTasks}>Clear All Tasks</ClearButton>
      </ButtonContainer>
      <DragDropContext onDragEnd={onDragEnd}>
        <BoardContainer>
          <TaskColumn title="To Do" columnId="todo" tasks={tasks.todo} addTask={addTask} />
          <TaskColumn title="In Progress" columnId="inProgress" tasks={tasks.inProgress} addTask={addTask} />
          <TaskColumn title="Done" columnId="done" tasks={tasks.done} addTask={addTask} />
        </BoardContainer>
      </DragDropContext>
    </>
  );
};

const BoardContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 40px;
  max-width: 1200px;
  margin: 0 auto;
  background-color: #ffffff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  overflow: hidden;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 20px 0;
`;

const ClearButton = styled.button`
  background-color: #ff6b6b;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #ff5252;
  }
`;

export default TaskBoard;
