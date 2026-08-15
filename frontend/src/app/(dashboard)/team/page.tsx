'use client'

import { useState } from 'react'

const teamMembers = [
  {
    name: 'Triet Tan',
    role: 'Product Manager',
    image: '/images/team/triet-tan.svg',
    blurb: 'TBA',
  },
  {
    name: 'Winnie Lewis',
    role: 'Developer',
    image: '/images/team/winnie-lewis.svg',
    blurb:
      'Winnie is one of [n] developers on the team. They work at Midcoast Council full-time, and live in rural NSW. Along with their Programming Project they are also completing a unit of Mathematics for Computing',
  },
  {
    name: 'Mihindukulasuriya Fernando',
    role: 'Developer',
    image: '/images/team/mihindu-fernando.svg',
    blurb:
      'Lorem Ipsum',
  },
  {
    name: 'Kareem Khleifat',
    role: 'Business Analyst',
    image: '/images/team/kareem-khleifat.svg',
    blurb:
      'Long latin text that shows the more button. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',},
  {
    name: 'Michael Fajardo',
    role: 'UX Designer',
    image: '/images/team/michael-fajardo.svg',
    blurb:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'},
]

export default function TeamPage() {
  const [expandedMembers, setExpandedMembers] = useState<Record<string, boolean>>({})

  const toggleExpanded = (name: string) => {
    setExpandedMembers((current) => ({
      ...current,
      [name]: !current[name],
    }))
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Team</h1>
        <p className="mt-1 text-sm text-zinc-500">Meet the people behind the work.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {teamMembers.map((member) => {
          const isExpanded = expandedMembers[member.name] ?? false
          const showToggle = member.blurb.length > 140

          return (
            <div
              key={member.name}
              className="rounded-lg border border-zinc-200 bg-white p-5 shadow-sm transition-colors dark:border-zinc-800 dark:bg-zinc-900"
            >
              <div className="flex flex-col items-center text-center">
                <img
                  src={member.image}
                  alt={member.name}
                  className="h-20 w-20 rounded-full object-cover ring-2 ring-zinc-200 dark:ring-zinc-700"
                />

                <h2 className="mt-4 text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                  {member.name}
                </h2>

                <p className="mt-1 text-sm font-medium text-zinc-600 dark:text-zinc-300">
                  {member.role}
                </p>

                <p className="mt-3 w-full text-sm leading-6 text-zinc-600 dark:text-zinc-300">
                  <span
                    style={
                      showToggle && !isExpanded
                        ? {
                            display: '-webkit-box',
                            WebkitBoxOrient: 'vertical',
                            WebkitLineClamp: 3,
                            overflow: 'hidden',
                          }
                        : undefined
                    }
                  >
                    {member.blurb}
                  </span>

                  {showToggle && (
                    <button
                      type="button"
                      onClick={() => toggleExpanded(member.name)}
                      className="ml-1 inline font-medium text-zinc-700 underline-offset-2 hover:underline dark:text-zinc-200"
                      aria-expanded={isExpanded}
                    >
                      {isExpanded ? 'less' : '...more'}
                    </button>
                  )}
                </p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
