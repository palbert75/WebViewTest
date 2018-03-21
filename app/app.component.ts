import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from "@angular/core";
import { WebView, LoadEventData } from "ui/web-view";
import { isIOS, isAndroid } from "platform";
import { Color } from "color";

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

                if (isIOS) {

                    let translucent = new Color("#00ff0000");
                    webview.ios.backgroundColor = translucent.ios;
                    webview.ios.opaque = false;

                    webview.ios.scrollView.bounces = false;
                    webview.ios.scrollView.minimumZoomScale = 1.0;
                    webview.ios.scrollView.maximumZoomScale = 1.0;
                    webview.ios.scrollView.zoomScale= 1.0;
                    webview.ios.scalesPageToFit = false;

                } else if (isAndroid) {
                    webview.android.setBackgroundColor(0x00000000);
               //     webview.android.setLayerType(webview.android.view.View.LAYER_TYPE_SOFTWARE, null);
                    webview.android.getSettings().setDisplayZoomControls(false);

                }
            } else {
                message = "Error loading " + args.url + ": " + args.error;
            }


            console.log("WebView message - " + message);
        });
    }
}
