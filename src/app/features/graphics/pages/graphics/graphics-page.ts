import { Component } from '@angular/core';
import { GraphicsViewComponent } from "../../components/graphics-view/graphics-view";

@Component({
  selector: 'app-graphics',
  standalone: true,
  imports: [ GraphicsViewComponent ] ,
  templateUrl: './graphics-page.html',
  styleUrl: './graphics-page.css',
})
export class GraphicsComponent {

}
