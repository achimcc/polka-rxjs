import { createSlice, createAction, PayloadAction } from "@reduxjs/toolkit";

export interface Action {
  type: string;
  payload: object | number | string;
}
