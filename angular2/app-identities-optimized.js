var AppComponent = function() {
    var me = this;
    this.databases = [];
    var load = function() {
        me.databases = ENV.generateData(true).toArray();
        Monitoring.renderRate.ping();
        setTimeout(load, ENV.timeout);
    };
    load();
};

AppComponent.annotations = [
  new ng.core.Component({
    selector : 'my-app',
    templateUrl : 'app-component.html'
  })
];


var AppModule = function AppModule() {}

AppModule.annotations = [
  new ng.core.NgModule({
    imports: [ng.platformBrowser.BrowserModule],
    declarations: [AppComponent],
    bootstrap: [AppComponent]
  })
]

document.addEventListener('DOMContentLoaded', function() {
  ng.platformBrowserDynamic.platformBrowserDynamic().bootstrapModule(
      AppModule);
});
