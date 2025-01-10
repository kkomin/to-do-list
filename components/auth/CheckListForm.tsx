"use client"
import { useEffect, useState } from "react";

export function CheckListForm() {
    return (
        <div className="w-[344px] h-[50px] relative top-[21px] flex items-center gap-[10px] rounded-full bg-white border-solid border-2 border-slate-900 px-3
        sm:w-[696px] lg:w-[588px]">
            <img src="/ic/checkbox_empty.png" className="w-8 h-8"/>
            <span className="text-slate-800 text-center">비타민 챙겨 먹어라</span>
        </div>
    );
}