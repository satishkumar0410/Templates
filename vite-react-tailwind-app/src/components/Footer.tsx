const footerCols = [
    { title: 'Menu', links: ['Coffee', 'Food', 'Seasonal', 'Cold Drinks', 'Retail Beans'] },
    { title: 'Visit', links: ['Our Story', 'Gallery', 'Reserve', 'Private Events', 'Gift Cards'] },
    { title: 'Info', links: ['Contact', 'Careers', 'Press', 'Wholesale', 'Accessibility'] },
  ]
  
  export default function Footer() {
    return (
      <footer style={{ background: 'var(--espresso)', padding: '80px 60px 40px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: 60, paddingBottom: 60, borderBottom: '1px solid rgba(245,239,224,0.1)', marginBottom: 40 }}>
          <div>
            <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 32, fontWeight: 300, color: 'var(--cream)', letterSpacing: '0.1em', display: 'block', marginBottom: 20 }}>
              BRÛLÉE<span style={{ color: 'var(--caramel)' }}>.</span>
            </span>
            <p style={{ fontSize: 13, color: 'rgba(245,239,224,0.45)', lineHeight: 1.7, maxWidth: 260, fontWeight: 300 }}>
              A carefully considered coffee house in the heart of Shoreditch. Every cup, a small act of craft and care.
            </p>
          </div>
          {footerCols.map(col => (
            <div key={col.title}>
              <h5 style={{ fontSize: 9, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--caramel)', marginBottom: 24 }}>{col.title}</h5>
              <ul style={{ listStyle: 'none' }}>
                {col.links.map(l => (
                  <li key={l} style={{ marginBottom: 12 }}>
                    <a href="#" style={{ color: 'rgba(245,239,224,0.5)', textDecoration: 'none', fontSize: 13, transition: 'color 0.3s' }}
                      onMouseEnter={e => (e.currentTarget.style.color = 'var(--cream)')}
                      onMouseLeave={e => (e.currentTarget.style.color = 'rgba(245,239,224,0.5)')}
                    >{l}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 11, color: 'rgba(245,239,224,0.25)' }}>
          <span>© 2025 Brûlée Coffee House. All rights reserved.</span>
          <div style={{ display: 'flex', gap: 24 }}>
            {['Instagram', 'Twitter', 'Facebook'].map(s => (
              <a key={s} href="#" style={{ color: 'rgba(245,239,224,0.4)', textDecoration: 'none', fontSize: 11, letterSpacing: '0.1em', transition: 'color 0.3s' }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--caramel)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(245,239,224,0.4)')}
              >{s}</a>
            ))}
          </div>
        </div>
      </footer>
    )
  }