/* eslint-disable @typescript-eslint/no-floating-promises */
import { ReportHandler } from "web-vitals";

function reportWebVitals(onPerfEntry?: ReportHandler): void {
  if (onPerfEntry !== undefined && onPerfEntry instanceof Function) {
    import("web-vitals").then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(onPerfEntry);
      getFID(onPerfEntry);
      getFCP(onPerfEntry);
      getLCP(onPerfEntry);
      getTTFB(onPerfEntry);
    });
  }
}

export default reportWebVitals;
