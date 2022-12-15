import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, tap } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { NavigationService } from 'src/app/core/services/navigation.service';
import { API_ERROR_KEY } from 'src/app/shared/constants';
import { Pages } from 'src/app/shared/enums';
import { IPost, PostData } from 'src/app/shared/interfaces';
import { appUrlValidator } from 'src/app/shared/validators';
import { PostsService } from '../services/posts.service';

@Component({
  selector: 'app-create-edit',
  templateUrl: './create-edit.component.html',
  styleUrls: ['./create-edit.component.css', '../../shared/common/auth.css'],
})
export class CreateEditComponent implements OnInit {
  title = this.route.snapshot.data['title'] || 'Create';
  id: string | undefined = this.route.snapshot.params['id'];
  editing = this.title === 'Edit';
  firstSubmit = false;
  submitted = false;

  get disabled() {
    return (this.form.invalid && this.firstSubmit) || this.submitted;
  }

  post: IPost | undefined;
  form!: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private navigationService: NavigationService,
    private postsService: PostsService,
    private authService: AuthService,
    private fb: FormBuilder,
    @Inject(API_ERROR_KEY) private apiError$$: BehaviorSubject<null | string>
  ) {
    this.form = this.createForm();
  }

  ngOnInit(): void {
    if (this.editing) {
      const id = this.route.snapshot.params['id'];

      this.postsService.getPostById(id).subscribe({
        next: (v) => {
          if (this.authService.user?._id !== v._ownerId) {
            this.apiError$$.next('Only owner can access this page.');
            this.navigationService.back();
            return;
          }

          this.post = v;
          this.form = this.createForm(v);
        },
        error: () => this.navigationService.back(),
      });
    }
  }

  createForm(post?: IPost) {
    const form = this.fb.group({
      title: this.fb.control('', [
        Validators.required,
        Validators.minLength(5),
      ]),
      imageUrl: this.fb.control('', [Validators.required, appUrlValidator]),
      price: this.fb.control(0, [Validators.required, Validators.min(1)]),
    });

    if (post) {
      const { _id, _createdOn, _ownerId, _updatedOn, ...data } = post;
      form.setValue(data);
    }

    return form;
  }

  onSubmit() {
    this.firstSubmit = true;
    this.submitted = true;

    if (this.form.invalid) {
      this.submitted = false;
      return this.form.markAllAsTouched();
    }

    const data = this.form.value as PostData;

    this.handleRequest(data).subscribe();
  }

  private handleRequest(data: PostData) {
    return !!this.id
      ? this.postsService
          .editPost(data, this.id)
          .pipe(tap(() => this.router.navigate([Pages.Profile])))
      : this.postsService
          .createPost(data)
          .pipe(
            tap((v) =>
              this.router.navigate([Pages.Details.replace(':id', v._id)])
            )
          );
  }
}
