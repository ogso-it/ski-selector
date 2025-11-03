import { Component, OnInit } from '@angular/core';
import { skis } from 'src/assets/jsons/skis';
import { DataServiceService } from '../data-service.service';
import { getDatabase, ref, set } from "firebase/database";
import { UntypedFormArray } from '@angular/forms';




// install Swiper modules



@Component({
    selector: 'app-ski-result',
    templateUrl: './ski-result.component.html',
    styleUrls: ['./ski-result.component.scss'],
    standalone: false
})
export class SkiResultComponent implements OnInit {
  Dweight: number =  0 ;

  onSwiper() {
   // console.log();
  }
  onSlideChange() {
   // console.log('slide change');
  }



database = getDatabase();

height : any = 179
weight : any  = 83
type_snow : any  = 'powder'
terrain_type : any  = 'freeride'
ski_level : any = 'pro-guide'
ski_speed : any  = 'high-speed'
ski_turns : any = 'long'
bn : any = false
ar : any 
ski_level_fun : any = 'fun-surf' 
score : number = 0
resultat : any = [] 
bonnati_check : any = [] 


  constructor(private dataService : DataServiceService ) { 


  }




  ngOnInit(): void {
   this.getHeight()
    this.getWeight()
    this.getTerrainType()
    this.getSnowType()
    this.getSkiLevel() 
    this.getTurns()
    this.getSpeed()
    this.CheckSki() 
    
    
    if(this.type_snow){
      this.writeUserData()
    }
    
  }

  getHeight(){
    this.dataService.height.subscribe(response => {
    
    
     if(response){
      this.height = response
     // console.log(response)
    }
    });
  }
  getWeight(){
    this.dataService.weight.subscribe(response => {

  
      if(response){
        this.weight = response
       // console.log(response)
      }
    });
  }
  getTerrainType(){
    this.dataService.terrain_type.subscribe(response => {
 

      
      if(response){
        this.terrain_type = response
       // console.log(response)
      }
    });
  }
  getSnowType(){
    this.dataService.type_snow.subscribe(response => {
 

     
      if(response){
        this.type_snow = response
       // console.log(response)
      }
    });
  }

  getSkiLevel(){
    this.dataService.ski_style_fun.subscribe(response => {
 


      if(response){
        this.ski_level_fun = response
       // console.log(response)
      }
     
     
    });
  }
  getTurns(){
    this.dataService.turns.subscribe(response => {
 


      if(response){
        this.ski_turns = response
       // console.log(response)
      }
     
     
    });
  }
  getSpeed(){
    this.dataService.stable.subscribe(response => {
 


      if(response){
        this.ski_speed = response
       // console.log(response)
      }
     
     
    });
  }



   writeUserData() {

    

    const db = getDatabase();


    set(ref(db, 'ski_data/' + Date.now()), {
      todayDate : new Date().toISOString().slice(0, 10),
      recomanded_ski1 : this.resultat[0].name,
      recomanded_ski2 : this.resultat[1].name,
      recomanded_ski3 : this.resultat[2].name,
      height : this.height,
      weight : this.weight,
      snow : this.type_snow,
      terrain : this.terrain_type

    }).then(()=>{
     // console.log("ook")
    });
  }







CheckSki() : any {



    

  
  this.ar =  skis.filter((ski : any)=>{
    return (this.height >= ski.min_height && this.height <= ski.max_height || this.weight >= ski.min_weight && this.weight <= ski.max_weight ) 
   
  })
  this.bonnati_check =  this.ar.filter((ski : any)=>{
    return ski.playground == this.terrain_type
   
  })

 // console.log(this.bonnati_check)
   if(this.bonnati_check.length == 1){
     for(var i = 0 ; i <3 ; i++){
      this.resultat.push({
          link :this.bonnati_check[0].link,
          src : this.bonnati_check[0].src,
          score :this.bonnati_check[0].score,
          name :this.bonnati_check[0].name,
          size :this.bonnati_check[0].size,
      
      })
      this.bn = true
     }
     return 0
   }
   else {

    this.ar =  this.ar.filter((ski : any)=>{
      return ski.playground != 'touring-race'
     
    })


    for (var ski of this.ar){

      if((ski.turn.includes(this.ski_turns))){
        this.score = this.score + 5
      }
      if((ski.riding_speed.includes(this.ski_speed))){
        this.score = this.score + 5
      }
      if((ski.ski_style.includes(this.ski_level_fun))){
        this.score = this.score + 5
      }


      if (this.score >= 10){




        if(ski.min_height == 0){
          ski.min_height = ski.max_height -12
        }

        if(ski.max_height == 999 ){
          ski.max_height = ski.min_height + 12
        }
        if(ski.min_weight == 0){
          ski.min_weight = ski.max_weight -12
        }

        if(ski.max_weight == 999 ){
          ski.max_weight = ski.min_weight + 12
        }



        var avg = (ski.min_weight + ski.max_weight) /2

        if (this.height >= ski.min_height && this.height <= ski.max_height && this.weight >= ski.min_weight && this.weight <= ski.max_weight ) {

           this.Dweight = 0
        }

        else {
          this.Dweight = Math.abs(avg - this.weight)
        }



        this.resultat.push({
          score : 0 ,
          family: ski.family ,
          category: ski.category,
          name: ski.name,
          size: ski.size,
          max_height: ski.max_height,
          min_height:ski.min_height,
          max_weight: ski.max_weight,
          min_weight: ski.min_weight,
          ski_level: ski.ski_level,
          playground: ski.playground,
          snow : ski.snow,
          ski_style: ski.ski_style,
          riding_speed: ski.riding_speed,
          turn : ski.turn,
          src : ski.src,
          link : ski.link,
          difference_weight : this.Dweight
      
        })
      }

      this.score = 0
      this.Dweight = 0

    }
 
   // console.log(this.resultat)









  

      for (var r of this.resultat){
        if((r.snow.includes(this.type_snow))){
          
              r.score = r.score + 10
            
      }
      if((r.playground.includes(this.terrain_type))){
        r.score = r.score + 10
      }
    
    }
    
    var avg = (ski.min_weight + ski.max_weight) /2
    //console.log(Math.abs(avg - this.weight) )
    

    
    }
      
    
      
    
    
    
    
    
          this.resultat.sort(function(a:  any ,b: any ){ 
         
    
    
            if (b.score !== a.score) {
              // Sort by age if the ages are different
              return b.score - a.score;
            } else {
              // Otherwise, sort by height
              return a.difference_weight - b.difference_weight;
            }
    
    
    
    
    
    
    
    
          })
    
  
             




          this.resultat = this.resultat.reduce((acc : any , current : any) => {
            if (!acc.some((obj : any) => obj.name === current.name)) {
              acc.push(current);
            }
            return acc;
          }, []);
         // console.log( this.resultat);





    
  
  

}
}
