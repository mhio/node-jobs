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

    it('should fail to run a bad binary', function(){
      job.setCommand([ 'false' ])
      return job.run().should.be.rejectedWith(/Command exited with: "1"/)
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

    it('should set expires at', function(){
      let now = Date.now()
      job.setExpiresAt( now )
      expect( job.expires_at ).to.equal( now )
    })

    it('should set expires at', function(){
      let now = Date.now()
      job.setExpiresAt( now )
      return job.run().then(()=>{
        expect( job.expires_at ).to.eql( now)
      })
    })

    it('should set expires in', function(){
      job.setExpiresIn( 100 )
      expect( job.expires_in ).to.equal( 100 )
    })

    it('should set expires at', function(){
      job.setExpiresIn( 100 )
      return job.run().then(()=>{
        expect( job.expires_at ).to.be.greaterThan( Date.now() )
      })
    })

    it('should possibly set expires in for value', function(){
      job.possiblySetExpiresIn( 100 )
      expect( job.expires_in ).to.equal( 100 )
    })

    it('should not possibly set expires in for null', function(){
      job.setExpiresIn( 100 )
      job.possiblySetExpiresIn( null )
      expect( job.expires_in ).to.equal( 100 )
    })

    it('should push the expiry date', function(){
      let at = Date.now()
      job.setExpiresAt( at )
      job.setExpiresIn( 1000 )
      job.pushExpiry( 1000 )
      expect( job.expires_at ).to.equal( at + 1000 )
    })

  })

})