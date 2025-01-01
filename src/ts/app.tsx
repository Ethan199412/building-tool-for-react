import React, { useState, useRef } from 'react';
import './app.less';

const Picker = ({ items }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [startY, setStartY] = useState(0);
  const [currentY, setCurrentY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [velocity, setVelocity] = useState(0); // 滑动速度
  const pickerRef = useRef(null);
  const animationFrameRef = useRef<any>(null);

  // 触摸开始
  const handleTouchStart = (event) => {
    const touch = event.touches[0];
    setStartY(touch.clientY);
    setCurrentY(touch.clientY);
    setIsDragging(true);
    setVelocity(0);
    // cancelAnimationFrame(animationFrameRef.current); // 停止惯性滚动
  };

  // 触摸移动
  const handleTouchMove = (event) => {
    if (!isDragging) return;
    const touch = event.touches[0];
    const deltaY = touch.clientY - currentY;
    setCurrentY(touch.clientY);

    // 计算滑动速度
    setVelocity(deltaY);

    // 根据滑动距离调整选中项
    const deltaIndex = deltaY / 50; // 每 50px 切换一个选项
    let newIndex = selectedIndex - deltaIndex;

    // 限制索引范围
    if (newIndex < 0) {
      newIndex = 0;
    } else if (newIndex >= items.length) {
      newIndex = items.length - 1;
    }

    setSelectedIndex(newIndex);
  };

  const clampOffsetY = (value) => {
    const maxOffset = (items.length - 1) * 50;
    return Math.min(Math.max(value, 0), maxOffset);
  };

  // 触摸结束
  const handleTouchEnd = () => {
    setIsDragging(false);

    // 惯性滚动
    // if (Math.abs(velocity) > 1) {
    //   const inertia = velocity * 0.1; // 惯性系数
    //   let newIndex = selectedIndex - inertia;

    //   // 限制索引范围
    //   if (newIndex < 0) {
    //     newIndex = 0;
    //   } else if (newIndex >= items.length) {
    //     newIndex = items.length - 1;
    //   }

    //   newIndex = Math.round(newIndex)
    //   console.log('[p1.1]',{newIndex})
    //   setSelectedIndex(newIndex);
    // }
    let newIndex = Math.round(selectedIndex)
    setSelectedIndex(newIndex)
  };

  console.log('[p1.0]',{ selectedIndex, velocity})
  return (
    <div
      className="picker"
      ref={pickerRef}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      
      <div
        className="picker-list"
        style={{ transform: `translateY(${-(selectedIndex-1) * 50}px)` }}
      >
        {items.map((item, index) => (
          <div
            key={index}
            className={`picker-item ${index === selectedIndex ? 'selected' : ''}`}
          >
            {item}
          </div>
        ))}
      </div>
      <div className="picker-mask-top" />
      <div className="picker-mask-bottom" />
    </div>
  );
};

export default Picker;