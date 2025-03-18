"use client";

import * as React from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  description?: string;
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, description, ...props }, ref) => {
    // チェックボックス状態を管理
    const [checked, setChecked] = React.useState(props.checked || false);
    
    // チェックボックス状態が外部から変更された場合に同期
    React.useEffect(() => {
      if (props.checked !== undefined) {
        setChecked(props.checked);
      }
    }, [props.checked]);

    // クリックハンドラ
    const handleClick = () => {
      if (props.disabled) return;
      
      const newChecked = !checked;
      setChecked(newChecked);
      
      // 外部のonChange関数があれば呼び出す
      if (props.onChange) {
        const syntheticEvent = {
          target: {
            checked: newChecked,
            name: props.name,
            value: props.value
          }
        } as React.ChangeEvent<HTMLInputElement>;
        
        props.onChange(syntheticEvent);
      }
    };

    // キーボードハンドラ（アクセシビリティ対応）
    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (props.disabled) return;
      if (e.key === " " || e.key === "Enter") {
        e.preventDefault();
        handleClick();
      }
    };

    return (
      <div className={cn("flex items-start", className)}>
        <div className="flex items-center h-5">
          <div
            ref={() => {
              // Refが関数の場合は転送
              if (typeof ref === 'function') {
                ref(null); // 実際のinputは存在しないので、nullを渡す
              } 
              // Refがオブジェクトの場合
              else if (ref) {
                ref.current = null;
              }
            }}
            role="checkbox"
            aria-checked={checked ? "true" : "false"}
            aria-labelledby={label ? `${props.id || props.name}-label` : undefined}
            aria-describedby={description ? `${props.id || props.name}-description` : undefined}
            tabIndex={props.disabled ? -1 : 0}
            data-state={checked ? "checked" : "unchecked"}
            data-disabled={props.disabled ? "true" : undefined}
            className={cn(
              "peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
              "disabled:cursor-not-allowed disabled:opacity-50",
              checked ? "bg-primary text-primary-foreground" : "bg-background",
              props.disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"
            )}
            onClick={handleClick}
            onKeyDown={handleKeyDown}
          >
            {checked ? (
              <Check className="h-3 w-3 text-white" />
            ) : null}
          </div>
          <input
            type="checkbox"
            className="sr-only"
            {...props}
            onChange={() => {}} // 実際の変更は上のdivで処理
            checked={checked}
            tabIndex={-1}
          />
        </div>
        {(label || description) && (
          <div className="ml-2 text-sm">
            {label && (
              <label
                htmlFor={props.id || props.name}
                id={label ? `${props.id || props.name}-label` : undefined}
                className={cn(
                  "font-medium text-gray-900 dark:text-gray-100",
                  props.disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"
                )}
              >
                {label}
              </label>
            )}
            {description && (
              <p
                id={description ? `${props.id || props.name}-description` : undefined}
                className="text-gray-500 dark:text-gray-400"
              >
                {description}
              </p>
            )}
          </div>
        )}
      </div>
    );
  }
);
Checkbox.displayName = "Checkbox";

export { Checkbox }; 