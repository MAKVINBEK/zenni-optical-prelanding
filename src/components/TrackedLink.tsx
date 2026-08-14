import type { AnchorHTMLAttributes, ReactNode } from 'react'
import { trackCta } from '../lib/analytics'

type TrackedLinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> & {
  href: string
  ctaName: string
  section: string
  children: ReactNode
}

export function TrackedLink({ href, ctaName, section, children, onClick, ...props }: TrackedLinkProps) {
  return (
    <a
      {...props}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={(event) => {
        trackCta({ name: ctaName, section, url: href })
        onClick?.(event)
      }}
    >
      {children}
    </a>
  )
}
