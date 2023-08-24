import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apolloClient } from "../../graphql/apolloClient";
import { gql } from "@apollo/client";
import jwtDecode from "jwt-decode";
// import { v4 as uuidv4 } from "uuid";

// Define the GraphQL query to fetch all the users
const QUERY_ALL_USERS = gql`
  query users {
    users {
      _id
      name
      email
      password
      img
    }
  }
`;

// Define the GraphQL mutation to register a user
const MUTATION_REGISTER_USER = gql`
  mutation create($createUserInput: CreateUserInput!) {
    createUser(createUserInput: $createUserInput) {
      name
      email
      password
      img
    }
  }
`;

//Defining the GraphQL query to login a user
// const QUERY_LOGIN_USER = gql`
//   query userByEmailAndPassword($email: String!, $password: String!) {
//     userByEmailAndPassword(email: $email, password: $password) {
//       name
//       email
//       password
//     }
//   }
// `;

const MUTATION_LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      user
      email
      token
    }
  }
`;
// ***************************************************************************

//Below I created this action creator to fetch all the users from the database
export const fetchUsers = createAsyncThunk("user/fetchUsers", async () => {
  const response = await apolloClient.query({ query: QUERY_ALL_USERS });
  return response.data.users;
});

//Below I created this action creator to register a user using the mutation
export const registerUser = createAsyncThunk(
  "user/registerUser",

  async (createUserInput) => {
    try {
      const response = await apolloClient.mutate({
        mutation: MUTATION_REGISTER_USER,
        variables: { createUserInput },
      });
      return response.data.createUser;
    } catch (error) {
      console.log(error.message);
      alert("User already exists");
    }
  }
);

//Below I created this action creator to login a user using the mutation
export const loginUserMutation = createAsyncThunk(
  "user/loginUserMutation",
  async ({ email, password }) => {
    try {
      const response = await apolloClient.mutate({
        mutation: MUTATION_LOGIN_USER,
        variables: { email, password },
      });
      // console.log(response.data.login);
      window.location.href = "/Chathome";
      return response.data.login;
    } catch (error) {
      console.log(error.message);
      alert("Invalid email or password");
    }
  }
);
//****************Below is the code for token Exp check******************************
const token = localStorage.getItem("token");
if (token) {
  const decodedToken = jwtDecode(token);
  const expiresAt = new Date(decodedToken.exp * 1000);
  console.log("Exp", expiresAt);
  // console.log(decodedToken);
  // console.log(decodedToken.exp * 1000);
  if (expiresAt < Date.now()) {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  }
}

// ***************************************************************************
//Below -> Creating  the initial state
const initialState = {
  LoginUser: {},
  data: [],
  loading: false,
  error: null,
};

//********************************************************************************************* */
// Create the userSlice
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.error = null;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(registerUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.data = [...state.data, action.payload];
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(loginUserMutation.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUserMutation.fulfilled, (state, action) => {
        state.loading = false;
        // state.token = action.payload.token;
        localStorage.setItem("token", action.payload.token);
        localStorage.setItem("user", action.payload.user);
        state.LoginUser = action.payload;
        state.error = null;
      })
      .addCase(loginUserMutation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default userSlice.reducer;
