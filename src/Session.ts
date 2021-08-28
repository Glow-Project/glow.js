import "axios";
import axios, { AxiosResponse, AxiosInstance } from "axios";
import FormData = require("form-data");
import { baseUrl as defaultBaseUrl } from "./utility/baseurl";
import { BadRequest, Forbidden, NotFound } from "./utility/errors";

/**
 * The Session object **needs** to be passed to every other **glow collection**
 */
export class Session {
	requester: AxiosInstance;

	/**
	 * @param token The Token of your account
	 * @param baseUrl The BaseUrl (leave empty if you want to use official Servers)
	 */
	constructor(token: string, baseUrl: string = defaultBaseUrl) {
		let config = {
			baseURL: baseUrl,
			headers: {
				Authorization: `Bearer ${token}`,
			},
		};

		this.requester = axios.create(config);
	}

	/**
	 *
	 * @param route The path to the ressource. Has to start with `/`
	 * @returns The `JSON` response
	 */
	async get(route: string) {
		let response = await this.requester.get(route);

		return Session.parseResponse(response);
	}

	/**
	 *
	 * @param route The path to the ressource. Has to start with `/`
	 * @param data The Form-data you want to send with your request
	 * @returns The `JSON` response
	 */
	async post(route: string, data: FormData = new FormData()) {
		let response = await this.requester.post(route, data, {
			headers: data.getHeaders(),
		});

		return Session.parseResponse(response);
	}

	/**
	 *
	 * @param route The path to the ressource. Has to start with `/`
	 * @param data The Form-data you want to send with your request
	 * @returns The `JSON` response
	 */
	async delete(route: string, data: FormData = new FormData()) {
		let response = await this.requester.post(route, data, {
			headers: data.getHeaders(),
		});

		return Session.parseResponse(response);
	}

	/**
	 *
	 * @returns true if the Session-token is valid
	 */
	async valid() {
		await this.requester.get("/secret");

		return true;
	}

	/**
	 *
	 * @param resp The `AxiosResponse` object of the request
	 * @returns The `JSON` data
	 */
	private static parseResponse(resp: AxiosResponse<any>) {
		switch (resp.status) {
			case 200:
				break;

			case 400:
				throw new BadRequest();

			case 403:
				throw new Forbidden();

			case 404:
				throw new NotFound();
		}

		return resp.data;
	}

	/**
	 *
	 * @param username The Username of your new account
	 * @param password The Password of your new account
	 * @param baseUrl The BaseUrl (leave empty if you want to use official Servers)
	 */
	static async register(
		username: string,
		password: string,
		baseUrl: string = defaultBaseUrl
	) {
		var form = new FormData();
		form.append("name", username);
		form.append("password", password);

		Session.parseResponse(
			await axios.post(`${baseUrl}/register`, form, {
				headers: form.getHeaders(),
			})
		);
	}

	/**
	 *
	 * @param username The Username of your new account
	 * @param password The Password of your new account
	 * @param baseUrl The BaseUrl (leave empty if you want to use official Servers)
	 *
	 * @returns A new `Session` object with your account
	 */
	static async login(
		username: string,
		password: string,
		baseUrl: string = defaultBaseUrl
	) {
		var form = new FormData();
		form.append("user", username);
		form.append("password", password);

		let response = Session.parseResponse(
			await axios.post(`${baseUrl}/login`, form, {
				headers: form.getHeaders(),
			})
		);

		return new Session(response.token, baseUrl);
	}
}
