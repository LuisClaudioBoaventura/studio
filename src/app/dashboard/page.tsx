'use client';

import { Clock } from "@/components/ui/chart";

export default function Page() {
  return (
    <div className="container">
      <div className="flex flex-col items-center justify-center gap-4 px-4 md:px-6">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl md:text-[5rem] md:leading-[5.8rem]">
          Dashboard
        </h1>
        <div>
          <Clock />
        </div>
      </div>
    </div>
  );
}
