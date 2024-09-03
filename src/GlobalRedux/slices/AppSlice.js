import { createSlice } from "@reduxjs/toolkit";
import cities from "../../cities.json";

const appSlice = createSlice({
  name: "app",
  initialState: {
    rides: [],
    sideBarOpen: false,
    fromCities: cities.cities.map((city) => city.city),
    addModalOpen: false,
    toCities: [],
    rideFormData: {
      email: "",
      fromCity: "",
      toCity: "",
      time: "",
    },
    adminRideData: {
      fromCity: "",
      toCity: "",
      time: "",
      price: "",
    },
  },

  reducers: {
    setSideBarOpen(state, { payload }) {
      state.sideBarOpen = payload;
    },
    setAddModalOpen(state, { payload }) {
      state.addModalOpen = payload;
    },
    setToCities(state, { payload }) {
      state.toCities = payload;
    },
    setRideFormData(state, { payload }) {
      state.rideFormData = payload;
    },
    setAdminRideData(state, { payload }) {
      state.adminRideData = payload;
    },
    setRides(state, { payload }) {
      state.rides = payload;
    },
  },
});

export default appSlice.reducer;
export const {
  setSideBarOpen,
  setAddModalOpen,
  setToCities,
  setRideFormData,
  setAdminRideData,
  setRides,
} = appSlice.actions;
