import { Canvas } from '@react-three/fiber'
import { ContactShadows, Environment, Float, OrbitControls, PerspectiveCamera } from '@react-three/drei'
import { Suspense } from 'react'
import * as THREE from 'three'

function Panel({ position, rotation = [0, 0, 0] }: { position: [number, number, number], rotation?: [number, number, number] }) {
  return (
    <group position={position} rotation={rotation}>
      <mesh castShadow receiveShadow>
        <boxGeometry args={[0.82, 0.035, 0.56]} />
        <meshStandardMaterial color="#18344b" metalness={0.48} roughness={0.28} />
      </mesh>
      {Array.from({ length: 5 }).map((_, i) => (
        <mesh key={`v-${i}`} position={[-0.33 + i * 0.165, 0.021, 0]}>
          <boxGeometry args={[0.008, 0.006, 0.52]} />
          <meshStandardMaterial color="#a8c6d6" metalness={0.4} roughness={0.3} />
        </mesh>
      ))}
      {Array.from({ length: 3 }).map((_, i) => (
        <mesh key={`h-${i}`} position={[0, 0.022, -0.18 + i * 0.18]}>
          <boxGeometry args={[0.79, 0.006, 0.008]} />
          <meshStandardMaterial color="#a8c6d6" metalness={0.4} roughness={0.3} />
        </mesh>
      ))}
    </group>
  )
}

function SolarHouse() {
  return (
    <group position={[0, -0.3, 0]} rotation={[0, -0.28, 0]}>
      {/* landscaped plinth */}
      <mesh receiveShadow position={[0, -0.17, 0]}>
        <boxGeometry args={[4.8, 0.18, 3.6]} />
        <meshStandardMaterial color="#d6d4c9" roughness={0.95} />
      </mesh>
      <mesh receiveShadow position={[0, -0.07, 0]}>
        <boxGeometry args={[4.35, 0.08, 3.15]} />
        <meshStandardMaterial color="#e8e4d8" roughness={0.9} />
      </mesh>
      {/* house body */}
      <mesh castShadow receiveShadow position={[0, 0.7, 0]}>
        <boxGeometry args={[3.2, 1.55, 2.2]} />
        <meshStandardMaterial color="#f4f0e7" roughness={0.82} />
      </mesh>
      {/* front windows */}
      <mesh position={[-0.72, 0.78, 1.111]}>
        <boxGeometry args={[0.92, 0.86, 0.035]} />
        <meshStandardMaterial color="#8aa5ad" metalness={0.18} roughness={0.24} />
      </mesh>
      <mesh position={[0.55, 0.78, 1.111]}>
        <boxGeometry args={[0.78, 0.86, 0.035]} />
        <meshStandardMaterial color="#8aa5ad" metalness={0.18} roughness={0.24} />
      </mesh>
      <mesh position={[0.02, 0.78, 1.135]}>
        <boxGeometry args={[0.035, 0.88, 0.02]} />
        <meshStandardMaterial color="#f4f0e7" />
      </mesh>
      {/* roof */}
      <mesh castShadow receiveShadow position={[0, 1.68, 0]} rotation={[0, 0, Math.PI / 4]}>
        <boxGeometry args={[2.7, 0.13, 2.7]} />
        <meshStandardMaterial color="#343f46" roughness={0.7} />
      </mesh>
      {/* solar array, slightly angled over roof */}
      <group position={[0, 1.86, 0.08]} rotation={[-0.48, 0, 0]}>
        {[-0.88, 0, 0.88].map((x) => (
          <group key={x}>
            <Panel position={[x, 0, 0.02]} />
            <Panel position={[x, 0, -0.58]} />
          </group>
        ))}
      </group>
      {/* side battery + inverter */}
      <mesh castShadow position={[1.84, 0.42, 0.38]}>
        <boxGeometry args={[0.38, 0.78, 0.46]} />
        <meshStandardMaterial color="#fbfaf6" metalness={0.12} roughness={0.3} />
      </mesh>
      <mesh position={[1.84, 0.43, 0.618]}>
        <boxGeometry args={[0.23, 0.035, 0.015]} />
        <meshStandardMaterial color="#21d4c2" emissive="#21d4c2" emissiveIntensity={0.12} />
      </mesh>
      <mesh castShadow position={[1.84, 0.98, 0.38]}>
        <boxGeometry args={[0.34, 0.4, 0.4]} />
        <meshStandardMaterial color="#e4e7e5" metalness={0.1} roughness={0.3} />
      </mesh>
      <mesh position={[1.84, 1.02, 0.59]}>
        <boxGeometry args={[0.12, 0.035, 0.012]} />
        <meshStandardMaterial color="#21d4c2" emissive="#21d4c2" emissiveIntensity={0.2} />
      </mesh>
      {/* simple trees */}
      {([-1.8, 1.9] as const).map((x, i) => (
        <group key={x} position={[x, 0, i === 0 ? -1.25 : -1.35]}>
          <mesh castShadow position={[0, 0.42, 0]}>
            <cylinderGeometry args={[0.055, 0.08, 0.85, 8]} />
            <meshStandardMaterial color="#8b7658" />
          </mesh>
          <mesh castShadow position={[0, 1.0, 0]}>
            <icosahedronGeometry args={[0.47, 1]} />
            <meshStandardMaterial color={i === 0 ? '#9ba98b' : '#b1b79a'} roughness={0.95} />
          </mesh>
        </group>
      ))}
    </group>
  )
}

function EnergyOrb({ position, scale = 1, speed = 1 }: { position: [number, number, number], scale?: number, speed?: number }) {
  return (
    <Float speed={speed} rotationIntensity={0.35} floatIntensity={0.55}>
      <mesh position={position} scale={scale}>
        <icosahedronGeometry args={[0.075, 1]} />
        <meshStandardMaterial color="#21d4c2" emissive="#21d4c2" emissiveIntensity={0.55} metalness={0.3} roughness={0.25} />
      </mesh>
    </Float>
  )
}

function EnergyRings() {
  return (
    <group position={[0.9, 0.45, -1.2]} rotation={[0.55, -0.35, -0.28]}>
      {[2.4, 2.85, 3.3].map((radius, index) => (
        <mesh key={radius} rotation={[index * 0.18, index * 0.25, 0]}>
          <torusGeometry args={[radius, 0.006, 8, 160]} />
          <meshBasicMaterial color={index === 1 ? '#21d4c2' : '#7daab8'} transparent opacity={index === 1 ? 0.42 : 0.22} />
        </mesh>
      ))}
    </group>
  )
}

export default function SolarScene() {
  return (
    <div className="solar-scene" aria-label="Animated interactive 3D solar home background">
      <Canvas shadows dpr={[1, 1.6]} gl={{ antialias: true, alpha: true }} onCreated={({ gl }) => gl.setClearColor('#071a2a', 0)}>
        <PerspectiveCamera makeDefault position={[5.6, 4.0, 7.6]} fov={39} />
        <ambientLight intensity={1.2} />
        <directionalLight position={[5, 8, 5]} intensity={2.35} castShadow shadow-mapSize={[1024, 1024]} />
        <directionalLight position={[-5, 3, -3]} intensity={0.85} color="#dce9ef" />
        <pointLight position={[2, 3, 3]} intensity={0.55} color="#21d4c2" />
        <Suspense fallback={null}>
          <EnergyRings />
          <Float speed={1.1} rotationIntensity={0.025} floatIntensity={0.13}>
            <SolarHouse />
          </Float>
          <EnergyOrb position={[-2.1, 1.5, 0.4]} speed={1.2} />
          <EnergyOrb position={[2.5, 1.85, -0.5]} scale={0.7} speed={1.6} />
          <EnergyOrb position={[0.2, 2.6, -1.5]} scale={0.55} speed={1.35} />
          <Environment preset="city" />
          <ContactShadows position={[0, -0.51, 0]} opacity={0.18} scale={9} blur={2.6} far={4} />
        </Suspense>
        <OrbitControls enablePan={false} minDistance={6} maxDistance={12} minPolarAngle={0.65} maxPolarAngle={1.35} autoRotate autoRotateSpeed={0.38} />
      </Canvas>
      <div className="scene-hint"><span className="hint-dot" /> Interactive 3D scene · drag to explore</div>
    </div>
  )
}
