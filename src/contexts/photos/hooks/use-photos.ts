import { useQuery } from "@tanstack/react-query";
import { fetcher } from "@/helpers/api";
import { useQueryState, createSerializer, parseAsString } from "nuqs";

import type { Photo } from "@/contexts/photos/models/photo";

/**
 * Parâmetro da URL que serão utilizandos para filtrar no backend.
 *
 * albumId: parseAsString => irá considerar o albumId, como uma string.
 */
const toSearchParams = createSerializer({
	albumId: parseAsString,
	q: parseAsString,
});

export default function usePhotos() {
	/**
	 * Constante que irá montar a URL, de acordo com o valor setado em albumId.
	 *
	 * useQueryState("albumId") => chave para identificar na URL => albumId = 123
	 */
	const [albumId, setAlbumId] = useQueryState("albumId");
	const [q, setQ] = useQueryState("q");

	const { data, isLoading } = useQuery<Photo[]>({
		queryKey: ["photos", albumId, q],
		queryFn: () => fetcher(`/photos${toSearchParams({ albumId, q })}`),
	});

	return {
		photos: data || [],
		isLoadingPhotos: isLoading,
		filters: {
			albumId,
			setAlbumId,
			q,
			setQ,
		},
	};
}
