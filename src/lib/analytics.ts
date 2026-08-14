interface YandexMetrikaFunction {
  (...args: unknown[]): void
  a?: unknown[][]
  l?: number
}

declare global {
  interface Window {
    dataLayer: unknown[]
    gtag?: (...args: unknown[]) => void
    ym?: YandexMetrikaFunction
  }
}

const analyticsIds = {
  ga: import.meta.env.VITE_GA_ID?.trim(),
  gtm: import.meta.env.VITE_GTM_ID?.trim(),
  ym: import.meta.env.VITE_YM_ID?.trim(),
}

let initialized = false

function addAsyncScript(id: string, src: string) {
  if (document.getElementById(id)) return
  const script = document.createElement('script')
  script.id = id
  script.async = true
  script.src = src
  document.head.appendChild(script)
}

function getDataLayer() {
  window.dataLayer = window.dataLayer || []
  return window.dataLayer
}

function initializeGtm() {
  if (!analyticsIds.gtm || !/^GTM-[A-Z0-9]+$/i.test(analyticsIds.gtm)) return
  getDataLayer().push({ 'gtm.start': Date.now(), event: 'gtm.js' })
  addAsyncScript('gtm-script', `https://www.googletagmanager.com/gtm.js?id=${encodeURIComponent(analyticsIds.gtm)}`)
}

function initializeGa() {
  if (!analyticsIds.ga || !/^G-[A-Z0-9]+$/i.test(analyticsIds.ga)) return
  window.gtag = (...args: unknown[]) => getDataLayer().push(args)
  window.gtag('js', new Date())
  window.gtag('config', analyticsIds.ga, { send_page_view: true })
  addAsyncScript('ga4-script', `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(analyticsIds.ga)}`)
}

function initializeYandexMetrika() {
  if (!analyticsIds.ym || !/^\d+$/.test(analyticsIds.ym)) return
  const ym: YandexMetrikaFunction = (...args: unknown[]) => {
    ym.a = ym.a || []
    ym.a.push(args)
  }
  ym.l = Date.now()
  window.ym = ym
  addAsyncScript('yandex-metrika-script', 'https://mc.yandex.ru/metrika/tag.js')
  window.ym(Number(analyticsIds.ym), 'init', {
    clickmap: true,
    trackLinks: true,
    accurateTrackBounce: true,
    webvisor: true,
  })
}

export function initializeAnalytics() {
  if (initialized || typeof window === 'undefined') return
  initialized = true
  initializeGtm()
  initializeGa()
  initializeYandexMetrika()
}

type CtaEvent = { name: string; section: string; url: string }

export function trackCta({ name, section, url }: CtaEvent) {
  const eventData = { cta_name: name, cta_section: section, destination_url: url }
  getDataLayer().push({ event: 'cta_click', ...eventData })
  window.gtag?.('event', 'cta_click', eventData)

  if (analyticsIds.ym && /^\d+$/.test(analyticsIds.ym)) {
    window.ym?.(Number(analyticsIds.ym), 'reachGoal', 'cta_click', eventData)
  }
}

export {}
