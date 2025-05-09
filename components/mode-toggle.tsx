"use client";

import * as React from "react";
import { Wine, GlassWater, Squirrel, Grape, Warehouse } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function ModeToggle() {
  const { setTheme, theme } = useTheme();

  const getThemeIcon = () => {
    switch (theme) {
      case 'root':
        return <Wine className="h-5 w-5" />;
      case 'aged-port':
        return <GlassWater className="h-5 w-5" />;
      case 'oak-barrel':
        return <Squirrel className="h-5 w-5" />;
      case 'vineyard':
        return <Grape className="h-5 w-5" />;
      case 'cellar':
        return <Warehouse className="h-5 w-5" />;
      default:
        return <Wine className="h-5 w-5" />;
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon" 
          className="rounded-full hover:bg-primary/10"
        >
          {getThemeIcon()}
          <span className="sr-only">Alternar tema</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("root")} className="cursor-pointer">
          <Wine className="mr-2 h-4 w-4" />
          Vinho Tinto
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("aged-port")} className="cursor-pointer">
          <GlassWater className="mr-2 h-4 w-4" />
          Porto Envelhecido
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("oak-barrel")} className="cursor-pointer">
          <Squirrel className="mr-2 h-4 w-4" />
          Barril de Carvalho
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("vineyard")} className="cursor-pointer">
          <Grape className="mr-2 h-4 w-4" />
          Vinha
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("cellar")} className="cursor-pointer">
          <Warehouse className="mr-2 h-4 w-4" />
          Adega
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}