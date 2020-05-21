export function captureErrorRequest(error) {
    return {
        type: '@log/CAPTURE_ERROR_REQUEST',
        payload: error,
    };
}

export function captureErrorSuccess() {
    return {
        type: '@log/CAPTURE_ERROR_SUCCESS',
    };
}

export function sendLogRequest() {
    return {
        type: '@log/SEND_LOG_REQUEST',
    };
}

export function sendLogSuccess() {
    return {
        type: '@log/SEND_LOG_SUCCESS',
    };
}
