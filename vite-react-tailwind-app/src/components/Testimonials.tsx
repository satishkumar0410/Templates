import { useState, useEffect } from 'react'

const reviews = [
  { stars: 5, text: '"The kind of coffee that makes you put your phone down. The Ethiopian pour over was the best I\'ve had outside of Addis Ababa. Proper magic."', author: 'Amelia C., London' },
  { stars: 5, text: '"The atmosphere alone is worth the visit. Brûlée is the rare café where time seems to slow down. I stay for hours and never feel rushed."', author: 'James W., Manchester' },
  { stars: 5, text: '"Impeccable. The baristas genuinely know their craft. The cortado was a revelation, and the almond croissant — I\'ve ordered it every single visit."', author: 'Priya N., Edinburgh' },
]

export default function Testimonials() {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => setCurrent(c => (c + 1) % reviews.length), 5000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section id="testimonials" style={{ background: 'var(--dark)', padding: '140px 60px', textAlign: 'center' }}>
      <p className="reveal" style={{ fontSize: 9, letterSpacing: '0.4em', textTransform: 'uppercase', color: 'var(--caramel)', marginBottom: 20 }}>Reviews</p>
      <h2 className="reveal" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(42px,4vw,64px)', fontWeight: 300, marginBottom: 80, lineHeight: 1.1 }}>
        What our guests <em style={{ fontStyle: 'italic', color: 'var(--gold)' }}>feel</em>
      </h2>

      <div style={{ overflow: 'hidden' }}>
        <div style={{
          display: 'flex', gap: 32,
          transform: `translateX(calc(-${current} * (33.333% + 10.666px)))`,
          transition: 'transform 0.6s cubic-bezier(0.25,0.46,0.45,0.94)',
        }}>
          {reviews.map((r, i) => (
            <div key={i} style={{
              minWidth: 'calc(33.333% - 22px)',
              background: 'rgba(245,239,224,0.04)',
              border: '1px solid rgba(245,239,224,0.08)',
              padding: '48px 40px', textAlign: 'left', flexShrink: 0,
            }}>
              <div style={{ color: 'var(--caramel)', fontSize: 14, letterSpacing: 4, marginBottom: 24 }}>{'★'.repeat(r.stars)}</div>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 20, fontStyle: 'italic', fontWeight: 300, lineHeight: 1.6, color: 'var(--cream)', marginBottom: 32 }}>{r.text}</p>
              <div style={{ fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(245,239,224,0.4)' }}>— {r.author}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ display: 'flex', gap: 12, justifyContent: 'center', marginTop: 48 }}>
        {reviews.map((_, i) => (
          <button key={i} onClick={() => setCurrent(i)} style={{
            width: 6, height: 6, borderRadius: '50%', border: 'none', cursor: 'pointer',
            background: current === i ? 'var(--caramel)' : 'rgba(245,239,224,0.2)',
            transform: current === i ? 'scale(1.3)' : 'scale(1)',
            transition: 'all 0.3s',
          }} />
        ))}
      </div>
    </section>
  )
}