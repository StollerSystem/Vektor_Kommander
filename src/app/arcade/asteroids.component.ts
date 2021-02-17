import { Component, OnInit } from '@angular/core';
import * as config from "../../assets/config.json";
import { callGame } from './game/game';


@Component({
  selector: 'app-asteroids',
  templateUrl: './asteroids.component.html',
  styleUrls: ['./asteroids.component.css']
})

export class AsteroidsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    callGame(config);         
  };
};