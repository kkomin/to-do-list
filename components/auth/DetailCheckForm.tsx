"use client";

import { useEffect, useState } from "react";

interface Item {
    id: number;
    name: string;
    isCompleted: boolean;
    imageUrl: string;
    memo: string;
    setName: (name: string) => void;
    isCompletedChange: (completed: boolean) => void;
}

export function DetailCheckForm({ id, name, isCompleted, imageUrl, memo, setName, isCompletedChange }: Item) {
    const [localIsCompleted, setLocalIsCompleted] = useState(isCompleted);
    const [isEditing, setIsEditing] = useState(false);
    const [tempName, setTempName] = useState(name);
    
    // isCompleted 값에 따라 초기화
    useEffect(() => {
        setLocalIsCompleted(isCompleted);
    }, [isCompleted]);

    const handleCheckboxChange = () => {
        const updatedValue = !localIsCompleted;
        setLocalIsCompleted(updatedValue); // 로컬 상태 업데이트
        isCompletedChange(updatedValue); // 체크박스 클릭 시 상태 변경
    };

    // 이름 수정 종료 시 처리
    const handleBlur = () => {
        setTempName(name); // 수정 취소 시 기존 name으로 되돌림
        setIsEditing(false); // 수정 모드 종료
    };

    // 이름 수정 후 저장
    const saveName = () => {
        setName(tempName); // 부모 상태 업데이트
        setIsEditing(false); // 수정 모드 종료
    };

    // Esc 키로 취소
    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Escape") {
            setTempName(name); // 기존 name으로 되돌리기
            setIsEditing(false); // 수정 모드 종료
        } else if (e.key === "Enter") {
            saveName(); // Enter 키로 이름 저장
        }
    };

    return (
        <div className={`w-[343px] h-[64px] mt-[16px] sm:mt-[24px] lg:mt-[24px] gap-[10px] rounded-[24px] bg-white border-solid border-2 border-slate-900 px-3 flex items-center justify-center
        sm:w-[696px] lg:w-[996px] ${localIsCompleted ? "bg-violet-200" : "bg-white"}`}>
            <div className="w-full flex items-center justify-center">
                <img src={localIsCompleted ? "/ic/checkbox.png" : "/ic/checkbox_empty.png"} className="w-8 h-8" onClick={handleCheckboxChange} />
                {isEditing ? (
                    <input
                        type="text"
                        value={tempName}
                        onChange={(e) => setTempName(e.target.value)} // 이름 수정
                        onBlur={handleBlur} // 입력창 외부 클릭 시 기존 이름으로 되돌리기
                        onKeyDown={handleKeyDown} // Esc 키로 취소
                        className="text-slate-800 bg-transparent underline text-center pl-[16px] placeholder:text-slate-800 outline-none"
                        placeholder={name}
                    />
                ) : (
                    // 수정 중이 아닌 경우
                    <span
                        onClick={() => setIsEditing(true)} // 클릭 시 수정 모드로 전환
                        className="text-slate-800 underline cursor-pointer pl-[16px]">
                        {name}
                    </span>
                )}
            </div>
        </div>
    );
}
