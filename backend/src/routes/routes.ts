// Main Route
export const MAIN_PATH = "/api/v1";

// User Route
export const AUTH_API = {
  SIGN_UP: "/signup",
  SIGN_IN: "/signin",
};

// Tasks Route
export const TASK_API = {
  ADD_TASK: "/add/task",
  GET_ALL_TASKS: "/tasks",
  GET_TASK: "/get/task/:id",
  UPDATE_TASK: "/update/:id",
  DELETE_TASK: "/delete/:id",
  DELETE_ALL_TASKS: "/clear/all/tasks",
};

// Users Route
export const FILTERS_API = {
  POST_SEARCH_TASKS: "/search",
  POST_IMPORTANCE_FILTER: "/filter/importance"
};

// Users Route
export const USERS_API = {
  GET_USER_DETAILS: "/user",
};
