const { Jobs } = require('../')

let jobs = new Jobs()

let job_a = new Job({ command: [ 'date' ])
let job_b = jobs.createJob({ command: [ 'sh', '-c', 'echo running; sleep 4; exit 2' ] })

jobs.add(job_a)

job_b.run().catch(err => console.error(err))  // resolves to the same `job` instance
job_a.run()

console.log('Job "%s" running in the background', jobs.get(job.id))

console.log('Jobs [ %s ]', jobs.list().join(','))
