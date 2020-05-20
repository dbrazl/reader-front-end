import produce from 'immer';

const INITIAL_STATE = {
    book: {
        publicationId: 0,
        page: 0,
    },
    page: {
        htmlUrl: '',
        cssUrl: '',
    },
    content: {
        html: '',
        css: '',
        htmlPrepared: '',
    },
    status: {
        loading: false,
        error: false,
        errorMessage: '',
        success: false,
    },
};

export default function reader(state = INITIAL_STATE, action) {
    return produce(state, draft => {
        switch (action.type) {
            case '@reader/OPEN_READER_REQUEST': {
                const { publicationId, page } = action.payload;
                draft.status.loading = true;
                draft.book.publicationId = publicationId;
                draft.book.page = page;
                break;
            }

            case '@reader/GET_PAGE_SUCCESS': {
                const { htmlUrl, cssUrl } = action.payload;
                draft.page.htmlUrl = htmlUrl;
                draft.page.cssUrl = cssUrl;
                break;
            }

            case '@reader/GET_HTML_SUCCESS': {
                draft.content.html = action.payload.html;
                break;
            }

            case '@reader/GET_CSS_SUCCESS': {
                draft.content.css = action.payload.css;
                break;
            }

            case '@reader/SET_HTML_PREPARED_SUCCESS': {
                draft.content.htmlPrepared = action.payload.html;
                break;
            }

            case '@reader/OPEN_READER_FAILURE': {
                draft.status.loading = false;
                draft.status.error = true;
                draft.status.errorMessage = action.payload.errorMessage;
                draft.status.success = false;
                break;
            }

            case '@reader/OPEN_READER_SUCCESS': {
                draft.status.loading = false;
                draft.status.success = true;
                break;
            }

            default:
        }
    });
}
