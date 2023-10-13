/**************************************************************

エラーページ

・ページ名は小文字で、error とする
・データフェッチなどでエラーが出るとこのページが表示される

***************************************************************/
"use client"; // 必ず入れる

type ErrorProps = {
  reset: () => void
}

// const Error = ({ reset }: { reset: () => void }) => {
const Error = ({ reset }: ErrorProps) => {
  // reset ... リフレッシュ関数が渡ってくる

  return(
    <div className="bg-red-200 border-l-4 border-red-500 text-red-700 mt-4 rounded shadow-md max-w-md p-2">
      <h3 className="font-bold mb-2">エラーが発生しました。</h3>
      <button 
        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-500 transition duration-500"
        onClick={ reset }
      >もう一度試す
      </button>
    </div>
  )
}

export default Error;