"use client"
import { useState } from "react";

interface addListProps {
    todo: string[];
}

// 클릭 시 변해야 하는 요소 => 1. 배경 color purple-200 .. 2. 체크된 icon으로 .. 3. text에 취소선
export function CheckListForm({todo} : addListProps) {
    const [checkedItem, setCheckedItem] = useState<boolean[]> (
        // 초기 상태 모든 항목 미선택
        Array(todo.length).fill(false)
    );

    // 이벤트 헨들러 생성
    const handleClick = (index: number) => {
        const updatedCheckedItem = [...checkedItem];
        // 클릭한 항목 상태 체크 토글
        updatedCheckedItem[index] = !updatedCheckedItem[index];
        setCheckedItem(updatedCheckedItem);
    };
    
    return (
        <div className="relative flex flex-col">
            {todo.map((item, index) => (
                <div 
                key={index}
                className={`w-full h-[50px] flex items-center rounded-full gap-[10px] mt-[16px] ml-[16px] sm:ml-[24px] lg:ml-[360px]
                    bg-white border-solid border-2 border-slate-900 px-3
                sm:w-[696px] lg:w-[588px] ${checkedItem[index] ? "bg-violet-100" : "bg-white"}`} 
                onClick={() => handleClick(index)}>
                    <img src={checkedItem[index] ? "ic/checkbox.png" : "/ic/checkbox_empty.png"} className="w-8 h-8"/>
                    <span className={`text-slate-800 text-center
                        ${checkedItem[index] ? "line-through text-slate-800" : ""}`}>{item}</span>
                </div>
            ))}
        </div>
    );

}