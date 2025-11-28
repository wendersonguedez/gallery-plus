import { BrowserRouter, Route, Routes } from "react-router";
import PageComponents from "@/pages/page-components";
import LayoutMain from "@/pages/layout-main";
import PageHome from "@/pages/page-home";
import PagePhotoDetails from "@/pages/page-photo-details";

export default function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route element={<LayoutMain />}>
					<Route index element={<PageHome />} />
					<Route path="/photos/:id" element={<PagePhotoDetails />} />
					{/**
					 * Caso o usuário acesse a rota /components, o componente <PageComponents /> será renderizado
					 * onde está o componente <Outlet />, definido no componente <LayoutMain />
					 */}
					<Route path="/components" element={<PageComponents />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
}
