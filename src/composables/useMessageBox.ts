import {
  ElMessageBox,
  messageType
} from "element-plus";

export async function useMessageBox(message: string, type: messageType = "warning") {
  return await ElMessageBox.confirm(message, {
    confirmButtonText: 'Перейти',
    cancelButtonText: 'Отмена',
    type,
  });
}