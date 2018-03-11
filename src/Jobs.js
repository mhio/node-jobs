const debug = require('debug')('mhio:job:Jobs')

const { Job } = require('./Job')

class Jobs {
  
  constructor(){
    this.jobs = {}
  }

  list(){
    Object.keys(this.jobs)
  }

  createJob(options){
    let job = new Job(options)
    this.add(job)
    return job
  }

  add(job){
    debug('added job id', job.id)
    if ( job instanceof Job === false ) throw new Error('The job being added is not an instance of Job')
    this.jobs[job.id] = job
  }

  get(id){
    debug('getting job id', id)
    return this.jobs[id]
  }

  delete(id){
    let job = this.jobs[id]
    delete this.jobs[id]
    return job
  }

}

module.exports = { Jobs, Job }
