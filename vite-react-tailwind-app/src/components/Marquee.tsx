const items = [
    'Single Origin Espresso', 'Cold Brew & Nitro',
    'French Pastries', 'Seasonal Specials',
    'Private Tastings', 'Specialty Roasts',
  ]
  
  export default function Marquee() {
    const doubled = [...items, ...items]
  
    return (
      <div style={{ background: 'var(--caramel)', padding: '16px 0', overflow: 'hidden', whiteSpace: 'nowrap' }}>
        <div style={{ display: 'inline-flex', animation: 'marquee 20s linear infinite' }}>
          {doubled.map((item, i) => (
            <span key={i}>
              <span style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 18, fontStyle: 'italic',
                color: 'var(--dark)', padding: '0 48px', opacity: 0.9,
              }}>{item}</span>
              <span style={{ color: 'var(--espresso)', fontSize: 8, verticalAlign: 'middle' }}>◆</span>
            </span>
          ))}
        </div>
      </div>
    )
  }