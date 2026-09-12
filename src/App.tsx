import { useLayoutEffect, useRef, useState, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
import monkey_preview from './assets/monkey_preview.jpg'
import monkey_think from './assets/monkey_think.jpg'
import autumn from './assets/autumn.jpg'
import monkey_cook from './assets/monkey_cook.jpg'
import monkey_phone from './assets/monkey_phone.jpg'
import monkey_happy from './assets/monkey_happy.jpg'
import monkey_dress from './assets/monkey_dress.jpg'
import monkey_flower from './assets/monkey_flower.jpg'
import monkey_drive from './assets/monkey_drive.jpg'
import monkey_look from './assets/monkey_look.jpg'
import monkey_forest from './assets/monkey_forest.jpg'
import two_monkey_look2 from './assets/two_monkey_look2.jpg'
import monkey_with_deer from './assets/monkey_with_deer.webp'
import alpaks from './assets/alpaks.jpg'
import monkey_kapibara from './assets/monkey_kapibara.jpg'
import monkey_eat from './assets/monkey_eat.jpg'
import monkey_eat2 from './assets/monkey_eat2.jpg'
import monkeys_kiss from './assets/monkeys_kiss.jpg'
import { launchConfetti } from './confetti'
import { launchHearts } from './hearts'
import FallingLeaves from './FallingLeaves'
import LoginScreen from './LoginScreen'
import './App.css'

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)

type Block = {
  img: string
  alt: string
  title: string
  heroScroll?: boolean
  buttons?: { id: string; text: string }[]
  hidden: boolean
  start?: boolean
}

const initialBlocks: Block[] = [
  {
    img: monkey_preview,
    alt: 'Начало',
    title:
        'Один день из жизни Обезьянки Риты',
    buttons: [
      {
        id: 'start',
        text: 'Начать',
      },
    ],
    hidden: false,
    start: true,
  },
  {
    img: monkey_think,
    alt: 'Обезьянка скучает',
    title:
      'Обезьянка была дома и немного скучала. Сегодня ведь выходной, надо обязательно чем то заняться.',
    heroScroll: true,
    buttons: [{ id: 'next', text: 'дальше' }],
    hidden: false,
  },
  {
    img: autumn,
    alt: 'Любимая пора года у Обезьянки',
    title:
      'На улице была ранняя осень, и слегка прохладно, но обезьянка любила такую погоду. Ведь осенью, деревья с каждым днём становятся всё красивее, как будто неведомый художник каждую ночь выходит на работу и раскрашивает целые парки в красочную палитру осенних цветов.',
    heroScroll: true,
    buttons: [{ id: 'next', text: 'дальше' }],
    hidden: false,
  },
  {
    img: monkey_cook,
    alt: 'Обезьянка готовит плов',
    title:
      'Но вернемся к нашей Обезьянке. Сидеть без дела она не привыкла, поэтому уже прибралась в домике и готовила свой фирменный плов.',
    heroScroll: true,
    buttons: [{ id: 'next', text: 'дальше' }],
    hidden: false,
  },
  {
    img: monkey_phone,
    alt: 'Обезьянка разговаривает по телефону',
    title:
      'Как вдруг - телефонный звонок. Кто же это? Обезьянку приглашает погулять другая обезьянка! Хммм - это звучит заманчиво, что же делать?',
    buttons: [{
      id: 'accept',
      text: 'Cогласиться',
    },
    {
      id: 'decline',
      text: 'Отказаться',
    }
    ],
    heroScroll: true,
    hidden: false,
  },
  {
    img: monkey_happy,
    alt: 'Обезьянка сказала ДА!',
    title: 'Она сказала ДА!!! ... То есть, она просто согласилась сходить на свидание с другой обезьянкой, это конечно просто прогулка, не будем торопить события...',
    heroScroll: true,
    buttons: [{ id: 'next', text: 'дальше' }],
    hidden: true,
  },
  {
    img: monkey_dress,
    alt: 'Обезьянка наряжается',
    title: 'Теперь нужно нарядиться. Обезьянка, долго не думая, надела свой лучший наряд. Как уже было сказано ранее, за окном стояла осенняя погода, поэтому наша предусмотрительная героиня взяла с собой теплые вещи.',
    heroScroll: true,
    buttons: [{ id: 'next', text: 'дальше' }],
    hidden: true,
  },
  {
    img: monkey_flower,
    alt: 'Обезьянка получает цветок',
    title: 'Вот и подошло время свидания! Какой красивый цветок! Надо скорее бежать ставить его в вазу.',
    heroScroll: true,
    buttons: [{ id: 'next', text: 'дальше' }],
    hidden: true,
  },
  {
    img: monkey_drive,
    alt: 'Обезьянка отправляется в путешествие',
    title: 'И вот, наконец, две Обезьянки отправляются в путешествие. Нужно обязательно включить любимую музыку!',
    heroScroll: true,
    buttons: [{ id: 'next', text: 'дальше' }],
    hidden: true,
  },
  {
    img: monkey_look,
    alt: 'Обезьянки приехали',
    title: 'За музыкой и неспешной беседой, наши Обезьянки приехали в место назначения - что же их тут ждет?',
    heroScroll: true,
    buttons: [{ id: 'next', text: 'дальше' }],
    hidden: true,
  },
  {
    img: monkey_forest,
    alt: 'Обезьянка гуляет по лесу',
    title: 'Наша героиня шла по лесу и наслаждалась природой, а вторая обезьянка фотографировала её. "Какая же она красивая!" - подумала вторая обезьянка.',
    heroScroll: true,
    buttons: [{ id: 'next', text: 'дальше' }],
    hidden: true,
  },
  {
    img: two_monkey_look2,
    alt: 'Обезьянки увидели что-то интересное',
    title: 'Ух ты, а кто это там пробежал? И лапы, и хвост, и усы... Надо подойти поближе, чтобы узнать кто здесь живет.',
    heroScroll: true,
    buttons: [{ id: 'next', text: 'дальше' }],
    hidden: true,
  },
  {
    img: monkey_with_deer,
    alt: 'Обезьянка знакомится с олененком',
    title: 'Да это же Олененок! И он, кажется, не против познакомиться - какой милый!',
    heroScroll: true,
    buttons: [{ id: 'next', text: 'дальше' }],
    hidden: true,
  },
  {
    img: alpaks,
    alt: 'Альпака',
    title: 'А это что за звери? Говорят "Аль Пака" - иатальянцы, наверное... Основательно они подготовились к холодам - и шапки, и шубы себе пошили. Нужно срочно потрогать их!',
    heroScroll: true,
    buttons: [{ id: 'next', text: 'дальше' }],
    hidden: true,
  },
  {
    img: monkey_kapibara,
    alt: 'Обезьянки и капибара',
    title: 'Эх, вот бы еще Капибару увидеть... Жаль, но наш климат для них слишком не комфортный. Но мы всё таки представим, что наши герои встретили и этих чудесных животных.',
    heroScroll: true,
    buttons: [{ id: 'next', text: 'дальше' }],
    hidden: true,
  },
  {
    img: monkey_eat,
    alt: 'Обезьянка проголодалась',
    title: 'Ох, кажется, Обезьянки проголодались! Это не удивительно, ведь они так много прыгали. Нужно скорее искать обед!',
    heroScroll: true,
    buttons: [{ id: 'next', text: 'обед!' }],
    hidden: true,
  },
  {
    img: monkey_eat2,
    alt: 'Обезьянка кушает',
    title: 'Наши Обезьянки удобно расположились под раскидистым деревом и, наслаждаясь прекрасным видом дикой природы, приступили к трапезе. Это должно быть вкусно. Приятного аппетита!',
    heroScroll: true,
    buttons: [{ id: 'next', text: 'дальше' }],
    hidden: true,
  },
  {
    img: monkeys_kiss,
    alt: 'Обезьянки счастливые',
    title: 'Вот и подошло к концу наше путешествие! Обезьянки едут счастливые домой, ведь они хорошо провели время вместе - гуляли по лесу, видели много новых зверей и вкусно кушали. Выходной удался!',
    buttons: [
      { id: 'heart', text: '❤' },
      { id: 'end', text: 'Конец' },
    ],
    hidden: true,
  },
]

function App() {
  const root = useRef<HTMLDivElement>(null)
  const [blocks, setBlocks] = useState<Block[]>(initialBlocks)
  const [isAuthed, setIsAuthed] = useState(false)

  const scrollToNext = (section: Element | null) => {
    const nextSection = section?.nextElementSibling as HTMLElement | null
    if (nextSection) {
      gsap.to(window, {
        scrollTo: { y: nextSection, autoKill: false },
        duration: 1.4,
        ease: 'power2.inOut',
      })
    }
  }

  const scrollToTop = () => {
    const firstSection = root.current?.firstElementChild as HTMLElement | null
    if (firstSection) {
      gsap.to(window, {
        scrollTo: { y: firstSection, autoKill: false },
        duration: 1.4,
        ease: 'power2.inOut',
      })
    }
  }

  const handleButtonClick = async (id: string, element: HTMLElement) => {
    const section = element.closest('.section')
    if (id === 'accept') {
      setBlocks((prev) => prev.map((block) => ({ ...block, hidden: false })))
      launchConfetti(element)
      await new Promise((resolve) => setTimeout(resolve, 800))
      scrollToNext(section)
    } else if (id === 'start') {
      scrollToNext(section)
    } else if (id === 'heart') {
      launchHearts(element)
    }
  }

  const handleDeclineHover = (element: HTMLElement, clientX: number, clientY: number) => {
    const rect = element.getBoundingClientRect()
    const dirX = rect.left + rect.width / 2 - clientX
    const dirY = rect.top + rect.height / 2 - clientY
    const len = Math.hypot(dirX, dirY) || 1
    const margin = 16
    const maxX = window.innerWidth - rect.width - margin
    const maxY = window.innerHeight - rect.height - margin
    const targetX = Math.min(maxX, Math.max(margin, rect.left + (dirX / len) * 160))
    const targetY = Math.min(maxY, Math.max(margin, rect.top + (dirY / len) * 160))

    gsap.to(element, {
      x: `+=${targetX - rect.left}`,
      y: `+=${targetY - rect.top}`,
      rotation: `+=${(Math.random() - 0.5) * 80}`,
      duration: 0.35,
      ease: 'power2.out',
    })
  }

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const heroTl = gsap.timeline()
      heroTl
        .from('.section:first-of-type .section-inner', {
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
        .toArray<HTMLElement>('.section')
        .slice(1)
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

  useEffect(() => {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual'
    }
    window.scrollTo(0, 0)
  }, [])

  return (
    <>
      <FallingLeaves />
      {!isAuthed ? (
        <LoginScreen onSuccess={() => setIsAuthed(true)} />
      ) : (
        <>
          <div ref={root}>
{blocks
          .filter((block) => !block.hidden)
          .map((block) => {
            const buttonsContent = block.buttons?.map((button) =>
                  button.id === 'next' ? (
                    <button
                      className="section-next"
                      key={button.id}
                      onClick={(event) =>
                        scrollToNext(event.currentTarget.closest('.section'))
                      }
                    >
                      <span>{button.text}</span>
                      <svg
                        className="section-next__icon"
                        viewBox="0 0 24 24"
                        width="16"
                        height="16"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M5 12h13" />
                        <path d="M12 5l7 7-7 7" />
                      </svg>
                    </button>
                  ) : button.id === 'end' ? (
                    <button
                      className="section-button section-button--end"
                      key={button.id}
                      onClick={scrollToTop}
                    >
                      <span>{button.text}</span>
                    </button>
                  ) : (
                    <button
                      className={
                        button.id === 'heart'
                          ? 'section-button section-button--heart'
                          : 'section-button'
                      }
                      key={button.id}
                      onClick={(event) =>
                        handleButtonClick(button.id, event.currentTarget)
                      }
                      onMouseEnter={
                        button.id === 'decline'
                          ? (event) =>
                              handleDeclineHover(
                                event.currentTarget,
                                event.clientX,
                                event.clientY,
                              )
                          : undefined
                      }
                    >
                      <span>{button.text}</span>
                      {button.id === 'start' && (
                        <svg
                          className="section-button__icon"
                          viewBox="0 0 24 24"
                          width="22"
                          height="22"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M12 2v13" />
                          <path d="M5 11l7 7 7-7" />
                        </svg>
                      )}
                    </button>
                  ),
                )

            const buttons = buttonsContent && (
              <div className="section-buttons">{buttonsContent}</div>
            )

            const title = (
              <p className="section-title">{block.title}</p>
            )

            return (
              <section
                className={`section${block.start ? ' section--start' : ''}${
                  block.buttons?.some((button) => button.id === 'end')
                    ? ' section--end'
                    : ''
                }`}
                key={block.alt}
              >
                {block.start ? (
                  <>
                    <div className="section-inner">{title}</div>
                    <img className="section-img" src={block.img} alt={block.alt} />
                    {buttons}
                  </>
                ) : block.buttons?.some((button) => button.id === 'end') ? (
                  <>
                    <div className="section-inner">{title}</div>
                    <img className="section-img" src={block.img} alt={block.alt} />
                    <div className="section-buttons">{buttonsContent}</div>
                  </>
                ) : (
                  <>
                    <img className="section-img" src={block.img} alt={block.alt} />
                    <div className="section-inner">
                      {title}
                      {buttons}
                    </div>
                  </>
                )}
                {block.heroScroll && (
                  <div className="hero-scroll" aria-hidden="true">
                    <span className="hero-scroll__line" />
                  </div>
                )}
              </section>
            )
          })}
      </div>
        </>
      )}
    </>
  )
}

export default App