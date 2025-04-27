'use client';

import React, {useState} from 'react';
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {PlusIcon} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger, // Import DialogTrigger
} from '@/components/ui/dialog';
import {Label} from '@/components/ui/label';
import {Textarea} from '@/components/ui/textarea';

interface TaskCardProps {
  text: string;
  priority: 'Baixa' | 'Média' | 'Alta';
}

const TaskCard: React.FC<TaskCardProps> = ({text, priority}) => {
  return (
    <Card className="w-full shadow-md hover:bg-secondary transition-colors mb-2">
      <CardContent className="p-3">
        <p>{text}</p>
        <span
          className={`text-xs px-2 py-0.5 rounded-full mt-1 inline-block ${
            priority === 'Alta'
              ? 'bg-red-500 text-white'
              : priority === 'Média'
              ? 'bg-yellow-500 text-black'
              : 'bg-green-500 text-white'
          }`}
        >
          {priority}
        </span>
      </CardContent>
    </Card>
  );
};

interface TaskColumnProps {
  title: string;
  tasks: {text: string; priority: 'Baixa' | 'Média' | 'Alta'}[]
  taskCount: number;
}

const TaskColumn: React.FC<TaskColumnProps> = ({title, tasks, taskCount}) => {
  return (
    <div className="flex flex-col items-center w-full min-w-[300px] bg-card p-3 rounded-lg shadow-md">
      <div className="w-full mb-4">
        <CardHeader className="flex flex-row items-center justify-between p-3">
          <CardTitle className="text-lg font-semibold">{title}</CardTitle>
          <div className="rounded-full bg-secondary text-secondary-foreground h-6 w-6 flex items-center justify-center text-xs font-bold">
            {taskCount}
          </div>
        </CardHeader>
      </div>
      <div className="w-full space-y-2 overflow-y-auto max-h-[calc(100vh-250px)] pr-1">
        {tasks.map((task, index) => (
          <TaskCard key={index} text={task.text} priority={task.priority} />
        ))}
      </div>
    </div>
  );
};

const Tasks: React.FC = () => {
  const [todoTasks, setTodoTasks] = useState<{text: string; priority: 'Baixa' | 'Média' | 'Alta'}[]>([]);
  const [inProgressTasks, setInProgressTasks] = useState<{text: string; priority: 'Baixa' | 'Média' | 'Alta'}[]>([]);
  const [completedTasks, setCompletedTasks] = useState<{text: string; priority: 'Baixa' | 'Média' | 'Alta'}[]>([]);
  const [open, setOpen] = useState(false);
  const [newTask, setNewTask] = useState('');
  const [newPriority, setNewPriority] = useState<'Baixa' | 'Média' | 'Alta'>('Média');

  const handleAddTask = () => {
    if (newTask.trim() !== '') {
      setTodoTasks([...todoTasks, {text: newTask, priority: newPriority}]);
      setNewTask('');
      setOpen(false);
    }
  };

  return (
    <div className="p-4 h-full flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Quadro Kanban</h1>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>
              <PlusIcon className="mr-2" />
              Criar Tarefa
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px] bg-card border-border rounded-lg shadow-lg">
            <DialogHeader>
              <DialogTitle>Criar nova tarefa</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="task" className="text-right">
                  Tarefa
                </Label>
                <Input
                  id="task"
                  value={newTask}
                  onChange={(e) => setNewTask(e.target.value)}
                  className="col-span-3"
                  spellCheck={false}
                  data-ms-editor={true}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="priority" className="text-right">
                  Prioridade
                </Label>
                <select
                  id="priority"
                  value={newPriority}
                  onChange={(e) => setNewPriority(e.target.value as 'Baixa' | 'Média' | 'Alta')}
                  className="col-span-3 bg-background border border-input rounded-md px-3 py-2 text-sm focus:ring-ring focus:border-ring"
                >
                  <option value="Baixa">Baixa</option>
                  <option value="Média">Média</option>
                  <option value="Alta">Alta</option>
                </select>
              </div>
            </div>
            <Button type="submit" onClick={handleAddTask}>Criar tarefa</Button>
          </DialogContent>
        </Dialog>
      </div>
      <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4 overflow-x-auto pb-4">
        <TaskColumn
          title="A fazer"
          tasks={todoTasks}
          taskCount={todoTasks.length}
        />
        <TaskColumn
          title="Em progresso"
          tasks={inProgressTasks}
          taskCount={inProgressTasks.length}
        />
        <TaskColumn
          title="Concluído"
          tasks={completedTasks}
          taskCount={completedTasks.length}
        />
      </div>
    </div>
  );
};

export default Tasks;
