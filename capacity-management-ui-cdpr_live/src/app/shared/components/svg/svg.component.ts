import { Component, Input } from '@angular/core';
/** This component is having svg details to use as a shared for all */
@Component({
  selector: 'app-svg',
  templateUrl: './svg.component.html',
  styleUrls: ['./svg.component.scss']
})

export class SvgComponent {
  /** defines local input here */
  @Input() icon: string;
}
