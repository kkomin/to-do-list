"use client"
import { DetailCheckForm } from "@/components/auth/DetailCheckForm";
import { deleteItem, getItem, updateItem } from "@/lib/api";
import { useEffect, useState } from "react";

interface Item {
    id: number;
    name: string;
    isCompleted: boolean;
    imageUrl:string;
    memo:string;
}

export default function Detail() {
    const [id, setId] = useState<number>(0); // id 상태 추가
    const [name, setName] = useState<string>(""); // name 상태 추가
    const [memo, setMemo] = useState<string>("");
    const [isCompleted, setIsCompleted] = useState<boolean | null>(null); // 완료 상태
    
    const getQueryParams = () => {
        const urlParams = new URLSearchParams(window.location.search);
        const id = urlParams.get('id');
        const name = urlParams.get('name');
        const isCompleted = urlParams.get('isCompleted') === 'true';
        return { id, name, isCompleted };
    }
    
    // 페이지 로드 시, 쿼리 파라미터로 id와 name을 받아와서 API 호출
    useEffect(() => {
        const { id, name, isCompleted } = getQueryParams();
        console.log("Query Params:", id, name);
        console.log(typeof(id));

        if (id && name) {
            const numId = Number(id); // id를 number 형식으로 변환
            setId(numId);
            setName(name); 
            setIsCompleted(isCompleted);
            console.log("item.Completed는", isCompleted);

            const storedTodos = JSON.parse(localStorage.getItem("todoList") || "[]");
            const currentItem = storedTodos.find((item: Item) => item.id === numId);
            if (currentItem) {
                setMemo(currentItem.memo); // 메모 값을 상태에 반영
            }
        }
    }, []);

    
    const [completedStatus, setCompletedStatus] = useState(isCompleted);
    // 부모 컴포넌트에서 isCompleted 변경 함수
    const handleIsCompletedChange = (completed: boolean) => {
        setCompletedStatus(completed);
        console.log("Updated isCompleted:", completed);
    };
    
    // 할 일 name 상태 변화
    const handleNameChange = (newName: string) => {
        setName(newName); // DetailCheckForm에서 전달받은 이름 업데이트
    };

    // 메모 변화
    const handleMemoChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setMemo(e.target.value); // 메모 상태 업데이트
    };

    // 수정하기 버튼 클릭 시
    const handleCompletedChange = async () => {
        console.log(isCompleted)
        if (isCompleted === null) return; // 초기 상태인 경우엔 변경하지 않음
        try {
            const updatedItem = { name, memo, imageUrl: "", isCompleted }; // 현재 값과 반대로 업데이트
            await updateItem(id, updatedItem); // 서버에 업데이트 요청

            setIsCompleted(isCompleted); // 클라이언트 상태 업데이트
            
            // localStorage에서 item을 업데이트
            const storedTodos = JSON.parse(localStorage.getItem("todoList") || "[]");
            const updatedTodos = storedTodos.map((item: any) =>
                item.id === id ? { ...item, name, isCompleted: !isCompleted, memo } : item
            );
            localStorage.setItem("todoList", JSON.stringify(updatedTodos));

            window.location.href = '/'; // 예시: Home 페이지로 리다이렉트
        } catch (error) {
            console.error("서버에 업데이트 실패", error);
        }
    };

    const handleDelete = async () => {
        try {
            await deleteItem(id); // API를 통해 삭제 요청

            // 로컬 스토리지에서 해당 항목 삭제
            const storedTodos = JSON.parse(localStorage.getItem("todoList") || "[]");
            const updatedTodos = storedTodos.filter((item: any) => item.id !== id);
            localStorage.setItem("todoList", JSON.stringify(updatedTodos));

            alert("항목을 삭제했습니다."); // 성공 메시지
            window.location.href = '/'; // 삭제 후 홈으로 리다이렉트
        } catch (error) {
            console.error("항목 삭제 실패 : ", error);
        }
    };

    return (
        <main className="flex items-center justify-center">
            <div className="flex flex-col items-center w-[1200px] h-[1020px] bg-white">
                <DetailCheckForm id={id} name={name} isCompleted={isCompleted ?? false} imageUrl={""} memo={memo} setName={handleNameChange} isCompletedChange={handleIsCompletedChange}/>
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
                        <textarea className="h-[229px] mt-[58px] absolute bg-transparent text-center outline-none w-[calc(100%-32px)]  resize-none overflow-auto" 
                            placeholder="메모 입력"
                            value={memo}
                            onChange={handleMemoChange}/>
                    </div>
                </div>
                <div className="relative flex flex-col items-center justify-center lg:left-[325px]">
                    <div className="flex flex-row pt-[24px]">
                        <button onClick={handleCompletedChange} className="w-[168px] h-[56px]" style={{backgroundImage:"url('/btn/m_complete.png')", backgroundSize:"contain"}} />
                        <button className="w-[168px] h-[56px] ml-[7px]" style={{backgroundImage:"url('/btn/delete.png')", backgroundSize:"contain"}} onClick={handleDelete}/>
                    </div>
                </div>
            </div>
        </main>
    );
}