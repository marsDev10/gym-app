import xss from "xss";

export abstract class Sanitizable {
  abstract sanitize(): void;

  protected sanitizeAll(): void {
    for (const key in this) {
      if (this.hasOwnProperty(key)) {
        const value = this[key as keyof this];

        if (typeof value == "string") {
          this[key as keyof this] = xss(value) as any;
          this[key as keyof this] = value.trim() as any;
        }
      }
    }
  }
}
