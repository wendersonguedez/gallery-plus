/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * T extends(...args: any[]): Um tipo dos argumentos que vão ser recebidos.
 * func: T => função que vai ser executada.
 * wait: number => tempo que a função tem que esperar para ser executada.
 *
 * Ou seja, a função passada como argumento, será executada somente após o tempo definido, ter passado.
 * Caso alguma coisa seja digitada, o tempo é "zerado" e a função só será executada após esse novo tempo definido.
 */
export function debounce<T extends (...args: any[]) => any>(
	func: T,
	wait: number
) {
	/**
	 * Variável que controla se a função tem que ser executada ou não. Ela recebe os mesmos valores e tipos
	 * de um setTimeout.
	 */
	let timeout: ReturnType<typeof setTimeout> | null = null;

	/**
	 * Função que será retornada
	 */
	return function (...args: Parameters<T>): void {
		/**
		 * É a função enviada por parâmetro (func: T) que será executada, depois que o tempo determinado passar.
		 */
		const later = () => {
			timeout = null;
			func(...args);
		};

		/**
		 * Se digitou algo, zera o timeout. Ou seja, se já tentou executar uma vez, ainda não passou o tempo determinado e
		 * digitou novamente (nova inserção de dado no input), o timeout vai ser limpado e começará a executar novamente o código.
		 */
		if (timeout !== null) {
			clearTimeout(timeout);
		}

		/**
		 * Se não digitou nada, irá executar a função depois de determinado tempo. Ou seja, se digitei uma vez e
		 * não fiz nova inserção de dado no input, após aquele tempo definido, vai executar a função enviada por parâmetro.
		 */
		timeout = setTimeout(later, wait);
	};
}
