import React from 'react';
import { Menu as MenuIcon } from 'lucide-react';

// DropdownMenu component
export const DropdownMenu = ({ children }) => (
  <div className="relative">{children}</div>
);

// DropdownMenuTrigger component
export const DropdownMenuTrigger = ({ asChild, children }) => {
  const triggerProps = asChild
    ? { role: 'button', tabIndex: 0 }
    : { className: 'dropdown-trigger' };

  return React.cloneElement(children, triggerProps);
};

// DropdownMenuContent component
export const DropdownMenuContent = ({ children }) => (
  <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg">
    {children}
  </div>
);

// DropdownMenuItem component
export const DropdownMenuItem = ({ children, onClick, className }) => (
  <div
    className={`px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer ${className}`}
    onClick={onClick}
    role="menuitem"
  >
    {children}
  </div>
);

// DropdownMenuLabel component
export const DropdownMenuLabel = ({ children }) => (
  <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase">
    {children}
  </div>
);

// DropdownMenuSeparator component
export const DropdownMenuSeparator = () => (
  <div className="border-t border-gray-200 my-2"></div>
);
