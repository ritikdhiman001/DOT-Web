import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const CardSkeleton = () => {
  return (
    <div className="grid gap-4 md:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 3 }).map(() => (
        <Card className="w-full border-none h-100 p-0 shadow-none rounded-2xl">
          <CardHeader className="h-30 p-0">
            <Skeleton className=" aspect-video w-full h-full  bg-gray-200 rounded-2xl shimmer" />
          </CardHeader>
          <CardContent className="p-2 mt-5">
            <Skeleton className=" w-full bg-gray-200 h-10 lg:mt-20 mt-10 shimmer" />
            <Skeleton className="aspect-video w-full bg-gray-200 h-2 mt-2 shimmer" />
            <div className="flex flex-row justify-between w-full mt-2">
              <Skeleton className=" w-1/3 bg-gray-200 h-3 shimmer" />
              <Skeleton className=" w-1/3 bg-gray-200 h-3 shimmer" />
            </div>
            <Skeleton className="aspect-video w-full bg-gray-200 h-5 mt-5 shimmer" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default CardSkeleton;
