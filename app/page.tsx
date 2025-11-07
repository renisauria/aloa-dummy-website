'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Home() {
  const mainRef = useRef<HTMLDivElement>(null)
  const heroTextRef = useRef<HTMLHeadingElement>(null)
  const heroSubtextRef = useRef<HTMLParagraphElement>(null)
  const parallaxRef = useRef<HTMLDivElement>(null)
  const legendaryTextRef = useRef<HTMLHeadingElement>(null)
  const pinnedSectionRef = useRef<HTMLDivElement>(null)
  const horizontalRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)
  const heartsContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero text split animation
      if (heroTextRef.current) {
        const text = heroTextRef.current.textContent || ''
        const words = text.split(' ')
        heroTextRef.current.innerHTML = words
          .map(word => `<span class="inline-block word">${
            word.split('').map(char =>
              `<span class="inline-block char" style="display: inline-block;">${char === ' ' ? '&nbsp;' : char}</span>`
            ).join('')
          }</span>&nbsp;`)
          .join('')

        const chars = heroTextRef.current.querySelectorAll('.char')

        gsap.fromTo(
          chars,
          {
            opacity: 0,
            y: 100,
            rotationX: -90,
          },
          {
            opacity: 1,
            y: 0,
            rotationX: 0,
            duration: 1.2,
            stagger: {
              amount: 0.8,
              from: 'start',
            },
            ease: 'power4.out',
          }
        )
      }

      // Hero subtext animation
      if (heroSubtextRef.current) {
        gsap.from(heroSubtextRef.current, {
          opacity: 0,
          y: 50,
          duration: 1,
          delay: 1,
          ease: 'power3.out',
        })
      }

      // Legendary Creatures text split animation
      if (legendaryTextRef.current) {
        const text = legendaryTextRef.current.textContent || ''
        const words = text.split(' ')

        // Split into words with individual characters, preserving gradient on each char
        legendaryTextRef.current.innerHTML = words
          .map(word => {
            const chars = word.split('').map(char =>
              `<span class="inline-block char" style="display: inline-block; background: linear-gradient(to bottom, #ffffff, #f8f8ff, #f0f0f8); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">${char}</span>`
            ).join('')
            return `<span class="inline-block word" style="display: inline-block;">${chars}</span>`
          })
          .join('<span style="display: inline-block; width: 0.25em;"></span>')

        const charElements = legendaryTextRef.current.querySelectorAll('.char')

        // Initial state - hidden below with perspective rotation
        gsap.set(charElements, {
          opacity: 0,
          y: 80,
          rotationX: -90,
          transformOrigin: 'center bottom',
        })

        ScrollTrigger.create({
          trigger: legendaryTextRef.current,
          start: 'top 80%',
          once: true,
          onEnter: () => {
            gsap.to(charElements, {
              opacity: 1,
              y: 0,
              rotationX: 0,
              duration: 1.2,
              stagger: {
                amount: 1,
                from: 'start',
                ease: 'power2.inOut',
              },
              ease: 'power4.out',
            })
          },
        })
      }

      // Pinned section with reveal animation
      if (pinnedSectionRef.current) {
        const features = pinnedSectionRef.current.querySelectorAll('.feature-item')

        ScrollTrigger.create({
          trigger: pinnedSectionRef.current,
          start: 'top top',
          end: '+=200%',
          pin: pinnedSectionRef.current.querySelector('.pinned-content'),
          scrub: true,
        })

        features.forEach((feature, index) => {
          gsap.fromTo(
            feature,
            {
              opacity: 0,
              x: -100,
              scale: 0.8,
            },
            {
              opacity: 1,
              x: 0,
              scale: 1,
              scrollTrigger: {
                trigger: feature,
                start: 'top 80%',
                end: 'top 30%',
                scrub: 1,
              },
            }
          )
        })
      }

      // Horizontal scroll section
      if (horizontalRef.current) {
        const slides = horizontalRef.current.querySelectorAll('.h-slide')

        gsap.to(slides, {
          xPercent: -100 * (slides.length - 1),
          ease: 'none',
          scrollTrigger: {
            trigger: horizontalRef.current,
            start: 'top top',
            end: () => `+=${horizontalRef.current!.offsetWidth * 2}`,
            pin: true,
            scrub: 1,
            anticipatePin: 1,
          },
        })
      }

      // Stats counter animation
      if (statsRef.current) {
        const counters = statsRef.current.querySelectorAll('.counter')

        counters.forEach((counter) => {
          const target = parseInt(counter.getAttribute('data-target') || '0')

          ScrollTrigger.create({
            trigger: counter,
            start: 'top 80%',
            onEnter: () => {
              gsap.to(counter, {
                innerText: target,
                duration: 2,
                snap: { innerText: 1 },
                ease: 'power2.out',
              })
            },
          })
        })
      }

      // Feature cards stagger animation
      const cardsSection = document.querySelector('#about')
      const cards = document.querySelectorAll('.feature-card')

      if (cardsSection && cards.length > 0) {
        gsap.set(cards, { opacity: 0, y: 80, rotation: -3, scale: 0.95 })

        ScrollTrigger.create({
          trigger: cardsSection,
          start: 'top 75%',
          once: true,
          onEnter: () => {
            gsap.to(cards, {
              opacity: 1,
              y: 0,
              rotation: 0,
              scale: 1,
              duration: 0.8,
              stagger: {
                amount: 0.6,
                from: 'start',
                ease: 'power2.out',
              },
              ease: 'power3.out',
            })
          },
        })

        // 3D hover effect for cards
        cards.forEach((card) => {
          const cardElement = card as HTMLElement
          cardElement.style.transformStyle = 'preserve-3d'
          cardElement.style.transition = 'transform 0.3s ease-out'

          cardElement.addEventListener('mousemove', (e) => {
            const rect = cardElement.getBoundingClientRect()
            const x = e.clientX - rect.left
            const y = e.clientY - rect.top
            const centerX = rect.width / 2
            const centerY = rect.height / 2
            const rotateX = (y - centerY) / 10
            const rotateY = (centerX - x) / 10

            gsap.to(cardElement, {
              rotationX: rotateX,
              rotationY: rotateY,
              z: 50,
              transformPerspective: 1000,
              duration: 0.3,
              ease: 'power2.out',
            })
          })

          cardElement.addEventListener('mouseleave', () => {
            gsap.to(cardElement, {
              rotationX: 0,
              rotationY: 0,
              z: 0,
              duration: 0.5,
              ease: 'power2.out',
            })
          })
        })
      }

      // CTA section animation
      const ctaSection = document.querySelector('.cta-section')
      if (ctaSection) {
        gsap.from(ctaSection, {
          scrollTrigger: {
            trigger: ctaSection,
            start: 'top 70%',
          },
          opacity: 0,
          scale: 0.95,
          duration: 1,
          ease: 'power3.out',
        })
      }

    }, mainRef)

    // Magical hearts animation when reaching bottom
    let hasTriggered = false
    const createFloatingHearts = () => {
      if (!heartsContainerRef.current || hasTriggered) return
      hasTriggered = true

      // Rainbow hearts with CSS colors
      const rainbowHearts = [
        { emoji: '❤️', color: '#ff0000' },  // Red
        { emoji: '🧡', color: '#ff7f00' },  // Orange
        { emoji: '💛', color: '#ffff00' },  // Yellow
        { emoji: '💚', color: '#00ff00' },  // Green
        { emoji: '💙', color: '#0000ff' },  // Blue
        { emoji: '💜', color: '#8b00ff' },  // Purple
        { emoji: '💖', color: '#ff69b4' },  // Pink
        { emoji: '💗', color: '#ffb6c1' },  // Light Pink
        { emoji: '💕', color: '#ff1493' },  // Deep Pink
      ]

      const heartCount = 40
      const sparkleCount = 80

      // Create hearts
      for (let i = 0; i < heartCount; i++) {
        setTimeout(() => {
          const randomHeart = rainbowHearts[Math.floor(Math.random() * rainbowHearts.length)]
          const heart = document.createElement('div')
          heart.innerHTML = randomHeart.emoji
          heart.style.position = 'fixed'
          heart.style.fontSize = `${Math.random() * 40 + 25}px`
          heart.style.left = `${Math.random() * 100}%`
          heart.style.bottom = '-50px'
          heart.style.zIndex = '9999'
          heart.style.pointerEvents = 'none'
          heart.style.textShadow = `0 0 15px ${randomHeart.color}, 0 0 30px ${randomHeart.color}`

          heartsContainerRef.current?.appendChild(heart)

          gsap.to(heart, {
            y: -window.innerHeight - 100,
            x: `${(Math.random() - 0.5) * 300}px`,
            rotation: Math.random() * 720 - 360,
            opacity: 0,
            scale: Math.random() * 0.5 + 0.8,
            duration: Math.random() * 4 + 3,
            ease: 'power1.out',
            onComplete: () => heart.remove(),
          })
        }, i * 80)
      }

      // Create sparkles as separate elements
      for (let i = 0; i < sparkleCount; i++) {
        setTimeout(() => {
          const sparkle = document.createElement('div')
          const size = Math.random() * 6 + 3
          sparkle.style.position = 'fixed'
          sparkle.style.width = `${size}px`
          sparkle.style.height = `${size}px`
          sparkle.style.left = `${Math.random() * 100}%`
          sparkle.style.bottom = '-20px'
          sparkle.style.zIndex = '9998'
          sparkle.style.pointerEvents = 'none'

          // Create sparkle effect with multiple box shadows
          const colors = ['#ffffff', '#ffd700', '#ffff00', '#ff69b4', '#ff1493', '#00ffff', '#ff00ff']
          const color = colors[Math.floor(Math.random() * colors.length)]
          sparkle.style.background = color
          sparkle.style.borderRadius = '50%'
          sparkle.style.boxShadow = `
            0 0 ${size * 2}px ${color},
            0 0 ${size * 4}px ${color},
            0 0 ${size * 6}px ${color}
          `

          heartsContainerRef.current?.appendChild(sparkle)

          gsap.to(sparkle, {
            y: -window.innerHeight - 150,
            x: `${(Math.random() - 0.5) * 400}px`,
            opacity: 0,
            scale: Math.random() * 2 + 0.5,
            duration: Math.random() * 5 + 2,
            ease: 'power1.inOut',
            onComplete: () => sparkle.remove(),
          })
        }, i * 40)
      }

      setTimeout(() => {
        hasTriggered = false
      }, 5000)
    }

    const handleScroll = () => {
      const scrollTop = window.scrollY
      const windowHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight

      if (scrollTop + windowHeight >= documentHeight - 100) {
        createFloatingHearts()
      }
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      ctx.revert()
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <main ref={mainRef} className="min-h-screen text-white overflow-hidden grid-pattern noise-texture" style={{ background: 'linear-gradient(to bottom right, #2d1a5a, #4a2890, #2d1a5a)' }}>
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b border-white/10" style={{ backgroundColor: 'rgba(45, 26, 90, 0.8)' }}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-3xl">🦄</span>
            <span className="text-xl font-bold">Unicornia</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-gray-300 hover:text-white transition-colors">Features</a>
            <a href="#gallery" className="text-gray-300 hover:text-white transition-colors">Gallery</a>
            <a href="#about" className="text-gray-300 hover:text-white transition-colors">About</a>
            <button className="px-6 py-2 rounded-full font-semibold hover:scale-105 transition-transform" style={{ background: 'linear-gradient(to right, #7a4dff, #8b6dff)' }}>
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated background gradient */}
        <div className="absolute inset-0 opacity-50">
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom right, rgba(88, 48, 179, 0.4), rgba(106, 59, 219, 0.3), rgba(143, 23, 64, 0.2))' }}></div>
        </div>

        {/* Floating orbs */}
        <div className="absolute top-20 left-10 w-72 h-72 rounded-full blur-3xl" style={{ backgroundColor: 'rgba(139, 109, 255, 0.3)', animation: 'float 6s ease-in-out infinite' }}></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full blur-3xl" style={{ backgroundColor: 'rgba(255, 92, 141, 0.3)', animation: 'float 6s ease-in-out infinite 2s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 rounded-full blur-3xl" style={{ backgroundColor: 'rgba(139, 109, 255, 0.2)', animation: 'float 6s ease-in-out infinite 4s' }}></div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-32 text-center perspective-1000">
          <div className="mb-8">
            <span className="inline-block px-6 py-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full text-sm font-medium tracking-wide mb-8">
              Discover the Magic
            </span>
          </div>

          <h1
            ref={heroTextRef}
            className="text-7xl md:text-8xl lg:text-9xl font-black tracking-tight mb-8 leading-[0.95] preserve-3d"
          >
            Unicorn Excellence
          </h1>

          <p
            ref={heroSubtextRef}
            className="text-xl md:text-2xl lg:text-3xl text-gray-300 max-w-4xl mx-auto mb-12 font-light leading-relaxed"
          >
            Where myth meets reality. Experience the extraordinary fusion of elegance, power, and timeless magic.
          </p>

          <div className="flex flex-wrap gap-4 justify-center">
            <button className="group relative px-8 py-4 rounded-full font-semibold text-lg overflow-hidden transition-all hover:scale-105 hover:shadow-2xl" style={{ background: 'linear-gradient(to right, #7a4dff, #8b6dff)' }}>
              <span className="relative z-10">Explore the Magic</span>
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: 'linear-gradient(to right, #8b6dff, #ff5c8d)' }}></div>
            </button>
            <button className="px-8 py-4 bg-white/5 backdrop-blur-sm border border-white/20 rounded-full font-semibold text-lg hover:bg-white/10 hover:border-white/40 transition-all">
              Learn More
            </button>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce">
            <div className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-2">
              <div className="w-1 h-2 bg-white/50 rounded-full" style={{ animation: 'glow 2s ease-in-out infinite alternate' }}></div>
            </div>
          </div>
        </div>
      </section>

      {/* Parallax Section */}
      <section ref={parallaxRef} className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Animated gradient background */}
        <div className="parallax-layer absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(74, 40, 144, 0.3), rgba(45, 26, 90, 0.2), transparent)' }}></div>

        {/* Floating orbs for depth */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full blur-3xl opacity-30" style={{ background: 'radial-gradient(circle, rgba(139, 109, 255, 0.4), transparent)', animation: 'float 8s ease-in-out infinite' }}></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full blur-3xl opacity-20" style={{ background: 'radial-gradient(circle, rgba(255, 92, 141, 0.4), transparent)', animation: 'float 10s ease-in-out infinite 2s' }}></div>

        {/* Main content */}
        <div className="parallax-layer absolute inset-0 flex items-center justify-center">
          <div className="text-center max-w-6xl mx-auto px-6">
            {/* Unicorn emoji above vignette */}
            <div className="mb-6 text-6xl opacity-100 relative z-10">
              🦄
            </div>

            {/* Decorative element above title */}
            <div className="mb-8 flex justify-center gap-3 opacity-60">
              <div className="w-16 h-px bg-gradient-to-r from-transparent via-purple-400 to-transparent"></div>
              <span className="text-2xl">✨</span>
              <div className="w-16 h-px bg-gradient-to-r from-transparent via-purple-400 to-transparent"></div>
            </div>

            <h2 ref={legendaryTextRef} className="text-6xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight preserve-3d" style={{
              background: 'linear-gradient(to bottom, #ffffff, #f8f8ff, #f0f0f8)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              animation: 'textGlowPulse 4s ease-in-out infinite'
            }}>
              Legendary Creatures
            </h2>

            <p className="text-xl md:text-2xl lg:text-3xl text-gray-300 font-light leading-relaxed max-w-4xl mx-auto">
              Born from starlight and ancient magic, unicorns embody the perfect balance of grace and power
            </p>

            {/* Decorative element below text */}
            <div className="mt-12 flex justify-center items-center gap-2 opacity-40">
              <div className="w-2 h-2 rounded-full bg-purple-400"></div>
              <div className="w-24 h-px bg-gradient-to-r from-purple-400 via-pink-400 to-transparent"></div>
              <div className="w-2 h-2 rounded-full bg-pink-400"></div>
              <div className="w-24 h-px bg-gradient-to-l from-purple-400 via-pink-400 to-transparent"></div>
              <div className="w-2 h-2 rounded-full bg-purple-400"></div>
            </div>
          </div>
        </div>

        {/* Bottom gradient blend */}
        <div className="parallax-layer absolute bottom-0 w-full h-1/2" style={{ background: 'linear-gradient(to top, rgba(45, 26, 90, 0.8), transparent)' }}></div>
      </section>

      {/* Stats Section */}
      <section ref={statsRef} className="py-32 relative">
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, transparent, rgba(45, 26, 90, 0.2), transparent)' }}></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: 1000, label: 'Years of Legends', suffix: '+' },
              { value: 7, label: 'Magical Powers', suffix: '' },
              { value: 100, label: 'Mythical Tales', suffix: '+' },
              { value: 99, label: 'Pure Magic', suffix: '%' },
            ].map((stat, index) => (
              <div key={index} className="text-center p-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl">
                <div className="text-5xl md:text-6xl font-bold mb-2">
                  <span className="counter" data-target={stat.value}>0</span>
                  <span>{stat.suffix}</span>
                </div>
                <div className="text-gray-400 text-sm md:text-base font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pinned Feature Section */}
      <section id="features" ref={pinnedSectionRef} className="relative min-h-[300vh]">
        <div className="pinned-content min-h-screen flex items-center justify-center sticky top-0">
          <div className="max-w-7xl mx-auto px-6 py-20">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-8">
                <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
                  Mystical <span className="gradient-text">Abilities</span>
                </h2>
                <div className="space-y-6">
                  {[
                    {
                      title: 'Healing Powers',
                      desc: 'Their horns possess legendary healing properties, capable of purifying even the most toxic environments.',
                    },
                    {
                      title: 'Dimensional Travel',
                      desc: 'Masters of space-time, unicorns can traverse between realms with ethereal grace.',
                    },
                    {
                      title: 'Wisdom Beyond Ages',
                      desc: 'Carriers of ancient knowledge, they guide those pure of heart toward their destiny.',
                    },
                  ].map((feature, index) => (
                    <div key={index} className="feature-item p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl">
                      <h3 className="text-2xl font-bold mb-2">{feature.title}</h3>
                      <p className="text-gray-400 text-lg">{feature.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative h-[600px] hidden lg:block">
                <div className="absolute inset-0 rounded-3xl blur-3xl" style={{ background: 'linear-gradient(to bottom right, rgba(139, 109, 255, 0.2), rgba(255, 92, 141, 0.2))' }}></div>
                <div className="relative h-full flex items-center justify-center">
                  <img
                    src="/unicorn.jpeg"
                    alt="Majestic unicorn with rainbow mane"
                    className="max-w-full max-h-full object-contain rounded-3xl hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Horizontal Scroll Gallery */}
      <section id="gallery" ref={horizontalRef} className="h-screen relative overflow-hidden">
        <div className="flex h-full">
          {[
            {
              title: 'Ethereal Beauty',
              desc: 'Radiating an otherworldly glow that captivates all who witness it',
              icon: '✨',
              gradient: 'from-purple-600/20 to-pink-600/20',
            },
            {
              title: 'Unbridled Speed',
              desc: 'Moving with velocity that defies the laws of physics itself',
              icon: '⚡',
              gradient: 'from-blue-600/20 to-cyan-600/20',
            },
            {
              title: 'Ancient Wisdom',
              desc: 'Guardians of knowledge spanning millennia of cosmic history',
              icon: '📚',
              gradient: 'from-indigo-600/20 to-purple-600/20',
            },
            {
              title: 'Pure Spirit',
              desc: 'Embodying innocence and virtue in their most perfect form',
              icon: '💫',
              gradient: 'from-pink-600/20 to-rose-600/20',
            },
          ].map((slide, index) => (
            <div key={index} className="h-slide min-w-full h-full flex items-center justify-center px-6">
              <div className="slide-content max-w-2xl text-center">
                <div className={`inline-block p-8 bg-gradient-to-br ${slide.gradient} backdrop-blur-sm border border-white/10 rounded-full mb-8 text-7xl`}>
                  {slide.icon}
                </div>
                <h3 className="text-5xl md:text-6xl font-bold mb-6">{slide.title}</h3>
                <p className="text-xl md:text-2xl text-gray-300 font-light">{slide.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Feature Cards Grid */}
      <section id="about" className="py-32 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
              Why They're <span className="gradient-text">Extraordinary</span>
            </h2>
            <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto font-light">
              Discover the attributes that make unicorns the most revered creatures in mythology
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8" style={{ perspective: '1000px' }}>
            {[
              {
                icon: '🌟',
                title: 'Symbol of Hope',
                desc: 'Throughout history, unicorns have represented hope in the darkest times, inspiring generations to believe in the impossible.',
              },
              {
                icon: '🎨',
                title: 'Muse of Creativity',
                desc: 'Artists, poets, and dreamers have drawn inspiration from their majestic presence for countless centuries.',
              },
              {
                icon: '🛡️',
                title: 'Guardian of Nature',
                desc: 'Protectors of enchanted forests and mystical realms, maintaining the delicate balance of magic.',
              },
              {
                icon: '💎',
                title: 'Rarity Personified',
                desc: 'Their elusive nature makes every sighting a once-in-a-lifetime miracle worth treasuring forever.',
              },
              {
                icon: '🌈',
                title: 'Rainbow Weavers',
                desc: 'Masters of light and color, creating spectacular displays that paint the sky with wonder.',
              },
              {
                icon: '🔮',
                title: 'Mystical Presence',
                desc: 'Their very existence bends reality, creating pockets of pure magic wherever they roam.',
              },
            ].map((card, index) => (
              <div
                key={index}
                className="feature-card group p-8 bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-sm border border-white/10 rounded-2xl hover:border-brand-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-brand-500/20"
              >
                <div className="text-6xl mb-6 group-hover:scale-110 transition-transform duration-300">
                  {card.icon}
                </div>
                <h3 className="text-2xl md:text-3xl font-bold mb-4">{card.title}</h3>
                <p className="text-gray-400 text-lg leading-relaxed">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section py-32 relative">
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, transparent, rgba(45, 26, 90, 0.3), transparent)' }}></div>
        <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
          <div className="p-16 backdrop-blur-sm border border-white/10 rounded-3xl" style={{ background: 'linear-gradient(to bottom right, rgba(122, 77, 255, 0.2), rgba(240, 49, 109, 0.2))' }}>
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
              Begin Your Journey
            </h2>
            <p className="text-xl md:text-2xl text-gray-300 mb-10 font-light max-w-3xl mx-auto">
              Join thousands of believers who have discovered the magic of unicorns. Your legendary adventure starts here.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <button className="px-10 py-5 rounded-full font-bold text-lg hover:scale-105 transition-all shadow-lg hover:shadow-2xl" style={{ background: 'linear-gradient(to right, #7a4dff, #8b6dff)', boxShadow: '0 10px 15px -3px rgba(139, 109, 255, 0.5)' }}>
                Start Exploring
              </button>
              <button className="px-10 py-5 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full font-bold text-lg hover:bg-white/20 hover:border-white/40 transition-all">
                View Gallery
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="text-6xl mb-6">🦄</div>
          <p className="text-gray-400 text-lg mb-4">
            Crafted with magic and wonder
          </p>
          <p className="text-gray-500 text-sm">
            Believe in the extraordinary
          </p>
        </div>
      </footer>

      {/* Magical hearts and sparkles container */}
      <div ref={heartsContainerRef} className="fixed inset-0 pointer-events-none" style={{ zIndex: 9999 }}></div>

    </main>
  )
}
