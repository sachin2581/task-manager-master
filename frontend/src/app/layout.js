// "use client";
// import { Geist, Geist_Mono } from "next/font/google";
// import "./globals.css";
// import Link from "next/link";
// import { usePathname } from "next/navigation";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

// export default function RootLayout({ children }) {
//   const pathname = usePathname();
//   return (
//     <html lang="en">
//       <body
//         className={`${geistSans.variable} ${geistMono.variable} antialiased`}
//       >
//         {pathname !== "/" && (
//           <div className="bg-blue-500 text-white">
//             <div className="container p-3 flex justify-between">
//               <div className="text-2xl font-medium">
//                 <Link
//                   href="/dashboard"
//                   className="text-white text-decoration-none"
//                 >
//                   Task Manager
//                 </Link>
//               </div>
              
//             </div>
//           </div>
//         )}

//         {children}
//         {pathname !== "/" && (
//           <div className="bg-body-secondary">
//             <div className="container p-3 text-center">
//               &#169; {new Date().getFullYear()} Task Manager. All Right Reserved
//             </div>
//           </div>
//         )}
//       </body>
//     </html>
//   );
// }

"use client";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaTasks } from "react-icons/fa";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  const pathname = usePathname();
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50`}>
        {/* Header */}
        {pathname !== "/" && (
          <header className="sticky top-0 z-50 bg-blue-600 text-white shadow-md">
            <div className="max-w-7xl mx-auto px-5 py-3 flex items-center justify-between">
              {/* Logo */}
              <Link href="/dashboard" className="flex items-center gap-2 text-white">
                <FaTasks className="text-2xl" />
                <span className="text-xl font-semibold">Task Manager</span>
              </Link>

              {/* Future Nav Links (expandable) */}
              <nav className="hidden md:flex gap-6 text-sm font-medium">
                <Link href="/dashboard" className="hover:text-gray-200 transition">
                  Dashboard
                </Link>
                <Link href="/tasks" className="hover:text-gray-200 transition">
                  Tasks
                </Link>
                <Link href="/profile" className="hover:text-gray-200 transition">
                  Profile
                </Link>
              </nav>
            </div>
          </header>
        )}

        {/* Main Content */}
        <main className="min-h-[80vh]">{children}</main>

        {/* Footer */}
        {pathname !== "/" && (
          <footer className="bg-gray-100 border-t border-gray-200 mt-10">
            <div className="max-w-7xl mx-auto px-5 py-4 text-center text-sm text-gray-600">
              © {new Date().getFullYear()} <span className="font-semibold">Task Manager</span>. All rights reserved.
            </div>
          </footer>
        )}
      </body>
    </html>
  );
}
