import React, { useEffect, useState } from "react";

interface InputProps {
    onAddTodo : (text:string) => void;
}

export function SearchForm({ onAddTodo } : InputProps) {
    const[imgSrc, setImgSrc] = useState("/btn/plus_text.png");
    const[inputValue, setInputValue] = useState("");
    const [inputText, setInputText] = useState<string>('');
    
    const handleAddTodo = () => {
        if(inputValue.trim()) {
            // 부모 컴포넌트로 값 전달
            onAddTodo(inputValue);
            console.log(inputValue);
            // 입력창 초기화
            setInputValue("")
        }
    };

    const handleBtnPress = (e:React.KeyboardEvent<HTMLInputElement>) => {
        if(e.key === "Enter" && inputValue.trim()) {
            // input 값이 존재하고 Enter 키 입력 시 할 일 추가
            handleAddTodo();
        }
    };

    useEffect(() => {
        const updateImgSrc = () => {
            const isMobile = window.innerWidth <= 425;
            // input에 값이 있을 경우
            if(inputValue.trim()) {
                setImgSrc(isMobile ? '/btn/plus_purple.png' : '/btn/plus_text_purple.png');
            }
            // input에 값이 없을 경우 
            else { 
                setImgSrc(isMobile ? '/btn/plus.png' : '/btn/plus_text.png');
            }
        }
        updateImgSrc();
        window.addEventListener('resize', updateImgSrc);

        return () => window.removeEventListener('resize', updateImgSrc);
    }, [inputValue]);


    return (
        <div className="flex absolute top-[76px] sm:top-[84px] lg:top-[84px]">
            <input alt="searchbar" value={inputValue} 
                onChange={(e) => { setInputValue(e.target.value) }}
                onKeyDown={handleBtnPress}
                className="rounded-full bg-slate-100 border-2 border-solid border-b-slate-900 border-b-[6px] border-slate-900 
                focus:ring-0 pl-[24px] w-[280px] h-[56px] border-input ml-[16px] file:text-sm focus-visible:outline-none 
                placeholder:text-slate-500 sm:w-[518px] sm:ml-[24px] lg:w-[1016px] lg:ml-[360px]" placeholder="할 일을 입력하세요"/>
            
            <button 
            onClick={handleAddTodo}
            className="absolute w-[56px] h-[56px] left-[304px] sm:w-[162px] sm:left-[558px] lg:w-[168px] lg:left-[1392px] bg-no-repeat center"
                style={{
                    backgroundImage: `url(${imgSrc})`,
                    backgroundSize:'contain'
                }}/>
        </div>
    );
}