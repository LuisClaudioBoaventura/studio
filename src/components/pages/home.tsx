'use client';

import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import {Calendar} from '@/components/ui/calendar';
import {useEffect, useRef, useState} from 'react';
import {loadTasksFromLocalStorage, Task} from '@/app/tasks/page'; // Import Task and loader

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

export const Home: React.FC = () => {
  const [taskCounts, setTaskCounts] = useState<TaskCounts>({ todo: 0, inProgress: 0, completed: 0 });

  useEffect(() => {
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
        <Card className="transition-transform hover:scale-105 hover:bg-secondary">
          <CardHeader>
            <CardTitle>Dias Restantes</CardTitle>
            <CardDescription>Dias restantes até o fim de...</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Semana: 3 dias</p>
            <p>Mês: 10 dias</p>
            <p>Ano: 200 dias</p>
          </CardContent>
        </Card>
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
