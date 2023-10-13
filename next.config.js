/**************************************************************



***************************************************************/


/** @type {import('next').NextConfig} */


const nextConfig = {
  experimental: {
    // trueにすることでサーバー側でレンダリングされる機能が使える
    // デフォルトでtrue。
    appDir: true,
  },

  images: {
    // next/imagesの画像を扱えるようにドメインに許可する
    domains: ["source.unsplash.com"],
  }
}

module.exports = nextConfig
