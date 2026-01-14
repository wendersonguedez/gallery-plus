import Button from "@/components/button";
import Container from "@/components/container";
import ImagePreview from "@/components/image-preview";
import Skeleton from "@/components/skeleton";
import Text from "@/components/text";
import AlbumsListSelectable from "@/contexts/albums/components/albums-list-selectable";
import useAlbums from "@/contexts/albums/hooks/use-albums";
import PhotosNavigator from "@/contexts/photos/components/photos-navigator";
import usePhoto from "@/contexts/photos/hooks/use-photo";
import { useParams } from "react-router";

export default function PagePhotoDetails() {
	const { id } = useParams();
	const { photo, isLoadingPhoto, previousPhotoId, nextPhotoId } = usePhoto(id);
	const { albums, isLoadingAlbums } = useAlbums();

	if (!isLoadingPhoto && !photo) {
		return <div>Foto não encontrada</div>;
	}

	return (
		<Container>
			<header className="flex items-center justify-between gap-8 mb-8">
				{!isLoadingPhoto ? (
					<Text as="h2" variant="heading-large">
						{photo?.title}
					</Text>
				) : (
					<Skeleton className="w-48 h-8" />
				)}

				<PhotosNavigator
					previousPhotoId={previousPhotoId}
					nextPhotoId={nextPhotoId}
					loading={isLoadingPhoto}
				/>
			</header>

			<div className="grid grid-cols-[21rem_1fr] gap-24">
				<div className="space-y-3 mb-4">
					{!isLoadingPhoto ? (
						<ImagePreview
							src={`${import.meta.env.VITE_IMAGES_URL}/${photo?.imageId}`}
							title={photo?.title}
							imageClassName="h-[21rem] rounded-lg"
						/>
					) : (
						<Skeleton className="h-[21rem] rounded-lg" />
					)}

					{!isLoadingPhoto ? (
						<Button variant="destructive">Excluir</Button>
					) : (
						<Skeleton className="w-20 h-10" />
					)}
				</div>

				<div className="py-3">
					<Text as="h3" variant="heading-medium" className="mb-6">
						Álbuns
					</Text>

					{!isLoadingPhoto && photo ? (
						<AlbumsListSelectable
							albums={albums}
							loading={isLoadingAlbums}
							photo={photo}
						/>
					) : (
						<Skeleton className="h-[2.5rem]" />
					)}
				</div>
			</div>
		</Container>
	);
}
