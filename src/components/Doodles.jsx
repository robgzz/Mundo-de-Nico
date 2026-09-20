import React from 'react'

export function BeetleDoodle({ className = '' }) {
  return <svg className={className} viewBox="0 0 160 120" aria-hidden="true">
    <g fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round">
      <ellipse cx="80" cy="70" rx="28" ry="32" />
      <path d="M80 38V99M66 46C54 29 60 15 79 14c19 1 25 15 13 32" />
      <path d="M78 14 88 4M64 57 43 43M96 57l21-14M60 75l-28 3M100 75l28 3M64 92l-21 18M96 92l21 18" />
      <circle cx="69" cy="49" r="2" fill="currentColor" stroke="none" /><circle cx="91" cy="49" r="2" fill="currentColor" stroke="none" />
    </g>
  </svg>
}

export function MiloDoodle({ className = '' }) {
  return <svg className={className} viewBox="0 0 180 150" aria-hidden="true">
    <g fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M52 58 45 24l29 20c10-5 22-5 32 0l29-20-7 35c13 13 17 34 7 51-11 20-35 26-57 21-26-6-41-27-35-49 2-9 5-16 9-24Z" />
      <path d="M72 79c-7-5-14-5-20-1M108 79c7-5 14-5 20-1M79 94c6 5 16 5 22 0M90 89v8" />
      <path d="M43 98 12 91M44 107 10 110M136 98l32-7M136 107l34 3" />
      <path d="M128 116c18 8 28 0 26-13-2-10-14-15-23-9" />
      <circle cx="66" cy="75" r="3" fill="currentColor" stroke="none" /><circle cx="114" cy="75" r="3" fill="currentColor" stroke="none" />
    </g>
  </svg>
}

export function StoneDoodle({ className = '' }) {
  return <svg className={className} viewBox="0 0 160 110" aria-hidden="true">
    <g fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M24 82c7-33 29-51 55-50 29 0 49 18 57 50-35 11-79 11-112 0Z" />
      <path d="M45 67c18 7 50 7 70-1M62 48c12-5 29-5 40 0" opacity=".55" />
    </g>
  </svg>
}

export function PuddleDoodle({ className = '' }) {
  return <svg className={className} viewBox="0 0 180 110" aria-hidden="true">
    <g fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 69c8-13 23-16 37-15 12-20 49-24 65-7 16-2 34 4 38 17 5 17-19 25-48 26-31 3-76 2-91-7-7-4-7-9-1-14Z" />
      <path d="M60 66c15-8 42-8 59 0M74 76c10-4 23-4 33 0" opacity=".55" />
    </g>
  </svg>
}
