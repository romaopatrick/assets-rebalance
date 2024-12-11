import { useState } from "react";
import { useErrorHandler } from "./use-error-handler";

export function useLoad() {
    const [loading, setLoading] = useState(false)

    const { handleError } = useErrorHandler()


    const start = () => {
        setLoading(true)
    }

    const stop = () => {
        setLoading(false)
    }

    const execute = async (fn: () => void | Promise<void>) => {
        try {
            start()
            await fn()
        } catch (e) {
            handleError(e as Error)
        } finally {
            stop()
        }
    }

    return {
        loading,
        start,
        stop,
        execute,
    }
}