import { Component } from '@angular/core';
import 'hammerjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  /*** EDGE CASES TO COMPLETE:
   * 
   * 1. Initiation: If carousel has 6 items
   * 2. Initiation: Determine Relativity, Third, and Form Based On Defined State
   * 3. Infinite: If on First, go to Last. If on Last, go to First.
   * 
   */

  eventText = '';

  /** COMPONENT DEFINED **/  
  //Defined: State
  umaIndicatorState: Number = 1;

  //Defined: Maximum
  umaIndicatorMax = 10;

  /** INTERNAL **/
  //Trigger prop
  playAnim;

  //Flags to replay loop
  umaIndicatorNextLoop: Boolean = false;
  umaIndicatorPrevLoop: Boolean = false;

  //Past Here Should Be Changed Depending on Which Slide to Initiate With
  // Defined: Max # Items, # to show first (state -- like 4th item)
  // Calculated: Form, Relativity, Third

  //Designates which animation form to display
  umaIndicatorForm: Number = 1;

  /*
  Relativity
    firsttriad: state < 4
    preloop: state = 4
    loop: state > 4
    postloop: state < max-1
    lasttriad: state < max-2
  */
  umaIndicatorRelativity: String = 'firsttriad';

  //Within the relativity, 1, 2, or 3rd spot
  umaIndicatorThird: Number = 1;

  ngOnInit(){
    setTimeout(()=>{
      this.playAnim = true;
    },1000);

    this.umaIndicatorInitiate();
    
  }

  replay(){
    this.playAnim = false;
    setTimeout(()=>{
      this.playAnim = true;
    },1000);
  }

  onSwipe(evt) {
    const x = Math.abs(evt.deltaX) > 40 ? (evt.deltaX > 0 ? 'right' : 'left'):'';
    const y = Math.abs(evt.deltaY) > 40 ? (evt.deltaY > 0 ? 'down' : 'up') : '';

    if(Math.abs(evt.deltaX) > 40){

      if(evt.deltaX > 0) {
        this.umaIndicatorPrev();
      } else {
        this.umaIndicatorNext();
      }

    }

    this.eventText += `${x} ${y}<br/>`;

  }

  umaIndicatorInitiate(){

    //Take max and state values to determine the relativity, third, and form to display initially.

    //1st Item
    //2nd Item
    //3rd Item
    //4th Item
    //5th Item

  }

  umaIndicatorNext(){

    //If state is less than max
    if(this.umaIndicatorState < this.umaIndicatorMax){

      //Reset Animation/Reveal state
      this.playAnim = false;

      //Increment state
      this.umaIndicatorState = Number(this.umaIndicatorState) + 1;

      //Decide which form animation to display
      if(this.umaIndicatorRelativity === 'firsttriad'){
        switch(this.umaIndicatorThird){
          case 1:
            this.umaIndicatorForm = 2;
            this.umaIndicatorThird = 2;
            break;
          case 2:
            this.umaIndicatorForm = 3;
            this.umaIndicatorThird = 3;
            break;
          case 3:
            this.umaIndicatorForm = 4;
            this.umaIndicatorThird = 3;
            this.umaIndicatorRelativity = 'preloop';
            break;
        }
      } else if(this.umaIndicatorRelativity === 'preloop'){
        switch(this.umaIndicatorThird){
          case 1:
            this.umaIndicatorForm = 28;
            this.umaIndicatorThird = 2;
            break;
          case 2:
            this.umaIndicatorForm = 29;
            this.umaIndicatorThird = 3;
            break;
          case 3:
            this.umaIndicatorForm = 5;
            this.umaIndicatorThird = 3;
            this.umaIndicatorRelativity = 'loop';
            break;
        }
      } else if(this.umaIndicatorRelativity === 'loop'){
        switch(this.umaIndicatorThird){
          case 1:
            this.umaIndicatorForm = 22;
            this.umaIndicatorThird = 2;
            break;
          case 2:
            this.umaIndicatorForm = 23;
            this.umaIndicatorThird = 3;
            break;
          case 3:
            //If state is max-1, then go to post loop.
            if(this.umaIndicatorState === Number(this.umaIndicatorMax)-1){
              this.umaIndicatorForm = 7;
              this.umaIndicatorRelativity = 'postloop';
            } else { //Loop
              if(this.umaIndicatorNextLoop === false){
                this.umaIndicatorForm = 6;
                this.umaIndicatorNextLoop = true;
              } else {
                this.umaIndicatorForm = 16;
                this.umaIndicatorNextLoop = false;
              }
            }
            this.umaIndicatorThird = 3;
            break;
        }
      } else if(this.umaIndicatorRelativity === 'postloop'){
        switch(this.umaIndicatorThird){
          case 1:
            this.umaIndicatorForm = 30;
            this.umaIndicatorThird = 2;
            break;
          case 2:
            this.umaIndicatorForm = 31;
            this.umaIndicatorThird = 3;
            break;
          case 3:
            this.umaIndicatorForm = 8;
            this.umaIndicatorThird = 3;
            this.umaIndicatorRelativity = 'lasttriad';
            break;
        }
      } else if(this.umaIndicatorRelativity === 'lasttriad'){
        switch(this.umaIndicatorThird){
          case 1:
            this.umaIndicatorForm = 32;
            this.umaIndicatorThird = 2;
            break;
          case 2:
            this.umaIndicatorForm = 33;
            this.umaIndicatorThird = 3;
            break;
          case 3:
            this.umaIndicatorForm = 34;
            this.umaIndicatorThird = 1;
            //Loop animation to slide 1 (to be created)
            break;
        }
      }

      //Play Animation/Reveal State
      this.playAnim = true;

    }
    
  }

  umaIndicatorPrev(){

    //If state is greater than 1
    if(this.umaIndicatorState > 1){

      //Reset Animation/Reveal state
      this.playAnim = false;

      //Decrement state
      this.umaIndicatorState = Number(this.umaIndicatorState) - 1;

      //Decide which form animation to display
      if(this.umaIndicatorRelativity === 'firsttriad'){
        switch(this.umaIndicatorThird){
          case 1:
            // this.umaIndicatorForm = 2; -- animation doesn't exist yet
            this.umaIndicatorThird = 3;
            this.umaIndicatorRelativity = 'lasttriad';
            //Loop to last slide
            break;
          case 2:
            this.umaIndicatorForm = 18;
            this.umaIndicatorThird = 1;
            break;
          case 3:
            this.umaIndicatorForm = 19;
            this.umaIndicatorThird = 2;
            break;
        }
      } else if(this.umaIndicatorRelativity === 'preloop'){
        switch(this.umaIndicatorThird){
          case 1:
            this.umaIndicatorForm = 15;
            this.umaIndicatorThird = 1;
            this.umaIndicatorRelativity = 'firsttriad';
            break;
          case 2:
            this.umaIndicatorForm = 25;
            this.umaIndicatorThird = 1;
            break;
          case 3:
            this.umaIndicatorForm = 24;
            this.umaIndicatorThird = 2;
            break;
        }
      } else if(this.umaIndicatorRelativity === 'loop'){
        switch(this.umaIndicatorThird){
          case 1:
            //If state is < 3, then go to pre loop.
            if(this.umaIndicatorState < 3){
              this.umaIndicatorForm = 14;
              this.umaIndicatorRelativity = 'preloop';
            } else { //Loop
              if(this.umaIndicatorPrevLoop === false){
                this.umaIndicatorForm = 13;
                this.umaIndicatorPrevLoop = true;
              } else {
                this.umaIndicatorForm = 17;
                this.umaIndicatorPrevLoop = false;
              }
            }
            this.umaIndicatorThird = 1;
            break;
          case 2:
            this.umaIndicatorForm = 21;
            this.umaIndicatorThird = 1;
            break;
          case 3:
            this.umaIndicatorForm = 20;
            this.umaIndicatorThird = 2;
            break;
        }
      } else if(this.umaIndicatorRelativity === 'postloop'){
        switch(this.umaIndicatorThird){
          case 1:
            this.umaIndicatorForm = 12;
            this.umaIndicatorThird = 1;
            this.umaIndicatorRelativity = 'loop';
            break;
          case 2:
            this.umaIndicatorForm = 27;
            this.umaIndicatorThird = 1;
            break;
          case 3:
            this.umaIndicatorForm = 26;
            this.umaIndicatorThird = 2;
            break;
        }
      } else if(this.umaIndicatorRelativity === 'lasttriad'){
        switch(this.umaIndicatorThird){
          case 1:
            this.umaIndicatorForm = 11;
            this.umaIndicatorThird = 1;
            this.umaIndicatorRelativity = 'postloop';
            break;
          case 2:
            this.umaIndicatorForm = 10;
            this.umaIndicatorThird = 1;
            break;
          case 3:
            this.umaIndicatorForm = 9;
            this.umaIndicatorThird = 2;
            break;
        }
      }

      //Play Animation/Reveal State
      this.playAnim = true;

    }
  } 


}

