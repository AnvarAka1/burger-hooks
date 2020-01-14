import { useState, useEffect } from "react";
export default httpClient => {
	const [ error, setError ] = useState(null);

	const reqInterceptor = httpClient.interceptors.request.use(
		req => {
			setError(null);
			return req;
		},
		error => {
			setError(error);
		}
	);
	const resInterceptor = httpClient.interceptors.response.use(
		response => response,
		error => {
			setError(error);
		}
	);

	useEffect(
		() => {
			return () => {
				httpClient.interceptors.request.eject(reqInterceptor);
				httpClient.interceptors.response.eject(resInterceptor);
			};
		},
		// eslint-disable-next-line
		[ reqInterceptor, resInterceptor ]
	);
	const errorConfirmedHandler = () => {
		setError(null);
	};
	return [ error, errorConfirmedHandler ];
};
