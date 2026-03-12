import useShaderCanvas from '../hooks/useShaderCanvas'
import { MAP_FRAG } from '../shaders/shaderHelper'

const hours = [
  { day: 'Monday – Friday', time: '7:00 – 19:00' },
  { day: 'Saturday', time: '8:00 – 20:00' },
  { day: 'Sunday', time: '9:00 – 18:00' },
  { day: 'Bank Holidays', time: '10:00 – 17:00' },
]

export default function Location() {
  const mapRef = useShaderCanvas(MAP_FRAG, 1)

  return (
    <section id="location" style={{
      background: 'var(--cream)', color: 'var(--dark)', padding: '140px 60px',
      display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 100, alignItems: 'center',
    }}>
      <div>
        <p className="reveal" style={{ fontSize: 9, letterSpacing: '0.4em', textTransform: 'uppercase', color: 'var(--caramel)', marginBottom: 20 }}>Find Us</p>
        <h2 className="reveal reveal-delay-1" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(42px,4vw,64px)', fontWeight: 300, lineHeight: 1.1, marginBottom: 40 }}>
          Come visit,<br />we'll have the<br /><em style={{ fontStyle: 'italic', color: 'var(--espresso)' }}>kettle on</em>
        </h2>

        <div className="reveal reveal-delay-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, marginBottom: 48 }}>
          {[
            { title: 'Address', lines: ['14 Coalbrook Lane', 'Shoreditch, London', 'E1 6RF'] },
            { title: 'Contact', lines: ['hello@brulee.co.uk', '+44 20 7123 4567'] },
          ].map(b => (
            <div key={b.title}>
              <h4 style={{ fontSize: 9, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--caramel)', marginBottom: 16 }}>{b.title}</h4>
              {b.lines.map(l => <p key={l} style={{ fontSize: 15, color: 'var(--espresso)', lineHeight: 1.8, fontWeight: 300 }}>{l}</p>)}
            </div>
          ))}
        </div>

        <div className="reveal reveal-delay-3">
          <h4 style={{ fontSize: 9, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--caramel)', marginBottom: 16 }}>Opening Hours</h4>
          {hours.map(h => (
            <div key={h.day} style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid rgba(44,26,14,0.1)', fontSize: 14 }}>
              <span>{h.day}</span>
              <span style={{ color: 'rgba(44,26,14,0.55)', fontWeight: 300 }}>{h.time}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="reveal-right" style={{ height: 500, background: 'var(--espresso)', position: 'relative', overflow: 'hidden' }}>
        <canvas ref={mapRef} style={{ width: '100%', height: '100%' }} />
        <div style={{
          position: 'absolute', bottom: 32, left: 32,
          background: 'white', padding: '20px 28px',
          boxShadow: '0 20px 60px rgba(0,0,0,0.15)',
        }}>
          <h5 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 20, color: 'var(--espresso)', marginBottom: 4 }}>Brûlée Coffee</h5>
          <p style={{ fontSize: 12, color: 'rgba(44,26,14,0.55)' }}>14 Coalbrook Lane, Shoreditch</p>
        </div>
      </div>
    </section>
  )
}