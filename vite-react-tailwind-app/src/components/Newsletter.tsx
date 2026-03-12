import { useState } from 'react'

export default function Newsletter() {
  const [email, setEmail] = useState('')

  return (
    <div style={{
      background: 'var(--dark)', padding: '80px 60px',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      borderTop: '1px solid rgba(245,239,224,0.08)',
    }}>
      <div>
        <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 32, fontWeight: 300, fontStyle: 'italic', marginBottom: 8 }}>Stay in the loop</h3>
        <p style={{ fontSize: 13, color: 'rgba(245,239,224,0.45)' }}>New roasts, seasonal menus, and exclusive events.</p>
      </div>
      <div style={{ display: 'flex' }}>
        <input type="email" placeholder="Your email address" value={email} onChange={e => setEmail(e.target.value)} style={{
          background: 'rgba(245,239,224,0.06)', border: '1px solid rgba(245,239,224,0.15)',
          borderRight: 'none', padding: '14px 24px', fontSize: 14,
          color: 'var(--cream)', fontFamily: "'DM Sans', sans-serif",
          outline: 'none', width: 300,
        }} />
        <button style={{
          background: 'var(--caramel)', color: 'var(--dark)',
          padding: '14px 28px', fontSize: 11, letterSpacing: '0.15em',
          textTransform: 'uppercase', border: 'none', cursor: 'pointer',
          fontFamily: "'DM Sans', sans-serif", fontWeight: 500, transition: 'background 0.3s',
        }}
          onMouseEnter={e => (e.currentTarget.style.background = 'var(--gold)')}
          onMouseLeave={e => (e.currentTarget.style.background = 'var(--caramel)')}
        >Subscribe</button>
      </div>
    </div>
  )
}