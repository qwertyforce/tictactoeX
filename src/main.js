import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
require('@/assets/css.css')
require('@/assets/chat.css')
require('@/assets/iziToast.css')
Vue.config.productionTip = false;
Vue.prototype.innerHeight = window.innerHeight;
Vue.mixin({
  methods: {
    escapeHtml: function (string) {
      var entityMap = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;',
        '/': '&#x2F;',
        '`': '&#x60;',
        '=': '&#x3D;'
      }
      return String(string).replace(/[&<>"'`=\/]/g, function (s) {
        return entityMap[s]
      })
    },
    getParameterByName: function(name) {
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(window.location.href);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}
  }
})
new Vue({
  router,
  store,
  methods: {
    server_status (status) {
      var text = {
        error: ['border-danger', 'Failed to connect to the  server', 'offline'],
        ok: ['border-success', 'Connected to Server', 'online']
      }
      document.getElementById('server_info').classList.remove('border-info')
      document.getElementById('server_info').classList.add(text[status][0])
      document.getElementById('server_info_bullet').classList.remove('connecting')
      document.getElementById('server_info_text').textContent = text[status][1]
      document.getElementById('server_info_bullet').classList.add(text[status][2])
    },
    get_winrate: function(){
    $.ajax({url: 'https://backend.4battle.ru:8080/winrate',xhrFields: {withCredentials: true},
    }).done(function(data) {
       var winrate;
          if(data==null||data==0){
            winrate=0+"%";
            }else{
              console.log(JSON.parse(data))
        winrate=JSON.parse(data)  
            }
            store.commit("set_winrate",winrate);
          
});
}
},
  beforeCreate: function () {
    var self=this;
    $.ajax({
      url: 'https://backend.4battle.ru:8080/check',
      error: function (jqXHR, exception) {
        self.server_status('error')
      },
      xhrFields: {
        withCredentials: true
      }
    }).done(function (data) {
      this.server_status('ok')
      if (data == 0) {
        data = null
      }
      store.commit('set_username', data)
      if (data == null) {
        console.log('not authed')
        store.commit('set_auth', false)
      } else {
        this.get_winrate()
        // localStorage.setItem('authed', '1');
        store.commit('set_auth', true)
        console.log('validated and authed')
        console.log(data)
      }
    }.bind(this))
  },
  mounted:function () {
   if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./sw.js')
  .then(function(registration) {
    console.log('Registration successful, scope is:', registration.scope);
  })
  .catch(function(error) {
    console.log('Service worker registration failed, error:', error);
  });
}
  },

  render: h => h(App)
}).$mount('#app')
