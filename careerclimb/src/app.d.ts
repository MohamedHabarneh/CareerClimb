// See https://kit.svelte.dev/docs/types#app

import type { UserWithoutPass } from "./types/user";

// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface Platform {}
		interface Locals {
			authedUser: UserWithoutPass | undefined
		}
	}
}

export {};
