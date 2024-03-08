import { BASE_URL_API } from './constants';

enum HttpMethod {
	GET = 'GET',
	POST = 'POST',
	PUT = 'PUT',
	DELETE = 'DELETE',
	PATCH = 'PATCH',
	HEAD = 'HEAD',
	OPTIONS = 'OPTIONS',
	CONNECT = 'CONNECT',
	TRACE = 'TRACE',
}
/**
 * Класс для отправки запросов к серверу
 */

interface QueryParam {
	endpoint: string;
	method?: HttpMethod;
	body?: BodyInit | null;
	headers?: Headers;
}

export class ApiService {
	/**
	 * @param {string} baseUrl Адрес сервера
	 */
	private readonly baseUrl;
	constructor(baseUrl: string) {
		this.baseUrl = baseUrl;
	}

	/**
	 * Метод для отправки запроса к серверу
	 * @param {Object} config Объект с настройками
	 * @param {string} config.endpoint Адрес относительно сервера
	 * @param {string} [config.method] Метод запроса
	 * @param {string} [config.body] Тело запроса
	 * @param {Headers} [config.headers] Заголовки запроса
	 * @returns {Promise<Response>}
	 */

	public async load({
		endpoint,
		method = HttpMethod.GET,
		body = null,
		headers = new Headers(),
	}: QueryParam): Promise<Response> {
		try {
			const response = await fetch(`${this.baseUrl}/${endpoint}`, {
				method,
				body,
				headers,
			});

			ApiService.checkStatus(response);
			return response;
		} catch (err) {
			throw ApiService.catchError(err as Error);
		}
	}

	/**
	 * Метод для обработки ответа
	 * @param {Response} response Объект ответа
	 * @returns {Promise}
	 */
	static parseResponse<T>(response: Response): Promise<T> {
		return response.json();
	}

	/**
	 * Метод для проверки ответа
	 * @param {Response} response Объект ответа
	 */
	static checkStatus(response: Response): Error | void {
		if (!response.ok) {
			throw new Error(`${response.status}: ${response.statusText}`);
		}
	}

	/**
	 * Метод для обработки ошибок
	 * @param {Error} err Объект ошибки
	 */
	static catchError(err: Error) {
		throw err;
	}
}

export default new ApiService(BASE_URL_API);
