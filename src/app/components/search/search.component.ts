import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements OnInit {
  searchItem: string = '';
  constructor(private route: ActivatedRoute, private router: Router) {

  }
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.searchItem = params["searchItem"];
    });
  }
  search(): void {
    console.log(this.searchItem);
    if (this.searchItem) {
      this.router.navigateByUrl(`search/${this.searchItem}`);
    }
  }
}
