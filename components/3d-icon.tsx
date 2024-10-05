import type React from "react";
import { useRef, useEffect } from "react";
import * as THREE from "three";

interface ThreeDIconProps {
	iconPath: string;
	size?: number;
	color?: string;
	rotationSpeed?: number;
}

const ThreeDIcon: React.FC<ThreeDIconProps> = ({
	iconPath,
	size = 100,
	color = "#ffffff",
	rotationSpeed = 0.01,
}) => {
	const mountRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!mountRef.current) return;

		// Set up scene
		const scene = new THREE.Scene();
		const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
		const renderer = new THREE.WebGLRenderer({ alpha: true });
		renderer.setSize(size, size);
		mountRef.current.appendChild(renderer.domElement);

		// Create icon
		const loader = new THREE.TextureLoader();
		const texture = loader.load(iconPath);
		const geometry = new THREE.PlaneGeometry(1, 1);
		const material = new THREE.MeshBasicMaterial({
			map: texture,
			color: color,
			transparent: true,
		});
		const icon = new THREE.Mesh(geometry, material);
		scene.add(icon);

		camera.position.z = 1.5;

		// Animation
		const animate = () => {
			requestAnimationFrame(animate);
			icon.rotation.y += rotationSpeed;
			renderer.render(scene, camera);
		};
		animate();

		// Clean up
		return () => {
			mountRef.current?.removeChild(renderer.domElement);
		};
	}, [iconPath, size, color, rotationSpeed]);

	return <div ref={mountRef} style={{ width: size, height: size }} />;
};

export default ThreeDIcon;
