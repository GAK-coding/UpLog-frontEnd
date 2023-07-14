import message from 'antd/lib/message';

type MessageType = 'success' | 'error' | 'warning';

interface UseMessage {
  showMessage: (type: MessageType, content: string) => void;
  contextHolder: React.ReactNode;
}

export const useMessage = (): UseMessage => {
  const [messageApi, contextHolder] = message.useMessage();

  const showMessage = (type: MessageType, content: string) => {
    messageApi.open({
      type,
      content,
    });
  };

  return { showMessage, contextHolder };
};
