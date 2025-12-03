import MainContent from "@/components/main-content";
import MainHeader from "@/components/main-header";
import { Outlet } from "react-router";

export default function LayoutMain() {
	return (
		<>
			<MainHeader className="mt-9" />
			{/**
			 * Todo componente filho (passado entre o componente <Route element={<LayoutMain />}>) será renderizado
			 * onde está o componente <Outlet />
			 */}
			<MainContent>
				<Outlet />
			</MainContent>
		</>
	);
}
