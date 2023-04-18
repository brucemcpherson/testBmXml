var Exports = {


  get libExports() {
    return bmXml.Exports
  },

  /**
   * Gml Extension namespace example
   * @return {Proxy} 
   */
  get Gml() {
    return this.libExports.Gml
  },

  /**
   * Html Extension namespace example
   * @return {Proxy} 
   */
  get Html() {
    return this.libExports.Html
  },

  /**
   * @implements bmPreFiddler.fiddler
   * @return {Fiddler}
   */
  newFiddler(...args) {
    return bmPreFiddler.PreFiddler().getFiddler (...args)
  }
 
}

