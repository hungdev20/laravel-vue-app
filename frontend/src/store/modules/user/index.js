import router from "../../../router";
import instance from '../../../axios-instance';
const state = {
    //define variables
    users: [],
    user: {},
    errors: {},
};

const mutations = {
    // update variable value
    UPDATE_USERS(state, payload) {
        state.users = payload.users;
        state.user = payload.user;
    },
};

const actions = {
    // action to be performed
    getUsers(context, payload) {
        instance
            .get("/api/users", {
                params: payload
                    ? {
                          ...payload
                      }
                    : "",
            })
            .then((response) => {
                context.commit("UPDATE_USERS", {
                    ...state,
                    users: response.data,
                });
            })
            .catch((error) => {
                context.commit("UPDATE_USERS", []);
            });
    },
    deleteUser(context, payload) {
        if (confirm("Are you sure to delete this user ?")) {
            instance
                .get(`/api/user/delete/${payload}`)
                .then((response) => {
                    context.dispatch("getUsers");
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    },
    showUser(context, payload) {
        instance
            .get(`/api/user/${payload}`)
            .then((response) => {
                context.commit("UPDATE_USERS", {
                    ...state,
                    user: response.data,
                });
            })
            .catch((error) => {
                console.log(error);
            });
    },
    updateUser(context, payload) {
        instance
            .put(`/api/user/update/${payload.id}`, payload)
            .then((response) => {
                context.commit("UPDATE_USERS", {
                    ...state,
                    user: response.data,
                });
                router.push({ name: "UserList" });
            })
            .catch((error) => {
                context.commit("UPDATE_USERS", {
                    ...state,
                    errors: error.response.data.message,
                });
            });
    },
};

const getters = {
    users: (state) => state.users,
    user: (state) => state.user,
    errors: (state) => state.errors,
};
const userModule = {
    state,
    mutations,
    actions,
    getters,
};
export default userModule;
