"use client"
import Link from "next/link";
import { useEffect, useState } from "react";

interface Todo {
    id: number;
    name: string;
    isCompleted: boolean;
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

  // 이벤트 핸들러
    const handleClick = (item: Todo) => {
    if (done.includes(item)) {
      // done에서 item 제거 -> doit에 추가
        setDone((prevDone) => prevDone.filter((doneItem) => doneItem.id !== item.id));
      setDoit((prevDoit) => [...prevDoit, item]); // doit에 추가
    } else {
      // doit에서 item 제거 -> done에 추가
        setDoit((prevDoit) => prevDoit.filter((doitItem) => doitItem.id !== item.id));
      setDone((prevDone) => [...prevDone, item]); // done에 추가
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
                    src="/ic/checkbox_empty.png"
                    className="w-8 h-8 cursor-pointer z-10"
                    onClick={() => {handleClick(item)}}
                    alt="checkbox icon"
                />
                <Link key={item.id} href={`/detailpage?id=${item.id}&name=${item.name}`}>
                <span className="text-slate-800 text-center ml-[16px]">{item.name}</span>
                </Link>
                </div>
            ))}
        </div>

        {/* done 리스트 */}
        <div className="flex flex-col">
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
                    <Link key={doneItem.id} href={`/detailpage?id=${doneItem.id}&name=${doneItem.name}`}>
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
