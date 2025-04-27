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
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog';
import {Label} from '@/components/ui/label';
import {cn} from '@/lib/utils';
import {Textarea} from '@/components/ui/textarea';
import {useToast} from '@/hooks/use-toast';
import {Check} from 'lucide-react'; // Import Check icon

interface Task {
  id: string;
  title: string;
  text: string;
  priority: 'Baixa' | 'Média' | 'Alta';
}

interface TaskCardProps {
  task: Task;
  onDragStart: (
    e: React.DragEvent<HTMLDivElement>,
    task: Task,
    sourceColumn: string
  ) => void;
  sourceColumn: string;
}

const TaskCard: React.FC<TaskCardProps> = ({
  task,
  onDragStart,
  sourceColumn,
}) => {
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    onDragStart(e, task, sourceColumn);
  };

  return (
    <Card
      draggable="true"
      onDragStart={handleDragStart}
      className="w-full shadow-md hover:bg-secondary transition-colors mb-2 cursor-grab active:cursor-grabbing"
    >
      <CardContent className="p-3">
        <p>{task.title}</p>
        <p>{task.text}</p>
        <span
          className={cn(
            'text-xs px-2 py-0.5 rounded-full mt-1 inline-block',
            task.priority === 'Alta' && 'bg-red-500 text-white',
            task.priority === 'Média' && 'bg-yellow-500 text-black',
            task.priority === 'Baixa' && 'bg-green-500 text-white'
          )}
        >
          {task.priority}
        </span>
      </CardContent>
    </Card>
  );
};

interface TaskColumnProps {
  title: string;
  tasks: Task[];
  taskCount: number;
  onDragStart: (
    e: React.DragEvent<HTMLDivElement>,
    task: Task,
    sourceColumn: string
  ) => void;
  onDrop: (e: React.DragEvent<HTMLDivElement>, targetColumn: string) => void;
  onDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
}

const TaskColumn: React.FC<TaskColumnProps> = ({
  title,
  tasks,
  taskCount,
  onDragStart,
  onDrop,
  onDragOver,
}) => {
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    onDrop(e, title);
  };

  return (
    <div
      className="flex flex-col items-center w-full min-w-[300px] bg-card p-3 rounded-lg shadow-md"
      onDrop={handleDrop}
      onDragOver={onDragOver}
    >
      <div className="w-full mb-4">
        <CardHeader className="flex flex-row items-center justify-between p-3">
          <CardTitle className="text-lg font-semibold">{title}</CardTitle>
          <div className="rounded-full bg-secondary text-secondary-foreground h-6 w-6 flex items-center justify-center text-xs font-bold">
            {taskCount}
          </div>
        </CardHeader>
      </div>
      <div className="w-full space-y-2 overflow-y-auto max-h-[calc(100vh-250px)] pr-1 flex-1">
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onDragStart={onDragStart}
            sourceColumn={title}
          />
        ))}
      </div>
    </div>
  );
};

type ColumnTitle = 'A fazer' | 'Em progresso' | 'Concluído';

const Tasks: React.FC = () => {
  const [todoTasks, setTodoTasks] = useState<Task[]>([]);
  const [inProgressTasks, setInProgressTasks] = useState<Task[]>([]);
  const [completedTasks, setCompletedTasks] = useState<Task[]>([]);
  const [open, setOpen] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskText, setNewTaskText] = useState('');
  const [newPriority, setNewPriority] =
    useState<'Baixa' | 'Média' | 'Alta'>('Média');
  const [repeatTask, setRepeatTask] = useState(false); // State for repeating task
  const {toast} = useToast();

  const handleAddTask = () => {
    if (newTaskText.trim() !== '') {
      const newTask: Task = {
        id: `task-${Date.now()}-${Math.random()}`, // Simple unique ID generation
        title: newTaskTitle,
        text: newTaskText,
        priority: newPriority,
      };
      setTodoTasks([...todoTasks, newTask]);
      setNewTaskTitle('');
      setNewTaskText('');
      setNewPriority('Média'); // Reset priority
      setRepeatTask(false); // Reset repeat task
      setOpen(false);
      toast({
        title: 'Tarefa adicionada com sucesso!',
      });
    }
  };

  const handleCancelAddTask = () => {
    setNewTaskTitle('');
    setNewTaskText('');
    setNewPriority('Média');
    setRepeatTask(false);
    setOpen(false);
    toast({
      title: 'Criação de tarefa cancelada.',
    });
  };

  const getTasksSetter = (
    columnTitle: ColumnTitle
  ): React.Dispatch<React.SetStateAction<Task[]>> => {
    if (columnTitle === 'A fazer') return setTodoTasks;
    if (columnTitle === 'Em progresso') return setInProgressTasks;
    return setCompletedTasks;
  };

  const getTasksState = (columnTitle: ColumnTitle): Task[] => {
    if (columnTitle === 'A fazer') return todoTasks;
    if (columnTitle === 'Em progresso') return inProgressTasks;
    return completedTasks;
  };

  const handleDragStart = (
    e: React.DragEvent<HTMLDivElement>,
    task: Task,
    sourceColumn: string
  ) => {
    e.dataTransfer.setData('task', JSON.stringify(task));
    e.dataTransfer.setData('sourceColumn', sourceColumn);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, targetColumn: ColumnTitle) => {
    e.preventDefault();
    const taskData = e.dataTransfer.getData('task');
    const sourceColumn = e.dataTransfer.getData('sourceColumn') as ColumnTitle;

    if (!taskData || !sourceColumn || sourceColumn === targetColumn) {
      return; // Don't drop if no data, no source, or dropping in the same column
    }

    try {
      const task: Task = JSON.parse(taskData);

      // Remove from source column
      const sourceSetter = getTasksSetter(sourceColumn);
      sourceSetter((prevTasks) => prevTasks.filter((t) => t.id !== task.id));

      // Add to target column
      const targetSetter = getTasksSetter(targetColumn);
      targetSetter((prevTasks) => [...prevTasks, task]);
    } catch (error) {
      console.error('Failed to parse task data:', error);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault(); // Necessary to allow dropping
    e.dataTransfer.dropEffect = 'move';
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
                <Label htmlFor="title" className="text-right">
                  Título
                </Label>
                <Input
                  id="title"
                  value={newTaskTitle}
                  onChange={(e) => setNewTaskTitle(e.target.value)}
                  className="col-span-3"
                  spellCheck={false}
                  data-ms-editor={true}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="task" className="text-right">
                  Tarefa
                </Label>
                <Textarea
                  id="task"
                  value={newTaskText}
                  onChange={(e) => setNewTaskText(e.target.value)}
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
                  onChange={(e) =>
                    setNewPriority(e.target.value as 'Baixa' | 'Média' | 'Alta')
                  }
                  className="col-span-3 bg-background border border-input rounded-md px-3 py-2 text-sm focus:ring-ring focus:border-ring"
                >
                  <option value="Baixa">Baixa</option>
                  <option value="Média">Média</option>
                  <option value="Alta">Alta</option>
                </select>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="repeat"
                  checked={repeatTask}
                  onChange={(e) => setRepeatTask(e.target.checked)}
                  className="h-4 w-4 rounded border-primary text-primary shadow-sm focus:ring-ring"
                />
                <label
                  htmlFor="repeat"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Repetir tarefa
                </label>
              </div>
            </div>
            <div className="flex justify-end space-x-2">
              <Button type="button" variant="secondary" onClick={handleCancelAddTask}>
                Cancelar
              </Button>
              <Button type="submit" onClick={handleAddTask}>
                Criar tarefa
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4 overflow-x-auto pb-4">
        <TaskColumn
          title="A fazer"
          tasks={todoTasks}
          taskCount={todoTasks.length}
          onDragStart={handleDragStart}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        />
        <TaskColumn
          title="Em progresso"
          tasks={inProgressTasks}
          taskCount={inProgressTasks.length}
          onDragStart={handleDragStart}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        />
        <TaskColumn
          title="Concluído"
          tasks={completedTasks}
          taskCount={completedTasks.length}
          onDragStart={handleDragStart}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        />
      </div>
    </div>
  );
};

export default Tasks;
