"use client"

import { useEffect, useState } from "react";

interface Item {
    id: number;
    name: string;
    isCompleted: boolean;
    imageUrl: string;
    memo: string;
    }
    
export function DetailCheckForm({ id, name, isCompleted, imageUrl, memo }: Item) {
    const [isChecked, setIsChecked] = useState(isCompleted); // item의 초기 상태 사용

    const handleClick = () => {
    const newStatus = !isChecked;
    setIsChecked(newStatus);
    // 상태 변경에 따라 추가 동작 처리 가능
    };
    
    return (
        <div className={`w-[343px] h-[64px] gap-[10px] rounded-[24px] bg-white border-solid border-2 border-slate-900 px-3
        sm:w-[696px] lg:w-[996px] ${isChecked ? "bg-purple-200" : "bg-white"}`}onClick={handleClick}>
            <div className="w-full h-full flex items-center justify-center">
                {/* isChecked가 되면 isCompleted를 true로 변경 */}
                <img src={isChecked ? "ic/checkbox.png" : "/ic/checkbox_empty.png"} className="w-8 h-8"/>
                <span className="text-slate-800 text-center ml-[16px] underline">{name}</span>
            </div>
        </div>
    );
}