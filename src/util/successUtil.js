export async function SuccessResponse(response) {

  let successDto = {
    status: response.status,
    ok: response.ok,
    message: "Operación exitosa",
    data: null,
  };

  return successDto;
}
