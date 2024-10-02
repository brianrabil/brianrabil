"use client";
import matrixGridData from "public/portrait-dot-matrix.json";
import React, { useRef, useEffect, useState } from "react";

interface Particle {
	x: number;
	y: number;
	originalX: number;
	originalY: number;
}

interface Mouse {
	x: number;
	y: number;
	radius: number;
}

/**
 * A dot matrix animation.
 * @returns The dot matrix animation.
 * @example
 * ```tsx
 * <DotMatrix />
 * ```
 */
export default function DotMatrix() {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const [isDarkMode, setIsDarkMode] = useState(false);

	useEffect(() => {
		const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
		const handleChange = (event: MediaQueryListEvent) => {
			setIsDarkMode(event.matches);
		};

		console.log(mediaQuery);

		// Set initial color mode
		setIsDarkMode(mediaQuery.matches);

		// Listen for changes in color scheme
		mediaQuery.addListener(handleChange);

		return () => {
			mediaQuery.removeListener(handleChange);
		};
	}, []);

	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;

		const ctx = canvas.getContext("2d");
		if (!ctx) return;

		const spacing = 10;
		const dotSize = 2;
		const cursorRadius = 10;
		const cursorForce = 0.5;
		const returnSpeed = 0.2;

		console.log(matrixGridData.length);

		const particles: Particle[] = (matrixGridData as Particle[]).map(
			({ x, y }) => ({
				x: x * spacing,
				y: y * spacing,
				originalX: x * spacing,
				originalY: y * spacing,
			}),
		);

		// Set canvas dimensions based on the dot data
		const maxX = Math.max(0, ...particles.map((particle) => particle.x));
		const maxY = Math.max(0, ...particles.map((particle) => particle.y));
		canvas.width = maxX + spacing;
		canvas.height = maxY + spacing;

		// Animation loop
		const animate = () => {
			ctx.clearRect(0, 0, canvas.width, canvas.height);
			for (const particle of particles) {
				const distanceX = particle.x - mouse.x;
				const distanceY = particle.y - mouse.y;
				const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2);

				if (distance < cursorRadius) {
					const angle = Math.atan2(distanceY, distanceX);
					particle.x += Math.cos(angle) * cursorForce;
					particle.y += Math.sin(angle) * cursorForce;
				} else {
					particle.x += (particle.originalX - particle.x) * returnSpeed;
					particle.y += (particle.originalY - particle.y) * returnSpeed;
				}

				ctx.fillStyle = isDarkMode ? "#ffffff" : "#000000";
				ctx.fillRect(particle.x, particle.y, dotSize, dotSize);
			}
			requestAnimationFrame(animate);
		};

		// Mouse object
		const mouse: Mouse = {
			x: 0,
			y: 0,
			radius: 100,
		};

		// Mouse event listeners
		canvas.addEventListener("mousemove", (event) => {
			mouse.x = event.clientX - canvas.offsetLeft;
			mouse.y = event.clientY - canvas.offsetTop;
		});

		animate();
	}, [isDarkMode]);

	return <canvas ref={canvasRef} />;
}
