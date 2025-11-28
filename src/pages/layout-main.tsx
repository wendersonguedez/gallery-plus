import Text from "@/components/text";
import { Outlet } from "react-router";

export default function LayoutMain() {
	return (
		<>
			<Text variant="heading-large">Página principal</Text>
			<hr />
			{/**
			 * Todo componente filho (passado entre o componente <Route element={<LayoutMain />}>) será renderizado
			 * onde está o componente <Outlet />
			 */}
			<Outlet />
		</>
	);
}
