import { useEffect, useState } from 'react'
import { TrackedLink } from './components/TrackedLink'
import { initializeAnalytics } from './lib/analytics'
import frames768Avif from './assets/frames-768.avif'
import frames1280Avif from './assets/frames-1280.avif'
import frames768Webp from './assets/frames-768.webp'
import frames1280Webp from './assets/frames-1280.webp'
import hero640Avif from './assets/hero-640.avif'
import hero960Avif from './assets/hero-960.avif'
import hero640Webp from './assets/hero-640.webp'
import hero960Webp from './assets/hero-960.webp'
import './App.css'

const ZENNI_LINKS = {
  home: 'https://www.zennioptical.com/',
  all: 'https://www.zennioptical.com/b/all-glasses',
  women: 'https://www.zennioptical.com/b/all-women-glasses',
  men: 'https://www.zennioptical.com/b/all-men-glasses',
  sunglasses: 'https://www.zennioptical.com/b/all-sunglasses',
  tryOn: 'https://www.zennioptical.com/b/all-glasses?openTryOnModal=true',
} as const

type PictureProps = {
  className?: string
  alt: string
  loading?: 'eager' | 'lazy'
  sizes: string
}

function HeroPicture({ className, alt, loading = 'lazy', sizes }: PictureProps) {
  return (
    <picture className={className}>
      <source
        type="image/avif"
        srcSet={`${hero640Avif} 640w, ${hero960Avif} 960w`}
        sizes={sizes}
      />
      <source
        type="image/webp"
        srcSet={`${hero640Webp} 640w, ${hero960Webp} 960w`}
        sizes={sizes}
      />
      <img
        src={hero960Webp}
        width="960"
        height="1440"
        alt={alt}
        loading={loading}
        decoding={loading === 'eager' ? 'sync' : 'async'}
        fetchPriority={loading === 'eager' ? 'high' : 'auto'}
      />
    </picture>
  )
}

function FramesPicture({ className, alt, sizes }: PictureProps) {
  return (
    <picture className={className}>
      <source
        type="image/avif"
        srcSet={`${frames768Avif} 768w, ${frames1280Avif} 1280w`}
        sizes={sizes}
      />
      <source
        type="image/webp"
        srcSet={`${frames768Webp} 768w, ${frames1280Webp} 1280w`}
        sizes={sizes}
      />
      <img
        src={frames1280Webp}
        width="1280"
        height="853"
        alt={alt}
        loading="lazy"
        decoding="async"
      />
    </picture>
  )
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <path d="M4 10h11M11 5l5 5-5 5" />
    </svg>
  )
}

function Brand() {
  return (
    <a className="brand" href="#top" aria-label="Zenni concept page, back to top">
      <svg className="brand__icon" viewBox="0 0 38 18" aria-hidden="true">
        <path d="M2 7.5c.3-2.4 2.3-4.2 4.8-4.2h5.7c2.6 0 4.7 2 4.8 4.6v2.2c-.1 2.6-2.2 4.6-4.8 4.6H6.8A4.8 4.8 0 0 1 2 10.4V7.5Zm18.7.4c.1-2.6 2.2-4.6 4.8-4.6h5.7c2.5 0 4.5 1.8 4.8 4.2v2.9a4.8 4.8 0 0 1-4.8 4.3h-5.7c-2.6 0-4.7-2-4.8-4.6V7.9ZM17.3 8.5c1.1-.8 2.3-.8 3.4 0M2 7.4.5 6M36 7.4 37.5 6" />
      </svg>
      <span>ZENNI</span>
    </a>
  )
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    initializeAnalytics()

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const revealItems = document.querySelectorAll<HTMLElement>('[data-reveal]')
    let observer: IntersectionObserver | undefined

    if (reducedMotion || !('IntersectionObserver' in window)) {
      revealItems.forEach((item) => item.classList.add('is-visible'))
    } else {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-visible')
              observer?.unobserve(entry.target)
            }
          })
        },
        { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
      )
      revealItems.forEach((item) => observer?.observe(item))
    }

    return () => observer?.disconnect()
  }, [])

  useEffect(() => {
    document.body.classList.toggle('menu-open', menuOpen)

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }
    const closeOnDesktop = () => {
      if (window.innerWidth > 840) setMenuOpen(false)
    }

    window.addEventListener('keydown', closeOnEscape)
    window.addEventListener('resize', closeOnDesktop)
    return () => {
      document.body.classList.remove('menu-open')
      window.removeEventListener('keydown', closeOnEscape)
      window.removeEventListener('resize', closeOnDesktop)
    }
  }, [menuOpen])

  const closeMenu = () => setMenuOpen(false)

  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>

      <div className="info-bar" id="top">
        <p><span aria-hidden="true">✦</span> Find a clearer way to express your style</p>
        <TrackedLink href={ZENNI_LINKS.home} ctaName="Visit Zenni" section="announcement">
          Visit official site <ArrowIcon />
        </TrackedLink>
      </div>

      <header className="site-header">
        <div className="site-header__inner">
          <Brand />
          <button
            className="menu-toggle"
            type="button"
            aria-expanded={menuOpen}
            aria-controls="primary-navigation"
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            onClick={() => setMenuOpen((isOpen) => !isOpen)}
          >
            <span /><span /><span />
          </button>
          <nav
            className={`primary-nav${menuOpen ? ' primary-nav--open' : ''}`}
            id="primary-navigation"
            aria-label="Primary navigation"
          >
            <a href="#shop" onClick={closeMenu}>Shop by style</a>
            <a href="#try-on" onClick={closeMenu}>Virtual Try-On</a>
            <a href="#how-it-works" onClick={closeMenu}>How it works</a>
            <a href="#lenses" onClick={closeMenu}>Lens options</a>
            <TrackedLink
              className="button button--small button--nav"
              href={ZENNI_LINKS.all}
              ctaName="Shop Frames"
              section="header"
              onClick={closeMenu}
            >
              Shop frames <ArrowIcon />
            </TrackedLink>
          </nav>
        </div>
      </header>

      <main id="main-content">
        <section className="hero-section" aria-labelledby="hero-title">
          <div className="hero-section__inner">
            <div className="hero-copy">
              <p className="eyebrow"><span>New point of view</span></p>
              <h1 id="hero-title">Your look.<span>Your lenses.</span>Your call.</h1>
              <p className="hero-copy__text">
                Explore prescription glasses and sunglasses designed for different
                styles, needs, and everyday moments.
              </p>
              <div className="button-row">
                <TrackedLink className="button button--primary" href={ZENNI_LINKS.all} ctaName="Find Your Frames" section="hero">
                  Find your frames <ArrowIcon />
                </TrackedLink>
                <TrackedLink className="button button--text" href={ZENNI_LINKS.sunglasses} ctaName="Explore Sunglasses" section="hero">
                  Explore sunglasses <ArrowIcon />
                </TrackedLink>
              </div>
            </div>

            <div className="hero-visual" aria-label="Editorial eyewear portrait">
              <div className="hero-visual__orbit" aria-hidden="true" />
              <div className="hero-visual__image-wrap">
                <HeroPicture
                  alt="Woman wearing bright blue eyeglass frames against a sky-blue background"
                  loading="eager"
                  sizes="(max-width: 840px) 92vw, 48vw"
                />
              </div>
              <div className="hero-note hero-note--top"><span className="hero-note__dot" />Prescription-ready styles</div>
              <div className="hero-note hero-note--bottom"><span>Try before you choose</span><strong>Virtual Try-On</strong></div>
              <svg className="hero-squiggle" viewBox="0 0 140 60" aria-hidden="true"><path d="M2 41c25-31 42 11 63-9s36-22 73 6" /></svg>
            </div>
          </div>
        </section>

        <section className="trust-strip" aria-label="Zenni eyewear benefits">
          <div><span>01</span><strong>Affordable eyewear</strong></div>
          <div><span>02</span><strong>Prescription &amp; sun</strong></div>
          <div><span>03</span><strong>Virtual Try-On</strong></div>
          <div><span>04</span><strong>Styles for every mood</strong></div>
        </section>

        <section className="section categories-section" id="shop" aria-labelledby="shop-title">
          <div className="section-heading" data-reveal>
            <div><p className="eyebrow">Choose your direction</p><h2 id="shop-title">Frames for the way you show up.</h2></div>
            <p>Go classic, bold, sun-ready, or somewhere in between. Start with the collection that feels most like you.</p>
          </div>

          <div className="category-grid" data-reveal>
            <TrackedLink className="category-card category-card--wide" href={ZENNI_LINKS.all} ctaName="Shop Eyeglasses" section="categories">
              <div className="category-media category-media--navy">
                <FramesPicture className="crop crop--top-left" alt="Deep navy round eyeglass frames on a blue surface" sizes="(max-width: 680px) 92vw, 56vw" />
              </div>
              <span className="category-card__number">01</span>
              <span className="category-card__label"><span><small>Everyday clarity</small>Eyeglasses</span><span className="round-arrow"><ArrowIcon /></span></span>
            </TrackedLink>

            <TrackedLink className="category-card" href={ZENNI_LINKS.sunglasses} ctaName="Shop Sunglasses" section="categories">
              <div className="category-media category-media--sun">
                <FramesPicture className="crop crop--bottom-right" alt="Amber-tinted sunglasses on a yellow block" sizes="(max-width: 680px) 92vw, 38vw" />
              </div>
              <span className="category-card__number">02</span>
              <span className="category-card__label"><span><small>Bright-day energy</small>Sunglasses</span><span className="round-arrow"><ArrowIcon /></span></span>
            </TrackedLink>

            <TrackedLink className="category-card" href={ZENNI_LINKS.women} ctaName="Shop Women" section="categories">
              <div className="category-media category-media--coral">
                <FramesPicture className="crop crop--top-right" alt="Coral cat-eye eyeglass frames on a cream surface" sizes="(max-width: 680px) 92vw, 38vw" />
              </div>
              <span className="category-card__number">03</span>
              <span className="category-card__label"><span><small>Expressive shapes</small>Women</span><span className="round-arrow"><ArrowIcon /></span></span>
            </TrackedLink>

            <TrackedLink className="category-card category-card--wide" href={ZENNI_LINKS.men} ctaName="Shop Men" section="categories">
              <div className="category-media category-media--mint">
                <FramesPicture className="crop crop--bottom-left" alt="Translucent mint round eyeglass frames in a studio still life" sizes="(max-width: 680px) 92vw, 56vw" />
              </div>
              <span className="category-card__number">04</span>
              <span className="category-card__label"><span><small>Fresh perspective</small>Men</span><span className="round-arrow"><ArrowIcon /></span></span>
            </TrackedLink>
          </div>
        </section>

        <section className="try-on-section" id="try-on" aria-labelledby="try-on-title">
          <div className="try-on-section__inner">
            <div className="try-on-copy" data-reveal>
              <p className="eyebrow eyebrow--light">See it on you</p>
              <h2 id="try-on-title">The fitting room is already in your pocket.</h2>
              <p>Zenni’s Virtual Try-On lets you preview eligible frames using your phone or desktop before you decide.</p>
              <TrackedLink className="button button--light" href={ZENNI_LINKS.tryOn} ctaName="Try On Frames" section="virtual_try_on">
                Try on frames <ArrowIcon />
              </TrackedLink>
              <p className="try-on-copy__note">Look for the “Try On” option while browsing.</p>
            </div>

            <div className="try-on-demo" data-reveal>
              <div className="try-on-demo__bar"><span><i /> Live preview</span><span>01 / 03</span></div>
              <div className="try-on-demo__viewport">
                <HeroPicture alt="Close-up preview of a woman wearing blue glasses" sizes="(max-width: 840px) 88vw, 42vw" />
                <span className="scan-corner scan-corner--one" aria-hidden="true" />
                <span className="scan-corner scan-corner--two" aria-hidden="true" />
                <span className="scan-corner scan-corner--three" aria-hidden="true" />
                <span className="scan-corner scan-corner--four" aria-hidden="true" />
              </div>
              <div className="try-on-demo__footer"><span>Find a frame that fits your point of view.</span><span className="try-on-demo__dots"><i /><i /><i /></span></div>
            </div>
          </div>
        </section>

        <section className="section steps-section" id="how-it-works" aria-labelledby="steps-title">
          <div className="steps-intro" data-reveal><p className="eyebrow">Keep it simple</p><h2 id="steps-title">Three steps to your next pair.</h2></div>
          <ol className="steps-list" data-reveal>
            <li>
              <span className="step-number">01</span>
              <div className="step-icon step-icon--frame" aria-hidden="true"><svg viewBox="0 0 90 44"><path d="M4 16c1-6 6-10 12-10h15c7 0 12 5 12 12v6c0 7-5 12-12 12H16C9 36 4 31 4 24v-8Zm43 2c0-7 5-12 12-12h15c6 0 11 4 12 10v8c0 7-5 12-12 12H59c-7 0-12-5-12-12v-6Zm-4 2c2-2 3-2 4 0M4 16 1 13m85 3 3-3" /></svg></div>
              <h3>Choose your frame</h3><p>Explore shapes, colors, and sizes that match your style.</p>
            </li>
            <li>
              <span className="step-number">02</span>
              <div className="step-icon step-icon--eye" aria-hidden="true"><svg viewBox="0 0 90 44"><path d="M4 22S18 6 45 6s41 16 41 16-14 16-41 16S4 22 4 22Z" /><circle cx="45" cy="22" r="9" /></svg></div>
              <h3>Preview your look</h3><p>Use Virtual Try-On on eligible frames and check measurements.</p>
            </li>
            <li>
              <span className="step-number">03</span>
              <div className="step-icon step-icon--lens" aria-hidden="true"><svg viewBox="0 0 90 44"><circle cx="45" cy="22" r="18" /><path d="M45 4v36M27 22h36" /></svg></div>
              <h3>Make them yours</h3><p>Add your prescription and choose the lens options you need.</p>
            </li>
          </ol>
        </section>

        <section className="section lens-section" id="lenses" aria-labelledby="lenses-title">
          <div className="lens-heading" data-reveal>
            <div><p className="eyebrow">Beyond the frame</p><h2 id="lenses-title">Lenses built around real life.</h2></div>
            <p>Customize eligible frames with prescription, blue-light, and sun-ready options based on how you see the world.</p>
          </div>

          <div className="lens-layout" data-reveal>
            <article className="lens-card lens-card--screen">
              <div className="lens-card__art lens-card__art--screen" aria-hidden="true"><span className="screen-shape" /><span className="lens-circle">BL</span></div>
              <span className="lens-card__index">01</span><h3>Blue-light options</h3><p>Explore lenses designed with digital screen time in mind.</p>
            </article>
            <article className="lens-card lens-card--sun">
              <div className="lens-card__art lens-card__art--sun" aria-hidden="true"><span className="sun-disc" /><span className="lens-circle">UV</span></div>
              <span className="lens-card__index">02</span><h3>Sun-ready choices</h3><p>Discover tinted, polarized, and photochromic lens options.</p>
            </article>
            <article className="lens-card lens-card--everyday">
              <div className="lens-card__art lens-card__art--everyday" aria-hidden="true"><span className="prescription-lines" /><span className="lens-circle">Rx</span></div>
              <span className="lens-card__index">03</span><h3>Everyday prescription</h3><p>Choose the prescription lens type that supports your needs.</p>
            </article>
          </div>

          <div className="lens-action" data-reveal>
            <TrackedLink className="button button--outline" href={ZENNI_LINKS.all} ctaName="Start With A Frame" section="lenses">
              Start with a frame <ArrowIcon />
            </TrackedLink>
          </div>
        </section>

        <section className="final-cta" aria-labelledby="final-title">
          <div className="final-cta__shape final-cta__shape--one" aria-hidden="true" />
          <div className="final-cta__shape final-cta__shape--two" aria-hidden="true" />
          <div className="final-cta__content" data-reveal>
            <p className="eyebrow">A fresh view starts here</p>
            <h2 id="final-title">See yourself in something new.</h2>
            <p>Find a pair that works with your vision, your style, and your day.</p>
            <div className="button-row button-row--center">
              <TrackedLink className="button button--dark" href={ZENNI_LINKS.all} ctaName="Browse All Glasses" section="final_cta">
                Browse all glasses <ArrowIcon />
              </TrackedLink>
              <TrackedLink className="button button--text-dark" href={ZENNI_LINKS.home} ctaName="Visit Zenni Optical" section="final_cta">
                Visit Zenni Optical <ArrowIcon />
              </TrackedLink>
            </div>
          </div>
          <svg className="final-cta__glasses" viewBox="0 0 420 190" aria-hidden="true"><path d="M14 68c3-29 27-51 56-51h76c32 0 58 26 58 58v30c0 32-26 58-58 58H70c-31 0-56-25-56-56V68Zm202 7c0-32 26-58 58-58h76c29 0 53 22 56 51v39c0 31-25 56-56 56h-76c-32 0-58-26-58-58V75Zm-12 11c4-6 8-8 12 0M14 67 1 54m405 13 13-13" /></svg>
        </section>
      </main>

      <footer className="site-footer">
        <Brand />
        <p>Independent technical concept created for a frontend assessment. This page is not affiliated with or endorsed by Zenni Optical.</p>
        <TrackedLink href={ZENNI_LINKS.home} ctaName="Official Zenni Website" section="footer">Official Zenni website <ArrowIcon /></TrackedLink>
        <span>© {new Date().getFullYear()} Concept project</span>
      </footer>

      <TrackedLink className="mobile-sticky-cta" href={ZENNI_LINKS.all} ctaName="Shop Frames Mobile" section="mobile_sticky">
        Shop frames <ArrowIcon />
      </TrackedLink>
    </>
  )
}

export default App
