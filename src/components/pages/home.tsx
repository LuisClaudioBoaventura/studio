'use client';

import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import {Calendar} from '@/components/ui/calendar';
import {Progress} from '@/components/ui/progress'; // Import Progress
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from '@/components/ui/tooltip'; // Import Tooltip components
import {useEffect, useRef, useState} from 'react';
import {loadTasksFromLocalStorage, Task} from '@/app/tasks/page'; // Import Task and loader
import { differenceInDays, endOfWeek, endOfMonth, endOfYear, format, startOfWeek, startOfMonth, startOfYear } from 'date-fns';
import { ptBR } from 'date-fns/locale'; // Import ptBR locale for month name
import { cn } from '@/lib/utils'; // Import cn utility

const BarClock = () => {
  const [time, setTime] = useState(new Date());
  const clockSize = 200; // Clock diameter in px
  const barWidth = 4;
  const barHeight = 20;
  const hourBarHeight = 30;
  const numBars = 60;
  const radius = clockSize / 2;

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const hours = time.getHours();
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();
  const hourForClock = hours % 12; // Hour in 12-hour format for visual representation

  // Calculate the index corresponding to the hour hand position (approximate)
  // Each "hour" mark is 5 bars away (60 bars / 12 hours = 5 bars/hour)
  const hourIndex = Math.floor(hourForClock * 5 + minutes / 12); // Add fraction for minute progression

  return (
    <div className="relative flex items-center justify-center w-[200px] h-[200px] my-4">
      {/* Clock Background */}
      <div className="absolute w-full h-full rounded-full bg-muted border-2 border-border shadow-inner"></div>

      {/* Bars Container */}
      <div className="absolute w-full h-full">
        {Array.from({ length: numBars }).map((_, i) => {
          const rotation = i * (360 / numBars);
          const isSecondPast = i < seconds;
          const isMinutePastOrCurrent = i <= minutes;
          const isHourMark = i === hourIndex;

          return (
            <div
              key={i}
              className={cn(
                'absolute left-1/2 top-0 origin-bottom transition-all duration-300 ease-linear',
                'bg-foreground', // Default bar color
                isHourMark ? `h-[${hourBarHeight}px]` : `h-[${barHeight}px]`,
                `w-[${barWidth}px]`,
                isSecondPast || isMinutePastOrCurrent || isHourMark ? 'opacity-70' : 'opacity-20', // Default active vs inactive opacity
                isMinutePastOrCurrent && !isHourMark && 'bg-primary opacity-90', // Minute bar color
                isHourMark && 'bg-accent opacity-100', // Hour bar color and opacity
                isSecondPast && !isMinutePastOrCurrent && !isHourMark && 'bg-foreground opacity-70' // Second bar color (if different needed)
              )}
              style={{
                transformOrigin: `center ${radius}px`,
                transform: `translateX(-50%) rotate(${rotation}deg)`,
                // Adjust top position based on clock size and bar height to center origin
                top: `calc(50% - ${radius}px)`,
                 height: isHourMark ? `${hourBarHeight}px` : `${barHeight}px`, // Explicit height needed for absolute positioning
              }}
            />
          );
        })}
      </div>
       {/* Center Dot */}
       <div className="absolute w-2 h-2 bg-primary rounded-full z-10 border border-background"></div>
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
          <CardContent className="flex flex-col items-center gap-4 pt-4"> {/* Added pt-4 for spacing */}
            <BarClock />
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

    