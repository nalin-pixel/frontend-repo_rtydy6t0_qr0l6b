import React from 'react'
import { Home, Map, MessageSquareQuote, Wrench, Sparkles, Layers3, Users2, Landmark, Compass } from 'lucide-react'

const tabs = [
  { id: 'overview', label: 'Overview', icon: Home },
  { id: 'ecosystem', label: 'Ecosystem Map', icon: Map },
  { id: 'voice', label: 'Employee Voice', icon: MessageSquareQuote },
  { id: 'diagnostics', label: 'Channel Diagnostics', icon: Wrench },
  { id: 'patterns', label: 'Patterns', icon: Layers3 },
  { id: 'disruptions', label: 'Disruptions', icon: Sparkles },
  { id: 'viva', label: 'Viva Deep Dive', icon: Compass },
  { id: 'hr', label: 'HR Lens', icon: Users2 },
  { id: 'principles', label: 'Principles & Roadmap', icon: Landmark },
]

export default function NavTabs({ active, onChange }) {
  return (
    <nav aria-label="Main" className="sticky top-0 z-20 backdrop-blur bg-white/70 dark:bg-slate-900/70 border-b border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-14">
          <div className="font-semibold text-slate-800 dark:text-slate-100">See · Feel · Disrupt</div>
          <ul className="hidden md:flex items-center gap-1" role="tablist">
            {tabs.map(t => {
              const Icon = t.icon
              const isActive = active === t.id
              return (
                <li key={t.id} role="presentation">
                  <button
                    role="tab"
                    aria-selected={isActive}
                    aria-controls={`panel-${t.id}`}
                    className={`${isActive ? 'bg-blue-600 text-white' : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800'} flex items-center gap-2 px-3 py-2 rounded-md transition-colors`}
                    onClick={() => onChange(t.id)}
                  >
                    <Icon size={16} />
                    <span className="text-sm">{t.label}</span>
                  </button>
                </li>
              )
            })}
          </ul>
        </div>
        <div className="md:hidden grid grid-cols-2 gap-2 pb-3" role="tablist">
          {tabs.map(t => {
            const Icon = t.icon
            const isActive = active === t.id
            return (
              <button key={t.id} role="tab" aria-selected={isActive} aria-controls={`panel-${t.id}`} onClick={() => onChange(t.id)} className={`${isActive ? 'bg-blue-600 text-white' : 'text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800'} flex items-center gap-2 px-3 py-2 rounded-md border border-slate-200 dark:border-slate-700`}>
                <Icon size={16} />
                <span className="text-sm">{t.label}</span>
              </button>
            )
          })}
        </div>
      </div>
    </nav>
  )
}
