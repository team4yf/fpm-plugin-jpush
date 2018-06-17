var should = require("chai").should();
var YF = require("yf-fpm-client-js").default;

YF.init({appkey: '123123', masterKey: '123123', domain: 'http://localhost:9999'});


describe('Function', function(){
  beforeEach(done => {
    done()
  })

  afterEach(done => {
    done()
  })

  it('Function A', function(done){
    var func = new YF.Func('jpush.push');
    func.invoke({ title: 'foo', content: 'foo2', extras: {'url': 'http://blog.yunplus.io'}})
      .then(function(data){
        console.log(data)
        done();
      }).catch(function(err){
        done(err);
      })
  })

  it('Function B', function(done){
    var func = new YF.Func('jpush.getRecords');
    func.invoke({ limit: 10, skip: 0})
      .then(function(data){
        console.log(data)
        done();
      }).catch(function(err){
        done(err);
      })
  })
})
