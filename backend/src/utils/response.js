export function success(res, data = {}, message = 'OK') {
  return res.status(200).json({
    success: true,
    message,
    data
  });
}

export function failure(res, error, status = 500) {
  console.error(error);
  return res.status(status).json({
    success: false,
    message: error?.message || 'Something went wrong'
  });
}
