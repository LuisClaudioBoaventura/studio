'use client';

import React, {useState} from 'react';
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';

interface TaskCardProps {
  text: string;
}

const TaskCard: React.FC<TaskCardProps> = ({text}) => {
  return (
    <Card className="w-full shadow-md">
      <CardContent>
        <p>{text}</p>
      </CardContent>
    </Card>
  );
};

interface TaskColumnProps {
  title: string;
  tasks: string[];
  onAddTask: (task: string) => void;
}

const TaskColumn: React.FC<TaskColumnProps> = ({title, tasks, onAddTask}) => {
  const [newTask, setNewTask] = useState('');

  const handleAddTask = () => {
    if (newTask.trim() !== '') {
      onAddTask(newTask);
      setNewTask('');
    }
  };

  return (
    <div className="flex flex-col items-center w-full max-w-sm">
      <Card className="w-full mb-4 shadow-md">
        <CardHeader>
          <CardTitle className="text-center">{title}</CardTitle>
        </CardHeader>
      </Card>
      {tasks.map((task, index) => (
        <TaskCard key={index} text={task} />
      ))}
      <div className="w-full mt-2">
        <Input
          type="text"
          placeholder="New task"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          className="mb-2"
        />
        <Button onClick={handleAddTask} className="w-full">
          Add Task
        </Button>
      </div>
    </div>
  );
};

const Tasks: React.FC = () => {
  const [todoTasks, setTodoTasks] = useState<string[]>([]);
  const [inProgressTasks, setInProgressTasks] = useState<string[]>([]);
  const [completedTasks, setCompletedTasks] = useState<string[]>([]);

  const handleAddTodoTask = (task: string) => {
    setTodoTasks([...todoTasks, task]);
  };

  const handleAddInProgressTask = (task: string) => {
    setInProgressTasks([...inProgressTasks, task]);
  };

  const handleAddCompletedTask = (task: string) => {
    setCompletedTasks([...completedTasks, task]);
  };

  return (
    <div className="flex justify-center space-x-4 p-4">
      <TaskColumn title="A fazer" tasks={todoTasks} onAddTask={handleAddTodoTask} />
      <TaskColumn title="Em progresso" tasks={inProgressTasks} onAddTask={handleAddInProgressTask} />
      <TaskColumn title="Concluído" tasks={completedTasks} onAddTask={handleAddCompletedTask} />
    </div>
  );
};

export default Tasks;
