
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";

interface GroceryItem {
  id: string;
  name: string;
  quantity: string;
  checked: boolean;
}

interface GroceryListProps {
  items: GroceryItem[];
  onToggleItem: (id: string) => void;
}

const GroceryList = ({ items, onToggleItem }: GroceryListProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Grocery List</CardTitle>
        <CardDescription>Items needed for your meal plan</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {items.map((item) => (
            <div key={item.id} className="flex items-center space-x-2">
              <Checkbox
                id={item.id}
                checked={item.checked}
                onCheckedChange={() => onToggleItem(item.id)}
              />
              <label
                htmlFor={item.id}
                className={`text-sm ${item.checked ? 'line-through text-gray-500' : ''}`}
              >
                {item.quantity} {item.name}
              </label>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default GroceryList;
