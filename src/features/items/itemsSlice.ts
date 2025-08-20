import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import type { RootState } from '../../app/store';

export interface Item {
  id: number;
  title: string;
  body: string;
}

interface ItemsState {
  items: Item[];
  favorites: number[];
  status: 'idle' | 'loading' | 'failed';
  error: string | null;
}

const initialState: ItemsState = {
  items: [],
  favorites: JSON.parse(localStorage.getItem('favorites') || '[]'),
  status: 'idle',
  error: null,
};

// Example API: JSONPlaceholder posts
export const fetchItems = createAsyncThunk('items/fetchItems', async () => {
  const response = await axios.get<Item[]>('https://jsonplaceholder.typicode.com/posts');
  return response.data.slice(0, 20); // limit
});

export const addItem = createAsyncThunk('items/addItem', async (newItem: Partial<Item>) => {
  const response = await axios.post<Item>('https://jsonplaceholder.typicode.com/posts', newItem);
  return response.data;
});

export const updateItem = createAsyncThunk('items/updateItem', async (item: Item) => {
  const response = await axios.put<Item>(`https://jsonplaceholder.typicode.com/posts/${item.id}`, item);
  return response.data;
});

const itemsSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    toggleFavorite: (state, action) => {
      if (state.favorites.includes(action.payload)) {
        state.favorites = state.favorites.filter(id => id !== action.payload);
      } else {
        state.favorites.push(action.payload);
      }
      localStorage.setItem('favorites', JSON.stringify(state.favorites));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchItems.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchItems.fulfilled, (state, action) => {
        state.status = 'idle';
        state.items = action.payload;
      })
      .addCase(fetchItems.rejected, (state) => {
        state.status = 'failed';
        state.error = "Failed to fetch items";
      })
      .addCase(addItem.fulfilled, (state, action) => {
        state.items.unshift(action.payload);
      })
      .addCase(updateItem.fulfilled, (state, action) => {
        const index = state.items.findIndex(i => i.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      });
  },
});

export const { toggleFavorite } = itemsSlice.actions;
export const selectItems = (state: RootState) => state.items;
export default itemsSlice.reducer;
