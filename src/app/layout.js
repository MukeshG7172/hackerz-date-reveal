import { Inter } from 'next/font/google'
import Image from 'next/image'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Quiz App',
  description: 'Interactive Quiz Application',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} relative`}>
        <div className="absolute top-4 right-4 z-10">
          <Image 
            src="/logo1.png" 
            alt="Logo" 
            width={120} 
            height={120} 
            className="object-contain mt-[15px]"
          />
        </div>
        {children}
      </body>
    </html>
  )
}