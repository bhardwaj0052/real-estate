import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { Property, Updatestatus } from "../types/property";
import {
  createProperty,
  getallProperty,
  getapprovedProperty,
  getPropertyById,
  getsavedProperty,
  removePropertyById,
  removeSavedProperty,
  saveProperty,
  updateStatus,
} from "../service/propertyServices";

interface PropertyState {
  items: Property[];         // getallProperty (owner / admin)
  approvedItems: Property[]; // getapprovedProperty (buyer)
  savedItems: Property[];    // getsavedProperty (buyer favourites)
  selected: Property | null; // getPropertyById
  loading: boolean;
  error: string;
}

const initialState: PropertyState = {
  items: [],
  approvedItems: [],
  savedItems: [],
  selected: null,
  loading: false,
  error: "",
};

// GET /properties
export const fetchProperties = createAsyncThunk<Property[]>(
  "property/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      return await getallProperty();
    } catch {
      return rejectWithValue("Unable to load properties");
    }
  }
);

// GET /properties/approved
export const fetchApprovedProperties = createAsyncThunk<Property[]>(
  "property/fetchApproved",
  async (_, { rejectWithValue }) => {
    try {
      return await getapprovedProperty();
    } catch {
      return rejectWithValue("Unable to load approved properties");
    }
  }
);

// GET /properties/:id
export const fetchPropertyById = createAsyncThunk<Property | null, string>(
  "property/fetchById",
  async (id, { rejectWithValue }) => {
    try {
      return await getPropertyById(id);
    } catch {
      return rejectWithValue("Unable to load property");
    }
  }
);

// POST /properties
export const addProperty = createAsyncThunk<Property, Omit<Property, "id">>(
  "property/add",
  async (property, { rejectWithValue }) => {
    try {
      return await createProperty(property);
    } catch {
      return rejectWithValue("Unable to create property");
    }
  }
);

// DELETE /properties/:id
export const deleteProperty = createAsyncThunk<Property | null, string>(
  "property/delete",
  async (id, { rejectWithValue }) => {
    try {
      return await removePropertyById(id);
    } catch {
      return rejectWithValue("Unable to delete property");
    }
  }
);

// PATCH /properties/status
export const changePropertyStatus = createAsyncThunk<Property | null, Updatestatus>(
  "property/updateStatus",
  async (body, { rejectWithValue }) => {
    try {
      return await updateStatus(body);
    } catch {
      return rejectWithValue("Unable to update status");
    }
  }
);

// GET /saved-properties
export const fetchSaved = createAsyncThunk<Property[]>(
  "property/fetchSaved",
  async (_, { rejectWithValue }) => {
    try {
      return await getsavedProperty();
    } catch {
      return rejectWithValue("Unable to load saved properties");
    }
  }
);

// POST /saved-properties/:id
export const savePropertyThunk = createAsyncThunk<void, string>(
  "property/save",
  async (id, { rejectWithValue }) => {
    try {
      await saveProperty(id);
    } catch {
      return rejectWithValue("Unable to save property");
    }
  }
);

// DELETE /saved-properties/:id
export const removeSaved = createAsyncThunk<void, string>(
  "property/removeSaved",
  async (id, { rejectWithValue }) => {
    try {
      await removeSavedProperty(id);
    } catch {
      return rejectWithValue("Unable to remove saved property");
    }
  }
);

const propertySlice = createSlice({
  name: "property",
  initialState,
  reducers: {
    clearPropertyError: (state) => {
      state.error = "";
    },
    clearSelected: (state) => {
      state.selected = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // fetch all
      .addCase(fetchProperties.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(fetchProperties.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchProperties.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || "Something went wrong";
      })

      // fetch approved
      .addCase(fetchApprovedProperties.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(fetchApprovedProperties.fulfilled, (state, action) => {
        state.loading = false;
        state.approvedItems = action.payload;
      })
      .addCase(fetchApprovedProperties.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || "Something went wrong";
      })

      // fetch by id
      .addCase(fetchPropertyById.pending, (state) => {
        state.loading = true;
        state.error = "";
        state.selected = null;
      })
      .addCase(fetchPropertyById.fulfilled, (state, action) => {
        state.loading = false;
        state.selected = action.payload;
      })
      .addCase(fetchPropertyById.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || "Something went wrong";
      })

      // add
      .addCase(addProperty.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(addProperty.fulfilled, (state, action) => {
        state.loading = false;
        state.items.push(action.payload);
      })
      .addCase(addProperty.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || "Something went wrong";
      })

      // delete
      .addCase(deleteProperty.pending, (state) => {
        state.error = "";
      })
      .addCase(deleteProperty.fulfilled, (state, action) => {
        const id = action.meta.arg; // jo id dispatch mein bheji thi
        state.items = state.items.filter((p) => p.id !== id);
        state.approvedItems = state.approvedItems.filter((p) => p.id !== id);
        state.savedItems = state.savedItems.filter((p) => p.id !== id);
      })
      .addCase(deleteProperty.rejected, (state, action) => {
        state.error = (action.payload as string) || "Something went wrong";
      })

      // update status
      .addCase(changePropertyStatus.pending, (state) => {
        state.error = "";
      })
      .addCase(changePropertyStatus.fulfilled, (state, action) => {
        const updated = action.payload;
        if (!updated) return;
        state.items = state.items.map((p) => (p.id === updated.id ? updated : p));
        if (state.selected?.id === updated.id) state.selected = updated;
      })
      .addCase(changePropertyStatus.rejected, (state, action) => {
        state.error = (action.payload as string) || "Something went wrong";
      })

      // fetch saved
      .addCase(fetchSaved.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(fetchSaved.fulfilled, (state, action) => {
        state.loading = false;
        state.savedItems = action.payload;
      })
      .addCase(fetchSaved.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || "Something went wrong";
      })

      // save (favourite mein add)
      .addCase(savePropertyThunk.fulfilled, (state, action) => {
        const id = action.meta.arg;
        const found = state.approvedItems.find((p) => p.id === id);
        if (found && !state.savedItems.some((p) => p.id === id)) {
          state.savedItems.push(found);
        }
      })
      .addCase(savePropertyThunk.rejected, (state, action) => {
        state.error = (action.payload as string) || "Something went wrong";
      })

      // remove saved
      .addCase(removeSaved.fulfilled, (state, action) => {
        const id = action.meta.arg;
        state.savedItems = state.savedItems.filter((p) => p.id !== id);
      })
      .addCase(removeSaved.rejected, (state, action) => {
        state.error = (action.payload as string) || "Something went wrong";
      });
  },
});

export const { clearPropertyError, clearSelected } = propertySlice.actions;
export default propertySlice.reducer;