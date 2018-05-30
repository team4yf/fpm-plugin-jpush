import _ from 'lodash'
import { JPushAsync as JPush } from 'jpush-async'

const push = (client, options) => {
  const pusher = client.push()
    .setPlatform(JPush.ALL)
    .setNotification(options.title, 
          JPush.android(options.content, options.title, 1, options.extras || {'key':'value'}),
          JPush.ios(options.title, 'happy', 5))
    .setMessage(options.content)
  if(options.tag){
    if(options.alias){
      pusher.setAudience(JPush.tag(options.tag), JPush.alias(options.alias))
    }else{
      pusher.setAudience(JPush.tag(options.tag))
    }
  }else{
    pusher.setAudience(JPush.ALL)
  }
  return pusher.send()
}
export default {
  bind: (fpm) => {
    let client
    // Run When Server Init
    fpm.registerAction('INIT', () => {
      const c = _.assign({
        appkey: 'eb1b4ead0ba8b161cbfaa7ec',
        secretkey: '64031a878a3389eeb3dc80a8',
      }, fpm.getConfig('jpush'))
      client = JPush.buildClient( c.appkey, c.secretkey )
    })

    fpm.registerAction('BEFORE_SERVER_START', () => {
      fpm.extendModule('jpush', {
        push: async (args) => {
          return new Promise( (rs, rj) => {
            push(client, args)
              .then(result=>{
                rs({data: result})
              })
              .catch(e => {
                rj({error: e})
              })
          })
        }
      })
      
    })

  }
}
