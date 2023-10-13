/**************************************************************

記事詳細ページのカード

***************************************************************/
import Link from "next/link";
import Image from "next/image";

import { Article } from "../../types";

type ArticleCardProps = {
  article: Article,
}

const ArticleCard = ({ article }: ArticleCardProps) => {
  // console.log(article.id)

  return (
    <article className="shadow my-4">
      <Link className="hover:opacity-75" href={`/articles/${article.id}`}>
        <Image 
          src={`https://source.unsplash.com/collection/1346951/1000x500?sig=${article.jd}`}
          alt=""
          width={1280}
          height={ 300 }
        />
      </Link>

      <div className="bg-white flex flex-col justify-start p-6">
        <Link className="text-blue-700 pb-4 font-bold" href={`articles/${article.id}`}>{ article.id }</Link>
        <Link className="text-slate-900 text-3xl font-bold hover:text-gray-700 pb-4" href={`articles/${article.id}`}>{ article.title }</Link>
        <p className="text-sm ob-3 text-slate-900">Published on { new Date(article.createdAt).toLocaleDateString() }</p>

        <Link className="text-slate-900 pb-6" href={`articles/${article.id}`}>
          { article.content.length > 70 ? article.content.substring(0, 70) + "..." : article.content }
        </Link>
      
        <Link className="text-pink-800 hover:text-black" href={`articles/${article.id}`}>続きを読む</Link>
      </div>

    </article>
  )
}

export default ArticleCard;