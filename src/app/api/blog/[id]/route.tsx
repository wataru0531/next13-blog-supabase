/**************************************************************



***************************************************************/
import { NextResponse } from "next/server";
import { notFound } from "next/navigation";

import { supabase } from "@/utils/supabaseClient";


// 記事を１つ削除するAPI
export async function GET(
  req: Request, // NextApiRequest → Requestに変更
  res: Response // NextApiResponse → Response、NextApiResponse のどちらか
){

  // 動的なid部分を取得
  const id = req.url.split("/blog/")[1]; // urlをblogの部分で2分する
  // console.log(req.url) // http://localhost:3000/api/blog/supabase-table-test
  // console.log(req.url.split("/blog/")); // [ 'http://localhost:3000/api', 'supabase-table-test' ]
  // console.log(id) // supabase-table-test

  // 取得
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("id", id) // eq()...idカラムの値が、指定されたidと等しい行をクエリでフィルタリングする
    .single(); // クエリ結果が単一の行であることを期待し、その行を取得。つまり、クエリが一意の結果を返すことを確認するために使用される

    if(error){
      // return res.status(500).json({ error: error.message }); → 変更
      return NextResponse.json(error);
    }

    if(!data){
      notFound();
    }
  
    // return res.status(200).json(data); // jsonで返す → 変更
    // return NextResponse.json(data);
    return NextResponse.json(data, { status: 200 });
}


// 記事削除API
export async function DELETE(
  req: Request,
  res: Response
){
  const id = req.url.split("/blog/")[1];

  const { error: deleteError } = await supabase
  .from("posts")
  .delete()
  .eq("id", id)

  if(deleteError){
    return NextResponse.json(deleteError);
  }

  return NextResponse.json({ status: 200 });

}