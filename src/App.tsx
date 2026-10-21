import { FormEvent, useState } from 'react'
import { motion } from 'framer-motion'
import {
  ArrowDownRight, ArrowRight, ArrowUpRight, BatteryCharging, Check, ChevronDown,
  CirclePlay, Hammer, House, Leaf, Menu, Sun, X, Zap
} from 'lucide-react'
import { isSupabaseConfigured, supabase } from './lib/supabase'

const services = [
  { number: '01', icon: Sun, title: 'Residential solar', text: 'Thoughtfully designed rooftop solar systems built around the way your home uses energy.' },
  { number: '02', icon: BatteryCharging, title: 'Battery storage', text: 'Keep more of the power you make, with storage designed for greater energy independence.' },
  { number: '03', icon: Hammer, title: 'Construction', text: 'Practical construction expertise and a detail-first approach from planning through finish.' },
]

const projects = [
  { tag: 'SOLAR + STORAGE', title: 'Energy that works around your life', image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=1200&q=85', cls: 'project-wide' },
  { tag: 'RESIDENTIAL SOLAR', title: 'A smarter roofline', image: 'https://images.unsplash.com/photo-1497440001374-f26997328c1b?auto=format&fit=crop&w=1000&q=85', cls: '' },
  { tag: 'BUILT WITH CARE', title: 'Better homes, better energy', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=85', cls: '' },
]

function Brand() {
  return <a className="brand" href="#home" aria-label="Sahoo Construction and Solar home"><span className="brand-mark"><Sun size={21} strokeWidth={1.7} /></span><span><strong>SAHOO</strong><small>CONSTRUCTION & SOLAR</small></span></a>
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [sending, setSending] = useState(false)
  const [status, setStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null)

  async function submitQuote(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const formElement = event.currentTarget
    setSending(true)
    setStatus(null)
    const form = new FormData(event.currentTarget)
    const payload = {
      name: String(form.get('name') || '').trim(),
      email: String(form.get('email') || '').trim(),
      phone: String(form.get('phone') || '').trim(),
      service: String(form.get('service') || 'Solar consultation'),
      message: String(form.get('message') || '').trim(),
    }
    try {
      if (!supabase) {
        setStatus({ type: 'error', message: 'The form is ready, but Supabase is not connected yet. Add your project URL and publishable/anon key to .env.' })
        return
      }
      const { error } = await supabase.from('quote_requests').insert(payload)
      if (error) throw error
      setStatus({ type: 'success', message: 'Thank you! Your request has been sent. We’ll be in touch soon.' })
      formElement.reset()
    } catch (error) {
      setStatus({ type: 'error', message: error instanceof Error ? error.message : 'Something went wrong. Please try again.' })
    } finally {
      setSending(false)
    }
  }

  return (
    <main id="home">
      <div className="announcement"><span className="announcement-spark">✳</span> A brighter way to power what matters <span className="announcement-line" /><a href="#contact">Let’s talk <ArrowUpRight size={13} /></a></div>
      <header className="site-header">
        <Brand />
        <button className="mobile-menu" aria-label="Toggle menu" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</button>
        <nav className={menuOpen ? 'nav nav-open' : 'nav'}>
          <a onClick={() => setMenuOpen(false)} href="#solutions">Solutions</a>
          <a onClick={() => setMenuOpen(false)} href="#approach">Our approach</a>
          <a onClick={() => setMenuOpen(false)} href="#projects">Projects</a>
          <a onClick={() => setMenuOpen(false)} href="#about">About us</a>
          <a onClick={() => setMenuOpen(false)} className="nav-cta" href="#contact">Get a free quote <ArrowUpRight size={15} /></a>
        </nav>
      </header>

      <section className="hero section-shell">
        <div className="hero-video-background" aria-hidden="true">
          <video
            className="hero-background-video"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster="https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=2000&q=85"
            aria-hidden="true"
          >
            <source src="https://videos.pexels.com/video-files/7211105/7211105-hd_1920_1080_25fps.mp4" type="video/mp4" />
          </video>
        </div>
        <div className="hero-copy">
          <motion.div className="eyebrow" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .55 }}><span className="eyebrow-dot" /> CONSTRUCTION, SOLAR & STORAGE</motion.div>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .7, delay: .08 }}>Power your home.<br />Shape a <em>brighter</em><br />tomorrow.</motion.h1>
          <motion.p className="hero-description" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .65, delay: .18 }}>Good energy starts with good people. We bring construction know-how and thoughtful solar solutions together to help you build a home ready for what’s next.</motion.p>
          <motion.div className="hero-actions" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .6, delay: .25 }}>
            <a className="button button-dark" href="#contact">Plan your project <ArrowRight size={16} /></a>
            <a className="text-link" href="#approach"><CirclePlay size={19} strokeWidth={1.5} /> See how it works</a>
          </motion.div>
          <div className="hero-proof"><div className="avatar-stack"><span>S</span><span>+</span><span>✳</span></div><p><strong>Built around you.</strong><br />Designed for the long run.</p></div>
        </div>
        <div className="hero-visual">
          <div className="visual-wash" />
          <div className="floating-label label-energy"><span className="label-icon"><Zap size={16} /></span><span><strong>Clean energy</strong><small>Made for your home</small></span></div>
          <div className="floating-label label-storage"><span className="label-icon label-icon-gold"><BatteryCharging size={17} /></span><span><strong>Store your power</strong><small>Ready when you need it</small></span></div>
          <div className="sun-stamp"><Sun size={23} strokeWidth={1.2} /><span>ENERGY<br />WITH INTENTION</span></div>
        </div>
        <div className="hero-bottom-note"><span>01 / 03</span><span className="note-rule" /><span>THE FUTURE, BUILT BETTER</span><ArrowDownRight size={17} /></div>
      </section>

      <section className="trust-strip">
        <div><span className="trust-icon"><House size={20} /></span><span><strong>Made for real homes</strong><small>Solutions shaped around you</small></span></div>
        <div><span className="trust-icon"><Sun size={20} /></span><span><strong>Solar, thoughtfully done</strong><small>From first idea to installation</small></span></div>
        <div><span className="trust-icon"><Leaf size={20} /></span><span><strong>Built for tomorrow</strong><small>Long-term thinking, always</small></span></div>
      </section>

      <section className="intro-section section-shell" id="about">
        <div className="section-kicker">A DIFFERENT KIND OF ENERGY COMPANY <span>✳</span></div>
        <div className="intro-grid">
          <h2>Better energy.<br /><em>Better built.</em></h2>
          <div className="intro-copy"><p>We believe a home should do more than look good. It should work smarter, feel comfortable, and be ready for the future.</p><p>That’s why we bring construction experience and modern energy solutions together — with thoughtful planning, clear communication, and care in every detail.</p><a href="#contact" className="underlined-link">Get to know our approach <ArrowUpRight size={16} /></a></div>
        </div>
      </section>

      <section className="services-section" id="solutions">
        <div className="section-shell">
          <div className="section-heading"><div><div className="section-kicker">WHAT WE DO <span>✳</span></div><h2>One partner.<br /><em>More possibilities.</em></h2></div><p>From the roof above you to the power running through your home, we help bring the pieces together.</p></div>
          <div className="service-grid">
            {services.map((service) => {
              const Icon = service.icon
              return <a className="service-card" href="#contact" key={service.number}><div className="service-card-top"><span>{service.number}</span><span className="service-icon"><Icon size={22} strokeWidth={1.5} /></span></div><h3>{service.title}</h3><p>{service.text}</p><span className="service-arrow"><ArrowUpRight size={18} /></span></a>
            })}
          </div>
        </div>
      </section>

      <section className="approach-section section-shell" id="approach">
        <div className="approach-visual"><img src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1400&q=85" alt="Warm modern home with considered architectural details" loading="lazy" /><div className="image-caption"><span>GOOD DESIGN ISN’T JUST WHAT YOU SEE.</span><span>IT’S HOW YOUR HOME WORKS.</span></div><div className="image-number">01<span>—</span>03</div></div>
        <div className="approach-copy"><div className="section-kicker">THE WAY WE WORK <span>✳</span></div><h2>Clear plans.<br /><em>Thoughtful work.</em></h2><p>Home projects can feel complicated. We make the process easier with honest conversations, practical recommendations, and a plan that fits your goals.</p><div className="process-list"><div><span>01</span><p><strong>Start with a conversation</strong><small>Tell us about your home, ideas and priorities.</small></p><Check size={17} /></div><div><span>02</span><p><strong>Make a plan that fits</strong><small>Explore options, scope and the right next steps.</small></p><Check size={17} /></div><div><span>03</span><p><strong>Build for the long run</strong><small>Move forward with clarity and care.</small></p><Check size={17} /></div></div><a href="#contact" className="button button-dark">Let’s talk about your project <ArrowRight size={16} /></a></div>
      </section>

      <section className="projects-section section-shell" id="projects">
        <div className="section-heading project-heading"><div><div className="section-kicker">MADE FOR THE WAY YOU LIVE <span>✳</span></div><h2>Ideas made <em>real.</em></h2></div><a href="#contact" className="underlined-link">Discuss your project <ArrowUpRight size={16} /></a></div>
        <div className="project-grid">
          {projects.map((project, index) => <a href="#contact" className={`project-card ${project.cls}`} key={project.title}><img src={project.image} alt={project.title} loading="lazy" /><div className="project-shade" /><div className="project-info"><span>{project.tag}</span><h3>{project.title}</h3></div><span className="project-arrow"><ArrowUpRight size={18} /></span></a>)}
        </div>
        <p className="project-disclaimer">Imagery shown for inspiration. Your project and final solution will be tailored to your home.</p>
      </section>

      <section className="quote-banner">
        <div className="quote-sun"><Sun size={33} strokeWidth={1.2} /></div>
        <p>“The best kind of progress is the kind that feels right at home.”</p>
        <a href="#contact" className="button button-light">Let’s build what’s next <ArrowRight size={16} /></a>
        <div className="quote-orbit orbit-one" /><div className="quote-orbit orbit-two" />
      </section>

      <section className="contact-section section-shell" id="contact">
        <div className="contact-copy"><div className="section-kicker">YOUR NEXT CHAPTER STARTS HERE <span>✳</span></div><h2>Let’s make<br />something <em>better.</em></h2><p>Tell us a little about your plans. We’ll help you figure out a sensible next step.</p><div className="contact-note"><span className="contact-note-icon"><Zap size={17} /></span><p><strong>No pressure. Just a conversation.</strong><small>Share your idea and we’ll take it from there.</small></p></div></div>
        <form className="quote-form" onSubmit={submitQuote}>
          <div className="form-title"><span>GET A FREE QUOTE</span><span>LET’S START ↗</span></div>
          <div className="form-row"><label>Your name<input required name="name" placeholder="Full name" autoComplete="name" /></label><label>Email address<input required name="email" type="email" placeholder="you@example.com" autoComplete="email" /></label></div>
          <div className="form-row"><label>Phone number <span className="optional">(optional)</span><input name="phone" type="tel" placeholder="+91 ..." autoComplete="tel" /></label><label>What are you planning?<span className="select-wrap"><select name="service" defaultValue="Residential solar"><option>Residential solar</option><option>Battery storage</option><option>Construction</option><option>Solar + construction</option><option>Not sure yet</option></select><ChevronDown size={15} /></span></label></div>
          <label>Tell us a little more <span className="optional">(optional)</span><textarea name="message" rows={3} placeholder="What would you like help with?" /></label>
          <button className="button button-dark form-submit" type="submit" disabled={sending}>{sending ? 'Sending…' : 'Send your request'} <ArrowRight size={16} /></button>
          {status && <p className={`form-status ${status.type}`} role="status">{status.message}</p>}
          {!isSupabaseConfigured && <p className="form-footnote">Connect your Supabase project to receive quote requests.</p>}
          <p className="form-footnote">By submitting, you agree that we may contact you about your project.</p>
        </form>
      </section>

      <footer className="site-footer">
        <div className="footer-top"><Brand /><p>Good energy. Thoughtfully built.</p><a className="footer-back" href="#home">Back to top <ArrowUpRight size={15} /></a></div>
        <div className="footer-bottom"><span>© {new Date().getFullYear()} Sahoo Construction & Solar</span><span>BUILT AROUND YOU. DESIGNED FOR TOMORROW.</span><a href="#contact">Start a project <ArrowRight size={14} /></a></div>
      </footer>
    </main>
  )
}
