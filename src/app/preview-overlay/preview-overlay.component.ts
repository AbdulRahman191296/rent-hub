import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-preview-overlay',
  templateUrl: './preview-overlay.component.html',
  styleUrl: './preview-overlay.component.css'
})
export class PreviewOverlayComponent {
  @Input() post: any
  @Output() close = new EventEmitter<string>(); 

  onClose() {
    this.close.emit('close')
  }

  onSubmit() {
    this.close.emit('submit');
  }

  ngOnInit() {
    console.log("data from post form in preview overlay", this.post)
  }

}
