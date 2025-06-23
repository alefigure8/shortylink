/**
 * Maps the error response from the server to a standardized error DTO.
 * @param {Response} response - The response object from the fetch request.
 * @return {Promise<Object>} A promise that resolves to an error DTO containing status, message, and details.
 * */
export async function ErrorResponse(response) {
  let errorDto = {
    status: 400,
    message: "Error desconocido. Intente nuevamente",
    details: null,
    title: "Error"
  };

  try {
    const data = await response.json();
    errorDto.status = data?.status || errorDto.status
    errorDto.message = data?.message || errorDto.message;
    errorDto.details = data?.errors || null;
    errorDto.title = data?.title || null;
  } catch {
    errorDto.message = "Error al procesar la respuesta del servidor";
  }

  return errorDto;
}