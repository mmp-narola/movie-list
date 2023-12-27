import { Inter } from 'next/font/google'
import './globals.css'
import image from './Vectors.png'
import Image from 'next/image'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-background`} >
        {children}
        <Image src={image} alt="Image description" style={{
          width: '100%',
          bottom: 0
        }}
        />
      </body>
    </html>
  )
}