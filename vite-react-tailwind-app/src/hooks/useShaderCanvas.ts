import { useEffect, useRef } from 'react'
import { createShader, type ShaderContext } from '../shaders/shaderHelper'

// One global registry — all canvases share a single RAF loop
const registry = new Map
  <HTMLCanvasElement, { ctx: ShaderContext; speed: number; t: number; visible: boolean }>()

let globalAnimId = 0

function globalLoop() {
  for (const [canvas, entry] of registry) {
    if (!entry.visible) continue
    entry.t += 0.016 * entry.speed
    entry.ctx.gl.uniform2f(entry.ctx.locs.u_res, canvas.width, canvas.height)
    entry.ctx.gl.uniform1f(entry.ctx.locs.u_time, entry.t)
    entry.ctx.gl.drawArrays(entry.ctx.gl.TRIANGLE_STRIP, 0, 4)
  }
  globalAnimId = requestAnimationFrame(globalLoop)
}

export default function useShaderCanvas(fragSrc: string, speed = 1) {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return

    const ctx = createShader(canvas, fragSrc)
    if (!ctx) return

    const entry = { ctx, speed, t: Math.random() * 100, visible: false }
    registry.set(canvas, entry)

    // Only render when canvas is actually on screen
    const observer = new IntersectionObserver(
      ([e]) => { entry.visible = e.isIntersecting },
      { threshold: 0.1 }
    )
    observer.observe(canvas)

    // Start the global loop only once
    if (registry.size === 1 && globalAnimId === 0) globalLoop()

    return () => {
      registry.delete(canvas)
      observer.disconnect()
      if (registry.size === 0 && globalAnimId !== 0) {
        cancelAnimationFrame(globalAnimId)
        globalAnimId = 0
      }
    }
  }, [fragSrc, speed])

  return ref
}