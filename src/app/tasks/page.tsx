'use client';

import React, {useState} from 'react';
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {PlusIcon, EditIcon} from 'lucide-react'; // Added EditIcon if needed, or handle click differently
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {ToggleGroup, ToggleGroupItem} from '@/components/ui/toggle-group';


interface Task {
  id: string;
  title: string;
  text: string;
  priority: 'Baixa' | 'Média' | 'Alta';
  recurrence?: {
    frequency: 'Diário' | 'Semanal' | 'Mensal' | 'Anual';
    interval: number;
    days?: string[];
  };
}

interface TaskCardProps {
  task: Task;
  onDragStart: (
    e: React.DragEvent<HTMLDivElement>,
    task: Task,
    sourceColumn: string
  ) => void;
  sourceColumn: string;
  onEditClick: (task: Task) => void; // Add prop for edit click
}

const TaskCard: React.FC<TaskCardProps> = ({
  task,
  onDragStart,
  sourceColumn,
  onEditClick,
}) => {
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    onDragStart(e, task, sourceColumn);
  };

  const handleEditClick = () => {
    onEditClick(task);
  };

  return (
    <Card
      draggable="true"
      onDragStart={handleDragStart}
      onClick={handleEditClick} // Add onClick handler
      className="w-full shadow-md hover:bg-secondary transition-colors mb-2 cursor-pointer active:cursor-grabbing" // Added cursor-pointer
    >
      <CardContent className="p-3">
        <p className="font-semibold">{task.title}</p>
        <p className="text-sm text-muted-foreground">{task.text}</p>
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
        {task.recurrence && (
          <p className="text-xs text-muted-foreground mt-1">
            Repete {task.recurrence.frequency.toLowerCase()} a cada {task.recurrence.interval}{' '}
            {task.recurrence.frequency === 'Semanal' && task.recurrence.days && `(${task.recurrence.days.join(', ')})`}
          </p>
        )}
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
  onEditClick: (task: Task) => void; // Pass edit handler down
}

const TaskColumn: React.FC<TaskColumnProps> = ({
  title,
  tasks,
  taskCount,
  onDragStart,
  onDrop,
  onDragOver,
  onEditClick,
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
            onEditClick={onEditClick} // Pass handler to TaskCard
          />
        ))}
      </div>
    </div>
  );
};

type ColumnTitle = 'A fazer' | 'Em progresso' | 'Concluído';
type RecurrenceFrequency = 'Nunca' | 'Diário' | 'Semanal' | 'Mensal' | 'Anual';
const weekDays = [
  { id: 'dom', label: 'do' },
  { id: 'seg', label: '2ª' },
  { id: 'ter', label: '3ª' },
  { id: 'qua', label: '4ª' },
  { id: 'qui', label: '5ª' },
  { id: 'sex', label: '6ª' },
  { id: 'sab', label: 'sá' },
];

const Tasks: React.FC = () => {
  const [todoTasks, setTodoTasks] = useState<Task[]>([]);
  const [inProgressTasks, setInProgressTasks] = useState<Task[]>([]);
  const [completedTasks, setCompletedTasks] = useState<Task[]>([]);
  const [open, setOpen] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskText, setNewTaskText] = useState('');
  const [newPriority, setNewPriority] =
    useState<'Baixa' | 'Média' | 'Alta'>('Média');
  const [recurrenceFrequency, setRecurrenceFrequency] = useState<RecurrenceFrequency>('Nunca');
  const [recurrenceInterval, setRecurrenceInterval] = useState(1);
  const [recurrenceDays, setRecurrenceDays] = useState<string[]>([]);
  const [editingTask, setEditingTask] = useState<Task | null>(null); // State for the task being edited
  const {toast} = useToast();

  const getFrequencyUnit = (freq: RecurrenceFrequency): string => {
    switch (freq) {
      case 'Diário': return 'Dia(s)';
      case 'Semanal': return 'Semana(s)';
      case 'Mensal': return 'Mês(es)';
      case 'Anual': return 'Ano(s)';
      default: return '';
    }
  }

  const resetForm = () => {
    setNewTaskTitle('');
    setNewTaskText('');
    setNewPriority('Média');
    setRecurrenceFrequency('Nunca');
    setRecurrenceInterval(1);
    setRecurrenceDays([]);
    setEditingTask(null); // Reset editing task
    setOpen(false);
  }

  const handleFormSubmit = () => {
    if (editingTask) {
      handleUpdateTask();
    } else {
      handleAddTask();
    }
  }

  const handleAddTask = () => {
    if (newTaskText.trim() === '') {
       toast({
         title: 'Erro!',
         description: 'A descrição da tarefa não pode estar vazia.',
         variant: 'destructive',
       });
       return;
    }

     const newTask: Task = {
       id: `task-${Date.now()}-${Math.random()}`, // Simple unique ID generation
       title: newTaskTitle || 'Tarefa sem título', // Default title
       text: newTaskText,
       priority: newPriority,
     };

     if (recurrenceFrequency !== 'Nunca') {
       newTask.recurrence = {
         frequency: recurrenceFrequency,
         interval: recurrenceInterval,
         days: recurrenceFrequency === 'Semanal' ? recurrenceDays : undefined,
       };
     }

     setTodoTasks([...todoTasks, newTask]);
     resetForm();
     toast({
       title: 'Tarefa adicionada com sucesso!',
     });
  };

  const handleUpdateTask = () => {
    if (!editingTask || newTaskText.trim() === '') {
      toast({
        title: 'Erro ao atualizar!',
        description: 'Dados da tarefa inválidos.',
        variant: 'destructive',
      });
      return;
    }

    const updatedTask: Task = {
      ...editingTask,
      title: newTaskTitle || 'Tarefa sem título',
      text: newTaskText,
      priority: newPriority,
    };

    if (recurrenceFrequency !== 'Nunca') {
      updatedTask.recurrence = {
        frequency: recurrenceFrequency,
        interval: recurrenceInterval,
        days: recurrenceFrequency === 'Semanal' ? recurrenceDays : undefined,
      };
    } else {
      delete updatedTask.recurrence; // Remove recurrence if set to 'Nunca'
    }

    // Find and update the task in the correct column
    const updateInColumn = (setter: React.Dispatch<React.SetStateAction<Task[]>>) => {
      setter(prevTasks => prevTasks.map(t => t.id === editingTask.id ? updatedTask : t));
    };

    if (todoTasks.some(t => t.id === editingTask.id)) {
      updateInColumn(setTodoTasks);
    } else if (inProgressTasks.some(t => t.id === editingTask.id)) {
      updateInColumn(setInProgressTasks);
    } else if (completedTasks.some(t => t.id === editingTask.id)) {
      updateInColumn(setCompletedTasks);
    }

    resetForm();
    toast({
      title: 'Tarefa atualizada com sucesso!',
    });
  };


  const handleCancelAction = () => {
    resetForm();
    toast({
      title: editingTask ? 'Edição cancelada.' : 'Criação de tarefa cancelada.',
      variant: 'default',
    });
  };

  // Function to open the modal in edit mode
  const openEditModal = (task: Task) => {
    setEditingTask(task);
    setNewTaskTitle(task.title);
    setNewTaskText(task.text);
    setNewPriority(task.priority);
    if (task.recurrence) {
      setRecurrenceFrequency(task.recurrence.frequency);
      setRecurrenceInterval(task.recurrence.interval);
      setRecurrenceDays(task.recurrence.days || []);
    } else {
      setRecurrenceFrequency('Nunca');
      setRecurrenceInterval(1);
      setRecurrenceDays([]);
    }
    setOpen(true);
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
      toast({
        title: 'Erro ao mover tarefa',
        description: 'Não foi possível processar os dados da tarefa.',
        variant: 'destructive',
      });
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
        <Dialog open={open} onOpenChange={(isOpen) => {
          if (!isOpen) resetForm(); // Reset form when dialog closes
          setOpen(isOpen);
        }}>
          <DialogTrigger asChild>
            <Button>
              <PlusIcon className="mr-2" />
              Criar Tarefa
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px] bg-card border-border rounded-lg shadow-lg">
            <DialogHeader>
              <DialogTitle>{editingTask ? 'Editar Tarefa' : 'Criar nova tarefa'}</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              {/* Title Input */}
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

              {/* Task Description Textarea */}
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="task" className="text-right">
                  Tarefa
                </Label>
                <Textarea
                  id="task"
                  value={newTaskText}
                  onChange={(e) => setNewTaskText(e.target.value)}
                  className="col-span-3"
                  placeholder="Descreva sua tarefa (suporta Markdown)"
                  spellCheck={false}
                  data-ms-editor={true}
                />
              </div>

              {/* Priority Select */}
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="priority" className="text-right">
                  Prioridade
                </Label>
                <Select
                  value={newPriority}
                  onValueChange={(value: 'Baixa' | 'Média' | 'Alta') => setNewPriority(value)}
                >
                  <SelectTrigger id="priority" className="col-span-3">
                    <SelectValue placeholder="Selecione a prioridade" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Baixa">Baixa</SelectItem>
                    <SelectItem value="Média">Média</SelectItem>
                    <SelectItem value="Alta">Alta</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Recurrence Section */}
               <div className="grid grid-cols-4 items-center gap-4">
                 <Label className="text-right">Repetição</Label>
                 <Select
                   value={recurrenceFrequency}
                   onValueChange={(value: RecurrenceFrequency) => setRecurrenceFrequency(value)}
                 >
                   <SelectTrigger id="recurrence" className="col-span-3">
                     <SelectValue placeholder="Selecione a frequência" />
                   </SelectTrigger>
                   <SelectContent>
                     <SelectItem value="Nunca">Nunca</SelectItem>
                     <SelectItem value="Diário">Diário</SelectItem>
                     <SelectItem value="Semanal">Semanal</SelectItem>
                     <SelectItem value="Mensal">Mensal</SelectItem>
                     <SelectItem value="Anual">Anual</SelectItem>
                   </SelectContent>
                 </Select>
               </div>

               {recurrenceFrequency !== 'Nunca' && (
                 <>
                   <div className="grid grid-cols-4 items-center gap-4">
                     <Label htmlFor="interval" className="text-right">A cada</Label>
                     <div className="col-span-3 flex items-center gap-2">
                       <Input
                         id="interval"
                         type="number"
                         min="1"
                         value={recurrenceInterval}
                         onChange={(e) => setRecurrenceInterval(Math.max(1, parseInt(e.target.value) || 1))}
                         className="w-1/2"
                         spellCheck={false} // Added to prevent hydration errors
                         data-ms-editor={true} // Added to prevent hydration errors
                       />
                       <span className="text-sm text-muted-foreground">{getFrequencyUnit(recurrenceFrequency)}</span>
                     </div>
                   </div>

                   {recurrenceFrequency === 'Semanal' && (
                     <div className="grid grid-cols-4 items-center gap-4">
                       <Label className="text-right">Repete-se</Label>
                       <ToggleGroup
                         type="multiple"
                         variant="outline"
                         value={recurrenceDays}
                         onValueChange={setRecurrenceDays}
                         className="col-span-3 justify-start flex-wrap"
                       >
                         {weekDays.map(day => (
                           <ToggleGroupItem key={day.id} value={day.id} aria-label={`Repetir em ${day.label}`} className="px-2 py-1 h-auto text-xs">
                             {day.label}
                           </ToggleGroupItem>
                         ))}
                       </ToggleGroup>
                     </div>
                   )}
                 </>
               )}

            </div>
            <div className="flex justify-end space-x-2">
              <Button type="button" variant="secondary" onClick={handleCancelAction}>
                Cancelar
              </Button>
              <Button type="submit" onClick={handleFormSubmit}>
                {editingTask ? 'Atualizar Tarefa' : 'Criar tarefa'}
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
          onEditClick={openEditModal} // Pass edit handler
        />
        <TaskColumn
          title="Em progresso"
          tasks={inProgressTasks}
          taskCount={inProgressTasks.length}
          onDragStart={handleDragStart}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onEditClick={openEditModal} // Pass edit handler
        />
        <TaskColumn
          title="Concluído"
          tasks={completedTasks}
          taskCount={completedTasks.length}
          onDragStart={handleDragStart}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onEditClick={openEditModal} // Pass edit handler
        />
      </div>
    </div>
  );
};

export default Tasks;