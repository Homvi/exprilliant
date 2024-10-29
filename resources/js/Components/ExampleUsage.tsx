interface ExampleUsagePropTypes {
  text: string;
}

const ExampleUsage = ({ text }: ExampleUsagePropTypes) => {
  return (
    <div className="bg-slate-50 w-full rounded-lg p-4 my-3 border border-slate-200">
      <div className="flex items-center gap-2 mb-2">
        <svg className="w-4 h-4 text-slate-500" fill="none" strokeWidth="2" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
        <span className="text-sm font-medium text-slate-500">Example</span>
      </div>
      <p className="text-slate-700 italic">{text}</p>
    </div>
  );
};

export default ExampleUsage;
