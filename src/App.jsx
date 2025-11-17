import React, { useEffect, useMemo, useState } from 'react'
import NavTabs from './components/NavTabs'
import Timeline from './components/Timeline'
import FilterBar from './components/FilterBar'
import QuoteWall from './components/QuoteWall'
import ChannelDiagnosticCard from './components/ChannelDiagnosticCard'
import Modal from './components/Modal'
import Spline from '@splinetool/react-spline'

const STORAGE_KEYS = {
  theme: 'ic_theme',
  tab: 'ic_active_tab',
  filters: 'ic_filters',
  voiceView: 'ic_voice_view'
}

const useLocalState = (key, initial) => {
  const [state, setState] = useState(() => {
    const v = localStorage.getItem(key)
    return v ? JSON.parse(v) : initial
  })
  useEffect(() => { localStorage.setItem(key, JSON.stringify(state)) }, [key, state])
  return [state, setState]
}

function Section({ id, children, hidden }){
  return (
    <section id={`panel-${id}`} role="tabpanel" aria-labelledby={id} className={hidden ? 'hidden' : ''}>
      {children}
    </section>
  )
}

function Hero(){
  return (
    <div className="relative w-full h-[340px] overflow-hidden">
      <Spline scene="https://prod.spline.design/WCoEDSwacOpKBjaC/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      <div className="absolute inset-0 bg-gradient-to-t from-white via-white/30 to-transparent pointer-events-none" />
    </div>
  )
}

export default function App(){
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
  const [theme, setTheme] = useLocalState(STORAGE_KEYS.theme, prefersDark ? 'dark' : 'light')
  const [active, setActive] = useLocalState(STORAGE_KEYS.tab, 'overview')

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
  }, [theme])

  const [channelFilter, setChannelFilter] = useLocalState(STORAGE_KEYS.filters, { audience: 'All', format: 'All' })
  const [voiceView, setVoiceView] = useLocalState(STORAGE_KEYS.voiceView, 'bubbles')

  useEffect(() => {
    const onHash = () => {
      const id = location.hash.replace('#','')
      if(id) setActive(id)
    }
    window.addEventListener('hashchange', onHash)
    onHash()
    return () => window.removeEventListener('hashchange', onHash)
  }, [setActive])

  const changeTab = (id) => {
    setActive(id)
    location.hash = id
  }

  const quotes = useMemo(() => ([
    { text: 'Whatever I get on my email, I’ll directly see it. Viva is something I need to go and search for.', tags: ['Email','Viva'] },
    { text: 'I always open Internal Comms emails – if there’s an update, it’s quite important.', tags: ['Email'] },
    { text: 'The factory communication is really way more family-like. In head office, it’s very corporate.', tags: ['Factory','Head Office'] },
    { text: 'On the screens, I stop when I see someone from our people in the picture.', tags: ['Screens'] },
    { text: 'I don’t check Viva – I just don’t find the time.', tags: ['Viva'] },
  ]), [])

  const channels = useMemo(() => ([
    { name: 'Emails & Newsletter', owner: 'Internal Comms', audience: 'All', frequency: 'Weekly / Ad-hoc', format: 'Email', purpose: 'Trusted gateway for important updates' },
    { name: 'Within & Beyond (magazine + videos)', owner: 'Internal Comms', audience: 'All', frequency: 'Quarterly', format: 'Video', purpose: 'Celebrate people and impact stories' },
    { name: 'Townhalls (MENA + market broadcasts)', owner: 'Leadership', audience: 'All', frequency: 'Quarterly', format: 'Live', purpose: 'Alignment, recognition, Q&A' },
    { name: 'CEO videos & memos', owner: 'Leadership', audience: 'All', frequency: 'Ad-hoc', format: 'Video', purpose: 'Direction and moments that matter' },
    { name: 'Viva Engage', owner: 'Internal Comms', audience: 'All', frequency: 'Constant', format: 'Social', purpose: 'Stories, recognition, dialogue' },
    { name: 'Everything in Between podcast', owner: 'Internal Comms', audience: 'Office', frequency: 'Monthly', format: 'Audio', purpose: 'Depth on strategy and culture' },
    { name: 'EV Screens (offices & factories)', owner: 'Facilities', audience: 'All', frequency: 'Constant', format: 'Visual', purpose: 'Ambient nudges and highlights' },
    { name: 'MS Teams / collab groups', owner: 'All functions', audience: 'Office', frequency: 'Constant', format: 'Collaboration', purpose: 'Workflows and coordination' },
  ]), [])

  const [modal, setModal] = useState(null)
  const filteredChannels = channels.filter(c => (channelFilter.audience==='All' || c.audience===channelFilter.audience) && (channelFilter.format==='All' || c.format===channelFilter.format))

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      <NavTabs active={active} onChange={changeTab} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 pb-16">
        <Hero />

        {/* Overview */}
        <Section id="overview" hidden={active!=='overview'}>
          <div className="py-8">
            <header className="mb-6">
              <h1 className="text-3xl font-bold">See. Feel. Disrupt – Internal Communications in Nestlé MENA</h1>
              <p className="mt-2 text-slate-600 dark:text-slate-300">~14,000 employees across 19 countries, hybrid, multi-language. Rich channel ecosystem but uneven employee experience. This dashboard shows what we saw, how it feels, and what we’ll change.</p>
            </header>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                ['19 countries'],
                ['~14,000 employees'],
                ['Hybrid workforce (office, factory, field)'],
                ['Languages: EN / AR / FR / others']
              ].map((c,i)=> (
                <div key={i} className="rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 shadow-sm">
                  <div className="font-semibold">{c[0]}</div>
                </div>
              ))}
            </div>

            <h2 className="mt-10 mb-4 text-xl font-semibold">Storyline</h2>
            <Timeline steps={[
              { title: 'Map ecosystem (SEE)', desc: 'Understand channels, owners, audiences.' },
              { title: 'Listen to employees (FEEL)', desc: 'Gather raw sentiment and behaviour.' },
              { title: 'Diagnose patterns', desc: 'Spot what works and where we lose people.' },
              { title: 'Design quick experiments', desc: 'Pilot improvements to learn fast.' },
              { title: 'Shape big bets', desc: 'Plan bold moves rooted in evidence.' },
              { title: 'Set principles & roadmap', desc: 'Align and commit to a path forward.' },
            ]} />
          </div>
        </Section>

        {/* Ecosystem Map */}
        <Section id="ecosystem" hidden={active!=='ecosystem'}>
          <div className="py-8">
            <div className="grid md:grid-cols-3 gap-6 items-start">
              <div className="md:col-span-1 rounded-lg border p-4 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                <h3 className="font-semibold">Who we communicate with</h3>
                <p className="text-sm text-slate-600 dark:text-slate-300 mt-2">19 countries, ~14k employees, hybrid, EN/AR/FR and others.</p>
              </div>
              <div className="md:col-span-2">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold">Channel Map</h3>
                  <div className="flex gap-3">
                    <FilterBar filters={['All','All','Office','Factory','Leadership']} active={channelFilter.audience} onChange={v=>setChannelFilter(s=>({...s, audience: v}))} />
                    <FilterBar filters={['All','Email','Live','Social','Visual','Audio','Video','Collaboration']} active={channelFilter.format} onChange={v=>setChannelFilter(s=>({...s, format: v}))} />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredChannels.map((c,i)=> (
                    <button key={i} onClick={() => setModal(c)} className="text-left rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 shadow-sm hover:shadow-md transition">
                      <div className="font-semibold">{c.name}</div>
                      <dl className="mt-2 text-sm text-slate-600 dark:text-slate-300 space-y-1">
                        <div><span className="font-medium">Owner:</span> {c.owner}</div>
                        <div><span className="font-medium">Audience:</span> {c.audience}</div>
                        <div><span className="font-medium">Frequency:</span> {c.frequency}</div>
                        <div><span className="font-medium">Format:</span> {c.format}</div>
                      </dl>
                      <div className="mt-2 text-xs text-slate-500">{c.purpose}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Section>

        {/* Employee Voice */}
        <Section id="voice" hidden={active!=='voice'}>
          <div className="py-8">
            <h3 className="font-semibold mb-2">Method summary</h3>
            <p className="text-sm text-slate-700 dark:text-slate-300">Informal conversations with employees from different roles. We asked which channels they check, ignore, and find valuable. This is qualitative and directional, not a full survey.</p>

            <div className="mt-6 flex items-center justify-between">
              <h3 className="font-semibold">Quote wall</h3>
              <div className="flex items-center gap-2">
                <FilterBar filters={["All","Email","Viva","Screens","Factory","Head Office"]} active={"All"} onChange={()=>{}} />
                <div className="flex gap-1 ml-2" role="group" aria-label="View toggle">
                  <button onClick={()=>setVoiceView('bubbles')} className={`px-3 py-1.5 rounded-l border ${voiceView==='bubbles'?'bg-blue-600 text-white border-blue-600':'border-slate-300'}`}>Bubbles</button>
                  <button onClick={()=>setVoiceView('list')} className={`px-3 py-1.5 rounded-r border ${voiceView==='list'?'bg-blue-600 text-white border-blue-600':'border-slate-300'}`}>List</button>
                </div>
              </div>
            </div>

            <div className="mt-4">
              <QuoteWall quotes={quotes} view={voiceView} onTagClick={()=>{}} />
            </div>

            <div className="mt-10">
              <h3 className="font-semibold mb-2">Sentiment by channel</h3>
              <div className="grid sm:grid-cols-3 gap-4">
                {['Importance','Usage','Emotional resonance'].map((m,i)=> (
                  <div key={i} className="rounded-lg border border-slate-200 dark:border-slate-800 p-4 bg-white dark:bg-slate-900">
                    <div className="font-medium">{m}</div>
                    <div className="mt-3 h-36 bg-gradient-to-r from-blue-100 to-blue-200 rounded" aria-hidden="true" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Section>

        {/* Diagnostics */}
        <Section id="diagnostics" hidden={active!=='diagnostics'}>
          <div className="py-8 grid md:grid-cols-2 gap-4">
            {[
              { name:'Emails & Newsletter', role: 'Reliable gateway for important updates', reality: 'High trust, sometimes heavy volume', risk:'Inbox fatigue', opportunity:'Clear governance + design as gateway', strength:'strong' },
              { name:'Townhalls', role: 'Alignment, recognition, Q&A', reality: 'Well attended, strong moments', risk:'Passive listening only', opportunity:'Huddles + clip recaps', strength:'strong' },
              { name:'Within & Beyond + CEO messages', role: 'Inspiration and culture', reality: 'Positive resonance when human', risk:'Becoming corporate wallpaper', opportunity:'More local, human stories', strength:'mixed' },
              { name:'Viva Engage', role: 'Social hub for stories and recognition', reality: 'Low adoption and habit', risk:'Perceived as extra work', opportunity:'People-first series + champions', strength:'weak' },
              { name:'EV Screens', role: 'Ambient nudges and highlights', reality: 'Catches attention with familiar faces', risk:'Noise if generic', opportunity:'Short, visual, local wins', strength:'mixed' },
              { name:'Everything in Between podcast', role: 'Depth on strategy and culture', reality: 'Niche audience, appreciated by some', risk:'Low awareness', opportunity:'Curate clips into email/Viva', strength:'mixed' },
              { name:'Factory vs Head Office comms', role: 'Context-appropriate communication', reality: 'Factory feel is human; HO more corporate', risk:'Cultural split persists', opportunity:'Bring factory warmth into HO', strength:'mixed' },
            ].map((c,i)=> (
              <ChannelDiagnosticCard key={i} {...c} />
            ))}
          </div>
        </Section>

        {/* Patterns */}
        <Section id="patterns" hidden={active!=='patterns'}>
          <div className="py-8">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-2">Where we genuinely connect</h3>
                <ul className="space-y-2">
                  {['Townhalls','CEO messages','Within & Beyond','Emails (trust)','Factory micro-comms'].map((p,i)=> (
                    <li key={i} className="rounded border p-3 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">{p}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Where we lose people</h3>
                <ul className="space-y-2">
                  {['Viva (low adoption, high effort)','Complicated targeting/governance','Text-heavy assets','Corporate HO tone vs human factory tone'].map((p,i)=> (
                    <li key={i} className="rounded border p-3 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">{p}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-8">
              <h3 className="font-semibold mb-2">Noise risk</h3>
              <ul className="grid sm:grid-cols-3 gap-3">
                {['Over-broadcasting (send to all)','Same content in too many channels','Expecting employees to chase info across platforms'].map((p,i)=> (
                  <li key={i} className="rounded border p-3 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">{p}</li>
                ))}
              </ul>
            </div>
          </div>
        </Section>

        {/* Disruptions */}
        <Section id="disruptions" hidden={active!=='disruptions'}>
          <div className="py-8">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">Experiments & Bets</h3>
              <div className="text-sm text-slate-500">Toggle timeline/grid coming soon</div>
            </div>

            <div className="mt-4 grid md:grid-cols-2 gap-4">
              <div className="rounded-lg border p-4 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
                <h4 className="font-semibold">Quick Experiments (3–6 months)</h4>
                <ul className="mt-2 space-y-2 text-sm">
                  <li className="border rounded p-3">Clean email & governance + email as gateway</li>
                  <li className="border rounded p-3">Human, local stories first on Viva</li>
                  <li className="border rounded p-3">Townhall watch huddles + post-event clips and prompts</li>
                </ul>
              </div>
              <div className="rounded-lg border p-4 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
                <h4 className="font-semibold">Big Bets (6–18 months)</h4>
                <ul className="mt-2 space-y-2 text-sm">
                  <li className="border rounded p-3">Employee-hosted townhall</li>
                  <li className="border rounded p-3">Viva as first home of stories; other channels amplifying</li>
                  <li className="border rounded p-3">Bring factory family feel into HO and digital</li>
                  <li className="border rounded p-3">Kill or redesign legacy comms</li>
                </ul>
              </div>
            </div>
          </div>
        </Section>

        {/* Viva Deep Dive */}
        <Section id="viva" hidden={active!=='viva'}>
          <div className="py-8">
            <h3 className="font-semibold mb-2">Current state</h3>
            <p className="text-sm">Viva is intended as culture hub but currently low adoption, habit, and perceived value.</p>
            <ul className="list-disc pl-6 mt-2 text-sm space-y-1">
              <li>Feels like extra work to check</li>
              <li>Low habit formation; unclear payoff</li>
              <li>Not enough local, human stories</li>
            </ul>

            <div className="mt-6 grid md:grid-cols-2 gap-6">
              <div className="rounded-lg border p-4 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
                <h4 className="font-semibold">Today</h4>
                <p className="text-sm mt-2">Low adoption, sporadic engagement, unclear ownership.</p>
              </div>
              <div className="rounded-lg border p-4 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
                <h4 className="font-semibold">Future</h4>
                <p className="text-sm mt-2">First place for people stories and recognition; anchor for campaigns and townhalls; employees see themselves and each other.</p>
              </div>
            </div>

            <div className="mt-6">
              <h4 className="font-semibold">Specific moves</h4>
              <ul className="mt-2 grid sm:grid-cols-2 gap-2 text-sm">
                {['People of Nestlé MENA recurring series','Campaigns anchored in Viva first','Viva champions in markets','Success = engagement, diverse contributors, "I saw this on Viva" mentions'].map((m,i)=> (
                  <li key={i} className="border rounded p-3 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">{m}</li>
                ))}
              </ul>
            </div>
          </div>
        </Section>

        {/* HR Lens */}
        <Section id="hr" hidden={active!=='hr'}>
          <div className="py-8 grid md:grid-cols-3 gap-4">
            {[
              { title:'Talent Attraction & Referrals', desc:'Strong internal comms drives pride and clarity, which drives referrals.' },
              { title:'Learning & Development', desc:'Clear comms around trainings help employees plan and managers encourage participation.' },
              { title:'Talent Management & Performance Cycles', desc:'Reminders and guidance reduce anxiety, increase completion and quality of conversations.' },
            ].map((c,i)=> (
              <div key={i} className="rounded-lg border p-4 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
                <h4 className="font-semibold">{c.title}</h4>
                <p className="text-sm mt-2">{c.desc}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* Principles & Roadmap */}
        <Section id="principles" hidden={active!=='principles'}>
          <div className="py-8">
            <h3 className="font-semibold mb-3">Principles</h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {[
                ['Transparent','Open, timely and honest by default.'],
                ['Human','Write like people, not corporate bots.'],
                ['Relevant','Right people, right time, right channel.'],
                ['Employee-first','Design around employee workflows.'],
                ['Connected','Channels support each other, not duplicate.'],
              ].map((p,i)=> (
                <div key={i} className="rounded-lg border p-4 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
                  <div className="font-semibold">{p[0]}</div>
                  <p className="text-sm mt-1">{p[1]}</p>
                </div>
              ))}
            </div>

            <h3 className="font-semibold mt-8 mb-3">Roadmap</h3>
            <div className="grid md:grid-cols-3 gap-4">
              {[
                ['0–3 months','Align & pick pilots; define governance; prepare email-as-gateway pilot.'],
                ['3–9 months','Run experiments; collect learning; scale people-first Viva series.'],
                ['9–18 months','Decide on big bets; embed principles; retire legacy comms.'],
              ].map((r,i)=> (
                <div key={i} className="rounded-lg border p-4 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
                  <div className="font-semibold">{r[0]}</div>
                  <p className="text-sm mt-1">{r[1]}</p>
                </div>
              ))}
            </div>
          </div>
        </Section>

        <div className="fixed bottom-4 right-4 flex gap-2">
          <button onClick={()=>setTheme(t=> t==='dark' ? 'light' : 'dark')} className="px-3 py-2 rounded-md bg-blue-600 text-white shadow">Toggle {theme==='dark'?'Light':'Dark'}</button>
          <a href="#overview" className="px-3 py-2 rounded-md bg-slate-800 text-white/90 shadow">Back to top</a>
        </div>
      </main>

      <Modal open={!!modal} onClose={()=>setModal(null)} title={modal?.name}>
        {modal && (
          <div>
            <div className="grid sm:grid-cols-2 gap-3 text-sm">
              <div><span className="font-medium">Owner:</span> {modal.owner}</div>
              <div><span className="font-medium">Audience:</span> {modal.audience}</div>
              <div><span className="font-medium">Frequency:</span> {modal.frequency}</div>
              <div><span className="font-medium">Format:</span> {modal.format}</div>
            </div>
            <p className="mt-3 text-sm text-slate-700 dark:text-slate-300">{modal.purpose}</p>
            <div className="mt-4 h-40 bg-slate-100 dark:bg-slate-800 rounded flex items-center justify-center text-slate-500">Example screenshot placeholder</div>
          </div>
        )}
      </Modal>
    </div>
  )
}
