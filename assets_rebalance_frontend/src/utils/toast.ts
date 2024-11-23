import dayjs from "dayjs";
import { toast } from "react-toastify";

export function successSaveToast(entityName: string) {
    toast.success(`${entityName} saved!`)
}