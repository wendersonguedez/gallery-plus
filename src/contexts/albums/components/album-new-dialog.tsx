import React from "react";
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

import SelectCheckboxIllustration from "@/assets/images/select-checkbox.svg?react";

import Skeleton from "@/components/skeleton";
import PhotoImageSelectable from "@/contexts/photos/components/photo-image-selectable";
import usePhotos from "@/contexts/photos/hooks/use-photos";
import { useForm } from "react-hook-form";
import { AlbumNewFormData, albumNewFormSchema } from "@/contexts/albums/schema";
import { zodResolver } from "@hookform/resolvers/zod";

interface AlbumNewDialogProps {
	trigger: React.ReactNode;
}

export default function AlbumNewDialog({ trigger }: AlbumNewDialogProps) {
	const [modalOpen, setModalOpen] = React.useState(false);

	const form = useForm<AlbumNewFormData>({
		resolver: zodResolver(albumNewFormSchema),
	});

	const { photos, isLoadingPhotos } = usePhotos();

	function handleTogglePhoto(selected: boolean, photoId: string) {
		console.log(selected, photoId);
	}

	function handleSaveAlbum(payload: AlbumNewFormData) {
		console.log(payload);
	}

	return (
		<Dialog
			open={modalOpen}
			onOpenChange={(isOpen) => {
				setModalOpen(isOpen);

				if (!isOpen) {
					form.reset();
					form.clearErrors();
				}
			}}
		>
			{/* asChild - para não criar um botão, mas sim renderizar o componente */}
			<DialogTrigger asChild>{trigger}</DialogTrigger>
			<DialogContent>
				<form onSubmit={form.handleSubmit(handleSaveAlbum)}>
					<DialogHeader>Novo álbum</DialogHeader>

					<DialogBody className="flex flex-col gap-5">
						<InputText
							error={form.formState.errors.title?.message}
							{...form.register("title")}
							placeholder="Adicione um título"
						/>

						<div className="space-y-3">
							<Text as="div" variant="label-small" className="mb-3">
								Fotos cadastradas
							</Text>

							{!isLoadingPhotos && photos.length > 0 && (
								<div className="flex flex-wrap gap-2">
									{photos.map((photo) => (
										<PhotoImageSelectable
											key={photo.id}
											src={`${import.meta.env.VITE_IMAGES_URL}/${
												photo.imageId
											}`}
											title={photo.title}
											imageClassName="w-20 h-20"
											onSelectImage={(selected) =>
												handleTogglePhoto(selected, photo.id)
											}
										/>
									))}
								</div>
							)}

							{isLoadingPhotos && (
								<div className="flex flex-wrap gap-2">
									{Array.from({ length: 7 }).map((_, index) => (
										<Skeleton
											key={`photo-loading-${index}`}
											className="w-20 h-20 rounded-lg"
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
						<DialogClose asChild>
							<Button variant="secondary">Cancelar</Button>
						</DialogClose>

						<Button type="submit">Criar</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
}
