import { useEffect, useRef } from 'react'

const links = [
  { label: 'Our Story', href: '#story' },
  { label: 'Menu', href: '#menu' },
  { label: 'Experience', href: '#experience' },
  { label: 'Visit Us', href: '#location' },
]

export default function Nav() {
  const navRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const onScroll = () => {
      const nav = navRef.current
      if (!nav) return
      if (window.scrollY > 80) {
        nav.style.background = 'rgba(26,20,9,0.95)'
        nav.style.backdropFilter = 'blur(20px)'
        nav.style.padding = '18px 60px'
      } else {
        nav.style.background = ''
        nav.style.backdropFilter = ''
        nav.style.padding = '28px 60px'
      }
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav ref={navRef} style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      padding: '28px 60px', display: 'flex', justifyContent: 'space-between',
      alignItems: 'center', transition: 'all 0.4s',
    }}>
      {/* gradient backdrop */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to bottom, rgba(26,20,9,0.8) 0%, transparent 100%)',
        pointerEvents: 'none',
      }} />

      <a href="#" onClick={e => scrollTo(e, '#hero')} style={{
        fontFamily: "'Cormorant Garamond', serif",
        fontSize: 28, letterSpacing: '0.15em',
        color: 'var(--cream)', textDecoration: 'none',
        fontWeight: 300, position: 'relative',
      }}>
        BRÛLÉE<span style={{ color: 'var(--caramel)' }}>.</span>
      </a>

      <ul style={{ display: 'flex', gap: 48, listStyle: 'none', position: 'relative' }}>
        {links.map(l => (
          <li key={l.href}>
            <a href={l.href} onClick={e => scrollTo(e, l.href)} style={{
              color: 'var(--cream)', textDecoration: 'none',
              fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase',
              opacity: 0.8, transition: 'opacity 0.3s, color 0.3s',
            }}
              onMouseEnter={e => { (e.target as HTMLElement).style.opacity = '1'; (e.target as HTMLElement).style.color = 'var(--gold)' }}
              onMouseLeave={e => { (e.target as HTMLElement).style.opacity = '0.8'; (e.target as HTMLElement).style.color = 'var(--cream)' }}
            >{l.label}</a>
          </li>
        ))}
        <li>
          <a href="#reserve" onClick={e => scrollTo(e, '#reserve')} style={{
            background: 'var(--caramel)', color: 'var(--dark)',
            padding: '10px 24px', fontSize: 11, letterSpacing: '0.2em',
            textTransform: 'uppercase', textDecoration: 'none',
            fontWeight: 500, transition: 'background 0.3s',
          }}
            onMouseEnter={e => (e.target as HTMLElement).style.background = 'var(--gold)'}
            onMouseLeave={e => (e.target as HTMLElement).style.background = 'var(--caramel)'}
          >Reserve</a>
        </li>
      </ul>
    </nav>
  )
}