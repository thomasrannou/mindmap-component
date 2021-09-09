import { categoryToIMG } from '../parser/emojis'

/*
 * Return the HTML representation of a node.
 * The node is an object that has text, url, and category attributes
 * all of them optional.
 */
const subnodesToHTML = (subnodes = [], fcolor) => {
  let color = fcolor || ''

  if (!fcolor && subnodes.length > 0 && subnodes[0].color) {
    color = `style="border-left-color: ${subnodes[0].color}"`
  }

  return subnodes.map((subnode) => {
    let href = `href="${subnode.url}"`
    let target = `target="_blank" rel="noopener"`
    let emoji = categoryToIMG(subnode.category)

    if (!subnode.url) {
      href = ''
      target = ''
      emoji = ''
    }

    return `<div class="mindmap-subnode-group" ${color}>
      <a ${href} ${target}>${subnode.text || ''} ${emoji}</a>
      <div>${subnodesToHTML(subnode.nodes, color)}</div>
    </div>`
  }).join('')
}

export default subnodesToHTML
