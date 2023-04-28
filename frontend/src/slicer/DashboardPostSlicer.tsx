import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import React from "react";
import useAxios from "../utils/useAxios";
export interface Post {
  id: number;
  title: string;
  author: string;
  publisher: string;
  content: string;
  status: string;
  actions: React.ReactElement | null;
}
export interface Category {
  label: string;
}
interface PostState {
  posts: Post[];
  filteredPosts: Post[];
  category: Category[];
}

const initialState: PostState = {
  posts: [],
  filteredPosts: [],
  category: [],
};

const axios = useAxios();
const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const response = await axios.get("/api/posts");
  return response.data;
});

export const PostSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    // fetchPosts: (state, action: PayloadAction<{ axios: AxiosInstance }>) => {
    //   let axios = action.payload.axios;
    //   axios.get("/posts/").then((res) => {
    //     console.log(res.data);
    //     return state.posts.push(...res.data);
    //   });
    //   console.log("Fetching posts");
    // },
    // fetchCategory: (state) => {
    //   // axios.get("/category/").then((res) =>
    //   //   state.category.push(
    //   //     res.data.map((map: { name: string }) => {
    //   //       return { label: map.name };
    //   //     })
    //   //   )
    //   // );
    // },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      state.posts = action.payload;
    });
  },
});

export default PostSlice.reducer;
export const {} = PostSlice.actions;
export { fetchPosts };
