import React, { useCallback } from 'react';
import useInput from '../hooks/useInput';
import { FiUser } from 'react-icons/fi';
import { MdOutlineMailOutline } from 'react-icons/md';
import {
  AiOutlineCheckCircle,
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiOutlineLock,
} from 'react-icons/ai';

export default function SignUp() {
  const [isEach, , setIsEach] = useInput(true);
  const [isPwVisible, , setIsPwVisible] = useInput(false);

  const onChangeIsEach = useCallback((check: boolean) => setIsEach(check), []);
  const onChangeIsPwVisible = useCallback(() => setIsPwVisible((prev) => !prev), []);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        alert('클릭');
      }}
      className={'h-full flex flex-col justify-center items-center'}
    >
      <section
        className={
          'border-solid border-[0.6px] border-header-gray w-[39rem] h-[42rem] min-h-[42rem] shadow-sign-up px-20'
        }
      >
        {/* logo */}
        <article className={'h-[18%] text-3xl flex items-center'}>
          <img className={'h-16 mr-6'} src={'/images/login.png'} alt={'login logo'} />
          <span className={'font-bold'}>회원가입</span>
        </article>

        {/* infos */}
        <article className={'h-[82%] flex flex-col justify-evenly items-center mt-[-1rem]'}>
          <div className={'flex justify-center items-center w-full h-2/5'}>
            <div
              className={
                'border-solid border border-gray-light rounded-md w-full h-full flex flex-col justify-around shadow-sign-up-info'
              }
            >
              {/*개인 기업 선택*/}
              <div
                className={
                  'w-full h-1/3 flex items-center border-solid border-b border-gray-light font-bold'
                }
              >
                <button
                  type="button"
                  className={`w-1/2 h-full text-xl border-solid border-r
                   ${isEach ? 'bg-red text-red rounded-tl' : 'text-gray-light'}
                  `}
                  onClick={() => onChangeIsEach(true)}
                >
                  개인
                </button>
                <button
                  className={`w-1/2 h-full text-xl border-solid border-r ${
                    !isEach ? 'bg-orange text-black rounded-tr' : 'text-gray-light'
                  }`}
                  onClick={() => onChangeIsEach(false)}
                  type="button"
                >
                  기업
                </button>
              </div>
              {/* 이름 */}
              <span
                className={'w-full h-1/3 flex items-center border-solid border-b border-gray-light'}
              >
                <label className={'w-full h-full flex items-center'}>
                  <span className={'w-1/6 flex h-full justify-center items-center text-3xl '}>
                    <FiUser className={'stroke-gray-light'} />
                  </span>
                  <input
                    type="text"
                    placeholder={'이름'}
                    required
                    className={'w-5/6 h-full focus:outline-none text-xl'}
                  />
                </label>
              </span>
              {/*닉네임*/}
              <span className={'w-full h-1/3 flex items-center'}>
                <label className={'w-full h-full flex items-center'}>
                  <span className={'w-1/6 flex h-full justify-center items-center text-3xl '}>
                    <FiUser className={'stroke-gray-light'} />
                  </span>
                  <input
                    type="text"
                    placeholder={'닉네임'}
                    required
                    className={'w-5/6 h-full focus:outline-none text-xl rounded-br-md'}
                  />
                </label>
              </span>
            </div>
          </div>

          <div className={'flex justify-center items-center w-full h-2/5'}>
            <div
              className={
                'border-solid border border-gray-light rounded-md w-full h-full flex flex-col justify-around shadow-sign-up-info'
              }
            >
              {/* 이메일 */}
              <span
                className={'w-full h-1/3 flex items-center border-solid border-b border-gray-light'}
              >
                <label className={'w-full h-full flex items-center '}>
                  <span className={'w-1/6 flex h-full justify-center items-center text-3xl '}>
                    <MdOutlineMailOutline className={'fill-gray-light'} />
                  </span>
                  <input
                    type="email"
                    placeholder={'이메일'}
                    required
                    className={'w-5/6 h-full focus:outline-none text-xl rounded-tr-md'}
                  />
                </label>
              </span>
              {/* 인증번호 */}
              <span
                className={'w-full h-1/3 flex items-center border-solid border-b border-gray-light'}
              >
                <label className={'w-full h-full flex items-center'}>
                  <span className={'w-1/6 flex h-full justify-center items-center text-3xl'}>
                    <AiOutlineCheckCircle className={'fill-gray-light'} />
                  </span>
                  <span className={'w-5/6 h-full flex'}>
                    <input
                      type="text"
                      placeholder={'인증번호'}
                      required
                      className={'w-9/12 h-full focus:outline-none text-xl'}
                    />
                    <span className={'w-3/12 h-full flex flex-col justify-evenly items-center'}>
                      <button className={'w-16 h-9 rounded text-sm font-bold text-white bg-orange'}>
                        확인
                      </button>
                      <span className={'text-xs text-gray-dark box-border'}>
                        <span
                          className={
                            'text-gray-dark border-solid border-r border-gray-dark pr-1 mr-1'
                          }
                        >
                          0:00
                        </span>
                        <button type={'button'}>재전송</button>
                      </span>
                    </span>
                  </span>
                </label>
              </span>
              {/*비밀번호*/}
              <span
                className={'w-full h-1/3 flex items-center border-solid border-b border-gray-light'}
              >
                <label className={'w-full h-full flex items-center'}>
                  <span className={'w-1/6 flex h-full justify-center items-center text-3xl'}>
                    <AiOutlineLock className={'fill-gray-light'} />
                  </span>
                  <span className={'w-5/6 h-full flex relative'}>
                    <input
                      type={`${isPwVisible ? 'text' : 'password'}`}
                      placeholder={'비밀번호'}
                      required
                      className={'w-9/12 h-full focus:outline-none text-xl'}
                    />
                    <span
                      className={
                        'w-3/12 h-full flex flex-col justify-evenly items-center text-2xl cursor-pointer'
                      }
                      onClick={onChangeIsPwVisible}
                    >
                      {isPwVisible ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                      <span className={'absolute text-[#E06469] text-xs bottom-[2px] left-0'}>
                        영어/숫자/특수문자 포함, 8~15자로 입력해주세요.
                      </span>
                    </span>
                  </span>
                </label>
              </span>
            </div>
          </div>
        </article>
      </section>

      {/* button */}
      <button
        className={
          'flex justify-center items-center border-solid border border-header-gray rounded-md w-[39rem] h-12 mt-10 py-7 font-bold text-xl bg-orange text-white'
        }
      >
        회원가입
      </button>
    </form>
  );
}
