const crypto = require('crypto')
const cp = require('child_process')
const debug = require('debug')('mh:nodeshell:Job')

class Job {
  
  static get ms_minute(){ return 60 * 1000 }
  static get ms_hour(){ return 60 * this.ms_minute }
  static get ms_day(){ return 24 * this.ms_hour }

  constructor( options = {} ){
    this.id = crypto.randomBytes(3).toString('hex')
    this.errors = []
    this.output = []
    this._expires_in = options.expires_in || (8 * this.constructor.ms_hour)
    this._expires_at = options.expires_at
    this._http_status = 500
    this._error_cb = options.error_cb
    this._exit_cb = options.exit_cb
    this._stdout_cb = options.stdout_cb
    this._stderr_cb = options.stderr_cb
    if ( options.command ) this.command = options.command // array of [ cmd, ...arg ]
  }
  set command( command_arr ){
    if ( command_arr instanceof Array === false ) throw new Error('command not an Array')
    return this._command = command_arr
  }
  get command(){      return this._command }
  get cmd(){          return this._command[0] }
  get args(){         return this._command.slice(1) }
  get expires_in(){   return this._expires_in }
  get http_status(){  return this._http_status }
  get stdout_cb(){    return this._stdout_cb }
  get stderr_cb(){    return this._stderr_cb }
  get close_cb(){     return this._close_cb }
  get error_cb(){     return this._error_cb }


  possiblySetExpiresIn( ms_val ){
    if ( ms_val === undefined || ms_val === null ) return
    return this._expires_in = ms_val
  }
  pushExpiry( ms_val ){
    if ( !ms_val ) ms_val = this.expires_in
    this.expires_at = Date.now() + ms_val
  }

  run(){
    return new Promise((resolve, reject)=>{
      let proc = this.proc = cp.spawn(this.cmd, this.args)
      let output = this.output
      proc.stdout.on('data', data => output.push([ 1, data.toString() ]))
      proc.stderr.on('data', data => output.push([ 2, data.toString() ]))
      proc.on('close', exit => {
        output.push([ 3, exit ])
        this.expires_at = ( this.expires_at === undefined )
          ? (Date.now() + this.expires_in)
          : this.expires_at
        if ( exit === 0 ) {
          this._http_status = 200
          resolve(this)
        }
        reject(this.errors[0])
      })
      proc.on('error', err => {
        debug('job err', err)
        err.stack = err.stack
        output.push([ 4, err ])
        this.errors.push(err)
      })      
    })
  }

  toJSON(){
    let o = {}
    o.command = this.command
    o.errors = this.errors
    o.output = this.output
    return o
  }

}

module.exports = { Job }