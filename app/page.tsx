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
  const [done, setDoneLength] = useState<number>(0);

  const handleAddTodo = (text:string) => {
    setAddTodo([...todo, text]);
  }
  
  const handleDone = (length:number) => {
    setDoneLength(length);
  }

  return (
    <main>
      <SearchForm onAddTodo={handleAddTodo}/>
      {/* 모바일, 태블릿에서 보기 */}
      <div className="flex flex-col ml-[16px] sm:ml-[24px] lg:hidden">
        {/* Todo 그룹 */}
        <div className="mt-[96px] sm:mt-[120px]">
          <ImageSection src="/img/todo.png"
            className="w-[101px] h-[36px]"/>
          <ImageSection src = "img/doit_list.png" 
            className="w-[120px] h-[120px] ml-[112px] sm:w-[240px] sm:h-[240px] sm:ml-[228px]"/>
          <TextSection
            text= {
              <div>
              할 일이 없어요.<br/>
              TODO를 새롭게 추가해주세요!
              </div>
            }
            className="text-slate-400 text-base text-center mt-[16px] ml-[72px] sm:ml-[248px] sm:mt-[24px]"
            isEmpty={todo.length === 0 && done === 0}/>
        </div>

        {/* Done 그룹 */}
        <div className="mt-[48px]">
          <ImageSection src="/img/done.png"
            className="w-[97px] h-[36px]"/>
          <ImageSection src = "img/done_list.png" 
            className="w-[120px] h-[120px] ml-[112px] sm:w-[240px] sm:h-[240px] sm:ml-[228px] sm:mt-[24px]"/>
          <TextSection
          text={
            <>
            아직 다 한 일이 없어요.<br/>해야 할 일을 체크해보세요!
            </>
          }
          className="text-slate-400 text-base text-center ml-[83px] mt-[16px] sm:ml-[260px] sm:mt-[24px]"
          isEmpty={done === 0 && todo.length === 0}/>
        </div>
      </div>

      {/* 데스크탑에서 보기 */}
      <div className="flex flex-row lg:block-hidden">
        {/* Todo 그룹 */}
        <div className="mt-[120px]">
          <ImageSection src="/img/todo.png"
            className="w-[101px] h-[36px] ml-[360px]"/>
          <div className="w-[334px] sm:w-[696px] lg:w-[588px]">
            {/* <CheckListForm todo={todo} doneChange={handleDone}/> */}
          </div>
          <ImageSection src = "img/doit_list.png" 
            className="w-[240px] h-[240px] ml-[534px] mt-[64px]"/>
          <TextSection
            text= {
              <div>
              할 일이 없어요.<br/>
              TODO를 새롭게 추가해주세요!
              </div>
            }
            className="text-slate-400 text-base text-center mt-[24px] ml-[553px]"
            isEmpty={todo.length === 0 && done === 0}/>
        </div>
        
        <div className="w-[198px]">
        </div>
        
        {/* Done 그룹 */}
        <div className="mt-[120px]">
          <ImageSection src="/img/done.png"
            className="w-[97px] h-[36px]"/>
          <ImageSection src = "img/done_list.png" 
            className="w-[240px] h-[240px] mt-[64px] ml-[174px]"/>
          <TextSection
          text={
            <>
            아직 다 한 일이 없어요.<br/>해야 할 일을 체크해보세요!
            </>
          }
          className="text-slate-400 text-base text-center ml-[206px] mt-[24px]"
          isEmpty={done === 0 && todo.length === 0}/>
        </div>
      </div>
    </main>
  );
}
