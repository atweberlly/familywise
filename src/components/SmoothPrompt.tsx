import { useEffect, useState } from 'react'
import Link from 'next/link'

/*
userStatus is for debugging only don't use it.
*/
export default function SmoothPrompt({ description, route, userStatus }: any) {
  const [isBlinking, setBlinking] = useState(false)

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth', // Use smooth scrolling behavior
    })
  }

  useEffect(() => {
    if (userStatus === 'false') {
      // Show content and start blinking animation
      setBlinking(true)

      // After a delay, stop the blinking animation
      const timeoutId = setTimeout(() => {
        setBlinking(false)
      }, 3000) // Adjust the delay time as needed

      // Clean up the timeout to prevent memory leaks
      return () => clearTimeout(timeoutId)
    }
  }, [userStatus])

  if (userStatus === 'false') {
    // Show content
    scrollToTop()
  } else {
    return null
  }

  return (
    <div className={`absolute my-4 flex ${isBlinking ? 'blink' : ''}`}>
      {description}
      <span>
        <Link
          className="mx-2 rounded-lg bg-orange-500 px-3 text-center font-semibold text-white transition-colors hover:bg-orange-600"
          href={`/checkout/${route}`}
        >
          Yes
        </Link>
      </span>
      <style jsx>{`
        @keyframes blink {
          50% {
            opacity: 0;
          }
        }

        .blink {
          animation: blink 2s infinite;
        }
      `}</style>
    </div>
  )
}
