import { Job } from '../'

let job = new Job({ command: [ 'printf', '%s\n%s\n', 'one', 'two' ] })
try {
  await job.run() // resolves to the same `job` instance
  console.log(job.id)
  console.log(job.output)
} catch (err) {
  console.error(job.output)
  console.error(err)
}
