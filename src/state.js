import { proxy, useSnapshot } from "valtio";

export const state = proxy({ todos: [] });

// ID, Status, Date, Name, and Type
