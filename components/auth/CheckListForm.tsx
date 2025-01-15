"use client"
import { updateItem } from "@/lib/api";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Todo {
    id: number;
    name: string;
    isCompleted: boolean;
    imageUrl:string;
    memo:string;
}

interface AddListProps {
    todo: Todo[];
    doneChange: (doneLength: number) => void;
}

export function CheckListForm({ todo, doneChange }: AddListProps) {
  // 진행 중
  const [doit, setDoit] = useState<Todo[]>(todo.filter(item => !item.isCompleted));
  // 완료
  const [done, setDone] = useState<Todo[]>(todo.filter(item => item.isCompleted));
  
    // todo 변경 시 doit 동기화
    useEffect(() => {
      setDoit(todo.filter(item => !item.isCompleted));
      setDone(todo.filter(item => item.isCompleted));
    }, [todo]);

    // done 생성 시 부모 컴포넌트로 전달
    useEffect(() => {
      doneChange(done.length);
    }, [done]);

  // 아이콘 클릭 시 isCompleted 상태 변경 및 API 호출
  const handleClick = async (item: Todo) => {
    const updatedItem = { ...item, isCompleted: !item.isCompleted };  // 상태 토글

    try {
      let updatedDoit = [...doit];
      let updatedDone = [...done];
      
      if (updatedItem.isCompleted) {
        // 완료 리스트에 추가
        updatedDoit = updatedDoit.filter(todoItem => todoItem.id !== item.id); // 진행 중에서 제거
        updatedDone = [...updatedDone, updatedItem];
      } else {
         // 진행 중에 추가
        updatedDone = updatedDone.filter(todoItem => todoItem.id !== item.id); // 완료 리스트에서 제거
        updatedDoit = [...updatedDoit, updatedItem];
      }
      
      // 상태 업데이트
      setDoit(updatedDoit);
      setDone(updatedDone);
      console.log(item.isCompleted)
      
      // done 개수 업데이트
      doneChange(updatedDone.length); 
      
      // 로컬 스토리지 업데이트
      const updatedTodos = [...updatedDoit, ...updatedDone];
      localStorage.setItem("todoList", JSON.stringify(updatedTodos));
      
      await updateItem(updatedItem.id, updatedItem);  // API 호출로 상태 업데이트
    } catch (error) {
      console.error("아이템 업데이트 실패:", error);
      alert("아이템을 업데이트하는 데 실패했습니다.");
    }
  };

    return (
    <div className="flex flex-col lg:ml-[360px]">
      {/* todo 리스트 */}
        <div className="flex flex-col">
            {doit.map((item) => (
                <div
                key={item.id}
                className={`w-[344px] h-[50px] flex items-center rounded-[27px] mt-[16px]
                    bg-white border-solid border-2 border-slate-900 px-3 sm:w-[696px] lg:w-[588px]`}>
                <img
                    src={item.isCompleted ? "/ic/checkbox.png" : "/ic/checkbox_empty.png"}
                    className="w-8 h-8 cursor-pointer z-10"
                    onClick={() => {handleClick(item)}}
                    alt="checkbox icon"
                />
                <Link href={`/detailpage?id=${item.id}&name=${item.name}&isCompleted=${item.isCompleted}`}>
                <span className="text-slate-800 text-center ml-[16px]">{item.name}</span>
                </Link>
                </div>
            ))}
        </div>

        {/* done 리스트 */}
        <div className="flex flex-col justify-end">
        {done.length > 0 && (
            <div>
                {done.map((doneItem) => (
                <div
                    key={doneItem.id}
                    className="w-[344px] h-[48px] flex items-center rounded-[27px] mt-[16px] 
                    border-solid border-2 border-slate-900 px-3 sm:w-[696px] lg:w-[588px] bg-violet-100"
                >
                    <img
                    src="ic/checkbox.png"
                    className="w-8 h-8 cursor-pointer z-10"
                    alt="done icon"
                    onClick={() => handleClick(doneItem)}
                    />
                    <Link key={doneItem.id} href={`/detailpage?id=${doneItem.id}&name=${doneItem.name}&isCompleted=${doneItem.isCompleted}`}>
                    <span className="text-slate-600 line-through ml-[16px]">{doneItem.name}</span>
                    </Link>
                </div>
                ))}
            </div>
            )}
        </div>
        </div>
    );
}
