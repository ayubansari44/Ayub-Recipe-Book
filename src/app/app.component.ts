import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'aa-recipe-book';
  loadedFeature: string = 'recipe';  //initially load recipe page

  onNavigate(event: string): void{
    this.loadedFeature = event;
  }
}
