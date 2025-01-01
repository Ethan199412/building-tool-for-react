import React, { useState, useRef } from 'react';
import './picker.less';

const Picker = ({ items }) => {
  const [offsetY, setOffsetY] = useState(0); // 列表的垂直偏移量
  const [isDragging, setIsDragging] = useState(false); // 是否正在拖动
  const [startY, setStartY] = useState(0); // 触摸起始位置
  const [velocity, setVelocity] = useState(0); // 滑动速度
  const pickerRef = useRef(null);
  const animationFrameRef = useRef<any>(null);
  const lastTimeRef = useRef(0);

  // 获取中间位置的索引
  const getMiddleIndex = () => {
    const middlePosition = -offsetY + 75; // 75 是 picker 高度的一半
    return Math.round(middlePosition / 50); // 50 是每个选项的高度
  };

  // 限制偏移量范围
  const clampOffsetY = (value) => {
    const maxOffset = (items.length - 1) * 50;
    return Math.min(Math.max(value, 0), maxOffset);
  };

  // 触摸开始
  const handleTouchStart = (event) => {
    const touch = event.touches[0];
    setStartY(touch.clientY);
    setIsDragging(true);
    setVelocity(0);
    cancelAnimationFrame(animationFrameRef.current); // 停止惯性滚动
  };

  // 触摸移动
  const handleTouchMove = (event) => {
    if (!isDragging) return;
    const touch = event.touches[0];
    const deltaY = touch.clientY - startY;
    setStartY(touch.clientY);

    // 更新偏移量
    const newOffsetY = clampOffsetY(offsetY - deltaY);
    setOffsetY(newOffsetY);

    // 计算滑动速度
    const now = Date.now();
    const timeDelta = now - lastTimeRef.current;
    if (timeDelta > 0) {
      setVelocity(deltaY / timeDelta);
    }
    lastTimeRef.current = now;
  };

  // 触摸结束
  const handleTouchEnd = () => {
    setIsDragging(false);

    // 惯性滚动
    const startInertia = (currentVelocity) => {
      const inertia = currentVelocity * 50; // 惯性系数
      let newOffsetY = offsetY - inertia;

      // 限制偏移量范围
      newOffsetY = clampOffsetY(newOffsetY);

      // 自动对齐到中间位置
      const middleIndex = Math.round(newOffsetY / 50);
      const targetOffsetY = middleIndex * 50;

      // 平滑滚动到目标位置
      const animate = () => {
        const delta = targetOffsetY - offsetY;
        if (Math.abs(delta) > 0.1) {
          setOffsetY((prev) => prev + delta * 0.2); // 0.2 是平滑系数
          animationFrameRef.current = requestAnimationFrame(animate);
        } else {
          setOffsetY(targetOffsetY);
        }
      };
      animate();
    };

    startInertia(velocity);
  };

  return (
    <div
      className="picker"
      ref={pickerRef}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className="picker-mask-top" />
      <div
        className="picker-list"
        style={{ transform: `translateY(${-offsetY}px)` }}
      >
        {items.map((item, index) => {
          const isMiddle = index === getMiddleIndex();
          return (
            <div
              key={index}
              className={`picker-item ${isMiddle ? 'selected' : ''}`}
            >
              {item}
            </div>
          );
        })}
      </div>
      <div className="picker-mask-bottom" />
    </div>
  );
};

export default Picker;