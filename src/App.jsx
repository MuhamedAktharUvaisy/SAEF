// ============================================================
// SA’EF LANDING PAGE: src/App.jsx
// ============================================================


import { useEffect, useState } from 'react'
import { motion, AnimatePresence, MotionConfig } from 'framer-motion'
import {
  Layers, Bot, HeartPulse, Gauge, BellRing,
  Menu, X, Mail, GraduationCap, User, Plus, Mic,
  Ambulance, BriefcaseMedical, Stethoscope, Pill, Syringe, Bandage, ShieldPlus, Thermometer,
} from 'lucide-react'

/* ============================================================
   EDITABLE CONTENT: change text, names and links here
   ============================================================ */

const NAV = [['home', 'Home'], ['about', 'About'], ['team', 'Team'], ['gallery', 'Gallery']]

const TEAM = [
  { role: 'Student', name: 'Mousa Jawad Herzallah', email: '1092271@students.adu.ac.ae' },
  { role: 'Student', name: 'Mohammad Samer Abu Zahra', email: '1088993@students.adu.ac.ae' },
  { role: 'Student', name: 'Syeda Daniya Biyabani', email: '1090742@students.adu.ac.ae' },
  { role: 'Student', name: 'Muhamed Akhtar Uvaisy', email: '1087518@students.adu.ac.ae' },
  { role: 'Supervisor', name: 'Dr. Murad Al-Rajab', email: 'murad.al-rajab@adu.ac.ae' },
]

const AFFILIATION = ['Department of Computer Science and IT', 'College of Engineering', 'Abu Dhabi University', 'Abu Dhabi, UAE']

const EVENTS = [
  { title: 'IC-SIT 2026 achievement award', note: 'Recognition of Competition Achievement Awards at the International Competition on Smart Innovation Technologies.', image: '/accomplishments/ic-sit-award.jpeg', pos: '50% 35%' },
  { title: 'Cyberthon at BITS Pilani Dubai', note: 'Second place certificate for the SA’EF team.', image: '/accomplishments/cyberthon.jpeg', pos: '50% 40%' },
]

/* ============================================================
   HELPERS
   ============================================================ */

const Reveal = ({ children, delay = 0, className = '' }) => (
  <motion.div className={className} initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.6, delay, ease: 'easeOut' }}>
    {children}
  </motion.div>
)

const Ecg = ({ className = '', stroke = '#F2545B' }) => (
  <svg viewBox="0 0 400 60" className={className} fill="none" aria-hidden="true">
    <motion.path d="M0 30 H110 L130 30 L145 6 L165 54 L182 14 L196 30 H400" stroke={stroke} strokeWidth="2.5"
      strokeLinecap="round" strokeLinejoin="round" initial={{ pathLength: 0 }}
      animate={{ pathLength: [0, 1, 1], opacity: [1, 1, 0.2] }}
      transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }} />
  </svg>
)

const Logo = ({ light }) => (
  <a href="#home" aria-label="SA’EF home" className={`flex items-center gap-2 font-display text-xl sm:text-2xl font-extrabold ${light ? 'text-white' : 'text-navy'}`}>
    <span className={`grid h-9 w-9 sm:h-11 sm:w-11 place-items-center overflow-hidden rounded-xl ${light ? 'bg-white' : ''}`}>
      <img src="/logo.jpg" alt="" className="h-full w-full object-contain mix-blend-multiply" />
    </span>
    SA’EF
  </a>
)

function Phone({ src = '/shots/home.jpg', alt = 'SA’EF home screen', small = false, uniform = false }) {
  return (
    <div className={`relative mx-auto overflow-hidden rounded-[2.4rem] border-[8px] border-navy bg-navy shadow-soft ${small ? 'w-[180px] sm:w-[220px]' : 'w-[220px] sm:w-[270px]'}`}>
      <img src={src} alt={alt} className={`block w-full ${uniform ? 'aspect-[9/21] object-cover object-top' : ''}`} />
    </div>
  )
}

const Float = ({ children, className, delay = 0 }) => (
  <motion.div className={`absolute flex items-center gap-2 rounded-full bg-white px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold shadow-soft ${className}`}
    animate={{ y: [0, -10, 0] }} transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay }}>
    {children}
  </motion.div>
)

/* ============================================================
   NAV
   ============================================================ */
function Nav() {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('home')

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' })
    NAV.forEach(([id]) => { const el = document.getElementById(id); el && io.observe(el) })
    return () => io.disconnect()
  }, [])

  return (
    <motion.header initial={{ y: -40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6, ease: 'easeOut' }}
      className="fixed inset-x-0 top-0 z-50 border-b border-navy/5 bg-ivory/80 backdrop-blur-md">
      <nav className="mx-auto flex h-[64px] sm:h-[72px] max-w-6xl items-center justify-between px-4 sm:px-5" aria-label="Main">
        <a href="#home" aria-label="SA’EF home" className="flex items-center gap-2 sm:gap-3">
          <span className="grid h-11 w-11 sm:h-14 sm:w-14 place-items-center overflow-hidden rounded-xl">
            <img src="/logo.jpg" alt="SA'EF logo" className="h-full w-full object-contain mix-blend-multiply" />
          </span>
          <div className="flex flex-col leading-none">
            <span className="font-display text-xl sm:text-3xl font-extrabold text-navy">SA’EF</span>
            <span className="font-display text-sm sm:text-lg font-bold text-coral" dir="rtl">ساعف</span>
          </div>
        </a>

        <ul className="hidden items-center gap-6 lg:gap-8 md:flex">
          {NAV.map(([id, label]) => (
            <li key={id} className="relative">
              <a href={`#${id}`} className={`py-2 text-sm font-semibold transition-colors ${active === id ? 'text-emergency' : 'text-navy/70 hover:text-navy'}`}>{label}</a>
              {active === id && <motion.span layoutId="underline" className="absolute -bottom-0.5 left-0 h-0.5 w-full rounded bg-coral" />}
            </li>
          ))}
        </ul>

        <div className="hidden items-center md:flex">
          <a href="https://www.adu.ac.ae/" target="_blank" rel="noopener noreferrer" aria-label="Abu Dhabi University" className="flex items-center">
            <img src="/ADU-LOGO.png" alt="Abu Dhabi University" className="h-10 sm:h-12 lg:h-14 w-auto object-contain" />
          </a>
        </div>

        <button className="grid h-10 w-10 sm:h-11 sm:w-11 place-items-center rounded-xl md:hidden" onClick={() => setOpen(!open)} aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open}>
          {open ? <X /> : <Menu />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-navy/5 bg-ivory md:hidden">
            <ul className="flex flex-col gap-1 p-4">
              {NAV.map(([id, label]) => (
                <li key={id}><a href={`#${id}`} onClick={() => setOpen(false)} className="block rounded-xl px-4 py-3 font-semibold hover:bg-blush">{label}</a></li>
              ))}
              <li className="mt-3 flex items-center justify-center gap-2 border-t border-navy/10 pt-4">
                <img src="/ADU-LOGO.png" alt="Abu Dhabi University" className="h-12 w-auto object-contain" />
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}

/* ============================================================
   HERO
   ============================================================ */
function Hero() {
  const lead = 'Smart AI First Aid'.split(' ')
  const accent = 'When Every Second Matters.'.split(' ')

  const word = (w, i, c = '') => (
    <motion.span key={w + i} className={`mr-2 sm:mr-3 inline-block ${c}`} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 + i * 0.12, ease: 'easeOut' }}>{w}</motion.span>
  )

  return (
    <section id="home" className="relative overflow-hidden px-4 sm:px-5 pb-16 sm:pb-20 pt-24 sm:pt-32">
      <div className="absolute -right-32 top-10 -z-0 h-[320px] sm:h-[420px] lg:h-[520px] w-[320px] sm:w-[420px] lg:w-[520px] rounded-full bg-blush blur-3xl" aria-hidden="true" />

      {[260, 380, 500].map((s, i) => (
        <motion.div key={s} aria-hidden="true" className="absolute right-[6%] top-[18%] hidden rounded-full border border-coral/20 lg:block"
          style={{ width: s, height: s, marginRight: (400 - s) / 2 - 60 }} animate={{ scale: [1, 1.04, 1] }}
          transition={{ duration: 5 + i, repeat: Infinity, ease: 'easeInOut' }} />
      ))}

      <div className="relative mx-auto grid max-w-6xl items-center gap-10 sm:gap-14 lg:grid-cols-2">
        {/* LEFT: text and buttons */}
        <div>
          <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}
            className="mb-4 sm:mb-5 inline-flex items-center gap-2 rounded-full bg-white px-3 sm:px-4 py-1.5 text-xs sm:text-sm font-semibold text-emergency shadow-soft">
            <motion.span animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 1.6, repeat: Infinity }}><Plus size={16} strokeWidth={3} /></motion.span>
            Smart AI Emergency First Aid
          </motion.span>

          <h1 className="font-display text-3xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.05]">
            {lead.map((w, i) => word(w, i))}
            <br />
            {accent.map((w, i) => word(w, i + lead.length, 'text-coral'))}
          </h1>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.3, duration: 0.6 }}
            className="mt-5 sm:mt-6 max-w-lg text-base sm:text-lg text-navy/70">
            SA’EF turns any bystander into a confident first responder with live camera analysis, AR guidance and instant EMS alerts, until professionals arrive.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.5, duration: 0.6 }} className="mt-6 sm:mt-8 flex flex-wrap gap-3 sm:gap-4">
            <a href="#about" className="rounded-full border border-navy/15 bg-white px-5 sm:px-7 py-3 sm:py-3.5 text-sm sm:text-base font-semibold transition hover:-translate-y-1 hover:border-coral">Learn more</a>
          </motion.div>

          <Ecg className="mt-8 sm:mt-10 h-10 sm:h-12 w-full max-w-xs sm:max-w-sm opacity-70" />
        </div>

        {/* RIGHT: floating phone */}
        <motion.div initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.9, delay: 0.5 }} className="relative min-h-[380px] sm:min-h-[480px]">
          <motion.div animate={{ y: [0, -14, 0], rotate: [-1.5, 1.5, -1.5] }} transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }} className="pt-4">
            <Phone />
          </motion.div>
        
<Float className="left-0 top-12 text-navy sm:left-6"><Bot size={16} className="text-coral" />AI Assistant</Float>
<Float className="right-0 top-40 sm:right-6" delay={1}><BellRing size={16} className="text-coral" />EMS Alert</Float>
<Float className="bottom-16 left-2 sm:left-10" delay={2}><Layers size={16} className="text-coral" />AR Guidance</Float>
<Float className="bottom-16 right-2 sm:right-10" delay={3}><HeartPulse size={16} className="text-coral" />Vitals Monitor</Float>
        </motion.div>
      </div>
    </section>
  )
}

// Shared card (compact version): both cards use this same design
function AboutCard({ item, from }) {
  const Icon = item.icon
  return (
    <motion.div
      initial={{ opacity: 0, x: from === 'left' ? -40 : 40 }} whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.7, delay: from === 'left' ? 0 : 0.15, ease: 'easeOut' }}
      whileHover={{ y: -6 }}
      className="group relative overflow-hidden rounded-[1.75rem] bg-white p-5 sm:p-6 shadow-soft ring-1 ring-coral/20 transition-shadow duration-300 hover:shadow-glow">

      {/* First aid cross watermark */}
      <Plus size={120} strokeWidth={3} className="pointer-events-none absolute -right-6 -top-6 text-coral/10" aria-hidden="true" />
      <div className="pointer-events-none absolute -bottom-12 -left-10 h-36 w-36 rounded-full bg-blush blur-2xl" aria-hidden="true" />

      {/* Coral edge bar */}
      <span className="absolute inset-y-5 left-0 w-1.5 rounded-r-full bg-gradient-to-b from-coral to-emergency" aria-hidden="true" />

      <div className="relative">
        {/* Icon tile with a small medical cross badge */}
        <div className="relative inline-block">
          <div className="grid h-12 w-12 place-items-center rounded-2xl bg-blush ring-2 ring-coral/30 transition-transform duration-300 group-hover:rotate-6 group-hover:scale-110">
            <Icon size={24} className="text-emergency" />
          </div>
          <span className="absolute -right-2 -top-2 grid h-5 w-5 place-items-center rounded-full bg-emergency text-white shadow-soft">
            <Plus size={12} strokeWidth={3.5} />
          </span>
        </div>

        <span className="mt-4 block w-fit rounded-full bg-blush px-3 py-1 text-[10px] sm:text-[11px] font-extrabold uppercase tracking-widest text-emergency">
          {item.tag}
        </span>
        <h3 className="mt-2.5 font-display text-lg sm:text-xl font-extrabold leading-snug text-navy">{item.title}</h3>
        <p className="mt-2 text-[13px] sm:text-sm leading-relaxed text-navy/70">{item.text}</p>

        {/* Animated heartbeat line */}
        <div className="mt-4 flex items-center gap-3 border-t border-navy/5 pt-3">
          <HeartPulse size={18} className="shrink-0 text-emergency" />
          <Ecg className="h-6 w-full opacity-70" />
        </div>
      </div>
    </motion.div>
  )
}

function About() {
  const problem = {
    icon: Gauge,
    tag: 'The Problem',
    title: 'Most bystanders freeze in emergencies.',
    text: 'The majority of the public has never received formal first aid training, and many hesitate to act due to the fear of causing further harm.',
  }
  const solution = {
    icon: Bot,
    tag: 'Our Solution',
    title: "SA'EF guides them through it — step by step.",
    text: "SA'EF understands the emergency, communicates, and delivers step-by-step first aid guidance through AR.",
  }

  return (
    // One screen tall on desktop so clicking "About" shows everything
    <section id="about" className="relative isolate overflow-hidden px-4 sm:px-5 py-12 lg:flex lg:min-h-[calc(100vh-84px)] lg:items-center lg:py-6">

      {/* Background blobs */}
      <div className="absolute -left-40 top-1/4 -z-10 h-[320px] sm:h-[500px] w-[320px] sm:w-[500px] rounded-full bg-blush blur-3xl opacity-60" aria-hidden="true" />
      <div className="absolute -right-40 bottom-1/4 -z-10 h-[320px] sm:h-[500px] w-[320px] sm:w-[500px] rounded-full bg-lavender blur-3xl opacity-60" aria-hidden="true" />

      {/* Cross pattern overlay */}
      <svg className="pointer-events-none absolute inset-0 -z-10 h-full w-full opacity-[0.03]" aria-hidden="true">
        <defs>
          <pattern id="crossPattern" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M28 20 H32 V28 H40 V32 H32 V40 H28 V32 H20 V28 H28 Z" fill="#0A1B3D" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#crossPattern)" />
      </svg>

      <div className="mx-auto w-full max-w-6xl">

        {/* HEADER (compact: heading fits on one line on desktop) */}
        <div className="text-center">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full bg-white px-3 sm:px-4 py-1.5 text-[10px] sm:text-xs font-bold uppercase tracking-wider text-emergency shadow-soft ring-1 ring-blush">
              <span className="relative flex h-1.5 sm:h-2 w-1.5 sm:w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emergency opacity-75" />
                <span className="relative inline-flex h-1.5 sm:h-2 w-1.5 sm:w-2 rounded-full bg-emergency" />
              </span>
              Why SA'EF needed
            </span>
          </Reveal>

          <Reveal delay={0.1}>
            <h2 className="mx-auto mt-3 max-w-4xl font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold leading-[1.1] tracking-tight text-navy">
              Help for the first{' '}
              <span className="relative inline-block">
                <span className="relative z-10 text-coral">minutes</span>
                <span className="absolute bottom-0.5 left-0 -z-0 h-2 w-full rounded-full bg-coral/20" aria-hidden="true" />
              </span>
              {' '}that matter most
            </h2>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="mx-auto mt-3 max-w-4xl text-sm leading-relaxed text-navy/70">
              SA'EF is a smart AI-powered emergency interactive assistance system developed by students of Abu Dhabi University. The system is designed to support untrained bystanders during the critical moments before professional medical help arrives
            </p>
          </Reveal>
        </div>

        {/* PROBLEM  |  PHONE  |  SOLUTION */}
        <div className="mt-6 grid items-center gap-6 lg:grid-cols-[1fr_auto_1fr] lg:gap-8">

          <div className="order-2 lg:order-1"><AboutCard item={problem} from="left" /></div>

          {/* Centre: the FULL phone. Its height follows the window height, width follows automatically */}
          <Reveal className="order-1 lg:order-2" delay={0.15}>
            <div className="relative mx-auto w-fit px-6">
              <div className="absolute -left-2 top-6 -z-0 h-[75%] w-[85%] rotate-[-6deg] rounded-[2.4rem] bg-coral/15" aria-hidden="true" />
              <div className="absolute -right-2 bottom-2 -z-0 h-[55%] w-[70%] rotate-[8deg] rounded-[2rem] bg-emergency/15" aria-hidden="true" />

              <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }} className="relative z-10">
                <div className="mx-auto h-[min(50vh,430px)] overflow-hidden rounded-[2.2rem] border-[7px] border-navy bg-navy shadow-soft">
                  <img src="/shots/home.jpg" alt="SA’EF home screen" className="block h-full w-auto" />
                </div>
              </motion.div>

              <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                className="absolute -right-4 top-10 z-20 flex items-center gap-2 rounded-2xl bg-white px-3 py-2 shadow-soft ring-1 ring-blush">
                <span className="grid h-8 w-8 place-items-center rounded-xl bg-blush">
                  <HeartPulse size={18} className="text-emergency" />
                </span>
                <div>
                  <p className="text-[9px] font-bold uppercase tracking-wider text-navy/50">Help</p>
                  <p className="font-display text-sm font-extrabold text-navy">At your fingertips</p>
                </div>
              </motion.div>


              <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
  className="absolute -right-6 bottom-8 z-20 flex items-center gap-2 rounded-2xl bg-white px-3 py-2 shadow-soft ring-1 ring-lavender">
  <span className="grid h-8 w-8 place-items-center rounded-xl bg-lavender">
    <Mic size={18} className="text-emergency" />
  </span>
  <div>
    <p className="text-[9px] font-bold uppercase tracking-wider text-navy/50">AI:SHA</p>
    <p className="font-display text-sm font-extrabold text-navy">Hands-free</p>
  </div>
</motion.div>


              

              <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                className="absolute -left-4 bottom-20 z-20 flex items-center gap-2 rounded-2xl bg-white px-3 py-2 shadow-soft ring-1 ring-mint">
                <span className="grid h-8 w-8 place-items-center rounded-xl bg-mint">
                  <Bot size={18} className="text-emergency" />
                </span>
                <div>
                  <p className="text-[9px] font-bold uppercase tracking-wider text-navy/50">Languages</p>
                  <p className="font-display text-sm font-extrabold text-navy">Arabic + English</p>
                </div>
              </motion.div>
            </div>
          </Reveal>

          <div className="order-3"><AboutCard item={solution} from="right" /></div>

        </div>
      </div>
    </section>
  )
}

/* ============================================================
   FIRST AID BACKGROUND: drifting medical icons + a driving ambulance
   ============================================================ */
const AID_ICONS = [BriefcaseMedical, Stethoscope, Pill, Syringe, Bandage, HeartPulse, ShieldPlus, Thermometer]

// Where each icon sits (left/top in %), its size and how fast it floats
const AID_SPOTS = [
  { left: '4%',  top: '14%', size: 34, dur: 7 },
  { left: '90%', top: '9%',  size: 30, dur: 8 },
  { left: '8%',  top: '38%', size: 28, dur: 9 },
  { left: '93%', top: '34%', size: 36, dur: 7.5 },
  { left: '3%',  top: '62%', size: 32, dur: 8.5 },
  { left: '91%', top: '58%', size: 30, dur: 9.5 },
  { left: '7%',  top: '84%', size: 34, dur: 7 },
  { left: '92%', top: '82%', size: 28, dur: 8 },
]

// laneClass = where the ambulance drives (e.g. 'top-6' or 'bottom-6')
// reverse   = true makes it drive from right to left
// seed      = changes which icons appear, so each section looks different
function FirstAidBackground({ laneClass = 'bottom-6', reverse = false, seed = 0 }) {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">

      {/* Floating first aid icons */}
      {AID_SPOTS.map((s, i) => {
        const Icon = AID_ICONS[(i + seed) % AID_ICONS.length]
        return (
          <motion.div key={i} className="absolute text-coral/25" style={{ left: s.left, top: s.top }}
            animate={{ y: [0, -18, 0], rotate: [-8, 8, -8], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: s.dur, repeat: Infinity, ease: 'easeInOut', delay: i * 0.5 }}>
            <Icon size={s.size} strokeWidth={1.75} />
          </motion.div>
        )
      })}

      {/* Road + driving ambulance */}
      <div className={`absolute inset-x-0 h-16 ${laneClass}`}>
        <div className="absolute inset-x-0 bottom-1 border-t-2 border-dashed border-coral/25" />
        <motion.div className="absolute bottom-2 left-0"
          animate={{ x: reverse ? ['105vw', '-15vw'] : ['-15vw', '105vw'] }}
          transition={{ duration: 16, repeat: Infinity, ease: 'linear', repeatDelay: 3 }}>
          <div className="relative" style={{ transform: reverse ? 'scaleX(-1)' : 'none' }}>
            <Ambulance size={46} strokeWidth={1.75} className="text-emergency/60" />
            {/* Flashing siren light */}
            <motion.span className="absolute -top-1 left-[52%] h-2.5 w-2.5 rounded-full bg-emergency"
              animate={{ opacity: [1, 0.15, 1], scale: [1, 1.5, 1] }} transition={{ duration: 0.7, repeat: Infinity }} />
            <motion.span className="absolute -top-1 left-[35%] h-2.5 w-2.5 rounded-full bg-sky-400"
              animate={{ opacity: [0.15, 1, 0.15], scale: [1.5, 1, 1.5] }} transition={{ duration: 0.7, repeat: Infinity }} />
          </div>
        </motion.div>
      </div>
    </div>
  )
}

/* ============================================================
   TEAM — dynamic background + matching cards
   ============================================================ */
function Team() {
  return (
    <section id="team" className="relative isolate overflow-hidden bg-gradient-to-b from-white via-ivory to-white px-4 sm:px-5 py-16 sm:py-24">

      <FirstAidBackground laneClass="bottom-6" reverse seed={3} />

      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
        <div className="absolute -left-40 top-1/4 h-[400px] w-[400px] rounded-full bg-mint/40 blur-3xl" />
        <div className="absolute -right-40 bottom-1/4 h-[400px] w-[400px] rounded-full bg-blush/40 blur-3xl" />

        {[
          { top: '15%', left: '10%', size: 120, dur: 5 },
          { top: '60%', left: '85%', size: 160, dur: 6.5 },
          { top: '85%', left: '20%', size: 100, dur: 5.5 },
        ].map((r, i) => (
          <motion.div key={i} className="absolute rounded-full border-2 border-coral/10"
            style={{ top: r.top, left: r.left, width: r.size, height: r.size }}
            animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.05, 0.3] }}
            transition={{ duration: r.dur, repeat: Infinity, ease: 'easeInOut', delay: i * 0.5 }} />
        ))}

        {[
          { top: '25%', left: '92%', dur: 7 },
          { top: '70%', left: '5%', dur: 8 },
          { top: '40%', left: '45%', dur: 9 },
        ].map((h, i) => (
          <motion.div key={i} className="absolute text-coral/10" style={{ top: h.top, left: h.left }}
            animate={{ y: [0, -18, 0], opacity: [0.4, 0.9, 0.4] }}
            transition={{ duration: h.dur, repeat: Infinity, ease: 'easeInOut', delay: i * 0.6 }}>
            <HeartPulse size={28} />
          </motion.div>
        ))}
      </div>

      <div className="mx-auto max-w-6xl">
        <Reveal><h2 className="font-display text-2xl sm:text-4xl lg:text-5xl font-extrabold">Meet our team</h2></Reveal>
        <div className="mt-8 sm:mt-12 grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {TEAM.map((m, i) => {
            const sup = m.role === 'Supervisor'
            const Icon = sup ? GraduationCap : User
            return (
              <Reveal key={m.email} delay={(i % 3) * 0.1}>
                <article className={`h-full rounded-2xl sm:rounded-3xl p-5 sm:p-6 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-glow ${sup ? 'bg-navy/5 ring-2 ring-coral/30' : 'bg-white'}`}>
                  <div className="flex items-center gap-3 sm:gap-4">
                    <span className={`grid h-12 sm:h-14 w-12 sm:w-14 place-items-center rounded-2xl ${sup ? 'bg-coral text-white' : 'bg-blush text-emergency'}`}>
                      <Icon size={26} />
                    </span>
                    <div>
                      <p className={`text-xs sm:text-sm font-semibold ${sup ? 'text-coral' : 'text-emergency'}`}>{m.role}</p>
                      <h3 className="font-display text-base sm:text-xl font-bold leading-tight text-navy">{m.name}</h3>
                    </div>
                  </div>
                  <ul className={`mt-4 sm:mt-5 space-y-0.5 text-[13px] sm:text-sm ${sup ? 'text-navy/75' : 'text-navy/65'}`}>
                    {AFFILIATION.map((a) => <li key={a}>{a}</li>)}
                  </ul>
                  <a href={`mailto:${m.email}`} className={`mt-4 sm:mt-5 inline-flex items-center gap-2 break-all text-[13px] sm:text-sm font-semibold underline-offset-4 hover:underline ${sup ? 'text-coral' : 'text-navy/70'}`}>
                    <Mail size={16} />{m.email}
                  </a>
                </article>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}

/* ============================================================
   GALLERY — now with dynamic background
   ============================================================ */
function Gallery() {
  return (
    <section id="gallery" className="relative isolate overflow-hidden bg-gradient-to-b from-ivory via-white to-ivory px-4 sm:px-5 py-16 sm:py-24">

      <FirstAidBackground laneClass="bottom-6" seed={5} />

      {/* Animated background layers (isolate on the section keeps them visible) */}
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
        <div className="absolute -left-40 top-1/3 h-[400px] w-[400px] rounded-full bg-lavender/40 blur-3xl" />
        <div className="absolute -right-40 bottom-1/3 h-[400px] w-[400px] rounded-full bg-mint/40 blur-3xl" />

        {/* Pulsing medical crosses */}
        {[
          { top: '10%', left: '8%' },
          { top: '22%', left: '92%' },
          { top: '48%', left: '4%' },
          { top: '68%', left: '95%' },
          { top: '85%', left: '15%' },
          { top: '78%', left: '78%' },
        ].map((c, i) => (
          <motion.div key={i} className="absolute text-coral/15" style={{ top: c.top, left: c.left }}
            animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.8, 0.3] }}
            transition={{ duration: 3 + i * 0.5, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}>
            <Plus size={20} strokeWidth={3} />
          </motion.div>
        ))}

        {/* Faint heartbeat line along the bottom */}
        <motion.svg viewBox="0 0 1200 60" className="absolute bottom-6 left-0 w-full opacity-[0.06]" fill="none" preserveAspectRatio="none">
          <motion.path
            d="M0 30 H120 L140 30 L155 6 L175 54 L192 14 L206 30 H360 L380 30 L395 6 L415 54 L432 14 L446 30 H600 L620 30 L635 6 L655 54 L672 14 L686 30 H840 L860 30 L875 6 L895 54 L912 14 L926 30 H1200"
            stroke="#E11D2E" strokeWidth="2"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: [0, 1, 1], opacity: [0, 0.8, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.svg>
      </div>

      <div className="mx-auto max-w-6xl">
        <Reveal><h2 className="font-display text-2xl sm:text-4xl lg:text-5xl font-extrabold">SA’EF Accomplishments</h2></Reveal>

        {/* Two photos: two centred columns (use md:grid-cols-3 if you add a third photo) */}
        <div className="mx-auto mt-8 sm:mt-12 grid max-w-4xl grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6">
          {EVENTS.map((g, i) => (
            <Reveal key={g.title} delay={i * 0.1}>
              <figure className="group h-full overflow-hidden rounded-2xl sm:rounded-3xl bg-white shadow-soft transition-all duration-300 hover:shadow-glow">
                {/* 4:3 frame; the photo zooms slowly on hover */}
                <div className="aspect-[4/3] overflow-hidden">
                  <img src={g.image} alt={g.title} loading="lazy" style={{ objectPosition: g.pos }}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                </div>
                <figcaption className="p-4 sm:p-5">
                  <p className="font-display text-base sm:text-lg font-bold">{g.title}</p>
                  <p className="mt-1 text-[13px] sm:text-sm text-navy/70">{g.note}</p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ============================================================
   FOOTER
   ============================================================ */
function Footer() {
  return (
    <footer className="relative overflow-hidden bg-navy px-4 sm:px-5 pb-8 sm:pb-10 pt-12 sm:pt-16 text-white">
      <div className="mx-auto grid max-w-6xl gap-8 sm:gap-10 grid-cols-1 md:grid-cols-3">
        <div><Logo light /><p className="mt-3 sm:mt-4 max-w-xs text-[13px] sm:text-sm text-white/70">Smart AI emergency first aid for the minutes before help arrives. An Abu Dhabi University capstone project.</p></div>

        <nav aria-label="Footer"><h3 className="font-display font-bold">Explore</h3>
          <ul className="mt-3 space-y-2 text-[13px] sm:text-sm text-white/70">{NAV.map(([id, l]) => <li key={id}><a href={`#${id}`} className="hover:text-coral">{l}</a></li>)}</ul></nav>

        <div><h3 className="font-display font-bold">Contact</h3>
          <ul className="mt-3 space-y-2 text-[13px] sm:text-sm text-white/70">
            <li><a href="https://linktr.ee/SAEF26" target="_blank" rel="noopener noreferrer" className="hover:text-coral">linktr.ee/SAEF26</a></li>
            <li>Abu Dhabi University, Abu Dhabi, UAE</li></ul></div>
      </div>

      <Ecg className="mx-auto mt-8 sm:mt-12 h-8 sm:h-10 w-full max-w-3xl opacity-60" />
      <p className="mt-4 sm:mt-6 text-center text-[11px] sm:text-xs text-white/50">© 2026 SA’EF.</p>
    </footer>
  )
}

/* ============================================================
   APP
   ============================================================ */
export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <Nav />
      <main><Hero /><About /><Team /><Gallery /></main>
      <Footer />
    </MotionConfig>
  )
}