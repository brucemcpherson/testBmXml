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

  const { Html } = Exports

  const head = {
    tag: "head",
    children: [{
      tag: "link",
      attrs: {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/icon?family=Material+Icons"
      }
    }, {
      tag: "link",
      attrs: {
        type: "text/css",
        rel: "stylesheet",
        href: "https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css"
      }
    }, {
      tag: "meta",
      attrs: {
        name: "viewport",
        content: "width=device-width, initial-scale=1.0"
      }
    }, {
      tag: "script",
      attrs: {
        src: "https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js",
      }
    }, {
      tag: "title",
      children: ["Materialize web app from JSON"]
    }]
  }

  console.log(Html.render({ children: [head] }))


  const button = {
    tag: "a",
    attrs: {
      class: "btn-floating btn-large waves-effect waves-light purple"
    },
    children: [{
      tag: "i",
      attrs: {
        class: "material-icons"
      },
      children: ["code"]
    }]
  }

  const content = [{
    tag: "span",
    attrs: {
      class: "amber-text"
    },
    children: ["Write great", button, "with Google Apps Script"]
  }]

  const panel = {
    tag: "div",
    attrs: {
      class: "card-panel indigo"
    },
    children: content
  }


  const body = {
    tag: "body",
    children: [panel]
  }
  console.log(Html.render({ children: [head, body] }))



  const tableData = [{
    "type": "User Properties",
    "usage": "persistent data specific to a user"
  }, {
    "type": "Script Properties",
    "usage": "persistent data for all users of a script"
  }, {
    "type": "Document Properties",
    "usage": "persistent data for all users of a document"
  }]

  // extract all the uniquw props
  const headers = Array.from(tableData.reduce((p, c) => {
    Reflect.ownKeys(c).forEach(k => p.add(k))
    return p
  }, new Set()))

  const thead = {
    tag: "thead",
    children: [{
      tag: 'tr',
      children:  headers.map(header => ({
        tag: "th",
        children: [header]
      }))
    }]
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
    attrs: {
      class: "amber"
    },
    children: [thead, tbody]
  }

  body.children = body.children.concat(table)

  console.log(Html.render({ children: [head, body] }))

  // add a row with unicode/special chars
  tbody.children.push({
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



