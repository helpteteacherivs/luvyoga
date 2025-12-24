import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
  return (
    <div className="flex min-h-dvh flex-col">
      {/* Header Skeleton */}
      <div className="sticky top-0 z-50 w-full bg-[#6b3e2b] shadow-md">
        <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-2">
            <Skeleton className="h-8 w-8 rounded-sm" />
            <Skeleton className="h-6 w-48" />
          </div>
          <div className="hidden items-center gap-6 md:flex">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-4 w-16" />
            ))}
          </div>
          <Skeleton className="h-6 w-6 md:hidden" />
        </div>
      </div>

      <main className="flex-1">
        {/* Hero Section Skeleton */}
        <div className="w-full bg-background">
          <Skeleton className="w-full h-[60vh] md:h-[60dvh]" />
          <div className="flex flex-col items-center justify-center pt-8 pb-12 text-center space-y-6">
            <Skeleton className="h-20 w-20 rounded-full" />
            <Skeleton className="h-16 w-80 md:h-24 md:w-96" />
            <Skeleton className="h-8 w-96 md:h-10 md:w-[500px]" />
            <div className="flex justify-center gap-6">
              <Skeleton className="h-12 w-32" />
              <Skeleton className="h-12 w-32" />
            </div>
          </div>
        </div>

        {/* Content Sections Skeleton */}
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="py-16 sm:py-24">
            <div className="container mx-auto px-4 md:px-6">
              <div className="grid gap-12 md:grid-cols-2 md:items-center">
                <div className="space-y-6">
                  <Skeleton className="h-10 w-80" />
                  <Skeleton className="h-6 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                </div>
                <div className="flex justify-center">
                  <Skeleton className="h-80 w-full max-w-md rounded-lg" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </main>

      {/* Footer Skeleton */}
      <div className="bg-secondary">
        <div className="container mx-auto px-4 py-12 md:px-6">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
            <div className="space-y-4">
              <Skeleton className="h-8 w-32" />
              <Skeleton className="h-4 w-48" />
              <Skeleton className="h-4 w-40" />
            </div>
            <div className="space-y-4">
              <Skeleton className="h-6 w-24" />
              <div className="space-y-3">
                {Array.from({ length: 4 }).map((_, i) => (
                  <Skeleton key={i} className="h-4 w-48" />
                ))}
              </div>
            </div>
            <div className="space-y-4">
              <Skeleton className="h-6 w-16" />
              <Skeleton className="h-48 w-full max-w-sm rounded-lg" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}