import useShaderCanvas from '../hooks/useShaderCanvas'
import useScrollReveal from '../hooks/useScrollReveal.ts'
import useCounter from '../hooks/useCounter'
import { buildCoffeeFrag } from '../shaders/shaderHelper'
import { useMemo } from 'react'

const stats = [
  { count: 12, label: 'Origin Partners' },
  { count: 47, label: 'Coffee Varieties' },
  { count: 6,  label: 'Years Roasting' },
]

function StatItem({ count, label }: { count: number; label: string }) {
  const ref = useCounter(count)
  return (
    <div>
      <div ref={ref} style={{
        fontFamily: "'Cormorant Garamond', serif",
        fontSize: 52, fontWeight: 300, color: 'var(--gold)', lineHeight: 1,
      }}>0</div>
      <div style={{ fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(245,239,224,0.4)', marginTop: 6 }}>
        {label}
      </div>
    </div>
  )
}

export default function Story() {
  useScrollReveal()
  const frag1 = useMemo(() => buildCoffeeFrag([0.18, 0.10, 0.04], 0.25), [])
  const frag2 = useMemo(() => buildCoffeeFrag([0.78, 0.55, 0.23], 0.4), [])
  const ref1 = useShaderCanvas(frag1)
  const ref2 = useShaderCanvas(frag2)

  return (
    <section id="story" style={{
      padding: '140px 60px', background: 'var(--dark)',
      display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 100, alignItems: 'center',
    }}>
      {/* Visual */}
      <div className="reveal-left" style={{ position: 'relative', height: 600 }}>
        <div style={{ width: '75%', height: 480, background: 'var(--espresso)', position: 'absolute', top: 0, right: 0, overflow: 'hidden' }}>
          <canvas ref={ref1} style={{ width: '100%', height: '100%' }} />
        </div>
        <div style={{ width: '50%', height: 220, background: 'var(--caramel)', position: 'absolute', bottom: 0, left: 0, overflow: 'hidden' }}>
          <canvas ref={ref2} style={{ width: '100%', height: '100%' }} />
        </div>
        <div style={{
          position: 'absolute', bottom: 40, right: -20,
          fontFamily: "'Cormorant Garamond', serif", fontSize: 120,
          fontWeight: 300, color: 'rgba(198,139,58,0.15)', lineHeight: 1,
          zIndex: -1, pointerEvents: 'none',
        }}>2019</div>
      </div>

      {/* Text */}
      <div>
        <p className="reveal" style={{ fontSize: 9, letterSpacing: '0.4em', textTransform: 'uppercase', color: 'var(--caramel)', marginBottom: 20 }}>Our Story</p>
        <h2 className="reveal reveal-delay-1" style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 'clamp(42px,4vw,64px)', fontWeight: 300,
          lineHeight: 1.1, marginBottom: 32,
        }}>
          Crafted with <em style={{ fontStyle: 'italic', color: 'var(--gold)' }}>passion</em>, served with soul
        </h2>
        <p className="reveal reveal-delay-2" style={{ color: 'rgba(245,239,224,0.65)', lineHeight: 1.8, fontSize: 15, marginBottom: 20, fontWeight: 300 }}>
          Born from a deep reverence for the coffee bean, Brûlée began as a single roaster's dream in a narrow side-street kitchen. Today, every cup carries the same obsessive care — the same ritual, the same devotion.
        </p>
        <p className="reveal reveal-delay-3" style={{ color: 'rgba(245,239,224,0.65)', lineHeight: 1.8, fontSize: 15, fontWeight: 300 }}>
          We partner directly with farmers across Ethiopia, Colombia, and Guatemala, ensuring that each harvest story travels with every sip.
        </p>

        <div className="reveal reveal-delay-4" style={{
          display: 'flex', gap: 48, marginTop: 48,
          paddingTop: 40, borderTop: '1px solid rgba(245,239,224,0.1)',
        }}>
          {stats.map(s => <StatItem key={s.label} {...s} />)}
        </div>
      </div>
    </section>
  )
}