/* global expect */
const { Jobs } = require('../../src/Jobs')

describe('unit::mhio::job::Jobs', function(){

  it('should create a Jobs', function(){
    expect( new Jobs() ).to.be.ok
  })

  describe('instance', function(){
    
    let jobs = null

    beforeEach(function(){
      jobs = new Jobs()
    })

    it('should add job', function(){
      let job = jobs.createJob()
      let job2 = jobs.get(job.id)
      expect( job ).to.equal(job2)
    })

    it('should add job', function(){
      let fn = () => jobs.add({})
      expect( fn ).to.throw(/not an instance of Job/)
    })

    it('should delete job', function(){
      let job = jobs.createJob()
      expect( jobs.delete(job.id) ).to.equal(job)
    })

    it('should not delete job', function(){
      expect( jobs.delete('17') ).to.equal(undefined)
    })

  })
  
})