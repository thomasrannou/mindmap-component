// Regex that matches all emojis in a string.
const matchEmojis = /([\uD800-\uDBFF][\uDC00-\uDFFF])/g

// Emoji to category table.
const conversionTable = {
  '🗺': 'mindmap',
  '🌐': 'wiki',
  '🗂': 'stack exchange',
  '📝': 'course',
  '📖': 'free book',
  '📕': 'non-free book',
  '📄': 'paper',
  '👀': 'video',
  '🖋': 'article',
  '🗃': 'blog',
  '🐙': 'nodes',
  '👾': 'storage',
  '🖌': 'security',
  '🎙': 'reseau',
  '📮': 'monitoring',
  '💬': 'identity',
  '🎥': 'governance',
  '🤖': 'automation',
  '🔎': 'aks',
  '🔗': undefined
}

// Category to emoji table, based on the table above.
const revConversionTable = {}

Object.keys(conversionTable).forEach((key) => {
  revConversionTable[conversionTable[key]] = key
})

/*
 * Return an emoji as a GitHub image.
 */
const emojiTemplate = (unicode, category) => (
  `<img class="mindmap-emoji" title="${category}" src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Vue.js_Logo_2.svg/langfr-220px-Vue.js_Logo_2.svg.png">`
)

const customEmojiTemplate = (emoji, category) => (
  `<img class="mindmap-emoji" title="${category}" src="https://assets-cdn.github.com/images/icons/emoji/${emoji}.png">`
)

/*
 * Return the category represented by the given emoji.
 */
const emojiToCategory = emoji => conversionTable[emoji] || ''

/*
 * Convert all emojis to an IMG tag.
 * The bitwise magic is explained at http://crocodillon.com/blog/parsing-emoji-unicode-in-javascript
 */
const emojiToIMG = html => (
  /* eslint-disable no-bitwise */
  html.replace(matchEmojis, (match) => {
    switch (match) {
      case '🤖':
        return '<img class="mindmap-emoji reddit-emoji" title="automation" src="https://aksmindmapstorage.blob.core.windows.net/images/automation.png?sp=r&st=2021-09-06T10:56:24Z&se=2025-12-01T19:56:24Z&spr=https&sv=2020-08-04&sr=b&sig=IGpCV%2FcIZWUB0ongGp8Nf5B%2Fc0%2FJZEnJW5eSu3zFTdw%3D">'

      case '🗂':
        return '<img class="mindmap-emoji" title="stackexchange" src="https://cdn.sstatic.net/Sites/stackoverflow/company/img/logos/se/se-icon.png?v=93426798a1d4">'

      case '🐙':
        return '<img class="mindmap-emoji" title="nodes" src="https://aksmindmapstorage.blob.core.windows.net/images/nodes.png?sp=r&st=2021-09-06T11:16:52Z&se=2030-09-06T19:16:52Z&spr=https&sv=2020-08-04&sr=b&sig=qlFfHvbRes5G8fukTWpsQBPzW%2FwATFD2hhSZhi6G0eM%3D">'
        
      case '🔎':
        return '<img class="mindmap-emoji" title="aks" src="https://aksmindmapstorage.blob.core.windows.net/images/aks.png?sp=r&st=2021-09-06T11:01:55Z&se=2030-09-06T19:01:55Z&spr=https&sv=2020-08-04&sr=b&sig=%2F%2BzcRZnphmE5lgguS1xAhUopab%2BPQNVdg26nDolQu%2B4%3D">'

      case '👾':
        return '<img class="mindmap-emoji" title="storage" src="https://aksmindmapstorage.blob.core.windows.net/images/storage.png?sp=r&st=2021-09-06T11:09:02Z&se=2030-09-06T19:09:02Z&spr=https&sv=2020-08-04&sr=b&sig=9UXYWOY2E49fFcSCesWAKP3oWI0In22T%2F0whTDotjt0%3D">'

      case '🖌':
        return '<img class="mindmap-emoji" title="security" src="https://aksmindmapstorage.blob.core.windows.net/images/security.png?sp=r&st=2021-09-06T11:08:33Z&se=2030-09-06T19:08:33Z&spr=https&sv=2020-08-04&sr=b&sig=n%2B%2BqMdcgWVxFddb0Yi3Lnxq7mY1eIlInyBBszeMSEWk%3D">'

      case '🎙':
        return '<img class="mindmap-emoji" title="reseau" src="https://aksmindmapstorage.blob.core.windows.net/images/reseau.png?sp=r&st=2021-09-06T11:08:05Z&se=2030-09-06T19:08:05Z&spr=https&sv=2020-08-04&sr=b&sig=B4xnGsMmWicXxL%2FcUAUSqVyf3vHd%2Fap8QHln5W%2Fc%2Fe4%3D">'
  
      case '📮':
        return '<img class="mindmap-emoji" title="monitoring" src="https://aksmindmapstorage.blob.core.windows.net/images/monitoring.png?sp=r&st=2021-09-06T11:07:41Z&se=2030-09-06T19:07:41Z&spr=https&sv=2020-08-04&sr=b&sig=TG9eUaMIN5x%2FbgYkNQdto%2FTAyKHxp4bn%2FC4N0eP05H0%3D">'
  
      case '💬':
        return '<img class="mindmap-emoji" title="identity" src="https://aksmindmapstorage.blob.core.windows.net/images/identity.png?sp=r&st=2021-09-06T11:06:59Z&se=2030-09-06T19:06:59Z&spr=https&sv=2020-08-04&sr=b&sig=MyJxWe9JsxTqQSqfYLV%2BwDQfs1h7Hkvp07LL2ePu%2B4w%3D">'

      case '🎥':
        return '<img class="mindmap-emoji" title="governance" src="https://aksmindmapstorage.blob.core.windows.net/images/governance.png?sp=r&st=2021-09-06T11:16:12Z&se=2030-09-06T19:16:12Z&spr=https&sv=2020-08-04&sr=b&sig=XU8tmGopuAbZgECe16At3y6AnX2zcIzEDPdAjiOb%2FkM%3D">'

      // Regular unicode Emojis.
      default: {
        // Keep the first 10 bits.
        const lead = match.charCodeAt(0) & 0x3FF
        const trail = match.charCodeAt(1) & 0x3FF

        // 0x[lead][trail]
        const unicode = ((lead << 10) + trail).toString(16)

        return emojiTemplate(`1${unicode}`, emojiToCategory(match))
      }
    }
  })
  /* eslint-enable no-bitwise */
)

/*
 * Inverse of emojiToCategory, but instead of returning an emoji
 * returns an IMG tag corresponding to that emoji.
 */
const categoryToIMG = category => emojiToIMG(revConversionTable[category] || '')

module.exports = {
  matchEmojis,
  emojiToIMG,
  emojiTemplate,
  emojiToCategory,
  categoryToIMG
}
