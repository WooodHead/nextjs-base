import { message } from "antd";

type MessageType = "error" | "info" | "success" | "loading" | "warning";

export const showMessage = (msg: string, type: MessageType = "info") => {
  switch (type) {
    case "error":
      message.error(msg);
      break;
    case "loading":
      message.loading(msg);
      break;
    case "success":
      message.success(msg);
      break;
    case "warning":
      message.warning(msg);
      break;
    default:
      message.info(msg);
      break;
  }
};
