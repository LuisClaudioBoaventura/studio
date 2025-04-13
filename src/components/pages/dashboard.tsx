'use client';

import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { useBoardStore } from '@/app/dashboard/boardStore';

export const Dashboard: React.FC = () => {
  const board = useBoardStore();
  const totalTasks = Object.values(board.board.columns).reduce(
    (total, column) => total + column.tasks.length,
    0,
  );

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <Card className="bg-blue-500 text-white">
          <CardHeader>
            <CardTitle className="text-2xl">Tarefas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">{totalTasks}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Card 2</CardTitle>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
};
