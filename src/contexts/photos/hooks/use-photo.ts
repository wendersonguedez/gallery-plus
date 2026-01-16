import { api, fetcher } from "@/helpers/api";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Photo } from "@/contexts/photos/models/photo";
import { PhotoNewFormData } from "@/contexts/photos/schema";
import { toast } from "sonner";

interface PhotoDetailResponse extends Photo {
	nextPhotoId?: string;
	previousPhotoId?: string;
}

export default function usePhoto(id?: string) {
	/**
	 * Ao fazer 'useQuery<PhotoDetailResponse>', a propriedade 'data' passa a ter
	 * todas as propriedades de 'Photo'.
	 *
	 * !!id => Verifica se existe e realiza a conversão para boolean. Se existir,
	 * converte para um boolean true, se não existir, converte para um boolean
	 * false.
	 */
	const { data, isLoading } = useQuery<PhotoDetailResponse>({
		queryKey: ["photo", id],
		queryFn: () => fetcher(`/photos/${id}`),
		enabled: !!id,
	});

	const queryClient = useQueryClient();

	async function createPhoto(payload: PhotoNewFormData) {
		try {
			const { data: photo } = await api.post<Photo>("/photos", {
				title: payload.title,
			});

			await api.post(
				`/photos/${photo.id}/image`,
				{
					file: payload.file[0],
				},
				{
					headers: {
						"Content-Type": "multipart/form-data",
					},
				}
			);

			if (payload.albumsIds && payload.albumsIds.length > 0) {
				await api.put(`/photos/${photo.id}/albums`, {
					albumsIds: payload.albumsIds,
				});
			}

			queryClient.invalidateQueries({ queryKey: ["photos"] });

			toast.success("Foto criada com sucesso!");
		} catch (error) {
			toast.error("Erro ao criar a foto!");
			throw error;
		}
	}

	return {
		photo: data,
		nextPhotoId: data?.nextPhotoId,
		previousPhotoId: data?.previousPhotoId,
		isLoadingPhoto: isLoading,
		createPhoto,
	};
}
