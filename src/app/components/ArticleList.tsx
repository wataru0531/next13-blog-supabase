/**************************************************************

記事一覧ページのコンポーネント

***************************************************************/

import { Article } from "../../types"; // 型
import ArticleCard from "./ArticleCard";

type ArticleListProps = {
  // Articleオブジェクトの配列という意味
  articles: Article[],

}

const ArticleList = ({ articles }: ArticleListProps) => {
  // console.log(articles)

  return(
    <>
      {
        articles.map(article => (
          <ArticleCard key={ article.id } article={ article } />
        ))
      }
      
    </>
  )
}

export default ArticleList;