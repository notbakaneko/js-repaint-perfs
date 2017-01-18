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
    template : '<div>{{testName}}<table class="table table-striped latest-data"><tbody><!-- Database --><tr *ngFor="let db of databases"><td class="dbname">{{db.dbname}}</td><!-- Sample --><td class="query-count"><span [className]="db.lastSample.countClassName">{{db.lastSample.nbQueries}}</span></td><!-- Query --><td *ngFor="let q of db.lastSample.topFiveQueries" [className]="q.elapsedClassName">{{q.formatElapsed}}<div class="popover left"><div class="popover-content">{{q.query}}</div><div class="arrow"></div></div></td></tr></tbody></table></div>'
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
