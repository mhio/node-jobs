/* global expect */


const { ClassDebug } = require('../../')


describe('mh::test::Unit::ClassDebug', function(){

  it('should load the module', function(){
    expect( ClassDebug ).to.be.ok
  })

  it('should have an attach function', function(){
    expect( ClassDebug.attach ).to.be.a('function')
  })

  it('should have an instance function', function(){
    expect( ClassDebug.instance ).to.be.a('function')
  })

})
