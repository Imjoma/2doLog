import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";

const initialState = {
  list: [
    // {
    //   _id: uuidv4(),
    //   image: "",
    //   title: " i added mongo",
    //   description: "soone emplo",
    //   visibility: true,
    //   createdAt: new Date(),
    // },
  ],
  status: "idle", // idle | loading | succeeded | failed
  error: null,
};

export const fetchIdeas = createAsyncThunk("idea/fetchIdeas", async () => {
  try {
    const response = await axios.get("/api/ideas"); // Example endpoint
    return response.data;
  } catch (error) {
    return error.message;
  }
});

const ideaSlice = createSlice({
  name: "idea",
  initialState,
  reducers: {
    addIdea: (state, action) => {
      const { image, title, description, visibility, username, userImage } =
        action.payload;

      state.list.push({
        id: uuidv4(),
        image,
        title,
        description,
        visibility,
        date: new Date(),
        username,
        userImage,
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchIdeas.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchIdeas.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list = action.payload;
      })

      .addCase(fetchIdeas.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { addIdea, updateIdea } = ideaSlice.actions;
export default ideaSlice.reducer;

// Optionally export selectors if needed
export const selectAllIdeas = (state) => state.ideas.list;
export const selectIdeasStatus = (state) => state.ideas.status;
export const selectIdeasError = (state) => state.ideas.error;
export const selectIdeasUpdated = (state) => state.ideas.list;
