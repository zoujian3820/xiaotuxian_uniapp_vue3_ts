const Fontmin = require('fontmin')

// 字体文件的位置
const filePath = './src/styles/fonts/font.ttf'
// font-family 的名称，我们将在之后使用该名称来表示使用该字体
const fontName = 'erabbit'
// 需要抽取的文字有哪些
const extractText = '我是提取的字体，只有我生效'
// 生成文件导出的文件夹
const exportPath = './extract_fonts'

const fontmin = new Fontmin()
  .src(filePath)
  .use(Fontmin.glyph({ text: extractText, hinting: false }))
  .use(Fontmin.ttf2eot())
  .use(Fontmin.ttf2svg())
  .use(Fontmin.ttf2woff({ deflate: true }))
  // 生成css、 base64: 注入base64数据：application/x-font-ttf;（带css的gzip字体）。
  .use(Fontmin.css({ fontFamily: fontName, base64: true }))
  .dest(exportPath)

fontmin.run()
