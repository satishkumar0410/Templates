import useShaderCanvas from '../hooks/useShaderCanvas'
import { buildCoffeeFrag } from '../shaders/shaderHelper'
import { useMemo } from 'react'

const cells = [
  { frag: [0.14, 0.09, 0.04] as [number,number,number], speed: 0.2, label: 'The Roastery', big: true },
  { frag: [0.22, 0.14, 0.07] as [number,number,number], speed: 0.35, label: 'Brew Bar' },
  { frag: [0.10, 0.07, 0.03] as [number,number,number], speed: 0.15, label: 'The Garden' },
  { frag: [0.28, 0.18, 0.09] as [number,number,number], speed: 0.28, label: 'Private Dining' },
  { frag: [0.65, 0.45, 0.18] as [number,number,number], speed: 0.22, label: 'Morning Light' },
]

function Cell({ frag, speed, label, big }: { frag: [number,number,number]; speed: number; label: string; big?: boolean }) {
  const fragSrc = useMemo(() => buildCoffeeFrag(frag, speed), [frag, speed])
  const ref = useShaderCanvas(fragSrc, speed)
  return (
    <div style={{
      position: 'relative', overflow: 'hidden',
      background: 'rgba(198,139,58,0.2)',
      gridRow: big ? '1 / 3' : undefined,
    }}
      onMouseEnter={e => { const c = e.currentTarget.querySelector('canvas') as HTMLElement; if (c) c.style.transform = 'scale(1.05)' }}
      onMouseLeave={e => { const c = e.currentTarget.querySelector('canvas') as HTMLElement; if (c) c.style.transform = 'scale(1)' }}
    >
      <canvas ref={ref} style={{ width: '100%', height: '100%', display: 'block', transition: 'transform 0.8s cubic-bezier(0.25,0.46,0.45,0.94)' }} />
      <div style={{
        position: 'absolute', bottom: 20, left: 20,
        fontFamily: "'Cormorant Garamond', serif",
        fontSize: 18, fontStyle: 'italic', color: 'var(--cream)',
        textShadow: '0 2px 20px rgba(0,0,0,0.5)',
      }}>{label}</div>
    </div>
  )
}

export default function Experience() {
  return (
    <section id="experience" style={{ background: 'var(--espresso)', padding: '140px 60px', overflow: 'hidden' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 80 }}>
        <div>
          <p className="reveal" style={{ fontSize: 9, letterSpacing: '0.4em', textTransform: 'uppercase', color: 'var(--caramel)', marginBottom: 20 }}>The Space</p>
          <h2 className="reveal reveal-delay-1" style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(48px,5vw,80px)', fontWeight: 300, lineHeight: 1, maxWidth: 500,
          }}>A space to<br /><em style={{ fontStyle: 'italic', color: 'var(--gold)' }}>breathe</em> & linger</h2>
        </div>
        <p className="reveal" style={{ maxWidth: 320, fontSize: 14, color: 'rgba(245,239,224,0.6)', lineHeight: 1.7, fontWeight: 300 }}>
          A warm, unhurried refuge from the city. Natural stone, reclaimed wood, and the constant low hum of a quality grinder.
        </p>
      </div>
      <div className="reveal" style={{
        display: 'grid',
        gridTemplateColumns: '2fr 1fr 1fr',
        gridTemplateRows: '300px 300px',
        gap: 4,
      }}>
        {cells.map(c => <Cell key={c.label} {...c} />)}
      </div>
    </section>
  )
}