export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-pink-50 via-blue-50 to-purple-50 py-8 px-4">
      <div className="max-w-4xl mx-auto bg-white/90 rounded-3xl shadow-xl p-8 md:p-12">

        {/* Header */}
        <header className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold text-unicorn-purple mb-4 drop-shadow-md">
            <span className="inline-block animate-pulse">✨</span>
            {' '}Why Unicorns Are Awesome{' '}
            <span className="inline-block animate-pulse">✨</span>
          </h1>
          <p className="text-xl md:text-2xl text-purple-400 italic">
            Magical creatures that inspire wonder and joy
          </p>
        </header>

        {/* Intro */}
        <div className="mb-12 p-6 bg-gradient-to-r from-pink-100 to-purple-100 rounded-2xl border-4 border-unicorn-pink">
          <p className="text-lg text-center text-gray-700 leading-relaxed">
            Unicorns have captured human imagination for centuries, representing purity, grace, and the extraordinary.
            These magnificent mythical creatures remind us that magic exists in the world around us!
          </p>
        </div>

        {/* Rainbow Divider */}
        <div className="h-3 rounded-full bg-gradient-to-r from-unicorn-pink via-unicorn-lavender via-unicorn-blue to-unicorn-pink my-8"></div>

        {/* Reasons Grid */}
        <div className="space-y-6 mb-12">

          <ReasonCard
            emoji="🦄"
            title="Symbol of Magic & Wonder"
            description="Unicorns represent the impossible made possible. With their single spiraling horn and mystical presence, they embody the magic we all wish existed in our everyday lives. They remind us to believe in the extraordinary and never lose our sense of wonder."
          />

          <ReasonCard
            emoji="🌈"
            title="Guardians of Rainbow Dreams"
            description="Legend says unicorns are often found near rainbows, bringing color and joy wherever they go. They inspire creativity, imagination, and the courage to chase our wildest dreams. Their rainbow-touched manes shimmer with all the colors of possibility."
          />

          <ReasonCard
            emoji="💎"
            title="Rare & Precious"
            description="The rarity of unicorns makes them all the more special. In mythology, only the pure of heart can see or approach a unicorn. This teaches us to value what's truly precious and to maintain our own inner purity and goodness."
          />

          <ReasonCard
            emoji="⚡"
            title="Magical Powers"
            description="Unicorn horns were believed to have healing properties, able to purify water and cure ailments. They represent the power of goodness to overcome darkness, and the ability to transform the ordinary into something extraordinary."
          />

          <ReasonCard
            emoji="🌟"
            title="Timeless Inspiration"
            description="From ancient tapestries to modern storytelling, unicorns continue to captivate people of all ages. They inspire art, literature, and imagination across cultures and generations, proving that some magic never fades."
          />

        </div>

        {/* Fun Fact */}
        <div className="mb-12 p-6 bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl border-4 border-dashed border-unicorn-purple text-center">
          <h3 className="text-2xl font-bold text-unicorn-purple mb-3">Did You Know?</h3>
          <p className="text-lg text-gray-700 leading-relaxed">
            The unicorn is the national animal of Scotland! These majestic creatures have been part of Scottish heraldry
            since the 12th century, symbolizing purity, innocence, and power.
          </p>
        </div>

        {/* Rainbow Divider */}
        <div className="h-3 rounded-full bg-gradient-to-r from-unicorn-pink via-unicorn-lavender via-unicorn-blue to-unicorn-pink my-8"></div>

        {/* Footer */}
        <footer className="text-center pt-8 border-t-2 border-unicorn-pink">
          <p className="text-purple-400 text-lg">
            Made with <span className="text-pink-400 text-2xl">♡</span> for all unicorn enthusiasts
          </p>
          <p className="text-purple-400 mt-2">Keep believing in magic!</p>
        </footer>

      </div>
    </main>
  )
}

function ReasonCard({ emoji, title, description }: { emoji: string; title: string; description: string }) {
  return (
    <div className="p-6 bg-gradient-to-br from-pink-50 to-blue-50 rounded-2xl border-l-4 border-unicorn-purple hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
      <h2 className="text-2xl md:text-3xl font-bold text-purple-500 mb-3 flex items-center gap-3">
        <span className="text-4xl">{emoji}</span>
        {title}
      </h2>
      <p className="text-gray-700 text-lg leading-relaxed">{description}</p>
    </div>
  )
}
