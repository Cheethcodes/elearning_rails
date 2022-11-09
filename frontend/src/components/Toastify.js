import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Toastify = (type, message) => (
  type === "error" ?
    toast.error(message, {
      bodyClassName: 'text-sm',
    })
    : type === "success" ?
      toast.success(message, {
        bodyClassName: 'text-sm',
      })
      :
      <></>
)
