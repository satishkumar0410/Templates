import { useState } from 'react'

export default function Reserve() {
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', date: '', time: '8:00 AM', guests: '2 Guests', notes: '' })
  const update = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm(f => ({ ...f, [k]: e.target.value }))

  const inputStyle: React.CSSProperties = {
    background: 'rgba(26,20,9,0.08)', border: '1px solid rgba(26,20,9,0.2)',
    padding: '14px 18px', fontSize: 14, color: 'var(--dark)',
    fontFamily: "'DM Sans', sans-serif", outline: 'none', width: '100%',
  }
  const labelStyle: React.CSSProperties = { fontSize: 9, letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(26,20,9,0.6)', display: 'block', marginBottom: 8 }

  return (
    <section id="reserve" style={{
      background: 'var(--caramel)', padding: '140px 60px',
      display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 100, alignItems: 'center',
    }}>
      <div>
        <p className="reveal" style={{ fontSize: 9, letterSpacing: '0.4em', textTransform: 'uppercase', color: 'rgba(26,20,9,0.5)', marginBottom: 20 }}>Reservations</p>
        <h2 className="reveal reveal-delay-1" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(48px,5vw,80px)', fontWeight: 300, lineHeight: 1, color: 'var(--dark)', marginBottom: 24 }}>
          Book your<br /><em style={{ fontStyle: 'italic' }}>perfect</em><br />morning
        </h2>
        <p className="reveal reveal-delay-2" style={{ fontSize: 15, color: 'rgba(26,20,9,0.65)', lineHeight: 1.7, fontWeight: 300 }}>
          Whether it's a quiet corner table for two, or a private tasting for a group — we'd love to host you.
        </p>
      </div>

      <div className="reveal-right" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          {(['firstName', 'lastName'] as const).map(k => (
            <div key={k}>
              <label style={labelStyle}>{k === 'firstName' ? 'First Name' : 'Last Name'}</label>
              <input style={inputStyle} type="text" placeholder={k === 'firstName' ? 'Jane' : 'Smith'} value={form[k]} onChange={update(k)} />
            </div>
          ))}
        </div>
        <div>
          <label style={labelStyle}>Email</label>
          <input style={inputStyle} type="email" placeholder="jane@example.com" value={form.email} onChange={update('email')} />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <div>
            <label style={labelStyle}>Date</label>
            <input style={inputStyle} type="date" value={form.date} onChange={update('date')} />
          </div>
          <div>
            <label style={labelStyle}>Time</label>
            <select style={inputStyle} value={form.time} onChange={update('time')}>
              {['8:00 AM','9:00 AM','10:00 AM','11:00 AM','12:00 PM','1:00 PM','2:00 PM','3:00 PM'].map(t => <option key={t}>{t}</option>)}
            </select>
          </div>
        </div>
        <div>
          <label style={labelStyle}>Guests</label>
          <select style={inputStyle} value={form.guests} onChange={update('guests')}>
            {['1 Guest','2 Guests','3 Guests','4 Guests','5+ Guests'].map(g => <option key={g}>{g}</option>)}
          </select>
        </div>
        <div>
          <label style={labelStyle}>Special Requests (optional)</label>
          <textarea style={{ ...inputStyle, resize: 'none', height: 100 }} placeholder="Dietary requirements, occasions, accessibility needs…" value={form.notes} onChange={update('notes')} />
        </div>
        <button style={{
          background: 'var(--dark)', color: 'var(--cream)', padding: 18,
          fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase',
          fontFamily: "'DM Sans', sans-serif", border: 'none', cursor: 'pointer',
          transition: 'background 0.3s, transform 0.2s',
        }}
          onMouseEnter={e => (e.currentTarget.style.background = 'var(--espresso)')}
          onMouseLeave={e => (e.currentTarget.style.background = 'var(--dark)')}
        >Confirm Reservation</button>
      </div>
    </section>
  )
}