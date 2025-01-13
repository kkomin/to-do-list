"use client"
import { useEffect, useState } from "react";

interface addListProps {
    todo: string[];
    doneChange: (doneLength: number) => void;
}

// 클릭 시 변해야 하는 요소 => 1. 배경 color purple-200 .. 2. 체크된 icon으로 .. 3. text에 취소선
export function CheckListForm({todo, doneChange} : addListProps) {
    // 진행 중
    const [doit, setDoit] = useState<string[]>(todo);
    // 완료
    const [done, setDone] = useState<string[]>([]);

    // todo 변경 시 doit 동기화 ㄱㄱ
    useEffect(() => {
        // 기존 doit에 없는 항목만 추가
        setDoit((prevDoit) => {
            const newItems = todo.filter((item) => !prevDoit.includes(item) && !done.includes(item));
            return [...prevDoit, ...newItems];
        })
    }, [todo, done]);

    // done 생성 시 부모 컴포넌트로 전달
    useEffect(() => {
        doneChange(done.length);
    }, [done]);

    // 이벤트 헨들러
    const handleClick = (item:string) => {
        if(done.includes(item)) {
            // done에서 item 제거 -> doit에 추가
            setDone((prevDone) => prevDone.filter((doneItem) => doneItem !== item));
            setDoit((prevDoit) => [...prevDoit, item]); // doit에 추가
        } else {
            // doit에서 item 제거 -> done에 추가
            setDoit((prevDoit) => prevDoit.filter((doitItem) => doitItem !== item));
            setDone((prevDone) => [...prevDone, item]); // done에 추가
        }
    };

    return (
        <div className="flex flex-col ml-[16px] gap-8 lg:ml-[360px]">
            {/* todo 리스트 */}
            <div className="flex flex-col">
            {doit.map((item, index) => (
                <div
                    key={index}
                    className={`w-full h-[50px] flex items-center rounded-[27px] gap-[10px] mt-[16px] 
                                bg-white border-solid border-2 border-slate-900 px-3
                                sm:w-[696px] lg:w-[588px]`}>
                    <img
                        src="/ic/checkbox_empty.png"
                        className="w-8 h-8 cursor-pointer z-10"
                        onClick={() => handleClick(item)}
                        alt="checkbox icon"
                    />
                    <span className="text-slate-800 text-center">{item}</span>
                </div>
            ))}
            </div>
            {/* done 리스트 */}
            <div className="flex flex-col ">
            {done.length > 0 && (
                <div>
                {done.map((doneItem, index) => {
                    return (
                        <div
                        key={index}
                        className="w-full h-[50px] flex items-center rounded-[27px] gap-[10px] mt-[16px] 
                                    border-solid border-2 border-slate-900 px-3
                                    sm:w-[696px] lg:w-[588px] bg-violet-100">
                        <img
                            src="ic/checkbox.png"
                            className="w-8 h-8 cursor-pointer z-10"
                            alt="done icon"
                            onClick={() => {handleClick(doneItem)}}
                        />
                        <span className="text-slate-600 line-through">
                            {doneItem}</span>
                        </div>
                    );}
                    )}
                </div>
            )}
            </div>
        </div>
    );

}