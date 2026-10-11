import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { Property, Updatestatus } from "../types/property";
import {
  createProperty,
  getallProperty,
  getapprovedProperty,
  getPropertyById,
  removePropertyById,
  updateStatus,
} from "../service/propertyServices";

interface PropertyState {
  items: Property[];         
  approvedItems: Property[]; 
  selected: Property | null;
  loading: boolean;
  error: string;
}

const initialState: PropertyState = {
  items: [],
  approvedItems: [],
  selected: null,
  loading: false,
  error: "",
};

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

export const addProperty = createAsyncThunk<Property, Property>(
  "property/add",
  async (property, { rejectWithValue }) => {
    try {
      return await createProperty(property);
    } catch {
      return rejectWithValue("Unable to create property");
    }
  }
);

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

      
      .addCase(deleteProperty.pending, (state) => {
        state.error = "";
      })
      .addCase(deleteProperty.fulfilled, (state, action) => {
        const id = action.meta.arg; 
        state.items = state.items.filter((p) => p.id !== id);
        state.approvedItems = state.approvedItems.filter((p) => p.id !== id);
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
      });
  },
});

export const { clearPropertyError, clearSelected } = propertySlice.actions;
export default propertySlice.reducer;