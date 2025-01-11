"use client"
import { useState } from "react";

// 클릭 시 변해야 하는 요소 => 1. 배경 color purple-200 .. 2. 체크된 icon으로
export function DetailCheckForm() {
    const [isChecked, setIsChecked] = useState(false);
    
    // 이벤트 헨들러 생성
    const handleClick = () => {
        setIsChecked(!isChecked);
    };
    
    return (
        <div className={`w-[343px] h-[64px] gap-[10px] rounded-[24px] bg-white border-solid border-2 border-slate-900 px-3
        sm:w-[696px] lg:w-[996px] ${isChecked ? "bg-purple-200" : "bg-white"}`}onClick={handleClick}>
            <div className="w-full h-full flex items-center justify-center">
                <img src={isChecked ? "ic/checkbox.png" : "/ic/checkbox_empty.png"} className="w-8 h-8"/>
                <span className="text-slate-800 text-center ml-[16px] underline">비타민 챙겨 먹어라</span>
            </div>
        </div>
    );
}