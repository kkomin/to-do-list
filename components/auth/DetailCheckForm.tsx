"use client"

import { useState } from "react";

interface Item {
    id: number;
    name: string;
    isCompleted: boolean;
    imageUrl: string;
    memo: string;
    setName: (name: string) => void;
    }

export function DetailCheckForm({ id, name, isCompleted, imageUrl, memo }: Item) {
    const [localIsCompleted, setLocalIsCompleted] = useState(isCompleted);
    const [isEditName, setIsEditName] = useState(false);
    const [newName, setName] = useState(name);

    
    const toggleCompletion = () => {
        // 완료 상태를 반전시키고, 상위 컴포넌트로 변경된 상태를 전달
        setLocalIsCompleted(!localIsCompleted);
    }
    
    const saveName = () => {
        setIsEditName(false);
        setName(newName);
        console.log(`새로 작성한 이름 : ${newName}`);
    }

    return (
        <div className={`w-[343px] h-[64px] mt-[16px] sm:mt-[24px] lg:mt-[24px] gap-[10px] rounded-[24px] bg-white border-solid border-2 border-slate-900 px-3 flex items-center justify-center
        sm:w-[696px] lg:w-[996px] ${localIsCompleted ? "bg-violet-200" : "bg-white"}`}>
            <div className="w-full flex items-center justify-center">
                <img src={localIsCompleted ? "/ic/checkbox.png" : "/ic/checkbox_empty.png"} className="w-8 h-8" onClick={toggleCompletion}/>
                {isEditName ? "" : (
                    <input
                        type="text"
                        value={newName}
                        onChange={(e) => setName(e.target.value)} // 이름 수정
                        onBlur={saveName} // 수정 완료 시 이름 저장
                        className="text-slate-800 bg-transparent underline text-center pl-[16px] placeholder:text-slate-800"
                        placeholder={name}
                    />
                )
                }
            </div>
        </div>
    );
}