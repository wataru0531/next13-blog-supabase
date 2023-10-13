/**************************************************************

Next.js13 の　API

・全記事を取得するAPI
・記事投稿用のAPI

api/任意のフォルダ名/route.tsx となった。routeはindex.tsx と同じ

***************************************************************/
// import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

import { supabase } from "@/utils/supabaseClient";


// 全記事を取得するAPI
export async function GET(
  req: Request, // NextApiRequest → Requestに変更
  res: Response // NextApiResponse → Response、NextApiResponse のどちらか
){
  const { data, error } = await supabase.from("posts").select("*");

  // console.log(data)

  if(error){
    // return res.status(500).json({ error: error.message }); → 変更

    return NextResponse.json(error);
  }

  // return res.status(200).json(data); // jsonで返す → 変更

  // return NextResponse.json(data);
  return NextResponse.json(data, { status: 200 });
}


// 記事を投稿するAPI 
export async function POST(
  req: Request,
  res: Response
){
  const { id, title, content } = await req.json();

  const currentDate = new Date().toISOString(); // 投稿した時間と日付

  const { data, error } = await supabase
  .from("posts")
  .insert([{ id, title, content, createdAt: currentDate }]);

  if(error){
    return NextResponse.json(error);
  }

  return NextResponse.json(data, { status: 201 }); // リソースの作成の成功なので201とする
}


