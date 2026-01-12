import axios, { type AxiosRequestConfig, type AxiosInstance } from "axios";

/**
 * Instância principal do Axios configurada com a URL base da aplicação.
 *
 * A tipagem explícita (`: AxiosInstance`) serve para garantir que o TypeScript
 * reconheça corretamente os métodos (get, post, etc.) e evite avisos de inferência.
 *
 * @type {AxiosInstance}
 */
export const api: AxiosInstance = axios.create({
	baseURL: import.meta.env.VITE_API_URL,
});

/**
 * Função utilitária (fetcher) para requisições GET.
 *
 * Retorna diretamente o `data` da resposta, facilitando o uso com bibliotecas
 * de cache como SWR ou TanStack Query.
 *
 * @param {string} url - Endpoint da API.
 * @param {AxiosRequestConfig} [options] - Configurações opcionais da requisição.
 */
export const fetcher = (url: string, options: AxiosRequestConfig = {}) =>
	api.get(url, options).then((response) => response.data);
