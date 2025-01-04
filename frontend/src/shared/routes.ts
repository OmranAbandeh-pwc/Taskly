const WINDOW_PATH = "http://localhost:5000";

export const PAGES = {
  INITIAL_PAGE: "/",
  USER_PAGE:"/user/page",
  SIGNUP_PAGE: "/SignupPage",
  TASK_DETAILS_PAGE: "/task/details",
  CREATE_TASK_PAGE: "/task/create",
  TASK_EDIT_PAGE: "/task/edit",
};

export const AUTH = {
  SIGNIN: `${WINDOW_PATH}/api/v1/signin`,
  SIGNUP: `${WINDOW_PATH}/api/v1/signup`,
};

export const API = {
  get: {
    GET_CARDS_FILTER: `${WINDOW_PATH}/api/v1/tasks?importance=`,
    CARD_DETAILS: `${WINDOW_PATH}/api/v1/get/task`,
    GET_USERS_DETAILS: `${WINDOW_PATH}/api/v1/user`,
  },
  post: {
    ADD_TASK: `${WINDOW_PATH}/api/v1/add/task`,
    SEARCH_TASK: `${WINDOW_PATH}/api/v1/search?title=`,
  },
  delete: {
    DELETE_TASK: `${WINDOW_PATH}/api/v1/delete`,
    DELETE_ALL_TASKS: `${WINDOW_PATH}/api/v1/clear/all/tasks`,
  },
  put: {
    EDIT_TASK: `${WINDOW_PATH}/api/v1/update`,
  },
};
