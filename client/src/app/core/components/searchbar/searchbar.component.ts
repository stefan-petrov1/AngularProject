import { Component } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Pages } from 'src/app/shared/enums';
import { UtilService } from 'src/app/shared/services/util.service';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.css'],
})
export class SearchbarComponent {
  search!: string;

  constructor(
    private router: Router,
    private utilService: UtilService,
    private route: ActivatedRoute
  ) {
    route.queryParams.subscribe((params) => {
      this.search = params['search'];
    });
  }

  onSubmit(event: SubmitEvent, value: string) {
    event.preventDefault();

    const queryParams: Params = {
      search: value || undefined,
    };

    if (this.router.url.includes(Pages.Catalog)) {
      this.utilService.updateQueryParams(this.route, queryParams);
      return;
    }

    this.router.navigate([Pages.Catalog], { queryParams });
  }
}
