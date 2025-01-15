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

  // 아이콘 클릭 시 isCompleted 상태 변경 및 API 호출
  const handleClick = async (item: Todo) => {
    const updatedItem = { ...item, isCompleted: !item.isCompleted };  // isCompleted 상태 토글
    try {
      let updatedDoit = [...doit];
      let updatedDone = [...done];

      if (updatedItem.isCompleted) {
        // 완료 상태로 업데이트 시: doit에서 해당 항목 제거 후 done에 추가
        updatedDoit = updatedDoit.filter(todoItem => todoItem.id !== item.id);
        updatedDone = [...updatedDone, updatedItem];
      } else {
        // 진행 중 상태로 업데이트 시: done에서 해당 항목 제거 후 doit에 추가
        updatedDone = updatedDone.filter(todoItem => todoItem.id !== item.id);
        updatedDoit = [...updatedDoit, updatedItem];
      }

      // 상태 업데이트
      setDoit(updatedDoit);
      setDone(updatedDone);
  
      doneChange(updatedDone.length); // done 개수 업데이트

      const updatedTodos = [...doit, ...done];
      localStorage.setItem("todoList", JSON.stringify(updatedTodos));

      await updateItem(updatedItem.id, updatedItem);
  
    } catch (error) {
      console.error("아이템 업데이트 실패:", error);
      alert("아이템을 업데이트하는 데 실패했습니다.");
    }
  };

    // todo 변경 시 doit 동기화
    useEffect(() => {
      setDoit(todo.filter(item => !item.isCompleted));
      setDone(todo.filter(item => item.isCompleted));

      // todo 상태 변경 시 로컬 스토리지 업데이트
    localStorage.setItem("todoList", JSON.stringify(todo));
    }, [todo]);
  
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
