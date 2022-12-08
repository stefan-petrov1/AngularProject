import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { IPost } from 'src/app/shared/interfaces';
import { PostsService } from '../services/posts.service';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css'],
})
export class CatalogComponent implements OnInit {
  private productCount$$ = new BehaviorSubject<number>(8);
  protected length$$ = new BehaviorSubject<number>(-1);
  posts$!: Observable<IPost[]>;

  paginationButtonsLength = 0;
  page = 1;

  catalogForm!: FormGroup;
  search: string | undefined;

  constructor(
    private postsService: PostsService,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {
    this.catalogForm = this.constructForm();

    this.catalogForm.controls['priceFilter'].valueChanges.subscribe(
      (priceFilter) => {
        this.fetchPosts({ priceFilter });
        this.fetchLength(priceFilter);
      }
    );

    this.catalogForm.controls['productCount'].valueChanges.subscribe(
      (productCount) => {
        productCount = Number(productCount);
        this.productCount$$.next(productCount);
      }
    );

    this.productCount$$.subscribe((productCount) => {
      this.fetchPosts({ productCount });
    });

    combineLatest([this.length$$, this.productCount$$]).subscribe(
      ([length, productCount]) => {
        this.setPaginationButtonsLength(length, productCount);
      }
    );
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: { [key: string]: any }) => {
      this.search = params['search'];
      this.fetchPosts({});
      this.fetchLength();
    });
  }

  fetchPosts({
    productCount,
    priceFilter,
  }: {
    productCount?: number;
    priceFilter?: string;
  }) {
    if (!priceFilter) {
      priceFilter = this.catalogForm?.value.priceFilter as string;
    }

    if (!productCount) {
      productCount = Number(this.catalogForm?.value.productCount) as number;
    }

    const { queryWithOffset } = this.constructQuery(priceFilter, productCount);
    this.posts$ = this.postsService.getPosts(queryWithOffset);
  }

  fetchLength(priceFilter?: string) {
    if (!priceFilter) {
      priceFilter = (this.catalogForm?.value.priceFilter || 'All') as string;
    }

    const { query } = this.constructQuery(priceFilter);
    this.postsService.getLength(query).subscribe((v) => this.length$$.next(v));
  }

  onPageChange(page: number) {
    this.page = page;
    this.fetchPosts({});
  }

  private setPaginationButtonsLength(length: number, productCount: number) {
    if (length) {
      this.paginationButtonsLength = Math.ceil(length / productCount) || 1;
    } else {
      this.paginationButtonsLength = 0;
    }
  }

  private constructQuery(priceFilter: string, productCount?: number) {
    let query = '';

    if (this.search) {
      query = `where=${encodeURIComponent(`title LIKE "${this.search}"`)}`;
    }

    if (priceFilter && priceFilter !== 'All') {
      const encodedPriceFilter = encodeURIComponent(priceFilter);

      if (query) {
        query += ' AND ' + encodedPriceFilter;
      } else {
        query = 'where=' + encodedPriceFilter;
      }
    }

    let queryWithOffset = query;
    if (productCount) {
      const offset = (this.page - 1) * productCount;

      if (queryWithOffset) {
        queryWithOffset += `&`;
      }

      queryWithOffset += `offset=${offset}&pageSize=${productCount}`;
    }

    return {
      query: query || undefined,
      queryWithOffset: queryWithOffset || undefined,
    };
  }

  private constructForm() {
    return this.fb.group({
      productCount: this.fb.control('8'),
      priceFilter: this.fb.control('All'),
    });
  }
}
