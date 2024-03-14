"use client";
import React, { useEffect, useRef, useState } from "react";

/**
 * A grid of cards.
 * @param children The cards to display.
 * @returns The card grid.
 * @example
 * ```tsx
 * <CardGrid>
 *  <Card title="Card 1" description="Description 1" />
 *  <Card title="Card 2" description="Description 2" />
 * </CardGrid>
 * ```
 */
export function CardGrid({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen  py-3 flex flex-col justify-center sm:py-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6  mx-auto px-4 sm:px-6 lg:px-8">
        {children}
      </div>
    </div>
  );
}

interface CardProps {
  title: string;
  description: string;
}

export default function Card({ title, description }: CardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const card = cardRef.current;
    if (card) {
      const handleMouseMove = (e: MouseEvent) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty("--mouse-x", `${x}px`);
        card.style.setProperty("--mouse-y", `${y}px`);
      };

      const handleMouseLeave = () => {
        card.style.setProperty("--mouse-x", "0");
        card.style.setProperty("--mouse-y", "0");
      };

      card.addEventListener("mousemove", handleMouseMove);
      card.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        card.removeEventListener("mousemove", handleMouseMove);
        card.removeEventListener("mouseleave", handleMouseLeave);
      };
    }
  }, []);

  useEffect(() => {
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    setIsDarkMode(prefersDark);
  }, []);

  const cardBgColor = isDarkMode ? "bg-gray-800" : "bg-white";
  const cardTextColor = isDarkMode ? "text-white" : "text-gray-800";
  const cardDescColor = isDarkMode ? "text-gray-300" : "text-gray-600";

  return (
    <div
      ref={cardRef}
      className={`relative p-6 ${cardBgColor} bg-opacity-10 rounded-lg shadow-md backdrop-filter backdrop-blur-md transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg overflow-hidden`}
    >
      <div className="relative z-10">
        <h2 className={`text-2xl font-bold mb-2 ${cardTextColor}`}>{title}</h2>
        <p className={cardDescColor}>{description}</p>
      </div>
      <div className="absolute inset-0 border-2 border-transparent rounded-lg pointer-events-none"></div>
    </div>
  );
}
