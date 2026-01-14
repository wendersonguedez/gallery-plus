import { fetcher } from "@/helpers/api";
import { useQuery } from "@tanstack/react-query";
import { Photo } from "@/contexts/photos/models/photo";

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

	return {
		photo: data,
		nextPhotoId: data?.nextPhotoId,
		previousPhotoId: data?.previousPhotoId,
		isLoadingPhoto: isLoading,
	};
}
