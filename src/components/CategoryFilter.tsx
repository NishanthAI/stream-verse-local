
import React from 'react';
import { Button } from './ui/button';

interface CategoryFilterProps {
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({
  categories,
  selectedCategory,
  onCategoryChange
}) => {
  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {categories.map((category) => (
        <Button
          key={category}
          onClick={() => onCategoryChange(category)}
          variant={selectedCategory === category ? "default" : "outline"}
          className={`${
            selectedCategory === category
              ? 'bg-purple-600 hover:bg-purple-700 text-white'
              : 'border-slate-600 text-slate-400 hover:bg-slate-700 hover:text-white'
          } transition-all duration-200`}
        >
          {category}
        </Button>
      ))}
    </div>
  );
};

export default CategoryFilter;
