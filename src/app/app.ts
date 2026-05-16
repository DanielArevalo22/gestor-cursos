import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Body } from './components/body/body';
import { Navbar } from './components/navbar/navbar';
import { Footer } from './components/footer/footer';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Body, Navbar, Footer],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('gestor-cursos');
}
