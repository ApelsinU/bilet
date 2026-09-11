import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import block1 from './assets/monkey_think.jpg'
import block2 from './assets/monkey_cook.jpg'
import block3 from './assets/monkeys_drive.jpg'
import block4 from './assets/monkey_forest.jpg'
import block5 from './assets/monkey_with_deer.webp'
import block6 from './assets/monkeys_kiss.jpg'
import block7 from './assets/monkeys_drive.jpg'
import './App.css'

gsap.registerPlugin(ScrollTrigger)

function App() {
  const root = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const heroTl = gsap.timeline()
      heroTl
        .from('.block1 .section-inner', {
          y: 80,
          opacity: 0,
          duration: 1.1,
          ease: 'power3.out',
          delay: 0.2,
        })
        .from(
          '.hero-scroll',
          { opacity: 0, duration: 0.8, y: -10, ease: 'power2.out' },
          '-=0.5',
        )

      gsap.utils
        .toArray<HTMLElement>(['.block2', '.block3', '.block4', '.block5', '.block6'])
        .forEach((section) => {
          gsap.from(section.querySelector('.section-inner'), {
            y: 80,
            opacity: 0,
            duration: 1.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 60%',
            },
          })

          gsap.to(section.querySelector('.section-img'), {
            y: -30,
            scale: 1.15,
            ease: 'none',
            scrollTrigger: {
              trigger: section,
              start: 'top bottom',
              end: 'top top',
              scrub: true,
            },
          })
        })
    }, root)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={root}>
      <section className="section block1">
        <img className="section-img" src={block1} alt="Обезьянка скучает" />
        <div className="section-inner">
          <p className="section-title">
            Обезьянка была дома и немного скучала.
            На улице была ранняя осень, и слегка прохладно,
            но обезьянка любила такую погоду.
          </p>
        </div>
        <div className="hero-scroll" aria-hidden="true">
          <span className="hero-scroll__line" />
        </div>
        </section>

        <section className="section block2">
            <img className="section-img" src={block2} alt="Обезьянка отправляется в путешествие" />
            <div className="section-inner">
                <p className="section-title">
                    Сидеть без дела она не привыкла,
                    поэтому прибиралась в своем жилище
                    и готовила свой вкуснейший фирменный плов.
                </p>
            </div>
        </section>

      <section className="section block3">
        <img className="section-img" src={block3} alt="Обезьянка отправляется в путешествие" />
        <div className="section-inner">
          <p className="section-title">Долго не думая, наша Обезьянка отправляется в путешествие!</p>
        </div>
      </section>

      <section className="section block4">
        <img className="section-img" src={block4} alt="Обезьянка гуляет по лесу" />
        <div className="section-inner">
          <p className="section-title">
            Обезьянка шла по лесу и наслаждалась природой.
          </p>
        </div>
      </section>

      <section className="section block5">
        <img className="section-img" src={block5} alt="Обезьянка знакомится с олененком" />
        <div className="section-inner">
          <p className="section-title">Обезьянка знакомится с оленёнком</p>
        </div>
      </section>

      <section className="section block6">
        <img className="section-img" src={block6} alt="Обезьянка кушает" />
        <div className="section-inner">
          <p className="section-title">Обезьянка кушает</p>
        </div>
      </section>

      <section className="section block7">
        <img className="section-img" src={block7} alt="Обезьянка едет счастливая домой" />
        <div className="section-inner">
          <p className="section-title">Обезьянка едет счастливая домой</p>
        </div>
      </section>
    </div>
  )
}

export default App