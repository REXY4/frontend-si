declare module 'quagga' {
  type Config = {
    inputStream: {
      name: string;
      type: string;
      target: HTMLElement | string;
    };
    decoder: {
      readers: string[];
    };
    locator?: {
      patchSize?: string;
      halfSample?: boolean;
    };
    numOfWorkers?: number;
    frequency?: number;
    debug?: {
      drawBoundingBox?: boolean;
      drawScanline?: boolean;
      showCanvas?: boolean;
      showPatches?: boolean;
      showFoundPatches?: boolean;
      showSkeleton?: boolean;
      showLabels?: boolean;
      showPatchLabels?: boolean;
      showRemainingPatchLabels?: boolean;
      boxFromPatches?: {
        showTransformed?: boolean;
        showTransformedBox?: boolean;
        showBB?: boolean;
      };
    };
    multiple?: boolean;
  };

  type Result = {
    codeResult: {
      code: string;
    };
  };

   function init(
    config: Config,
    callback?: (err?: Error) => void
  ): void;
   function start(): void;
   function stop(): void;
   function onDetected(callback: (result: Result) => void): void;

   export {
     init,
     start,
     stop,
     onDetected,
   };
}
