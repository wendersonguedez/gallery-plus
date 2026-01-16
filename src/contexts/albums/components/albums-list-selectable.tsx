import React from "react";
import Text from "@/components/text";
import InputCheckbox from "@/components/input-checkbox";
import Divider from "@/components/divider";
import Skeleton from "@/components/skeleton";
import usePhotoAlbums from "@/contexts/photos/hooks/use-photo-albums";

import { Photo } from "@/contexts/photos/models/photo";
import { Album } from "@/contexts/albums/models/album";

interface AlbumsListSelectableProps extends React.ComponentProps<"ul"> {
	loading?: boolean;
	albums: Album[];
	photo: Photo;
}

export default function AlbumsListSelectable({
	loading,
	albums,
	photo,
}: AlbumsListSelectableProps) {
	const { managePhotoOnAlbum } = usePhotoAlbums();
	const [isUpdatingPhoto, setIsUpdatingPhoto] = React.useTransition();

	/**
	 * Verifica se alguma das fotos tem o alguns dos álbums em questão.
	 * Se sim, deixa o checkbox marcado.
	 */
	function isChecked(albumId: string) {
		return photo.albums.some((album) => album.id === albumId);
	}

	function handlePhotoOnAlbums(albumId: string) {
		let albumsId = [];

		if (isChecked(albumId)) {
			albumsId = photo.albums
				.filter((album) => album.id !== albumId)
				.map((album) => album.id);
		} else {
			albumsId = [...photo.albums.map((album) => album.id), albumId];
		}

		setIsUpdatingPhoto(async () => {
			await managePhotoOnAlbum(photo.id, albumsId);
		});
	}

	return (
		<ul className="flex flex-col gap-4">
			{!loading &&
				photo &&
				albums.length > 0 &&
				albums.map((album, index) => (
					<li key={album.id}>
						<div className="flex items-center justify-between gap-1">
							<Text variant="paragraph-large" className="truncate">
								{album.title}
							</Text>
							<InputCheckbox
								checked={!!isChecked(album.id)}
								onChange={() => handlePhotoOnAlbums(album.id)}
								disabled={isUpdatingPhoto}
							/>
						</div>
						{index < albums.length - 1 && <Divider className="mt-4" />}
					</li>
				))}

			{loading &&
				Array.from({ length: 5 }).map((_, index) => (
					<li key={`album-list-loading-${index}`}>
						<Skeleton className="h-[2.5rem]" />
					</li>
				))}
		</ul>
	);
}
