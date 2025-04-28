'use client';

import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import {Calendar} from '@/components/ui/calendar';
import {Progress} from '@/components/ui/progress'; // Import Progress
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from '@/components/ui/tooltip'; // Import Tooltip components
import {useEffect, useRef, useState} from 'react';
import {loadTasksFromLocalStorage, Task} from '@/app/tasks/page'; // Import Task and loader
import { differenceInDays, endOfWeek, endOfMonth, endOfYear, format, startOfWeek, startOfMonth, startOfYear } from 'date-fns';
import { ptBR } from 'date-fns/locale'; // Import ptBR locale for month name

const AnalogClock = () => {
  const [time, setTime] = useState(new Date());
  const hourHandRef = useRef<HTMLDivElement>(null);
  const minuteHandRef = useRef<HTMLDivElement>(null);
  const secondHandRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(new Date());
      updateHands();
    }, 1000);

    // Initial update
    updateHands();

    return () => clearInterval(intervalId);
  }, []); // Run only once on mount

  useEffect(() => {
    updateHands();
  }, [time]); // Update hands whenever time changes

  const updateHands = () => {
    const hours = time.getHours();
    const minutes = time.getMinutes();
    const seconds = time.getSeconds();

    const hourRotation = (hours % 12 + minutes / 60) * 30;
    const minuteRotation = (minutes + seconds / 60) * 6; // Add seconds fraction for smoother movement
    const secondRotation = seconds * 6;

    if (hourHandRef.current) {
      hourHandRef.current.style.transform = `translate(-50%, -100%) rotate(${hourRotation}deg)`;
    }
    if (minuteHandRef.current) {
      minuteHandRef.current.style.transform = `translate(-50%, -100%) rotate(${minuteRotation}deg)`;
    }
    if (secondHandRef.current) {
      secondHandRef.current.style.transform = `translate(-50%, -100%) rotate(${secondRotation}deg)`;
    }
  };

  return (
    <div className="relative w-48 h-48 rounded-full bg-secondary border-2 border-muted flex items-center justify-center">
      {/* Center Dot */}
      <div className="absolute w-2 h-2 bg-primary rounded-full z-10 border border-background"></div>
      {/* Hands */}
      <div
        className="absolute bottom-1/2 left-1/2 w-1 h-[25%] bg-border origin-bottom rounded-t-full"
        ref={hourHandRef}
        style={{ transform: 'translate(-50%, -100%) rotate(0deg)'}}
      />
      <div
        className="absolute bottom-1/2 left-1/2 w-0.5 h-[35%] bg-input origin-bottom rounded-t-full"
        ref={minuteHandRef}
        style={{ transform: 'translate(-50%, -100%) rotate(0deg)'}}
      />
      <div
        className="absolute bottom-1/2 left-1/2 w-[1px] h-[40%] bg-primary origin-bottom rounded-t-full"
        ref={secondHandRef}
        style={{ transform: 'translate(-50%, -100%) rotate(0deg)'}}
      />
    </div>
  );
};

const DigitalClock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const hours = time.getHours().toString().padStart(2, '0');
  const minutes = time.getMinutes().toString().padStart(2, '0');
  const seconds = time.getSeconds().toString().padStart(2, '0');

  return <div className="text-2xl font-bold">{`${hours}:${minutes}:${seconds}`}</div>;
};

interface TaskCounts {
  todo: number;
  inProgress: number;
  completed: number;
}

const DaysRemainingCard: React.FC = () => {
  const [now] = useState(new Date()); // Use state to ensure consistency on client

  // Calculate remaining days (ensure calculations are client-side or consistent)
  const daysLeftInWeek = differenceInDays(endOfWeek(now), now);
  const daysLeftInMonth = differenceInDays(endOfMonth(now), now);
  const daysLeftInYear = differenceInDays(endOfYear(now), now);

  // Calculate total days for percentage
  const totalDaysInWeek = differenceInDays(endOfWeek(now), startOfWeek(now)) + 1;
  const totalDaysInMonth = differenceInDays(endOfMonth(now), startOfMonth(now)) + 1;
  const totalDaysInYear = differenceInDays(endOfYear(now), startOfYear(now)) + 1;

  // Calculate progress percentage (days passed / total days)
  const weekProgress = ((totalDaysInWeek - daysLeftInWeek) / totalDaysInWeek) * 100;
  const monthProgress = ((totalDaysInMonth - daysLeftInMonth) / totalDaysInMonth) * 100;
  const yearProgress = ((totalDaysInYear - daysLeftInYear) / totalDaysInYear) * 100;

  // Get current month name
  const currentMonthName = format(now, 'MMMM', { locale: ptBR });
  // Capitalize first letter
  const formattedMonthName = currentMonthName.charAt(0).toUpperCase() + currentMonthName.slice(1);


  return (
    <Card className="transition-transform hover:scale-105 hover:bg-secondary">
      <CardHeader>
        <CardTitle>Dias Restantes</CardTitle>
        <CardDescription>Dias restantes até o fim de...</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <TooltipProvider>
          {/* Week */}
          <div>
            <p className="mb-1">Semana</p>
            <Tooltip>
              <TooltipTrigger asChild>
                <Progress value={weekProgress} aria-label={`${daysLeftInWeek} dias restantes na semana`} />
              </TooltipTrigger>
              <TooltipContent>
                <p>{daysLeftInWeek} dias restantes</p>
              </TooltipContent>
            </Tooltip>
          </div>
          {/* Month */}
          <div>
            <p className="mb-1">Mês ({formattedMonthName})</p> {/* Display month name */}
             <Tooltip>
               <TooltipTrigger asChild>
                 <Progress value={monthProgress} aria-label={`${daysLeftInMonth} dias restantes no mês`} />
               </TooltipTrigger>
               <TooltipContent>
                 <p>{daysLeftInMonth} dias restantes</p>
               </TooltipContent>
             </Tooltip>
          </div>
          {/* Year */}
          <div>
            <p className="mb-1">Ano</p>
             <Tooltip>
               <TooltipTrigger asChild>
                 <Progress value={yearProgress} aria-label={`${daysLeftInYear} dias restantes no ano`} />
               </TooltipTrigger>
               <TooltipContent>
                 <p>{daysLeftInYear} dias restantes</p>
               </TooltipContent>
             </Tooltip>
          </div>
        </TooltipProvider>
      </CardContent>
    </Card>
  );
};


export const Home: React.FC = () => {
  const [taskCounts, setTaskCounts] = useState<TaskCounts>({ todo: 0, inProgress: 0, completed: 0 });

  useEffect(() => {
    // Ensure this runs only on the client after hydration
    const loadedTasks = loadTasksFromLocalStorage();
    setTaskCounts({
      todo: loadedTasks.todo.length,
      inProgress: loadedTasks.inProgress.length,
      completed: loadedTasks.completed.length,
    });
  }, []);


  return (
    <div className="grid gap-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="transition-transform hover:scale-105 hover:bg-secondary">
          <CardHeader>
            <CardTitle>Tarefas</CardTitle>
            <CardDescription>Resumo das tarefas</CardDescription>
          </CardHeader>
          <CardContent>
            <p>A fazer: {taskCounts.todo}</p>
            <p>Em progresso: {taskCounts.inProgress}</p>
            <p>Concluído: {taskCounts.completed}</p>
          </CardContent>
        </Card>

        <Card className="transition-transform hover:scale-105 hover:bg-secondary">
          <CardHeader>
            <CardTitle>Projetos</CardTitle>
            <CardDescription>Resumo dos projetos</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Total de Projetos: 5</p>
            <p>Ativo: 3</p>
            <p>Concluído: 2</p>
          </CardContent>
        </Card>

        <Card className="transition-transform hover:scale-105 hover:bg-secondary">
          <CardHeader>
            <CardTitle>Mensagens</CardTitle>
            <CardDescription>Resumo das mensagens</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Não lidas: 2</p>
            <p>Total: 20</p>
          </CardContent>
        </Card>
        <Card className="transition-transform hover:scale-105 hover:bg-secondary">
          <CardHeader>
            <CardTitle>Notificações</CardTitle>
            <CardDescription>Resumo das suas notificações</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Novas: 3</p>
            <p>Total: 15</p>
          </CardContent>
        </Card>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="transition-transform hover:scale-105 hover:bg-secondary">
          <CardHeader>
            <CardTitle>Configurações</CardTitle>
            <CardDescription>Configurações rápidas</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Mude seu tema</p>
            <p>Mude suas preferências</p>
          </CardContent>
        </Card>
        <Card className="transition-transform hover:scale-105 hover:bg-secondary">
          <CardHeader>
            <CardTitle>Dicas e Truques</CardTitle>
            <CardDescription>Aprenda novas formas de melhorar a produtividade.</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Explore atalhos e comandos.</p>
          </CardContent>
        </Card>
          <Card className="transition-transform hover:scale-105 hover:bg-secondary">
          <CardHeader>
          <CardDescription>Gráfico de performance</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Placeholder para gráfico de performance</p>
        </CardContent>
      </Card>

        <Card className="transition-transform hover:scale-105 hover:bg-secondary">
          <CardHeader>
            <CardTitle>Mantenha-se Atualizado</CardTitle>
            <CardDescription>Informações sobre novidades.</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Informações da última versão.</p>
          </CardContent>
        </Card>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <DaysRemainingCard />
        <Card className="transition-transform hover:scale-105 hover:bg-secondary">
          <CardHeader>
            <CardTitle>Relógio</CardTitle>
            <CardDescription>Relógio Analógico e Digital</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center gap-4">
            <AnalogClock />
            <DigitalClock />
          </CardContent>
        </Card>
        <Card className="transition-transform hover:scale-105 hover:bg-secondary">
          <CardHeader>
            <CardTitle>Google Calendar</CardTitle>
            <CardDescription>Visão mensal</CardDescription>
          </CardHeader>
          <CardContent>
            <Calendar />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

    