'use server'

import authfetch from "@/lib/api/common/auth-fetch"
import { HttpStatusCode } from "axios"
import { revalidateTag } from "next/cache"

export async function validateApiKey() {
    console.log("validating api key")

    
    const res = await authfetch(process.env.APIKEYCHECK_URL, {
        method: 'GET',
    })

    const body = res.bodyUsed ? await res.json() : null

    if (!res.ok) {
        if(res.status >= HttpStatusCode.InternalServerError)
            throw new Error("We're in maintenance of our services. Please, try again later.")
        
        throw new Error(body ?? "API KEY not authorized ")
    }

    revalidateTag('all')
}