import { useEffect, useRef } from 'react'

export default function useCounter(target: number) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        let current = 0
        const step = target / 60
        const timer = setInterval(() => {
          current += step
          if (current >= target) { current = target; clearInterval(timer) }
          el.textContent = String(Math.floor(current))
        }, 16)
        obs.disconnect()
      },
      { threshold: 0.5 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [target])

  return ref
}