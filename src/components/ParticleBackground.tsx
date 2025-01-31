import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const ParticleBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mousePosition = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!containerRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    containerRef.current.appendChild(renderer.domElement);

    // Create particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 2000;
    const posArray = new Float32Array(particlesCount * 3);
    
    for(let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 5;
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

    // Create lines
    const linesMaterial = new THREE.LineBasicMaterial({
      color: '#F97316',
      transparent: true,
      opacity: 0.2,
    });

    const pointsMaterial = new THREE.PointsMaterial({
      size: 0.005,
      color: '#F97316',
      transparent: true,
      opacity: 0.8,
    });

    const particlesMesh = new THREE.Points(particlesGeometry, pointsMaterial);
    
    // Create lines between particles
    const linesGeometry = new THREE.BufferGeometry();
    const linePositions = [];
    const positions = particlesGeometry.attributes.position.array;
    
    for(let i = 0; i < positions.length; i += 3) {
      for(let j = i + 3; j < positions.length; j += 3) {
        const distance = Math.sqrt(
          Math.pow(positions[i] - positions[j], 2) +
          Math.pow(positions[i + 1] - positions[j + 1], 2) +
          Math.pow(positions[i + 2] - positions[j + 2], 2)
        );
        
        if(distance < 0.5) {
          linePositions.push(positions[i], positions[i + 1], positions[i + 2]);
          linePositions.push(positions[j], positions[j + 1], positions[j + 2]);
        }
      }
    }
    
    linesGeometry.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
    const linesMesh = new THREE.LineSegments(linesGeometry, linesMaterial);
    
    scene.add(particlesMesh);
    scene.add(linesMesh);
    camera.position.z = 2;

    const handleMouseMove = (event: MouseEvent) => {
      mousePosition.current = {
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: -(event.clientY / window.innerHeight) * 2 + 1,
      };
    };

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);

    const animate = () => {
      requestAnimationFrame(animate);
      particlesMesh.rotation.x += 0.0001;
      particlesMesh.rotation.y += 0.0001;
      linesMesh.rotation.x += 0.0001;
      linesMesh.rotation.y += 0.0001;

      // Follow mouse with slight delay
      particlesMesh.rotation.x += (mousePosition.current.y * 0.5 - particlesMesh.rotation.x) * 0.05;
      particlesMesh.rotation.y += (mousePosition.current.x * 0.5 - particlesMesh.rotation.y) * 0.05;
      linesMesh.rotation.x += (mousePosition.current.y * 0.5 - linesMesh.rotation.x) * 0.05;
      linesMesh.rotation.y += (mousePosition.current.x * 0.5 - linesMesh.rotation.y) * 0.05;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      containerRef.current?.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="fixed top-0 left-0 w-full h-full -z-10" 
      style={{ pointerEvents: 'none' }}
    />
  );
};

export default ParticleBackground;