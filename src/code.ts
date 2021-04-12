if(figma.command == 'bgfunc') {

  async function checkFill(fill, apiKey) {
      if(fill.type === 'IMAGE') {

          const image = figma.getImageByHash(fill.imageHash)
          const bytes = await image.getBytesAsync()

          figma.showUI(__html__, { visible: false })
          
          figma.ui.postMessage({
              type: 'run',
              bytes: bytes,
              apikey: apiKey
          })

          const array: Uint8Array = await new Promise((resolve, reject) => {
              figma.ui.onmessage = response => {
            
                console.log("response",response)
                  if(typeof response.error !== 'undefined') {
                      figma.closePlugin(response.error)
                  } else {
                      resolve(response as Uint8Array)
                  }
              }
          })

          const newImageFill = JSON.parse(JSON.stringify(fill))
          newImageFill.imageHash = figma.createImage(array).hash

          return {
              fill: newImageFill,
              updated: true
          }

      }
      return {
          fill: fill,
          updated: false
      }
  }

  async function slazzer(node, apiKey) {
      let types = ['RECTANGLE', 'ELLIPSE', 'POLYGON', 'STAR', 'VECTOR', 'TEXT']
      if(types.indexOf(node.type) > -1) {
          let newFills = [],
              updated = false,
              check
          for(const fill of node.fills) {
              check = await checkFill(fill, apiKey)
              updated = check.updated || updated
              newFills.push(check.fill)
          }
          node.fills = newFills
          figma.closePlugin(updated ? 'Image background removed.' : 'Nothing changed.')
      } else {
          figma.closePlugin('Select a node with image fill.')
      }
  }

  if(figma.currentPage.selection.length !== 1) {
      figma.closePlugin('Select a single node.')
  }

  figma.clientStorage.getAsync('slazzerApiKey').then(apiKey => {
      if(apiKey) {
        slazzer(figma.currentPage.selection[0], apiKey)
      } else {
          figma.closePlugin('Please set api key first.')
      }
  })

} else if(figma.command == 'apikey') {
    
    
  figma.clientStorage.getAsync('slazzerApiKey').then(apiKey => {
      figma.showUI(__html__, { visible: true })
      figma.ui.resize(550,700)
      figma.ui.postMessage({
          type: 'key',
          apikey: apiKey
      })
      figma.ui.onmessage = response => {
          figma.clientStorage.setAsync('slazzerApiKey', response).then(() => {
              figma.closePlugin('API Key has been set.')
          })
      }
  })

}