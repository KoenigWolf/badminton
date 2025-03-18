"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const AccordionContext = React.createContext<{
  expanded: string | null;
  setExpanded: React.Dispatch<React.SetStateAction<string | null>>;
}>({
  expanded: null,
  setExpanded: () => null,
});

interface AccordionProps {
  defaultValue?: string;
  children: React.ReactNode;
  className?: string;
}

export function Accordion({
  defaultValue,
  children,
  className,
  ...props
}: AccordionProps) {
  const [expanded, setExpanded] = React.useState<string | null>(defaultValue || null);

  return (
    <AccordionContext.Provider value={{ expanded, setExpanded }}>
      <div className={cn("space-y-1", className)} {...props}>
        {children}
      </div>
    </AccordionContext.Provider>
  );
}

interface AccordionItemProps {
  value: string;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
}

export function AccordionItem({
  value,
  children,
  className,
  disabled = false,
  ...props
}: AccordionItemProps) {
  return (
    <div
      className={cn(
        "border-b border-gray-200 dark:border-gray-700",
        disabled && "opacity-50 cursor-not-allowed",
        className
      )}
      data-state={value ? "open" : "closed"}
      data-disabled={disabled ? "true" : undefined}
      {...props}
    >
      {children}
    </div>
  );
}

interface AccordionTriggerProps {
  children: React.ReactNode;
  className?: string;
}

export function AccordionTrigger({
  children,
  className,
  ...props
}: AccordionTriggerProps) {
  const { expanded, setExpanded } = React.useContext(AccordionContext);
  const itemValue = React.useContext(ItemContext);

  if (!itemValue) {
    throw new Error("AccordionTrigger must be used within an AccordionItem");
  }

  const isExpanded = expanded === itemValue.value;

  const handleClick = () => {
    if (itemValue.disabled) return;
    
    setExpanded((current) => {
      if (current === itemValue.value) {
        return null;
      }
      return itemValue.value;
    });
  };

  return (
    <button
      type="button"
      className={cn(
        "flex w-full items-center justify-between py-4 text-left text-sm font-medium text-gray-900 dark:text-gray-100 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-primary",
        className
      )}
      onClick={handleClick}
      aria-expanded={isExpanded ? "true" : "false"}
      aria-controls={`content-${itemValue.value}`}
      id={`trigger-${itemValue.value}`}
      {...props}
    >
      {children}
      <ChevronDown
        className={cn(
          "h-4 w-4 shrink-0 text-gray-500 dark:text-gray-400 transition-transform duration-200",
          isExpanded && "transform rotate-180"
        )}
        aria-hidden="true"
      />
    </button>
  );
}

interface AccordionContentProps {
  children: React.ReactNode;
  className?: string;
}

const ItemContext = React.createContext<{
  value: string;
  disabled?: boolean;
} | null>(null);

export function AccordionContent({
  children,
  className,
  ...props
}: AccordionContentProps) {
  const { expanded } = React.useContext(AccordionContext);
  const itemValue = React.useContext(ItemContext);

  if (!itemValue) {
    throw new Error("AccordionContent must be used within an AccordionItem");
  }

  const isExpanded = expanded === itemValue.value;

  return (
    <div
      id={`content-${itemValue.value}`}
      aria-labelledby={`trigger-${itemValue.value}`}
      className={cn(
        "overflow-hidden transition-all duration-200",
        isExpanded ? "max-h-96" : "max-h-0",
        className
      )}
      hidden={!isExpanded}
      {...props}
    >
      <div className="pb-4 pt-0 px-1">{children}</div>
    </div>
  );
}

// AccordionItemコンポーネントをコンテキスト付きで使用するラッパーコンポーネント
export function AccordionItemWithContext({
  value,
  disabled,
  children,
  ...props
}: AccordionItemProps) {
  return (
    <ItemContext.Provider value={{ value, disabled }}>
      <AccordionItem value={value} disabled={disabled} {...props}>
        {children}
      </AccordionItem>
    </ItemContext.Provider>
  );
} 