import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from "@angular/core";
import { WebView, LoadEventData } from "ui/web-view";

@Component({
    selector: "ns-app",
    templateUrl: "app.component.html",
})

export class AppComponent implements AfterViewInit {
    @ViewChild('webView') webViewRef: ElementRef;

    onTap(args) {
        console.log("Tap");
    }

    ngAfterViewInit() {
        let webview: WebView = this.webViewRef.nativeElement;




        webview.on(WebView.loadFinishedEvent, function (args: LoadEventData) {
            let message;
            if (!args.error) {
                message = "WebView finished loading of " + args.url;

                if (webview.ios) {

                    webview.ios.scrollView.minimumZoomScale = 1.0;
                    webview.ios.scrollView.maximumZoomScale = 1.0;
                    webview.ios.scrollView.zoomScale= 1.0;
                    webview.ios.scalesPageToFit = false;

                } else if (webview.android) {
                    webview.android.getSettings().setBuiltInZoomControls(false);
                }
            } else {
                message = "Error loading " + args.url + ": " + args.error;
            }


            console.log("WebView message - " + message);
        });
    }
}
