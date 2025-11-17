import React, { useState } from 'react'

const strengthColor = {
  strong: 'bg-emerald-100 text-emerald-800 border-emerald-200',
  mixed: 'bg-amber-100 text-amber-800 border-amber-200',
  weak: 'bg-rose-100 text-rose-800 border-rose-200'
}

export default function ChannelDiagnosticCard({ name, role, reality, risk, opportunity, strength='mixed', details }){
  const [open, setOpen] = useState(false)
  return (
    <article className="rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold">{name}</h3>
          <div className={`inline-flex items-center gap-2 px-2 py-1 rounded border text-xs ${strengthColor[strength]}`}>{strength.toUpperCase()}</div>
        </div>
        <button onClick={() => setOpen(o=>!o)} className="text-sm text-blue-700 hover:underline">{open ? 'Hide details' : 'Details'}</button>
      </div>

      <dl className="mt-4 grid sm:grid-cols-2 gap-4">
        <div>
          <dt className="text-slate-500 text-sm">Role</dt>
          <dd className="font-medium">{role}</dd>
        </div>
        <div>
          <dt className="text-slate-500 text-sm">Reality</dt>
          <dd className="font-medium">{reality}</dd>
        </div>
        <div>
          <dt className="text-slate-500 text-sm">Risk</dt>
          <dd className="font-medium">{risk}</dd>
        </div>
        <div>
          <dt className="text-slate-500 text-sm">Opportunity</dt>
          <dd className="font-medium">{opportunity}</dd>
        </div>
      </dl>

      {open && details && (
        <div className="mt-4 text-sm text-slate-700 dark:text-slate-300 border-t pt-3">{details}</div>
      )}
    </article>
  )
}
