export function checkStatus(status: number, msg: string): void {
  const $message = window['$message'];
  switch (status) {
    case 400:
      $message.error(msg);
      break;
    // 401: not logged in
    // If you are not logged in, jump to the login page and carry the path of the current page
    // Return to the current page after successful login, this step needs to be operated on the login page.
    case 401:
      $message.error('User does not have permission (token, username, password error)!');
      break;
    case 403:
      $message.error('User is authorized, but access is forbidden.!');
      break;
    // 404 request does not exist
    case 404:
      $message.error('Network request error, the resource was not found!');
      break;
    case 405:
      $message.error('Network request error, the request method is not allowed!');
      break;
    case 408:
      $message.error('Network request timed out');
      break;
    case 500:
      $message.error('Server error, please contact the administrator!');
      break;
    case 501:
      $message.error('Network not implemented');
      break;
    case 502:
      $message.error('Network error');
      break;
    case 503:
      $message.error(
        'The service is unavailable, the server is temporarily overloaded or maintained!'
      );
      break;
    case 504:
      $message.error('Network Timeout');
      break;
    case 505:
      $message.error('http version does not support this request!');
      break;
    default:
      $message.error(msg);
  }
}
