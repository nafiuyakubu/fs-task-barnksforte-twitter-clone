import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:4000/api/", // API base URL
});

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ["User"],
  endpoints: (builder) => ({
    // Define your API endpoints here (example):
    // getUser: builder.query<User, void>({
    //   query: () => '/user',
    // }),
  }), // Add your API endpoints here
});

// export const { useGetUserQuery } = apiSlice; // Sample: Export hooks for the defined endpoints
export default apiSlice.reducer;
