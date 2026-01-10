import Button from "@/components/button";
import {
	Dialog,
	DialogBody,
	DialogClose,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTrigger,
} from "@/components/dialog";
import InputText from "@/components/input-text";
import Text from "@/components/text";
import type { Photo } from "@/contexts/photos/models/photo";

import SelectCheckboxIllustration from "@/assets/images/select-checkbox.svg?react";

import type React from "react";
import Skeleton from "@/components/skeleton";
import ImagePreview from "@/components/image-preview";

interface AlbumNewDialogProps {
	trigger: React.ReactNode;
}

export default function AlbumNewDialog({ trigger }: AlbumNewDialogProps) {
	const isLoadingPhotos = false;

	/**
	 * TODO: Utilizar API quando estiver pronta.
	 */
	const photos: Photo[] = [
		{
			id: "1",
			title: "ola mundo",
			imageId: "portrait-tower.png",
			albums: [
				{ id: "123", title: "album 1" },
				{ id: "321", title: "album 2" },
				{ id: "213", title: "album 3" },
			],
		},
	];

	return (
		<Dialog>
			{/* asChild - para não criar um botão, mas sim renderizar o componente */}
			<DialogTrigger asChild>{trigger}</DialogTrigger>
			<DialogContent>
				<DialogHeader>Novo álbum</DialogHeader>

				<DialogBody className="flex flex-col gap-5">
					<InputText placeholder="Adicione um título" />

					<div className="space-y-3">
						<Text as="div" variant="label-small" className="mb-3">
							Fotos cadastradas
						</Text>

						{!isLoadingPhotos && photos.length > 0 && (
							<div className="flex flex-wrap gap-2">
								{photos.map((photo) => (
									<ImagePreview
										className="w-20 h-20 rounded"
										key={photo.id}
										title={photo.title}
										src={`/images/${photo.imageId}`}
									/>
								))}
							</div>
						)}

						{isLoadingPhotos && (
							<div className="flex flex-wrap gap-2">
								{Array.from({ length: 7 }).map((_, index) => (
									<Skeleton
										key={`photo-loading-${index}`}
										className="w-20 h-20 rounded"
									/>
								))}
							</div>
						)}

						{!isLoadingPhotos && photos.length === 0 && (
							<div className="w-full flex flex-col justify-center items-center gap-3">
								<SelectCheckboxIllustration />
								<Text variant="paragraph-medium" className="text-center">
									Nenhuma foto disponível para seleção.
								</Text>
							</div>
						)}
					</div>
				</DialogBody>

				<DialogFooter>
					<DialogClose>
						<Button variant="secondary">Cancelar</Button>
					</DialogClose>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
