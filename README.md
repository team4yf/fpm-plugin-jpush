## FPM-PLUGIN-JPUSH
用于极光推送的插件

### Install
```bash
yarn add fpm-plugin-jpush
```

### Useage

config.json
```javascript
{
    //...
    "jpush": {
        "appkey": "",
        "secretkey": "",
    }
}
```

method: `jpush.push`
args: `{ title: 'foo', content: 'foo2', extras: {'url': 'http://blog.yunplus.io'}}`