"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

// HTMLInputElementから継承するプロパティを除外し、カスタムプロパティを追加
interface SliderBaseProps {
  min?: number;
  max?: number;
  step?: number;
  defaultValue?: number[];
  sliderValue?: number[];
  onValueChange?: (value: number[]) => void;
  tooltipDisplay?: "auto" | "always" | "never";
  showMinMaxLabels?: boolean;
  formatLabel?: (value: number) => string;
}

// 標準のHTMLInputElementプロパティも含めた完全なプロパティセット
type SliderProps = SliderBaseProps & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'defaultValue' | 'value'>;

/**
 * カスタムスライダーコンポーネント
 * アクセシビリティに配慮したスライダー入力要素
 */
export function Slider({
  min = 0,
  max = 100,
  step = 1,
  defaultValue,
  sliderValue,
  onValueChange,
  className,
  tooltipDisplay = "auto",
  showMinMaxLabels = true,
  formatLabel = (value: number) => value.toString(),
  ...props
}: SliderProps) {
  // スライダーの状態を管理
  const [internalValue, setInternalValue] = React.useState<number[]>(
    sliderValue || defaultValue || [min]
  );
  const isControlled = sliderValue !== undefined;
  const actualValue = isControlled ? sliderValue : internalValue;

  // 値が変更された場合に親コンポーネントに通知
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = [Number.parseFloat(event.target.value)];
    
    if (!isControlled) {
      setInternalValue(newValue);
    }
    
    onValueChange?.(newValue);
    props.onChange?.(event);
  };

  // 外部からの値の変更を同期
  React.useEffect(() => {
    if (isControlled) {
      setInternalValue(sliderValue);
    }
  }, [isControlled, sliderValue]);

  // ツールチップの表示状態
  const [showTooltip, setShowTooltip] = React.useState(
    tooltipDisplay === "always"
  );

  // ツールチップ位置の計算 (0-100%)
  const tooltipPosition = React.useMemo(() => {
    const percentage = 
      ((actualValue[0] - min) / (max - min)) * 100;
    return `calc(${percentage}% - 10px)`;
  }, [actualValue, min, max]);

  // マウスイベントハンドラ
  const handleMouseEnter = () => {
    if (tooltipDisplay === "auto") {
      setShowTooltip(true);
    }
  };

  const handleMouseLeave = () => {
    if (tooltipDisplay === "auto") {
      setShowTooltip(false);
    }
  };

  return (
    <div className={cn("space-y-4", className)}>
      <div className="relative pt-6">
        {/* ツールチップ */}
        {tooltipDisplay !== "never" && showTooltip && (
          <div
            className="absolute -top-2 bg-primary text-primary-foreground rounded px-2 py-1 text-xs transform -translate-x-1/2 z-10"
            style={{ left: tooltipPosition }}
          >
            {formatLabel(actualValue[0])}
          </div>
        )}
        
        {/* スライダー入力 */}
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={actualValue[0]}
          onChange={handleChange}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onFocus={handleMouseEnter}
          onBlur={handleMouseLeave}
          className={cn(
            "w-full appearance-none bg-transparent cursor-pointer",
            "focus:outline-none h-2",
            "[&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary",
            "[&::-webkit-slider-runnable-track]:h-2 [&::-webkit-slider-runnable-track]:rounded-full [&::-webkit-slider-runnable-track]:bg-gray-200 [&::-webkit-slider-runnable-track]:dark:bg-gray-700",
            "[&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-primary [&::-moz-range-thumb]:border-0",
            "[&::-moz-range-track]:h-2 [&::-moz-range-track]:rounded-full [&::-moz-range-track]:bg-gray-200 [&::-moz-range-track]:dark:bg-gray-700"
          )}
          {...props}
        />
      </div>

      {/* 最小/最大ラベル */}
      {showMinMaxLabels && (
        <div className="flex justify-between w-full">
          <span className="text-xs text-gray-500">{formatLabel(min)}</span>
          <span className="text-xs text-gray-500">{formatLabel(max)}</span>
        </div>
      )}
    </div>
  );
} 