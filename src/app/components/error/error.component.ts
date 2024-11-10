import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrl: './error.component.scss'
})
export class ErrorComponent {
  errorMessage: string = '';
  constructor(private router: Router, private route: ActivatedRoute) {}
  
  goHome() {
    this.router.navigate(['/']);
  }
  
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.errorMessage = params['message'] || '404';
    });
  }
}
