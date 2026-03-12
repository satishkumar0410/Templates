import { useState } from 'react'

type Tab = 'coffee' | 'food' | 'seasonal' | 'drinks'

interface MenuItem {
  tag: string
  name: string
  desc: string
  price: string
}

const menuData: Record<Tab, MenuItem[]> = {
  coffee: [
    { tag: 'Signature', name: 'Ethiopian Pour Over', desc: 'Bright & floral. Notes of jasmine, bergamot, and stone fruit with a silky clean finish.', price: '£5.50' },
    { tag: 'Espresso', name: 'Single Origin Cortado', desc: 'A precise 1:1 blend of Colombian espresso and lightly textured whole milk.', price: '£4.00' },
    { tag: 'Cold Brew', name: 'Nitro Cold Brew', desc: '18-hour steeped Guatemalan dark roast, nitrogen-infused for a smooth, cascading pour.', price: '£6.00' },
    { tag: 'Espresso', name: 'Caramel Macchiato', desc: 'Hand-pulled double shot, steamed oat milk, house-made caramel, vanilla extract.', price: '£5.00' },
    { tag: 'Filter', name: 'Chemex Brew', desc: 'Clean, bright extraction using a hand-folded bonded filter. Serves two.', price: '£8.00' },
    { tag: 'Specialty', name: 'Iced Oat Latte', desc: 'Double shot pulled over ice, topped with cold-frothed Oatly barista edition.', price: '£5.50' },
  ],
  food: [
    { tag: 'Pastry', name: 'Almond Croissant', desc: 'Twice-baked with house frangipane, topped with flaked almonds and powdered sugar.', price: '£4.50' },
    { tag: 'Savoury', name: 'Eggs on Sourdough', desc: 'Soft-scrambled eggs, whipped ricotta, chilli flakes, and micro herbs on house sourdough.', price: '£12.00' },
    { tag: 'Cake', name: 'Cardamom Loaf', desc: 'Dense, aromatic, lightly sweet. Baked fresh daily with green cardamom and orange zest.', price: '£4.00' },
  ],
  seasonal: [
    { tag: 'Spring Special', name: 'Lavender Latte', desc: 'House-made lavender syrup, single origin espresso, steamed oat milk.', price: '£5.50' },
    { tag: 'Limited', name: 'Rhubarb Cold Brew', desc: 'Seasonal rhubarb compote, cold brew concentrate, soda water, fresh mint.', price: '£6.50' },
    { tag: 'Special', name: 'Cherry Blossom Chai', desc: 'House-blended masala chai with sakura syrup and steamed almond milk.', price: '£5.00' },
  ],
  drinks: [
    { tag: 'Refresher', name: 'House Lemonade', desc: 'Freshly squeezed Sicilian lemons, light sugar, sparkling water, fresh thyme.', price: '£4.00' },
    { tag: 'Cold Brew', name: 'Iced Matcha', desc: 'Ceremonial grade matcha from Uji, Japan. Shaken with oat milk and served over ice.', price: '£5.50' },
    { tag: 'Sparkling', name: 'Yuzu Tonic', desc: 'House yuzu cordial, premium tonic water, fresh cucumber ribbon.', price: '£4.50' },
  ],
}

const tabs: { id: Tab; label: string }[] = [
  { id: 'coffee', label: 'Coffee' },
  { id: 'food', label: 'Food' },
  { id: 'seasonal', label: 'Seasonal' },
  { id: 'drinks', label: 'Cold Drinks' },
]

export default function Menu() {
  const [active, setActive] = useState<Tab>('coffee')

  return (
    <section id="menu" style={{ background: 'var(--light-cream)', color: 'var(--dark)', padding: '140px 60px' }}>
      <p className="reveal" style={{ fontSize: 9, letterSpacing: '0.4em', textTransform: 'uppercase', color: 'var(--caramel)', marginBottom: 20 }}>Menu</p>
      <h2 className="reveal" style={{
        fontFamily: "'Cormorant Garamond', serif",
        fontSize: 'clamp(48px,5vw,80px)', fontWeight: 300,
        lineHeight: 1, marginBottom: 80, maxWidth: 600,
      }}>
        A menu born from <em style={{ fontStyle: 'italic', color: 'var(--espresso)' }}>curiosity</em>
      </h2>

      {/* Tabs */}
      <div style={{ display: 'flex', borderBottom: '1px solid rgba(44,26,14,0.15)', marginBottom: 64 }}>
        {tabs.map(t => (
          <button key={t.id} onClick={() => setActive(t.id)} style={{
            padding: '14px 36px', fontSize: 11, letterSpacing: '0.2em',
            textTransform: 'uppercase', background: 'none', border: 'none',
            borderBottom: active === t.id ? '2px solid var(--caramel)' : '2px solid transparent',
            marginBottom: -1, cursor: 'pointer',
            color: active === t.id ? 'var(--espresso)' : 'rgba(44,26,14,0.4)',
            fontFamily: "'DM Sans', sans-serif", transition: 'all 0.3s',
          }}>{t.label}</button>
        ))}
      </div>

      {/* Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 2 }}>
        {menuData[active].map((item, i) => (
          <MenuCard key={item.name} item={item} delay={i % 3} />
        ))}
      </div>
    </section>
  )
}

function MenuCard({ item, delay }: { item: MenuItem; delay: number }) {
  return (
    <div className={`reveal reveal-delay-${delay + 1}`}
      style={{ padding: 40, background: 'white', position: 'relative', overflow: 'hidden', transition: 'background 0.3s' }}
      onMouseEnter={e => (e.currentTarget.style.background = 'var(--light-cream)')}
      onMouseLeave={e => (e.currentTarget.style.background = 'white')}
    >
      <div style={{ fontSize: 9, letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--caramel)', marginBottom: 16 }}>{item.tag}</div>
      <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 26, color: 'var(--espresso)', marginBottom: 10, lineHeight: 1.2 }}>{item.name}</div>
      <div style={{ fontSize: 13, color: 'rgba(44,26,14,0.55)', lineHeight: 1.7, fontWeight: 300 }}>{item.desc}</div>
      <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 22, color: 'var(--espresso)', marginTop: 20, fontWeight: 600 }}>{item.price}</div>
    </div>
  )
}