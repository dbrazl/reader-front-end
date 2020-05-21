import produce from 'immer';

const INITIAL_STATE = {
    report: {
        id: 0,
        http: 0,
        description: '',
        date: null,
        request: {
            endpoint: '',
            method: '',
        },
        lastSendAt: null,
    },
    loading: false,
};

export default function log(state = INITIAL_STATE, action) {
    return produce(state, draft => {
        switch (action.type) {
            case '@log/CAPTURE_ERROR_REQUEST': {
                const { http, description, endpoint, method } = action.payload;

                draft.report.id += 1;
                draft.report.http = http;
                draft.report.description = description;
                draft.report.date = new Date();
                draft.report.request.endpoint = endpoint;
                draft.report.request.method = method;
                draft.loading = true;
                break;
            }

            case '@log/CAPTURE_ERROR_SUCCESS': {
                draft.loading = false;
                break;
            }

            case '@log/SEND_LOG_REQUEST': {
                draft.loading = true;
                break;
            }

            case '@log/SEND_LOG_SUCCESS': {
                draft.report.lastSendAt = new Date();
                draft.loading = false;
                break;
            }

            default:
        }
    });
}
