import { Directive, ElementRef, HostListener, Renderer2 } from "@angular/core";

@Directive({
  selector: "[appColor]",
})
export class ColorDirective {
  private colors: string[][] = [
    ["red", "blue", "magenta", "green"],
    ["green", "red", "blue", "magenta"],
    ["magenta", "green", "red", "blue"],
    ["blue", "magenta", "green", "red"],
  ];

  constructor(private e1: ElementRef, private renderer: Renderer2) {
    console.log("in the constructor");
  }
  private currentCol: number = 0;
  private currentRow: number = 0;
  // Ce Hostlistener permet d'écouter un événement sur l'objet window global;
  // Peut-être que cela vous sera utile pour votre directive ;)
  // (Il vous faudra bien sûr le déplacer dans celle-ci)

  @HostListener("window:keyup", ["$event"]) windowKeyEvent(
    event: KeyboardEvent
  ) {
    switch (event.key) {
      case "ArrowUp":
        console.log("up");
        this.currentRow = this.calcNextIndex(
          this.currentRow - 1,
          this.colors.length
        );
        break;
      case "ArrowDown":
        console.log("down");
        this.currentRow = this.calcNextIndex(
          this.currentRow + 1,
          this.colors.length
        );
        break;
      case "ArrowLeft":
        console.log("left");
        this.currentCol = this.calcNextIndex(
          this.currentCol - 1,
          this.colors[0].length
        );

        break;
      case "ArrowRight":
        console.log("right");
        this.currentCol = this.calcNextIndex(
          this.currentCol + 1,
          this.colors[0].length
        );
        break;
    }
    console.log("color is : ", this.colors[this.currentRow][this.currentCol]);
    this.renderer.setStyle(
      this.e1.nativeElement,
      "color",
      this.colors[this.currentRow][this.currentCol]
    );
  }

  private calcNextIndex(idx: number, maxValue: number): number {
    var newIdx: number = 0;
    if (idx < 0) {
      newIdx = maxValue - 1;
    } else {
      newIdx = idx % maxValue;
    }
    return newIdx;
  }
}
