"use client"
import { useState } from "react";

// 클릭 시 변해야 하는 요소 => 1. 배경 color purple-200 .. 2. 체크된 icon으로 .. 3. text에 취소선
export function CheckListForm() {
    const [isChecked, setIsChecked] = useState(false);
    
    // 이벤트 헨들러 생성
    const handleClick = () => {
        setIsChecked(!isChecked);
    };
    
    return (
        <div className={`w-[344px] h-[50px] relative top-[21px] flex items-center gap-[10px] rounded-full bg-white border-solid border-2 border-slate-900 px-3
        sm:w-[696px] lg:w-[588px] ${isChecked ? "bg-purple-200" : "bg-white"}`}onClick={handleClick}>
            <img src={isChecked ? "ic/checkbox.png" : "/ic/checkbox_empty.png"} className="w-8 h-8"/>
            <span className={`text-slate-800 text-center
                ${isChecked ? "line-through text-slate-800" : ""}`}>비타민 챙겨 먹어라</span>
        </div>
    );
}