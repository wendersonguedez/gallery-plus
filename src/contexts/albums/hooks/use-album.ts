import { AlbumNewFormData } from "@/contexts/albums/schema";
import { Album } from "@/contexts/albums/models/album";
import { toast } from "sonner";
import { api } from "@/helpers/api";
import { useQueryClient } from "@tanstack/react-query";
import usePhotos from "@/contexts/photos/hooks/use-photos";

export default function useAlbum() {
	const queryClient = useQueryClient();
	const { photos } = usePhotos();

	async function createAlbum(payload: AlbumNewFormData) {
		try {
			const { data: album } = await api.post<Album>("/albums", {
				title: payload.title,
			});

			/**
			 * Irá chamar a API várias vezes, de acordo com o número de fotos selecionadas
			 * para associar cada foto ao álbum.
			 */
			if (payload.photosIds && payload.photosIds.length > 0) {
				await Promise.all(
					payload.photosIds.map((photoId) => {
						const photosAlbumsIds =
							photos
								.find((photo) => photo.id === photoId)
								?.albums?.map((album) => album.id) || [];

						if (photosAlbumsIds?.includes(album.id)) {
							return;
						}

						return api.put(`/photos/${photoId}/albums`, {
							albumsIds: [...photosAlbumsIds, album.id],
						});
					})
				);
			}

			queryClient.invalidateQueries({ queryKey: ["albums"] });
			queryClient.invalidateQueries({ queryKey: ["photos"] });

			toast.success("Álbum criado com sucesso!");
		} catch (error) {
			toast.error("Erro ao criar o álbum!");
			throw error;
		}
	}

	return {
		createAlbum,
	};
}
