import { BrowserModule } from '@angular/platform-browser';
import { Component, NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { LobbyComponent } from './lobby/lobby.component';
import { PlanningComponent } from './planning/planning.component';
import { GameComponent } from './game/game.component';
import { LandingComponent } from './landing/landing.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { PlayerLoginComponent } from './player-login/player-login.component';
import { ResultsComponent } from './results/results.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule}  from '@angular/material/grid-list'; 
import { MatCardModule } from '@angular/material/card'; 
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'; 
import { MatCheckboxModule } from '@angular/material/checkbox'; 
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { Routes, RouterModule } from '@angular/router';
import { DataService } from './data.service';
import { TeamComponent } from './team/team.component';
import { CountdownModule } from 'ngx-countdown';
// import { AngularFireModule } from '@angular/fire';

const appRoutes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'landing', component: LandingComponent },
  { path: 'adminLogin', component: AdminLoginComponent },
  { path: 'playerLogin', component: PlayerLoginComponent},
  { path: 'adminPanel', component: AdminPanelComponent },
  { path: 'lobby', component: LobbyComponent},
  { path: 'planning', component: PlanningComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    AdminPanelComponent,
    LobbyComponent,
    PlanningComponent,
    GameComponent,
    LandingComponent,
    AdminLoginComponent,
    PlayerLoginComponent,
    ResultsComponent,
    TeamComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatGridListModule,
    MatCardModule,
    ReactiveFormsModule,
    FormsModule,
    MatToolbarModule,
    FontAwesomeModule,
    MatCheckboxModule,
    MatIconModule,
    MatSelectModule,
    RouterModule.forRoot(appRoutes),
    CountdownModule
    // AngularFireModule.initializeApp(environment.firebase)
  ],
  exports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatGridListModule,
    MatToolbarModule,
    MatCheckboxModule,
    MatIconModule,
    MatSelectModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
