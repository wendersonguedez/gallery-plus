import { type VariantProps, tv } from "tailwind-variants";
import Icon from "./icon";
import Text, { textVariants } from "./text";
import UploadFileIcon from "../assets/icons/upload-file.svg?react";
import FileImageIcon from "../assets/icons/image.svg?react";
import { useWatch } from "react-hook-form";
import React from "react";

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
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	form: any;
	error?: React.ReactNode;
}

export default function InputSingleFile({
	form,
	size,
	error,
	...props
}: InputSingleFileProps) {
	const formValues = useWatch({ control: form.control });
	const name = props.name || "";
	const formFile: File = React.useMemo(
		() => formValues[name]?.[0],
		[formValues, name]
	);

	return (
		<div>
			{!formFile ? (
				<>
					<div className="w-full relative group cursor-pointer">
						<input
							type="file"
							className="absolute top-0 right-0 w-full h-full opacity-0 cursor-pointer"
							{...props}
						/>
						<div className={inputSingleFileVariants({ size })}>
							<Icon
								svg={UploadFileIcon}
								className={inputSingleFileIconVariants({ size })}
							/>
							<Text
								variant="label-medium"
								className="text-placeholder text-center"
							>
								Arraste o arquivo aqui <br />
								ou clique para selecionar
							</Text>
						</div>
						{error && (
							<Text variant="label-small" className="text-accent-red">
								Erro no campo
							</Text>
						)}
					</div>
				</>
			) : (
				<>
					{/* TODO: Poderia implementar um mapeamento dos ícones, passando para o SVG o ícone de acordo com o arquivo  */}
					<div className="flex gap-3 items-center border border-solid border-border-primary mt-5 p-3 rounded">
						<Icon svg={FileImageIcon} className="fill-white w-6 h-6" />
						<div className="flex flex-col">
							<div className="truncate max-w-80">
								<Text variant="label-medium" className="text-placeholder">
									{formFile.name}
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
									onClick={() => {
										form.setValue(name, undefined);
									}}
								>
									Remover
								</button>
							</div>
						</div>
					</div>
				</>
			)}
		</div>
	);
}
