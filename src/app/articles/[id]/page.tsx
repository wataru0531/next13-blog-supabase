// /**************************************************************

// ブログ詳細記事

// http://localhost/3000/◯◯◯/page.tsx

// ◯◯◯のフォルダの部分が動的になり、このpage.tsxが表示される

// ***************************************************************/
// // クリックを使うならクライアント側でレンダリングさせる
// // ここでは削除ボタンだけクライアントでレンダリングさせればいいので別のコンポーネントに切り離す
// // "use client";

// import Image from "next/image";
// import { parseISO, format } from "date-fns";

// import { getDetailArticle, deleteArticle } from "../../../blogAPI";
// import DeleteButton from "../../components/DeleteButton";

// type ArticleId = {
//   id: string,
// }

// type ArticleProps = {
//   params: ArticleId,
// }


// // const Article = ({ params }: { params: { id: string } }) => {
// const Article = async ({ params }: ArticleProps) => {
//   // デフォルトで、paramsが渡ってくるようになっている
//   console.log(params.id)

//   // ローカルで作ったAPI
//   // const detailArticle = await getDetailArticle(params.id);
//   // console.log(detailArticle)

//   // Supabaseから詳細記事データ取得
//   const API_URL = process.env.NEXT_PUBLIC_API_URL;

//   // ここはISR
//   const res = await fetch(`${API_URL}/api/${params.id}`, { 
//     next: {
//       revalidate: 60,
//     }
//   });

//   const detailArticle = await res.json();
//   // console.log(detailArticle);


//   // ISO 8601形式(...2023-09-20T14:58:51.096+00:00)を、「0000-00-00」にni変換
//   const convertIso = (_date: string): string => {
//     const date = parseISO(_date); // 文字列を日付に変換
//     // console.log(_date); // 2023-09-20T14:58:51.096Z

//     const formattedDate = format(date, "yyy-MM-dd");
//     // console.log(formattedDate); // 2023-09-20

//     return formattedDate;
//   }

//   return(
//     <div className="max-w-3xl mx-auto p-5">
//       <Image
//         src={`https://source.unsplash.com/collection/1346951/1000x500?sig=${detailArticle.id}`}
//         alt=""
//         width="1280"
//         height="300"
//       />

//       <h1 className="text-4xl text-center mb-10 mt-10">{ detailArticle.title }</h1>
//       <div className="text-lg leading-relaxed text-justify">
//         <p>{ detailArticle.content }</p>
//         <div className="mt-5">
//           <time>{ new Date(detailArticle.createdAt).toLocaleString() }</time>
//         </div>
//       </div>

//       <div className="mt-5 text-right">
//         <DeleteButton id={ detailArticle.id }/>
//       </div>
//     </div>
//   )
// }


// export default Article;



import DeleteButton from "@/app/components/DeleteButton";
// import { deleteArticle, getDetailArticle } from "@/pages/api/articles/articles";
import Image from "next/image";


export default async function Article({ params }: { params: { id: string } }) {
  console.log(params)

  // const detailArticle = await getDetailArticle(params.id);
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  // console.log(API_URL) // http://localhost:3000

  // console.log(params.id)

  const res = await fetch(`${API_URL}/api/${params.id}`, {
    next: {
      revalidate: 10,
    },
  });
  const detailArticle = await res.json();

  return (
    <div className="max-w-3xl mx-auto p-5">
      {/* relative を追加 */}
      <Image
        src={`https://source.unsplash.com/collection/1346951/1000x500?sig=${detailArticle.id}`}
        width={1280}
        height={300}
        alt=""
      />
      <h1 className="text-4xl text-center mb-10 mt-10">
        {detailArticle.title}
      </h1>
      <div className="text-lg leading-relaxed text-justify">
        <p>{detailArticle.content}</p>
      </div>
      <div className="text-right mt-3">
        <DeleteButton id={detailArticle.id} />
      </div>
    </div>
  );
}
