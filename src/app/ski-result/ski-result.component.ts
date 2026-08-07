import { Component, OnInit, OnDestroy, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import {
  DataServiceService,
  SkiProfile
} from '../data-service.service';

import {
  getDatabase,
  ref,
  set
} from 'firebase/database';

import { skis } from 'src/assets/jsons/skis';
import { HttpClient } from '@angular/common/http';
import { jsPDF } from 'jspdf';


/*==========================================================
SKI INTERFACE
==========================================================*/

export interface Ski {

  family?: string;
  category?: string;

  name: string;
  size: number;

  min_height?: number;
  max_height?: number;

  min_weight?: number;
  max_weight?: number;

  ski_level?: string[] | string;
  playground?: string[] | string;
  snow?: string[] | string;
  ski_style?: string[] | string;
  riding_speed?: string[] | string;
  turn?: string[] | string;

  src: string;
  link?: string;

  /* NOUVEAU */
  sidecut?: string;

  score?: number;
  difference_weight?: number;
  weight?: number;
  realScore?: number;
}


/*==========================================================
SKI MODEL
==========================================================*/

interface SkiModel {

  name: string;

  availableSizes: number[];

  family?: string;
}


/*==========================================================
COMPONENT
==========================================================*/

@Component({

  selector: 'app-ski-result',

  templateUrl: './ski-result.component.html',

  styleUrls: ['./ski-result.component.scss'],

  standalone: false

})

export class SkiResultComponent implements OnInit, OnDestroy {


  /*========================================================
  USER PROFILE
  ========================================================*/

  height: number = 179;

  weight: number = 83;

  terrainType: string =
    'touring-back-mountain';

  typeSnow: string =
    'powder';

  skiStyleFun: string =
    'fun-surf';

  stable: string =
    'high-speed';

  turns: string =
    'long';

  skiLevel: string =
    'pro-guide';


  /*========================================================
  TEMPLATE GETTERS
  ========================================================*/

  get terrain_type(): string {

    return this.terrainType;
  }


  get type_snow(): string {

    return this.typeSnow;
  }


  get ski_level_fun(): string {

    return this.skiStyleFun;
  }


  get ski_speed(): string {

    return this.stable;
  }


  get ski_turns(): string {

    return this.turns;
  }


  get ski_level(): string {

    return this.skiLevel;
  }


  /*========================================================
  OPTIONS
  ========================================================*/

  terrainOptions: string[] = [];

  snowOptions: string[] = [];

  speedOptions: string[] = [];

  turnOptions: string[] = [];

  funOptions: string[] = [];

  levelOptions: string[] = [];


  /*========================================================
  RESULTS
  ========================================================*/

  resultat: Ski[] = [];

  bn: boolean = false;

  animationKey: number = 0;

  isLoading: boolean = false;

  isGeneratingPDF: boolean = false;

  pdfGenerated: boolean = false;


  /*========================================================
  INTERNAL
  ========================================================*/

  private updateTimer: any = null;

  private profileSubscription:
    Subscription | null = null;

  private skiModels: SkiModel[] = [];


  /*========================================================
  ICONS
  ========================================================*/

  terrainIcons: {
    [key: string]: string
  } = {

    'touring-front-mountain': '🏔️',

    'touring-back-mountain': '⛰️',

    'touring-mountaineering': '🧗',

    'touring-race': '🏁',

    'freetouring': '🎒',

    'all-mountain': '🏞️',

    'resort': '🎿',

    'carving': '🔄',

    'freeride': '🚀',

    'playride': '🛝'
  };


  snowIcons: {
    [key: string]: string
  } = {

    'powder': '❄️',

    'crud': '🌨️',

    'hard': '🧊'
  };


  styleIcons: {
    [key: string]: string
  } = {

    'fun-surf': '🏄',

    'technical-precision': '🎯'
  };


  speedIcons: {
    [key: string]: string
  } = {

    'moderate-speed': '🐢',

    'high-speed': '⚡'
  };


  /*========================================================
  CONSTRUCTOR
  ========================================================*/

  constructor(

    public dataService: DataServiceService,

    private http: HttpClient,

    private ngZone: NgZone,

    private router: Router

  ) {}


  /*========================================================
  GENERATED STATS
  ========================================================*/

  get generatedStats() {

    return [

      {

        label: 'Height',

        value: `${this.height} cm`,

        icon: '📏'

      },

      {

        label: 'Weight',

        value: `${this.weight} kg`,

        icon: '⚖️'

      },

      {

        label: 'Terrain',

        value:
          this.formatTerrain(
            this.terrainType
          ),

        icon:
          this.terrainIcons[
            this.terrainType
          ] || '🏔️'

      },

      {

        label: 'Snow',

        value:
          this.formatSnow(
            this.typeSnow
          ),

        icon:
          this.snowIcons[
            this.typeSnow
          ] || '❄️'

      },

      {

        label: 'Style',

        value:
          this.formatStyle(
            this.skiStyleFun
          ),

        icon:
          this.styleIcons[
            this.skiStyleFun
          ] || '🎨'

      },

      {

        label: 'Turns',

        value:
          this.formatTurns(
            this.turns
          ),

        icon: '🔄'

      },

      {

        label: 'Speed',

        value:
          this.formatSpeed(
            this.stable
          ),

        icon:
          this.speedIcons[
            this.stable
          ] || '⚡'

      }

    ];

  }


  /*========================================================
  FORMAT TERRAIN
  ========================================================*/

  formatTerrain(
    terrain: string
  ): string {

    const map: {
      [key: string]: string
    } = {

      'touring-back-mountain':
        'Back Mountain',

      'touring-front-mountain':
        'Front Mountain',

      'touring-race':
        'Race',

      'touring-mountaineering':
        'Mountaineering',

      'freetouring':
        'Freetouring',

      'all-mountain':
        'All Mountain',

      'freeride':
        'Freeride',

      'resort':
        'Resort',

      'carving':
        'Carving',

      'playride':
        'Playride'

    };


    return map[terrain] || terrain;

  }


  /*========================================================
  FORMAT SNOW
  ========================================================*/

  formatSnow(
    snow: string
  ): string {

    const map: {
      [key: string]: string
    } = {

      'powder':
        'Powder',

      'crud':
        'Crud',

      'hard':
        'Hard'

    };


    return map[snow] || snow;

  }


  /*========================================================
  FORMAT STYLE
  ========================================================*/

  formatStyle(
    style: string
  ): string {

    const map: {
      [key: string]: string
    } = {

      'fun-surf':
        'Fun & Surf',

      'technical-precision':
        'Technical'

    };


    return map[style] || style;

  }


  /*========================================================
  FORMAT TURNS
  ========================================================*/

  formatTurns(
    turns: string
  ): string {

    const map: {
      [key: string]: string
    } = {

      'short':
        'Short Turns',

      'long':
        'Long Turns'

    };


    return map[turns] || turns;

  }


  /*========================================================
  FORMAT SPEED
  ========================================================*/

  formatSpeed(
    speed: string
  ): string {

    const map: {
      [key: string]: string
    } = {

      'moderate-speed':
        'Moderate',

      'high-speed':
        'High Speed'

    };


    return map[speed] || speed;

  }


  /*========================================================
  RANK COLOR
  ========================================================*/

  getRankColor(
    index: number
  ): string {

    const colors = [

      '#FFD700',

      '#C0C0C0',

      '#CD7F32'

    ];


    return colors[index] || '#ff6a00';

  }


  /*========================================================
  SCORE COLOR
  ========================================================*/

  getScoreColor(
    score: number
  ): string {

    if (score >= 90) {

      return '#10b981';

    }


    if (score >= 70) {

      return '#3b82f6';

    }


    if (score >= 50) {

      return '#f59e0b';

    }


    return '#ef4444';

  }


  /*========================================================
  INIT
  ========================================================*/

  ngOnInit(): void {

    const svcAny =
      this.dataService as any;


    this.terrainOptions =
      svcAny?.terrainOptions ?? [

        'touring-back-mountain',

        'touring-front-mountain',

        'touring-race',

        'touring-mountaineering',

        'freetouring',

        'all-mountain',

        'freeride',

        'resort',

        'carving',

        'playride'

      ];


    this.snowOptions =
      svcAny?.snowOptions ?? [

        'powder',

        'crud',

        'hard'

      ];


    this.speedOptions =
      svcAny?.speedOptions ?? [

        'moderate-speed',

        'high-speed'

      ];


    this.turnOptions =
      svcAny?.turnOptions ?? [

        'short',

        'long'

      ];


    this.funOptions =
      svcAny?.funOptions ?? [

        'fun-surf',

        'technical-precision'

      ];


    this.levelOptions =
      svcAny?.levelOptions ?? [

        'newbie',

        'intermediate',

        'confirmed',

        'pro-guide'

      ];


    this.initializeSkiModels();


    /*======================================================
    PROFILE SUBSCRIPTION
    ======================================================*/

    this.profileSubscription =
      this.dataService.profile$

        .pipe(

          debounceTime(300)

        )

        .subscribe(
          profile => {

            this.ngZone.run(
              () => {

                console.log(
                  'Profile updated:',
                  profile
                );


                if (
                  profile.height != null
                ) {

                  this.height =
                    profile.height;

                }


                if (
                  profile.weight != null
                ) {

                  this.weight =
                    profile.weight;

                }


                if (
                  profile.terrainType
                ) {

                  this.terrainType =
                    profile.terrainType;

                }


                if (
                  profile.typeSnow
                ) {

                  this.typeSnow =
                    profile.typeSnow;

                }


                if (
                  profile.skiStyleFun
                ) {

                  this.skiStyleFun =
                    profile.skiStyleFun;

                }


                if (
                  profile.turns
                ) {

                  this.turns =
                    profile.turns;

                }


                if (
                  profile.stable
                ) {

                  this.stable =
                    profile.stable;

                }


                if (
                  profile.skiLevel
                ) {

                  this.skiLevel =
                    profile.skiLevel;

                }


                this
                  .recalculateRecommendationsWithAnimation();

              }
            );

          }
        );


    this
      .recalculateRecommendationsWithAnimation();

  }


  /*========================================================
  DESTROY
  ========================================================*/

  ngOnDestroy(): void {

    this.profileSubscription
      ?.unsubscribe();


    if (
      this.updateTimer
    ) {

      clearTimeout(
        this.updateTimer
      );

    }

  }


  /*========================================================
  HEIGHT
  ========================================================*/

  onHeightInput(
    event: any
  ): void {

    this.height =
      parseInt(
        event.target.value,
        10
      );


    this.scheduleUpdate();

  }


  onHeightChange(
    value: number
  ): void {

    this.height = value;

    this.scheduleUpdate();

  }


  /*========================================================
  WEIGHT
  ========================================================*/

  onWeightInput(
    event: any
  ): void {

    this.weight =
      parseInt(
        event.target.value,
        10
      );


    this.scheduleUpdate();

  }


  onWeightChange(
    value: number
  ): void {

    this.weight = value;

    this.scheduleUpdate();

  }


  /*========================================================
  TERRAIN
  ========================================================*/

  onTerrainChange(
    value: string
  ): void {

    this.terrainType = value;

    this.scheduleUpdate();

  }


  /*========================================================
  SNOW
  ========================================================*/

  onSnowChange(
    value: string
  ): void {

    this.typeSnow = value;

    this.scheduleUpdate();

  }


  /*========================================================
  STYLE
  ========================================================*/

  onStyleChange(
    value: string
  ): void {

    this.skiStyleFun = value;

    this.scheduleUpdate();

  }


  /*========================================================
  TURNS
  ========================================================*/

  onTurnsChange(
    value: string
  ): void {

    this.turns = value;

    this.scheduleUpdate();

  }


  /*========================================================
  SPEED
  ========================================================*/

  onSpeedChange(
    value: string
  ): void {

    this.stable = value;

    this.scheduleUpdate();

  }


  /*========================================================
  SCHEDULE UPDATE
  ========================================================*/

  private scheduleUpdate(): void {

    if (
      this.updateTimer
    ) {

      clearTimeout(
        this.updateTimer
      );

    }


    this.updateTimer =
      setTimeout(
        () => {

          this.applyChanges();

        },
        600
      );

  }


  /*========================================================
  SLIDER RELEASE
  ========================================================*/

  onSliderRelease(): void {

    if (
      this.updateTimer
    ) {

      clearTimeout(
        this.updateTimer
      );


      this.applyChanges();

    }

  }


  /*========================================================
  APPLY CHANGES
  ========================================================*/

  private applyChanges(): void {

    this.dataService
      .setHeight(
        this.height
      );


    this.dataService
      .setWeight(
        this.weight
      );


    this.dataService
      .setTerrainType(
        this.terrainType
      );


    this.dataService
      .setTypeSnow(
        this.typeSnow
      );


    this.dataService
      .setSkiStyleFun(
        this.skiStyleFun
      );


    this.dataService
      .setTurns(
        this.turns
      );


    this.dataService
      .setStable(
        this.stable
      );


    this.dataService
      .setSkiLevel(
        this.skiLevel
      );


    this.updateTimer = null;

  }


  /*========================================================
  DISCOVER SKI
  ========================================================*/

  openSki(
    ski: Ski
  ): void {

    if (
      ski.link
    ) {

      window.open(
        ski.link,
        '_blank',
        'noopener,noreferrer'
      );

    } else {

      alert(

        `🎿 ${ski.name}\n` +

        `📏 Size: ${ski.size} cm\n` +

        `📐 Sidecut: ${ski.sidecut || 'N/A'} mm\n` +

        `⭐ Score: ${ski.score}%`

      );

    }


    this.trackSkiSelection(
      ski
    );

  }


  /*========================================================
  FIND A DEALER
  ========================================================*/

  openDealer(): void {

    window.open(

      'https://ogso-mountain-essentials.com/ogso-dealer-locator/',

      '_blank',

      'noopener,noreferrer'

    );

  }


  /*========================================================
  RETAKE QUIZ
  ========================================================*/

  retakeQuiz(): void {

    /*
     * IMPORTANT :
     * Si ta première étape utilise par exemple /ski/step1,
     * remplace simplement '/ski-selector' ci-dessous.
     */

    this.router.navigate([
      '/ski-selector'
    ]);

  }


  /*========================================================
  GENERATE PDF
  ========================================================*/

  async generatePDF(): Promise<void> {

    this.isGeneratingPDF = true;


    try {

      const doc =
        new jsPDF({

          orientation: 'portrait',

          unit: 'mm',

          format: 'a4'

        });


      const pageWidth =
        doc.internal.pageSize
          .getWidth();


      const pageHeight =
        doc.internal.pageSize
          .getHeight();


      const margin = 20;


      /*====================================================
      COLORS
      ====================================================*/

      const colors = {

        bgDark: [
          11,
          12,
          20
        ],

        bgCard: [
          30,
          30,
          40
        ],

        orange: [
          255,
          106,
          0
        ],

        white: [
          255,
          255,
          255
        ],

        gray: [
          150,
          150,
          150
        ],

        lightGray: [
          200,
          200,
          200
        ]

      };


      /*====================================================
      HEADER
      ====================================================*/

      doc.setFillColor(
        colors.bgDark[0],
        colors.bgDark[1],
        colors.bgDark[2]
      );


      doc.rect(
        0,
        0,
        pageWidth,
        35,
        'F'
      );


      doc.setFillColor(
        colors.orange[0],
        colors.orange[1],
        colors.orange[2]
      );


      doc.rect(
        0,
        30,
        pageWidth,
        5,
        'F'
      );


      doc.setTextColor(
        colors.orange[0],
        colors.orange[1],
        colors.orange[2]
      );


      doc.setFontSize(24);


      doc.setFont(
        'helvetica',
        'bold'
      );


      doc.text(
        'OGSO',
        margin,
        18
      );


      doc.setTextColor(
        colors.white[0],
        colors.white[1],
        colors.white[2]
      );


      doc.setFontSize(12);


      doc.setFont(
        'helvetica',
        'normal'
      );


      doc.text(
        'SKI RECOMMENDATIONS',
        margin,
        26
      );


      const dateStr =
        new Date()
          .toLocaleDateString(
            'en-US',
            {

              month: 'short',

              day: 'numeric',

              year: 'numeric'

            }
          );


      doc.setTextColor(
        colors.gray[0],
        colors.gray[1],
        colors.gray[2]
      );


      doc.setFontSize(8);


      doc.text(
        dateStr,
        pageWidth - margin,
        18,
        {
          align: 'right'
        }
      );


      /*====================================================
      PROFILE
      ====================================================*/

      let yPos = 45;


      doc.setTextColor(
        colors.orange[0],
        colors.orange[1],
        colors.orange[2]
      );


      doc.setFontSize(14);


      doc.setFont(
        'helvetica',
        'bold'
      );


      doc.text(
        'PROFILE',
        margin,
        yPos
      );


      yPos += 10;


      const colWidth =
        (
          pageWidth -
          margin * 2
        ) / 4;


      const colPositions = [

        margin +
        colWidth / 2,

        margin +
        colWidth * 1.5,

        margin +
        colWidth * 2.5,

        margin +
        colWidth * 3.5

      ];


      doc.setTextColor(
        colors.gray[0],
        colors.gray[1],
        colors.gray[2]
      );


      doc.setFontSize(8);


      doc.setFont(
        'helvetica',
        'normal'
      );


      doc.text(
        'H',
        colPositions[0],
        yPos,
        {
          align: 'center'
        }
      );


      doc.text(
        'W',
        colPositions[1],
        yPos,
        {
          align: 'center'
        }
      );


      doc.text(
        'TER',
        colPositions[2],
        yPos,
        {
          align: 'center'
        }
      );


      doc.text(
        'SNOW',
        colPositions[3],
        yPos,
        {
          align: 'center'
        }
      );


      yPos += 5;


      doc.setFillColor(
        colors.bgCard[0],
        colors.bgCard[1],
        colors.bgCard[2]
      );


      doc.roundedRect(

        margin,

        yPos,

        pageWidth -
        margin * 2,

        20,

        3,

        3,

        'F'

      );


      doc.setTextColor(
        colors.white[0],
        colors.white[1],
        colors.white[2]
      );


      doc.setFontSize(10);


      doc.setFont(
        'helvetica',
        'bold'
      );


      doc.text(

        `${this.height} cm`,

        colPositions[0],

        yPos + 13,

        {
          align: 'center'
        }

      );


      doc.text(

        `${this.weight} kg`,

        colPositions[1],

        yPos + 13,

        {
          align: 'center'
        }

      );


      doc.text(

        this.formatTerrain(
          this.terrainType
        ),

        colPositions[2],

        yPos + 13,

        {
          align: 'center'
        }

      );


      doc.text(

        this.formatSnow(
          this.typeSnow
        ),

        colPositions[3],

        yPos + 13,

        {
          align: 'center'
        }

      );


      yPos += 35;


      /*====================================================
      TOP 3
      ====================================================*/

      doc.setTextColor(
        colors.orange[0],
        colors.orange[1],
        colors.orange[2]
      );


      doc.setFontSize(16);


      doc.setFont(
        'helvetica',
        'bold'
      );


      doc.text(
        'TOP 3 SKIS',
        margin,
        yPos
      );


      yPos += 10;


      for (
        let i = 0;
        i <
        Math.min(
          3,
          this.resultat.length
        );
        i++
      ) {

        const ski =
          this.resultat[i];


        /*==================================================
        CARD
        ==================================================*/

        doc.setFillColor(
          colors.bgCard[0],
          colors.bgCard[1],
          colors.bgCard[2]
        );


        doc.roundedRect(

          margin,

          yPos,

          pageWidth -
          margin * 2,

          35,

          3,

          3,

          'F'

        );


        /*==================================================
        MEDAL
        ==================================================*/

        const medalColors = [

          [
            255,
            215,
            0
          ],

          [
            192,
            192,
            192
          ],

          [
            205,
            127,
            50
          ]

        ];


        const circleX =
          margin + 17;


        const circleY =
          yPos + 12;


        const circleRadius = 8;


        doc.setFillColor(

          medalColors[i][0],

          medalColors[i][1],

          medalColors[i][2]

        );


        doc.circle(

          circleX,

          circleY,

          circleRadius,

          'F'

        );


        doc.setTextColor(
          colors.bgDark[0],
          colors.bgDark[1],
          colors.bgDark[2]
        );


        doc.setFontSize(11);


        doc.setFont(
          'helvetica',
          'bold'
        );


        doc.text(

          `${i + 1}`,

          circleX,

          circleY + 4,

          {
            align: 'center'
          }

        );


        /*==================================================
        NAME
        ==================================================*/

        doc.setTextColor(
          colors.white[0],
          colors.white[1],
          colors.white[2]
        );


        doc.setFontSize(12);


        doc.setFont(
          'helvetica',
          'bold'
        );


        doc.text(

          ski.name,

          margin + 40,

          yPos + 12

        );


        /*==================================================
        FAMILY
        ==================================================*/

        doc.setTextColor(
          colors.gray[0],
          colors.gray[1],
          colors.gray[2]
        );


        doc.setFontSize(8);


        doc.setFont(
          'helvetica',
          'normal'
        );


        doc.text(

          ski.family || 'OGSO',

          margin + 40,

          yPos + 21

        );


        /*==================================================
        SIZE + SIDECUT
        ==================================================*/

        const specsX =
          pageWidth / 2 - 10;


        doc.setTextColor(
          colors.lightGray[0],
          colors.lightGray[1],
          colors.lightGray[2]
        );


        doc.setFontSize(9);


        doc.setFont(
          'helvetica',
          'normal'
        );


        doc.text(

          `${ski.size} cm`,

          specsX,

          yPos + 12

        );


        doc.text(

          `${ski.sidecut || 'N/A'} mm`,

          specsX,

          yPos + 21

        );


        /*==================================================
        SCORE
        ==================================================*/

        const score =
          ski.score || 0;


        let scoreRgb:
          number[];


        if (
          score >= 90
        ) {

          scoreRgb = [
            16,
            185,
            129
          ];

        }

        else if (
          score >= 70
        ) {

          scoreRgb = [
            59,
            130,
            246
          ];

        }

        else if (
          score >= 50
        ) {

          scoreRgb = [
            245,
            158,
            11
          ];

        }

        else {

          scoreRgb = [
            239,
            68,
            68
          ];

        }


        const scoreX =
          pageWidth -
          margin -
          40;


        const scoreY =
          yPos + 7;


        const scoreWidth =
          30;


        const scoreHeight =
          18;


        doc.setFillColor(

          scoreRgb[0],

          scoreRgb[1],

          scoreRgb[2]

        );


        doc.roundedRect(

          scoreX,

          scoreY,

          scoreWidth,

          scoreHeight,

          5,

          5,

          'F'

        );


        doc.setTextColor(
          colors.white[0],
          colors.white[1],
          colors.white[2]
        );


        doc.setFontSize(14);


        doc.setFont(
          'helvetica',
          'bold'
        );


        doc.text(

          `${score}%`,

          scoreX +
          scoreWidth / 2,

          scoreY +
          scoreHeight / 2 +
          2,

          {
            align: 'center'
          }

        );


        yPos += 42;

      }


      /*====================================================
      FOOTER
      ====================================================*/

      doc.setDrawColor(
        colors.gray[0],
        colors.gray[1],
        colors.gray[2]
      );


      doc.setLineWidth(.3);


      doc.line(

        margin,

        pageHeight - 15,

        pageWidth - margin,

        pageHeight - 15

      );


      doc.setTextColor(
        colors.gray[0],
        colors.gray[1],
        colors.gray[2]
      );


      doc.setFontSize(7);


      doc.setFont(
        'helvetica',
        'normal'
      );


      doc.text(

        'OGSO - Smart Product Selector',

        pageWidth / 2,

        pageHeight - 8,

        {
          align: 'center'
        }

      );


      /*====================================================
      DOWNLOAD
      ====================================================*/

      const fileName =

        `OGSO_Ski_Recommendations_${new Date().getTime()}.pdf`;


      doc.save(
        fileName
      );


      this.pdfGenerated = true;


      setTimeout(
        () => {

          this.pdfGenerated = false;

        },
        3000
      );


    }

    catch (
      error
    ) {

      console.error(

        'PDF Generation Error:',

        error

      );


      alert(

        'Failed to generate PDF. Please try again.'

      );

    }

    finally {

      this.isGeneratingPDF = false;

    }

  }


  /*========================================================
  GENERATE + DOWNLOAD PDF
  ========================================================*/

  async generateAndDownloadPDF():
    Promise<void> {

    if (
      this.resultat.length === 0
    ) {

      alert(

        'No ski recommendations to export.'

      );


      return;

    }


    await this.generatePDF();

  }


  /*========================================================
  INITIALIZE SKI MODELS
  ========================================================*/

  private initializeSkiModels():
    void {

    const allSkis: Ski[] =

      (skis as any[])
        ?.filter(
          x => !!x
        ) ?? [];


    const modelMap =
      new Map<
        string,
        number[]
      >();


    allSkis.forEach(
      ski => {

        if (
          !modelMap.has(
            ski.name
          )
        ) {

          modelMap.set(
            ski.name,
            []
          );

        }


        if (

          !modelMap
            .get(
              ski.name
            )!
            .includes(
              ski.size
            )

        ) {

          modelMap
            .get(
              ski.name
            )!
            .push(
              ski.size
            );

        }

      }
    );


    this.skiModels =

      Array.from(
        modelMap.entries()
      )

        .map(
          ([name, sizes]) => ({

            name,

            availableSizes:
              sizes.sort(
                (a, b) =>
                  a - b
              ),

            family:
              allSkis.find(
                ski =>
                  ski.name === name
              )?.family

          })
        );

  }


  /*========================================================
  OPTIMAL SIZE
  ========================================================*/

  private findOptimalSize(

    skiName: string,

    userHeight: number

  ): number {

    const model =

      this.skiModels.find(
        m =>
          m.name === skiName
      );


    if (

      !model ||

      !model.availableSizes.length

    ) {

      return userHeight;

    }


    let targetHeight =
      userHeight;


    const lowerName =
      skiName.toLowerCase();


    if (

      lowerName.includes(
        'sts'
      ) ||

      lowerName.includes(
        'swiss'
      ) ||

      lowerName.includes(
        'grand'
      ) ||

      lowerName.includes(
        'daddy'
      )

    ) {

      targetHeight =
        userHeight - 7.5;

    }

    else if (

      lowerName.includes(
        'croix'
      ) ||

      lowerName.includes(
        'fer'
      ) ||

      lowerName.includes(
        'touno'
      )

    ) {

      targetHeight =
        userHeight - 2.5;

    }


    return model
      .availableSizes
      .reduce(

        (
          prev,
          curr
        ) =>

          Math.abs(
            curr -
            targetHeight
          )

          <

          Math.abs(
            prev -
            targetHeight
          )

            ? curr

            : prev

      );

  }


  /*========================================================
  RECALCULATE WITH ANIMATION
  ========================================================*/

  recalculateRecommendationsWithAnimation():
    void {

    this.isLoading = true;


    setTimeout(
      () => {

        this
          .recalculateRecommendations();


        this.isLoading = false;


        this.animationKey++;

      },
      100
    );

  }


  /*========================================================
  TRACK SKI
  ========================================================*/

  private trackSkiSelection(
    ski: Ski
  ): void {

    try {

      const db =
        getDatabase();


      set(

        ref(
          db,
          'ski_selections/' +
          Date.now()
        ),

        {

          timestamp:
            new Date()
              .toISOString(),

          ski_name:
            ski.name,

          ski_size:
            ski.size,

          ski_sidecut:
            ski.sidecut || null,

          ski_score:
            ski.score,

          user_height:
            this.height,

          user_weight:
            this.weight

        }

      );

    }

    catch (
      error
    ) {

      console.log(

        'Analytics tracking failed:',

        error

      );

    }

  }


  /*========================================================
  CALCULATE RECOMMENDATIONS
  ========================================================*/

  private recalculateRecommendations():
    void {

    this.resultat = [];


    const ar: Ski[] =

      (skis as any[])
        ?.filter(
          x => !!x
        ) ?? [];


    if (
      ar.length === 0
    ) {

      console.warn(
        'No ski data found'
      );


      return;

    }


    const scoredSkis:
      Ski[] = [];


    for (
      const ski of ar
    ) {

      let realScore = 100;


      /*====================================================
      TERRAIN
      ====================================================*/

      if (

        ski.playground &&

        !(
          Array.isArray(
            ski.playground
          )

            ? ski.playground
                .includes(
                  this.terrainType
                )

            : ski.playground ===
              this.terrainType
        )

      ) {

        realScore -= 10;

      }


      /*====================================================
      SNOW
      ====================================================*/

      if (

        ski.snow &&

        !(
          Array.isArray(
            ski.snow
          )

            ? ski.snow
                .includes(
                  this.typeSnow
                )

            : ski.snow ===
              this.typeSnow
        )

      ) {

        realScore -= 10;

      }


      /*====================================================
      SPEED
      ====================================================*/

      if (

        ski.riding_speed &&

        !(
          Array.isArray(
            ski.riding_speed
          )

            ? ski.riding_speed
                .includes(
                  this.stable
                )

            : ski.riding_speed ===
              this.stable
        )

      ) {

        realScore -= 5;

      }


      /*====================================================
      TURN
      ====================================================*/

      if (

        ski.turn &&

        !(
          Array.isArray(
            ski.turn
          )

            ? ski.turn
                .includes(
                  this.turns
                )

            : ski.turn ===
              this.turns
        )

      ) {

        realScore -= 5;

      }


      /*====================================================
      STYLE
      ====================================================*/

      if (

        ski.ski_style &&

        !(
          Array.isArray(
            ski.ski_style
          )

            ? ski.ski_style
                .includes(
                  this.skiStyleFun
                )

            : ski.ski_style ===
              this.skiStyleFun
        )

      ) {

        realScore -= 10;

      }


      realScore =
        Math.max(
          0,
          realScore
        );


      scoredSkis.push({

        ...ski,

        realScore,

        score:
          realScore

      });

    }


    /*======================================================
    SORT
    ======================================================*/

    scoredSkis.sort(

      (
        a,
        b
      ) =>

        (
          b.realScore ?? 0
        )

        -

        (
          a.realScore ?? 0
        )

    );


    /*======================================================
    UNIQUE MODELS
    ======================================================*/

    const uniqueSkis =

      scoredSkis.reduce(

        (
          acc: Ski[],
          cur: Ski
        ) => {

          if (

            !acc.find(
              x =>
                x.name ===
                cur.name
            )

          ) {

            acc.push(
              cur
            );

          }


          return acc;

        },

        []

      );


    const topSkis =
      uniqueSkis.slice(
        0,
        6
      );


    /*======================================================
    OPTIMAL SIZE FOR EACH SKI
    ======================================================*/

    this.resultat =

      topSkis.map(
        (
          ski,
          index
        ) => {

          const optimalSize =

            this.findOptimalSize(

              ski.name,

              this.height

            );


          const optimalSki =

            ar.find(
              s =>

                s.name ===
                  ski.name

                &&

                s.size ===
                  optimalSize

            ) || ski;


          const displayScores = [

            100,

            90,

            80,

            70,

            60,

            50

          ];


          return {

            ...optimalSki,

            score:
              displayScores[index] ||
              ski.realScore

          };

        }
      );


    this.writeUserDataIfPossible();

  }


  /*========================================================
  FIREBASE USER DATA
  ========================================================*/

  private writeUserDataIfPossible():
    void {

    if (
      !this.resultat.length
    ) {

      return;

    }


    try {

      const db =
        getDatabase();


      set(

        ref(
          db,
          'ski_data/' +
          Date.now()
        ),

        {

          date:
            new Date()
              .toISOString()
              .split('T')[0],

          ski1:
            this.resultat[0]
              ?.name,

          ski2:
            this.resultat[1]
              ?.name,

          ski3:
            this.resultat[2]
              ?.name,

          height:
            this.height,

          weight:
            this.weight

        }

      );

    }

    catch (
      error
    ) {

      console.log(
        'Firebase write failed:',
        error
      );

    }

  }

}