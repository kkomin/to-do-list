// lib/api.ts
const BASE_URL = 'https://assignment-todolist-api.vercel.app/api';

const TENANT_ID = process.env.NEXT_PUBLIC_TENANT_ID;

// 항목 등록
export const addTodo = async (todo: { name: string }) => {
    try {
        const response = await fetch(`${BASE_URL}/${TENANT_ID}/items`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: todo.name }),
    });

    if (!response.ok) {
        const errorData = await response.json();
        console.error('API 요청 실패:', errorData);
        throw new Error(`API 요청 실패: ${response.status} - ${errorData.message}`);
    }

    const data = await response.json();
      return data; // 추가된 할 일 데이터 반환
    } catch (error) {
    console.error('API 요청 실패:', error);
    throw error;
    }
};

// 항목 조회
export const getItem = async (itemId: number) => {
    try {
        const response = await fetch(`${BASE_URL}/${TENANT_ID}/items/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('API 요청 실패:', errorData);
            throw new Error(`API 요청 실패: ${response.status} - ${errorData.message}`);
        }

        const data = await response.json();

        // 데이터 검증
        if (!data || Object.keys(data).length === 0) {
            throw new Error(`아이템을 찾을 수 없습니다. 아이템 ID: ${itemId}`);
        }
        return data; // 가져온 항목 데이터 반환
    } catch (error) {
        console.error('API 요청 실패:', error);
        throw error;
    }
};


// 항목 수정
export const updateItem = async (itemId: number, updatedTodo: { name: string, memo: string, imageUrl: string, isCompleted: boolean }) => {
    try {
        const response = await fetch(`${BASE_URL}/${TENANT_ID}/items/${itemId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: updatedTodo.name,
                memo: updatedTodo.memo,
                imageUrl: updatedTodo.imageUrl,
                isCompleted: updatedTodo.isCompleted,
            }),
        });

        if (!response.ok) {
            throw new Error('항목 업데이트 오류 발생');
        }

        const data = await response.json();
        return data; // 업데이트된 항목 반환
    } catch (error) {
        console.error('API PATCH 요청 실패:', error);
        throw error; // 실패 시 오류 반환
    }
};


// 항목 삭제
export const deleteItem = async (itemId: number) => {
    try {
        // DELETE API 요청
        const response = await fetch(`/api/${TENANT_ID}/items/${itemId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        });

        // 응답 처리
        if (response.ok) {
            const data = await response.json();
            alert(data.message); // 응답 메시지 표시
        } else {
            throw new Error("삭제에 실패했습니다.");
        }
    } catch (error) {
        console.error("삭제 실패:", error);
        alert("항목 삭제에 실패했습니다.");
    }
};