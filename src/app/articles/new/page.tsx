/**************************************************************

ブログ記事新規作成用のページ

***************************************************************/
"use client"; // onSubmit を使う場合はブラウザ側でしか使えない

import { useState } from "react";
import { useRouter } from "next/navigation";

import { createArticle } from "../../../blogAPI";


const CreateBlogPage = () => {
  const router = useRouter();

  // id...urlになる
  const [ id, setId ] = useState<string>("");
  const onChangeSetId = (e: React.ChangeEvent<HTMLInputElement>) => {
    // console.log(e.target.value)
    setId(e.target.value);
  }

  // タイトル
  const [ title, setTitle ] = useState<string>("");
  const onChangeSetTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value)
  }

  // 本文
  const [ content, setContent ] = useState<string>("");
  const onChangeSetContent = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContent(e.target.value);
  }

  // ローディング判定
  const [ loadingFrag, setLoadingFrag ] = useState<boolean>(false);


  const onSubmitCreateArticle = async (e: React.FormEvent<HTMLFormElement>) => {
    setLoadingFrag(prevState => !prevState); // ローディング表示

    e.preventDefault();

    // ローカルで作ったAPI
    // await createArticle(id, title, content);


    // Supabaseのデータベースに保存
    // 記事投稿用のAPIをたたく
    const API_URL = process.env.NEXT_PUBLIC_API_URL; // http://localhost:3000

    await fetch(`${API_URL}/api/blog`, { // apiのファイル名がcrateなのでcreateとする
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, title, content }), // json文字列に変換して送る(通信ではjsonに変換)。逆...JSON.parse()
    });

    setId("");
    setTitle("");
    setContent("");

    router.push("/");
    router.refresh(); // refresh...サーバーからデータをフェッチしてくれる。リロードのようだがステートは維持してくれる
  
    setLoadingFrag(prevState => !prevState); // ローディング非表示
  }

  return( 
    <div className="min-h-screen py-8 px-4 md:px-12">
      <h2 className="text-2xl font-bold mb-4">新規作成</h2>

      <form 
        className="bg-slate-200 p-6 rounded shadow-lg" 
        action=""
        onSubmit={ onSubmitCreateArticle }
      >
        <div className="mb-4">
          <label className="text-gray-700 text-sm- font-bold mb-2" htmlFor="">URL</label>

          <input 
            type="text" 
            className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none" 
            value={ id }
            onChange={ onChangeSetId }
          />
        </div>

        <div className="mb-4">
          <label className="text-gray-700 text-sm- font-bold mb-2" htmlFor="">タイトル</label>

          <input 
            type="text" 
            className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none" 
            value={ title }
            onChange={ onChangeSetTitle }
          />
        </div>

        <div className="mb-4">
          <label className="text-gray-700 text-sm- font-bold mb-2" htmlFor="">本文</label>

          <input 
            type="textarea" 
            className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none" 
            value = { content }
            onChange={ onChangeSetContent }
          />
        </div>

        <button 
          type="submit" 
          className={`
            py-2 px-4 
            rounded-md
            ${ loadingFrag ? "bg-orange-300 cursor-not-allowed" 
                          : "bg-orange-400 hover:bg-orange-500"
            }

          `}
          disabled={ loadingFrag } // ローディングがtrueなら押せない
        >
          投稿する
        </button>


        {/* { 
          loadingFrag ? ( 
          <div>ローディング</div> ) : (
            <button type="submit" className="py-2 px-4 rounded-md bg-orange-300">投稿する</button>
          )
        } */}
        
      </form>
    </div>
  )
}

export default CreateBlogPage;