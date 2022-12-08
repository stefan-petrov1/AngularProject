import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-catalog-pagination-buttons',
  templateUrl: './catalog-pagination-buttons.component.html',
  styleUrls: ['./catalog-pagination-buttons.component.css'],
})
export class CatalogPaginationButtonsComponent implements OnChanges {
  @Input() length!: number;
  @Output() pageChanged = new EventEmitter<number>();
  buttonArr!: Array<any>;
  selectedValue = 1;

  constructor() {}

  ngOnChanges(): void {
    this.buttonArr = new Array(this.length);
  }

  onClick(value: number) {
    if (value === this.selectedValue) return;

    this.selectedValue = value;
    this.pageChanged.emit(value);
  }
}
