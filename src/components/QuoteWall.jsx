import React from 'react'

export default function QuoteWall({ quotes=[], view='bubbles', activeTag, onTagClick }){
  const Tag = ({t}) => (
    <button onClick={() => onTagClick?.(t)} className={`text-xs px-2 py-0.5 rounded border ${activeTag===t ? 'bg-blue-600 text-white border-blue-600' : 'border-slate-300 text-slate-600 hover:bg-slate-100'}`}>{t}</button>
  )

  return (
    <div className={`grid ${view==='bubbles' ? 'sm:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'} gap-4`}>
      {quotes.map((q, i) => (
        <article key={i} className={`rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 shadow-sm ${view==='bubbles' ? 'relative' : ''}`}>
          <p className="text-slate-800 dark:text-slate-100 italic">“{q.text}”</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {q.tags?.map((t, j) => <Tag key={j} t={t} />)}
          </div>
        </article>
      ))}
    </div>
  )
}
