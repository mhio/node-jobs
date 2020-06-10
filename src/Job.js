const crypto = require('crypto')
const debug = require('debug')('mhio:job:Job')
const { Spawn, SpawnException } = require('@mhio/spawn')

/** JobException for wrapping any Error objects raised here */
class JobException extends SpawnException {}

/** A Job to be run */
class Job extends Spawn {
  
  /** Class static initialisation */
  static _classInit(){
    this.exception_type = JobException
  }

  /**
   * Represents a job to be spawned.
   * @constructor
   * @param {object} options - The options for object for Job/Spawn
   */
  constructor( options = {} ){
    super(options)
    this.id = crypto.randomBytes(3).toString('hex')
    debug('new Job id: %s', this.id)
    this._expires_in = options.expires_in || (8 * this.constructor.ms_hour)
    this._expires_at = options.expires_at
  }

  get expires_at(){ return this._expires_at }

  /**
   *  @summary Convert object to JSON object for `JSON.stringify()`
   *  @returns {number} The timestamp to expire at
   */
  setExpiresAt( ts_val ){
    return this._expires_at = ts_val
  }

  /**
   *  @summary Push the expiry back again by expires
   *  @returns {number} - The new millisecond timestamp to expire at
   */
  pushExpiry( ms_val ){
    if ( !ms_val ) ms_val = this.expires_in
    return this._expires_at = Date.now() + ms_val
  }

  get expires_in(){
    return this._expires_in
  }

  /**
   *  @summary Set the expires in ms value
   *  @returns {number} - New milliseconds until expiry time
   */
  setExpiresIn( ms_val ){
    return this._expires_in = ms_val
  }

  /**
   *  @summary Set the expires in ms value, ignoring falsey values
   *  @returns {number} - New milliseconds until expiry time
   */
  possiblySetExpiresIn( ms_val ){
    if ( ms_val === undefined || ms_val === null ) return
    return this._expires_in = ms_val
  }

  /**
   *  @summary Add extra run processing on top of `Spawn` for expires
   */
  handleRunCallback(){
    // Move this to Jobs? has no real place here
    this._expires_at = ( this._expires_at === undefined )
      ? (Date.now() + this._expires_in)
      : this.expires_at

    return super.handleRunCallback()
  }

  /**
   *  @summary Convert object to JSON object for `JSON.stringify()`
   *  @returns {object} The instance object to be turned into JSON
   */
  toJSON(){
    let o = super.toJSON()
    o.id = this.id
    o.expires_at = this._expires_at
    o.expires_in = this._expires_in
    return o
  }

}

Job._classInit()

module.exports = { Job, JobException }
