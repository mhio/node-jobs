/* global expect, chai */
const { Job } = require('../../src/Job')
chai.should()

describe('int::mhio::job::Job', function(){

  describe('instance', function(){
    
    let job = null
    
    beforeEach(function(){
      job = new Job({ command: ['true'] })
    })

    it('should run the true command', function(){
      return job.run().then(()=>{
        expect( job.output ).to.eql([ [3,0] ])
      })
    })

    it('should fail to run a bad binary', function(){
      job.setCommand([ 'definately not here' ])
      return job.run().should.be.rejectedWith(/Command not found/)
    })

    it('should run a fixed path', function(){
      job.setCommand([ '/bin/sh', '-c', 'true' ])
      return job.run().should.become(job)
    })

    it('should timeout a command ', function(){
      job.setCommand([ 'sleep', '2' ])
      job.setTimeoutIn(25)
      return job.run().then(()=>{
        expect( job.output ).to.eql([])
      }).catch(err => {
        expect( err.message ).to.match(/timed out/)
        expect( job.output ).to.eql([ [3,143] ])
        expect( job.exit_code ).to.equal(143)
      })
    })

  })
})