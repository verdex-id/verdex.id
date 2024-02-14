/**
 * Generate a fail response object with the provided message, status, and optional detail.
 * @param {string} message - The error message.
 * @param {number} status - The HTTP status code.
 * @param {string} [detail="No detail provided"] - The optional detail message.
 * @returns {Array<Object>} An array containing:
 * - A fail response object with status, message, and detail properties.
 * - An object with the status property.
 * @example
 * // Usage example:
 * const response = failResponse("Session not found", 404);
 * console.log(response);
 */
export function failResponse(message, status, detail = "No detail provided") {
  return [
    {
      status: "fail",
      message: message,
      detail: detail,
    },
    { status: status },
  ];
}

/**
 * Generate an error response object with the provided message and status.
 * @param {string} [message="We're sorry, but something unexpected happened. Please try again later."] - The error message.
 * @param {number} [status=500] - The HTTP status code.
 * @returns {Array<Object>} An array containing:
 * - An error response object with status and message properties.
 * - An object with the status property.
 * @example
 * // Usage example:
 * const response = errorResponse("Internal Server Error", 500);
 * console.log(response);
 */
export function errorResponse(message = "We're sorry, but something unexpected happened. Please try again later." , status = 500) {
  return [
    {
      status: "error",
      message: message,
    },
    { status: status },
  ];
}

/**
 * Generate a success response object with the provided data.
 * @param {any} data - The data to be included in the success response.
 * @returns {Array<Object>} An array containing:
 * - A success response object with status and data properties.
 * - An object with the status property.
 * @example
 * // Usage example:
 * const response = successResponse({ message: "Data successfully retrieved" });
 * console.log(response);
 */
export function successResponse(data) {
  return [
    {
      status: "success",
      data: data,
    },
    { status: 200 },
  ];
}
