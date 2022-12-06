function successResponseWithData(res, msg, data) {
	const response = {
		status: 1,
		message: msg,
		data: data,
	};

	return res.status(200).json(response);
}

function successResponse(res, msg) {
	const response = {
		status: 1,
		message: msg,
	};

	return res.status(200).json(response);
}

function errorResponse(res, msg) {
	const response = {
		status: 0,
		message: msg,
	};

	return res.status(500).json(response);
}

function validationErrorWithData(res, msg, errorData) {
	const resData = {
		status: 0,
		message: msg,
		errors: errorData,
	};

	return res.status(400).json(resData);
}

function unauthorizedError(res, msg) {
	const resData = {
		status: 0,
		message: msg,
	};

	return res.status(401).json(resData);
}

function notFoundError(res, msg) {
	const resData = {
		status: 0,
		message: msg,
	};

	return res.status(404).json(resData);
}

module.exports = {
	successResponseWithData,
	successResponse,
	errorResponse,
	validationErrorWithData,
	unauthorizedError,
	notFoundError,
};
