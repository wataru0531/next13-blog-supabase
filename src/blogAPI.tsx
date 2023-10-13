/**************************************************************

API

・getServerSidePropsやgetStaticPropsにかわり、fitchを使うようになった

***************************************************************/
import { notFound } from "next/navigation";

import { Article } from "./types";

const ENDPOINT_URL = `http://localhost:5000/posts`;


// 記事作成のためのAPI
export const createArticle = async (
    id: string, 
    title: string, 
    content: string,

  ): Promise<Article> => {
  // 記事作成日時を作成
  // toISOString() ... ISO8601形式(国際的な標準形式)の文字列に変換。(例　"2023-09-19T12:34:56.789Z")
  const currentDateTime = new Date().toISOString();
  // console.log(currentDateTime);
  
  const res = await fetch(ENDPOINT_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json", // json形式で送信するので型を指定
    },
    body: JSON.stringify({ id, title, content, createdAt: currentDateTime }), // 送信したい内容。jsonに変換

  });

  if(!res.ok){
    throw new Error("エラーが発生しました");
  }

  await new Promise(resolve => setTimeout(resolve, 1500));

  const newArticle = await res.json();

  return newArticle;
}

// 全記事を取得するAPI
export const getAllArticles = async (): Promise<Article[]> => {
  // SSRで取得
  // 前のバージョンではgetServerSidePropsを使ってたが書き方が変わった

  // cache no-store ... SSR
  // cache force-cache ... SG
  // next: { revalidate: 10 } ... ISR

  // 今回はSSRを使用...ブログ記事はよく追加されるので更新頻度が高いため
  const res = await fetch(ENDPOINT_URL, { cache: "no-store" });
  // console.log(res)

  // データ取得失敗
  if(!res.ok){
    // エラーの場合 → error.tsxが表示
    throw new Error("エラーが発生");
  }

  // 意図的にローディング画面を表示
  // 1.5秒、処理を待機
  await new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 1500);
  })

  const articles = await res.json(); // json()...jsonをオブジェクトに変換

  return articles;
}


// 記事詳細ページのAPI
export const getDetailArticle = async (id: string): Promise<Article> => {
  // ここはISR
  // 最初の取得はSSR、あとはSGのような感じ。再生性
  const res = await fetch(`${ENDPOINT_URL}/${id}`, { next: { revalidate: 60 } });

  // 指定したエンドポイントが存在しない場合
  if(res.status === 404){
    notFound();
  }

  if(!res.ok){
    throw new Error("エラーが発生");
  }

  await new Promise((resolve) => setTimeout(resolve, 1500));

  const articles = await res.json();

  return articles;
}

// 記事削除API
export const deleteArticle = async (
  id: string,

): Promise<Article> => {

  const res = await fetch(`${ENDPOINT_URL}/${id}`, {
    method: "DELETE",
  })

  if(!res.ok){
    throw new Error("エラーが発生しました。");
  }

  await new Promise((resolve) => setTimeout(resolve, 1500));

  const deleteArticle = await res.json(); 

  return deleteArticle;
}
