
# 添加黑色区域背景线框正方体

## 问题分析

根据用户提供的截图和 GitHub 仓库，黑色区域应该有一个在背景持续滚动旋转的**线框正方体（Wireframe Cube）**：

- **外观**：黑色填充 + 白色边框线条
- **行为**：随页面滚动持续旋转，并有轻微的上下浮动效果
- **层级**：位于所有项目内容的背后（z-index 较低）

目前项目中**没有这个组件**，只有白色区域的视频正方体（RotatingCube），而黑色区域（NextSection）缺少这个背景元素。

---

## 技术方案

### 1. 创建新组件 `WireframeCube.tsx`

基于 GitHub 仓库的 `CubeScene.tsx` 实现：

```text
src/components/portfolio/WireframeCube.tsx
```

**核心实现：**
- 使用 `@react-three/fiber` 创建 3D 场景
- BoxGeometry 创建立方体几何体
- EdgesGeometry 创建边框线条
- meshStandardMaterial 设置黑色填充
- lineBasicMaterial 设置白色边框

**动画逻辑：**
- 根据 `scrollProgress` 控制 X/Y 轴旋转（随滚动持续旋转）
- 添加基于时间的轻微浮动效果（`Math.sin(Date.now() * 0.001) * 0.1`）

### 2. 在 NextSection 中集成

**传递 scrollProgress：**
由于当前 NextSection 不接收 scrollProgress，需要通过两种方式之一获取：

- **方案 A**：从 `scrollContainerRef.scrollTop` 计算局部进度（推荐，更独立）
- **方案 B**：从 Index.tsx 传递全局 scrollProgress

选择**方案 A**：在 NextSection 内部监听 `scrollContainerRef.scrollTop`，计算黑色区域的局部滚动进度。

**布局层级：**
```text
NextSection 结构
├─ WireframeCube (fixed, z-10, pointer-events-none)
├─ IntroSection (relative, z-20)
├─ ProjectSections (relative, z-20)
├─ ContactSection (relative, z-20)
└─ ScrollIndicator (fixed, z-50)
```

### 3. 修改 Index.tsx

更新 `NextSection` 的 props，传入 `isFullyVisible` 用于控制线框正方体的显示时机。

---

## 文件修改清单

| 文件 | 操作 | 说明 |
|------|------|------|
| `src/components/portfolio/WireframeCube.tsx` | 新增 | 线框正方体组件 |
| `src/components/NextSection.tsx` | 修改 | 集成 WireframeCube，计算 localScrollProgress |

---

## 具体实现细节

### WireframeCube.tsx 组件结构

```typescript
// 主要结构
interface WireframeCubeProps {
  scrollProgress: number;
}

// RotatingWireframeCube - 内部 3D 对象
const RotatingWireframeCube: React.FC<{ scrollProgress: number }> = ({ scrollProgress }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const geometry = useMemo(() => new THREE.BoxGeometry(2, 2, 2), []);
  const edges = useMemo(() => new THREE.EdgesGeometry(geometry), [geometry]);

  useFrame(() => {
    if (meshRef.current) {
      // 随滚动旋转
      const rotationSpeed = 8;
      meshRef.current.rotation.x = scrollProgress * Math.PI * rotationSpeed;
      meshRef.current.rotation.y = scrollProgress * Math.PI * rotationSpeed * 0.5;
      
      // 轻微浮动
      meshRef.current.position.y = Math.sin(Date.now() * 0.001) * 0.1;
    }
  });

  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial color="#000000" roughness={0.1} metalness={0.8} />
      <lineSegments geometry={edges}>
        <lineBasicMaterial color="#ffffff" linewidth={1} />
      </lineSegments>
    </mesh>
  );
};

// WireframeCube - Canvas 容器
export const WireframeCube: React.FC<WireframeCubeProps> = ({ scrollProgress }) => {
  return (
    <div className="fixed inset-0 z-10 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <spotLight position={[-10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
        <RotatingWireframeCube scrollProgress={scrollProgress} />
      </Canvas>
    </div>
  );
};
```

### NextSection.tsx 修改

```typescript
// 新增 localProgress 状态
const [localProgress, setLocalProgress] = useState(0);

// 在 scroll 监听中更新 localProgress
useEffect(() => {
  const container = scrollContainerRef?.current;
  if (!container) return;

  const handleScroll = () => {
    const scrollTop = container.scrollTop;
    const scrollHeight = container.scrollHeight - container.clientHeight;
    const progress = scrollHeight > 0 ? scrollTop / scrollHeight : 0;
    
    setLocalProgress(progress);
    // ... 现有的 currentIndex 计算逻辑
  };

  container.addEventListener('scroll', handleScroll);
  return () => container.removeEventListener('scroll', handleScroll);
}, [scrollContainerRef]);

// 在 JSX 中添加 WireframeCube
return (
  <div className="bg-[#0a0a0a] text-white relative">
    {/* 背景线框正方体 - 只在黑色区域完全展开时显示 */}
    {isFullyVisible && (
      <WireframeCube scrollProgress={localProgress} />
    )}
    
    {/* 现有内容保持不变，确保 z-index 高于线框正方体 */}
    <div className="relative z-20">
      <IntroSection />
      {PROJECTS.map(...)}
      <ContactSection />
    </div>
    
    {/* ScrollIndicator 保持不变 */}
  </div>
);
```

---

## 视觉效果预览

```text
黑色区域滚动时的视觉层次：

┌──────────────────────────────────────────────┐
│                                              │
│  ┌────────┐    REDEFINING                   │
│  │        │    DIGITAL                       │
│  │   🔲   │    SPACE              ■ ←指示器  │
│  │ 线框体 │                       ▪          │
│  │(背景) │                        ▪          │
│  └────────┘    Scroll down...               │
│                                              │
│     项目内容在前景，线框正方体在背后          │
└──────────────────────────────────────────────┘

线框正方体特性：
- 黑色填充 + 白色边框
- 随滚动持续旋转
- 轻微上下浮动
- 始终在内容层后面
```

---

## 技术注意事项

1. **Canvas 层级**：WireframeCube 使用 `fixed inset-0 z-10`，内容使用 `relative z-20`，确保内容在前
2. **性能**：`pointer-events-none` 确保线框正方体不会阻挡用户交互
3. **显示时机**：只在 `isFullyVisible` 时渲染，避免在白色区域可见时提前出现
4. **依赖复用**：项目已有 `@react-three/fiber` 和 `three`，无需新增依赖
