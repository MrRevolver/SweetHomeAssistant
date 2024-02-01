import { toast } from "react-toastify";

export function errorHandler (err: Error | unknown) {
   toast.error(err instanceof Error ? err.message : JSON.stringify(err).replace(/['"]+/g, ''));
}
