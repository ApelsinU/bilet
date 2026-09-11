import gsap from 'gsap'

const COLORS = ['#e06666', '#ff8a80', '#f48fb1', '#ec407a', '#ff5252', '#ff5c8a']

const HEART_PATH =
  'M12 21C12 21 4 14.5 4 9.5C4 6 6.5 4 9 4C10.5 4 11.5 4.8 12 5.7C12.5 4.8 13.5 4 15 4C17.5 4 20 6 20 9.5C20 14.5 12 21 12 21Z'

export function launchHearts(from: HTMLElement, count = 30): Promise<void> {
  const rect = from.getBoundingClientRect()
  const originX = rect.left + rect.width / 2
  const originY = rect.top + rect.height / 2

  return new Promise((resolve) => {
    let remaining = count
    const onDone = () => {
      remaining -= 1
      if (remaining <= 0) resolve()
    }

    for (let i = 0; i < count; i++) {
      const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
      svg.setAttribute('viewBox', '0 0 24 24')
      svg.style.cssText =
        'position:fixed; left:0; top:0; z-index:9999; pointer-events:none; overflow:visible;'
      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path')
      path.setAttribute('d', HEART_PATH)
      path.setAttribute('fill', COLORS[i % COLORS.length])
      svg.appendChild(path)

      const size = 16 + Math.random() * 22
      svg.setAttribute('width', String(size))
      svg.setAttribute('height', String(size))

      document.body.appendChild(svg)

      const angle = Math.random() * Math.PI * 2
      const distance = 120 + Math.random() * 240
      const tx = Math.cos(angle) * distance
      const ty = Math.sin(angle) * distance

      const scale = 0.6 + Math.random() * 1.4
      const rotation = Math.random() * 360

      gsap
        .timeline({
          onComplete: () => {
            svg.remove()
            onDone()
          },
        })
        .fromTo(
          svg,
          { x: originX, y: originY, rotation: 0, scale: 0.3, opacity: 1 },
          {
            x: originX + tx,
            y: originY + ty,
            rotation,
            scale,
            duration: 0.8 + Math.random() * 0.6,
            ease: 'power3.out',
          },
        )
        .to(
          svg,
          {
            y: originY + ty + 260,
            opacity: 0,
            rotation: `+=${60 + Math.random() * 120}`,
            scale: scale * 0.5,
            duration: 1 + Math.random() * 0.8,
            ease: 'power1.in',
          },
          '<=0.1',
        )
    }
  })
}