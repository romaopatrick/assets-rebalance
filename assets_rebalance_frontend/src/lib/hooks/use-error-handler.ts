import { toast } from "react-toastify"

export function useErrorHandler() {
    const handleError = (error: Error) => {
        toast.error(error.message)
    }
    return {
        handleError
    }
}