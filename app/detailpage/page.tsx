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
    const [items, setItems] = useState<Item[]>([]); // 페이지에서 필요한 item 상태
    const [memo, setMemo] = useState<string>("");
    const [isCompleted, setIsCompleted] = useState<boolean>(false); // 완료 상태
    
    const getQueryParams = () => {
        const urlParams = new URLSearchParams(window.location.search);
        const id = urlParams.get('id');
        const name = urlParams.get('name');
        return { id, name };
    }

    // 페이지 로드 시, 쿼리 파라미터로 id와 name을 받아와서 API 호출
    useEffect(() => {
        const { id, name } = getQueryParams();
        console.log("Query Params:", id, name);
        console.log(typeof(id));

        if (id && name) {
            const numId = Number(id);
            setId(numId); // id를 number 형식으로 변환하여 상태에 설정
            setName(name); // name을 그대로 상태에 설정

            // 해당 id로 item 데이터 가져오기 (API 호출)
            const fetchItem = async () => {
                try {
                    // getItem 호출 전에 id와 tenantId를 콘솔로 확인
                    console.log("API 호출 ID:", numId);
                    
                    console.log("API 호출 ID:", numId); // 숫자 ID로 API 호출
                    const response = await getItem(numId); // API 호출

                    // 응답이 배열일 경우, id만 추출하여 새로운 배열 만들기
                    console.log("Fetched Data:", response); // 응답 확인
                    
                    // 상태 업데이트
                    const item = response.find((item: Item) => item.id === numId);

                    if (!item) {
                        throw new Error("해당 ID의 아이템을 찾을 수 없습니다.");
                    }

                    console.log("Fetched Item:", item); // 해당 아이템 확인

                    // 상태 업데이트
                    setItems(item); // 해당 아이템 상태에 저장
                    setMemo(item.memo); // 메모 상태 업데이트
                    setIsCompleted(item.isCompleted); // 완료 상태 업데이트

                } catch (error) {
                    console.error("아이템을 불러오는 데 실패했습니다.", error);
                }
            };

            fetchItem(); // API 호출
        }
    }, [id, name]);
    
    // const handleUpdateItem = async () => {
    //     if (item) {
    //         const updatedItemData = {
    //             name: name, // 새로운 name을 사용
    //             memo: memo,
    //             imageUrl: item.imageUrl,
    //             isCompleted: isCompleted,
    //         };

    //         try {
    //             await updateItem(id, updatedItemData); // API 요청
    //             alert("항목이 수정되었습니다.");
    //         } catch (error) {
    //             alert("항목 수정에 실패했습니다.");
    //         }
    //     }
    // };

    // const handleSave = async () => {
    //     console.log("저장ㄱㄱ");
    //     console.log(id)
    //     if (!item) return;

    //     try {
    //         await handleUpdateItem(); // API 요청
    //         window.location.href = "/"; // 홈 페이지로 이동
    //     } catch (error) {
    //         console.error("수정 실패:", error);
    //     }
    // };

    // const handleDeleteItem = async () => {
    //     if (!item) return;
        
    //     try {
    //         // deleteItem 함수 호출하여 항목 삭제
    //         await deleteItem(item.id);
    //         alert("항목이 삭제되었습니다.");
    //         window.location.href = "/"; // 홈 페이지로 이동
    //     } catch (error) {
    //         console.error("삭제 실패:", error);
    //         alert("항목 삭제에 실패했습니다.");
    //     }
    // };

    const handleNameChange = (newName: string) => {
        setName(newName); // name 상태를 새로운 이름으로 변경
    };

    
    return (
        <main className="flex items-center justify-center">
            <div className="flex flex-col items-center w-[1200px] h-[1020px] bg-white">
                <DetailCheckForm id={id} name={name} isCompleted={isCompleted} imageUrl={""} memo={memo} setName={handleNameChange} />
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
                            onChange={(e) => setMemo(e.target.value)}/>
                    </div>
                </div>
                <div className="relative flex flex-col items-center justify-center lg:left-[325px]">
                    <div className="flex flex-row pt-[24px]">
                        <button className="w-[168px] h-[56px]" style={{backgroundImage:"url('/btn/m_complete.png')", backgroundSize:"contain"}} />
                        <button className="w-[168px] h-[56px] ml-[7px]" style={{backgroundImage:"url('/btn/delete.png')", backgroundSize:"contain"}} />
                    </div>
                </div>
            </div>
        </main>
    );
}