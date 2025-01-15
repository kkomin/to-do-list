"use client"
import { CheckListForm } from "@/components/auth/CheckListForm";
import { SearchForm } from "@/components/auth/SearchForm";
import { addTodo } from "@/lib/api";
import { ReactNode, useEffect, useState } from "react";

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
  // const [todo, setAddTodo] = useState<string[]>([]);
  const [todo, setAddTodo] = useState<{
    id: number;
    tenantId: string;
    name: string;
    memo: string;
    imageUrl: string;
    isCompleted: boolean;
  }[]>([]);

  const [done, setDoneLength] = useState<number>(0);

  // 로컬 스토리지에 저장한거 불러오기
  useEffect(() => {
    const storedTodos = localStorage.getItem("todoList");
    if (storedTodos) {
      setAddTodo(JSON.parse(storedTodos));
    }
  }, []);
  
  // todo 상태가 변경될 때마다 콘솔에 로그 출력 -> 동기적으로 변경
  useEffect(() => {
    console.log("업데이트된 로컬 todo:", todo);
  }, [todo]);

  // Home 컴포넌트에서 handleAddTodo 수정
  const handleAddTodo = async (text: string) => {
    const newTodo = { name: text }; // 'name' 속성만 포함
    try {
      const tenantId = "kkomin"; // 실제 tenantId
      const addedTodo = await addTodo(newTodo);
      console.log("API 응답:", addedTodo);

      // 로컬 상태에 추가 (prevTodos를 사용)
      setAddTodo((prevTodos) => {
        const updatedTodos = [
          ...prevTodos,
          {
            id: addedTodo.id,
            name: text,
            isCompleted: false,
            tenantId: "kkomin",
            memo: "",
            imageUrl: ""
          }
        ];
        localStorage.setItem("todoList", JSON.stringify(updatedTodos));  // 로컬 스토리지에 저장
        console.log("항목이 수정되었습니다.");
        return updatedTodos;
    })
    } catch (error) {
      console.error("할 일 추가 실패:", error);
      alert("항목 수정에 실패했습니다.");
    }
  };

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
            <div className="w-[334px] sm:w-[696px] lg:w-[588px]">
            <CheckListForm todo={todo} doneChange={handleDone}/>
            </div>
          <ImageSection src = "img/doit_list.png" 
            className={`w-[120px] h-[120px] ml-[112px] sm:w-[240px] sm:h-[240px] sm:ml-[228px]
              ${todo.length > 0 || done > 0 ? "hidden" : ""}`}/>
          <TextSection
            text= {
              <div>
              할 일이 없어요.<br/>
              TODO를 새롭게 추가해주세요!
              </div>
            }
            className="text-slate-400 text-base text-center mt-[16px] ml-[72px] sm:ml-[248px] sm:mt-[24px]"
            isEmpty={todo.length === 0}/>
        </div>

        {/* Done 그룹 */}
        <div className="mt-[48px] ">
          <ImageSection src="/img/done.png"
            className="w-[97px] h-[36px]"/>
          <div className="w-[334px] sm:w-[696px] lg:w-[588px]">
            {/* <CheckListForm todo={todo} doneChange={handleDone}/> */}
          </div>
          <ImageSection src = "img/done_list.png" 
            className={`w-[120px] h-[120px] ml-[112px] sm:w-[240px] sm:h-[240px] sm:ml-[228px] sm:mt-[24px] ${done > 0 ? "hidden" : ""}`}/>
          <TextSection
          text={
            <>
            아직 다 한 일이 없어요.<br/>해야 할 일을 체크해보세요!
            </>
          }
          className="text-slate-400 text-base text-center ml-[83px] mt-[16px] sm:ml-[260px] sm:mt-[24px]"
          isEmpty={done === 0}/>
        </div>
      </div>

      {/* 데스크탑에서 보기 */}
      <div className="hidden lg:flex lg:flex-row">
        {/* Todo 그룹 */}
        <div className="mt-[120px] w-full">
          <ImageSection src="/img/todo.png"
            className="w-[101px] h-[36px] ml-[360px]"/>
          <div className="w-[334px] sm:w-[696px] lg:w-[588px]">
            <CheckListForm todo={todo} doneChange={handleDone}/>
          </div>
          <ImageSection src = "img/doit_list.png" 
            className={`w-[240px] h-[240px] ml-[534px] mt-[64px] ${todo.length > 0 || done > 0 ? "hidden" : ""}`}/>
          <TextSection
            text= {
              <div>
              할 일이 없어요.<br/>
              TODO를 새롭게 추가해주세요!
              </div>
            }
            className="text-slate-400 text-base text-center mt-[24px] ml-[553px]"
            isEmpty={todo.length === 0}/>
        </div>
        
        {/* Done 그룹 */}
        <div className="mt-[120px] w-full">
          <ImageSection src="/img/done.png"
            className="w-[97px] h-[36px] absolute left-[972px]"/>
          <ImageSection src = "img/done_list.png" 
            className={`w-[240px] h-[240px] mt-[130px] ml-[372px] ${done > 0 ? "hidden" : ""}`}/>
          <TextSection
          text={
            <>
            아직 다 한 일이 없어요.<br/>해야 할 일을 체크해보세요!
            </>
          }
          className="text-slate-400 text-base text-center ml-[404px] mt-[24px]"
          isEmpty={done === 0}/>
        </div>
      </div>
    </main>
  );
}
