import { api } from "@/helpers/api";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export default function usePhotoAlbums() {
	const queryClient = useQueryClient();

	async function managePhotoOnAlbum(photoId: string, albumIds: string[]) {
		try {
			await api.put(`/photos/${photoId}/albums`, {
				albumsIds: albumIds,
			});

			await queryClient.invalidateQueries({ queryKey: ["photo", photoId] });
			await queryClient.invalidateQueries({ queryKey: ["photos"] });

			toast.success("Álbums atualizados com sucesso!");
		} catch (error) {
			toast.error("Erro ao gerenciar álbums da foto!");
			throw error;
		}
	}

	return {
		managePhotoOnAlbum,
	};
}
