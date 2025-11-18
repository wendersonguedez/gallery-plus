import Button from "./components/button";
import ButtonIcon from "./components/button-icon";
import ChevronLeftIcon from "./assets/icons/chevron-left.svg?react";
import ChevronRightIcon from "./assets/icons/chevron-right.svg?react";
import Badge from "./components/badge";
import Alert from "./components/alert";
import Divider from "./components/divider";
import InputText from "./components/input-text";
import SearchIcon from "./assets/icons/search.svg?react";
import InputCheckbox from "./components/input-checkbox";
import InputSingleFile from "./components/input-single-file";
import { useForm } from "react-hook-form";

export default function App() {
	const form = useForm();
	return (
		<div className="grid gap-7 p-6">
			<div className="flex gap-3">
				<Button>Button</Button>
				<Button variant="secondary">Button</Button>
				<Button disabled>Button</Button>
				<Button handling>Loading</Button>
				<Button icon={ChevronRightIcon}>Próxima Imagem</Button>
				<Button variant="ghost" size="sm">
					Button
				</Button>
				<Button variant="primary" size="sm">
					Button
				</Button>
			</div>

			<div className="flex gap-3">
				<ButtonIcon icon={ChevronLeftIcon} />
				<ButtonIcon icon={ChevronRightIcon} variant="secondary" />
			</div>

			<div className="flex gap-3">
				<Badge>Todos</Badge>
				<Badge>Natureza</Badge>
				<Badge>Viagem</Badge>
				<Badge loading>Viagem</Badge>
				<Badge loading>Viagem</Badge>
				<Badge loading>Viagem</Badge>
			</div>

			<div>
				<Alert>
					Tamanho máximo: 50MB
					<br />
					Você pode selecionar arquivos em PNG, JPG, JPEG ou WEBP
				</Alert>
			</div>

			<div>
				<Divider />
			</div>

			<div>
				<InputText icon={SearchIcon} placeholder="Buscar foto" />
			</div>

			<div>
				<InputCheckbox />
			</div>

			<div>
				{/**
				 * A prop `form` passa o objeto completo retornado pelo `useForm()`.
				 * Isso permite que o componente `InputSingleFile` acesse outros
				 * métodos e estados do formulário, como `formState.errors` ou `setValue`.
				 *
				 * O `...form.register("file")` é a forma de conectar este input ao react-hook-form.
				 * Ele "espalha" (spread) as props necessárias (como onChange, onBlur, name, ref)
				 * para que a biblioteca possa gerenciar o estado e a validação deste campo.
				 * "file" é o nome que este campo terá nos dados do formulário.
				 */}
				<InputSingleFile
					allowedExtensions={["png", "jpg", "jpeg", "webp"]}
					maxFileSizeInMB={50}
					form={form}
					{...form.register("file")}
				/>
			</div>
		</div>
	);
}
