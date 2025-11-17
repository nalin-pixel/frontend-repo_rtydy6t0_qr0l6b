import React from 'react'

export default function Timeline({ steps=[] }) {
  return (
    <ol className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {steps.map((s, i) => (
        <li key={i} className="group p-4 rounded-lg border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/70 backdrop-blur transition shadow-sm hover:shadow-md">
          <div className="flex items-start gap-3">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-white text-sm font-semibold">{i+1}</span>
            <div>
              <h4 className="font-semibold text-slate-900 dark:text-slate-100">{s.title}</h4>
              <p className="text-sm text-slate-600 dark:text-slate-400">{s.desc}</p>
            </div>
          </div>
        </li>
      ))}
    </ol>
  )
}
