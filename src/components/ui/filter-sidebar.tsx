"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { 
  Filter, 
  ChevronDown, 
  Search, 
  X 
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Accordion, 
  AccordionItemWithContext, 
  AccordionTrigger, 
  AccordionContent 
} from "@/components/ui/accordion";

// フィルターカテゴリの型定義
type FilterValue = string | number | string[] | undefined;

type FilterCategory = {
  label: string;
  type: "checkbox" | "range";
  options?: { label: string; value: string }[];
  min?: number;
  max?: number;
  step?: number;
  formatLabel?: (value: number) => string;
};

interface FilterSidebarProps {
  className?: string;
  onApplyFilters: () => void;
  onClearFilters: () => void;
  isFilterOpen: boolean;
  toggleFilter: () => void;
  filters: Record<string, FilterCategory>;
  activeFilters: Record<string, FilterValue>;
  updateFilter: (category: string, value: FilterValue) => void;
}

/**
 * 検索フィルターサイドバーコンポーネント
 * 
 * @description 検索結果をフィルタリングするためのサイドバー
 */
export function FilterSidebar({
  className,
  onApplyFilters,
  onClearFilters,
  isFilterOpen,
  toggleFilter,
  filters,
  activeFilters = {},
  updateFilter,
}: FilterSidebarProps) {
  return (
    <>
      {/* モバイル用フィルターボタン */}
      <div className="flex items-center gap-2 lg:hidden mb-4">
        <Button
          onClick={toggleFilter}
          variant="outline"
          className="flex items-center gap-2"
          size="sm"
        >
          <Filter className="size-4" />
          フィルター
          <ChevronDown className={cn(
            "size-4 transition-transform",
            isFilterOpen && "rotate-180"
          )} />
        </Button>
        
        {/* アクティブなフィルター表示（モバイル） */}
        <div className="flex flex-wrap gap-1">
          {Object.entries(activeFilters).map(([key, value]) => {
            // フィルターが空配列または未定義の場合は表示しない
            if (!value || (Array.isArray(value) && value.length === 0)) {
              return null;
            }
            
            return (
              <Badge key={key} variant="secondary" className="flex items-center gap-1">
                {filters[key]?.label}
                <button 
                  onClick={() => updateFilter(key, undefined)}
                  className="size-4 flex items-center justify-center"
                  aria-label={`${filters[key]?.label}のフィルターを削除`}
                >
                  <X className="size-3" />
                </button>
              </Badge>
            );
          })}
        </div>
      </div>

      {/* フィルターサイドバー */}
      <aside className={cn(
        "bg-card border rounded-lg lg:max-w-[280px] lg:block transition-all",
        isFilterOpen ? "block" : "hidden",
        className
      )}>
        <div className="p-4 border-b">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-lg">フィルター</h2>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={onClearFilters}
            >
              すべてクリア
            </Button>
          </div>
          
          {/* 検索ボックス */}
          <div className="relative mt-2">
            <Search className="absolute left-2 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <input
              type="search"
              placeholder="キーワードを入力"
              className="pl-8 pr-4 py-2 w-full rounded-md border bg-background"
            />
          </div>
        </div>

        {/* フィルターカテゴリーリスト */}
        <div className="divide-y">
          <Accordion defaultValue="location">
            {Object.entries(filters).map(([key, category]) => (
              <AccordionItemWithContext 
                key={key} 
                value={key}
              >
                <AccordionTrigger className="px-4">
                  {category.label}
                </AccordionTrigger>
                <AccordionContent>
                  <div className="px-4 pb-2">
                    {renderFilterControls(key, category, activeFilters, updateFilter)}
                  </div>
                </AccordionContent>
              </AccordionItemWithContext>
            ))}
          </Accordion>
        </div>
        
        {/* 確定ボタン（モバイル用） */}
        <div className="p-4 border-t lg:hidden">
          <Button 
            className="w-full" 
            onClick={() => {
              onApplyFilters();
              toggleFilter();
            }}
          >
            フィルターを適用
          </Button>
        </div>
      </aside>
    </>
  );
}

// フィルタータイプに基づいて適切なコントロールをレンダリング
function renderFilterControls(
  key: string, 
  category: FilterCategory, 
  activeFilters: Record<string, FilterValue>, 
  updateFilter: (category: string, value: FilterValue) => void
) {
  switch (category.type) {
    case "checkbox":
      return (
        <div className="space-y-2">
          {category.options?.map((option) => (
            <Checkbox
              key={option.value}
              label={option.label}
              checked={
                Array.isArray(activeFilters[key]) && 
                (activeFilters[key] as string[])?.includes(option.value)
              }
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                const currentValues = (activeFilters[key] as string[]) || [];
                if (e.target.checked) {
                  updateFilter(key, [...currentValues, option.value]);
                } else {
                  updateFilter(key, currentValues.filter((v: string) => v !== option.value));
                }
              }}
            />
          ))}
        </div>
      );
      
    case "range":
      return (
        <div className="py-6">
          <Slider
            min={category.min}
            max={category.max}
            step={category.step || 1}
            sliderValue={[(activeFilters[key] as number) || category.min || 0]}
            onValueChange={(values: number[]) => updateFilter(key, values[0])}
            tooltipDisplay="auto"
            showMinMaxLabels
            formatLabel={category.formatLabel || ((v) => v.toString())}
          />
        </div>
      );
      
    default:
      return null;
  }
} 