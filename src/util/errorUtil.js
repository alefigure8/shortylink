/**
 * Maps the error response from the server to a standardized error DTO.
 * @param {Response} response - The response object from the fetch request.
 * @return {Promise<Object>} A promise that resolves to an error DTO containing status, message, and details.
 * */
export async function mapErrorResponse(response) {
  let errorDto = {
    status: response.status,
    message: "Error desconocido",
    details: null,
  };

  try {
    const data = await response.json();

    errorDto.message = data?.message || errorDto.message;
    errorDto.details = data?.errors || null;
  } catch {
    errorDto.message = "Error al procesar la respuesta del servidor";
  }

  return errorDto;
}