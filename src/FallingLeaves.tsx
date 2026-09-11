import { useId, useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap'

const LEAF_PATH =
  'm-90 2030 45-863a95 95 0 0 0-111-98l-859 151 116-320a65 65 0 0 0-20-73l-941-762 212-99a65 65 0 0 0 34-79l-186-572 542 115a65 65 0 0 0 73-38l105-247 423 454a65 65 0 0 0 111-57l-204-1052 327 189a65 65 0 0 0 91-27l332-652 332 652a65 65 0 0 0 91 27l327-189-204 1052a65 65 0 0 0 111 57l423-454 105 247a65 65 0 0 0 73 38l542-115-186 572a65 65 0 0 0 34 79l212 99-941 762a65 65 0 0 0-20 73l116 320-859-151a95 95 0 0 0-111 98l45 863z'

const VEINS_PATH =
  'M0 -250 L0 -1100 M0 -250 L-800 -550 M0 -250 L800 -550 M0 -250 L-820 430 M0 -250 L820 430'

const PALETTE: [string, string, string][] = [
  ['#c0392b', '#e67e22', '#8e2f1b'],
  ['#e67e22', '#f5b041', '#a04000'],
  ['#d35400', '#e74c3c', '#7f2c0a'],
  ['#b03a2e', '#e67e22', '#6f1d1b'],
  ['#a04000', '#d68910', '#5c2400'],
  ['#e74c3c', '#f39c12', '#922b21'],
]

type MapleLeafProps = {
  color: string
  accent: string
  vein: string
  size: number
}

function MapleLeaf({ color, accent, vein, size }: MapleLeafProps) {
  const gradientId = useId()

  return (
    <svg
      className="falling-leaf"
      viewBox="-2015 -2000 4030 4030"
      style={{ width: size }}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <radialGradient
          id={gradientId}
          cx="50%"
          cy="35%"
          r="80%"
        >
          <stop offset="0%" stopColor={color} />
          <stop offset="100%" stopColor={accent} />
        </radialGradient>
      </defs>
      <path fill={`url(#${gradientId})`} d={LEAF_PATH} />
      <path
        d={VEINS_PATH}
        fill="none"
        stroke={vein}
        strokeWidth="110"
        strokeLinecap="round"
        opacity="0.3"
      />
    </svg>
  )
}

type FallingLeavesProps = {
  count?: number
}

function FallingLeaves({ count = 8 }: FallingLeavesProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  const [leaves] = useState(() =>
    Array.from({ length: count }).map((_, i) => {
      const [color, accent, vein] = PALETTE[i % PALETTE.length]
      return {
        color,
        accent,
        vein,
        size: 30 + Math.random() * 34,
      }
    }),
  )

  useLayoutEffect(() => {
    const container = containerRef.current
    if (!container) return

    const ctx = gsap.context(() => {
      Array.from(container.children).forEach((node) => {
        const leaf = node as HTMLElement
        leaf.style.left = `${Math.random() * 100}%`

        const fallDuration = 14 + Math.random() * 10

        gsap.set(leaf, { rotation: Math.random() * 360 })

        gsap
          .timeline({ repeat: -1, delay: Math.random() * fallDuration })
          .fromTo(
            leaf,
            { y: -120, opacity: 0, scale: 0.7 },
            {
              y: window.innerHeight + 120,
              opacity: 1,
              scale: 1,
              duration: fallDuration,
              ease: 'none',
            },
          )
          .to(leaf, { opacity: 0, duration: 0.9, ease: 'none' }, '>-0.9')

        gsap.to(leaf, {
          x: () => (Math.random() - 0.5) * 280,
          duration: () => 3 + Math.random() * 3,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1,
        })

        gsap.to(leaf, {
          rotation: '+=360',
          duration: fallDuration,
          ease: 'none',
          repeat: -1,
        })
      })
    }, container)

    return () => ctx.revert()
  }, [])

  return (
    <div className="falling-leaves" ref={containerRef}>
      {leaves.map((leaf, i) => (
        <MapleLeaf key={i} {...leaf} />
      ))}
    </div>
  )
}

export default FallingLeaves