import { Home, Bookmark, Settings } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

export const BottomNavigation = () => {
  const location = useLocation();

  const navItems = [
    {
      icon: Home,
      label: "Home",
      path: "/recent-scans",
      isActive: location.pathname === "/recent-scans"
    },
    {
      icon: Bookmark,
      label: "Saved",
      path: "/saved-items",
      isActive: location.pathname === "/saved-items"
    },
    {
      icon: Settings,
      label: "Settings",
      path: "/saved-items", // Settings is part of the saved items page
      isActive: location.pathname === "/saved-items"
    }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-sm border-t border-border z-50">
      <div className="flex items-center justify-around py-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex flex-col items-center space-y-1 px-4 py-2 rounded-lg transition-colors duration-200",
                item.isActive
                  ? "text-primary bg-primary/10"
                  : "text-muted-foreground hover:text-primary hover:bg-primary/5"
              )}
            >
              <Icon className="h-5 w-5" />
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};