import { Component, OnInit } from '@angular/core';
import { splitboards
 } from 'src/assets/jsons/splitboards';
import { DataServiceService } from 'src/app/data-service.service';
import { getDatabase, ref, set } from "firebase/database";
import { initializeApp } from "firebase/app";

@Component({
    selector: 'app-split-result',
    templateUrl: './split-result.component.html',
    styleUrls: ['./split-result.component.css'],
    standalone: false
})
export class SplitResultComponent implements OnInit {


  database = getDatabase();
  height : any = 170
  weight : any  = 70
  type_snow : any  = 'powder'
  terrain_type : any  = 'touring-race-mountain'
  ski_level : any = 'pro-guide'
  ar : any 
  score : number = 0
  resultat : any = [] 
  
  
    constructor(private dataService : DataServiceService ) { 
  
      
  
  
    }
  
    ngOnInit(): void {
      this.getHeight()
      this.getWeight()
      this.getTerrainType()
      this.getSnowType()
      this.getSkiLevel()
      this.CheckSki()
      if(this.type_snow){
        this.writeUserData()
      }
      
    }
  
    getHeight(){
      this.dataService.height$.subscribe((response: number | null) => {
      
      
       if(response){
        this.height = response
        console.log(response)
      }
      });
    }
    getWeight(){
      this.dataService.weight$.subscribe((response: number | null) => {
  
    
        if(response){
          this.weight = response
          console.log(response)
        }
      });
    }
    getTerrainType(){
      this.dataService.terrain_type$.subscribe((response: string | null)=>{
   
  
        
        if(response){
          this.terrain_type = response
          console.log(response)
        }
      });
    }
    getSnowType(){
      this.dataService.type_snow$.subscribe((response: string | null)=>{
   
  
       
        if(response){
          this.type_snow = response
          console.log(response)
        }
      });
    }
  
    getSkiLevel(){
      this.dataService.ski_level$.subscribe((response: string | null)=> {
   
  
  
        if(response){
          this.ski_level = response
          console.log(response)
        }
       
       
      });
    }
  
  
     writeUserData() {
  
      
  
      const db = getDatabase();
      set(ref(db, 'splitboard_data/' + Date.now()), {
        todayDate : new Date().toISOString().slice(0, 10),
        recomanded_splitboard : this.ar[0],
        height : this.height,
        weight : this.weight,
        snow : this.type_snow,
        terrain : this.terrain_type

      }).then(()=>{
        console.log("OK")
      });
    }
  
  
  
  
  
  
  CheckSki(){
  
  
  
    //console.log(ski)
   /*  if (()    ){
         console.log(ski)
    } */
  
  
  
  
    { 
      this.ar =  splitboards.filter((ski)=>{
        return (this.height >= ski.min_height && this.height <= ski.max_height) 
      })
       
    }
  
  
  
  if (this.ski_level != 'newbie'){
    this.ar = this.ar.filter((ski : any )=>{
      return (ski.ski_level.includes(this.ski_level))
    })
  }
  
  
  
  for (var ski of this.ar){
  
    if((this.weight >= ski.min_weight && this.weight <= ski.max_weight)){
       this.score = this.score + 50
  
    }
  
  

  
    this.resultat.push({
      link : ski.link,
      src : ski.src,
      score : this.score,
      name : ski.name,
      size : ski.size,
      award : ski.award
  
    })
    this.score = 0
  
  }
  
  
  
  
  
  
  
  /* 
      this.ar = this.ar.filter((ski : any )=>{
      return (ski.ski_level.includes(this.ski_level))
    })
  
     this.ar = this.ar.filter((ski : any )=>{
      return (ski.playground.includes(this.terrain_type))
    }) 
  
  
  
    if (this.ar.length === 0) 
    { 
      this.ar =  skis.filter((ski)=>{
        return (this.height >= ski.min_height && this.height <= ski.max_height  && ski.playground.includes(this.terrain_type ) )
      })
       
    } 
  
  
  
  
  
  
  
     if (this.ar.length === 0) 
    { 
      this.ar =  skis.filter((ski)=>{
        return (this.height >= ski.min_height && this.height <= ski.max_height &&  ski.snow.includes(this.type_snow ) )
      })
       
    } 
  
  
  
  
   this.ar = this.ar.filter((ski : any)=>{
      return (ski.snow.includes(this.type_snow))
    }) 
  
  
   
  
    if (this.ar.length === 0) 
    { 
      this.ar =  skis.filter((ski)=>{
        return (this.height >= ski.min_height && this.height <= ski.max_height  )
      })
       
    } 
   */
  
    this.resultat.sort(function(a:  any ,b: any ){ 
      return b.score - a.score 
    })
  
    console.log(this.resultat)
  }
  
  
  
  
  
    
  
  }
  