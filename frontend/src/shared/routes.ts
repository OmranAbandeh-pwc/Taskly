export const WINDOW_PATH = "http://localhost:5000/api/v1";

export const PAGES = {
  INITIAL_PAGE: "/",
  USER_PAGE: "/user/page",
  SIGNUP_PAGE: "/SignupPage",
  TASK_DETAILS_PAGE: "/task/details",
  CREATE_TASK_PAGE: "/task/create",
  TASK_EDIT_PAGE: "/task/edit",
};

export const AUTH = {
  SIGNIN: `${WINDOW_PATH}/signin`,
  SIGNUP: `${WINDOW_PATH}/signup`,
};

export const API = {
  get: {
    GET_CARDS_FILTER: `${WINDOW_PATH}/tasks?importance=`,
    CARD_DETAILS: `${WINDOW_PATH}/get/task`,
    GET_USERS_DETAILS: `${WINDOW_PATH}/user`,
  },
  post: {
    ADD_TASK: `${WINDOW_PATH}/add/task`,
    SEARCH_TASK: `${WINDOW_PATH}/search?title=`,
  },
  delete: {
    DELETE_TASK: `${WINDOW_PATH}/delete`,
    DELETE_ALL_TASKS: `${WINDOW_PATH}/clear/all/tasks`,
  },
  put: {
    EDIT_TASK: `${WINDOW_PATH}/update`,
  },
};
