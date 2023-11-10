import { useEffect } from "react";
import * as WebBrowser from "expo-web-browser";


//hook recommended by Clerk
//hepl for the browser to come up faster, it improves the performance when signing in
export const useWarmUpBrowser = () => {
  useEffect(() => {
    void WebBrowser.warmUpAsync();
    return () => {
      void WebBrowser.coolDownAsync();
    };
  }, []);
};
