"use client";
import type React from "react";
import { useEffect, useRef, useMemo } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import {
	CSS2DRenderer,
	CSS2DObject,
} from "three/examples/jsm/renderers/CSS2DRenderer";
import { useTheme } from "next-themes";

const defaultConfig = {
	gridColor: "#4a5568", // Darker gray for tactical look
	axisColor: "#a0aec0", // Lighter gray for axes
	labelColor: "#e2e8f0", // Light color for labels
	areaOpacity: 0.3,
	dotOpacity: 1,
	dotRadius: 2,
	strokeWidth: 2,
	levels: 5,
	labelFontSize: "11px",
	titleFontSize: "16px",
	colorScheme: [
		"#48bb78", // Green
		"#4299e1", // Blue
		"#ed8936", // Orange
		"#ecc94b", // Yellow
		"#9f7aea", // Purple
	],
};

interface Axis {
	axis: string;
	value: number;
}

export interface RadarChartProps {
	data: Array<{
		name: string;
		axes: Axis[];
		color?: string;
	}>;
	width: number;
	height: number;
	title?: string;
	config?: Partial<typeof defaultConfig>;
}

export const RadarChart: React.FC<RadarChartProps> = ({
	data,
	width,
	height,
	title,
	config = {},
}) => {
	const mountRef = useRef<HTMLDivElement>(null);
	const { theme } = useTheme();

	const chartConfig = useMemo(
		() => ({ ...defaultConfig, ...config }),
		[config],
	);

	useEffect(() => {
		if (!mountRef.current) return;

		const scene = new THREE.Scene();
		const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
		const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
		renderer.setSize(width, height);
		renderer.setClearColor(0x000000, 0);
		mountRef.current.appendChild(renderer.domElement);

		// Set up CSS2DRenderer
		const labelRenderer = new CSS2DRenderer();
		labelRenderer.setSize(width, height);
		labelRenderer.domElement.style.position = "absolute";
		labelRenderer.domElement.style.top = "0";
		labelRenderer.domElement.style.pointerEvents = "none";
		mountRef.current.appendChild(labelRenderer.domElement);

		camera.position.set(0, 0, 1.5);

		const controls = new OrbitControls(camera, renderer.domElement);
		controls.enableRotate = true;
		controls.enablePan = false;
		controls.enableZoom = false;
		controls.autoRotate = false;
		controls.minPolarAngle = Math.PI / 2 - 0.2; // Limit vertical rotation
		controls.maxPolarAngle = Math.PI / 2 + 0.2;
		controls.minAzimuthAngle = -0.2; // Limit horizontal rotation
		controls.maxAzimuthAngle = 0.2;

		// Spring effect variables
		let targetRotationX = 0;
		let targetRotationY = 0;
		const springStrength = 0.1;

		const polarToCartesian = (angle: number, value: number) => {
			return new THREE.Vector3(
				Math.cos(angle) * value,
				Math.sin(angle) * value,
				0,
			);
		};

		const gridColor = new THREE.Color(chartConfig.gridColor);
		const axisColor = new THREE.Color(chartConfig.axisColor);
		const labelColor = new THREE.Color(chartConfig.labelColor);

		const colorScheme = chartConfig.colorScheme.map((c) => new THREE.Color(c));

		const maxValue = Math.max(
			...data.flatMap((d) => d.axes.map((a) => a.value)),
		);
		const axisCount = data[0].axes.length;
		const angleStep = (Math.PI * 2) / axisCount;

		// Add grid circles and labels
		for (let i = 1; i <= chartConfig.levels; i++) {
			const radius = (i / chartConfig.levels) * 0.8;
			const geometry = new THREE.CircleGeometry(radius, 64);
			const material = new THREE.LineBasicMaterial({
				color: gridColor,
				transparent: true,
				opacity: 0.4,
			});
			const circle = new THREE.LineLoop(geometry, material);
			scene.add(circle);

			// Add grid value labels
			const label = document.createElement("div");
			label.className = "radar-label";
			label.textContent = `${Math.round((i / chartConfig.levels) * maxValue)}`;
			label.style.color = chartConfig.labelColor;
			label.style.fontSize = "10px";
			const labelObject = new CSS2DObject(label);
			labelObject.position.set(radius, 0, 0);
			scene.add(labelObject);
		}

		// Add axes and labels
		for (let i = 0; i < axisCount; i++) {
			const axisGeometry = new THREE.BufferGeometry().setFromPoints([
				new THREE.Vector3(0, 0, 0),
				polarToCartesian(i * angleStep, 0.8),
			]);
			const axisMaterial = new THREE.LineBasicMaterial({
				color: axisColor,
				opacity: 0.7,
			});
			const axisLine = new THREE.Line(axisGeometry, axisMaterial);
			scene.add(axisLine);

			// Add axis labels
			const label = document.createElement("div");
			label.className = "radar-label";
			label.textContent = data[0].axes[i].axis;
			label.style.color = chartConfig.labelColor;
			label.style.fontSize = chartConfig.labelFontSize;
			const labelObject = new CSS2DObject(label);
			const labelPosition = polarToCartesian(i * angleStep, 0.85);
			labelObject.position.set(labelPosition.x, labelPosition.y, 0);
			scene.add(labelObject);
		}

		const radarGroups: THREE.Group[] = [];

		// Create radar layers
		data.forEach((item, dataIndex) => {
			const radarGroup = new THREE.Group();
			const points = item.axes.map((axis, i) =>
				polarToCartesian(i * angleStep, (axis.value / maxValue) * 0.8),
			);

			const shape = new THREE.Shape();
			shape.moveTo(points[0].x, points[0].y);
			points.forEach((point, i) => {
				if (i > 0) shape.lineTo(point.x, point.y);
			});
			shape.closePath();

			const geometry = new THREE.ShapeGeometry(shape);
			const material = new THREE.MeshBasicMaterial({
				color: item.color
					? new THREE.Color(item.color)
					: colorScheme[dataIndex % colorScheme.length],
				side: THREE.DoubleSide,
				transparent: true,
				opacity: chartConfig.areaOpacity,
			});
			const mesh = new THREE.Mesh(geometry, material);
			radarGroup.add(mesh);

			const outlineGeometry = new THREE.BufferGeometry().setFromPoints(points);
			const outlineMaterial = new THREE.LineBasicMaterial({
				color: material.color,
				linewidth: chartConfig.strokeWidth,
			});
			const outline = new THREE.LineLoop(outlineGeometry, outlineMaterial);
			radarGroup.add(outline);

			// Add glowing effect
			const glowMaterial = new THREE.ShaderMaterial({
				uniforms: {
					color: { value: new THREE.Color(material.color) },
					glowIntensity: { value: 0.5 },
				},
				vertexShader: `
					varying vec3 vNormal;
					void main() {
						vNormal = normalize(normalMatrix * normal);
						gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
					}
				`,
				fragmentShader: `
					uniform vec3 color;
					uniform float glowIntensity;
					varying vec3 vNormal;
					void main() {
						float intensity = pow(0.7 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 4.0);
						gl_FragColor = vec4(color, intensity * glowIntensity);
					}
				`,
				side: THREE.FrontSide,
				blending: THREE.AdditiveBlending,
				transparent: true,
			});
			const glowMesh = new THREE.Mesh(geometry, glowMaterial);
			glowMesh.scale.multiplyScalar(1.05);
			radarGroup.add(glowMesh);

			// Add data value indicators and labels
			points.forEach((point, i) => {
				const indicatorGeometry = new THREE.SphereGeometry(0.01, 32, 32);
				const indicatorMaterial = new THREE.MeshBasicMaterial({
					color: material.color,
					opacity: 1,
					transparent: true,
				});
				const indicator = new THREE.Mesh(indicatorGeometry, indicatorMaterial);
				indicator.position.set(point.x, point.y, 0.01);
				radarGroup.add(indicator);

				// Add value label
				const label = document.createElement("div");
				label.className = "radar-label";
				label.textContent = item.axes[i].value.toString();
				label.style.color = "#000000"; // Dark color for better visibility
				label.style.fontSize = "10px";
				label.style.backgroundColor = "rgba(255, 255, 255, 0.7)"; // Semi-transparent white background
				label.style.padding = "2px 4px";
				label.style.borderRadius = "2px";
				const labelObject = new CSS2DObject(label);

				// Calculate label position
				const labelOffset = 0.03; // Adjust this value to fine-tune label distance from the point
				const angle = i * angleStep;
				const labelX = point.x + Math.cos(angle) * labelOffset;
				const labelY = point.y + Math.sin(angle) * labelOffset;
				labelObject.position.set(labelX, labelY, 0);

				radarGroup.add(labelObject);
			});

			for (const point of points) {
				const dotGeometry = new THREE.SphereGeometry(
					chartConfig.dotRadius / 100,
					32,
					32,
				);
				const dotMaterial = new THREE.MeshBasicMaterial({
					color: material.color,
					opacity: chartConfig.dotOpacity,
					transparent: true,
				});
				const dot = new THREE.Mesh(dotGeometry, dotMaterial);
				dot.position.set(point.x, point.y, 0);
				radarGroup.add(dot);
			}

			radarGroup.position.z = 0.1 * (dataIndex + 1);
			radarGroups.push(radarGroup);
			scene.add(radarGroup);
		});

		// Add tactical grid overlay
		const gridHelper = new THREE.GridHelper(2, 20, 0x4a5568, 0x4a5568);
		gridHelper.rotation.x = Math.PI / 2;
		gridHelper.position.z = -0.1;
		scene.add(gridHelper);

		// Animation
		let frame = 0;
		const animate = () => {
			requestAnimationFrame(animate);
			frame += 0.01;

			// Apply spring effect
			camera.rotation.x +=
				(targetRotationX - camera.rotation.x) * springStrength;
			camera.rotation.y +=
				(targetRotationY - camera.rotation.y) * springStrength;

			// Gradually return to original position
			targetRotationX *= 0.95;
			targetRotationY *= 0.95;

			radarGroups.forEach((group, index) => {
				group.position.z = 0.1 * (index + 1) + Math.sin(frame + index) * 0.05;
				group.rotation.z = Math.sin(frame * 0.5 + index) * 0.05;

				const glowMesh = group.children.find(
					(child) =>
						child instanceof THREE.Mesh &&
						child.material instanceof THREE.ShaderMaterial,
				) as THREE.Mesh;
				if (glowMesh && glowMesh.material instanceof THREE.ShaderMaterial) {
					glowMesh.material.uniforms.glowIntensity.value =
						0.5 + Math.sin(frame * 2 + index) * 0.2;
				}
			});

			controls.update();
			renderer.render(scene, camera);
			labelRenderer.render(scene, camera);
		};
		animate();

		// Add event listeners for mouse interaction
		let isDragging = false;
		let previousMousePosition = { x: 0, y: 0 };

		renderer.domElement.addEventListener("mousedown", (e) => {
			isDragging = true;
			previousMousePosition = { x: e.clientX, y: e.clientY };
		});

		renderer.domElement.addEventListener("mousemove", (e) => {
			if (isDragging) {
				const deltaMove = {
					x: e.clientX - previousMousePosition.x,
					y: e.clientY - previousMousePosition.y,
				};

				targetRotationY += deltaMove.x * 0.01;
				targetRotationX -= deltaMove.y * 0.01;

				// Clamp rotation values
				targetRotationY = Math.max(Math.min(targetRotationY, 0.2), -0.2);
				targetRotationX = Math.max(Math.min(targetRotationX, 0.2), -0.2);

				previousMousePosition = { x: e.clientX, y: e.clientY };
			}
		});

		renderer.domElement.addEventListener("mouseup", () => {
			isDragging = false;
		});

		// Resize handler
		const handleResize = () => {
			const newWidth = mountRef.current?.clientWidth || width;
			const newHeight = mountRef.current?.clientHeight || height;

			camera.aspect = newWidth / newHeight;
			camera.updateProjectionMatrix();

			renderer.setSize(newWidth, newHeight);
			labelRenderer.setSize(newWidth, newHeight);
		};

		window.addEventListener("resize", handleResize);

		return () => {
			if (mountRef.current) {
				mountRef.current.removeChild(renderer.domElement);
				mountRef.current.removeChild(labelRenderer.domElement);
			}
			renderer.dispose();
			window.removeEventListener("resize", handleResize);
		};
	}, [data, width, height, chartConfig]);

	return <div ref={mountRef} style={{ width, height, position: "relative" }} />;
};
