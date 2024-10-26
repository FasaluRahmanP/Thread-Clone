import { cookies } from "next/headers";

export function getUserId() {
    const cookiesStore = cookies();
    const userId = cookiesStore.get("userId")
    if (userId) {
        return userId.value
    }
    return null
}