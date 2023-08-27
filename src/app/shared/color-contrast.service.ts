import { Injectable } from "@angular/core";
import { TinyColor } from "@ctrl/tinycolor";

@Injectable()
export class ColorContrastService {
    getColorContrast(background): String {
        if (new TinyColor(background).getLuminance() > 0.179) {
            return '#000';
        } else {
            return '#fff';
        }
    }
}