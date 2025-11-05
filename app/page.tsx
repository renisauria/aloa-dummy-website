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
  const pinnedSectionRef = useRef<HTMLDivElement>(null)
  const horizontalRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)

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

      // Parallax background layers
      if (parallaxRef.current) {
        const layers = parallaxRef.current.querySelectorAll('.parallax-layer')
        layers.forEach((layer, index) => {
          const speed = (index + 1) * 0.5
          gsap.to(layer, {
            y: () => window.innerHeight * speed,
            scrollTrigger: {
              trigger: parallaxRef.current,
              start: 'top top',
              end: 'bottom top',
              scrub: true,
            },
          })
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
      const cards = document.querySelectorAll('.feature-card')
      cards.forEach((card, index) => {
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            end: 'top 30%',
            scrub: 1,
          },
          opacity: 0,
          y: 100,
          rotation: -5,
          scale: 0.9,
        })
      })

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

    return () => ctx.revert()
  }, [])

  return (
    <main ref={mainRef} className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900 text-white overflow-hidden grid-pattern noise-texture">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-slate-950/50 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-3xl">🦄</span>
            <span className="text-xl font-bold">Unicornia</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-gray-300 hover:text-white transition-colors">Features</a>
            <a href="#gallery" className="text-gray-300 hover:text-white transition-colors">Gallery</a>
            <a href="#about" className="text-gray-300 hover:text-white transition-colors">About</a>
            <button className="px-6 py-2 bg-gradient-to-r from-brand-600 to-brand-500 rounded-full font-semibold hover:scale-105 transition-transform">
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated background gradient */}
        <div className="absolute inset-0 opacity-50">
          <div className="absolute inset-0 bg-gradient-to-br from-brand-900/40 via-purple-900/30 to-accent-900/20"></div>
        </div>

        {/* Floating orbs */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-brand-500/30 rounded-full blur-3xl" style={{ animation: 'float 6s ease-in-out infinite' }}></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent-500/30 rounded-full blur-3xl" style={{ animation: 'float 6s ease-in-out infinite 2s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl" style={{ animation: 'float 6s ease-in-out infinite 4s' }}></div>

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
            <button className="group relative px-8 py-4 bg-gradient-to-r from-brand-600 to-brand-500 rounded-full font-semibold text-lg overflow-hidden transition-all hover:scale-105 hover:shadow-2xl hover:shadow-brand-500/50">
              <span className="relative z-10">Explore the Magic</span>
              <div className="absolute inset-0 bg-gradient-to-r from-brand-500 to-accent-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
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
      <section ref={parallaxRef} className="relative h-[150vh] flex items-center justify-center overflow-hidden">
        <div className="parallax-layer absolute inset-0 bg-gradient-to-b from-brand-900/20 to-transparent"></div>
        <div className="parallax-layer absolute inset-0 flex items-center justify-center">
          <div className="text-center max-w-5xl mx-auto px-6">
            <h2 className="text-6xl md:text-7xl lg:text-8xl font-bold mb-6 gradient-text">
              Legendary Creatures
            </h2>
            <p className="text-2xl md:text-3xl text-gray-300 font-light">
              Born from starlight and ancient magic, unicorns embody the perfect balance of grace and power
            </p>
          </div>
        </div>
        <div className="parallax-layer absolute bottom-0 w-full h-1/3 bg-gradient-to-t from-slate-950 to-transparent"></div>
      </section>

      {/* Stats Section */}
      <section ref={statsRef} className="py-32 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-brand-950/20 to-transparent"></div>
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
                <div className="absolute inset-0 bg-gradient-to-br from-brand-500/20 to-accent-500/20 rounded-3xl blur-3xl"></div>
                <div className="relative h-full flex items-center justify-center text-9xl">
                  🦄
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

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
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
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-brand-950/30 to-transparent"></div>
        <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
          <div className="p-16 bg-gradient-to-br from-brand-600/20 to-accent-600/20 backdrop-blur-sm border border-white/10 rounded-3xl">
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
              Begin Your Journey
            </h2>
            <p className="text-xl md:text-2xl text-gray-300 mb-10 font-light max-w-3xl mx-auto">
              Join thousands of believers who have discovered the magic of unicorns. Your legendary adventure starts here.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <button className="px-10 py-5 bg-gradient-to-r from-brand-600 to-brand-500 rounded-full font-bold text-lg hover:scale-105 transition-all shadow-lg shadow-brand-500/50 hover:shadow-2xl hover:shadow-brand-500/70">
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

    </main>
  )
}
