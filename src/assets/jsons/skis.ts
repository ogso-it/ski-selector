import { generate } from "rxjs";

 export const skis = [
    // {
    //   family: 'SUPER ROCKER',
    //   category: 'ULTRA LIGHT',
    //   name: 'SPEARHEAD 80 SR UL',
    //   size: 156,
    //   max_height: 163,
    //   min_height: 0,
    //   max_weight: 55,
    //   min_weight: 0,
    //   ski_level: ['newbie', 'intermediate', 'confirmed', 'pro-guide'],
    //   playground: ['touring-back-mountain' ,'touring-front-mountain' ],
    //   snow : ['powder' ,'crud'],
    //   ski_style: ['fun-surf'],
    //   riding_speed: ['moderate-speed'],
    //   turn : ['short'],
    //   src : "https://ogso-mountain-essentials.com/app/ski-photos/SPEARHEAD.png" ,
    //    link : 'https://ogso-mountain-essentials.com/product/spearhead-80/'
    // },
    // {
    //     family: 'SUPER ROCKER',
    //     category: 'ULTRA LIGHT',
    //     name: 'SPEARHEAD 80 SR UL',
    //     size: 164,
    //     max_height: 171,
    //     min_height: 164,
    //     max_weight: 68,
    //     min_weight: 56,
    //     ski_level: ['newbie', 'intermediate', 'confirmed', 'pro-guide'],
    //     playground: ['touring-back-mountain' ,'touring-front-mountain' ],
    //     snow : ['powder' ,'crud'],
    //     ski_style: ['fun-surf'],
    //     riding_speed: ['moderate-speed'],
    //     turn : ['short'],
    //     src : "https://ogso-mountain-essentials.com/app/ski-photos/SPEARHEAD.png",
    //     link : 'https://ogso-mountain-essentials.com/product/spearhead-80/'
  
    // }
    // ,
    // {
    //     family: 'SUPER ROCKER',
    //     category: 'ULTRA LIGHT',
    //     name: 'SPEARHEAD 80 SR UL',
    //     size: 172,
    //     max_height: 179,
    //     min_height: 172,
    //     max_weight: 81,
    //     min_weight: 69,
    //     ski_level: ['newbie', 'intermediate', 'confirmed', 'pro-guide'],
    //     playground: ['touring-back-mountain' ,'touring-front-mountain' ],
    //     snow : ['powder' ,'crud'],
    //     ski_style: ['fun-surf'],
    //     riding_speed: ['moderate-speed'],
    //     turn : ['short'],
    //     src : "https://ogso-mountain-essentials.com/app/ski-photos/SPEARHEAD.png",
    //     link : 'https://ogso-mountain-essentials.com/product/spearhead-80/'
    // }
    // ,
    // {
    //     family: 'SUPER ROCKER',
    //     category: 'ULTRA LIGHT',
    //     name: 'SPEARHEAD 80 SR UL',
    //     size: 180,
    //     max_height: 187,
    //     min_height: 180,
    //     max_weight: 95,
    //     min_weight: 82,
    //     ski_level: ['newbie', 'intermediate', 'confirmed', 'pro-guide'],
    //     playground: ['touring-back-mountain' ,'touring-front-mountain' ],
    //     snow : ['powder' ,'crud'],
    //     ski_style: ['fun-surf'],
    //     riding_speed: ['moderate-speed'],
    //     turn : ['short'],
    //     src : "https://ogso-mountain-essentials.com/app/ski-photos/SPEARHEAD.png",
    //     link : 'https://ogso-mountain-essentials.com/product/spearhead-80/'
    // }
    // ,
    // {
    //     family: 'SUPER ROCKER',
    //     category: 'ULTRA LIGHT',
    //     name: 'SPEARHEAD 80 SR UL',
    //     size: 188,
    //     max_height: 999,
    //     min_height: 188,
    //     max_weight: 999,
    //     min_weight: 96,
    //     ski_level: ['newbie', 'intermediate', 'confirmed', 'pro-guide'],
    //     playground: ['touring-back-mountain' ,'touring-front-mountain' ],
    //     snow : ['powder' ,'crud'],
    //     ski_style: ['fun-surf'],
    //     riding_speed: ['moderate-speed'],
    //     turn : ['short'],
    //     src : "https://ogso-mountain-essentials.com/app/ski-photos/SPEARHEAD.png",
    //     link : 'https://ogso-mountain-essentials.com/product/spearhead-80/'
  
  
    // },
  
  

    // {
    //   family: 'SUPER ROCKER',
    //   category: 'ULTRA LIGHT',
    //   name: 'COSMIQUE 90 SR UL',
    //   size: 184,
    //   max_height: 191,
    //   min_height: 184,
    //   max_weight: 95,
    //   min_weight: 88,
    //   ski_level: ['newbie', 'intermediate', 'confirmed', 'pro-guide'],
    //   playground: ['touring-back-mountain' ,'touring-front-mountain' ],
    //   snow : ['powder' ,'crud'],
    //   ski_style: ['fun-surf'],
    //   riding_speed: ['moderate-speed'],
    //   turn : ['short'],
    //   src : 'https://ogso-mountain-essentials.com/app/ski-photos/COSMIQUE.png',
    //   link : 'https://ogso-mountain-essentials.com/product/cosmique-90-sr/'
  
  
    // }
    ,
    // {
    //   family: 'SUPER ROCKER',
    //   category: 'ULTRA LIGHT',
    //   name: 'COSMIQUE 90 SR UL',
    //   size: 192,
    //   max_height: 999,
    //   min_height: 192,
    //   max_weight: 999,
    //   min_weight: 96,
    //   ski_level: ['newbie', 'intermediate', 'confirmed', 'pro-guide'],
    //   playground: ['touring-back-mountain' ,'touring-front-mountain' ],
    //   snow : ['powder' ,'crud'],
    //   ski_style: ['fun-surf'],
    //   riding_speed: ['moderate-speed'],
    //   turn : ['short'],
    //   src : 'https://ogso-mountain-essentials.com/app/ski-photos/COSMIQUE.png',
    //   link : 'https://ogso-mountain-essentials.com/product/cosmique-90-sr/'
  
  
    // },
  
  
    // {
    //   family: 'SUPER ROCKER',
    //   category: 'ULTRA LIGHT',
    //   name: 'SCHWARZTOR 100 SR UL',
    //   size: 162,
    //   max_height: 169,
    //   min_height: 0,
    //   max_weight: 59,
    //   min_weight: 0,
    //   ski_level: ['newbie', 'intermediate', 'confirmed', 'pro-guide'],
    //   playground: ['touring-back-mountain' ,'touring-front-mountain' ],
    //   snow : ['powder' ,'crud'],
    //   ski_style: ['fun-surf'],
    //   riding_speed: ['moderate-speed'],
    //   turn : ['short'],
    //   src : 'https://ogso-mountain-essentials.com/app/ski-photos/SCHWARZTOR.png',
    //   link : 'https://ogso-mountain-essentials.com/product/schwarztor-100-sr-ul/'
  
  
    // },
    // {
    //   family: 'SUPER ROCKER',
    //   category: 'ULTRA LIGHT',
    //   name: 'SCHWARZTOR 100 SR UL',
    //   size: 170,
    //   max_height: 177,
    //   min_height: 170,
    //   max_weight: 73,
    //   min_weight: 60,
    //   ski_level: ['newbie', 'intermediate', 'confirmed', 'pro-guide'],
    //   playground: ['touring-back-mountain' ,'touring-front-mountain' ],
    //   snow : ['powder' ,'crud'],
    //   ski_style: ['fun-surf'],
    //   riding_speed: ['moderate-speed'],
    //   turn : ['short'],
    //   src : 'https://ogso-mountain-essentials.com/app/ski-photos/SCHWARZTOR.png',
    //   link : 'https://ogso-mountain-essentials.com/product/schwarztor-100-sr-ul/'
  
  
  
    // }
    // ,
    // {
    //     family: 'SUPER ROCKER',
    //     category: 'ULTRA LIGHT',
    //     name: 'SCHWARZTOR 100 SR UL',
    //     size: 178,
    //     max_height: 185,
    //     min_height: 178,
    //     max_weight: 86,
    //     min_weight: 74,
    //     ski_level: ['newbie', 'intermediate', 'confirmed', 'pro-guide'],
    //     playground: ['touring-back-mountain' ,'touring-front-mountain' ],
    //     snow : ['powder' ,'crud'],
    //     ski_style: ['fun-surf'],
    //     riding_speed: ['moderate-speed'],
    //     turn : ['short'],
    //     src : 'https://ogso-mountain-essentials.com/app/ski-photos/SCHWARZTOR.png',
    //     link : 'https://ogso-mountain-essentials.com/product/schwarztor-100-sr-ul/'
  
  
    // }
    // ,
    // {
    //     family: 'SUPER ROCKER',
    //     category: 'ULTRA LIGHT',
    //     name: 'SCHWARZTOR 100 SR UL',
    //     size: 186,
    //     max_height: 193,
    //     min_height: 186,
    //     max_weight: 91,
    //     min_weight: 87,
    //     ski_level: ['newbie', 'intermediate', 'confirmed', 'pro-guide'],
    //     playground: ['touring-back-mountain' ,'touring-front-mountain' ],
    //     snow : ['powder' ,'crud'],
    //     ski_style: ['fun-surf'],
    //     riding_speed: ['moderate-speed'],
    //     turn : ['short'],
    //     src : 'https://ogso-mountain-essentials.com/app/ski-photos/SCHWARZTOR.png',
    //     link : 'https://ogso-mountain-essentials.com/product/schwarztor-100-sr-ul/'
  
  
    // }
    // ,
    // {
    //     family: 'SUPER ROCKER',
    //     category: 'ULTRA LIGHT',
    //     name: 'SCHWARZTOR 100 SR UL',
    //     size: 194,
    //     max_height: 300,
    //     min_height: 194,
    //     max_weight: 999,
    //     min_weight: 92,
    //     ski_level: ['newbie', 'intermediate', 'confirmed', 'pro-guide'],
    //     playground: ['touring-back-mountain' ,'touring-front-mountain' ],
    //      snow : ['powder' ,'crud'],
    //      ski_style: ['fun-surf'],
    //      riding_speed: ['moderate-speed'],
    //      turn : ['short'],
    //     src : 'https://ogso-mountain-essentials.com/app/ski-photos/SCHWARZTOR.png',
    //     link : 'https://ogso-mountain-essentials.com/product/schwarztor-100-sr-ul/'
  
  
    // }
    // ,
  
    // {
    //   family: 'SUPER ROCKER',
    //   category: 'ULTRA LIGHT',
    //   name: "CORBET'S 110 SR UL",
    //     size: 171,
    //     max_height: 178,
    //     min_height: 0,
    //     max_weight: 70,
    //     min_weight: 0,
    //     ski_level: ['newbie', 'intermediate', 'confirmed', 'pro-guide'],
    //     playground: ['touring-back-mountain' ,'touring-front-mountain' ],
    //     snow : ['powder','slush'],
    //     ski_style: ['fun-surf'],
    //     riding_speed: 'moderate-speed',
    //     turn : 'short',
    //   src : "https://ogso-mountain-essentials.com/app/ski-photos/CORBETS.png",
    //   link : 'https://ogso-mountain-essentials.com/product/corbets-110-sr-ul/',
    //   award : 'https://ogso-mountain-essentials.com/app/ski-photos/awards/double.png'
  
  
    // }
    // , {
    //   family: 'SUPER ROCKER',
    //   category: 'ULTRA LIGHT',
    //   name: "CORBET'S 110 SR UL" ,
    //   size: 179,
    //     max_height: 186, 
    //     min_height: 179,
    //     max_weight: 83,
    //     min_weight: 71,
    //     ski_level: ['newbie', 'intermediate', 'confirmed', 'pro-guide'],
    //     playground: ['touring-back-mountain' ,'touring-front-mountain' ],
    //     snow : ['powder' ,'crud'],
    //     ski_style: ['fun-surf'],
    //     riding_speed: ['moderate-speed'],
    //     turn : ['short'],
    //   src : "https://ogso-mountain-essentials.com/app/ski-photos/CORBETS.png",
    //   link : 'https://ogso-mountain-essentials.com/product/corbets-110-sr-ul/',
    //   award : 'https://ogso-mountain-essentials.com/app/ski-photos/awards/double.png'
  
  
    // }
    // , {
    //   family: 'SUPER ROCKER',
    //   category: 'ULTRA LIGHT',
    //   name: "CORBET'S 110 SR UL",
    //   size: 187,
    //   max_height: 194,
    //   min_height: 187,
    //   max_weight: 97,
    //   min_weight: 84,
    //   ski_level: ['newbie', 'intermediate', 'confirmed', 'pro-guide'],
    //   playground: ['touring-back-mountain' ,'touring-front-mountain' ],
    //   snow : ['powder' ,'crud'],
    //   ski_style: ['fun-surf'],
    //   riding_speed: ['moderate-speed'],
    //   turn : ['short'],
    //   src : "https://ogso-mountain-essentials.com/app/ski-photos/CORBETS.png",
    //   link : 'https://ogso-mountain-essentials.com/product/corbets-110-sr-ul/',
    //   award : 'https://ogso-mountain-essentials.com/app/ski-photos/awards/double.png'
  
  
    // }
    // , {
    //   family: 'SUPER ROCKER',
    //   category: 'ULTRA LIGHT',
    //   name: "CORBET'S 110 SR UL",
    //   size: 195,
    //   max_height: 999,
    //   min_height: 195,
    //   max_weight: 999,
    //   min_weight: 98,
    //   ski_level: ['newbie', 'intermediate', 'confirmed', 'pro-guide'],
    //   playground: ['touring-back-mountain' ,'touring-front-mountain' ],
    //   snow : ['powder' ,'crud'],
    //   ski_style: ['fun-surf'],
    //   riding_speed: ['moderate-speed'],
    //   turn : ['short'],
    //   src : "https://ogso-mountain-essentials.com/app/ski-photos/CORBETS.png",
    //   link : 'https://ogso-mountain-essentials.com/product/corbets-110-sr-ul/',
    //   award : 'https://ogso-mountain-essentials.com/app/ski-photos/awards/double.png'
  
  
    // },
  /* ------------------------------------------------------------------------------------------------------------------------------------------------------------*/
    // {
    //   family: 'SUPER ROCKER',
    //   category: 'MEDIUM LIGHT',
    //   name: 'WHYMPER 80 SR ML',
    //   size: 156,
    //   max_height: 163,
    //   min_height: 0,
    //   max_weight: 56,
    //   min_weight: 0,
    //   ski_level: ['newbie', 'intermediate', 'confirmed', 'pro-guide'],
    //   playground: ['all-mountain' , 'freeride' , 'freetouring'],
    //   snow : ['powder','crud'],
    //   ski_style: ['fun-surf'],
    //   riding_speed: ['moderate-speed'],
    //   turn : ['short'],
    //   src : "https://ogso-mountain-essentials.com/app/ski-photos/WHYMPER.png",
    //   link : 'https://ogso-mountain-essentials.com/product/whymper-80-sr-ml/'
     
  
    // },
    // {
    //   family: 'SUPER ROCKER',
    //   category: 'MEDIUM LIGHT',
    //   name: 'WHYMPER 80 SR ML',
    //   size: 164,
    //   max_height: 171,
    //   min_height: 164,
    //   max_weight: 68,
    //   min_weight: 57,
    //   ski_level: ['newbie', 'intermediate', 'confirmed', 'pro-guide'],
    //   playground: ['all-mountain' , 'freeride' , 'freetouring'],
    //   snow : ['powder','crud'],
    //   ski_style: ['fun-surf'],
    //   riding_speed: ['moderate-speed'],
    //   turn : ['short'],
    //   src : "https://ogso-mountain-essentials.com/app/ski-photos/WHYMPER.png",
    //   link : 'https://ogso-mountain-essentials.com/product/whymper-80-sr-ml/'
    // }
    // ,
    // {
    //   family: 'SUPER ROCKER',
    //   category: 'MEDIUM LIGHT',
    //   name: 'WHYMPER 80 SR ML',
    //   size: 172,
    //   max_height: 179,
    //   min_height: 172,
    //   max_weight: 81,
    //   min_weight: 69,
    //   ski_level: ['newbie', 'intermediate', 'confirmed', 'pro-guide'],
    //   playground: ['all-mountain' , 'freeride' , 'freetouring'],
    //   snow : ['powder','crud'],
    //   ski_style: ['fun-surf'],
    //   riding_speed: ['moderate-speed'],
    //   turn : ['short'],
    //   src : "https://ogso-mountain-essentials.com/app/ski-photos/WHYMPER.png",
    //   link : 'https://ogso-mountain-essentials.com/product/whymper-80-sr-ml/'
  
    // }
    // ,
    // {
    //   family: 'SUPER ROCKER',
    //   category: 'MEDIUM LIGHT',
    //   name: 'WHYMPER 80 SR ML',
    //   size: 180,
    //   max_height: 187,
    //   min_height: 180,
    //   max_weight: 95,
    //   min_weight: 82,
    //   ski_level: ['newbie', 'intermediate', 'confirmed', 'pro-guide'],
    //   playground: ['all-mountain' , 'freeride' , 'freetouring'],
    //   snow : ['powder','crud'],
    //   ski_style: ['fun-surf'],
    //   riding_speed: ['moderate-speed'],
    //   turn : ['short'],
    //   src : "https://ogso-mountain-essentials.com/app/ski-photos/WHYMPER.png",
    //   link : 'https://ogso-mountain-essentials.com/product/whymper-80-sr-ml/'
  
    // }
    // ,
    // {
    //   family: 'SUPER ROCKER',
    //   category: 'MEDIUM LIGHT',
    //   name: 'WHYMPER 80 SR ML',
    //   size: 188,
    //   max_height: 999,
    //   min_height: 188,
    //   max_weight: 999,
    //   min_weight: 96,
    //   ski_level: ['newbie', 'intermediate', 'confirmed', 'pro-guide'],
    //   playground: ['all-mountain' , 'freeride' , 'freetouring'],
    //   snow : ['powder','crud'],
    //   ski_style: ['fun-surf'],
    //   riding_speed: ['moderate-speed'],
    //   turn : ['short'],
    //   src : "https://ogso-mountain-essentials.com/app/ski-photos/WHYMPER.png",
    //   link : 'https://ogso-mountain-essentials.com/product/whymper-80-sr-ml/'
  
    // }
    // ,
  
    // {
    //   family: 'SUPER ROCKER',
    //   category: 'MEDIUM LIGHT',
    //   name: 'GERVASUTTI 90 SR ML',
    //   size: 160,
    //   max_height: 167,
    //   min_height: 0,
    //   max_weight: 60,
    //   min_weight: 0,
    //   ski_level: ['newbie', 'intermediate', 'confirmed', 'pro-guide'],
    //   playground: ['all-mountain' , 'freeride' , 'freetouring'],
    //   snow : ['powder','crud'],
    //   ski_style: ['fun-surf'],
    //   riding_speed: ['moderate-speed'],
    //   turn : ['short'],
    //   src : "https://ogso-mountain-essentials.com/app/ski-photos/GERVASUTTI.png",
    //   link : 'https://ogso-mountain-essentials.com/product/gervasutti-90-sr-ml/'
  
    // },
    // {
    //   family: 'SUPER ROCKER',
    //   category: 'MEDIUM LIGHT',
    //   name: 'GERVASUTTI 90 SR ML',
    //   size: 168,
    //   max_height: 175,
    //   min_height: 168,
    //   max_weight: 74,
    //   min_weight: 61,
    //   ski_level: ['newbie', 'intermediate', 'confirmed', 'pro-guide'],
    //   playground: ['all-mountain' , 'freeride' , 'freetouring'],
    //   snow : ['powder','crud'],
    //   ski_style: ['fun-surf'],
    //   riding_speed: ['moderate-speed'],
    //   turn : ['short'],
    //   src : "https://ogso-mountain-essentials.com/app/ski-photos/GERVASUTTI.png",
    //   link : 'https://ogso-mountain-essentials.com/product/gervasutti-90-sr-ml/'
  
    // }
    // ,
    // {
    //   family: 'SUPER ROCKER',
    //   category: 'MEDIUM LIGHT',
    //   name: 'GERVASUTTI 90 SR ML',
    //   size: 176,
    //   max_height: 183,
    //   min_height: 176,
    //   max_weight: 87,
    //   min_weight: 75,
    //   ski_level: ['newbie', 'intermediate', 'confirmed', 'pro-guide'],
    //   playground: ['all-mountain' , 'freeride' , 'freetouring'],
    //   snow : ['powder','crud'],
    //   ski_style: ['fun-surf'],
    //   riding_speed: ['moderate-speed'],
    //   turn : ['short'],
    //   src : "https://ogso-mountain-essentials.com/app/ski-photos/GERVASUTTI.png",
    //   link : 'https://ogso-mountain-essentials.com/product/gervasutti-90-sr-ml/'
  
    // }
    // ,
    // {
    //   family: 'SUPER ROCKER',
    //   category: 'MEDIUM LIGHT',
    //   name: 'GERVASUTTI 90 SR ML',
    //   size: 184,
    //   max_height: 191,
    //   min_height: 184,
    //   max_weight: 95,
    //   min_weight: 89,
    //   ski_level: ['newbie', 'intermediate', 'confirmed', 'pro-guide'],
    //   playground: ['all-mountain' , 'freeride' , 'freetouring'],
    //   snow : ['powder','crud'],
    //   ski_style: ['fun-surf'],
    //   riding_speed: ['moderate-speed'],
    //   turn : ['short'],
    //   src : "https://ogso-mountain-essentials.com/app/ski-photos/GERVASUTTI.png",
    //   link : 'https://ogso-mountain-essentials.com/product/gervasutti-90-sr-ml/'
  
    // }
    // ,
    // {
    //   family: 'SUPER ROCKER',
    //   category: 'MEDIUM LIGHT',
    //   name: 'GERVASUTTI 90 SR ML',
    //   size: 192,
    //   max_height: 300,
    //   min_height: 192,
    //   max_weight: 999,
    //   min_weight: 96,
    //   ski_level: ['newbie', 'intermediate', 'confirmed', 'pro-guide'],
    //   playground: ['all-mountain' , 'freeride' , 'freetouring'],
    //   snow : ['powder','crud'],
    //   ski_style: ['fun-surf'],
    //   riding_speed: ['moderate-speed'],
    //   turn : ['short'],
    //   src : "https://ogso-mountain-essentials.com/app/ski-photos/GERVASUTTI.png",
    //   link : 'https://ogso-mountain-essentials.com/product/gervasutti-90-sr-ml/'
  
    // },
  
    // {
    //   family: 'NEOTERIC CAMBER',
    //   category: 'ULTRA LIGHT',
    //   name: "BONATTI 70 NEO UL",
    //   size: 155,
    //   max_height: 170,
    //   min_height: 160,
    //   max_weight: 45,
    //   min_weight: 0,
    //   ski_level: ['intermediate', 'confirmed', 'pro-guide'],
    //   playground: ['touring-race'],
    //   snow : ['crud','ice','slush'],
    //   ski_style: [''],
    //   riding_speed: 'high-speed',
    //   turn : 'long',
    //   src : "https://ogso-mountain-essentials.com/app/ski-photos/BONATTI.png",
    //   link : 'https://ogso-mountain-essentials.com/product/bonatti-70-nc-ul/'
  
  
    // },
    // {
    //   family: 'NEOTERIC CAMBER',
    //   category: 'ULTRA LIGHT',
    //   name: "BONATTI 70 NEO UL",
    //   size: 164,
    //   max_height: 179,
    //   min_height: 169,
    //   max_weight: 58,
    //   min_weight: 46,
    //   ski_level: ['intermediate', 'confirmed', 'pro-guide'],
    //   playground: ['touring-race'],
    //   snow : ['crud','ice','slush'],
    //   ski_style: [''],
    //   riding_speed: 'high-speed',
    //   turn : 'long',
    //   src : "https://ogso-mountain-essentials.com/app/ski-photos/BONATTI.png",
    //   link : 'https://ogso-mountain-essentials.com/product/bonatti-70-nc-ul/'
  
    // },
    // {
    //   family: 'NEOTERIC CAMBER',
    //   category: 'ULTRA LIGHT',
    //   name: "BONATTI 70 NEO UL",
    //   size: 172,
    //   max_height: 187,
    //   min_height: 177,
    //   max_weight: 71,
    //   min_weight: 59,
    //   ski_level: ['intermediate', 'confirmed', 'pro-guide'],
    //   playground: ['touring-race'],
    //   snow : ['crud','ice','slush'],
    //   ski_style: [''],
    //   riding_speed: 'high-speed',
    //   turn : 'long',
    //   src : "https://ogso-mountain-essentials.com/app/ski-photos/BONATTI.png",
    //   link : 'https://ogso-mountain-essentials.com/product/bonatti-70-nc-ul/'
  
    // },
    // {
    //   family: 'NEOTERIC CAMBER',
    //   category: 'ULTRA LIGHT',
    //   name: "BONATTI 70 NEO UL",
    //   size: 180,
    //   max_height: 300,
    //   min_height: 185,
    //   max_weight: 999,
    //   min_weight: 72,
    //   ski_level: ['intermediate', 'confirmed', 'pro-guide'],
    //   playground: ['touring-race'],
    //   snow : ['crud','ice','slush'],
    //   ski_style: [''],
    //   riding_speed: 'high-speed',
    //   turn : 'long',
    //   src : "https://ogso-mountain-essentials.com/app/ski-photos/BONATTI.png",
    //   link : 'https://ogso-mountain-essentials.com/product/bonatti-70-nc-ul/'
  
    // },
      {
      family: 'CONTEMPORARY',
      category: 'ULTRA LIGHT', 
      name: 'LE TOUNO',   // name: 'COSMIQUE 90 SR UL',
      size: 162,  // size: 160,
      max_height: 167,
      min_height: 0,
      max_weight: 60,
      min_weight: 0,
      sidecut: '128-86-113',
      ski_level: ['newbie', 'intermediate', 'confirmed', 'pro-guide'],
      playground: ['carving','resort','touring-front-mountain' ],
      snow : ['hard'],
      ski_style: ['technical-precision'],
      riding_speed: ['high-speed','moderate-speed'],
      turn : ['short'],
      src : 'https://ogso-mountain-essentials.com/app/ski-photos/letouno2026.webp',
      link : 'https://ogso-mountain-essentials.com/shop/contemporary-series/le-touno-2/'  //      link : 'https://ogso-mountain-essentials.com/product/cosmique-90-sr/'

  
    },

    {
      family: 'CONTEMPORARY',
      category: 'ULTRA LIGHT',
      name: 'LE TOUNO', // name: 'COSMIQUE 90 SR UL',
      size: 172,   // size: 168,
      max_height: 175,
      min_height: 168,
      max_weight: 61,
      min_weight: 74,
      sidecut: '130-87-115',
      ski_level: ['newbie', 'intermediate', 'confirmed', 'pro-guide'],
      playground: ['carving','resort','touring-front-mountain' ],
      snow : ['hard'],
      ski_style: ['technical-precision'],
      riding_speed: ['high-speed','moderate-speed'],
      turn : ['short'],
      src : 'https://ogso-mountain-essentials.com/app/ski-photos/26-27/letouno2026.webp',   //src : 'https://ogso-mountain-essentials.com/app/ski-photos/COSMIQUE.png',
      link : 'https://ogso-mountain-essentials.com/shop/contemporary-series/le-touno-2/'  // link : 'https://ogso-mountain-essentials.com/product/cosmique-90-sr/'
  
  
  
    }
    ,
    {
      family: 'CONTEMPORARY',
      category: 'ULTRA LIGHT',
      name: 'LE TOUNO', // name: 'COSMIQUE 90 SR UL',
      size: 182,  // size: 176,
      max_height: 183,
      min_height: 176,
      max_weight: 87,
      min_weight: 75,
      sidecut: '132-88-117',
      ski_level: ['newbie', 'intermediate', 'confirmed', 'pro-guide'],
      playground: ['carving','resort','touring-front-mountain' ],
      snow : ['hard'],
      ski_style: ['technical-precision'],
      riding_speed: ['high-speed','moderate-speed'],
      turn : ['short'],
      src : 'https://ogso-mountain-essentials.com/app/ski-photos/26-27/letouno2026.webp',  //src : 'https://ogso-mountain-essentials.com/app/ski-photos/COSMIQUE.png',
      link : 'https://ogso-mountain-essentials.com/shop/contemporary-series/le-touno-2/' // link : 'https://ogso-mountain-essentials.com/product/cosmique-90-sr/'
  
  
  
    }
    ,
    {
      family: 'FREE RIDE',
      category: 'MEDIUM LIGHT SR ML',
      name: 'GRIZZLY',
      size: 170,
      max_height: 177,
      min_height: 170,
      max_weight: 73,
      min_weight: 59,
      sidecut: '133-102-119',
      ski_level: ['newbie', 'intermediate', 'confirmed', 'pro-guide'],
      playground: ['all-mountain' , 'freeride' , 'freetouring'],
      snow : ['crud'],
      ski_style: ['fun-surf','technical-precision'],
      riding_speed: ['high-speed','moderate-speed'],
      turn : ['short'],
      src : 'https://ogso-mountain-essentials.com/app/ski-photos/grizzly2026.webp', //src : "https://ogso-mountain-essentials.com/app/ski-photos/DIABLE.png",
      link :'https://ogso-mountain-essentials.com/shop/free-ride-series/grizzly-2/' , //  link : 'https://ogso-mountain-essentials.com/product/diable-100-sr-ml/',
     // award : 'https://ogso-mountain-essentials.com/app/ski-photos/awards/g-s.png'
  
  
    }
    ,
    {
      family: 'FREE RIDE',
      category: 'MEDIUM LIGHT SR ML',
      name: 'GRIZZLY',
      size: 178,
      max_height: 185,
      min_height: 178,
      max_weight: 83,
      min_weight: 74,
      sidecut: '136-104-122',
      ski_level: ['newbie', 'intermediate', 'confirmed', 'pro-guide'],
      playground: ['all-mountain' , 'freeride' , 'freetouring'],
      snow : ['crud'],
      ski_style: ['fun-surf','technical-precision'],
      riding_speed: ['high-speed','moderate-speed'],
      turn : ['short'],
      src : 'https://ogso-mountain-essentials.com/app/ski-photos/26-27/grizzly2026.webp', //src : "https://ogso-mountain-essentials.com/app/ski-photos/DIABLE.png",
      link :'https://ogso-mountain-essentials.com/shop/free-ride-series/grizzly-2/' , // link : 'https://ogso-mountain-essentials.com/product/diable-100-sr-ml/',
     // award : 'https://ogso-mountain-essentials.com/app/ski-photos/awards/g-s.png'
  
  
    }
    ,
    {
      family: 'FREE RIDE',
      category: 'MEDIUM LIGHT',
      name: 'GRIZZLY' , // name: 'DIABLE 100 SR ML',
      size: 186,
      max_height: 193,
      min_height: 186,
      max_weight: 95,
      min_weight: 84,
      sidecut: '139-106-125',
      ski_level: ['newbie', 'intermediate', 'confirmed', 'pro-guide'],
      playground: ['all-mountain' , 'freeride' , 'freetouring'],
      snow : ['crud'],
      ski_style: ['fun-surf','technical-precision'],
      riding_speed: ['high-speed','moderate-speed'],
      turn : ['short'],
      src : 'https://ogso-mountain-essentials.com/app/ski-photos/26-27/grizzly2026.webp',  // src : "https://ogso-mountain-essentials.com/app/ski-photos/DIABLE.png",
      link :'https://ogso-mountain-essentials.com/shop/free-ride-series/grizzly-2/' ,  // link : 'https://ogso-mountain-essentials.com/product/diable-100-sr-ml/',
     // award : 'https://ogso-mountain-essentials.com/app/ski-photos/awards/g-s.png'
  
  
    }
    ,
    {
      family: 'FREE RIDE',
      category: 'MEDIUM LIGHT',
      name: 'GRIZZLY', // name: 'DIABLE 100 SR ML',
      size: 194,
      max_height: 999,
      min_height: 194,
      max_weight: 999,
      min_weight: 96,
      sidecut: '142-108-128',
      ski_level: ['newbie', 'intermediate', 'confirmed', 'pro-guide'],
      playground: ['all-mountain' , 'freeride' , 'freetouring'],
      snow : ['crud'],
      ski_style: ['fun-surf','technical-precision'],
      riding_speed: ['high-speed','moderate-speed'],
      turn : ['short'],
      src : 'https://ogso-mountain-essentials.com/app/ski-photos/26-27/grizzly2026.webp',  //src : "https://ogso-mountain-essentials.com/app/ski-photos/DIABLE.png",
      link :'https://ogso-mountain-essentials.com/shop/free-ride-series/grizzly-2/' ,  //link : 'https://ogso-mountain-essentials.com/product/diable-100-sr-ml/',
  
  
    }
    ,
    {
      family: 'FREE RIDE',
      category: 'MEDIUM LIGHT',
      name: "BIG",  //name: "SPENECER 110 SR ML",
      size: 170, // size: 171,
      max_height: 175,
      min_height: 0,
      max_weight: 69,
      min_weight: 0,
      sidecut: '136-108-123',
      ski_level: ['newbie', 'intermediate', 'confirmed', 'pro-guide'],
      playground: ['all-mountain' , 'freeride' , 'freetouring'],
      snow : ['powder'],
      ski_style: ['fun-surf'],
      riding_speed: ['high-speed','moderate-speed'],
      turn : ['long'],
      src : 'https://ogso-mountain-essentials.com/app/ski-photos/26-27/big2026.webp',  //src : "https://ogso-mountain-essentials.com/app/ski-photos/SPENCER.png",
      link :'https://ogso-mountain-essentials.com/shop/free-ride-series/big-2/' , //link : 'https://ogso-mountain-essentials.com/product/spencer-110-sr-ml/'
  
  
    }
    , {
      family: 'FREE RIDE',
      category: 'MEDIUM LIGHT',
      name: "BIG", // name: "SPENECER 110 SR ML",
      size: 178,  //size: 179,
      max_height: 183,
      min_height: 176,
      max_weight: 83,
      min_weight: 70,
      sidecut: '139-110-126',
      ski_level: ['newbie', 'intermediate', 'confirmed', 'pro-guide'],
      playground: ['all-mountain' , 'freeride' , 'freetouring'],
      snow : ['powder'],
      ski_style: ['fun-surf'],
      riding_speed: ['high-speed','moderate-speed'],
      turn : ['long'],
      src : 'https://ogso-mountain-essentials.com/app/ski-photos/26-27/big2026.webp',    //src : "https://ogso-mountain-essentials.com/app/ski-photos/SPENCER.png",
      link :'https://ogso-mountain-essentials.com/shop/free-ride-series/big-2/' ,   //link : 'https://ogso-mountain-essentials.com/product/spencer-110-sr-ml/'
  
  
    }
    , {
      family: 'FREE RIDE',
      category: 'MEDIUM LIGHT',
      name: "BIG", // name: "SPENECER 110 SR ML",
      size: 186,  //size: 187,
      max_height: 191,
      min_height: 184,
      max_weight: 97,
      min_weight: 84,
      sidecut: '142-112-129',
      ski_level: ['newbie', 'intermediate', 'confirmed', 'pro-guide'],
      playground: ['all-mountain' , 'freeride' , 'freetouring'],
      snow : ['powder'],
      ski_style: ['fun-surf'],
      riding_speed: ['high-speed','moderate-speed'],
      turn : ['long'],
      src : 'https://ogso-mountain-essentials.com/app/ski-photos/26-27/big2026.webp',    //src : "https://ogso-mountain-essentials.com/app/ski-photos/SPENCER.png",
      link :'https://ogso-mountain-essentials.com/shop/free-ride-series/big-2/'     //link : 'https://ogso-mountain-essentials.com/product/spencer-110-sr-ml/'
  
  
    }
    , {
      family: 'FREE RIDE',
      category: 'MEDIUM LIGHT',
      name: "BIG", //name: "SPENECER 110 SR ML",
      size: 194,  //size: 195,
      max_height: 300,
      min_height: 192,
      max_weight: 999,
      min_weight: 98,
      sidecut: '145-114-132',
      ski_level: ['newbie', 'intermediate', 'confirmed', 'pro-guide'],
      playground: ['all-mountain' , 'freeride' , 'freetouring'],
      snow : ['powder'],
      ski_style: ['fun-surf'],
      riding_speed: ['high-speed','moderate-speed'],
      turn : ['long'],
      src : 'https://ogso-mountain-essentials.com/app/ski-photos/26-27/big2026.webp',  //src : "https://ogso-mountain-essentials.com/app/ski-photos/SPENCER.png",
      link :'https://ogso-mountain-essentials.com/shop/free-ride-series/big-2/'   //link : 'https://ogso-mountain-essentials.com/product/spencer-110-sr-ml/'
  
  
    }
    , 

    {
      family: 'ULTRA TOUR',
      category: 'ULTRA LIGHT',
      name: 'SWISS', //name: 'JAEGER 80 NEO UL',
      size: 162, // size: 156,
      max_height: 166,
      min_height: 0,
      max_weight: 55,
      min_weight: 0,  
      sidecut: '113-83-102',
      ski_level: ['intermediate', 'confirmed', 'pro-guide','newbie'],
      playground: ['touring-mountaineering','touring-race', 'touring-front-mountain','touring-back-mountain' ],
      snow : ['crud'],
      ski_style: ['technical-precision'],
      riding_speed: ['high-speed','moderate-speed'],
      turn : ['long'],
      src : 'https://ogso-mountain-essentials.com/app/ski-photos/26-27/swiss2026.webp',  // src : "https://ogso-mountain-essentials.com/app/ski-photos/JAEGER.png",
      link : 'https://ogso-mountain-essentials.com/shop/ultra-tour-series/swiss-2/'
  
    },
    {
      family: 'ULTRA TOUR',
      category: 'ULTRA LIGHT',
      name: 'SWISS', //name: 'JAEGER 80 NEO UL',
      size: 170, //size: 164,
      max_height: 174,
      min_height: 167,
      max_weight: 68,
      min_weight: 56,
      sidecut: '116-84-105',
      ski_level: ['intermediate', 'confirmed', 'pro-guide','newbie'],
      playground: ['touring-mountaineering','touring-race', 'touring-front-mountain','touring-back-mountain'  ],
      snow : ['crud'],
      ski_style: ['technical-precision'],
      riding_speed: ['high-speed','moderate-speed'],
      turn : ['long'],
      src : 'https://ogso-mountain-essentials.com/app/ski-photos/26-27/swiss2026.webp',  // src : "https://ogso-mountain-essentials.com/app/ski-photos/JAEGER.png",
      link : 'https://ogso-mountain-essentials.com/shop/ultra-tour-series/swiss-2/'
  
  
    }
    ,
    {
      family: 'ULTRA TOUR',
      category: 'ULTRA LIGHT',
      name: 'SWISS', //name: 'JAEGER 80 NEO UL',
      size: 178, //size: 172,
      max_height: 182,
      min_height: 175,
      max_weight: 91,
      min_weight: 69,
      sidecut: '118-85-107',
      ski_level: ['intermediate', 'confirmed', 'pro-guide','newbie'],
      playground: ['touring-mountaineering','touring-race', 'touring-front-mountain','touring-back-mountain'  ],
      snow : [ 'crud'],
      ski_style: ['technical-precision'],
      riding_speed: ['high-speed','moderate-speed'],
      turn : ['long'],
      src : 'https://ogso-mountain-essentials.com/app/ski-photos/26-27/swiss2026.webp', //src : "https://ogso-mountain-essentials.com/app/ski-photos/JAEGER.png",
      link : 'https://ogso-mountain-essentials.com/shop/ultra-tour-series/swiss-2/'
  
  
    }
    ,
   
    {
      family: 'ULTRA TOUR',
      category: 'ULTRA LIGHT',
      name: 'STS', //name: 'THOR 90 NEO UL',
      size: 170, //size: 160,
      max_height: 171,
      min_height: 0,
      max_weight: 59,
      min_weight: 0,
      sidecut: '127-94-115',
      ski_level: ['intermediate', 'confirmed', 'pro-guide','newbie'],
      playground: ['touring-mountaineering','touring-back-mountain','touring-front-mountain',],
      snow : ['hard'],
      ski_style: ['technical-precision'],
      riding_speed: ['high-speed','moderate-speed'],
      turn : ['long'],
      src : 'https://ogso-mountain-essentials.com/app/ski-photos/26-27/sts2026.webp', //src : "https://ogso-mountain-essentials.com/app/ski-photos/THOR.png",
      link : 'https://ogso-mountain-essentials.com/shop/ultra-tour-series/sts/'
  
  
    },
    {
      family: 'ULTRA TOUR',
      category: 'ULTRA LIGHT',
      name: 'STS', //name: 'THOR 90 NEO UL',
      size: 178, //size: 168,
      max_height: 179,
      min_height: 172,
      max_weight: 74,
      min_weight: 60,
      sidecut: '129-95-117',
      ski_level: ['intermediate', 'confirmed', 'pro-guide','newbie'],
      playground: ['touring-mountaineering','touring-back-mountain','touring-front-mountain'],

      snow : ['hard'],
      ski_style: ['technical-precision'],
      riding_speed: ['high-speed','moderate-speed'],
      turn : ['long'],
      src : 'https://ogso-mountain-essentials.com/app/ski-photos/26-27/sts2026.webp', //src : "https://ogso-mountain-essentials.com/app/ski-photos/THOR.png",
      link : 'https://ogso-mountain-essentials.com/shop/ultra-tour-series/sts/'
  
  
    }
    ,
   
    {
      family: 'ULTRA TOUR',
      category: 'ULTRA LIGHT',
      name: 'STS', //name: 'THOR 90 NEO UL',
      size: 186, //size: 184,
      max_height: 195,
      min_height: 188,
      max_weight: 95,
      min_weight: 88,
      sidecut: '131-96-119',
      ski_level: ['intermediate', 'confirmed', 'pro-guide','newbie'],
      playground: ['touring-mountaineering','touring-back-mountain','touring-front-mountain'],

      snow : ['hard'],
      ski_style: ['technical-precision'],
      riding_speed: ['high-speed','moderate-speed'],
      turn : ['long'],
      src : 'https://ogso-mountain-essentials.com/app/ski-photos/26-27/sts2026.webp', //src : "https://ogso-mountain-essentials.com/app/ski-photos/THOR.png",
      link : 'https://ogso-mountain-essentials.com/shop/ultra-tour-series/sts/'
  
  
    }
    ,
   
    {
      family: 'ULTRA TOUR',
      category: 'ULTRA LIGHT',
      name: 'GRAN DADDY', //name: 'COUTURIER 100 NEO UL',
      size: 178,
      max_height: 173,
      min_height: 0,
      max_weight: 59,
      min_weight: 0,  
      sidecut: '140-105-126',
      ski_level: ['intermediate', 'confirmed', 'pro-guide','newbie'],
      playground: ['touring-back-mountain','touring-mountaineering'],

      snow :  ['powder'],
      ski_style: ['technical-precision','fun-surf'],
      riding_speed: ['high-speed','moderate-speed'],
      turn : ['long'],
      src : 'https://ogso-mountain-essentials.com/app/ski-photos/26-27/gd2026.webp',  //src : "https://ogso-mountain-essentials.com/app/ski-photos/COUTURIER.png",
      link: 'https://ogso-mountain-essentials.com/shop/ultra-tour-series/gran-daddy/' //link : 'https://ogso-mountain-essentials.com/product/couturier-100-neo-ul/',
      //award : 'https://ogso-mountain-essentials.com/app/ski-photos/awards/b-e.png'
  
  
    },
    {
      family: 'ULTRA TOUR',
      category: 'ULTRA LIGHT',
      name: 'GRAN DADDY', //name: 'COUTURIER 100 NEO UL',
      size: 170,
      max_height: 181,
      min_height: 174,
      max_weight: 73,
      min_weight: 59,
      sidecut: '138-104-124',
      ski_level: ['intermediate', 'confirmed', 'pro-guide','newbie'],
      playground: ['touring-back-mountain','touring-mountaineering'],


      snow :  ['powder'],
      ski_style: ['technical-precision','fun-surf'],
      riding_speed: ['high-speed','moderate-speed'],
      turn : ['long'],
      src : 'https://ogso-mountain-essentials.com/app/ski-photos/26-27/gd2026.webp', //src : "https://ogso-mountain-essentials.com/app/ski-photos/COUTURIER.png",
      link: 'https://ogso-mountain-essentials.com/shop/ultra-tour-series/gran-daddy/'  //link : 'https://ogso-mountain-essentials.com/product/couturier-100-neo-ul/',
      //award : 'https://ogso-mountain-essentials.com/app/ski-photos/awards/b-e.png'
  
  
  
    }
    ,
    {
      family: 'ULTRA TOUR',
      category: 'ULTRA LIGHT',
      name: 'GRAN DADDY', //name: 'COUTURIER 100 NEO UL',
      size: 186,
      max_height: 189,
      min_height: 182,
      max_weight: 86,
      min_weight: 74,
      sidecut: '142-106-128',
      ski_level: ['intermediate', 'confirmed', 'pro-guide','newbie'],
      playground: ['touring-back-mountain','touring-mountaineering'],

      snow : ['powder'],
      ski_style: ['technical-precision','fun-surf'],
      riding_speed: ['high-speed','moderate-speed'],
      turn : ['long'],
      src : 'https://ogso-mountain-essentials.com/app/ski-photos/26-27/gd2026.webp', //src : "https://ogso-mountain-essentials.com/app/ski-photos/COUTURIER.png",
      link: 'https://ogso-mountain-essentials.com/shop/ultra-tour-series/gran-daddy/', //link : 'https://ogso-mountain-essentials.com/product/couturier-100-neo-ul/',
      //award : 'https://ogso-mountain-essentials.com/app/ski-photos/awards/b-e.png'
  
  
  
    }
    ,
   
    
     {
      family: 'SCURRY ODYSSEY',
      category: 'MEDIUM LIGHT',
      name: 'RYUMON', //name: 'DANAÏDES 90 NEO ML',
      size: 170, //size: 176,
      max_height: 178,
      min_height: 168,
      max_weight: 76,
      min_weight: 64,
      sidecut: '129-95-117',
      ski_level: ['intermediate', 'confirmed', 'pro-guide','newbie'],
      playground: ['playride','resort'],
      snow : ['powder'],
      ski_style: ['fun-surf','technical-precision'],
      riding_speed: ['high-speed','moderate-speed'],
      turn : ['short'],
      src : 'https://ogso-mountain-essentials.com/app/ski-photos/26-27/ryumon2026.webp',//src : "https://ogso-mountain-essentials.com/app/ski-photos/DANAIDES.png",
      link : 'https://ogso-mountain-essentials.com/shop/scurry-odyssey-series/ryumon-2/'
  
  
    },
    {
      family: 'SCURRY ODYSSEY',
      category: 'MEDIUM LIGHT',
      name: 'RYUMON', //name: 'DANAÏDES 90 NEO ML',
      size: 178, //size: 176,
      max_height: 178,
      min_height: 168,
      max_weight: 76,
      min_weight: 64,
      Sidecut: '131-96-119',
      ski_level: ['intermediate', 'confirmed', 'pro-guide','newbie'],
      playground: ['playride','resort'],
      snow : ['powder'],
      ski_style: ['fun-surf','technical-precision'],
      riding_speed: ['high-speed','moderate-speed'],
      turn : ['short'],
      src : 'https://ogso-mountain-essentials.com/app/ski-photos/26-27/ryumon2026.webp',//src : "https://ogso-mountain-essentials.com/app/ski-photos/DANAIDES.png",
      link : 'https://ogso-mountain-essentials.com/shop/scurry-odyssey-series/ryumon/'
  
  
    },
    {
      family: 'SCURRY ODYSSEY',
      category: 'MEDIUM LIGHT',
      name: 'RYUMON', //name: 'DANAÏDES 90 NEO ML',
      size: 186, //size: 176,
      max_height: 178,
      min_height: 168,
      max_weight: 76,
      min_weight: 64,
      sidecut: '133-97-121',
      ski_level: ['intermediate', 'confirmed', 'pro-guide','newbie'],
      playground: ['playride','resort'],
      snow : ['powder'],
      ski_style: ['fun-surf','technical-precision'],
      riding_speed: ['high-speed','moderate-speed'],
      turn : ['short'],
      src : 'https://ogso-mountain-essentials.com/app/ski-photos/26-27/ryumon2026.webp',//src : "https://ogso-mountain-essentials.com/app/ski-photos/DANAIDES.png",
      link : 'https://ogso-mountain-essentials.com/shop/scurry-odyssey-series/ryumon-2/'
  
  
    },
     {
      family: 'SCURRY ODYSSEY',
      category: 'MEDIUM LIGHT',
      name: 'KOIRYU', //name: 'DANAÏDES 90 NEO ML',
      size: 162, //size: 176,
      max_height: 178,
      min_height: 168,
      max_weight: 76,
      min_weight: 64,
      ski_level: ['intermediate', 'confirmed', 'pro-guide','newbie'],
      playground: ['playride','carving','resort'],
      snow : ['powder'],
      ski_style: ['fun-surf'],
      riding_speed: ['high-speed','moderate-speed'],
      turn : ['short'],
      src : 'https://ogso-mountain-essentials.com/app/ski-photos/26-27/koiryu2026.webp',//src : "https://ogso-mountain-essentials.com/app/ski-photos/DANAIDES.png",
      link : 'https://ogso-mountain-essentials.com/shop/scurry-odyssey-series/koiryu-2/'
  
  
    },
    {
      family: 'SCURRY ODYSSEY',
      category: 'MEDIUM LIGHT',
      name: 'KOIRYU', //name: 'DANAÏDES 90 NEO ML',
      size: 166, //size: 176,
      max_height: 178,
      min_height: 168,
      max_weight: 76,
      min_weight: 64,
      Sidecut: '131-87-117',
      ski_level: ['intermediate', 'confirmed', 'pro-guide','newbie'],
      playground: ['playride','carving','resort'],
      snow : ['powder'],
      ski_style: ['fun-surf'],
      riding_speed: ['high-speed','moderate-speed'],
      turn : ['short'],
      src : 'https://ogso-mountain-essentials.com/app/ski-photos/26-27/koiryu2026.webp',//src : "https://ogso-mountain-essentials.com/app/ski-photos/DANAIDES.png",
      link : 'https://ogso-mountain-essentials.com/shop/scurry-odyssey-series/koiryu-2/'
  
  
    },
    {
      family: 'SCURRY ODYSSEY',
      category: 'MEDIUM LIGHT',
      name: 'KOIRYU', //name: 'DANAÏDES 90 NEO ML',
      size: 182, //size: 176,
      max_height: 178,
      min_height: 168,
      max_weight: 76,
      min_weight: 64,
      sidecut: '135-89-121',
      ski_level: ['intermediate', 'confirmed', 'pro-guide','newbie'],
      playground: ['playride','carving','resort'],
      snow : ['powder'],
      ski_style: ['fun-surf'],
      riding_speed: ['high-speed','moderate-speed'],
      turn : ['short'],
      src : 'https://ogso-mountain-essentials.com/app/ski-photos/26-27/koiryu2026.webp',//src : "https://ogso-mountain-essentials.com/app/ski-photos/DANAIDES.png",
      link : 'https://ogso-mountain-essentials.com/shop/scurry-odyssey-series/koiryu-2/'
  
  
    },
     {
      family: 'CONTEMPORARY',
      category: 'MEDIUM LIGHT',
      name: 'CROIX DE FER', //name: 'DANAÏDES 90 NEO ML',
      size: 162, //size: 176,
      max_height: 178,
      min_height: 168,
      max_weight: 76,
      min_weight: 64,
      sidecut: '128-96-118',
      ski_level: ['intermediate', 'confirmed', 'pro-guide','newbie'],
      playground: ['all-mountain','resort','touring-back-mountain', 'touring-front-mountain','freetouring'],
      snow : ['crud'],
      ski_style: ['fun-surf','technical-precision'],
      riding_speed: ['high-speed','moderate-speed'],
      turn : ['long'],
      src : 'https://ogso-mountain-essentials.com/app/ski-photos/26-27/crf2026.webp',//src : "https://ogso-mountain-essentials.com/app/ski-photos/DANAIDES.png",
      link : 'https://ogso-mountain-essentials.com/shop/contemporary-series/croix-de-fer-2/'
  
  
    },
      {
      family: 'CONTEMPORARY',
      category: 'MEDIUM LIGHT',
      name: 'CROIX DE FER', //name: 'DANAÏDES 90 NEO ML',
      size: 172, //size: 176,
      max_height: 178,
      min_height: 168,
      max_weight: 76,
      min_weight: 64,
      sidecut: '130-97-120',
      ski_level: ['intermediate', 'confirmed', 'pro-guide','newbie'],
      playground: ['all-mountain','resort','touring-back-mountain', 'touring-front-mountain','freetouring'],
      snow : ['crud'],
      ski_style: ['fun-surf','technical-precision'],
      riding_speed: ['high-speed','moderate-speed'],
      turn : ['long'],
      src : 'https://ogso-mountain-essentials.com/app/ski-photos/26-27/crf2026.webp',//src : "https://ogso-mountain-essentials.com/app/ski-photos/DANAIDES.png",
      link : 'https://ogso-mountain-essentials.com/shop/contemporary-series/croix-de-fer-2/'
  
  
    },
      {
      family: 'CONTEMPORARY',
      category: 'MEDIUM LIGHT',
      name: 'CROIX DE FER', //name: 'DANAÏDES 90 NEO ML',
      size: 182, //size: 176,
      max_height: 178,
      min_height: 168,
      max_weight: 76,
      min_weight: 64,
      sidecut: '132-98-122',
      ski_level: ['intermediate', 'confirmed', 'pro-guide','newbie'],
      playground: ['all-mountain','resort','touring-back-mountain', 'touring-front-mountain','freetouring'],
      snow : ['crud'],
      ski_style: ['fun-surf','technical-precision'],
      riding_speed: ['high-speed','moderate-speed'],
      turn : ['long'],
      src : 'https://ogso-mountain-essentials.com/app/ski-photos/26-27/crf2026.webp',//src : "https://ogso-mountain-essentials.com/app/ski-photos/DANAIDES.png",
      link : 'https://ogso-mountain-essentials.com/shop/contemporary-series/croix-de-fer-2/'
  
  
    },
    {
      family: 'ZERO SOPHISTO',
      category: 'MEDIUM LIGHT',
      name: 'CORBET ZERO ', //name: 'DANAÏDES 90 NEO ML',
      size: 170, //size: 176,
      max_height: 178,
      min_height: 168,
      max_weight: 76,
      min_weight: 64,
      sidecut: '136-108-123',
      ski_level: ['intermediate', 'confirmed', 'pro-guide','newbie'],
      playground: ['touring-back-mountain','all-mountain','freetouring'],
         snow : ['powder','crud'],
       ski_style: ['fun-surf'],
      riding_speed: ['moderate-speed'],
      turn : ['short'],
      src : 'https://ogso-mountain-essentials.com/app/ski-photos/26-27/corbets2026.webp',//src : "https://ogso-mountain-essentials.com/app/ski-photos/DANAIDES.png",
      link : 'https://ogso-mountain-essentials.com/shop/zero-sophisto-series/corbets/'
  
  
    },{
      family: 'ZERO SOPHISTO',
      category: 'MEDIUM LIGHT',
      name: 'CORBET ZERO ', //name: 'DANAÏDES 90 NEO ML',
      size: 178, //size: 176,
      max_height: 178,
      min_height: 168,
      max_weight: 76,
      min_weight: 64,
      sidecut: '139-110-126',
      ski_level: ['intermediate', 'confirmed', 'pro-guide','newbie'],
      playground: ['touring-back-mountain','all-mountain','freetouring'],
      snow : ['powder','crud'],
      ski_style: ['fun-surf'],
      riding_speed: ['moderate-speed'],
      turn : ['short'],
      src : 'https://ogso-mountain-essentials.com/app/ski-photos/26-27/corbets2026.webp',//src : "https://ogso-mountain-essentials.com/app/ski-photos/DANAIDES.png",
      link : 'https://ogso-mountain-essentials.com/shop/zero-sophisto-series/corbets/'
  
  
    },{
      family: 'ZERO SOPHISTO',
      category: 'MEDIUM LIGHT',
      name: 'CORBET ZERO ', //name: 'DANAÏDES 90 NEO ML',
      size: 186, //size: 176,
      max_height: 178,
      min_height: 168,
      max_weight: 76,
      min_weight: 64,
      Sidecut: '142-112-129',
      ski_level: ['intermediate', 'confirmed', 'pro-guide','newbie'],
      playground: ['touring-back-mountain','all-mountain','freetouring'],
      snow : ['powder','crud'],
       ski_style: ['fun-surf'],
      riding_speed: ['moderate-speed'],
      turn : ['short'],
      src : 'https://ogso-mountain-essentials.com/app/ski-photos/26-27/corbets2026.webp',//src : "https://ogso-mountain-essentials.com/app/ski-photos/DANAIDES.png",
      link : 'https://ogso-mountain-essentials.com/shop/zero-sophisto-series/corbets//'
  
  
    },{
      family: 'ZERO SOPHISTO',
      category: 'MEDIUM LIGHT',
      name: 'CORBET ZERO ', //name: 'DANAÏDES 90 NEO ML',
      size: 194, //size: 176,
      max_height: 178,
      min_height: 168,
      max_weight: 76,
      min_weight: 64,
      sidecut: '145-114-132',
      ski_level: ['intermediate', 'confirmed', 'pro-guide','newbie'],
      playground: ['touring-back-mountain','all-mountain','freetouring'],
      snow : ['powder','crud'],
      ski_style: ['fun-surf'],
      riding_speed: ['moderate-speed'],
      turn : ['short'],
      src : 'https://ogso-mountain-essentials.com/app/ski-photos/26-27/corbets2026.webp',//src : "https://ogso-mountain-essentials.com/app/ski-photos/DANAIDES.png",
      link : 'https://ogso-mountain-essentials.com/shop/zero-sophisto-series/corbets/'
  
  
    },{
      family: 'ZERO SOPHISTO',
      category: 'MEDIUM LIGHT',
      name: 'SCHWARZTOR ', //name: 'DANAÏDES 90 NEO ML',
      size: 170, //size: 176,
      max_height: 178,
      min_height: 168,
      max_weight: 76,
      min_weight: 64,
      sidecut: '133-102-119',
      ski_level: ['intermediate', 'confirmed', 'pro-guide','newbie'],
      playground: ['all-mountain','touring-back-mountain','touring mountaineering'],
      snow : ['crud', 'powder'],
      ski_style: ['technical-precision'],
      riding_speed: ['moderate-speed'],
      turn : ['short'],
      src : 'https://ogso-mountain-essentials.com/app/ski-photos/26-27/schwarztor2026.webp',//src : "https://ogso-mountain-essentials.com/app/ski-photos/DANAIDES.png",
      link : 'https://ogso-mountain-essentials.com/shop/zero-sophisto-series/schwarztor/'
  
  
    },
    {
      family: 'ZERO SOPHISTO',
      category: 'MEDIUM LIGHT',
      name: 'SCHWARZTOR ', //name: 'DANAÏDES 90 NEO ML',
      size: 178, //size: 176,
      max_height: 178,
      min_height: 168,
      max_weight: 76,
      min_weight: 64,
      sidecut: '136-104-122',
      ski_level: ['intermediate', 'confirmed', 'pro-guide','newbie'],
      playground: ['all-mountain','touring-back-mountain','touring mountaineering'],
      snow : ['crud', 'powder'],
      ski_style: ['technical-precision'],
      riding_speed: ['moderate-speed'],
      turn : ['short'],
      src : 'https://ogso-mountain-essentials.com/app/ski-photos/26-27/schwarztor2026.webp',//src : "https://ogso-mountain-essentials.com/app/ski-photos/DANAIDES.png",
      link : 'https://ogso-mountain-essentials.com/shop/zero-sophisto-series/schwarztor/'
  
  
    },
    {
      family: 'ZERO SOPHISTO',
      category: 'MEDIUM LIGHT',
      name: 'SCHWARZTOR ', //name: 'DANAÏDES 90 NEO ML',
      size: 186, //size: 176,
      max_height: 178,
      min_height: 168,
      max_weight: 76,
      min_weight: 64,
      sidecut: '139-106-125',
      ski_level: ['intermediate', 'confirmed', 'pro-guide','newbie'],
       playground: ['all-mountain','touring-back-mountain','touring mountaineering'],
      snow : ['crud', 'powder'],
      ski_style: ['technical-precision'],
      riding_speed: ['moderate-speed'],
      turn : ['short'],
      src : 'https://ogso-mountain-essentials.com/app/ski-photos/26-27/schwarztor2026.webp',//src : "https://ogso-mountain-essentials.com/app/ski-photos/DANAIDES.png",
      link : 'https://ogso-mountain-essentials.com/shop/zero-sophisto-series/schwarztor/'
  
  
    },
     {
      family: 'ZERO SOPHISTO',
      category: 'MEDIUM LIGHT',
      name: 'SCHWARZTOR ', //name: 'DANAÏDES 90 NEO ML',
      size: 194, //size: 176,
      max_height: 178,
      min_height: 168,
      max_weight: 76,
      min_weight: 64,
      sidecut: '142-108-128',
      ski_level: ['intermediate', 'confirmed', 'pro-guide','newbie'],
       playground: ['all-mountain','touring-back-mountain','touring mountaineering'],
      snow : ['crud', 'powder'],
      ski_style: ['technical-precision'],
      riding_speed: ['moderate-speed'],
      turn : ['short'],
      src : 'https://ogso-mountain-essentials.com/app/ski-photos/26-27/schwarztor2026.webp',//src : "https://ogso-mountain-essentials.com/app/ski-photos/DANAIDES.png",
      link : 'https://ogso-mountain-essentials.com/shop/zero-sophisto-series/schwarztor/'
  
  
    },
    {
      family: 'SCURRY ODYSSEY',
      category: 'MEDIUM LIGHT',
      name: 'RYUJIN', //name: 'DANAÏDES 90 NEO ML',
      size: 176, //size: 176,
      max_height: 178,
      min_height: 168,
      max_weight: 76,
      min_weight: 64,
      Sidecut: '134-102-122',
      ski_level: ['intermediate', 'confirmed', 'pro-guide','newbie'],
      playground: ['all-mountain','freeride-carving','playride','resort','resort'],
      snow : ['crud', 'powder', 'hard'],
      ski_style: ['fun-surf'],
      riding_speed: ['high-speed'],
      turn : ['short'],
      src : 'https://ogso-mountain-essentials.com/app/ski-photos/26-27/ryujin2026.webp',//src : "https://ogso-mountain-essentials.com/app/ski-photos/DANAIDES.png",
      link : 'https://ogso-mountain-essentials.com/shop/scurry-odyssey-series/ryujin/'
  
  
    },
     {
      family: 'SCURRY ODYSSEY',
      category: 'MEDIUM LIGHT',
      name: 'RYUJIN', //name: 'DANAÏDES 90 NEO ML',
      size: 184, //size: 176,
      max_height: 178,
      min_height: 168,
      max_weight: 76,
      min_weight: 64,
      sidecut: '136-103-124',
      ski_level: ['intermediate', 'confirmed', 'pro-guide','newbie'],
      playground: ['all-mountain','freeride-carving','playride','resort','resort'],
      snow : ['crud', 'powder', 'hard'],
      ski_style: ['fun-surf'],
      riding_speed: ['high-speed'],
      turn : ['short'],
      src : 'https://ogso-mountain-essentials.com/app/ski-photos/26-27/ryujin2026.webp',//src : "https://ogso-mountain-essentials.com/app/ski-photos/DANAIDES.png",
      link : 'https://ogso-mountain-essentials.com/shop/scurry-odyssey-series/ryujin/'
  
  
    },
     {
      family: 'SCURRY ODYSSEY',
      category: 'MEDIUM LIGHT',
      name: 'RYUJIN', //name: 'DANAÏDES 90 NEO ML',
      size: 192, //size: 176,
      max_height: 178,
      min_height: 168,
      max_weight: 76,
      min_weight: 64,
      sidecut: '138-104-126',
      ski_level: ['intermediate', 'confirmed', 'pro-guide','newbie'],
      playground: ['all-mountain','freeride-carving','playride','resort','resort'],
      snow : ['crud', 'powder', 'hard'],
      ski_style: ['fun-surf'],
      riding_speed: ['high-speed'],
      turn : ['short'],
      src : 'https://ogso-mountain-essentials.com/app/ski-photos/26-27/ryujin2026.webp',//src : "https://ogso-mountain-essentials.com/app/ski-photos/DANAIDES.png",
      link : 'https://ogso-mountain-essentials.com/shop/scurry-odyssey-series/ryujin/'
  
  
    },
    {
      family: 'CONTEMPORARY',
      category: 'MEDIUM LIGHT',
      name: 'BARBEY ', //name: 'DANAÏDES 90 NEO ML',
      size: 172, //size: 176,
      max_height: 178,
      min_height: 168,
      max_weight: 76,
      min_weight: 64,
      sidecut: '137-107-127',
      ski_level: ['intermediate', 'confirmed', 'pro-guide','newbie'],
      playground: ['all-mountain','freeride-carving','playride' , 'resort'],
      snow : ['crud', 'hard'],
      ski_style: ['technical-precision'],
      riding_speed: ['high-speed'],
      turn : ['long'],
      src : 'https://ogso-mountain-essentials.com/app/ski-photos/26-27/barbey2026.webp',//src : "https://ogso-mountain-essentials.com/app/ski-photos/DANAIDES.png",
      link : 'https://ogso-mountain-essentials.com/shop/contemporary-series/barbey/'
  
  
    },
    {
      family: 'CONTEMPORARY',
      category: 'MEDIUM LIGHT',
      name: 'BARBEY ', //name: 'DANAÏDES 90 NEO ML',
      size: 182, //size: 176,
      max_height: 178,
      min_height: 168,
      max_weight: 76,
      min_weight: 64,
      sidecut: '139-108-129',
      ski_level: ['intermediate', 'confirmed', 'pro-guide','newbie'],
      playground: ['all-mountain','freeride-carving','playride' , 'resort'],
      snow : ['crud', 'hard'],
      ski_style: ['technical-precision'],
      riding_speed: ['high-speed'],
      turn : ['long'],
      src : 'https://ogso-mountain-essentials.com/app/ski-photos/26-27/barbey2026.webp',//src : "https://ogso-mountain-essentials.com/app/ski-photos/DANAIDES.png",
      link : 'https://ogso-mountain-essentials.com/shop/contemporary-series/barbey/'
  
  
    },
     {
      family: 'CONTEMPORARY',
      category: 'MEDIUM LIGHT',
      name: 'BARBEY ', //name: 'DANAÏDES 90 NEO ML',
      size: 192, //size: 176,
      max_height: 178,
      min_height: 168,
      max_weight: 76,
      min_weight: 64,
      sidecut: '141-109-131',
      ski_level: ['intermediate', 'confirmed', 'pro-guide','newbie'],
      playground: ['all-mountain','freeride-carving','playride' , 'resort'],
      snow : ['crud', 'hard'],
      ski_style: ['technical-precision'],
      riding_speed: ['high-speed'],
      turn : ['long'],
      src : 'https://ogso-mountain-essentials.com/app/ski-photos/26-27/barbey2026.webp',//src : "https://ogso-mountain-essentials.com/app/ski-photos/DANAIDES.png",
      link : 'https://ogso-mountain-essentials.com/shop/contemporary-series/barbey/'
      
  
  
    },
    
    // {
    //   family: 'NEOTERIC CAMBER',
    //   category: 'MEDIUM LIGHT',
    //   name: 'KRUMPE 80 NEO ML',
    //   size: 156,
    //   max_height: 166,
    //   min_height: 0,
    //   max_weight: 56,
    //   min_weight: 0,
    //   ski_level: ['intermediate', 'confirmed', 'pro-guide'],
    //   playground: ['all-mountain' , 'freeride'],
    //   snow : ['powder','hard'],
    //   ski_style: ['technical-precision'],
    //   riding_speed: ['high-speed'],
    //   turn : ['long'],
    //   src : "https://ogso-mountain-essentials.com/app/ski-photos/KRUMPE.png",
    //   link : 'https://ogso-mountain-essentials.com/product/krumpe-80-neo-ml/'
  
  
    // },
    // {
    //   family: 'NEOTERIC CAMBER',
    //   category: 'MEDIUM LIGHT',
    //   name: 'KRUMPE 80 NEO ML',
    //   size: 164,
    //   max_height: 174,
    //   min_height: 167,
    //   max_weight: 74,
    //   min_weight: 61,
    //   ski_level: ['intermediate', 'confirmed', 'pro-guide'],
    //   playground: ['all-mountain' , 'freeride'],
    //   snow : ['powder','hard'],
    //   ski_style: ['technical-precision'],
    //   riding_speed: ['high-speed'],
    //   turn : ['long'],
    //   src : "https://ogso-mountain-essentials.com/app/ski-photos/KRUMPE.png",
    //   link : 'https://ogso-mountain-essentials.com/product/krumpe-80-neo-ml/'
  
  
    // }
    // ,
    // {
    //   family: 'NEOTERIC CAMBER',
    //   category: 'MEDIUM LIGHT',
    //   name: 'KRUMPE 80 NEO ML',
    //   size: 172,
    //   max_height: 182,
    //   min_height: 175,
    //   max_weight: 81,
    //   min_weight: 69,
    //   ski_level: ['intermediate', 'confirmed', 'pro-guide'],
    //   playground: ['all-mountain' , 'freeride'],
    //   snow : ['powder','hard'],
    //   ski_style: ['technical-precision'],
    //   riding_speed: ['high-speed'],
    //   turn : ['long'],
    //   src : "https://ogso-mountain-essentials.com/app/ski-photos/KRUMPE.png",
    //   link : 'https://ogso-mountain-essentials.com/product/krumpe-80-neo-ml/'
  
  
    // }
    // ,
    // {
    //   family: 'NEOTERIC CAMBER',
    //   category: 'MEDIUM LIGHT',
    //   name: 'KRUMPE 80 NEO ML',
    //   size: 180,
    //   max_height: 190,
    //   min_height: 183,
    //   max_weight: 95,
    //   min_weight: 88,
    //   ski_level: ['intermediate', 'confirmed', 'pro-guide'],
    //   playground: ['all-mountain' , 'freeride'],
    //   snow : ['powder','hard'],
    //   ski_style: ['technical-precision'],
    //   riding_speed: ['high-speed'],
    //   turn : ['long'],
    //   src : "https://ogso-mountain-essentials.com/app/ski-photos/KRUMPE.png",
    //   link : 'https://ogso-mountain-essentials.com/product/krumpe-80-neo-ml/'
  
  
    // }
    // ,
    // {
    //   family: 'NEOTERIC CAMBER',
    //   category: 'MEDIUM LIGHT',
    //   name: 'KRUMPE 80 NEO ML',
    //   size: 188,
    //   max_height: 300,
    //   min_height: 191,
    //   max_weight: 999,
    //   min_weight: 96,
    //   ski_level: ['intermediate', 'confirmed', 'pro-guide'],
    //   playground: ['all-mountain' , 'freeride'],
    //   snow : ['powder','hard'],
    //   ski_style: ['technical-precision'],
    //   riding_speed: ['high-speed'],
    //   turn : ['long'],
    //   src : "https://ogso-mountain-essentials.com/app/ski-photos/KRUMPE.png",
    //   link : 'https://ogso-mountain-essentials.com/product/krumpe-80-neo-ml/'
  
  
    // },
    // {
    //   family: 'NEOTERIC CAMBER',
    //   category: 'MEDIUM LIGHT',
    //   name: 'ANGELIQUE', //name: 'DANAÏDES 90 NEO ML',
    //   size: 162, //size: 160,
    //   max_height: 171,
    //   min_height: 0,
    //   max_weight: 60,
    //   min_weight: 0,
    //   ski_level: ['intermediate', 'confirmed', 'pro-guide'],
    //   playground: ['all-mountain' , 'freeride'],
    //   snow : ['powder','hard'],
    //   ski_style: ['technical-precision'],
    //   riding_speed: ['high-speed'],
    //   turn : ['long'],
    //   src : 'https://ogso-mountain-essentials.com/app/ski-photos/ANGELIQUE.webp', //src : "https://ogso-mountain-essentials.com/app/ski-photos/DANAIDES.png",
    //   link : 'https://ogso-mountain-essentials.com/shop/utopic-camber/angelique/'
  
    // },
    // {
    //   family: 'NEOTERIC CAMBER',
    //   category: 'MEDIUM LIGHT',
    //   name: 'ANGELIQUE', //name: 'DANAÏDES 90 NEO ML',
    //   size: 170, //size: 168,
    //   max_height: 179,
    //   min_height: 172,
    //   max_weight: 74,
    //   min_weight: 61,
    //   ski_level: ['intermediate', 'confirmed', 'pro-guide'],
    //   playground: ['all-mountain' , 'freeride'],
    //   snow : ['powder','hard'],
    //   ski_style: ['technical-precision'],
    //   riding_speed: ['high-speed'],
    //   turn : ['long'],
    //   src : 'https://ogso-mountain-essentials.com/app/ski-photos/ANGELIQUE.webp', //src : "https://ogso-mountain-essentials.com/app/ski-photos/DANAIDES.png",
    //   link : 'https://ogso-mountain-essentials.com/shop/utopic-camber/angelique/'
  
    // }
    // ,
    // {
    //   family: 'NEOTERIC CAMBER',
    //   category: 'MEDIUM LIGHT',
    //   name: 'ANGELIQUE', //name: 'DANAÏDES 90 NEO ML',
    //   size: 178, //size: 176,
    //   max_height: 187,
    //   min_height: 180,
    //   max_weight: 87,
    //   min_weight: 75,
    //   ski_level: ['intermediate', 'confirmed', 'pro-guide'],
    //   playground: ['all-mountain' , 'freeride'],
    //   snow : ['powder','hard'],
    //   ski_style: ['technical-precision'],
    //   riding_speed: ['high-speed'],
    //   turn : ['long'],
    //   src : 'assets/images/ski/ANGELIQUE.png', //src : "https://ogso-mountain-essentials.com/app/ski-photos/DANAIDES.png",
    //   //link : 'https://ogso-mountain-essentials.com/product/danaides-90-neo-ml/'
  
  
    // }

    // {
    //   family: 'NEOTERIC CAMBER',
    //   category: 'MEDIUM LIGHT',
    //   name: 'ANGELIQUE', //name: 'DANAÏDES 90 NEO ML',
    //   size: 178, //size: 176,
    //   max_height: 178,
    //   min_height: 168,
    //   max_weight: 76,
    //   min_weight: 64,
    //   ski_level: ['intermediate', 'confirmed', 'pro-guide','newbie'],
    //   playground: ['touring-front-mountain'],
    //   snow : ['crud','hard'],
    //   ski_style: ['fun-surf'],
    //   riding_speed: ['high-speed'],
    //   turn : ['short'],
    //   src : 'https://ogso-mountain-essentials.com/app/ski-photos/ANGELIQUE.webp',//src : "https://ogso-mountain-essentials.com/app/ski-photos/DANAIDES.png",
    //   link : 'https://ogso-mountain-essentials.com/shop/utopic-camber/angelique/'
  
  
    // }
    // ,
    // {
    //   family: 'NEOTERIC CAMBER',
    //   category: 'MEDIUM LIGHT',
    //   name: 'ANGELIQUE', //name: 'DANAÏDES 90 NEO ML',
    //   size: 186, //size: 184,
    //   max_height: 195,
    //   min_height: 188,
    //   max_weight: 95,
    //   min_weight: 88,
    //   ski_level: ['intermediate', 'confirmed', 'pro-guide'],
    //   playground: ['all-mountain' , 'freeride'],
    //   snow : ['powder','hard'],
    //   ski_style: ['technical-precision'],
    //   riding_speed: ['high-speed'],
    //   turn : ['long'],
    //   src : 'https://ogso-mountain-essentials.com/app/ski-photos/ANGELIQUE.webp', //src : "https://ogso-mountain-essentials.com/app/ski-photos/DANAIDES.png",
    //   link : 'https://ogso-mountain-essentials.com/shop/utopic-camber/angelique/'
  
  
    // }
    // ,
    // {
    //   family: 'NEOTERIC CAMBER',
    //   category: 'MEDIUM LIGHT',
    //   name: 'ANGELIQUE', //name: 'DANAÏDES 90 NEO ML',
    //   size: 194, //size: 192,
    //   max_height: 999,
    //   min_height: 198,
    //   max_weight: 999,
    //   min_weight: 96,
    //   ski_level: ['intermediate', 'confirmed', 'pro-guide'],
    //   playground: ['all-mountain' , 'freeride'],
    //   snow : ['powder','hard'],
    //   ski_style: ['technical-precision'],
    //   riding_speed: ['high-speed'],
    //   turn : ['long'],
    //   src : 'https://ogso-mountain-essentials.com/app/ski-photos/ANGELIQUE.webp', //src : "https://ogso-mountain-essentials.com/app/ski-photos/DANAIDES.png",
    //   link : 'https://ogso-mountain-essentials.com/shop/utopic-camber/angelique/'
  
  
    // },
    
    // {
    //   family: 'NEOTERIC CAMBER',
    //   category: 'MEDIUM LIGHT',
    //   name: 'LA VOUTE', //name: 'MARINELLI 100 NEO ML',
    //   size: 162,
    //   max_height: 173,
    //   min_height: 0,
    //   max_weight: 57,
    //   min_weight: 0,
    //   ski_level: ['intermediate', 'confirmed', 'pro-guide'],
    //   playground: ['all-mountain' , 'freeride'],
    //   snow : ['powder','hard'],
    //   ski_style: ['technical-precision'],
    //   riding_speed: ['high-speed'],
    //   turn : ['long'],
    //   src : 'https://ogso-mountain-essentials.com/app/ski-photos/LA_VOUTE.webp', //src : "https://ogso-mountain-essentials.com/app/ski-photos/MARINELLI.png",
    //   link: 'https://ogso-mountain-essentials.com/shop/utopic-camber/ogso-la-voute-cruise-tour/', //link : 'https://ogso-mountain-essentials.com/product/marinelli-100-neo-ml/'
  
  
    // },
    // {
    //   family: 'NEOTERIC CAMBER',
    //   category: 'MEDIUM LIGHT',
    //   name: 'LA VOUTE', //name: 'MARINELLI 100 NEO ML',
    //   size: 170,
    //   max_height: 181,
    //   min_height: 174,
    //   max_weight: 73,
    //   min_weight: 58,
    //   ski_level: ['intermediate', 'confirmed', 'pro-guide'],
    //   playground: ['all-mountain' , 'freeride'],
    //   snow : ['powder','hard'],
    //   ski_style: ['technical-precision'],
    //   riding_speed: ['high-speed'],
    //   turn : ['long'],
    //   src : 'https://ogso-mountain-essentials.com/app/ski-photos/LA_VOUTE.webp', //src : "https://ogso-mountain-essentials.com/app/ski-photos/MARINELLI.png",
    //   link: 'https://ogso-mountain-essentials.com/shop/utopic-camber/ogso-la-voute-cruise-tour/', //link : 'https://ogso-mountain-essentials.com/product/marinelli-100-neo-ml/'
  
  
    // }
    // ,
    // {
    //   family: 'NEOTERIC CAMBER',
    //   category: 'MEDIUM LIGHT',
    //   name: 'LA VOUTE',  //name: 'MARINELLI 100 NEO ML',
    //   size: 178,
    //   max_height: 189,
    //   min_height: 180,
    //   max_weight: 87,
    //   min_weight: 74,
    //   ski_level: ['intermediate', 'confirmed', 'pro-guide'],
    //   playground: ['all-mountain' , 'freeride'],
    //   snow : ['powder','hard'],
    //   ski_style: ['technical-precision'],
    //   riding_speed: ['high-speed'],
    //   turn : ['long'],
    //   src : 'https://ogso-mountain-essentials.com/app/ski-photos/LA_VOUTE.webp', //src : "https://ogso-mountain-essentials.com/app/ski-photos/MARINELLI.png",
    //   link: 'https://ogso-mountain-essentials.com/shop/utopic-camber/ogso-la-voute-cruise-tour/', //link : 'https://ogso-mountain-essentials.com/product/marinelli-100-neo-ml/'
  
  
    // }
    // ,
    // {
    //   family: 'NEOTERIC CAMBER',
    //   category: 'MEDIUM LIGHT',
    //   name: 'LA VOUTE', //name: 'MARINELLI 100 NEO ML',
    //   size: 186,
    //   max_height: 197,
    //   min_height: 190,
    //   max_weight: 95,
    //   min_weight: 88,
    //   ski_level: ['intermediate', 'confirmed', 'pro-guide'],
    //   playground: ['all-mountain' , 'freeride'],
    //   snow : ['powder','hard'],
    //   ski_style: ['technical-precision'],
    //   riding_speed: ['high-speed'],
    //   turn : ['long'],
    //   src : 'https://ogso-mountain-essentials.com/app/ski-photos/LA_VOUTE.webp',  //src : "https://ogso-mountain-essentials.com/app/ski-photos/MARINELLI.png",
    //   link: 'https://ogso-mountain-essentials.com/shop/utopic-camber/ogso-la-voute-cruise-tour/', //link : 'https://ogso-mountain-essentials.com/product/marinelli-100-neo-ml/'
  
  
    // }
    // ,
    // {
    //   family: 'NEOTERIC CAMBER',
    //   category: 'MEDIUM LIGHT',
    //   name: 'LA VOUTE', //name: 'MARINELLI 100 NEO ML',
    //   size: 194,
    //   max_height: 300,
    //   min_height: 198,
    //   max_weight: 999,
    //   min_weight: 96,
    //   ski_level: ['intermediate', 'confirmed', 'pro-guide'],
    //   playground: ['all-mountain' , 'freeride'],
    //   snow : ['powder','hard'],
    //   ski_style: ['technical-precision'],
    //   riding_speed: ['high-speed'],
    //   turn : ['long'],
    //   src : 'https://ogso-mountain-essentials.com/app/ski-photos/LA_VOUTE.webp', //src : "https://ogso-mountain-essentials.com/app/ski-photos/MARINELLI.png",
    //   link: 'https://ogso-mountain-essentials.com/shop/utopic-camber/ogso-la-voute-cruise-tour/',  //link : 'https://ogso-mountain-essentials.com/product/marinelli-100-neo-ml/'
  
  
    // },
    // {
    //   family: 'NEOTERIC CAMBER',
    //   category: 'MEDUIM LIGHT',
    //   name: "MALLORY 110 NEO ML",
    //   size: 171,
    //   max_height: 181,
    //   min_height: 0,
    //   max_weight: 70,
    //   min_weight: 0,
    //   ski_level: ['intermediate', 'confirmed', 'pro-guide'],
    //   playground: ['all-mountain' , 'freeride'],
    //   snow : ['powder','hard'],
    //   ski_style: ['technical-precision'],
    //   riding_speed: ['high-speed'],
    //   turn : ['long'],
    //   src : "https://ogso-mountain-essentials.com/app/ski-photos/MALLORY.png",
    //   link : 'https://ogso-mountain-essentials.com/product/mallory-110-neo-ml/'
  
    // }
    // , {
    //   family: 'NEOTERIC CAMBER',
    //   category: 'MEDUIM LIGHT',
    //   name: "MALLORY 110 NEO ML",
    //   size: 179,
    //   max_height: 189,
    //   min_height: 182,
    //   max_weight: 83,
    //   min_weight: 71,
    //   ski_level: ['intermediate', 'confirmed', 'pro-guide'],
    //   playground: ['all-mountain' , 'freeride'],
    //   snow : ['powder','hard'],
    //   ski_style: ['technical-precision'],
    //   riding_speed: ['high-speed'],
    //   turn : ['long'],
    //   src : "https://ogso-mountain-essentials.com/app/ski-photos/MALLORY.png",
    //   link : 'https://ogso-mountain-essentials.com/product/mallory-110-neo-ml/'
  
  
    // }
    // , {
    //   family: 'NEOTERIC CAMBER',
    //   category: 'MEDUIM LIGHT',
    //   name: "MALLORY 110 NEO ML",
    //   size: 187,
    //   max_height: 197,
    //   min_height: 190,
    //   max_weight: 97,
    //   min_weight: 84,
    //   ski_level: ['intermediate', 'confirmed', 'pro-guide'],
    //   playground: ['all-mountain' , 'freeride'],
    //   snow : ['powder','hard'],
    //   ski_style: ['technical-precision'],
    //   riding_speed: ['high-speed'],
    //   turn : ['long'],
    //   src : "https://ogso-mountain-essentials.com/app/ski-photos/MALLORY.png",
    //   link : 'https://ogso-mountain-essentials.com/product/mallory-110-neo-ml/'
  
  
    // }
    // , {
    //   family: 'NEOTERIC CAMBER',
    //   category: 'MEDUIM LIGHT',
    //   name: "MALLORY 110 NEO ML",
    //   size: 195,
    //   max_height: 999,
    //   min_height: 198,
    //   max_weight: 999,
    //   min_weight: 98,
    //   ski_level: ['intermediate', 'confirmed', 'pro-guide'],
    //   playground: ['all-mountain' , 'freeride'],
    //   snow : ['powder','hard'],
    //   ski_style: ['technical-precision'],
    //   riding_speed: ['high-speed'],
    //   turn : ['long'],
    //   src : "https://ogso-mountain-essentials.com/app/ski-photos/MALLORY.png",
    //   link : 'https://ogso-mountain-essentials.com/product/mallory-110-neo-ml/'
  
  
    // }
  
  ];
  
