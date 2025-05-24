// src/components/molecules/Avatar.tsx
import { useState, useRef, useEffect } from "react";
import Menu from "./Menu";
import { MenuItem } from "../atoms";
import { useAuth } from "../../hooks";
import { useNavigate } from "react-router";
import { ROUTES } from "../../navigation/ROUTES";

const Avatar = () => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="w-8 h-8 rounded-lg bg-gray-900 flex items-center justify-center font-medium text-sm text-white cursor-pointer hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all duration-200"
      >
        JM
      </button>

      {open && (
        <Menu>
          <MenuItem onClick={() => navigate(ROUTES.PROFILE)}>Profil</MenuItem>
          <MenuItem onClick={logout}>Odhlásit se</MenuItem>
        </Menu>
      )}
    </div>
  );
};

export default Avatar;
