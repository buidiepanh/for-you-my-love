import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const GOLDEN = Math.PI * (3 - Math.sqrt(5));
const PETAL_COUNT = 34;
const clamp = (v, a, b) => Math.min(b, Math.max(a, v));

// Cánh hoa: mặt phẳng được uốn cong (khum vào trong, đầu cánh cong ra ngoài)
function makePetalGeometry() {
  const g = new THREE.PlaneGeometry(1, 1, 10, 10);
  const pos = g.attributes.position;
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i);
    const v = pos.getY(i) + 0.5; // 0 = gốc cánh, 1 = đầu cánh
    const w = Math.pow(Math.sin(Math.PI * (v * 0.9 + 0.05)), 0.6);
    const nx = x * w * 1.25;
    const z = -nx * nx * 1.4 + v * v * 0.35;
    pos.setXYZ(i, nx, v, z);
  }
  g.computeVertexNormals();
  return g;
}

function Rose() {
  const spin = useRef();
  const meshes = useRef([]);
  const progress = useRef(0);
  const geo = useMemo(makePetalGeometry, []);

  const petals = useMemo(() => {
    const inner = new THREE.Color("#f43f5e");
    const outer = new THREE.Color("#fecdd3");
    return Array.from({ length: PETAL_COUNT }, (_, i) => {
      const t = i / (PETAL_COUNT - 1);
      return {
        t,
        angle: i * GOLDEN,
        tilt: 0.12 + Math.pow(t, 1.2) * 1.25,
        scale: 0.28 + t * 0.7,
        offset: 0.02 + t * 0.22,
        y: -t * 0.12,
        color: new THREE.Color().lerpColors(inner, outer, Math.pow(t, 0.8)),
      };
    });
  }, []);

  useFrame((state, dt) => {
    const d = Math.min(dt, 0.05);
    progress.current = Math.min(1, progress.current + d / 3.4);
    const e = 1 - Math.pow(1 - progress.current, 3); // easeOutCubic

    petals.forEach((p, i) => {
      const m = meshes.current[i];
      if (!m) return;
      const k = clamp(e * 1.4 - p.t * 0.4, 0, 1); // cánh ngoài nở sau
      m.rotation.x = p.tilt * (0.25 + 0.75 * k);
      m.scale.setScalar(p.scale * (0.55 + 0.45 * k));
    });

    spin.current.rotation.y += d * 0.3;
    spin.current.position.y = Math.sin(state.clock.elapsedTime * 0.9) * 0.05;
  });

  return (
    <group rotation={[0.45, 0, 0]} position={[0, 0.25, 0]}>
      <group ref={spin}>
        {petals.map((p, i) => (
          <group key={i} rotation={[0, p.angle, 0]} position-y={p.y}>
            <mesh
              ref={(el) => (meshes.current[i] = el)}
              geometry={geo}
              position={[0, 0, p.offset]}
              rotation={[p.tilt * 0.25, 0, 0]}
              scale={p.scale * 0.55}
            >
              <meshStandardMaterial
                color={p.color}
                side={THREE.DoubleSide}
                roughness={0.55}
              />
            </mesh>
          </group>
        ))}

        {/* Cuống */}
        <mesh position={[0, -1.5, 0]}>
          <cylinderGeometry args={[0.045, 0.06, 2.8, 8]} />
          <meshStandardMaterial color="#8fbf93" roughness={0.7} />
        </mesh>

        {/* Lá */}
        <group rotation={[0, 0.8, 0]} position={[0, -1.1, 0]}>
          <mesh geometry={geo} rotation={[1.0, 0, 0]} scale={[0.55, 0.95, 1]}>
            <meshStandardMaterial
              color="#86b891"
              side={THREE.DoubleSide}
              roughness={0.7}
            />
          </mesh>
        </group>
        <group rotation={[0, 0.8 + Math.PI, 0]} position={[0, -1.6, 0]}>
          <mesh geometry={geo} rotation={[1.1, 0, 0]} scale={[0.5, 0.85, 1]}>
            <meshStandardMaterial
              color="#86b891"
              side={THREE.DoubleSide}
              roughness={0.7}
            />
          </mesh>
        </group>
      </group>
    </group>
  );
}

export default function Rose3D() {
  const wrap = useRef(null);
  const [visible, setVisible] = useState(true);

  // Tạm dừng render khi cuộn khỏi hero → tiết kiệm GPU/pin
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting));
    io.observe(wrap.current);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={wrap} className="h-full w-full">
      <Canvas
        flat
        frameloop={visible ? "always" : "never"}
        dpr={[1, 1.75]}
        camera={{ position: [0, 0.3, 5.2], fov: 40 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
      >
        <ambientLight intensity={0.95} />
        <directionalLight position={[3, 4, 5]} intensity={1.6} />
        <pointLight position={[-3, -1, 2]} color="#ffc0d3" intensity={25} />
        <Rose />
      </Canvas>
    </div>
  );
}
