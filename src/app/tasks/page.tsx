'use client';

import React, {useState} from 'react';
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {PlusIcon} from 'lucide-react';

interface TaskCardProps {
  text: string;
  priority: 'Baixa' | 'Média' | 'Alta';
}

const TaskCard: React.FC<TaskCardProps> = ({text, priority}) => {
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
  tasks: {text: string; priority: 'Baixa' | 'Média' | 'Alta'}[]
  // onAddTask: (task: string, priority: 'Baixa' | 'Média' | 'Alta') => void;
  taskCount: number;
}

const TaskColumn: React.FC<TaskColumnProps> = ({title, tasks, /*onAddTask,*/ taskCount}) => {
  // const [newTask, setNewTask] = useState('');
  // const [newPriority, setNewPriority] = useState<'Baixa' | 'Média' | 'Alta'>('Média');

  // const handleAddTask = () => {
  //   if (newTask.trim() !== '') {
  //     onAddTask(newTask, newPriority);
  //     setNewTask('');
  //   }
  // };

  return (
    <div className="flex flex-col items-center w-full min-w-[300px]">
      <Card className="w-full mb-4 shadow-md">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-center">{title}</CardTitle>
          <div className="rounded-full bg-secondary text-secondary-foreground h-6 w-6 flex items-center justify-center text-xs">
            {taskCount}
          </div>
        </CardHeader>
      </Card>
      {tasks.map((task, index) => (
        <TaskCard key={index} text={task.text} priority={task.priority} />
      ))}
      {/* <div className="w-full mt-2">
        <Input
          type="text"
          placeholder="New task"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          className="mb-2"
        />
        <select
          value={newPriority}
          onChange={(e) => setNewPriority(e.target.value as 'Baixa' | 'Média' | 'Alta')}
          className="w-full mb-2 bg-background border border-input rounded-md px-3 py-2 text-sm"
        >
          <option value="Baixa">Baixa</option>
          <option value="Média">Média</option>
          <option value="Alta">Alta</option>
        </select>
        <Button onClick={handleAddTask} className="w-full">
          Add Task
        </Button>
      </div> */}
    </div>
  );
};

const Tasks: React.FC = () => {
  const [todoTasks, setTodoTasks] = useState<{text: string; priority: 'Baixa' | 'Média' | 'Alta'}[]>([]);
  const [inProgressTasks, setInProgressTasks] = useState<{text: string; priority: 'Baixa' | 'Média' | 'Alta'}[]>([]);
  const [completedTasks, setCompletedTasks] = useState<{text: string; priority: 'Baixa' | 'Média' | 'Alta'}[]>([]);

  // const handleAddTodoTask = (task: string, priority: 'Baixa' | 'Média' | 'Alta') => {
  //   setTodoTasks([...todoTasks, {text: task, priority}]);
  // };

  // const handleAddInProgressTask = (task: string, priority: 'Baixa' | 'Média' | 'Alta') => {
  //   setInProgressTasks([...inProgressTasks, {text: task, priority}]);
  // };

  // const handleAddCompletedTask = (task: string, priority: 'Baixa' | 'Média' | 'Alta') => {
  //   setCompletedTasks([...completedTasks, {text: task, priority}]);
  // };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Quadro Kanban</h1>
        <Button>
          <PlusIcon className="mr-2" />
          Criar Tarefa
        </Button>
      </div>
      <div className="flex justify-start space-x-4 overflow-x-auto">
        <TaskColumn
          title="A fazer"
          tasks={todoTasks}
          // onAddTask={handleAddTodoTask}
          taskCount={todoTasks.length}
        />
        <TaskColumn
          title="Em progresso"
          tasks={inProgressTasks}
          // onAddTask={handleAddInProgressTask}
          taskCount={inProgressTasks.length}
        />
        <TaskColumn
          title="Concluído"
          tasks={completedTasks}
          // onAddTask={handleAddCompletedTask}
          taskCount={completedTasks.length}
        />
      </div>
    </div>
  );
};

export default Tasks;

    