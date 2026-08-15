import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Authentication',
}

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1F2252] px-4">
      <div className="w-full max-w-sm rounded-2xl border border-[#33355c] bg-[#292D68] p-8 shadow-none">{children}</div>
    </div>
  )
}
