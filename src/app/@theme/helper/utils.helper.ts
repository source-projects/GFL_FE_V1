export class UtilsHelper {
    public static aftertableInit() {
        setTimeout(() => {
          let positionClass = document.querySelectorAll(".datatable-row-right");
          let scrollLength = UtilsHelper.getScrollbarWidth();
          let totalLength = positionClass.length;
          if (positionClass && totalLength > 0) {
            for (let i = 1; i < totalLength; i++) {
              (positionClass[i] as HTMLElement).style.right = "-" + scrollLength + "px";
            }
          }
        }, 1);
      }
      /**
       * get scroll width
       *
       * @static
       * @returns {number}
       * @memberof UtilsHelper
       */
      public static getScrollbarWidth(): number {
        // Creating invisible container
        const outer = document.createElement('div') as any;
        outer.style.visibility = 'hidden';
        outer.style.overflow = 'scroll'; // forcing scrollbar to appear
        outer.style.msOverflowStyle = 'scrollbar'; // needed for WinJS apps
        document.body.appendChild(outer);
        // Creating inner element and placing it in the container
        const inner = document.createElement('div');
        outer.appendChild(inner);
        // Calculating difference between container's full width and the child width
        const scrollbarWidth = (outer.offsetWidth - inner.offsetWidth);
        // Removing temporary elements from the DOM
        outer.parentNode.removeChild(outer);
        return scrollbarWidth;
      }
}