"use client"
import { CheckListForm } from "@/components/auth/CheckListForm";
import { SearchForm } from "@/components/auth/SearchForm";
import { ReactNode, useState } from "react";

interface imgProps {
  src: string;
  className: string;
}

interface textProps {
  text: ReactNode;
  className: string;
  isEmpty?: boolean;
}

const ImageSection = ({ src, className }: imgProps) => (
  <img src={src} className={className} />
);

const TextSection = ({ text, className, isEmpty }: textProps) => {
  if(isEmpty) {
    return (
      <span className={`${className} inline-block`} style={{ fontFamily: 'Nanum Square', lineHeight: '18.16px' }}>
        {text}
      </span>
    );
  } else {
    return null;
  }
};

export default function Home() {
  const [todo, setAddTodo] = useState<string[]>([]);
  const handleAddTodo = (text:string) => {
    setAddTodo([...todo, text]);
  }

  return (
    <main>
      <SearchForm onAddTodo={handleAddTodo}/>
      {/* TO DO 리스트 */}
      <div className="flex flex-col">
        <ImageSection
          src="/img/todo.png"
          className="w-[101px] h-[36px] mt-[96px] relative ml-[16px] lg:mt-[120px] lg:ml-[360px] sm:mt-[120px] sm:ml-[24px]"
        />
        <div className="w-[334px] sm:w-[696px] lg:w-[588px]">
        <CheckListForm todo={todo}/>
        </div>
        <div className="flex flex-col items-center lg:mt-[140px] lg:hidden">
          <ImageSection
            src="/img/doit_list.png"
            className={`w-[120px] h-[120px] mt-[11px] sm:w-[240px] sm:h-[240px]
              ${todo.length > 0 ? "hidden" : ""}`}
              />
          <TextSection
            text= {
              <div>
              할 일이 없어요.<br/>
              TODO를 새롭게 추가해주세요!
              </div>
            }
            className="text-slate-400 text-base text-center mt-[16px]"
            isEmpty={todo.length === 0}/>
          </div>
      </div>

      <div className="flex flex-col mt-[48px] lg:hidden">
        <ImageSection
            src="/img/done.png"
            className="w-[97px] h-[36px] ml-[16px] sm:ml-[24px] lg:mt-[120px] lg:ml-[511px]"
            />
      </div>

      <div className="lg:hidden">
        <ImageSection
          src="/img/done_list.png"
          className={`w-[120px] h-[120px] absolute top-[448px] left-[128px] sm:w-[240px] sm:h-[240px] sm:top-[624px] sm:left-[252px]
            ${todo.length > 0 ? "hidden" : ""}`}
            // todo 대신 done으로 변경 필요
        />
        <TextSection
          text={
            <>
            아직 다 한 일이 없어요.<br/>해야 할 일을 체크해보세요!
            </>
          }
          className="text-slate-400 text-base text-center absolute w-[201px] h-[36px] top-[584px] left-[99px] sm:top-[888px] sm:left-[284px] lg:top-[544px] lg:left-[1178px]"
          // todo 대신 done으로 변경 필요
          isEmpty={todo.length === 0}/>
      </div>

      {/* DO IT 리스트 - 데스크탑에서만 보임 */}
      <div className="lg:block hidden">
        <ImageSection
            src="/img/done.png"
            className="w-[97px] h-[36px] absolute left-[972px] top-[180px]"
            />
        <div className="flex flex-row mt-[64px] relative">
            <div className="flex flex-col ml-[534px]">
              <ImageSection
                src="/img/doit_list.png"
                className={`w-[240px] h-[240px]
                  ${todo.length > 0 ? "hidden" : ""}`}
                  />
              <TextSection
                text= {
                  <div>
                  할 일이 없어요.<br/>
                  TODO를 새롭게 추가해주세요!
                  </div>
                }
                className="text-slate-400 text-base text-center mt-[16px]"
                isEmpty={todo.length === 0}/>
          </div>

          <div className="flex flex-col items-center ml-[372px]">
          <ImageSection
            src="/img/done_list.png"
            className={`w-[240px] h-[240px] ${todo.length > 0 ? "hidden" : ""}`}
            />
          <TextSection
            text={
              <div>
              아직 다 한 일이 없어요.<br/>
              해야 할 일을 체크해보세요!
              </div>
            }
            className="text-slate-400 text-base text-center mt-[16px]"
            // todo 대신 done으로 변경 필요
            isEmpty={todo.length === 0}/>
            </div>
          </div>
      </div>
    </main>
  );
}
