/**************************************************************

削除ボタン

•onClickはクライアント側でレンダリングしないとエラーが出るので、"use client"

***************************************************************/
"use client";

import { deleteArticle } from "../../blogAPI";
import { useRouter } from "next/navigation";

type DeleteButtonProps = {
  id: string,
}

const DeleteButton = ({ id }: DeleteButtonProps) => {
  const router = useRouter();

  // 記事を削除する関数
  const onClickDeleteArticle = async () => {
    // await deleteArticle(id);

    // Supabaseから記事を削除
    const API_URL = process.env.NEXT_PUBLIC_API_URL;

    await fetch(`${API_URL}/api/blog/${id}`, {
      method: "DELETE"
    })

    router.push("/");
    router.refresh();
  }

  return(
    <>
      <button 
        className="bg-red-500 hover:bg-red-600 rounded py-2 px-5 inline cursor-pointer"
        onClick={ onClickDeleteArticle }
      >削除</button>
    </>
    
  )


}

export default DeleteButton;
