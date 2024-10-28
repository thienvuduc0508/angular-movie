import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, inject, Input, Output, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'app-switch-tab',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './switch-tab.component.html',
  styleUrl: './switch-tab.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SwitchTabComponent {
  @Input() tabs: string[] = [];
  @Output() onTabChange: EventEmitter<any> = new EventEmitter();
  @ViewChild('bgMoving') bgMoving: ElementRef;

  private renderer = inject(Renderer2);

  selectedTab: number = 0;

  activeTab(tab: string, index: number) {
    this.selectedTab = index;
    this.renderer.setStyle(this.bgMoving.nativeElement, 'left', index * 100 + 'px')
    this.onTabChange.emit(tab);
  }

}
