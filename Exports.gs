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
  }
 
}

