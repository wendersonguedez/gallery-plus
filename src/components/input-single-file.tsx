import { type VariantProps, tv } from "tailwind-variants";
import Icon from "./icon";
import Text from "./text";
import UploadFileIcon from "../assets/icons/upload-file.svg?react";

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
		React.ComponentProps<"input"> {}

export default function InputSingleFile({ size }: InputSingleFileProps) {
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
			</div>
		</div>
	);
}
