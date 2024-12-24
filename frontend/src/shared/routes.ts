const WINDOW_PATH = "http://localhost:5000";

export const PAGES = {
  SIGNIN: `${WINDOW_PATH}/api/v1/signin`,
  SIGNUP: `${WINDOW_PATH}/api/v1/signup`,
};

export const API = {
  get: {
    GET_CARDS: `${WINDOW_PATH}/api/v1/tasks`,
    CARD_DETAILS: `${WINDOW_PATH}/api/v1/get/task`,
  },
  post: {
    ADD_TASK: `${WINDOW_PATH}/api/v1/add/task`,
  },
  delete: {
    DELETE_TASK: `${WINDOW_PATH}/api/v1/delete`,
  },
  put: {
    EDIT_TASK: `${WINDOW_PATH}/api/v1/update`,
  },
};
