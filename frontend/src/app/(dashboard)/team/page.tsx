'use client'

import { useState } from 'react'

const teamMembers = [
	{
		name: 'Triet Tu',
		role: 'Product Manager',
		image: '/images/team/TT.jpg',
		blurb: "Triet is the PM for the team. He's currently studying a Bachelor of IT while working at Dan Murphy's and ITHERO. Based in Melbourne's west, he's a fan of party games and enjoys catching up with friends.",
	},
	{
		name: 'Winnie Lewis',
		role: 'Developer',
		image: '/images/team/WL.jpg',
		blurb:
			'Winnie is a Developer on the team. Employeed at Midcoast Council, they enjoy being about the bush and laying in the sun.',
	},
	{
		name: 'Mihindukulasuriya Fernando',
		role: 'Developer',
		image: '/images/team/MF2.jpg',
		blurb:
			'Mihindukulasuriya Thiserage Jude Thisal Fernando is a 23-year-old international student and one of the developers on the team. I am currently completing my final semester at RMIT University and live in Rockbank, Melbourne. I am looking forward to working together and contributing to the Team. ',
	},
	{
		name: 'Kareem Khleifat',
		role: 'Business Analyst',
		image: '/images/team/kk.jpg',
		blurb:
			'Kareem is the Business Analyst on the team. Based in Melbourne, Australia, Kareem works part time at a retail giant, The Good Guys. Completing his bachelor of IT while studying fulltime, he hopes to complete his studies to go on and commit to a job in a field of IT in the future.',
	},
	{
		name: 'Michael Fajardo',
		role: 'UX Designer',
		image: '/images/team/MF.jpg',
		blurb:
			"Michael is the team's UX Designer, studying a Bachelor of IT and working casually as a security control room operator. Based in Melbourne's south-east, he's a fan of survival and simulator games in his downtime.",
	},
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
		<div className="min-h-full bg-[#131427] px-4 py-6 text-white sm:px-6">
			<div className="space-y-6">
				<div>
					<h1 className="text-2xl font-bold tracking-tight text-white">Team</h1>
					<p className="mt-1 text-sm text-[#9c9dc4]">Meet the people behind the work.</p>
				</div>

				<div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
					{teamMembers.map((member) => {
						const isExpanded = expandedMembers[member.name] ?? false
						const showToggle = member.blurb.length > 140

						return (
							<div
								key={member.name}
								className="rounded-xl border border-[#2a2d4d] bg-[#1c1e3c] p-5 shadow-sm transition-colors"
							>
								<div className="flex flex-col items-center text-center">
									<img
										src={member.image}
										alt={member.name}
										className="h-20 w-20 rounded-full object-cover ring-2 ring-[#2a2d4d]/80"
									/>

									<h2 className="mt-4 text-lg font-semibold text-white">{member.name}</h2>

									<p className="mt-1 text-sm font-medium text-[#9c9dc4]">{member.role}</p>

									<div className="mt-3 w-full">
										<p className="text-sm leading-6 text-[#9c9dc4]">
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
										</p>

										{showToggle && (
											<button
												type="button"
												onClick={() => toggleExpanded(member.name)}
												className="mx-auto mt-2 block w-fit text-center text-sm font-medium text-white underline-offset-2 hover:underline"
												aria-expanded={isExpanded}
											>
												{isExpanded ? 'less' : '...more'}
											</button>
										)}
									</div>
								</div>
							</div>
						)
					})}
				</div>
			</div>
		</div>
	)
}
