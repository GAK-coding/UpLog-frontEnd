import React from 'react';
import { Chats } from '../../../mocks/api/data/project/chat.ts';
import { SaveProjectInfo } from '@/typings/project.ts';
import { Scrollbars } from 'react-custom-scrollbars';

export default function ChatList() {
  const nowProject: SaveProjectInfo = JSON.parse(sessionStorage.getItem('nowProject')!);
  const { name, chats } = Chats;

  return (
    <div className={'h-[75%]'}>
      <Scrollbars
        style={{ height: '100%' }}
        autoHide
        autoHeight
        autoHeightMax={'100%'}
        autoHideTimeout={1000}
        // Duration for hide animation in ms.
        autoHideDuration={200}
      >
        <div className={'w-h-full text-3xl px-10 mt-10'}>
          #{nowProject.version} - {name}
        </div>

        <div className={'mt-10'}>
          {chats?.map((chat, index) => {
            const { messages } = chat;
            return (
              <div key={index}>
                <div>
                  <div className={'relative mb-8'}>
                    <div className={'border-b border-line w-h-full'} />
                    <span
                      className={
                        'border border-gray-light rounded-[1.8rem] absolute top-[-0.9rem] left-[50%] translate-x-[-50%] w-48 h-8 bg-white text-gray-dark font-bold flex-row-center'
                      }
                    >
                      {chat.date}
                    </span>
                  </div>
                  {messages?.map((message, idx) => {
                    return (
                      <div key={`${index}-${idx}`} className={'mx-36 min-w-[30rem]'}>
                        <div className={'flex items-center '}>
                          <img
                            className={'w-12 h-12 rounded-[50%]'}
                            src={
                              message.image ? message.image : '/public/images/test_userprofile.png'
                            }
                            alt="user image"
                          />
                          <span className={'ml-4 text-xl text-gray-dark font-bold'}>
                            {message.nickname}({message.name})
                          </span>
                          <span className={'ml-4 text-xs text-gray-light'}>{message.time}</span>
                        </div>
                        <div className={'px-16 py-8'}>{message.message}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </Scrollbars>
    </div>
  );
}
