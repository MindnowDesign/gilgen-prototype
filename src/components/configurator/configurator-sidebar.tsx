export function ConfiguratorSidebar() {
  return (
    <aside className="flex w-full shrink-0 flex-col overflow-hidden rounded-[4px] bg-white lg:w-[380px] xl:w-[420px]">
      <div className="flex flex-1 flex-col p-6 md:p-8">
        <h2 className="text-xl font-bold tracking-tight">Build your door</h2>
        <p className="mt-2 text-sm text-black-500">
          Configuration options will appear here.
        </p>
      </div>

      <div className="mx-4 mb-4 rounded-[4px] bg-black-950 p-5 md:mx-6 md:mb-6">
        <p className="text-2xl font-bold tracking-tight text-white">—</p>
        <p className="mt-1 text-xs text-black-400">Total price</p>
      </div>
    </aside>
  );
}
