import gsap from 'gsap'

const COLORS = ['#c99c8c', '#f2c94c', '#ff8a5c', '#5b4238', '#8ec9a3', '#a3c9ec', '#e06666', '#9b59b6']

export function launchConfetti(from: HTMLElement, count = 120): Promise<void> {
  const rect = from.getBoundingClientRect()
  const originX = rect.left + rect.width / 2
  const originY = rect.top + rect.height / 2

  return new Promise((resolve) => {
    let remaining = count
    const onPieceDone = () => {
      remaining -= 1
      if (remaining <= 0) resolve()
    }

    for (let i = 0; i < count; i++) {
      const piece = document.createElement('div')
      piece.className = 'confetti-piece'
      piece.style.background = COLORS[i % COLORS.length]
      const size = 6 + Math.random() * 8
      piece.style.width = `${size}px`
      piece.style.height = `${size * (0.4 + Math.random() * 0.8)}px`

      document.body.appendChild(piece)

      const angle = Math.random() * Math.PI * 2
      const distance = 100 + Math.random() * 180
      const tx = Math.cos(angle) * distance
      const ty = Math.sin(angle) * distance - 140

      const rotation = Math.random() * 1080 - 540
      const duration = 0.6 + Math.random() * 0.5

      gsap
        .timeline({
          onComplete: () => {
            piece.remove()
            onPieceDone()
          },
        })
        .fromTo(
          piece,
          { x: originX, y: originY, rotation: 0, opacity: 1, scale: 1 },
          {
            x: originX + tx,
            y: originY + ty,
            rotation,
            duration,
            ease: 'power2.out',
          },
        )
        .to(
          piece,
          {
            y: originY + ty + 220,
            opacity: 0,
            rotation: '+=360',
            duration: 1.1 + Math.random() * 0.6,
            ease: 'power1.in',
          },
          duration - 0.15,
        )
    }
  })
}