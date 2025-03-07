import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <>
      <div className="flex flex-col space-y-3 py-4 max-w-3xl mx-auto">
        <div className="space-y-2">
          <Skeleton className="h-4 w-5/12" />
          <Skeleton className="h-4 w-10/12" />
        </div>
        <Skeleton className="h-[125px] w-full rounded-xl mx-auto" />
      </div>
    </>
  );
}
