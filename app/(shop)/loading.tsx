export default function ShopLoading() {
  return (
    <div className="container mx-auto min-h-screen px-4 py-24" aria-live="polite" aria-busy="true">
      <div className="mb-12 h-24 animate-pulse rounded-2xl border border-white/10 bg-white/5" />
      <div className="flex flex-col gap-8 lg:flex-row">
        <div className="hidden h-96 w-[320px] shrink-0 animate-pulse rounded-2xl border border-white/10 bg-white/5 lg:block" />
        <div className="grid flex-1 grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }, (_, index) => (
            <div key={index} className="h-80 animate-pulse rounded-2xl border border-white/10 bg-white/5" />
          ))}
        </div>
      </div>
    </div>
  );
}
