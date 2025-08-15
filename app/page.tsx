"use client";

import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-white relative">
      {/* Main content area */}
      <div className="flex flex-col items-center justify-center min-h-screen p-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Detto</h1>
          <p className="text-lg text-gray-600">Your finances, simplified</p>
        </div>
      </div>

      {/* WeMoney mascot in bottom right corner */}
      <Link
        href="/ai-chat"
        className="fixed bottom-6 right-6 transition-transform hover:scale-110 cursor-pointer"
      >
        <Image
          src="/wemo-mascot.png"
          alt="WeMoney Mascot - Click to start chat"
          width={120}
          height={120}
          className="drop-shadow-lg"
        />
      </Link>
    </div>
  );
}
