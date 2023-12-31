import { useState, useEffect } from 'react'
import './App.css'
import requestList from './utils/requestList';
import '@chatui/core/es/styles/index.less';
// 引入组件
import Chat, { Bubble, useMessages } from '@chatui/core';
// 引入样式
import '@chatui/core/dist/index.css';


function LangchainChat() {
  const { messages, appendMsg, setTyping } = useMessages([]);
  const LanchainAi = async (text: string) => {
    const res = await requestList.getLangchain({
      text
    });
    return res;
  };
  const getWenxinServer = async (text: string) => {
    const params = {
      message: text
    }
    const res = await requestList.getPythonWenxin(params)
    return res;
  }

  function renderMessageContent(msg: any) {
    const { content } = msg;
    return <Bubble content={content.text} />;
  }

  async function handleSendLangchain(type: string, val: string) {
    if (type === 'text' && val.trim()) {
      appendMsg({
        type: 'text',
        content: { text: val },
        position: 'right',
      });
      setTyping(true);
      const res = await getWenxinServer(val);
      console.log('res', res);
      appendMsg({
        type: 'text',
        content: { text: (
          res?.data?.kwargs?.content 
          || res?.data?.response 
          || res?.data.message
          || 'sorry').split('/n')[0].split('Human')[0] },
      });
    }
  }

  return (
    <Chat
      navbar={{ title: '文心 + Langchain Demo' }}
      messages={messages}
      renderMessageContent={renderMessageContent}
      onSend={handleSendLangchain}
    />
  )
}


function App() {
  const { messages, appendMsg, setTyping } = useMessages([]);

  const opneaiFunc = async (text: string) => {
    const res = await requestList.getExpress({
      text
    });
    return res;
  }

  const LanchainAi = async (text: string) => {
    const res = await requestList.getLangchain({
      text
    });
    return res;
  };

  const getPythonServer = async () => {
    const res = await requestList.getPython({})
    console.log('res', res);
    return res;
  }
  const postPythonServer = async () => {
    const params = {
      name: 'test',
      age: 18
    }
    const res = await requestList.postPython(params)
    console.log('res', res);
    return res;
  }

  useEffect(() => {
    // opneaiFunc();
    // getPythonServer();
    // postPythonServer();
  }, [])

  async function handleSend(type: string, val: string) {
    if (type === 'text' && val.trim()) {
      appendMsg({
        type: 'text',
        content: { text: val },
        position: 'right',
      });
      setTyping(true);
      const res = await opneaiFunc(val);
      console.log('res', res);
      appendMsg({
        type: 'text',
        content: { text: res?.data?.result || res?.data?.response || 'sorry' },
      });
    }
  }

  function renderMessageContent(msg: any) {
    const { content } = msg;
    return <Bubble content={content.text} />;
  }


  return (
    <>
      <Chat
        navbar={{ title: '使用文心原生API Demo' }}
        messages={messages}
        renderMessageContent={renderMessageContent}
        onSend={handleSend}
      />

      <LangchainChat />
    </>
  )
}

export default App
