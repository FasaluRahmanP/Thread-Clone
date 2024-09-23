import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { AppDispatch, Rootstate } from "../Store/Store";

export const useAppDispatch=()=>useDispatch<AppDispatch>()
export const useAppSelector:TypedUseSelectorHook<Rootstate>=useSelector