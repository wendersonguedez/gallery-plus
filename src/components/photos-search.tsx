import InputText from "@/components/input-text";
import SearchIcon from "@/assets/icons/search.svg?react";
import React from "react";
import { debounce } from "@/helpers/utils";

export default function PhotosSearch() {
	const [value, setValue] = React.useState("");

	/**
	 * React.useCallback: Usado para não ficar reexecutando esse trecho de código.
	 */
	// eslint-disable-next-line react-hooks/exhaustive-deps
	const debouncedSearch = React.useCallback(
		debounce(
			(value: string) => console.log("Valor com debounce: ", value),
			500
		),
		[]
	);

	function handleInputSearchChange(event: React.ChangeEvent<HTMLInputElement>) {
		const value = event.target.value;

		setValue(value);
		debouncedSearch(value);
	}

	return (
		<InputText
			icon={SearchIcon}
			placeholder="Buscar fotos"
			className="flex-1"
			value={value}
			onChange={handleInputSearchChange}
		/>
	);
}
