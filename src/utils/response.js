
import { NextResponse } from "next/server";

/**
 * Generates a JSON response indicating failure with the specified message and status code.
 * @param {string} message - The message describing the reason for failure.
 * @param {number} status - The HTTP status code to be included in the response.
 * @returns {NextResponse} A NextResponse object containing the JSON response.
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
 * Generates an error response object with the specified message and status code.
 * @param {string} message - The error message.
 * @param {number} status - The HTTP status code.
 * @returns {Array} An array containing the error response object and the status object.
 */
export function errorResponse(message, status) {
  return [
    {
      status: "error",
      message: message,
    },
    { status: status },
  ];
}

/**
 * Generates a success response object with the specified data.
 * @param {any} data - The data to be included in the success response.
 * @returns {Array} An array containing the success response object and the status object.
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
