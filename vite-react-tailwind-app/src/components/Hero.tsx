import { useEffect, useRef } from 'react'
import useShaderCanvas from '../hooks/useShaderCanvas'
import { HERO_FRAG } from '../shaders/shaderHelper'

export default function Hero() {
  const canvasRef = useShaderCanvas(HERO_FRAG, 1)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onScroll = () => {
      if (contentRef.current)
        contentRef.current.style.transform = `translateY(${window.scrollY * 0.3}px)`
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <section id="hero" style={{
      position: 'relative', height: '100vh',
      display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden',
    }}>
      <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', zIndex: 0 }} />

      <div ref={contentRef} style={{
        position: 'relative', zIndex: 2,
        textAlign: 'center', maxWidth: 900, padding: '0 40px',
      }}>
        <p style={{
          fontSize: 10, letterSpacing: '0.4em', textTransform: 'uppercase',
          color: 'var(--caramel)', marginBottom: 24,
          opacity: 0, transform: 'translateY(20px)',
          animation: 'fadeUp 1s 0.3s forwards',
        }}>Est. 2019 · Artisan Coffee House</p>

        <h1 style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 'clamp(72px, 10vw, 140px)',
          fontWeight: 300, lineHeight: 0.9,
          color: 'var(--cream)', letterSpacing: '-0.02em',
          opacity: 0, transform: 'translateY(40px)',
          animation: 'fadeUp 1.2s 0.5s forwards',
        }}>
          Where Coffee<br />Becomes{' '}
          <em style={{ fontStyle: 'italic', color: 'var(--gold)' }}>Art</em>
        </h1>

        <p style={{
          fontSize: 15, color: 'rgba(245,239,224,0.6)',
          marginTop: 32, fontWeight: 300, letterSpacing: '0.05em',
          opacity: 0, transform: 'translateY(20px)',
          animation: 'fadeUp 1s 0.9s forwards',
        }}>Meticulously sourced. Expertly crafted. Savoured slowly.</p>

        <div style={{
          marginTop: 56, display: 'flex', gap: 20, justifyContent: 'center',
          opacity: 0, transform: 'translateY(20px)',
          animation: 'fadeUp 1s 1.1s forwards',
        }}>
          <a href="#menu" className="btn-primary"
            onClick={e => { e.preventDefault(); document.querySelector('#menu')?.scrollIntoView({ behavior: 'smooth' }) }}>
            Explore Menu
          </a>
          <a href="#reserve" className="btn-ghost"
            onClick={e => { e.preventDefault(); document.querySelector('#reserve')?.scrollIntoView({ behavior: 'smooth' }) }}>
            Reserve a Table
          </a>
        </div>
      </div>

      <div style={{
        position: 'absolute', bottom: 40, left: '50%',
        transform: 'translateX(-50%)', display: 'flex',
        flexDirection: 'column', alignItems: 'center', gap: 8,
        opacity: 0, animation: 'fadeUp 1s 1.5s forwards', zIndex: 2,
      }}>
        <span style={{ fontSize: 9, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(245,239,224,0.4)' }}>Scroll</span>
        <div style={{
          width: 1, height: 60,
          background: 'linear-gradient(to bottom, var(--caramel), transparent)',
          animation: 'scrollPulse 2s infinite',
        }} />
      </div>
    </section>
  )
}