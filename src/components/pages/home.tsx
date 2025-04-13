'use client';

import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import {Calendar} from '@/components/ui/calendar';
import {useEffect, useRef, useState} from 'react';

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

    return () => clearInterval(intervalId);
  }, []);

  const updateHands = () => {
    const hours = time.getHours();
    const minutes = time.getMinutes();
    const seconds = time.getSeconds();

    const hourRotation = (hours % 12 + minutes / 60) * 30;
    const minuteRotation = minutes * 6;
    const secondRotation = seconds * 6;

    if (hourHandRef.current) {
      hourHandRef.current.style.transform = `rotate(${hourRotation}deg)`;
    }
    if (minuteHandRef.current) {
      minuteHandRef.current.style.transform = `rotate(${minuteRotation}deg)`;
    }
    if (secondHandRef.current) {
      secondHandRef.current.style.transform = `rotate(${secondRotation}deg)`;
    }
  };

  return (
    <div className="relative w-48 h-48 rounded-full bg-secondary border-2 border-muted">
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-border w-0.5 h-24 origin-bottom"
        ref={hourHandRef}
      />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-input w-0.5 h-32 origin-bottom"
        ref={minuteHandRef}
      />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary w-0.5 h-40 origin-bottom"
        ref={secondHandRef}
      />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-primary rounded-full border border-background" />
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

export const Home: React.FC = () => {
  return (
    <div className="grid gap-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="transition-transform hover:scale-105">
          <CardHeader>
            <CardTitle>Tasks</CardTitle>
            <CardDescription>Summary of tasks</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Total Tasks: 10</p>
            <p>Completed: 7</p>
            <p>Pending: 3</p>
          </CardContent>
        </Card>

        <Card className="transition-transform hover:scale-105">
          <CardHeader>
            <CardTitle>Projects</CardTitle>
            <CardDescription>Summary of projects</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Total Projects: 5</p>
            <p>Active: 3</p>
            <p>Completed: 2</p>
          </CardContent>
        </Card>

        <Card className="transition-transform hover:scale-105">
          <CardHeader>
            <CardTitle>Messages</CardTitle>
            <CardDescription>Summary of messages</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Unread: 2</p>
            <p>Total: 20</p>
          </CardContent>
        </Card>
      </div>

      <Card className="transition-transform hover:scale-105">
        <CardHeader>
          <CardTitle>Performance</CardTitle>
          <CardDescription>Performance graph</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Placeholder for performance graph</p>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="transition-transform hover:scale-105">
          <CardHeader>
            <CardTitle>Days Left</CardTitle>
            <CardDescription>Days left until the end of...</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Week: 3 days</p>
            <p>Month: 10 days</p>
            <p>Year: 200 days</p>
          </CardContent>
        </Card>
        <Card className="transition-transform hover:scale-105">
          <CardHeader>
            <CardTitle>Clock</CardTitle>
            <CardDescription>Analog and Digital Clock</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <AnalogClock />
            <DigitalClock />
          </CardContent>
        </Card>
        <Card className="transition-transform hover:scale-105">
          <CardHeader>
            <CardTitle>Google Calendar</CardTitle>
            <CardDescription>Month view</CardDescription>
          </CardHeader>
          <CardContent>
            <Calendar />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
