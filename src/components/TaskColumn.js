import React, { useState } from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components';

const TaskColumn = ({ title, columnId, tasks, addTask }) => {
  const [newTask, setNewTask] = useState('');

  const handleAddTask = () => {
    if (newTask.trim()) {
      addTask(columnId, newTask);
      setNewTask('');
    }
  };

  return (
    <ColumnContainer>
      <h2>{title}</h2>
      <Droppable droppableId={columnId}>
        {(provided) => (
          <TaskList {...provided.droppableProps} ref={provided.innerRef}>
            {tasks.map((task, index) => (
              <Draggable key={task.id} draggableId={task.id} index={index}>
                {(provided) => (
                  <TaskCard
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    {task.content}
                  </TaskCard>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </TaskList>
        )}
      </Droppable>
      <TaskInput
        type="text"
        placeholder="Add new task"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
      />
      <AddTaskButton onClick={handleAddTask}>Add Task</AddTaskButton>
    </ColumnContainer>
  );
};

const ColumnContainer = styled.div`
  width: 30%;
  padding: 20px;
  background-color: #f0f4f8;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
`;

const TaskList = styled.div`
  min-height: 100px;
  margin-bottom: 20px;
`;

const TaskCard = styled.div`
  background-color: white;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 4px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  font-size: 16px;
`;

const TaskInput = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 100%;
  margin-bottom: 10px;
`;

const AddTaskButton = styled.button`
  padding: 10px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #218838;
  }
`;

export default TaskColumn;
