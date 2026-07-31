export function ComingSoon({ title }: { title: string }) {
  return (
    <div className="bg-panel border border-line rounded-[20px] p-10 sm:p-14 mt-1">
      <div className="text-cyan-ink text-[12px] font-bold uppercase tracking-wide">
        Coming soon
      </div>
      <h1 className="text-[30px] sm:text-[36px] font-bold tracking-[-0.6px] mt-2">
        {title}
      </h1>
      <p className="text-ink2 mt-3 max-w-[560px] text-[16px]">
        This section is part of the build plan and will be filled in as the
        Academy grows. In the meantime, explore the courses or start the free
        intro course.
      </p>
    </div>
  );
}
