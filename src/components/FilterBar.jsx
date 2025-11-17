import React from 'react'

export default function FilterBar({ filters, active, onChange }){
  return (
    <div className="flex flex-wrap items-center gap-2">
      {filters.map(f => (
        <button key={f} onClick={() => onChange(f)} className={`px-3 py-1.5 rounded-full border text-sm transition ${active===f ? 'bg-blue-600 text-white border-blue-600' : 'border-slate-300 text-slate-700 hover:bg-slate-100'}`}>{f}</button>
      ))}
    </div>
  )
}
