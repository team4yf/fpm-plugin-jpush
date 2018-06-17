import _ from 'lodash'
import { JPushAsync as JPush } from 'jpush-async'

const E = {
  JPush: {
    PUSH_ERROR: {
      errno: -10021,
      code: 'PUSH_ERROR',
      message: 'push error'
    }
  }
}

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
    const dataset = []
    // Run When Server Init
    fpm.registerAction('INIT', () => {
      const c = _.assign({
        appkey: 'eb1b4ead0ba8b161cbfaa7ec',
        secretkey: '64031a878a3389eeb3dc80a8',
      }, fpm.getConfig('jpush'))
      client = JPush.buildClient( c.appkey, c.secretkey )
    })

    const bizModule = {
      push: async (args) => {
        return new Promise( (rs, rj) => {
          push(client, args)
            .then(result=>{
              // record the push info
              dataset.push(_.assign( args, { createAt: _.now() }))
              if( dataset.lenght > 100){
                // delete the element of the head node
                dataset.shift()
              }
              rs({data: result})
            })
            .catch(e => {
              rj(_.assign(E.JPush.PUSH_ERROR, { error: e }))
            })
        })
      },
      getRecords: async (args) => {
        const count = dataset.length
        const limit = args.limit || 10
        const skip = args.skip || 0
        const rows = _.take(_.drop(dataset, skip), limit)
        return Promise.resolve({
          data: {
            count,
            rows,
          }
        })
      }
    }

    fpm.registerAction('BEFORE_SERVER_START', () => {
      fpm.extendModule('jpush', bizModule)
    })

    return bizModule
  }
}
