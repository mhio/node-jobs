/* global expect */
const { Job, Jobs } = require('../../src/')

describe('unit::mhio::job::module', function(){

  it('should create a Jobs', function(){
    expect( new Jobs() ).to.be.ok
  })

  it('should create a Jobs', function(){
    expect( new Job() ).to.be.ok
  })
  
  
})