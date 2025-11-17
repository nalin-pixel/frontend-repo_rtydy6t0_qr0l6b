import React, { useEffect } from 'react'

export default function Modal({ open, onClose, title, children }) {
  useEffect(() => {
    function onKey(e){ if(e.key === 'Escape') onClose?.() }
    if(open) document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, onClose])

  if(!open) return null
  return (
    <div className="fixed inset-0 z-50" aria-modal="true" role="dialog" aria-label={title}>
      <div className="absolute inset-0 bg-slate-900/60" onClick={onClose} />
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div className="w-full max-w-2xl bg-white dark:bg-slate-900 rounded-lg shadow-lg overflow-hidden animate-in" style={{animationName:'fadeIn', animationDuration:'220ms'}}>
          <div className="flex items-center justify-between px-4 py-3 border-b border-slate-200 dark:border-slate-800">
            <h3 className="text-lg font-semibold">{title}</h3>
            <button onClick={onClose} className="text-slate-500 hover:text-slate-900" aria-label="Close">✕</button>
          </div>
          <div className="p-4">{children}</div>
        </div>
      </div>
    </div>
  )
}
