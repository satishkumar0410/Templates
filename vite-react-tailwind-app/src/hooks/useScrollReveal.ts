import { useEffect } from 'react'

export default function useScrollReveal() {
  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) e.target.classList.add('visible')
        })
      },
      { threshold: 0.12 }
    )
    document
      .querySelectorAll('.reveal, .reveal-left, .reveal-right')
      .forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])
}