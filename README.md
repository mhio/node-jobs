Jobs
----------

Manage a process as a Job. 

Execute a Job, recieve an ID

Query the start of the Job. 

## Install

```
yarn add @mhio/job
npm install @mhio/job
```

## Usage

[API Docs](doc/API.md)

```
import { Job } from '@mhio/job'

let job = new Job({ command: [ 'printf', '%s\n%s\n', 'one', 'two' ] })
try {
  await job.run() // resolves to the same `job` instance
  console.log(job.id)
  console.log(job.output)
} catch (err) {
  console.error(job.output)
  console.error(err)
}

```

```
import { Jobs } from '@mhio/job'

let jobs = new Jobs()
let job = jobs.createJob({ command: [ 'sh', '-c', 'echo running; sleep 4; exit 2' ] })
job.run().catch(err => console.error(err)  // resolves to the same `job` instance
console.log('Job "%s" running in the background', job.id)
```
