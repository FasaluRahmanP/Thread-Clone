'use server'
import { cookies } from "next/headers";

export async function setCookies(userId:string){
    const cookiesStore=cookies()
    cookiesStore.set('userId',userId)
}