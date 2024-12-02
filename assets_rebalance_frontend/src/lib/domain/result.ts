export class AppResult<T> {
    value?: T
    isFailed: boolean = false
    isSuccess: boolean = false
    errors: AppError[] = []

    getFinalErrorMessage(): string {
        return this.errors.map(x => x.message).join(' and ')
    }
}



export type AppError = {
    message: string
}