const crypto = require('crypto')
const cp = require('child_process')
const debug = require('debug')('mhio:job:Job')

class Job {
  
  static get ms_minute(){ return 60000 } // 60 * 1000
  static get ms_hour(){ return 3600000 } // 60 * 60 * 1000
  static get ms_day(){ return 86400000 } // 24 * 60 * 60 * 1000

  constructor( options = {} ){
    this.id = crypto.randomBytes(3).toString('hex')
    this._errors = []
    this._output = []
    this._running = false
    
    this._expires_in = options.expires_in || (8 * this.constructor.ms_hour)
    this._expires_at = options.expires_at
    this._timeout_in = options.timeout_in
    this._timeout_at = options.timeout_at
    this._error_cb = options.error_cb
    this._exit_cb = options.exit_cb
    this._stdout_cb = options.stdout_cb
    this._stderr_cb = options.stderr_cb

    if ( options.command ) this.setCommand(options.command) // array of [ cmd, ...arg ]
  }

  get command(){      return this._command }
  setCommand( command_arr ){
    if ( command_arr instanceof Array === false ) throw new Error('command not an Array')
    return this._command = command_arr
  }

  get cmd(){          return this._command[0] }
  get args(){         return this._command.slice(1) }
  
  get output(){       return this._output }
  get errors(){       return this._errors }
  get running(){      return this._running }

  get timeout_in(){   return this._timeout_in }
  setTimeoutIn(ms_val){
    return this._timeout_in = ms_val
  }
  
  get timeout_at(){   return this._timeout_at }
  setTimeoutAt(ts_val){
    return this._timeout_at = ts_val
  }

  get expires_at(){   return this._expires_at }
  setExpiresAt(ts_val){
    return this._expires_at = ts_val
  }
  pushExpiry( ms_val ){
    if ( !ms_val ) ms_val = this.expires_in
    this.expires_at = Date.now() + ms_val
  }

  get expires_in(){   return this._expires_in }
  setExpiresIn(ms_val){
    return this._expires_in = ms_val
  }
  possiblySetExpiresIn( ms_val ){
    if ( ms_val === undefined || ms_val === null ) return
    return this._expires_in = ms_val
  }

  get stdout_cb(){ return this._stdout_cb }
  setStdoutCb(cb){  
    return this._stdout_cb = cb
  }

  get stderr_cb(){ return this._stderr_cb }
  setStderr_cb(cb){
    return this._stderr_cb = cb
  }
  
  get close_cb(){  return this._close_cb }
  setClose_cb(cb){
    return this._close_cb = cb
  }
  
  get error_cb(){  return this._error_cb }
  setError_cb(cb){
    return this._error_cb = cb
  }






  run(){
    return new Promise((resolve, reject)=>{
      let proc = this.proc = cp.spawn(this.cmd, this.args)
      
      if ( this._timeout_in ) this.setTimeoutAt( Date.now() + this._timeout_in )

      if ( this._timeout_at ) {
        let ms_till_timeout = this._timeout_at - Date.now()
        if ( ms_till_timeout < 0 ) {
          return reject(new Error('Timeout time in the past: ' + this._timeout_at))
        }
        this._kill_timer = setTimeout(()=>{
          if ( this._running === true ) {
            let err = new Error('Job process timed out, killing')
            this._errors.push(err)
            proc.kill('SIGTERM')
          }
        }, ms_till_timeout)
      }

      this._running = true
      let output = this._output

      proc.stdout.on('data', data => {
        output.push([ 1, data.toString() ])
        if ( this._stdout_cb ) this._stdout_cb(data)
      })
      
      proc.stderr.on('data', data => {
        output.push([ 2, data.toString() ])
        if ( this._stderr_cb ) this._stderr_cb(data)
      })
      
      proc.on('close', exit_code => {
        this._running = false

        if ( exit_code === null && proc.killed ) exit_code = 128 + 15

        this.exit_code = exit_code
        output.push([ 3, exit_code ])

        if ( this._kill_timer ) clearTimeout(this._kill_timer)
        
        this._expires_at = ( this._expires_at === undefined )
          ? (Date.now() + this._expires_in)
          : this.expires_at
        
        if ( exit_code === 0 ) {
          resolve(this)
        } else {
          let err = this.errors[0]
          if (!err) err = new Error('Job process failed')
          reject(err)
        }
        if ( this._close_cb ) this._close_cb(exit_code)
      })
      
      proc.on('error', err => {
        debug('job err', err)
        //err.stack = err.stack
        output.push([ 4, err ])
        this._errors.push(err)
        if ( this._error_cb ) this._error_cb(err)
      })      
    })
  }

  toJSON(){
    let o = {}
    o.command = this._command
    o.errors = this._errors
    o.output = this._output
    o.running = this._running
    o.expires_at = this._expires_at
    o.expires_in = this._expires_in
    return o
  }

}

module.exports = { Job }