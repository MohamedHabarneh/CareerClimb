import { writable } from "svelte/store";
import { page } from "$app/stores";
import type {User, UserWithoutPass} from "./types/user";
import type {Writable} from "svelte/store";


export const showModal = writable(false);

export const authToken:Writable<string|undefined> = writable(undefined);
export const user:Writable<UserWithoutPass|undefined> = writable(undefined);