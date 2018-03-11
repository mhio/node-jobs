const crypto = require('crypto')
const cp = require('child_process')
const debug = require('debug')('mhio:job:Job')
const { Exception } = require('@mhio/exception')
const { Spawn } = require('@mhio/spawn')

/* JobException for wrapping any Error objects raised here */
class JobException extends Exception {
  constructor( message, opts = {} ){
    super(message, opts)
    this.command = opts.command
    this.error = opts.error
    this.arguments = opts.arguments
    this.cwd = process.cwd()
    this.path = process.env.PATH
  }
}

/* Job */
class Job extends Spawn {
  
  constructor( options = {} ){
    super(options)
    this.id = crypto.randomBytes(3).toString('hex')
    this._expires_in = options.expires_in || (8 * this.constructor.ms_hour)
    this._expires_at = options.expires_at
  }

  get expires_at(){ return this._expires_at }

  /*
   *  @summary Convert object to JSON object for `JSON.stringify()`
   *  @returns {object}
   */
  setExpiresAt( ts_val ){
    return this._expires_at = ts_val
  }

  /*
   *  @summary Push the expiry back again by expires
   *  @returns {number} - New ms expiry time stamp
   */
  pushExpiry( ms_val ){
    if ( !ms_val ) ms_val = this.expires_in
    return this.expires_at = Date.now() + ms_val
  }

  get expires_in(){ return this._expires_in }

  /*
   *  @summary Set the expires in ms value
   *  @returns {number} - New ms until expiry time
   */
  setExpiresIn( ms_val ){
    return this._expires_in = ms_val
  }

  /*
   *  @summary Set the expires in ms value, ignoring falsey values
   *  @returns {number} - New ms expiry time stamp
   */
  possiblySetExpiresIn( ms_val ){
    if ( ms_val === undefined || ms_val === null ) return
    return this._expires_in = ms_val
  }

  /*
   *  @summary Add extra run processing to Spawn for expires
   */
  handleRunCallback(){
    // Move this to Jobs? has no real place here
    this._expires_at = ( this._expires_at === undefined )
      ? (Date.now() + this._expires_in)
      : this.expires_at

    return super.handleRunCallback()
  }

  /*
   *  @summary Convert object to JSON object for `JSON.stringify()`
   *  @returns {object}
   */
  toJSON(){
    let o = super.toJSON()
    o.expires_at = this._expires_at
    o.expires_in = this._expires_in
    return o
  }

}

module.exports = { Job }