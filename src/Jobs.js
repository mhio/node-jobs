const debug = require('debug')('mhio:job:Jobs')

const { Job } = require('./Job')

class Jobs {
  
  constructor(){
    this.jobs = {}
  }

  /**
   *  @summary List all job ids in array
   *  @returns {Array}
   */
  list(){
    return Object.keys(this.jobs)
  }

  /**
   *  @summary Run a function for each job. 
   *  @description Callback function is passed `(job, id)`
   *  @returns undefined
   */
  forEach( cb ){
    return this.list().forEach(key => cb(this.jobs[key], key))
  }

  /**
   *  @summary Create a job and track it
   *  @returns {Job}
   */
  createJob( options ){
    let job = new Job(options)
    this.add(job)
    return job
  }

  /**
   *  @summary Add a job
   *  @param {Job} job - Job to add to tracking
   *  @returns {Job}
   */
  add( job ){
    debug('added job id', job.id)
    if ( job instanceof Job === false ) throw new Error('The job being added is not an instance of Job')
    return this.jobs[job.id] = job
  }

  /**
   *  @summary Get a job by id
   *  @param {string} id - ID of job to get
   *  @returns Job
   */
  get( id ){
    debug('getting job id', id)
    return this.jobs[id]
  }

  /**
   *  @summary Delete a job by id
   *  @param {string} id - ID of job to delete
   *  @returns Job|undefined
   */
  delete( id ){
    let job = this.jobs[id]
    delete this.jobs[id]
    return job
  }

}

module.exports = { Jobs, Job }
