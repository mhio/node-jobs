/* global expect */
const { Job } = require('../../src/Job')

describe('unit::mhio::job::Job', function(){

  it('should create a Job', function(){
    expect( new Job() ).to.be.ok
  })
  
  describe('instance', function(){
    
    let job = null
    
    before(function(){
      job = new Job()
    })
    
    it('should set an array as command', function(){
      job.setCommand([ 'true' ])
      expect( job.command ).to.eql([ 'true' ])
    })
    
    it('should fail to set a string as command', function(){
      let fn = () => job.setCommand('true')
      expect( fn ).to.throw(/not an Array/)
    })

  })
})