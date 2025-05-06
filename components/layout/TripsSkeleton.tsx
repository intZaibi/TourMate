import { Skeleton } from "@/components/ui/skeleton"

export default function SkeletonCard() {
  return (
    <div className="flex">
      <div className="max-w-md mx-6 my-7 h-[33rem] bg-white rounded-xl shadow-md overflow-hidden hover:scale-[102%] cursor-pointer transition duration-250">
        <div className="flex justify-center flex-col space-y-3 p-4">
          <Skeleton className="h-52 w-full rounded-xl" />
          <div className="space-y-4">
            <Skeleton className="h-4 w-28" />
            <Skeleton className="h-4 w-80" />
            <Skeleton className="h-4 w-[345px]" />
            <Skeleton className="h-4 w-24" />
            {/* <Skeleton className="h-4 w-[345px]" />
            <Skeleton className="h-4 w-52" /> */}
            <Skeleton className="h-4 w-[345px]" />
            <Skeleton className="h-4 w-40" />
            <Skeleton className="h-4 w-20" />
          </div>
        </div>
      </div>
      <div className="max-w-md mx-6 my-7 h-[33rem] bg-white rounded-xl shadow-md overflow-hidden hover:scale-[102%] cursor-pointer transition duration-250">
        <div className="flex justify-center flex-col space-y-3 p-4">
          <Skeleton className="h-52 w-full rounded-xl" />
          <div className="space-y-4">
            <Skeleton className="h-4 w-28" />
            <Skeleton className="h-4 w-80" />
            <Skeleton className="h-4 w-[345px]" />
            <Skeleton className="h-4 w-24" />
            {/* <Skeleton className="h-4 w-[345px]" />
            <Skeleton className="h-4 w-52" /> */}
            <Skeleton className="h-4 w-[345px]" />
            <Skeleton className="h-4 w-40" />
            <Skeleton className="h-4 w-20" />
          </div>
        </div>
      </div>
      <div className="max-w-md mx-6 my-7 h-[33rem] bg-white rounded-xl shadow-md overflow-hidden hover:scale-[102%] cursor-pointer transition duration-250">
        <div className="flex justify-center flex-col space-y-3 p-4">
          <Skeleton className="h-52 w-full rounded-xl" />
          <div className="space-y-4">
            <Skeleton className="h-4 w-28" />
            <Skeleton className="h-4 w-80" />
            <Skeleton className="h-4 w-[345px]" />
            <Skeleton className="h-4 w-24" />
            {/* <Skeleton className="h-4 w-[345px]" />
            <Skeleton className="h-4 w-52" /> */}
            <Skeleton className="h-4 w-[345px]" />
            <Skeleton className="h-4 w-40" />
            <Skeleton className="h-4 w-20" />
          </div>
        </div>
      </div>
    </div>
  )
}
