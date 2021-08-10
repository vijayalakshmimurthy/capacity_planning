import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-key-statstics',
  templateUrl: './key-statstics.component.html',
  styleUrls: ['./key-statstics.component.scss']
})
export class KeyStatsticsComponent {
  @Input() productType: string;
  @Input() color;
  @Input() totalPorts;
  @Input() freePorts;

}
