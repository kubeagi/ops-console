// import { EventStreamContentType, fetchEventSource } from '@microsoft/fetch-event-source';
import { message } from 'antd';
import { useCallback, useEffect, useMemo, useRef } from 'react';

type Props = {
  queryAgentURL?: string;
};

type ChatParams = {
  context: string;
  data?: Record<string, any>;
  onMessage: (message: string) => void;
  onClose?: () => void;
  onDone?: () => void;
  onError?: (content: string, error?: Error) => void;
};

const useChat = ({ queryAgentURL = '' }: Props) => {
  const ctrlRef = useRef<any>();
  const chat = useCallback(
    async ({ context, onMessage, onClose, onDone, onError }: ChatParams) => {
      const ctrl = new AbortController();
      ctrlRef.current = ctrl;
      const parmas = {
        question: context,
      };

      try {
        // await fetchEventSource(`${process.env.API_BASE_URL ?? ''}${queryAgentURL}`, {
        //   method: 'POST',
        //   headers: {
        //     'Content-Type': 'application/json',
        //   },
        //   body: JSON.stringify(parmas),
        //   signal: ctrl.signal,
        //   openWhenHidden: true,
        //   async onopen(response) {
        //     if (response.ok && response.headers.get('content-type') === EventStreamContentType) {
        //       return;
        //     }
        //   },
        //   onclose() {
        //     ctrl.abort();
        //     onClose?.();
        //   },
        //   onerror(err) {
        //     throw new Error(err);
        //   },
        //   onmessage: (event) => {
        //     const message = event.data?.replaceAll('\\n', '\n');
        //     if (message === 'done') {
        //       onDone?.();
        //     } else if (message?.startsWith('[ERROR]')) {
        //       onError?.(message?.replace('[ERROR]', ''));
        //     } else {
        //       const _msg = JSON.parse(message)
        //       onMessage?.(_msg.message);
        //     }
        //   },
        // });
      } catch (err) {
        ctrl.abort();
        onError?.('Sorry, We meet some error, please try agin later.', err as Error);
      }
    },
    [queryAgentURL]
  );

  useEffect(() => {
    return () => {
      ctrlRef.current?.abort();
    };
  }, []);

  return { chat, AbortChat: ctrlRef.current };
};

export default useChat;
