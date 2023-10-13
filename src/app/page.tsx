/**************************************************************

index.tsxのようなもの

・ファイル名はpageだが、関数名は任意に決めていい。ここではHomeとする
・コンポーネントは基本サーバー側でレンダリングされて生成されてからクライアント側に返されている

https://github.com/Shin-sibainu/next.js13-blog-for-udemy

***************************************************************/
// 新バージョンのNext.jsはクライアント側ではなくサーバー側でレンダリングされるので、
// ブラウザ側でレンダリングして、consoleで出力結果を確認するならば、"use client" をつける
// ブラウザ側でレンダリングすると、PCスペックによってはレンダリングが遅くなるのでサーバー側でレンダリングした方が速い
// "use client";

// import { useEffect, useState } from "react";

import ArticleList from "./components/ArticleList";
// import { getAllArticles } from "../blogAPI";
// import { supabase } from "@/utils/supabaseClient";

// console.log(supabase);

export default async function Home() {
  // Supabaseからデータを取得

  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  // console.log(API_URL);

  // SSR で取得 no-storeはキャッシュを生成しないという意味
  const res = await fetch(`${API_URL}/api/blog`, { cache: "no-store" });
  // console.log(res)

  const articles = await res.json();
  // console.log(articles)
  
  return (
    <div className="md:flex">
      <section className="w-full md:w-2/3 flex flex-col items-center px-3 md:pl-6">
        <ArticleList articles={ articles } />
      </section>

      <aside className="w-full md:w-1/3 flex flex-col items-center px-3 md:pl-6">
        <div className="bg-white shadow-md rounded p-4 mb-6 mt-4">
          <h3 className="font-bold text-gray-900 mb-2">About Me</h3>
          <p className="text-gray-600">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            varius enim in eros elementum tristique.
          </p>
        </div>
        <div className="bg-white shadow-md rounded p-4 mb-6 mt-4 w-full">
          <h3 className="font-bold text-gray-900 mb-2">Category</h3>
          <ul className="text-gray-600 mt-2">
            <li>
              <a href="#">Technology</a>
            </li>
            <li>
              <a href="#">Automotive</a>
            </li>
            <li>
              <a href="#">Finance</a>
            </li>
            <li>
              <a href="#">Sports</a>
            </li>
          </ul>
        </div>
      </aside>
    </div>
  )
}



  // 記事を取得
  // サーバー側で取得
  // const articles = await getAllArticles();
  // console.log(articles);
  
  // クライアント側で取得...useEffect使用(asyncの中では使えないので注意)
  // const [ articles, setArticles ] = useState([]);
  // useEffect(() => {
  //   const getArticles = async () => {
  //     const res = await fetch("http://localhost:5000/posts");
  //     const articles = await res.json();
  //     console.log(articles)

  //     setArticles(articles)

  //     return articles;
  //   }

  //   getArticles()
  // }, [])
