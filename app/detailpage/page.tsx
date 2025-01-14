"use client"
import { DetailCheckForm } from "@/components/auth/DetailCheckForm";
import { useEffect, useState } from "react";

interface Item {
    id: number;
    name: string;
    isCompleted: boolean;
    imageUrl:string;
    memo:string;
}

export default function Detail() {
    const [item, setItem] = useState<Item | null>(null);  // 페이지에서 필요한 item 상태
    const [items, setItems] = useState<Item[]>([]); // 전체 아이템 상태
    const [id, setId] = useState<number>(0); // id 상태 추가
    const [name, setName] = useState<string>(""); // name 상태 추가
    
    const getQueryParams = () => {
        const urlParams = new URLSearchParams(window.location.search);
        const id = urlParams.get('id');
        const name = urlParams.get('name');
        return { id, name };
    }

    useEffect(() => {
        const { id, name } = getQueryParams();
        console.log(id, name);

        if (id && name) {
            setId(Number(id)); // id를 number 형식으로 변환하여 상태에 설정
            setName(name); // name을 그대로 상태에 설정
        }
        // API 조회
        // if(id) {
        // //     fetch("https://assignment-todolist-api.vercel.app/api/kkomin/items")
        // //     .then((res) => res.json())
        // //     .then((data: Item[]) => {
        // //     setItems(data);
        // //     const selectedItem = data.find(item => item.id === parseInt(id));
        // //     setItem(selectedItem || null); // 해당 아이템으로 설정
        // //     })
        // //     .catch((error) => {
        // //     console.error("API 호출 실패:", error);
        // // });
        //     fetch("https://assignment-todolist-api.vercel.app/api/kkomin/items")
        //     .then((res) => res.json())
        //     .then((data: Item[]) => {
        //         setItems(data);  // 전체 아이템 리스트 저장
        //         setItem(data[1] || null);  // 특정 아이템 name을 선택해서 저장
        //     })
        //     .catch((error) => {
        //         console.error("API 호출 실패:", error);
        //     });
        // }
        }, []);
        
    return (
        <main className="flex items-center justify-center">
            <div className="flex flex-col items-center w-[1200px] h-[1020px] bg-white">
                <div className="w-[343px] h-[64px] mt-[16px] sm:w-[696px] sm:mt-[24px] lg:w-[996px] lg:mt-[24px] justify-center">
                    <DetailCheckForm id={id} name={name} isCompleted={false} imageUrl={""} memo={""} />
                </div>
                <div className="flex flex-col mt-[17px] sm:mt-[24px] lg:flex-row lg:mt-[24px] lg:gap-[24px]">

                    <div className="w-[343px] h-[311px] border-dashed rounded-[24px] border-[2px] border-slate-300 bg-slate-50 
                        flex flex-col items-center justify-center sm:w-[696px] lg:w-[384px]">
                            <div className="absolute flex flex-col items-center justify-center w-[64px] h-[64px]">
                                <img alt="picture_icon" src="/ic/img.png" className="w-full h-full"/>
                            </div>
                            <button className="w-[64px] h-[64px] ml-auto mr-[16px] mt-auto mb-[16px] bg-no-repeat" 
                                style={{backgroundImage:"url('/btn/plus_circle.png')", backgroundSize:"contain"}}/>
                    </div>
                    <div className="relative w-[343px] h-[311px] mt-[15px] lg:mt-0 sm:w-[696px] lg:w-[588px] flex flex-col items-center">
                        <img src="/img/memo.png" className="w-full h-full rounded-[24px]"/>
                        <span className="absolute top-[24px] text-amber-800">Memo</span>
                        <textarea className="h-[229px] mt- absolute bg-transparent text-center outline-none w-[calc(100%-32px)] resize-none overflow-auto" 
                            placeholder="메모 입력"/>
                    </div>
                </div>
                <div className="relative flex flex-col items-center justify-center lg:left-[32px]">
                    <div className="flex flex-row pt-[24px] w-full">
                        <button className="w-[168px] h-[56px]" style={{backgroundImage:"url('/btn/m_complete.png')", backgroundSize:"contain"}}/>
                        <button className="w-[168px] h-[56px] ml-[7px]" style={{backgroundImage:"url('/btn/delete.png')", backgroundSize:"contain"}}/>
                    </div>
                </div>
            </div>
        </main>
    );
}