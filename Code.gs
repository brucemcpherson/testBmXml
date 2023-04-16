const makeGml = () => {

  const g = Exports.Gml

  const nodes = [{
    attrs: {
      id: "a"
    }
  }, {
    attrs: {
      id: "b"
    }
  }, {
    attrs: {
      id: "c"
    }
  }].map(node => ({ ...node, tag: "node" }))

  ////console.log(g.render({ children: nodes }))

  // make edges
  const edges = [{
    attrs: {
      source: "a",
      target: "b"
    }
  }, {
    attrs: {
      source: "a",
      target: "c"
    }
  }, {
    attrs: {
      source: "b",
      target: "c"
    }
  }].map(edge => ({ ...edge, tag: "edge" }))

  ///console.log(g.render({ children: edges }))

  // make a graph
  const graph = {
    tag: "graph",
    attrs: {
      id: "G1",
      edgedefault: "undirected"
    },
    children: nodes.concat(edges)
  }
  const graphs = [graph]

  ///console.log(g.render({ children: graphs }))

  // make keys
  const keys = [{
    attrs: {
      id: "V-Color",
      for: "node",
      "attr.name": "Color",
      "attr.type": "string"
    }
  }, {
    attrs: {
      id: "V-Shape",
      for: "node",
      "attr.name": "Shape",
      "attr.type": "string"
    }
  }, {
    attrs: {
      id: "E-Color",
      for: "edge",
      "attr.name": "Color",
      "attr.type": "string"
    }
  }].map(key => ({ ...key, tag: "key" }))

  console.log(g.render({ children: keys.concat(graphs) }))

  // add children to nodes
  const betterNodes = nodes.map(node => ({
    ...node,
    children: [{
      attrs: {
        key: "V-Shape"
      },
      children: ["Sphere"]
    }].map(data => ({ ...data, tag: "data" }))
  }))
  graph.children = betterNodes.concat(edges)


  // add children to edges
  const betterEdges = edges.map(node => ({
    ...node,
    children: [{
      attrs: {
        key: "V-Color"
      },
      children: ["red"]
    }].map(data => ({ ...data, tag: "data" }))
  }))

  graph.children = betterNodes.concat(betterEdges)

  console.log(g.render({ children: keys.concat(graphs) }))
}

const makeHtml = () => {
  /**
   * copy this from the Gml example
   * @namespace Html
   * wrapper for Html
   */
  const Html = (() => {

    /**
     * @return {XmlWrapper}and instance of xmlwrapper
     */
    const getRenderer = () => {
      return new Exports.XmlWrapper({
        root: {
          tag: "html",
        }
      })
    }

    /**
     * this is the parent item for a complete gml rendering
     * @param {XmlItem[]} children the content
     * @param {number} [indent=2] number of spaces to indent each children content by
     * @return {string} the rendered string
     */
    const render = ({ children, indent } = {}) => {
      return getRenderer().render({ children, indent })
    }

    return {
      render,
      getRenderer
    }
  })()

  const head = {
    tag: "head",
    children: [{
      tag: "script",
      attrs: {
        src: "https://apis.google.com/js/api.js",
      }
    }, {
      tag: "title",
      children: ["the title"]
    }]
  }
  console.log(Html.render({ children: [head] }))

  const body = {
    tag: "body",
    children: [{
      tag: "div",
      attrs: {
        class: "big"
      },
      children: ["some big text"]
    }]
  }

  const tableData = [{
    foo: "bar",
    value: 3
  }, {
    foo: "bar2",
    value: 4
  }]
  // extract all the uniquw props
  const headers = Array.from(tableData.reduce((p, c) => {
    Reflect.ownKeys(c).forEach(k => p.add(k))
    return p
  }, new Set()))

  const thead = {
    tag: "thead",
    children: tableData.map(row => ({
      tag: "tr",
      children: headers.map(header => ({
        tag: "td",
        children: [row[header]]
      }))
    }))
  }

  const tbody = {
    tag: "tbody",
    children: tableData.map(row => ({
      tag: "tr",
      children: headers.map(header => ({
        tag: "td",
        children: [row[header]]
      }))
    }))
  }

  const table = {
    tag: "table",
    children: [thead, tbody]
  }

  body.children = body.children.concat(table)

  console.log(Html.render({ children: [head, body] }))

  // add a row with unicode/special chars
  tbody.children.push ({
    tag: 'tr',
    children: [{
      tag: 'td',
      children: ['????????']
    }, {
      tag: 'td',
      children: ['< lt ; semi ; > gt']
    }]
  })
  table.children = [thead, tbody]
  
  console.log(Html.render({ children: [head, body] }))
}



