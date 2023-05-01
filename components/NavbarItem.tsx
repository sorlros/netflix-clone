import { useRouter } from "next/router";

interface NavbarItemProps {
	label: string;
	path: string;
}

const NavbarItem: React.FC<NavbarItemProps> = ({ label, path }) => {
	const router = useRouter();

	const onClickHandler = () => {
		router.push(`${path}`);
	};
	return (
		<div
			onClick={onClickHandler}
			className="text-white cursor-pointer hover:text-gray-300 transition"
		>
			{label}
		</div>
	);
};

export default NavbarItem;
