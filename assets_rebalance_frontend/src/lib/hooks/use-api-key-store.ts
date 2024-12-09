'use client'

import { create } from "zustand"
import { persist, createJSONStorage} from 'zustand/middleware'

type ApiKeyStore = {
    apiKeyPath: string
    apiKey?: string
    setApiKey: (apikey: string) => void
    getApiKey: () => string | undefined
}


export const useApiKeyStore = create(
    persist<ApiKeyStore>(
        (set, get) => ({
            apiKeyPath: '/auth',
            getApiKey: () => get().apiKey,
            setApiKey: (apiKey: string) => set({ apiKey }),
        }),
        {
            name: 'api-key-storage',
            storage: createJSONStorage(() => localStorage)
        },
    ),
)
