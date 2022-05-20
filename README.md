# caffe-idle
Simple tool to prevent computer from going to sleep, this is a proof of concept but it works now!!

Keeps the computer active by making a mouse movement every time the idle time is completed.

## Usage

```
npx caffe-idle
```

Params: 
```
npx caffe-idle <idle interval> <session time>
```

**idle interval:** Max idle time allowed to prevent mac sleep. default 5 min

**session time:** Session duration in minutes. default infinite


```
npx caffe-idle 10 60
```

