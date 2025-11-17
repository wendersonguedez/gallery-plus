import { type VariantProps, tv } from "tailwind-variants";
import Icon from "./icon";
import Text, { textVariants } from "./text";
import UploadFileIcon from "../assets/icons/upload-file.svg?react";
import FileImageIcon from "../assets/icons/image.svg?react";

export const inputSingleFileVariants = tv({
	base: `
    flex flex-col items-center justify-center w-full
    border border-solid border-border-primary
    group-hover:border-border-active
    rounded-lg transition-colors duration-400 ease-in-out
  `,
	variants: {
		size: {
			sm: "px-5 py-6 gap-2",
			md: "py-10 gap-3",
			lg: "py-16 gap-4",
		},
	},
	defaultVariants: {
		size: "md",
	},
});

export const inputSingleFileIconVariants = tv({
	base: "fill-placeholder",
	variants: {
		size: {
			sm: "w-5 h-5",
			md: "w-8 h-8",
			lg: "w-12 h-12",
		},
	},
	defaultVariants: {
		size: "md",
	},
});

interface InputSingleFileProps
	extends VariantProps<typeof inputSingleFileVariants>,
		Omit<React.ComponentProps<"input">, "size"> {
	error?: React.ReactNode;
}

export default function InputSingleFile({ size, error }: InputSingleFileProps) {
	return (
		<div>
			<div className="w-full relative group cursor-pointer">
				<input
					type="file"
					className="absolute top-0 right-0 w-full h-full opacity-0 cursor-pointer"
				/>
				<div className={inputSingleFileVariants({ size })}>
					<Icon
						svg={UploadFileIcon}
						className={inputSingleFileIconVariants({ size })}
					/>
					<Text variant="label-medium" className="text-placeholder text-center">
						Arraste o arquivo aqui <br />
						ou clique para selecionar
					</Text>
				</div>
				{error && (
					<Text variant="label-small" className="text-accent-red">
						Erro no campo
					</Text>
				)}

				{/* TODO: Poderia implementar um mapeamento dos ícones, passando para o SVG o ícone de acordo com o arquivo  */}
				<div className="flex gap-3 items-center border border-solid border-border-primary mt-5 p-3 rounded">
					<Icon svg={FileImageIcon} className="fill-white w-6 h-6" />
					<div className="flex flex-col">
						<div className="truncate max-w-80">
							<Text variant="label-medium" className="text-placeholder">
								Nome do arquivo-com-muito-nome.jpg
							</Text>
						</div>
						<div className="flex">
							{/* Importante colocar o type="button" para que não seja feito um submit */}
							<button
								type="button"
								className={textVariants({
									variant: "label-small",
									className: "text-accent-red cursor-pointer hover:underline",
								})}
							>
								Remover
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
