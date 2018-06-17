## FPM-PLUGIN-JPUSH
用于极光推送的插件

### Install
```bash
yarn add fpm-plugin-jpush
```

## Basic Info
- Run Action Hook Name: 
  - `INIT` init the jpush client
  - `BEFORE_SERVER_START` extend the biz module
- ExtendModule Name: `jpush`
- Exception
  - [ ] `E.JPush.PUSH_ERROR`
    ```javascript
	{
      errno: -10021, 
      code: 'PUSH_ERROR', 
      message: ''
    }
	```
- `getDependencies()`
  - [x] `[]`
- The Reference Of The `Bind()` Method
  An BizModule Object Contains Functions
  - [ ] `push`
  - [ ] `getRecords`

### Useage

- Add Config Set
  `$ vim config.json` add `jpush` entry
  ```javascript
  {
      //...
      "jpush": {
          "appkey": "",
          "secretkey": "",
      }
  }
  ```
- Use Functions
  - [x] method: `jpush.push`
    args: `{ title: 'foo', content: 'foo2', extras: {'url': 'http://blog.yunplus.io'}}`

  - [x] `jpush.getRecords()`
    ```javascript
    var func = new YF.Func('jpush.getRecords');
    func.invoke({ limit: 10, skip: 0})
      .then(function(data){
        console.log(data)
      }).catch(function(err){
      })
    ```