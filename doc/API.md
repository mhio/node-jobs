## Classes

<dl>
<dt><a href="#JobException">JobException</a></dt>
<dd><p>JobException for wrapping any Error objects raised here</p></dd>
<dt><a href="#Job">Job</a></dt>
<dd><p>A Job to be run</p></dd>
</dl>

<a name="JobException"></a>

## JobException
<p>JobException for wrapping any Error objects raised here</p>

**Kind**: global class  

* * *

<a name="Job"></a>

## Job
<p>A Job to be run</p>

**Kind**: global class  

* [Job](#Job)
    * [new Job(options)](#new_Job_new)
    * _instance_
        * [.setExpiresAt()](#Job+setExpiresAt) ⇒ <code>number</code>
        * [.pushExpiry()](#Job+pushExpiry) ⇒ <code>number</code>
        * [.setExpiresIn()](#Job+setExpiresIn) ⇒ <code>number</code>
        * [.possiblySetExpiresIn()](#Job+possiblySetExpiresIn) ⇒ <code>number</code>
        * [.handleRunCallback()](#Job+handleRunCallback)
        * [.toJSON()](#Job+toJSON) ⇒ <code>object</code>
    * _static_
        * [._classInit()](#Job._classInit)


* * *

<a name="new_Job_new"></a>

### new Job(options)
<p>Represents a job to be spawned.</p>


| Param | Type | Description |
| --- | --- | --- |
| options | <code>object</code> | <p>The options for object for Job/Spawn</p> |


* * *

<a name="Job+setExpiresAt"></a>

### job.setExpiresAt() ⇒ <code>number</code>
**Kind**: instance method of [<code>Job</code>](#Job)  
**Summary**: <p>Convert object to JSON object for <code>JSON.stringify()</code></p>  
**Returns**: <code>number</code> - <p>The timestamp to expire at</p>  

* * *

<a name="Job+pushExpiry"></a>

### job.pushExpiry() ⇒ <code>number</code>
**Kind**: instance method of [<code>Job</code>](#Job)  
**Summary**: <p>Push the expiry back again by expires</p>  
**Returns**: <code>number</code> - <ul>
<li>The new millisecond timestamp to expire at</li>
</ul>  

* * *

<a name="Job+setExpiresIn"></a>

### job.setExpiresIn() ⇒ <code>number</code>
**Kind**: instance method of [<code>Job</code>](#Job)  
**Summary**: <p>Set the expires in ms value</p>  
**Returns**: <code>number</code> - <ul>
<li>New milliseconds until expiry time</li>
</ul>  

* * *

<a name="Job+possiblySetExpiresIn"></a>

### job.possiblySetExpiresIn() ⇒ <code>number</code>
**Kind**: instance method of [<code>Job</code>](#Job)  
**Summary**: <p>Set the expires in ms value, ignoring falsey values</p>  
**Returns**: <code>number</code> - <ul>
<li>New milliseconds until expiry time</li>
</ul>  

* * *

<a name="Job+handleRunCallback"></a>

### job.handleRunCallback()
**Kind**: instance method of [<code>Job</code>](#Job)  
**Summary**: <p>Add extra run processing on top of <code>Spawn</code> for expires</p>  

* * *

<a name="Job+toJSON"></a>

### job.toJSON() ⇒ <code>object</code>
**Kind**: instance method of [<code>Job</code>](#Job)  
**Summary**: <p>Convert object to JSON object for <code>JSON.stringify()</code></p>  
**Returns**: <code>object</code> - <p>The instance object to be turned into JSON</p>  

* * *

<a name="Job._classInit"></a>

### Job.\_classInit()
<p>Class static initialisation</p>

**Kind**: static method of [<code>Job</code>](#Job)  

* * *

