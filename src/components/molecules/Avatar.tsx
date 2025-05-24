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
		return () =>
			document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	return (
		<div className="relative" ref={ref}>
			<button
				onClick={() => setOpen(!open)}
				className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center font-bold text-sm text-blue-900 cursor-pointer hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
			>
				JM
			</button>

			{open && (
				<Menu>
					<MenuItem onClick={() => navigate(ROUTES.PROFILE)}>
						Profil
					</MenuItem>
					<MenuItem onClick={logout}>Odhlásit se</MenuItem>
				</Menu>
			)}
		</div>
	);
};

export default Avatar;
