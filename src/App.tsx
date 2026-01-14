import { BrowserRouter, Route, Routes } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NuqsAdapter } from "nuqs/adapters/react-router/v7";
import PageComponents from "@/pages/page-components";
import LayoutMain from "@/pages/layout-main";
import PageHome from "@/pages/page-home";
import PagePhotoDetails from "@/pages/page-photo-details";

const queryClient = new QueryClient();

export default function App() {
	return (
		/**
		 * O Provider é necessário para que qualquer componente filho
		 * possa acessar o cache e usar hooks como useQuery.
		 */
		<QueryClientProvider client={queryClient}>
			<NuqsAdapter>
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
			</NuqsAdapter>
		</QueryClientProvider>
	);
}
