import Container from "@/components/container";
import Button from "@/components/button";
import Logo from "@/assets/images/galeria-plus-full-logo.svg?react";
import cx from "classnames";
import { Link } from "react-router";

interface MainHeaderProps extends React.ComponentProps<typeof Container> {}

export default function MainHeader({ className, ...props }: MainHeaderProps) {
	return (
		<Container
			as="header"
			className={cx("flex justify-between items-center gap-10", className)}
			{...props}
		>
			<Link to="/">
				<Logo className="h-5" />
			</Link>

			<div className="flex items-center gap-3">
				<Button>Nova foto</Button>
				<Button variant="secondary">Criar álbum</Button>
			</div>
		</Container>
	);
}
