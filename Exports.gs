var Exports = {


  get libExports() {
    return bmXml.Exports
  },

  /**
   * @class bmXml.XmlWrapper
   * @return {XmlWrapper} 
   */
  newXmlWrapper(...args) {
    return this.libExports.newXmlWrapper(...args)
  },


  /**
   * Gml Extension namespace example
   * @return {Proxy} 
   */
  get Gml() {
    return this.libExports.Gml
  }
 
}

