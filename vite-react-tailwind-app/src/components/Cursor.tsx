import { useEffect, useRef } from 'react'

export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const pos = useRef({ mx: 0, my: 0, rx: 0, ry: 0 })

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      pos.current.mx = e.clientX
      pos.current.my = e.clientY
      if (dotRef.current) {
        dotRef.current.style.left = e.clientX + 'px'
        dotRef.current.style.top = e.clientY + 'px'
      }
    }
    document.addEventListener('mousemove', onMove)

    let animId: number
    const animRing = () => {
      const p = pos.current
      p.rx += (p.mx - p.rx) * 0.12
      p.ry += (p.my - p.ry) * 0.12
      if (ringRef.current) {
        ringRef.current.style.left = p.rx + 'px'
        ringRef.current.style.top = p.ry + 'px'
      }
      animId = requestAnimationFrame(animRing)
    }
    animRing()

    const grow = () => {
      if (dotRef.current) { dotRef.current.style.width = '20px'; dotRef.current.style.height = '20px' }
      if (ringRef.current) { ringRef.current.style.width = '60px'; ringRef.current.style.height = '60px' }
    }
    const shrink = () => {
      if (dotRef.current) { dotRef.current.style.width = '10px'; dotRef.current.style.height = '10px' }
      if (ringRef.current) { ringRef.current.style.width = '40px'; ringRef.current.style.height = '40px' }
    }
    document.querySelectorAll('a, button').forEach(el => {
      el.addEventListener('mouseenter', grow)
      el.addEventListener('mouseleave', shrink)
    })

    return () => {
      document.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(animId)
    }
  }, [])

  return (
    <>
      <div ref={dotRef} style={{
        position: 'fixed', width: 10, height: 10,
        background: 'var(--caramel)', borderRadius: '50%',
        pointerEvents: 'none', zIndex: 9999,
        transform: 'translate(-50%,-50%)',
        transition: 'width 0.3s, height 0.3s',
        mixBlendMode: 'difference',
      }} />
      <div ref={ringRef} style={{
        position: 'fixed', width: 40, height: 40,
        border: '1px solid rgba(198,139,58,0.5)', borderRadius: '50%',
        pointerEvents: 'none', zIndex: 9998,
        transform: 'translate(-50%,-50%)',
        transition: 'width 0.3s, height 0.3s',
      }} />
    </>
  )
}