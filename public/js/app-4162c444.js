angular.module("app",["ionic","ngResource","app.controllers","app.services","app.directives"]).run(["$ionicPlatform",function(n){n.ready(function(){window.cordova&&window.cordova.plugins&&window.cordova.plugins.Keyboard&&cordova.plugins.Keyboard.hideKeyboardAccessoryBar(!0),window.StatusBar&&StatusBar.styleLightContent()})}]).config(["$stateProvider","$urlRouterProvider",function(n,e){n.state("app",{url:"","abstract":!0,templateUrl:"templates/tabs.html"}).state("app.map",{url:"/map",views:{"tab-map":{templateUrl:"templates/tab-map.html",controller:"MapCtrl"}}}).state("app.trending",{url:"/trending",views:{"tab-trending":{templateUrl:"templates/tab-trending.html",controller:"TrendingCtrl"}}}).state("app.about",{url:"/about",views:{"tab-about":{templateUrl:"templates/tab-about.html",controller:"AboutCtrl"}}}),e.otherwise("/map")}]),angular.module("app.controllers",[]).controller("MapCtrl",["$scope",function(n){}]).controller("TrendingCtrl",["$scope","$ionicModal","Happinesses",function(n,e,t){n.happinesses=[],n.happinessRange=[1,2,3,4,5],n.happinessRangeMin=n.happinessRange[0],n.happinessRangeMax=n.happinessRange[n.happinessRange.length-1];var a=t.query(function(){n.happinesses=a});e.fromTemplateUrl("templates/addHappinessModal.html",{scope:n}).then(function(e){n.modal=e}),n.closeAddHappiness=function(){n.modal.hide()},n.openAddHappiness=function(){n.modal.show()}}]).controller("AboutCtrl",["$scope",function(n){n.settings={enableFriends:!0}}]),angular.module("app.services",[]).factory("Happinesses",["$resource",function(n){return n("http://hackhappiness.herokuapp.com/happinesses/:id",{happinessId:"@id"})}]),angular.module("app.directives",[]).directive("hackhappinesAddhackhappines",["Happinesses",function(n){return{restrict:"E",replace:!0,templateUrl:"templates/addHappiness.html",compile:function(e,t){return function(e){e.addHappiness=function(){n.save(e.happinessData,function(n){e.happinesses.unshift(n),e.closeAddHappiness()})};var t;e.startHappiness=function(){i(),t=setInterval(i,a)},e.stopHappiness=function(){clearInterval(t),e.isHappinessLevelSet=!0};var a=500,i=function(){e.happinessData.level<e.happinessRangeMax&&e.happinessData.level++};e.initHappinesData=function(){e.happinessData={level:0,message:""},e.isHappinessLevelSet=!1},e.initHappinesData()}}}}]),angular.module("app").run(["$templateCache",function(n){n.put("templates/addHappiness.html",'<div>\n  <div class="text-center padding-vertical" ng-hide="isHappinessLevelSet">\n    <button type="button" class="button button-large icon ion-happy" on-touch="startHappiness()" on-release="stopHappiness()"></button>\n  </div>\n  <form ng-submit="addHappiness()" class="list" ng-show="isHappinessLevelSet">\n    <div class="item range">\n      <i class="icon ion-happy-outline"></i>\n      <input type="range" ng-model="happinessData.level" min="{{happinessRangeMin}}" max="{{happinessRangeMax}}" step="1">\n      <i class="">{{happinessData.level}}</i>\n    </div>\n    <label class="item item-input item-stacked-label">\n      <span class="input-label">What is making you so happy?</span>\n      <textarea type="text" ng-model="happinessData.message" placehoder="#Hackhappines"></textarea>\n    </label>\n    <label class="item">\n      <button class="button button-block button-positive" type="submit">Submit</button>\n    </label>\n  </form>\n</div>'),n.put("templates/addHappinessModal.html",'<ion-modal-view>\n  <ion-header-bar>\n    <h1 class="title">Happiness</h1>\n    <div class="buttons">\n      <button class="button button-clear" ng-click="closeAddHappiness()">Close</button>\n    </div>\n  </ion-header-bar>\n  <ion-content>\n    <hackhappines-addhackhappines></hackhappines-addhackhappines>\n  </ion-content>\n  </ion-content>\n</ion-modal-view>\n'),n.put("templates/tab-about.html",'<ion-view view-title="About">\n  <ion-content>\n    <ion-list>\n      <ion-item class="item-text-wrap">La aplicación ha sido desarrollada de manera altruista por la comunidad de desarrolladores.</ion-item>\n      <ion-item class="item-divider">\n        Desarrolladores\n      </ion-item>\n      <ion-item class="item-avatar item-text-wrap">\n        <img src="img/davidpich.png">\n        <h2>David Pich</h2>\n        <p></p>\n      </ion-item>\n      <ion-item class="item-avatar item-text-wrap">\n        <img src="img/jorgecasar.png">\n        <h2>Jorge del Casar</h2>\n        <p>Co-founder & CTO, Geeks2Team.</p>\n      </ion-item> \n    </ion-list>\n  </ion-content>\n</ion-view>\n'),n.put("templates/tab-map.html",'<ion-view view-title="Map">\n  <ion-content class="padding">\n  <ion-nav-buttons side="secondary">\n    <button class="button button-icon icon ion-ios-plus-empty" ng-click="openAddHappiness()"></button>\n  </ion-nav-buttons>\n  </ion-content>\n</ion-view>\n'),n.put("templates/tab-trending.html",'<ion-view view-title="Trendings">\n  <ion-nav-buttons side="secondary">\n    <button class="button button-icon icon ion-ios-plus-empty" ng-click="openAddHappiness()"></button>\n  </ion-nav-buttons>\n  <ion-content>\n    <ion-list>\n      <ion-item ng-repeat="happiness in happinesses" type="item-text-wrap">\n        <div class="padding-vertical text-center">\n          <i class="button button-small button-icon icon" ng-repeat="n in happinessRange" ng-class="{\n        \'ion-happy\': n <= happiness.level,\n        \'ion-happy-outline\': n > happiness.level\n        }"></i>\n        </div>\n        <h2>{{happiness.message}}</h2>\n        <p ng-if="happiness.city && happiness.city">\n          <span ng-if="happiness.city">{{happiness.city}}</span>\n          <span ng-if="happiness.city && happiness.city">, </span>\n          <span ng-if="happiness.country">{{happiness.country}}</span>\n      </ion-item>\n    </ion-list>\n  </ion-content>\n</ion-view>\n'),n.put("templates/tabs.html",'<!--\nCreate tabs with an icon and label, using the tabs-positive style.\nEach tab\'s child <ion-nav-view> directive will have its own\nnavigation history that also transitions its views in and out.\n-->\n<ion-tabs class="tabs-icon-top tabs-color-active-positive">\n\n  <!-- Map Tab -->\n  <ion-tab title="Map" icon-off="ion-ios-location-outline" icon-on="ion-ios-location" ui-sref="app.map">\n    <ion-nav-view name="tab-map"></ion-nav-view>\n  </ion-tab>\n\n  <!-- Trending Tab -->\n  <ion-tab title="Trending" icon-off="ion-ios-bolt-outline" icon-on="ion-ios-bolt" ui-sref="app.trending">\n    <ion-nav-view name="tab-trending"></ion-nav-view>\n  </ion-tab>\n\n  <!-- About Tab -->\n  <ion-tab title="About" icon-off="ion-ios-information-outline" icon-on="ion-ios-information" ui-sref="app.about">\n    <ion-nav-view name="tab-about"></ion-nav-view>\n  </ion-tab>\n\n\n</ion-tabs>\n')}]);