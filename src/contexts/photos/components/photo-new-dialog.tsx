import React from "react";
import Alert from "@/components/alert";
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
import ImagePreview from "@/components/image-preview";
import InputSingleFile from "@/components/input-single-file";
import InputText from "@/components/input-text";
import Skeleton from "@/components/skeleton";
import Text from "@/components/text";
import useAlbums from "@/contexts/albums/hooks/use-albums";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	photoNewFormSchema,
	type PhotoNewFormData,
} from "@/contexts/photos/schema";

import { useForm } from "react-hook-form";

interface PhotoNewDialogProps {
	trigger: React.ReactNode;
}

export default function PhotoNewDialog({ trigger }: PhotoNewDialogProps) {
	/**
	 * Ao clicar em onSubmit, todos os dados do formulário serão capturados
	 * e automaticamente o zodResolver irá rodar as regras de validações que
	 * foram definidas na constante photoNewFormSchema.
	 *
	 * Se houver erros, o envio é bloqueado. Se estiver tudo certo,
	 * a função de submit é executada.
	 */
	const form = useForm<PhotoNewFormData>({
		resolver: zodResolver(photoNewFormSchema),
	});

	const { albums, isLoadingAlbums } = useAlbums();

	const file = form.watch("file");
	const fileSource = file?.[0] ? URL.createObjectURL(file[0]) : undefined;
	const [modalOpen, setModalOpen] = React.useState(false);

	React.useEffect(() => {
		if (!modalOpen) {
			form.reset();
			form.clearErrors();
		}
	}, [form, modalOpen]);

	function handleSavePhoto(payload: PhotoNewFormData) {
		console.log(payload);
	}

	return (
		/**
		 * open e onOpenChange são estados para controlar a abertura e fechamento da modal.
		 */
		<Dialog open={modalOpen} onOpenChange={setModalOpen}>
			<DialogTrigger asChild>{trigger}</DialogTrigger>
			<DialogContent>
				<form onSubmit={form.handleSubmit(handleSavePhoto)}>
					<DialogHeader>Adicionar foto</DialogHeader>

					<DialogBody className="flex flex-col gap-5">
						<InputText
							placeholder="Adicione um título"
							maxLength={255}
							error={form.formState.errors.title?.message}
							{...form.register("title")}
						/>

						<Alert>
							Tamanho máximo: 50MB
							<br />
							Você pode selecionar arquivos em PNG, JPG, JPEG
						</Alert>

						<InputSingleFile
							form={form}
							allowedExtensions={["png", "jpg", "jpeg"]}
							maxFileSizeInMB={50}
							replaceBy={
								fileSource ? (
									<ImagePreview src={fileSource} className="w-full h-56" />
								) : null
							}
							error={form.formState.errors.file?.message}
							{...form.register("file")}
						/>

						<div className="space-y-3">
							<Text variant="label-small">Selecionar álbums</Text>
							<div className="flex flex-wrap gap-3 mt-1">
								{!isLoadingAlbums &&
									albums.length > 0 &&
									albums.map((album) => (
										<Button
											key={album.id}
											variant="ghost"
											size="sm"
											className="truncate"
										>
											{album.title}
										</Button>
									))}

								{isLoadingAlbums &&
									Array.from({ length: 5 }).map((_, index) => (
										<Skeleton
											key={`album-loading-${index}`}
											className="w-20 h-7"
										/>
									))}
							</div>
						</div>
					</DialogBody>

					<DialogFooter>
						<DialogClose asChild>
							<Button variant="secondary">Cancelar</Button>
						</DialogClose>

						<Button type="submit">Adicionar</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
}
