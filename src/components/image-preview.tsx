import type React from "react";
import { tv } from "tailwind-variants";

export const imagePreviewVariants = tv({
	base: "rounded-lg overflow-hidden",
	variants: {},
	defaultVariants: {},
});

export const imagePreviewImageVariants = tv({
	base: "w-full h-full object-cover",
	variants: {},
	defaultVariants: {},
});

interface ImageFilePreviewProps extends React.ComponentProps<"img"> {
	imageClassName?: string;
}

export default function ImagePreview({
	className,
	imageClassName,
	...props
}: ImageFilePreviewProps) {
	return (
		<div className={imagePreviewVariants({ className })} {...props}>
			<img
				className={imagePreviewImageVariants({ className: imageClassName })}
				{...props}
			/>
		</div>
	);
}
