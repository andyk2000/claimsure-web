"use client";

import { useEffect, useRef } from 'react';

// This is a placeholder component for a chart
// In a real application, you would use a charting library like Chart.js, Recharts, etc.
export default function DashboardChart() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    if (!canvasRef.current) return;
    
    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) return;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    
    // Set canvas dimensions
    const width = canvasRef.current.width;
    const height = canvasRef.current.height;
    
    // Draw a simple placeholder chart
    ctx.strokeStyle = '#e5e7eb';
    ctx.lineWidth = 1;
    
    // Draw horizontal grid lines
    for (let i = 0; i < 5; i++) {
      const y = height * 0.2 * i + height * 0.2;
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }
    
    // Draw data line
    const data = [25, 40, 30, 50, 60, 45, 70, 55, 65, 75, 85, 80];
    const dataPoints = data.map((value, index) => ({
      x: width * (index / (data.length - 1)),
      y: height - (value / 100) * height * 0.8 - height * 0.1
    }));
    
    ctx.strokeStyle = '#242e8f';
    ctx.lineWidth = 2;
    ctx.beginPath();
    dataPoints.forEach((point, index) => {
      if (index === 0) {
        ctx.moveTo(point.x, point.y);
      } else {
        ctx.lineTo(point.x, point.y);
      }
    });
    ctx.stroke();
    
    // Draw data points
    ctx.fillStyle = '#242e8f';
    dataPoints.forEach(point => {
      ctx.beginPath();
      ctx.arc(point.x, point.y, 4, 0, Math.PI * 2);
      ctx.fill();
    });
    
    // Draw month labels
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    ctx.fillStyle = '#6b7280';
    ctx.font = '10px sans-serif';
    ctx.textAlign = 'center';
    
    months.forEach((month, index) => {
      const x = width * (index / (months.length - 1));
      ctx.fillText(month, x, height - 5);
    });
    
  }, []);
  
  return (
    <canvas 
      ref={canvasRef} 
      width={800} 
      height={300} 
      style={{ width: '100%', height: '100%' }}
    />
  );
}

