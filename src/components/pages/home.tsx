'use client';

import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import {Calendar} from '@/components/ui/calendar';

export const Home: React.FC = () => {
  return (
    <div className="grid gap-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
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

        <Card>
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

        <Card>
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

      <Card>
        <CardHeader>
          <CardTitle>Performance</CardTitle>
          <CardDescription>Performance graph</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Placeholder for performance graph</p>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
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

        <Card>
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
